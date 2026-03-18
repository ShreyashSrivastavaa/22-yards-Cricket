export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "upcoming"

    try {
        const { matches, source } = await CricketDataService.getMatches(type)
        return NextResponse.json({ matches, source })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
