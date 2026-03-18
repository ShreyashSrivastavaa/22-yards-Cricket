import { searchPlayers } from '@/lib/localData'

export async function GET(req) {
    try {
        const q = new URL(req.url).searchParams.get('q')
        const players = searchPlayers(q)
        return Response.json({ 
            players,
            count: players.length,
            source: "local-intelligence-archive"
        })
    } catch (error) {
        console.error("Players API Error:", error)
        return Response.json({ 
            players: [], 
            error: "NO INTELLIGENCE DATA AVAILABLE — SYSTEM INITIALIZING" 
        }, { status: 500 })
    }
}
