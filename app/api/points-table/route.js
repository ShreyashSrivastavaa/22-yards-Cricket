export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const seriesId = searchParams.get("seriesId")

    try {
        const { pointsTable } = await CricketDataService.getPointsTable('2025')
        
        if (!pointsTable || pointsTable.length === 0) {
            return NextResponse.json({ 
                error: "NO DATA IN LOCAL DATASET",
                pointsTable: []
            }, { status: 404 })
        }

        return NextResponse.json({ 
            pointsTable,
            source: "local-dataset-aggregation" 
        })
    } catch (error) {
        console.error("[/api/points-table]", error.message)
        return NextResponse.json({ 
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING",
            details: error.message 
        }, { status: 500 })
    }
}
