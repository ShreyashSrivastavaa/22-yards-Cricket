import prisma from '@/lib/prisma'

export async function GET(req) {
  try {
    const q = new URL(req.url).searchParams.get('q') || ''
    const players = await prisma.player.findMany({
      where: q ? { name: { contains: q, mode: 'insensitive' } } : {},
      orderBy: { fantasyScore: 'desc' },
      take: q ? 50 : 50
    })
    return Response.json({ players, total: players.length })
  } catch (err) {
    console.error('Players API error:', err)
    return Response.json({ players: [], total: 0, error: err.message }, { status: 500 })
  }
}
