import { getIPLTeams } from '@/lib/localData'

export async function GET() {
  try {
    return Response.json({ teams: getIPLTeams() })
  } catch (err) {
    return Response.json({ teams: [], error: err.message }, { status: 500 })
  }
}
