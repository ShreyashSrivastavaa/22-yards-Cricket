import { getRecentMatches } from '@/lib/localData'
import { getLiveMatches } from '@/lib/liveData'

export async function GET() {
    try {
        const [localMatches, liveMatches] = await Promise.all([
            Promise.resolve(getRecentMatches('2025', 10)),
            getLiveMatches(),
        ])

        return Response.json({
            matches: liveMatches.length > 0 ? liveMatches : localMatches,
            live: liveMatches, // currently ongoing matches
            recent: localMatches, // historical from CSV
            source: liveMatches.length > 0 ? 'live' : 'local'
        })
    } catch (error) {
        console.error("Matches API Error:", error)
        return Response.json({ error: "Failed to fetch matches" }, { status: 500 })
    }
}
