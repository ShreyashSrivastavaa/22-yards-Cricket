import { getPointsTable } from '@/lib/localData'
import { getIPLSeriesId, getLivePointsTable } from '@/lib/liveData'

export async function GET() {
    try {
        // Try live points table first
        const seriesId = await getIPLSeriesId()
        let liveTable = []
        if (seriesId) {
            liveTable = await getLivePointsTable(seriesId)
        }

        // Fall back to local computed table
        const localTable = getPointsTable('2025')

        const hasLive = liveTable && liveTable.length > 0

        return Response.json({
            iplSeries: {
                pointsTable: hasLive ? liveTable : localTable
            },
            source: hasLive ? 'live' : 'local',
            season: '2025',
        })
    } catch (error) {
        console.error("Series API Error:", error)
        return Response.json({ error: "Failed to fetch series data" }, { status: 500 })
    }
}
