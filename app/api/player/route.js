export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { CricketDataService } from "@/lib/cricket-data-service"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const name = searchParams.get("name")

    if (!id && !name) {
        return NextResponse.json({ error: "Player identifier (id or name) is required" }, { status: 400 })
    }

    try {
        if (id) {
            // First try direct ID lookup
            const { player, source } = await CricketDataService.getPlayerProfile(id)
            if (player && player.batting && Object.keys(player.batting).length > 0) {
                return NextResponse.json({ player, source })
            }

            // If ID lookup returns empty shell, maybe it's a name slug
            if (isNaN(Number(id))) {
                const { teams } = await CricketDataService.getSquads()
                let foundPlayer = null
                teams.forEach(team => {
                    team.players?.forEach(p => {
                        const slug = p.name?.toLowerCase().replace(/\s+/g, '-')
                        if (slug === id.toLowerCase() || p.name?.toLowerCase() === id.toLowerCase().replace(/-/g, ' ')) {
                            foundPlayer = p
                        }
                    })
                })

                if (foundPlayer) {
                    const { player: fullPlayer, source: fullSource } = await CricketDataService.getPlayerProfile(foundPlayer.id)
                    return NextResponse.json({ player: fullPlayer, source: fullSource })
                }
            }
        }

        if (name) {
            const { teams } = await CricketDataService.getSquads()
            let playerId = null
            teams.forEach(team => {
                team.players?.forEach(p => {
                    if (p.name?.toLowerCase() === name.toLowerCase()) {
                        playerId = p.id
                    }
                })
            })

            if (playerId) {
                const { player, source } = await CricketDataService.getPlayerProfile(playerId)
                return NextResponse.json({ player, source })
            }
        }

        return NextResponse.json({ error: "Player not found" }, { status: 404 })
    } catch (error) {
        console.error("[/api/player]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
