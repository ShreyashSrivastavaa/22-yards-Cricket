import { getTeamByCode, getPlayersByTeam } from '@/lib/localData'

export async function GET(request, { params }) {
  try {
    const team = getTeamByCode(params.teamId)
    if (!team) {
      return Response.json({ error: 'Team not found' }, { status: 404 })
    }
    const players = getPlayersByTeam(params.teamId)
    return Response.json({ team, players })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
