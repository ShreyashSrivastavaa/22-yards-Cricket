import prisma from '@/lib/prisma'

export async function GET(_, { params }) {
  try {
    const team = await prisma.team.findFirst({
      where: { code: params.teamId.toLowerCase() }
    })
    if (!team) return Response.json({ error: 'Team not found' }, { status: 404 })
    
    const players = await prisma.player.findMany({
      where: { team: { equals: team.name, mode: 'insensitive' } },
      orderBy: { fantasyScore: 'desc' }
    })
    return Response.json({ team, players })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
