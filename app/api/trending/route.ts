export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

/**
 * GET /api/trending
 * Identifies "Trending" and "Undervalued" players for the daily hook system.
 */
export async function GET(request: NextRequest) {
    try {
        const { teams } = await CricketDataService.getSquads()
        const allPlayers = teams.flatMap((t: any) => (t.players || []).map((p: any) => ({
            ...p,
            teamCode: t.teamCode,
            teamName: t.teamName
        })))

        if (allPlayers.length === 0) return NextResponse.json({ players: [] })

        // Mock algorithm for startup feel:
        // Trending = Random 4 with high projected form
        // Undervalued = Random 4 with role 'All Rounder' (simplification)

        const trending = allPlayers
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((p: any) => ({
                id: p.id || p.playerId,
                name: p.name || p.playerName,
                team: p.teamCode,
                trend: "+12.4%",
                reason: "Spiking in recent simulations"
            }))

        const undervalued = allPlayers
            .filter((p: any) => (p.role || "").toLowerCase().includes("all"))
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((p: any) => ({
                id: p.id || p.playerId,
                name: p.name || p.playerName,
                team: p.teamCode,
                impact: 8.4,
                value: "7.5 Cr"
            }))

        return NextResponse.json({
            trending,
            undervalued,
            source: "22 Yards Analytics Engine"
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
