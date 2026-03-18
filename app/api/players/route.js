export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    try {
        const { teams } = await CricketDataService.getSquads()

        // Flatten players from all teams
        const allPlayers = []
        teams.forEach(team => {
            if (team.players) {
                team.players.forEach(player => {
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
    } catch (error) {
        console.error("[/api/players]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
