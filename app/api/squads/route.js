export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getAllTeams } from "@/lib/cricbuzz"

export async function GET(request) {
    try {
        const teams = await getAllTeams()
        return NextResponse.json({ 
            teams: teams || [],
            source: "rapid-api-teams-list"
        })
    } catch (error) {
        console.error("[/api/squads]", error.message)
        return NextResponse.json({ 
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING",
            details: error.message
        }, { status: 500 })
    }
}
