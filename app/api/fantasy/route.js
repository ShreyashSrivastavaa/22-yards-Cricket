import { getFantasyPicks } from '@/lib/localData'

export async function GET() {
    try {
        const picks = getFantasyPicks()
        return Response.json({ 
            picks,
            source: "local-fantasy-engine"
        })
    } catch (error) {
        console.error("Fantasy API Error:", error)
        return Response.json({ error: "Failed to fetch fantasy picks" }, { status: 500 })
    }
}
