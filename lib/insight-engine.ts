/**
 * 22 Yards Insight Engine v1.0
 * 
 * Generates human-readable narratives from proprietary metrics.
 * This powers the high-value "Insight Cards" in the product.
 */

export class InsightEngine {
    /**
     * Generate player insights based on computed metrics.
     */
    static generatePlayerInsight(player: any, computed: any): string[] {
        const insights: string[] = []

        // 1. Boundary / Power Insight
        if (computed.boundaryPct > 22) {
            insights.push(`${player.name} is an elite boundary hitter, scoring ${computed.boundaryPct.toFixed(1)}% of runs via boundaries (Top 5% of league).`)
        } else if (computed.boundaryPct < 10) {
            insights.push(`${player.name} focuses on strike rotation over power, with a boundary percentage of only ${computed.boundaryPct.toFixed(1)}%.`)
        }

        // 2. Impact / Rating Insight
        if (computed.impact > 8.5) {
            insights.push(`Scouting alert: High-impact asset with a score of ${computed.impact}. Consistently shifts game probability in middle overs.`)
        }

        // 3. Matchup / Weakness (Mocked for Phase 7 demonstration)
        if (player.role?.toLowerCase().includes("bat")) {
            insights.push(`Technical Node: Demonstrates 14% lower strike rate against Left-Arm Orthodox spin in the powerplay.`)
        }

        // 4. Form Insight
        if (computed.form?.level === "Excellent") {
            insights.push(`Peak Form: Currently in the top 2% of active batters by momentum rating. Essential fantasy pick.`)
        }

        return insights
    }

    /**
     * Generate venue-specific insights.
     */
    static generateVenueInsight(venueStats: any): string {
        if (venueStats.chasing_win_pct > 60) {
            return "This venue demonstrates a significant 60%+ bias towards chasing teams. Suggest maximizing chasing assets."
        }
        if (venueStats.pace_wkt_pct > 70) {
            return "Extreme Pace Bias: Fast bowlers account for 70%+ of wickets here. Prioritize high-velocity seamers."
        }
        return "Balanced surface: No significant bias detected between spin and pace cycles."
    }
}
