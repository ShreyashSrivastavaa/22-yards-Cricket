export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"
import * as localData from "@/lib/localData"

/**
 * GET /api/trending
 * Identifies "Trending" and "Undervalued" players for the daily hook system.
 */
export async function GET(request) {
    try {
        const { teams } = await CricketDataService.getSquads()
        const allPlayers = teams.flatMap(t => (t.players || []).map(p => ({
            ...p,
            teamCode: t.teamCode,
            teamName: t.teamName
        })))

        if (allPlayers.length === 0) return NextResponse.json({ players: [] })

        const trending = allPlayers
            .map(p => {
                const stats = localData.getPlayerStats(p.name || p.playerName)
                return {
                    id: p.id || p.playerId,
                    name: p.name || p.playerName,
                    team: p.teamCode,
                    impact: Number(stats.fantasyScore || 0),
                    trend: stats.batting.strikeRate > 150 ? "+18.2%" : "+5.4%",
                    reason: stats.batting.runs > 500 ? "Consistent run machine" : "Emerging middle-order specialist"
                }
            })
            .sort((a, b) => b.impact - a.impact)
            .slice(0, 4)

        const undervalued = allPlayers
            .filter(p => (p.role || "").toLowerCase().includes("all"))
            .map(p => {
                const stats = localData.getPlayerStats(p.name || p.playerName)
                return {
                    id: p.id || p.playerId,
                    name: p.name || p.playerName,
                    team: p.teamCode,
                    impact: Number(stats.fantasyScore || 0),
                    value: stats.batting.average > 30 ? "8.5 Cr" : "4.2 Cr"
                }
            })
            .sort((a, b) => a.impact - b.impact) // Lower impact but with potential
            .slice(0, 4)

        return NextResponse.json({
            trending,
            undervalued,
            source: "22 Yards Analytics Engine"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
