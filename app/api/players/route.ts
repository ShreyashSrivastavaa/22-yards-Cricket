export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request: NextRequest) {
    try {
        const { teams } = await CricketDataService.getSquads()

        // Flatten players from all teams
        const allPlayers: any[] = []
        teams.forEach((team: any) => {
            if (team.players) {
                team.players.forEach((player: any) => {
                    allPlayers.push({
                        ...player,
                        teamName: team.teamName,
                        teamCode: team.teamCode || team.teamName?.substring(0, 3).toUpperCase()
                    })
                })
            }
        })

        return NextResponse.json({
            players: allPlayers,
            count: allPlayers.length,
            source: "flattened-squads"
        })
    } catch (error: any) {
        console.error("[/api/players]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
