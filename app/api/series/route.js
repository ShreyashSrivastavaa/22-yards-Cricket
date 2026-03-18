export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getPointsTable } from '@/lib/localData'

export async function GET() {
    try {
        const pointsTable = getPointsTable('2025')
        return NextResponse.json({
            season: '2025',
            iplSeries: {
                pointsTable
            },
            source: "local-standings-engine"
        })
    } catch (error) {
        console.error("Series API Error:", error)
        return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 })
    }
}
