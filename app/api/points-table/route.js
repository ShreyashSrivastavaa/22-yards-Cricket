export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seriesId = searchParams.get("seriesId") || "7607"

    try {
        const { pointsTable, source } = await CricketDataService.getPointsTable(seriesId)
        return NextResponse.json({ pointsTable, source })
    } catch (error) {
        console.error("[/api/points-table]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
