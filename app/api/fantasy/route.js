import { getFantasyPicks } from '@/lib/localData'

export async function GET() {
  try {
    const picks = getFantasyPicks(20)
    return Response.json({ picks })
  } catch (err) {
    return Response.json({ picks: [], error: err.message }, { status: 500 })
  }
}
