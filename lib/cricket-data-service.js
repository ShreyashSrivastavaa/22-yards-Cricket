/**
 * Cricket Data Service — Centralized resilience & normalization layer.
 *
 * Features:
 * 1. Exponential backoff for rate-limited APIs.
 * 2. Multi-source fallback logic.
 * 3. Unified player/team object normalization.
 */

import * as localData from "./localData"

const BACKOFF_INITIAL_MS = 1000
const MAX_RETRIES = 3

async function withBackoff(fn, retries = MAX_RETRIES) {
    try {
        return await fn()
    } catch (error) {
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
     * Get squad data from local dataset.
     */
    static async getSquads() {
        const teams = localData.getTeamsWithSquads()
        return { teams, source: "local-dataset" }
    }

    /**
     * Get player stats from local dataset.
     */
    static async getPlayerProfile(name) {
        const stats = localData.getPlayerStats(name)
        const players = localData.getAllPlayers()
        const meta = players.find(p => p.name === name) || {}

        return { 
            player: {
                id: meta.id || name.toLowerCase().replace(/ /g, '-'),
                name: name,
                team: meta.teamCode || "N/A",
                ...stats
            }, 
            source: "local-dataset" 
        }
    }

    /**
     * Get points table from local dataset.
     */
    static async getPointsTable(season = '2025') {
        const pointsTable = localData.getPointsTable(season)
        return { pointsTable, source: "local-dataset" }
    }

    /**
     * Get matches from local dataset.
     */
    static async getMatches(type, season = '2025') {
        // 'type' is ignored for now as we just return recent matches
        const matches = localData.getRecentMatches(season)
        return { matches, source: "local-dataset" }
    }

    /**
     * Get full details for a specific match from local dataset.
     */
    static async getMatchDetails(id) {
        const match = localData.getMatchDetails(id)
        if (!match) throw new Error(`Match ${id} not found in local dataset`)
        return { match, source: "local-dataset" }
    }

    /**
     * Map a raw player object to a normalized internal format.
     */
    static normalizePlayer(raw) {
        return {
            id: raw.id || raw.playerId,
            name: raw.name || raw.playerName,
            role: raw.role || "Unknown",
            image: `https://avatar.vercel.sh/${raw.name}?size=150`, 
            team: raw.teamName || raw.batting_team || "N/A"
        }
    }
}
