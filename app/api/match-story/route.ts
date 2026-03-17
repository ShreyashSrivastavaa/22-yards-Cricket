export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/match-story
 * Provides a mock intelligence feed of match turning points.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('id') || 'live'

    const events = [
        {
            over: "4.2",
            description: "Rohit Sharma dismissed by Pathirana. Top edge to short fine leg.",
            impact: "-14.2% Win Prob",
            type: "wicket"
        },
        {
            over: "7.5",
            description: "Maximum! Suryakumar Yadav paddles it over fine leg. 12 runs off the over so far.",
            impact: "+4.1% Win Prob",
            type: "boundary"
        },
        {
            over: "11.1",
            description: "Strategic Timeout. Intelligence Node: Projected score suggests chasing is now favorited (+62%).",
            impact: "+8.5% Win Prob",
            type: "turning-point"
        },
        {
            over: "14.4",
            description: "Kieron Pollard run out! Massive mix-up in the middle.",
            impact: "-18.5% Win Prob",
            type: "wicket"
        },
        {
            over: "18.2",
            description: "Matheesha Pathirana defends 12 runs in the penultimate over. Executes perfect yorkers.",
            impact: "+12.2% Win Prob",
            type: "turning-point"
        }
    ]

    return NextResponse.json({
        matchId,
        events,
        source: "AI Match Intelligence Engine v1.4"
    })
}
