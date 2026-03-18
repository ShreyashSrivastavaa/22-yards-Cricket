export const dynamic = 'force-dynamic'

/**
 * POST /api/refresh-cache
 * Clears and refreshes all cached data.
 * Can be called manually or via a scheduled trigger.
 */
import { NextResponse } from "next/server"
import { clearCache } from "@/lib/cache"

export async function POST() {
    try {
        // Clear all cache tables
        await Promise.all([
            clearCache("players_cache"),
            clearCache("squads_cache"),
            clearCache("leaderboards_cache"),
            clearCache("match_form_cache"),
        ])

        return NextResponse.json({
            message: "All caches cleared successfully",
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error("[/api/refresh-cache]", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
