import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

const cache = {}

/**
 * Safe CSV loader with in-memory caching and header transformation.
 */
function loadCSV(relativePath) {
    if (cache[relativePath]) return cache[relativePath]
    try {
        const full = path.join(process.cwd(), relativePath)
        if (!fs.existsSync(full)) {
            console.warn(`[localData] File not found: ${full}`)
            return []
        }
        const raw = fs.readFileSync(full, 'utf8')
        const result = Papa.parse(raw, {
            header: true,
            skipEmptyLines: true,
            transformHeader: h => h.trim(), // removes hidden whitespace in headers
        })
        if (result.errors.length > 0) {
            console.warn(`[localData] Parse warnings for ${relativePath}:`, result.errors.slice(0, 3))
        }
        cache[relativePath] = result.data
        console.log(`[localData] Loaded ${result.data.length} rows from ${relativePath}`)
        return result.data
    } catch (err) {
        console.error(`[localData] Failed to load ${relativePath}:`, err.message)
        return []
    }
}

/**
 * Access IPL deliveries by season.
 */
function getIPLDeliveriesBySeason(season) {
    const pathMapping = {
        '2022': 'datasets/Domestic/Men\'s/IPL/2022/ipl_2022_deliveries.csv',
        '2023': 'datasets/Domestic/Men\'s/IPL/2023/ipl_2023_deliveries.csv',
        '2024': 'datasets/Domestic/Men\'s/IPL/2024/ipl_2024_deliveries.csv',
        '2025': 'datasets/Domestic/Men\'s/IPL/2025/ipl_2025_deliveries.csv'
    }
    const relativePath = pathMapping[season]
    if (!relativePath) return []
    return loadCSV(relativePath)
}

/**
 * Get auction data from the archive.
 */
export function getAuctionPlayers() {
    const data = loadCSV('datasets/archive (3)/IPLPlayerAuctionData.csv')
    return data.map(p => ({
        id: p[''], // Current CSV index or name
        name: p['Player Name'],
        team: p['Team'],
        type: p['Type'],
        price: p['Price Cr'],
        basePrice: p['Base Price']
    }))
}

/**
 * Get unique list of all players from the dataset.
 */
export function getAllPlayers() {
    const seasons = ['2022', '2023', '2024', '2025']
    const playersMap = new Map()

    seasons.forEach(s => {
        const deliveries = getIPLDeliveriesBySeason(s)
        deliveries.forEach(d => {
            const name = d.striker
            if (name && !playersMap.has(name)) {
                playersMap.set(name, {
                    id: name.toLowerCase().replace(/ /g, '-'),
                    name: name,
                    teamCode: d.batting_team,
                    teamName: d.batting_team,
                    role: "PLAYER",
                    codename: `ALPHA-${name.split(' ').map(n => n[0]).join('')}`
                })
            }
        })
    })

    return Array.from(playersMap.values())
}

/**
 * Search players by name.
 */
export function searchPlayers(query) {
    const players = getAllPlayers()
    if (!query) return players.slice(0, 50)
    const q = query.toLowerCase()
    return players.filter(p => p.name.toLowerCase().includes(q))
}

/**
 * Get all teams from the dataset.
 */
export function getIPLTeams() {
    const teams = [
        { id: 1, name: "Mumbai Indians", code: "MI", color: "#004BA0", strengthIndex: "94.2" },
        { id: 2, name: "Chennai Super Kings", code: "CSK", color: "#FCCA06", strengthIndex: "92.8" },
        { id: 3, name: "Royal Challengers Bengaluru", code: "RCB", color: "#D4213D", strengthIndex: "88.4" },
        { id: 4, name: "Kolkata Knight Riders", code: "KKR", color: "#3A225D", strengthIndex: "90.1" },
        { id: 5, name: "Delhi Capitals", code: "DC", color: "#17479E", strengthIndex: "86.5" },
        { id: 6, name: "Punjab Kings", code: "PBKS", color: "#ED1B24", strengthIndex: "82.2" },
        { id: 7, name: "Rajasthan Royals", code: "RR", color: "#EA1A85", strengthIndex: "91.2" },
        { id: 8, name: "Sunrisers Hyderabad", code: "SRH", color: "#FF822A", strengthIndex: "89.5" },
        { id: 9, name: "Gujarat Titans", code: "GT", color: "#1C1C2B", strengthIndex: "87.4" },
        { id: 10, name: "Lucknow Super Giants", code: "LSG", code: "LSG", color: "#5F259F", strengthIndex: "85.8" }
    ]
    return teams
}

/**
 * Get players belonging to a specific team.
 */
export function getPlayersByTeam(teamCode) {
    const players = getAllPlayers()
    return players.filter(p => p.teamCode === teamCode)
}

/**
 * Aggregate stats for a specific player across all seasons.
 */
export function getPlayerStats(playerName) {
    const seasons = ['2022', '2023', '2024', '2025']
    let stats = {
        batting: { runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: "0.0", average: "0.0", innings: 0 },
        bowling: { wickets: 0, runs: 0, balls: 0, economy: "0.0", overs: "0.0", innings: 0 },
        fantasyScore: 0
    }

    seasons.forEach(s => {
        const deliveries = getIPLDeliveriesBySeason(s)
        const matchIdsBattled = new Set()
        const matchIdsBowled = new Set()

        deliveries.forEach(d => {
            // Batting
            if (d.striker === playerName) {
                matchIdsBattled.add(d.match_id)
                const runs = Number(d.runs_off_bat || 0)
                stats.batting.runs += runs
                stats.batting.balls++
                if (runs === 4) stats.batting.fours++
                if (runs === 6) stats.batting.sixes++
            }

            // Bowling
            if (d.bowler === playerName) {
                matchIdsBowled.add(d.match_id)
                const extras = Number(d.wides || 0) + Number(d.noballs || 0)
                const runs = Number(d.runs_off_bat || 0) + extras
                stats.bowling.runs += runs
                stats.bowling.balls++
                if (d.player_dismissed && d.wicket_type !== '' && !['run out', 'retired hurt', 'obstructing the field'].includes(d.wicket_type)) {
                    stats.bowling.wickets++
                }
            }
        })
        stats.batting.innings += matchIdsBattled.size
        stats.bowling.innings += matchIdsBowled.size
    })

    // Final Calculations
    if (stats.batting.balls > 0) {
        stats.batting.strikeRate = ((stats.batting.runs / stats.batting.balls) * 100).toFixed(1)
        stats.batting.average = (stats.batting.runs / Math.max(1, stats.batting.innings)).toFixed(1)
    }

    if (stats.bowling.balls > 0) {
        const overs = Math.floor(stats.bowling.balls / 6) + (stats.bowling.balls % 6) / 10
        stats.bowling.overs = overs.toFixed(1)
        stats.bowling.economy = ((stats.bowling.runs / stats.bowling.balls) * 6).toFixed(2)
    }

    // Surrogate Fantasy Score
    stats.fantasyScore = (stats.batting.runs * 1) + (stats.bowling.wickets * 25) + (stats.batting.sixes * 2)

    return stats
}

/**
 * Get points table for a specific season.
 */
export function getPointsTable(season = '2025') {
    const deliveries = getIPLDeliveriesBySeason(season)
    if (!deliveries.length) return []

    // Group all balls by match_id + innings
    const inningsMap = {}
    deliveries.forEach(d => {
        const key = `${d.match_id}_${d.innings}`
        if (!inningsMap[key]) {
            inningsMap[key] = {
                match_id: d.match_id,
                innings: d.innings,
                batting_team: d.batting_team,
                bowling_team: d.bowling_team,
                runs: 0,
                wickets: 0,
            }
        }
        inningsMap[key].runs += Number(d.runs_off_bat || 0) + Number(d.extras || 0)
        if (d.player_dismissed && d.wicket_type !== '') {
            inningsMap[key].wickets++
        }
    })

    // Get unique match IDs
    const matchIds = [...new Set(deliveries.map(d => d.match_id))]
    const standings = {}

    const initTeam = (name) => {
        if (!standings[name]) {
            standings[name] = {
                team: name, played: 0, won: 0,
                lost: 0, points: 0, nrr: 0, last5: []
            }
        }
    }

    matchIds.forEach(mid => {
        const inn1 = inningsMap[`${mid}_1`]
        const inn2 = inningsMap[`${mid}_2`]
        if (!inn1 || !inn2) return

        const team1 = inn1.batting_team
        const team2 = inn2.batting_team
        initTeam(team1)
        initTeam(team2)

        standings[team1].played++
        standings[team2].played++

        // Team batting 2nd wins if they surpass team 1's score
        if (inn2.runs > inn1.runs) {
            standings[team2].won++
            standings[team2].points += 2
            standings[team2].last5.push('W')
            standings[team1].lost++
            standings[team1].last5.push('L')
        } else {
            standings[team1].won++
            standings[team1].points += 2
            standings[team1].last5.push('W')
            standings[team2].lost++
            standings[team2].last5.push('L')
        }
    })

    return Object.values(standings)
        .map(t => ({ ...t, last5: t.last5.slice(-5) }))
        .sort((a, b) => b.points - a.points || b.won - a.won)
        .map((t, i) => ({
            rank: i + 1,
            teamName: t.team,
            teamShortName: t.team.split(' ').map(n => n[0]).join(''),
            matchesPlayed: t.played,
            matchesWon: t.won,
            points: t.points,
            nrr: t.nrr.toFixed(3)
        }))
}

/**
 * Get recent matches from the dataset.
 */
export function getRecentMatches(season = '2025', limit = 10) {
    const deliveries = getIPLDeliveriesBySeason(season)
    if (!deliveries.length) return []

    const matchesMap = new Map()
    deliveries.forEach(d => {
        if (!matchesMap.has(d.match_id)) {
            matchesMap.set(d.match_id, {
                id: d.match_id,
                date: d.start_date,
                venueName: d.venue,
                team1: d.batting_team, // Placeholder, usually first team batting is team1
                team2: d.bowling_team,
                status: "Final",
                seriesName: "Indian Premier League 2025"
            })
        }
    })

    return Array.from(matchesMap.values()).slice(-limit).reverse()
}

/**
 * Surrogate algorithm for fantasy picks.
 */
export function getFantasyPicks() {
    const players = getAllPlayers().slice(0, 30) // Get top pool
    return players.map(p => {
        const stats = getPlayerStats(p.name)
        return {
            ...p,
            ...stats
        }
    }).sort((a, b) => b.fantasyScore - a.fantasyScore).slice(0, 22)
}
