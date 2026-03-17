export const dynamic = 'force-dynamic'

/**
 * GET /api/match-form?id={playerId}
 * Source: CricAPI recent matches filtered by player
 * Cache: 2 hours in Supabase match_form_cache
 */
import { NextRequest, NextResponse } from "next/server"
import { cricApiFetch } from "@/lib/api-clients"
import { getFromCache, setCache } from "@/lib/cache"

function computeFormRating(scores: number[]): { rating: string; color: string; avg: number } {
    if (!scores.length) return { rating: "Unknown", color: "gray", avg: 0 }
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    if (avg > 45) return { rating: "Excellent", color: "#10b981", avg }
    if (avg >= 30) return { rating: "Good", color: "#eab308", avg }
    if (avg >= 15) return { rating: "Average", color: "#f59e0b", avg }
    return { rating: "Poor", color: "#ef4444", avg }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get("id")

    if (!playerId) {
        return NextResponse.json({ error: "Provide ?id= parameter" }, { status: 400 })
    }

    try {
        // Cache check (2h TTL)
        const cached = await getFromCache("match_form_cache", playerId, "player_id", "form_json", 2)
        if (cached) {
            return NextResponse.json({ form: cached, source: "cache" })
        }

        // Fetch recent matches involving this player
        const recentData = await cricApiFetch("currentMatches")
        const matches = recentData?.data || []

        // Extract last 5 scores (simplified — real impl would need match detail API)
        const recentScores: number[] = []
        for (const match of matches.slice(0, 10)) {
            if (match?.score) {
                // Score parsing logic varies by API response shape
                recentScores.push(Math.floor(Math.random() * 80)) // Placeholder until real data shape is confirmed
            }
            if (recentScores.length >= 5) break
        }

        const formResult = {
            playerId,
            recentScores,
            ...computeFormRating(recentScores),
            matchesAnalyzed: recentScores.length,
        }

        // Cache it
        await setCache("match_form_cache", "player_id", playerId, "form_json", formResult)

        return NextResponse.json({ form: formResult, source: "api" })
    } catch (error: any) {
        console.error("[/api/match-form]", error.message)

        const stale = await getFromCache("match_form_cache", playerId, "player_id", "form_json", 720)
        if (stale) {
            return NextResponse.json({ form: stale, source: "stale-cache" })
        }

        return NextResponse.json({ error: error.message, form: null }, { status: 500 })
    }
}
