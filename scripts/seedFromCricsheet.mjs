import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ✅ Increased pool timeout for large bulk operations
const prisma = new PrismaClient({
    log: ['error'],
})

const DATA_DIR = path.join(__dirname, '../datasets/cricsheet_full')

const TEAM_MAPPINGS = {
    'Mumbai Indians': 'Mumbai Indians',
    'Chennai Super Kings': 'Chennai Super Kings',
    'Royal Challengers Bangalore': 'Royal Challengers Bengaluru',
    'Royal Challengers Bengaluru': 'Royal Challengers Bengaluru',
    'Kolkata Knight Riders': 'Kolkata Knight Riders',
    'Delhi Daredevils': 'Delhi Capitals',
    'Delhi Capitals': 'Delhi Capitals',
    'Rajasthan Royals': 'Rajasthan Royals',
    'Kings XI Punjab': 'Punjab Kings',
    'Punjab Kings': 'Punjab Kings',
    'Sunrisers Hyderabad': 'Sunrisers Hyderabad',
    'Deccan Chargers': 'Sunrisers Hyderabad',
    'Gujarat Titans': 'Gujarat Titans',
    'Lucknow Super Giants': 'Lucknow Super Giants',
    'Rising Pune Supergiant': 'Rising Pune Supergiants',
    'Rising Pune Supergiants': 'Rising Pune Supergiants',
    'Gujarat Lions': 'Gujarat Lions',
    'Pune Warriors': 'Pune Warriors',
    'Kochi Tuskers Kerala': 'Kochi Tuskers Kerala',
}

const TEAM_META = {
    'Mumbai Indians': { code: 'mi', color: '#004BA0' },
    'Chennai Super Kings': { code: 'csk', color: '#F9CD05' },
    'Royal Challengers Bengaluru': { code: 'rcb', color: '#EC1C24' },
    'Kolkata Knight Riders': { code: 'kkr', color: '#3A225D' },
    'Delhi Capitals': { code: 'dc', color: '#0078BC' },
    'Rajasthan Royals': { code: 'rr', color: '#EA1A85' },
    'Punjab Kings': { code: 'pbks', color: '#ED1B24' },
    'Sunrisers Hyderabad': { code: 'srh', color: '#F7A721' },
    'Gujarat Titans': { code: 'gt', color: '#1C1C1C' },
    'Lucknow Super Giants': { code: 'lsg', color: '#A72056' },
}

function normalizeTeam(name) {
    if (!name) return name
    return TEAM_MAPPINGS[name] || name
}

function getRunsConceded(d) {
    let r = d.runs.batter || 0
    if (d.runs.extras && (d.extras?.wides || d.extras?.noballs)) {
        r += d.runs.extras || 0
    }
    return r
}

function processMatchFile(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const match = JSON.parse(raw)
    const info = match.info

    const isIPL = info.event?.name?.includes('Indian Premier League')
    const isInternational = info.team_type === 'international'
    if (!isIPL && !isInternational) return null

    const tournament = isIPL ? 'IPL' : (info.event?.name || info.match_type || 'Unknown')
    const season = String(info.season || '').split('/')[0]
    const matchId = path.basename(filePath, '.json')

    const matchData = {
        id: matchId,
        season,
        date: info.dates?.[0] || null,
        venue: info.venue || null,
        team1: normalizeTeam(info.teams?.[0]),
        team2: normalizeTeam(info.teams?.[1]),
        winner: normalizeTeam(info.outcome?.winner || 'Draw'),
    }

    if (!match.innings) return null

    const playerStatsList = []

    for (const inning of match.innings) {
        const team = normalizeTeam(inning.team)
        for (const over of inning.overs) {
            for (const d of over.deliveries) {
                const batter = d.batter
                const bowler = d.bowler
                
                playerStatsList.push({
                    player: batter,
                    team,
                    runs: d.runs.batter || 0,
                    balls: d.extras?.wides ? 0 : 1,
                    out: d.wickets ? 1 : 0,
                    fours: d.runs.batter === 4 ? 1 : 0,
                    sixes: d.runs.batter === 6 ? 1 : 0,
                    bowlBalls: (d.extras?.wides || d.extras?.noballs) ? 0 : 1,
                    bowlRuns: getRunsConceded(d),
                    wickets: (d.wickets && !['run out', 'retired hurt', 'obstructing the field'].includes(d.wickets[0].kind)) ? 1 : 0,
                    tournament,
                    season
                })
            }
        }
    }

    return { matchId, matchData, playerStatsList, isIPL, tournament, format: info.match_type || 'Unknown' }
}

async function main() {
    console.log(`🚀 Starting MEGA OPTIMIZED Cricsheet Seeding...`)
    
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'))
    console.log(`📂 Found ${files.length} files. Parsing...`)

    const iplMatches = []
    const intlMatches = []
    const tournamentStats = {} // tKey -> obj
    const aggregatePlayerStats = {} // name -> obj

    let processed = 0
    for (const file of files) {
        const filePath = path.join(DATA_DIR, file)
        try {
            const result = processMatchFile(filePath)
            if (result) {
                if (result.isIPL) iplMatches.push(result)
                else intlMatches.push(result)

                // Aggregate stats in memory
                for (const s of result.playerStatsList) {
                    // Tournament Stats
                    const tKey = `${s.player}_${s.tournament}_${s.season}`
                    if (!tournamentStats[tKey]) {
                        tournamentStats[tKey] = { playerName: s.player, tournament: s.tournament, season: s.season, team: s.team, runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, innings: 0 }
                    }
                    const ts = tournamentStats[tKey]
                    ts.runs += s.runs; ts.balls += s.balls; ts.fours += s.fours; ts.sixes += s.sixes; ts.wickets += s.wickets

                    // Player Stats
                    if (!aggregatePlayerStats[s.player]) {
                        aggregatePlayerStats[s.player] = { name: s.player, team: s.team, innings: 0, runs: 0, balls: 0, outs: 0, fours: 0, sixes: 0, wickets: 0, bowlBalls: 0, bowlRuns: 0 }
                    }
                    const ps = aggregatePlayerStats[s.player]
                    ps.runs += s.runs; ps.balls += s.balls; ps.fours += s.fours; ps.sixes += s.sixes; 
                    ps.wickets += s.wickets; ps.bowlBalls += s.bowlBalls; ps.bowlRuns += s.bowlRuns; ps.outs += s.out
                }
                
                // Fix innings count
                const matchPlayers = new Set(result.playerStatsList.map(s => s.player))
                for (const pName of matchPlayers) {
                    const tKey = `${pName}_${result.tournament}_${result.season}`
                    tournamentStats[tKey].innings++
                    aggregatePlayerStats[pName].innings++
                }
            }
        } catch (err) {
            console.error(`\n❌ Error processing ${file}: ${err.message}`)
        }
        processed++
        if (processed % 2000 === 0) process.stdout.write(`  Parsed ${processed}/${files.length} files...\r`)
    }
    console.log(`\n✅ Parsed ${iplMatches.length + intlMatches.length} relevant matches.`)

    // ── PHASE 3: MEGA OPTIMIZED DB writes ────────────────────────────────────

    // 3a. Matches (ipl & intl combined)
    const allMatchesData = [
        ...iplMatches.map(m => m.matchData),
        ...intlMatches.map(m => ({ ...m.matchData, tournament: m.tournament, format: m.format }))
    ]
    
    console.log(`🔄 Syncing ${allMatchesData.length} Matches (createMany)...`)
    for (let i = 0; i < allMatchesData.length; i += 1000) {
        const chunk = allMatchesData.slice(i, i + 1000)
        // Note: InternationalMatch and Match are separate tables in schema
        const iplChunk = chunk.filter(c => !c.format)
        const intlChunk = chunk.filter(c => c.format)
        
        if (iplChunk.length) await prisma.match.createMany({ data: iplChunk, skipDuplicates: true })
        if (intlChunk.length) await prisma.internationalMatch.createMany({ data: intlChunk, skipDuplicates: true })
        process.stdout.write(`  Matches: ${Math.min(i + 1000, allMatchesData.length)}/${allMatchesData.length}\r`)
    }
    console.log(`\n  ✅ Matches complete.`)

    // 3b. Player Stats (Bulk Upsert via Raw SQL)
    const players = Object.values(aggregatePlayerStats)
    console.log(`🔄 Syncing ${players.length} Players (Bulk Raw SQL)...`)
    for (let i = 0; i < players.length; i += 500) {
        const chunk = players.slice(i, i + 500)
        const values = []
        const placeholders = chunk.map((p, idx) => {
            const offset = idx * 14
            const sr = p.balls > 0 ? +((p.runs / p.balls) * 100).toFixed(2) : 0
            const avg = p.outs > 0 ? +(p.runs / p.outs).toFixed(2) : p.runs
            const eco = p.bowlBalls > 0 ? +((p.bowlRuns / p.bowlBalls) * 6).toFixed(2) : 0
            const fan = (p.runs * 1) + (p.wickets * 25) + (p.fours * 1) + (p.sixes * 2)
            
            values.push(p.name, p.team, p.innings, p.runs, p.balls, sr, avg, p.fours, p.sixes, p.wickets, eco, p.bowlBalls, p.bowlRuns, fan)
            return `($${offset+1}, $${offset+2}, $${offset+3}, $${offset+4}, $${offset+5}, $${offset+6}, $${offset+7}, $${offset+8}, $${offset+9}, $${offset+10}, $${offset+11}, $${offset+12}, $${offset+13}, $${offset+14})`
        }).join(',')

        await prisma.$executeRawUnsafe(`
            INSERT INTO "players" ("name", "team", "innings", "runs", "balls", "strike_rate", "average", "fours", "sixes", "wickets", "economy", "bowling_balls", "bowling_runs", "fantasy_score")
            VALUES ${placeholders}
            ON CONFLICT ("name") DO UPDATE SET
                "team" = EXCLUDED."team",
                "innings" = EXCLUDED."innings",
                "runs" = EXCLUDED."runs",
                "balls" = EXCLUDED."balls",
                "strike_rate" = EXCLUDED."strike_rate",
                "average" = EXCLUDED."average",
                "fours" = EXCLUDED."fours",
                "sixes" = EXCLUDED."sixes",
                "wickets" = EXCLUDED."wickets",
                "economy" = EXCLUDED."economy",
                "bowling_balls" = EXCLUDED."bowling_balls",
                "bowling_runs" = EXCLUDED."bowling_runs",
                "fantasy_score" = EXCLUDED."fantasy_score"
        `, ...values)
        process.stdout.write(`  Players: ${Math.min(i + 500, players.length)}/${players.length}\r`)
    }
    console.log(`\n  ✅ Players complete.`)

    // 3c. Tournament Stats (Bulk Raw SQL)
    const tStats = Object.values(tournamentStats)
    console.log(`🔄 Syncing ${tStats.length} Tournament Stats (Bulk Raw SQL)...`)
    for (let i = 0; i < tStats.length; i += 400) {
        const chunk = tStats.slice(i, i + 400)
        const values = []
        const placeholders = chunk.map((t, idx) => {
            const offset = idx * 13
            const sr = t.balls > 0 ? +((t.runs / t.balls) * 100).toFixed(2) : 0
            const fan = (t.runs * 1) + (t.wickets * 25) + (t.fours * 1) + (t.sixes * 2)
            
            values.push(t.playerName, t.tournament, t.season, t.team, t.runs, t.balls, sr, t.fours, t.sixes, t.wickets, 0, t.innings, fan)
            return `($${offset+1}, $${offset+2}, $${offset+3}, $${offset+4}, $${offset+5}, $${offset+6}, $${offset+7}, $${offset+8}, $${offset+9}, $${offset+10}, $${offset+11}, $${offset+12}, $${offset+13})`
        }).join(',')

        await prisma.$executeRawUnsafe(`
            INSERT INTO "player_tournament_stats" ("player_name", "tournament", "season", "team", "runs", "balls", "strike_rate", "fours", "sixes", "wickets", "economy", "innings", "fantasy_score")
            VALUES ${placeholders}
            ON CONFLICT ("player_name", "tournament", "season") DO UPDATE SET
                "team" = EXCLUDED."team",
                "runs" = EXCLUDED."runs",
                "balls" = EXCLUDED."balls",
                "strike_rate" = EXCLUDED."strike_rate",
                "fours" = EXCLUDED."fours",
                "sixes" = EXCLUDED."sixes",
                "wickets" = EXCLUDED."wickets",
                "innings" = EXCLUDED."innings",
                "fantasy_score" = EXCLUDED."fantasy_score"
        `, ...values)
        process.stdout.write(`  Tournament Stats: ${Math.min(i + 400, tStats.length)}/${tStats.length}\r`)
    }
    console.log(`\n  ✅ Tournament Stats complete.`)

    // 3d. Team Metadata (Standard Prisma is fine for 10 records)
    console.log(`🔄 Bootstrapping Team Metadata...`)
    await Promise.all(Object.entries(TEAM_META).map(([name, meta]) => 
        prisma.team.upsert({
            where: { name },
            update: { code: meta.code, color: meta.color },
            create: { name, code: meta.code, color: meta.color },
        })
    ))

    console.log(`\n✨ MEGA OPTIMIZED SEEDING COMPLETE! ✨`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
