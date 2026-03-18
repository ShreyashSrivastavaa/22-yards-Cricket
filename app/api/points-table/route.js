export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getSeries } from "@/lib/cricbuzz"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seriesId = searchParams.get("seriesId")

    try {
        const seriesData = await getSeries()
        const series = seriesData || []

        // If seriesId is provided, try to find that specific series (if supported by API)
        // However, the current Free API only gives a list of series.
        // As per requirements for the predictor page, we look for IPL dynamically.
        const iplSeries = series.find(s => s.name?.toLowerCase().includes('ipl'))

        if (!iplSeries) {
            return NextResponse.json({ 
                error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM OFFLINE",
                pointsTable: []
            }, { status: 404 })
        }

        return NextResponse.json({ 
            pointsTable: [iplSeries], // API structure might differ, wrapping in array for compatibility
            source: "rapid-api-series-lookup" 
        })
    } catch (error) {
        console.error("[/api/points-table]", error.message)
        return NextResponse.json({ 
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING",
            details: error.message 
        }, { status: 500 })
    }
}
