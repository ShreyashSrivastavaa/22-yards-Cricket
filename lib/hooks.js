/**
 * Data Hooks — Client-side fetch wrappers for API routes
 *
 * Every page should use these hooks instead of hardcoded data.
 * Provides loading/error/data states.
 */
"use client"

import { useState, useEffect, useCallback } from "react"

export function useFetch(url, immediate = true) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(immediate)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        if (!url || typeof window === 'undefined') return
        
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(url)
            const text = await res.text()
            if (!text) throw new Error("Empty response from server")
            
            const json = JSON.parse(text)
            if (json.error && !json.data && !json.teams && !json.player && !json.batting) {
                setError(json.error)
            } else {
                setData(json)
            }
        } catch (e) {
            console.error(`[Fetch Error] ${url}:`, e)
            setError(e.message || "Failed to fetch data")
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        if (immediate) fetchData()
    }, [fetchData, immediate])

    return { data, loading, error, refetch: fetchData }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Hooks for each API route
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function useSquads() {
    return useFetch("/api/squads")
}

export function usePlayer(id) {
    return useFetch(`/api/player?id=${id}`)
}

export function usePlayerByName(name) {
    return useFetch(`/api/player?name=${encodeURIComponent(name)}`)
}

export function useLiveStats(season = "ipl2026") {
    return useFetch(`/api/live-stats?season=${season}`)
}

export function useMatchForm(playerId) {
    return useFetch(`/api/match-form?id=${playerId}`)
}

export function usePhaseStats() {
    return useFetch("/api/phase-stats")
}

export function useDailyPicks() {
    return useFetch("/api/daily-picks")
}

export function useTrending() {
    return useFetch("/api/trending")
}

export function usePointsTable(seriesId = "7607") {
    return useFetch(`/api/points-table?seriesId=${seriesId}`)
}

export function useMatches(type = "upcoming") {
    return useFetch(`/api/matches?type=${type}`)
}

export function usePlayers(query = "") {
    return useFetch(`/api/players${query ? `?q=${encodeURIComponent(query)}` : ""}`)
}

export function useMatchDetails(id) {
    return useFetch(`/api/matches?matchId=${id}`)
}

export function useTeams(teamId) {
    return useFetch(`/api/teams/${teamId}`)
}

export function useSeries() {
    return useFetch("/api/series")
}

export function usePlayerStats(name) {
    return useFetch(name ? `/api/players/${encodeURIComponent(name)}/stats` : null)
}

export function useFantasyPicks() {
    return useFetch("/api/fantasy")
}
