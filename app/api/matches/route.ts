export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "upcoming"

    try {
        const { matches, source } = await CricketDataService.getMatches(type)
        return NextResponse.json({ matches, source })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
