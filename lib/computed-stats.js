/**
 * Computed Stats Engine — 22 Yards Proprietary Metrics
 *
 * All 10 derived statistics from the spec.
 * These are computed from raw API data using JS logic.
 * None of these exist in external APIs.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. OUT PERCENTAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function outPercentage(innings, notOuts) {
    if (innings <= 0) return 0
    return ((innings - notOuts) / innings) * 100
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. CONVERSION RATE (30s → 50s)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function conversionRate(fifties, timesReached30) {
    if (timesReached30 <= 0) return 0
    return (fifties / timesReached30) * 100
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. BOUNDARY PERCENTAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function boundaryPercentage(fours, sixes, totalRuns) {
    if (totalRuns <= 0) return 0
    return ((fours * 4 + sixes * 6) / totalRuns) * 100
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FORM RATING (from last 5 scores)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function formRating(lastFiveScores) {
    if (!lastFiveScores.length) return { level: "Unknown", color: "#6b7280", avg: 0 }
    const avg = lastFiveScores.reduce((a, b) => a + b, 0) / lastFiveScores.length
    if (avg > 45) return { level: "Excellent", color: "#10b981", avg }
    if (avg >= 30) return { level: "Good", color: "#eab308", avg }
    if (avg >= 15) return { level: "Average", color: "#f59e0b", avg }
    return { level: "Poor", color: "#ef4444", avg }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. IMPACT SCORE (custom 22 Yards metric, 0-10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function impactScore(inputs) {
    const {
        sr, avg, boundaryPct, knockoutAvg, regularAvg,
        leagueAvgSR, leagueAvgAvg, leagueAvgBoundaryPct,
    } = inputs

    const srComponent = leagueAvgSR > 0 ? (sr / leagueAvgSR) * 0.3 : 0
    const avgComponent = leagueAvgAvg > 0 ? (avg / leagueAvgAvg) * 0.3 : 0
    const boundaryComponent = leagueAvgBoundaryPct > 0 ? (boundaryPct / leagueAvgBoundaryPct) * 0.2 : 0
    const clutchComponent = regularAvg > 0 ? (knockoutAvg / regularAvg) * 0.2 : 0

    const raw = (srComponent + avgComponent + boundaryComponent + clutchComponent) * 10
    return Math.min(10, Math.max(0, parseFloat(raw.toFixed(1))))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. WIN PROBABILITY ADDED (simplified WPA)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function winProbabilityAdded(actualRuns, expectedRuns, matchesPlayed) {
    if (matchesPlayed <= 0) return 0
    return parseFloat(((actualRuns - expectedRuns) / matchesPlayed).toFixed(2))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. AUCTION VALUE RATING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function auctionValueRating(playerImpactScore, auctionPrice, leagueAvgPrice) {
    if (leagueAvgPrice <= 0 || auctionPrice <= 0) return { label: "Fair Value", ratio: 1 }
    const ratio = playerImpactScore / (auctionPrice / leagueAvgPrice)
    if (ratio > 1.2) return { label: "Good Value", ratio }
    if (ratio >= 0.8) return { label: "Fair Value", ratio }
    return { label: "Overpriced", ratio }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. PHASE RATING vs LEAGUE AVERAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function phaseRating(playerSR, leagueAvgSR) {
    if (leagueAvgSR <= 0) return { level: "Average", color: "#f59e0b", delta: 0 }
    const delta = ((playerSR - leagueAvgSR) / leagueAvgSR) * 100
    if (delta > 15) return { level: "Elite", color: "#10b981", delta }
    if (delta >= 0) return { level: "Good", color: "#eab308", delta }
    if (delta >= -15) return { level: "Average", color: "#f59e0b", delta }
    return { level: "Poor", color: "#ef4444", delta }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. OVERALL PLAYER RATING (X.X / 10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function batterRating(inputs) {
    const { avg, sr, ppSRvsAvg, deathSRvsAvg, impact, fielding } = inputs
    const normalized = (
        (Math.min(avg / 50, 1) * 10) * 0.25 +
        (Math.min(sr / 180, 1) * 10) * 0.20 +
        (Math.min(ppSRvsAvg, 1.5) / 1.5 * 10) * 0.15 +
        (Math.min(deathSRvsAvg, 1.5) / 1.5 * 10) * 0.15 +
        impact * 0.15 +
        fielding * 0.10
    )
    return parseFloat(Math.min(10, normalized).toFixed(1))
}

export function bowlerRating(inputs) {
    const { econVsAvg, sr, deathEconVsAvg, wicketsPerMatch, dotBallPct } = inputs
    const econScore = Math.max(0, 10 - (econVsAvg - 0.7) * 10) // Lower econ = higher score
    const srScore = Math.min(10, (20 / Math.max(sr, 1)) * 10)
    const deathScore = Math.max(0, 10 - (deathEconVsAvg - 0.7) * 10)
    const wpmScore = Math.min(10, wicketsPerMatch * 5)
    const dotScore = Math.min(10, dotBallPct / 5)

    const normalized = (
        econScore * 0.25 +
        srScore * 0.20 +
        deathScore * 0.20 +
        wpmScore * 0.20 +
        dotScore * 0.15
    )
    return parseFloat(Math.min(10, normalized).toFixed(1))
}

export function allRounderRating(batRating, bowlRating, fielding, impact) {
    const normalized = batRating * 0.40 + bowlRating * 0.40 + fielding * 0.10 + impact * 0.10
    return parseFloat(Math.min(10, normalized).toFixed(1))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. INJURY RISK RATING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function injuryRiskRating(matchesMissed3Yrs, age, hasInjuryHistory) {
    let level = "Low"
    if (matchesMissed3Yrs >= 10) level = "High"
    else if (matchesMissed3Yrs >= 4) level = "Medium"

    // Age bump
    if (age > 35 && hasInjuryHistory && level !== "High") {
        level = level === "Low" ? "Medium" : "High"
    }

    const colors = {
        Low: "#10b981",
        Medium: "#f59e0b",
        High: "#ef4444",
    }

    return { risk: level, color: colors[level] }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. PRESSURE INDEX (0-10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function pressureIndex(dotBallPct, requiredRR, wicketsDown) {
    // High dot percentage + high RRR + many wickets down = high pressure
    const dotComponent = (dotBallPct / 100) * 4
    const rrrComponent = Math.min(requiredRR / 15, 1) * 3
    const wicketsComponent = (wicketsDown / 10) * 3

    return parseFloat(Math.min(10, dotComponent + rrrComponent + wicketsComponent).toFixed(1))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. CLUTCH PERFORMANCE SCORE (0-10)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function clutchScore(runsInLast3Over, wicketsInLast3Over, matchResult) {
    let score = (runsInLast3Over / 30) * 5 + (wicketsInLast3Over * 2.5)
    if (matchResult === "Won") score += 2
    return parseFloat(Math.min(10, score).toFixed(1))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. RADAR NORMALIZATION (0-100)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function normalizeRadarStats(batting, bowling, impact, clutch, pressure) {
    const sr = batting?.sr || 0
    const avg = batting?.avg || 0
    const boundaryPct = boundaryPercentage(batting?.fours || 0, batting?.sixes || 0, batting?.runs || 0)

    return {
        attack: Math.min(100, (sr / 180) * 100),
        consistency: Math.min(100, (avg / 45) * 100),
        power: Math.min(100, (boundaryPct / 25) * 100),
        clutch: clutch * 10,  // Impact is 0-10, so * 10
        pressure: (10 - pressure) * 10 // Inverse: 0 pressure = 100 on radar
    }
}
