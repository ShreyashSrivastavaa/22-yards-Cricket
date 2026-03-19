export const dynamic = 'force-dynamic'

/**
 * GET /api/live-stats?season=ipl2026
 * Source: Cricbuzz RapidAPI for current season leaderboards
 * Cache: 1 hour in Supabase leaderboards_cache
 */
import { NextResponse } from "next/server"
import * as localData from "@/lib/localData"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const season = searchParams.get("season") || "2025"

    try {
        const players = localData.getAllPlayers()
        const stats = players.map(p => {
            const playerStats = localData.getPlayerStats(p.name)
            return {
                id: p.id,
                name: p.name,
                team: p.teamCode,
                ...playerStats
            }
        })

        const batting = stats
            .sort((a, b) => b.batting.runs - a.batting.runs)
            .slice(0, 10)
            .map(p => ({
                playerId: p.id,
                playerName: p.name,
                runs: p.batting.runs,
                average: p.batting.average,
                strikeRate: p.batting.strikeRate
            }))

        const bowling = stats
            .sort((a, b) => b.bowling.wickets - a.bowling.wickets)
            .slice(0, 10)
            .map(p => ({
                playerId: p.id,
                playerName: p.name,
                wickets: p.bowling.wickets,
                economy: p.bowling.economy,
                average: p.bowling.average
            }))

        return NextResponse.json({ batting, bowling, source: "local-dataset-aggregation" })
    } catch (error) {
        console.error("[/api/live-stats]", error.message)
        return NextResponse.json({ error: error.message, batting: [], bowling: [] }, { status: 500 })
    }
}
