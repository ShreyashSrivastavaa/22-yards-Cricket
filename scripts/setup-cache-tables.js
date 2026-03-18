/**
 * Setup script: Creates Supabase cache tables
 * Run with: node scripts/setup-cache-tables.js
 */
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || "https://qyeqhlmmkdtcfgwcvoix.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseKey) {
    console.error("No Supabase key found. Set SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
    console.log("Creating cache tables...")

    // Use Supabase RPC to run SQL (requires sql function or use REST approach)
    // Since we're using anon key, we'll create tables by inserting dummy data
    // and relying on the schema being created in the Supabase dashboard.

    // Test connection
    const { data, error } = await supabase.from("players_cache").select("*").limit(1)

    if (error && error.code === "42P01") {
        console.log("Tables don't exist yet. Please create them in your Supabase dashboard SQL editor:")
        console.log(`
-- Run this SQL in Supabase Dashboard > SQL Editor:

CREATE TABLE IF NOT EXISTS players_cache (
  id TEXT PRIMARY KEY,
  name TEXT,
  team TEXT,
  role TEXT,
  nationality TEXT,
  stats_json JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS squads_cache (
  team_code TEXT PRIMARY KEY,
  squad_json JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaderboards_cache (
  type TEXT PRIMARY KEY,
  season TEXT,
  data_json JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_form_cache (
  player_id TEXT PRIMARY KEY,
  form_json JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for cache tables (server-side only access)
ALTER TABLE players_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE squads_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_form_cache ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON players_cache FOR ALL USING (true);
CREATE POLICY "Service role full access" ON squads_cache FOR ALL USING (true);
CREATE POLICY "Service role full access" ON leaderboards_cache FOR ALL USING (true);
CREATE POLICY "Service role full access" ON match_form_cache FOR ALL USING (true);
    `)
    } else if (error) {
        console.log("Connection error:", error.message)
    } else {
        console.log("✅ players_cache table exists!")
    }

    // Test other tables
    for (const table of ["squads_cache", "leaderboards_cache", "match_form_cache"]) {
        const { error: err } = await supabase.from(table).select("*").limit(1)
        if (err && err.code === "42P01") {
            console.log(`❌ ${table} - does not exist`)
        } else if (err) {
            console.log(`⚠️ ${table} - ${err.message}`)
        } else {
            console.log(`✅ ${table} - exists`)
        }
    }
}

createTables().catch(console.error)
