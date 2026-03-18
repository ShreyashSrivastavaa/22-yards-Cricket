export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getAllTeams, getPlayersByTeam } from "@/lib/cricbuzz"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const name = searchParams.get("name")

    if (!id && !name) {
        return NextResponse.json({ error: "Player identifier (id or name) is required" }, { status: 400 })
    }

    try {
        // Since the new API doesn't have a specific player detail endpoint, 
        // we must find the player in the squads.
        const teams = await getAllTeams()
        const playerResults = await Promise.all(
            (teams || []).map(async (team) => {
                try {
                    const squad = await getPlayersByTeam(team.id || team.teamId)
                    return (squad || []).map(player => ({
                        ...player,
                        teamName: team.name || team.teamName,
                        teamId: team.id || team.teamId
                    }))
                } catch { return [] }
            })
        )

        const allPlayers = playerResults.flat()
        let player = null

        if (id) {
            player = allPlayers.find(p => String(p.id) === String(id) || String(p.playerId) === String(id))
        } else if (name) {
            player = allPlayers.find(p => p.name?.toLowerCase() === name.toLowerCase())
        }

        if (player) {
            return NextResponse.json({ 
                player: {
                    ...player,
                    // Mock empty stats as they are no longer available in the new API
                    batting: {},
                    bowling: {},
                }, 
                source: "rapid-api-squad-lookup" 
            })
        }

        return NextResponse.json({ error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM OFFLINE" }, { status: 404 })
    } catch (error) {
        console.error("[/api/player]", error.message)
        return NextResponse.json({ 
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING",
            details: error.message 
        }, { status: 500 })
    }
}
