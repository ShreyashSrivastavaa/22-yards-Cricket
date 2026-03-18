export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "Missing match ID" }, { status: 400 })

    try {
        const { match, source } = await CricketDataService.getMatchDetails(id)
        return NextResponse.json({ match, source })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
