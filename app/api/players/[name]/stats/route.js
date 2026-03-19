import { getPlayerStats } from '@/lib/localData'

export async function GET(request, { params }) {
  try {
    const name = decodeURIComponent(params.name)
    const stats = getPlayerStats(name)
    if (!stats) return Response.json({ error: 'Player not found' }, { status: 404 })
    return Response.json(stats)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
