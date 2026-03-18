import { getIPLTeams } from '@/lib/localData'

export async function GET() {
    try {
        const teams = getIPLTeams()
        return Response.json({ 
            teams,
            source: "local-team-archive"
        })
    } catch (error) {
        console.error("Teams API Error:", error)
        return Response.json({ error: "Failed to fetch teams" }, { status: 500 })
    }
}
