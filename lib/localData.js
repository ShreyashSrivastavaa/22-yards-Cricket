import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

/**
 * Local Data Engine — CSV Powerhouse
 * Processes ball-by-ball datasets for local intelligence.
 */

// ── CSV Loader (cached) ──────────────────────
const cache = {}

function loadCSV(relativePath) {
    if (cache[relativePath]) return cache[relativePath]
    const full = path.join(process.cwd(), relativePath)
    if (!fs.existsSync(full)) {
        console.warn(`[LocalData] File not found: ${full}`)
        return []
    }
    try {
        const raw = fs.readFileSync(full, 'utf8')
        const result = Papa.parse(raw, { header: true, skipEmptyLines: true })
        cache[relativePath] = result.data
        return result.data
    } catch (error) {
        console.error(`[LocalData] Error parsing ${relativePath}:`, error.message)
        return []
    }
}

// ── Load all IPL seasons ─────────────────────
function getAllIPLDeliveries() {
    return [
        ...loadCSV("datasets/Domestic/Men's/IPL/2022/ipl_2022_deliveries.csv"),
        ...loadCSV("datasets/Domestic/Men's/IPL/2023/ipl_2023_deliveries.csv"),
        ...loadCSV("datasets/Domestic/Men's/IPL/2024/ipl_2024_deliveries.csv"),
        ...loadCSV("datasets/Domestic/Men's/IPL/2025/ipl_2025_deliveries.csv"),
    ]
}

function getIPLDeliveriesBySeason(season) {
    return loadCSV(`datasets/Domestic/Men's/IPL/${season}/ipl_${season}_deliveries.csv`)
}

function getAuctionData() {
    return loadCSV("datasets/archive (3)/IPLPlayerAuctionData.csv")
}

// ── Players ──────────────────────────────────
export function getAllPlayers() {
    const deliveries = getAllIPLDeliveries()
    const playerTeamMap = {}
    
    deliveries.forEach(d => {
        if (d.striker) playerTeamMap[d.striker] = d.batting_team
        if (d.bowler)  playerTeamMap[d.bowler]  = d.bowling_team
    })
    
    return Object.entries(playerTeamMap).map(([name, team], i) => ({
        id: i + 1,
        name,
        teamName: team,
        teamCode: team?.split(' ').map(w => w[0]).join('').toUpperCase(),
        codename: name.split(' ').map(w => w[0]).join('').toUpperCase()
    }))
}

export function searchPlayers(query) {
    const players = getAllPlayers()
    if (!query) return players
    const q = query.toLowerCase()
    return players.filter(p => p.name.toLowerCase().includes(q))
}

// ── Teams ─────────────────────────────────────
export function getIPLTeams() {
    const deliveries = getIPLDeliveriesBySeason('2025')
    const teams = new Set()
    
    deliveries.forEach(d => {
        if (d.batting_team) teams.add(d.batting_team)
        if (d.bowling_team) teams.add(d.bowling_team)
    })
    
    const TEAM_CODES = {
        'Mumbai Indians': 'MI',
        'Chennai Super Kings': 'CSK',
        'Royal Challengers Bengaluru': 'RCB',
        'Kolkata Knight Riders': 'KKR',
        'Delhi Capitals': 'DC',
        'Rajasthan Royals': 'RR',
        'Punjab Kings': 'PBKS',
        'Sunrisers Hyderabad': 'SRH',
        'Gujarat Titans': 'GT',
        'Lucknow Super Giants': 'LSG',
    }
    
    return Array.from(teams).map((name, i) => ({
        id: i + 1,
        name,
        code: TEAM_CODES[name] || name.slice(0, 3).toUpperCase(),
        strengthIndex: (Math.random() * 20 + 80).toFixed(1),
    }))
}

export function getPlayersByTeam(teamName) {
    const deliveries = getAllIPLDeliveries()
    const players = new Set()
    
    deliveries
        .filter(d => d.batting_team === teamName || d.bowling_team === teamName)
        .forEach(d => {
            if (d.batting_team === teamName && d.striker) players.add(d.striker)
            if (d.bowling_team === teamName && d.bowler)  players.add(d.bowler)
        })
        
    return Array.from(players).map((name, i) => ({
        id: i + 1, 
        name, 
        teamName: teamName,
        role: "PLAYER" // Fallback as CSV doesn't have role
    }))
}

// ── Player Stats ──────────────────────────────
export function getPlayerStats(playerName) {
    const deliveries = getAllIPLDeliveries()
    const batting = deliveries.filter(d => d.striker === playerName)
    const bowling = deliveries.filter(d => d.bowler === playerName)

    // Batting Calculations
    const runs = batting.reduce((s, d) => s + Number(d.runs_off_bat || 0), 0)
    const balls = batting.filter(d => !d.wides).length
    const fours = batting.filter(d => d.runs_off_bat === '4').length
    const sixes = batting.filter(d => d.runs_off_bat === '6').length
    const strikeRate = balls > 0 ? ((runs / balls) * 100).toFixed(1) : '0.0'
    const dismissals = batting.filter(d => d.player_dismissed === playerName).length
    const innings = new Set(batting.map(d => d.match_id)).size
    const average = dismissals > 0 ? (runs / dismissals).toFixed(1) : runs.toFixed(1)

    // Bowling Calculations
    const wickets = bowling.filter(d =>
        d.player_dismissed && d.wicket_type !== 'run out'
    ).length
    const bowlingBalls = bowling.filter(d => !d.wides && !d.noballs).length
    const overs = (Math.floor(bowlingBalls / 6) + (bowlingBalls % 6) / 10).toFixed(1)
    const runsConceded = bowling.reduce((s, d) => s + Number(d.runs_off_bat || 0) + Number(d.extras || 0), 0)
    const economy = bowlingBalls > 0 ? ((runsConceded / bowlingBalls) * 6).toFixed(2) : '0.00'

    // Fantasy score logic
    const fantasyScore = (runs * 1) + (wickets * 25) + (fours * 1) + (sixes * 2)

    return {
        name: playerName,
        innings,
        batting: { runs, balls, strikeRate, fours, sixes, average, dismissals },
        bowling: { wickets, overs, economy, runsConceded },
        fantasyScore,
        source: "local-ball-by-ball-engine"
    }
}

// ── Points Table ──────────────────────────────
export function getPointsTable(season = '2025') {
    const deliveries = getIPLDeliveriesBySeason(season)
    if (!deliveries.length) return []

    const standings = {}
    const initTeam = (t) => {
        if (!standings[t]) standings[t] = {
            teamName: t, teamShortName: t.split(' ').map(w => w[0]).join('').toUpperCase(),
            matchesPlayed: 0, matchesWon: 0, matchesLost: 0,
            nrr: "0.000", points: 0, last5: []
        }
    }

    const matchInnings = {}
    deliveries.forEach(d => {
        const key = `${d.match_id}_${d.innings}`
        if (!matchInnings[key]) {
            matchInnings[key] = {
                team: d.batting_team,
                runs: 0, balls: 0
            }
        }
        matchInnings[key].runs += Number(d.runs_off_bat || 0) + Number(d.extras || 0)
        matchInnings[key].balls += (!d.wides && !d.noballs) ? 1 : 0
    })

    const matchIds = [...new Set(deliveries.map(d => d.match_id))]
    matchIds.forEach(mid => {
        const inn1 = matchInnings[`${mid}_1`]
        const inn2 = matchInnings[`${mid}_2`]
        if (!inn1 || !inn2) return
        
        initTeam(inn1.team)
        initTeam(inn2.team)
        
        standings[inn1.team].matchesPlayed++
        standings[inn2.team].matchesPlayed++
        
        if (inn2.runs > inn1.runs) {
            standings[inn2.team].matchesWon++
            standings[inn2.team].points += 2
            standings[inn2.team].last5.push('W')
            standings[inn1.team].matchesLost++
            standings[inn1.team].last5.push('L')
        } else {
            standings[inn1.team].matchesWon++
            standings[inn1.team].points += 2
            standings[inn1.team].last5.push('W')
            standings[inn2.team].matchesLost++
            standings[inn2.team].last5.push('L')
        }
    })

    return Object.values(standings)
        .map(t => ({ ...t, last5: t.last5.slice(-5) }))
        .sort((a, b) => b.points - a.points || b.matchesWon - a.matchesWon)
}

// ── Recent Matches ────────────────────────────
export function getRecentMatches(season = '2025', limit = 10) {
    const deliveries = getIPLDeliveriesBySeason(season)
    const matchMap = {}
    
    deliveries.forEach(d => {
        if (!matchMap[d.match_id]) {
            matchMap[d.match_id] = {
                id: d.match_id,
                matchId: d.match_id,
                date: d.start_date,
                venue: d.venue,
                venueName: d.venue,
                team1: d.batting_team,
                team2: d.bowling_team,
                status: "Completed",
                seriesName: `IPL ${d.season}`
            }
        }
    })
    
    return Object.values(matchMap)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
}

// ── Auction Data ──────────────────────────────
export function getAuctionPlayers(season = null) {
    const data = getAuctionData()
    if (season) return data.filter(p => p.Year === String(season))
    return data
}

// ── Fantasy Recommendations ───────────────────
export function getFantasyPicks() {
    // For performance, we'll pick from a subset of players for recommendations
    const players = getAllPlayers().slice(0, 50)
    const picks = players
        .map(p => ({ ...p, ...getPlayerStats(p.name) }))
        .sort((a, b) => b.fantasyScore - a.fantasyScore)
        .slice(0, 20)
    return picks
}
