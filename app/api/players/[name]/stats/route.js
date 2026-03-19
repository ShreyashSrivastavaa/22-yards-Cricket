import prisma from '@/lib/prisma'

export async function GET(_, { params }) {
  try {
    const player = await prisma.player.findFirst({
      where: { name: { equals: decodeURIComponent(params.name), mode: 'insensitive' } }
    })
    if (!player) return Response.json({ error: 'Player not found' }, { status: 404 })
    return Response.json(player)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
