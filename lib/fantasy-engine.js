/**
 * Fantasy Engine: Heuristic-based team generator
 * Maximizes total 'formScore' while respecting credit budget and composition rules.
 */

const BUDGET = 100
const SQUAD_SIZE = 11

// Composition constraints: [min, max]
const ROLE_LIMITS = {
    WK: [1, 4],
    BAT: [3, 6],
    AR: [1, 4],
    BOWL: [3, 6],
}

/**
 * Greedy heuristic: Pick best value (formScore / credits) players
 * while satisfying composition constraints.
 */
export function generateFantasyTeam(pool) {
    const team = []
    let budgetRemaining = BUDGET

    // Phase 1: Fill minimum requirements
    for (const [role, [min]] of Object.entries(ROLE_LIMITS)) {
        const candidates = pool
            .filter(p => p.role === role && !team.includes(p))
            .sort((a, b) => (b.formScore / b.credits) - (a.formScore / a.credits))

        const picks = candidates.slice(0, min)
        for (const p of picks) {
            if (budgetRemaining >= p.credits) {
                team.push(p)
                budgetRemaining -= p.credits
            }
        }
    }

    // Phase 2: Fill remaining slots with best value picks
    const remaining = pool
        .filter(p => !team.includes(p))
        .sort((a, b) => (b.formScore / b.credits) - (a.formScore / a.credits))

    for (const p of remaining) {
        if (team.length >= SQUAD_SIZE) break
        if (budgetRemaining < p.credits) continue

        // Check role max
        const roleCount = team.filter(t => t.role === p.role).length
        const [, max] = ROLE_LIMITS[p.role] || [0, 0]
        if (roleCount >= max) continue

        team.push(p)
        budgetRemaining -= p.credits
    }

    // Pick Captain (highest formScore) and Vice Captain (2nd highest)
    const sorted = [...team].sort((a, b) => b.formScore - a.formScore)
    const captain = sorted[0]
    const viceCaptain = sorted[1]

    return {
        players: team,
        totalCredits: BUDGET - budgetRemaining,
        totalFormScore: team.reduce((s, p) => s + p.formScore, 0),
        captain,
        viceCaptain,
    }
}

/**
 * Identifies differential picks: low ownership + high form
 */
export function getDifferentialPicks(pool, limit = 5) {
    return pool
        .filter(p => p.ownership < 20 && p.formScore >= 7)
        .sort((a, b) => (b.formScore - b.ownership / 10) - (a.formScore - a.ownership / 10))
        .slice(0, limit)
}

/**
 * Identifies must-have picks: high ownership + high form
 */
export function getMustHavePicks(pool, limit = 3) {
    return pool
        .filter(p => p.ownership > 60 && p.formScore >= 8)
        .sort((a, b) => b.formScore - a.formScore)
        .slice(0, limit)
}
