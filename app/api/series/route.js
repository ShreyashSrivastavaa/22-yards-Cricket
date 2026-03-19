import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const pointsTable = await prisma.pointsTable.findMany({
      where: { season: '2025' },
      orderBy: { rank: 'asc' }
    })
    return Response.json({ pointsTable, season: '2025' })
  } catch (err) {
    return Response.json({ pointsTable: [], error: err.message }, { status: 500 })
  }
}
