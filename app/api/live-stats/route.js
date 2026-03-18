export const dynamic = 'force-dynamic'

/**
 * GET /api/live-stats?season=ipl2026
 * Source: Cricbuzz RapidAPI for current season leaderboards
 * Cache: 1 hour in Supabase leaderboards_cache
 */
import { NextResponse } from "next/server"
import { cricbuzzFetch } from "@/lib/api-clients"
import { getFromCache, setCache } from "@/lib/cache"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const season = searchParams.get("season") || "ipl2026"

    try {
        // Cache check (1h TTL)
        const cachedBatting = await getFromCache("leaderboards_cache", `batting_${season}`, "type", "data_json", 1)
        const cachedBowling = await getFromCache("leaderboards_cache", `bowling_${season}`, "type", "data_json", 1)

        if (cachedBatting && cachedBowling) {
            return NextResponse.json({
                batting: cachedBatting,
                bowling: cachedBowling,
                source: "cache",
            })
        }

        // Fetch from Cricbuzz
        const statsData = await cricbuzzFetch("stats/v1/series/7607") // IPL series ID — update if needed

        const batting = statsData?.battingStats || statsData?.topBatters || []
        const bowling = statsData?.bowlingStats || statsData?.topBowlers || []

        // Cache both
        await setCache("leaderboards_cache", "type", `batting_${season}`, "data_json", batting, { season })
        await setCache("leaderboards_cache", "type", `bowling_${season}`, "data_json", bowling, { season })

        return NextResponse.json({ batting, bowling, source: "api" })
    } catch (error) {
        console.error("[/api/live-stats]", error.message)

        // Stale cache fallback
        const staleBat = await getFromCache("leaderboards_cache", `batting_${season}`, "type", "data_json", 720)
        const staleBowl = await getFromCache("leaderboards_cache", `bowling_${season}`, "type", "data_json", 720)

        if (staleBat || staleBowl) {
            return NextResponse.json({
                batting: staleBat || [],
                bowling: staleBowl || [],
                source: "stale-cache",
            })
        }

        return NextResponse.json({ error: error.message, batting: [], bowling: [] }, { status: 500 })
    }
}
