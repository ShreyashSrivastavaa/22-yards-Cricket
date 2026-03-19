import { searchPlayers, getAllPlayers } from '@/lib/localData'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const players = q.length >= 1 ? searchPlayers(q) : getAllPlayers()
    return Response.json({ players, total: players.length })
  } catch (err) {
    console.error('Players API error:', err)
    return Response.json({ players: [], total: 0, error: err.message }, { status: 500 })
  }
}
