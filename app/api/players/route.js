import { searchPlayers } from '@/lib/localData'
import { searchPlayerOnline } from '@/lib/liveData'

export async function GET(req) {
    try {
        const q = new URL(req.url).searchParams.get('q') || ''

        // Always get local results instantly
        const localPlayers = searchPlayers(q)

        // If query is 3+ chars, also try live search
        let onlinePlayers = []
        let source = "local"

        if (q.length >= 3) {
            const online = await searchPlayerOnline(q)
            if (online && online.length > 0) {
                source = "live"
                // Merge: add online players not already in local results
                onlinePlayers = online
                    .filter(op => !localPlayers.some(
                        lp => lp.name.toLowerCase() === op.name.toLowerCase()
                    ))
                    .map(op => ({
                        id: op.id,
                        name: op.name,
                        teamCode: op.teamName || 'Intl',
                        teamName: op.teamName || 'International',
                        country: op.country,
                        role: "PLAYER",
                        codename: `ONLINE-${op.id.slice(0, 4)}`,
                        source: 'live', // flag so UI can show a badge
                    }))
            }
        }

        const merged = [...localPlayers, ...onlinePlayers]

        return Response.json({
            players: merged,
            count: merged.length,
            source: source
        })
    } catch (error) {
        console.error("Players API Error:", error)
        return Response.json({
            players: [],
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING"
        }, { status: 500 })
    }
}
