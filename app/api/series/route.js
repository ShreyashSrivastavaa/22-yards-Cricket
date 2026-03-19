import { getPointsTable } from '@/lib/localData'

export async function GET() {
  try {
    const pointsTable = getPointsTable()
    return Response.json({ pointsTable, season: '2025' })
  } catch (err) {
    return Response.json({ pointsTable: [], error: err.message }, { status: 500 })
  }
}
