import prisma from '@/lib/prisma'

export async function GET(_, { params }) {
  try {
    const player = await prisma.player.findFirst({
      where: { name: { equals: decodeURIComponent(params.name), mode: 'insensitive' } }
    })
    if (!player) return Response.json({ error: 'Player not found' }, { status: 404 })

    // Transform flat Prisma object into nested structure for UI
    const stats = {
      ...player,
      batting: {
        runs: player.runs || 0,
        balls: player.balls || 0,
        strikeRate: player.strikeRate || 0,
        average: player.average || 0,
        fours: player.fours || 0,
        sixes: player.sixes || 0,
      },
      bowling: {
        wickets: player.wickets || 0,
        economy: player.economy || 0,
        overs: 0, // Default for now until schema supports it
      }
    }

    return Response.json(stats)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
