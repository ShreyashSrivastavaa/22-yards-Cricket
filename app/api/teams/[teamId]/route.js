export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getIPLTeams, getPlayersByTeam } from '@/lib/localData'

export async function GET(req, { params }) {
    try {
        const teams = getIPLTeams()
        const team = teams.find(
            t => t.code?.toUpperCase() === params.teamId?.toUpperCase() || t.id === Number(params.teamId)
        )
        
        if (!team) return Response.json({ error: 'Team not found' }, { status: 404 })
        
        const players = getPlayersByTeam(team.name)
        return Response.json({ 
            team, 
            players,
            source: "local-roster-archive"
        })
    } catch (error) {
        console.error("Team API Error:", error)
        return Response.json({ error: "Failed to fetch team data" }, { status: 500 })
    }
}
