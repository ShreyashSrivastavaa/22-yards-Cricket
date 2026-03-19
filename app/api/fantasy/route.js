import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const picks = await prisma.player.findMany({
      orderBy: { fantasyScore: 'desc' },
      take: 20
    })
    return Response.json({ picks })
  } catch (err) {
    return Response.json({ picks: [], error: err.message }, { status: 500 })
  }
}
