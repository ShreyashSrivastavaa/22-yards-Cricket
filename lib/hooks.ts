/**
 * Data Hooks — Client-side fetch wrappers for API routes
 * 
 * Every page should use these hooks instead of hardcoded data.
 * Provides loading/error/data states.
 */
"use client"

import { useState, useEffect, useCallback } from "react"

interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useFetch<T>(url: string, immediate = true): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(immediate)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(url)
            const json = await res.json()
            if (json.error && !json.data && !json.teams && !json.player && !json.batting) {
                setError(json.error)
            } else {
                setData(json)
            }
        } catch (e: any) {
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
// Typed hooks for each API route
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function useSquads() {
    return useFetch<{ teams: any[]; source: string }>("/api/squads")
}

export function usePlayer(id: string) {
    return useFetch<{ player: any; source: string }>(`/api/player?id=${id}`)
}

export function usePlayerByName(name: string) {
    return useFetch<{ player: any; source: string }>(`/api/player?name=${encodeURIComponent(name)}`)
}

export function useLiveStats(season = "ipl2026") {
    return useFetch<{ batting: any[]; bowling: any[]; source: string }>(`/api/live-stats?season=${season}`)
}

export function useMatchForm(playerId: string) {
    return useFetch<{ form: any; source: string }>(`/api/match-form?id=${playerId}`)
}

export function usePhaseStats() {
    return useFetch<{ batting: any[]; bowling: any[]; source: string }>("/api/phase-stats")
}

export function useDailyPicks() {
    return useFetch<{ date: string; picks: any[]; source: string }>("/api/daily-picks")
}

export function useTrending() {
    return useFetch<{ trending: any[]; undervalued: any[]; source: string }>("/api/trending")
}

export function usePointsTable(seriesId = "7607") {
    return useFetch<{ pointsTable: any[]; source: string }>(`/api/points-table?seriesId=${seriesId}`)
}

export function useMatches(type = "upcoming") {
    return useFetch<{ matches: any[]; source: string }>(`/api/matches?type=${type}`)
}

export function useMatchDetails(id: string) {
    return useFetch<{ match: any; source: string }>(`/api/match-details?id=${id}`)
}
