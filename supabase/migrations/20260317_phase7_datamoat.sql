-- Phase 7: Data Moat — Historical Persistence Schema
-- This schema moves the platform from "Caching" to "Archiving".

-- 1. Permanent Player Match History
-- Tracks every match performance to build proprietary averages, not found in free APIs.
CREATE TABLE IF NOT EXISTS player_match_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT NOT NULL,
  match_id TEXT NOT NULL,
  team_code TEXT NOT NULL,
  runs INTEGER DEFAULT 0,
  balls INTEGER DEFAULT 0,
  fours INTEGER DEFAULT 0,
  sixes INTEGER DEFAULT 0,
  sr NUMERIC,
  wickets INTEGER DEFAULT 0,
  overs NUMERIC,
  runs_conceded INTEGER DEFAULT 0,
  match_date DATE,
  venue TEXT,
  computed_impact_score NUMERIC, -- Saved at time of match
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(player_id, match_id)
);

CREATE INDEX IF NOT EXISTS idx_history_player ON player_match_history(player_id);
CREATE INDEX IF NOT EXISTS idx_history_date ON player_match_history(match_date DESC);

-- 2. Permanent Venue Analytics
-- Aggregates ground truth over years
CREATE TABLE IF NOT EXISTS venue_history (
  venue_name TEXT PRIMARY KEY,
  total_matches INTEGER DEFAULT 0,
  avg_1st_inn_score NUMERIC,
  chasing_win_pct NUMERIC,
  pace_wkt_pct NUMERIC,
  spin_wkt_pct NUMERIC,
  last_match_date DATE,
  metadata JSONB
);

-- 3. Daily Top Picks & Tracking
-- Powers the "Daily Hook" system
CREATE TABLE IF NOT EXISTS daily_ai_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pick_date DATE DEFAULT CURRENT_DATE,
  player_id TEXT NOT NULL,
  reasoning TEXT,
  risk_level TEXT, -- Low, Medium, High
  projected_points INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(pick_date, player_id)
);

-- 4. Subscription & User State (Primitive gating)
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  plan_level TEXT DEFAULT 'FREE', -- FREE, PRO, ELITE
  favorite_players TEXT[], -- Array of player IDs
  tracking_alerts BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE player_match_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_ai_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for anon access (Read only)
CREATE POLICY "Public Read Matches" ON player_match_history FOR SELECT USING (true);
CREATE POLICY "Public Read Venue" ON venue_history FOR SELECT USING (true);
CREATE POLICY "Public Read Picks" ON daily_ai_picks FOR SELECT USING (true);

-- Service role policies (Full access)
CREATE POLICY "Service Role Full access" ON player_match_history FOR ALL TO service_role USING (true);
CREATE POLICY "Service Role Full access" ON venue_history FOR ALL TO service_role USING (true);
CREATE POLICY "Service Role Full access" ON daily_ai_picks FOR ALL TO service_role USING (true);
CREATE POLICY "Service Role Full access" ON user_profiles FOR ALL TO service_role USING (true);
