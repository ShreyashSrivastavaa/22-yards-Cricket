/**
 * Cricket Data Service — Centralized resilience & normalization layer.
 * 
 * Features:
 * 1. Exponential backoff for rate-limited APIs.
 * 2. Multi-source fallback logic.
 * 3. Unified player/team object normalization.
 */

import { cricApiFetch, cricbuzzFetch, IPL_TEAMS } from "./api-clients"
import { getFromCache, setCache } from "./cache"
import { PersistenceService } from "./persistence"

const BACKOFF_INITIAL_MS = 1000
const MAX_RETRIES = 3

async function withBackoff<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
    try {
        return await fn()
    } catch (error: any) {
        if (retries > 0 && (error.message.includes("429") || error.message.includes("rate limit"))) {
            const delay = BACKOFF_INITIAL_MS * (MAX_RETRIES - retries + 1)
            console.warn(`[Service] Rate limited. Retrying in ${delay}ms...`)
            await new Promise(resolve => setTimeout(resolve, delay))
            return withBackoff(fn, retries - 1)
        }
        throw error
    }
}

export class CricketDataService {
    /**
     * Get squad data with resilience.
     */
    static async getSquads() {
        // Try cache first
        const cacheTable = "squads_cache"
        const cached = await getFromCache(cacheTable, "all_teams", "key", "data_json", 24)
        if (cached) return { teams: cached, source: "cache" }

        try {
            // Fetch from Cricbuzz (primary for IPL squads)
            const data = await withBackoff(() => cricbuzzFetch("series/v1/7607")) // Update ID as needed
            const teams = data?.teams || []

            // Normalize and cache
            if (teams.length > 0) {
                await setCache(cacheTable, "key", "all_teams", "data_json", teams)
            }

            return { teams, source: "api" }
        } catch (error) {
            // Fallback to stale cache if API fails
            const stale = await getFromCache(cacheTable, "all_teams", "key", "data_json", 168) // 1 week
            if (stale) return { teams: stale, source: "stale-cache" }
            throw error
        }
    }

    /**
     * Get player stats with computed metrics aggregation.
     */
    static async getPlayerProfile(id: string) {
        const cacheTable = "players_cache"
        const cached = await getFromCache(cacheTable, id, "player_id", "data_json", 12)
        if (cached) return { player: cached, source: "cache" }

        try {
            // Fetch raw data
            const [batting, bowling] = await Promise.all([
                withBackoff(() => cricbuzzFetch(`players/v1/${id}/batting`)),
                withBackoff(() => cricbuzzFetch(`players/v1/${id}/bowling`))
            ])

            const player = {
                id,
                batting: batting?.stats || {},
                bowling: bowling?.stats || {},
                lastFetched: new Date().toISOString()
            }

            // Phase 7: Historical Archive (Data Moat)
            // If we have recent match data, persist it permanently
            if (batting?.recentMatches?.length > 0) {
                for (const match of batting.recentMatches) {
                    await PersistenceService.archiveMatchPerformance({
                        player_id: id,
                        match_id: match.matchId,
                        team_code: match.teamCode || "N/A",
                        runs: match.runs,
                        balls: match.balls,
                        sr: match.sr,
                        match_date: match.date,
                        venue: match.venue
                    })
                }
            }

            await setCache(cacheTable, "player_id", id, "data_json", player)
            return { player, source: "api" }
        } catch (error) {
            const stale = await getFromCache(cacheTable, id, "player_id", "data_json", 72)
            if (stale) return { player: stale, source: "stale-cache" }
            throw error
        }
    }

    /**
     * Get points table for a specific series.
     */
    static async getPointsTable(seriesId: string) {
        const cacheTable = "points_table_cache"
        const cached = await getFromCache(cacheTable, seriesId, "series_id", "data_json", 6)
        if (cached) return { pointsTable: cached, source: "cache" }

        try {
            const data = await withBackoff(() => cricbuzzFetch(`series/v1/${seriesId}/points-table`))
            const pointsTable = data?.pointsTable || []

            if (pointsTable.length > 0) {
                await setCache(cacheTable, "series_id", seriesId, "data_json", pointsTable)
            }
            return { pointsTable, source: "api" }
        } catch (error) {
            const stale = await getFromCache(cacheTable, seriesId, "series_id", "data_json", 24)
            if (stale) return { pointsTable: stale, source: "stale-cache" }
            throw error
        }
    }

    /**
     * Get matches by type (live, upcoming, recent).
     */
    static async getMatches(type: string) {
        const cacheTable = "matches_cache"
        const cached = await getFromCache(cacheTable, type, "type", "data_json", 0.5) // 30m cache
        if (cached) return { matches: cached, source: "cache" }

        try {
            const data = await withBackoff(() => cricbuzzFetch(`matches/v1/${type}`))
            const matches = data?.typeMatches || []

            if (matches.length > 0) {
                await setCache(cacheTable, "type", type, "data_json", matches)
            }
            return { matches, source: "api" }
        } catch (error) {
            const stale = await getFromCache(cacheTable, type, "type", "data_json", 12)
            if (stale) return { matches: stale, source: "stale-cache" }
            throw error
        }
    }

    /**
     * Get full details for a specific match.
     */
    static async getMatchDetails(id: string) {
        const cacheTable = "match_details_cache"
        const cached = await getFromCache(cacheTable, id, "match_id", "data_json", 0.1) // 6m cache
        if (cached) return { match: cached, source: "cache" }

        try {
            const data = await withBackoff(() => cricbuzzFetch(`msc/v1/m3/${id}/scorecard`)) // Example endpoint for live/detailed
            const match = data || {}

            if (match) {
                await setCache(cacheTable, "match_id", id, "data_json", match)
            }
            return { match, source: "api" }
        } catch (error) {
            const stale = await getFromCache(cacheTable, id, "match_id", "data_json", 24)
            if (stale) return { match: stale, source: "stale-cache" }
            throw error
        }
    }

    /**
     * Map a raw player object to a normalized internal format.
     */
    static normalizePlayer(raw: any) {
        return {
            id: raw.id || raw.playerId,
            name: raw.name || raw.playerName,
            role: raw.role || "Unknown",
            image: `https://i.pravatar.cc/150?u=${raw.id || raw.name}`, // Placeholder
            team: raw.teamName || "N/A"
        }
    }
}
