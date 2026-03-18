export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { getRecentMatches } from '@/lib/localData'

export async function GET() {
    try {
        const matches = getRecentMatches('2025')
        return NextResponse.json({ 
            matches,
            source: "local-match-archive"
        })
    } catch (error) {
        console.error("Matches API Error:", error)
        return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 })
    }
}
