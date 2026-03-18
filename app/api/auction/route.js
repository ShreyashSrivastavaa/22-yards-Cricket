import { getAuctionPlayers } from '@/lib/localData'

export async function GET(req) {
    try {
        const season = new URL(req.url).searchParams.get('season')
        const players = getAuctionPlayers(season)
        return Response.json({ 
            players,
            source: "local-auction-archive"
        })
    } catch (error) {
        console.error("Auction API Error:", error)
        return Response.json({ error: "Failed to fetch auction data" }, { status: 500 })
    }
}
