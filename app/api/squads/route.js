export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    try {
        const { teams, source } = await CricketDataService.getSquads()
        return NextResponse.json({ teams, source })
    } catch (error) {
        console.error("[/api/squads]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
