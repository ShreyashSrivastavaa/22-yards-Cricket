import { getRecentMatches } from '@/lib/localData'

export async function GET() {
  try {
    const matches = getRecentMatches(20)
    return Response.json({ matches })
  } catch (err) {
    return Response.json({ matches: [], error: err.message }, { status: 500 })
  }
}
