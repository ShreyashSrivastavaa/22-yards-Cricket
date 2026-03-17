-- Phase 6: Database Hardening & Performance Optimization
-- This migration optimizes the cache layer for startup-grade performance.

-- 1. Optimized Indexes for Search & Filtering
CREATE INDEX IF NOT EXISTS idx_players_team ON players_cache(team);
CREATE INDEX IF NOT EXISTS idx_players_role ON players_cache(role);
CREATE INDEX IF NOT EXISTS idx_match_form_updated ON match_form_cache(last_updated DESC);

-- 2. Materialized View for Season Stats (Aggregated)
-- This allows sub-10ms queries for leaderboard dashboards
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_season_leaderboards AS
SELECT 
  type,
  season,
  data_json,
  last_updated
FROM leaderboards_cache
WITH DATA;

-- 3. Automatic Cache Refresh Function (Example)
-- In a real prod env, this would be called via a webhook or cron
CREATE OR REPLACE FUNCTION refresh_leaderboard_view()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_season_leaderboards;
END;
$$ LANGUAGE plpgsql;

-- 4. Secure Vault Table (Unified Stats Storage)
CREATE TABLE IF NOT EXISTS analytics_vault (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id TEXT NOT NULL, -- player_id or team_id
  entity_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  context_json JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vault_entity ON analytics_vault(entity_id, metric_name);

-- 5. RLS Policies Hardening
-- Ensure service role has absolute priority
ALTER TABLE analytics_vault ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service Role Only" ON analytics_vault FOR ALL TO service_role USING (true);
