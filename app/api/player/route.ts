export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
        return NextResponse.json({ error: "Player ID is required" }, { status: 400 })
    }

    try {
        const { player, source } = await CricketDataService.getPlayerProfile(id)
        return NextResponse.json({ player, source })
    } catch (error: any) {
        console.error("[/api/player]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
