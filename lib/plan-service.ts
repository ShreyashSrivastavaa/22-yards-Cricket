/**
 * 22 Yards Plan Service
 * 
 * Logic for managing user tiers and gating premium "Startup-Grade" features.
 */

export type UserPlan = "FREE" | "PRO" | "ELITE"

export class PlanService {
    /**
     * Get the current plan for a user (mocked for Phase 7 demonstration).
     */
    static async getUserPlan(userId?: string): Promise<UserPlan> {
        // In a real app, this would fetch from Supabase 'user_profiles'
        return "FREE"
    }

    /**
     * Check if a feature is accessible.
     */
    static isFeatureAccessible(plan: UserPlan, feature: string): boolean {
        const matrix: Record<UserPlan, string[]> = {
            "FREE": ["dashboard", "basic-stats", "player-search"],
            "PRO": ["dashboard", "basic-stats", "player-search", "deep-insights", "radar-charts", "match-sims"],
            "ELITE": ["dashboard", "basic-stats", "player-search", "deep-insights", "radar-charts", "match-sims", "api-access"]
        }

        return matrix[plan].includes(feature)
    }

    /**
     * Get upgrade message for a gated feature.
     */
    static getUpgradeMessage(feature: string): string {
        return `The '${feature}' feature is reserved for 22 Yards PRO subscribers. Upgrade now to unlock deep analytical narratives and proprietary match simulations.`
    }
}
