import { getPlayerStats } from '@/lib/localData'

export async function GET(req, { params }) {
    try {
        const stats = getPlayerStats(decodeURIComponent(params.name))
        return Response.json(stats)
    } catch (error) {
        console.error("Player Stats API Error:", error)
        return Response.json({ error: "Failed to fetch player stats" }, { status: 500 })
    }
}
