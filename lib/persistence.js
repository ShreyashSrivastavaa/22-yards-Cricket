/**
 * Persistence Service — Managing the Data Moat.
 *
 * Unlike cache.ts which has TTLs, this service stores permanent
 * historical data used for proprietary trend analysis.
 */

import { supabaseAdmin } from "./supabase-admin"

export class PersistenceService {
    /**
     * Archive a player's performance in a specific match.
     * Prevents duplicates via unique (player_id, match_id).
     */
    static async archiveMatchPerformance(data) {
        try {
            const { error } = await supabaseAdmin
                .from("player_match_history")
                .upsert({
                    player_id: data.player_id,
                    match_id: data.match_id,
                    team_code: data.team_code,
                    runs: data.runs || 0,
                    balls: data.balls || 0,
                    sr: data.sr || 0,
                    wickets: data.wickets || 0,
                    overs: data.overs || 0,
                    venue: data.venue,
                    match_date: data.match_date || new Date().toISOString().split("T")[0],
                    computed_impact_score: data.impact_score
                }, { onConflict: "player_id,match_id" })

            if (error) console.error(`[Persistence] Failed to archive ${data.player_id}:`, error.message)
        } catch (e) {
            console.error("[Persistence] Match archive error:", e)
        }
    }

    /**
     * Get historical trend for a player (e.g., last 10 matches).
     */
    static async getPlayerHistory(playerId, limit = 10) {
        const { data, error } = await supabaseAdmin
            .from("player_match_history")
            .select("*")
            .eq("player_id", playerId)
            .order("match_date", { ascending: false })
            .limit(limit)

        if (error) return []
        return data
    }

    /**
     * Store Daily AI Picks.
     */
    static async storeDailyPicks(picks) {
        const { error } = await supabaseAdmin
            .from("daily_ai_picks")
            .upsert(picks, { onConflict: "pick_date,player_id" })

        return !error
    }

    /**
     * Fetch Daily Picks.
     */
    static async getDailyPicks(date = new Date().toISOString().split("T")[0]) {
        const { data, error } = await supabaseAdmin
            .from("daily_ai_picks")
            .select("*")
            .eq("pick_date", date)

        if (error) return []
        return data
    }
}
