export const dynamic = 'force-dynamic'

/**
 * GET /api/phase-stats
 * Source: ESPN Cricinfo Statsguru via allorigins proxy
 * Cache: 12 hours in Supabase leaderboards_cache
 * 
 * Scrapes phase-by-phase stats not available in standard APIs.
 */
import { NextResponse } from "next/server"
import { espnScrape, parseEspnStatsTable } from "@/lib/api-clients"
import { getFromCache, setCache } from "@/lib/cache"

const BATTING_URL = "https://stats.espncricinfo.com/ci/engine/records/batting/most_runs.html?id=117;type=tournament"
const BOWLING_URL = "https://stats.espncricinfo.com/ci/engine/records/bowling/most_wickets.html?id=117;type=tournament"

export async function GET() {
    try {
        // Cache check (12h TTL)
        const cachedBatting = await getFromCache("leaderboards_cache", "phase_batting", "type", "data_json", 12)
        const cachedBowling = await getFromCache("leaderboards_cache", "phase_bowling", "type", "data_json", 12)

        if (cachedBatting && cachedBowling) {
            return NextResponse.json({
                batting: cachedBatting,
                bowling: cachedBowling,
                source: "cache",
            })
        }

        // Scrape ESPN
        const [battingHtml, bowlingHtml] = await Promise.all([
            espnScrape(BATTING_URL),
            espnScrape(BOWLING_URL),
        ])

        const batting = parseEspnStatsTable(battingHtml)
        const bowling = parseEspnStatsTable(bowlingHtml)

        // Cache
        await setCache("leaderboards_cache", "type", "phase_batting", "data_json", batting, { season: "ipl2025" })
        await setCache("leaderboards_cache", "type", "phase_bowling", "data_json", bowling, { season: "ipl2025" })

        return NextResponse.json({ batting, bowling, source: "scraped" })
    } catch (error: any) {
        console.error("[/api/phase-stats]", error.message)

        const staleBat = await getFromCache("leaderboards_cache", "phase_batting", "type", "data_json", 720)
        const staleBowl = await getFromCache("leaderboards_cache", "phase_bowling", "type", "data_json", 720)

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
