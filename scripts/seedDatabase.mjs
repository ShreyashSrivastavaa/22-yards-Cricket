import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { PrismaClient } from '@prisma/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const Papa = require('papaparse')
const prisma = new PrismaClient()
const ROOT = path.join(__dirname, '..')

function loadCSV(relativePath) {
  const full = path.join(ROOT, relativePath)
  if (!fs.existsSync(full)) { console.warn(`⚠️  Not found: ${full}`); return [] }
  const raw = fs.readFileSync(full, 'utf8')
  const result = Papa.parse(raw, { header: true, skipEmptyLines: true, transformHeader: h => h.trim() })
  console.log(`  ✓ ${result.data.length} rows — ${relativePath}`)
  return result.data
}

// Load all IPL seasons
console.log('\n📦 Loading CSVs...')
const allDeliveries = ['2022','2023','2024','2025'].flatMap(s =>
  loadCSV(`datasets/Domestic/Men's/IPL/${s}/ipl_${s}_deliveries.csv`)
)
console.log(`Total: ${allDeliveries.length.toLocaleString()} deliveries`)

// Process players
const playerMap = {}
allDeliveries.forEach(d => {
  if (d.striker) {
    if (!playerMap[d.striker]) playerMap[d.striker] = {
      name: d.striker, team: d.batting_team,
      battingRuns: 0, battingBalls: 0, fours: 0, sixes: 0,
      dismissals: 0, innings: new Set(),
      bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0
    }
    const p = playerMap[d.striker]
    p.team = d.batting_team
    p.innings.add(d.match_id)
    if (!d.wides) {
      p.battingBalls++
      const r = Number(d.runs_off_bat || 0)
      p.battingRuns += r
      if (r === 4) p.fours++
      if (r === 6) p.sixes++
    }
    if (d.player_dismissed === d.striker) p.dismissals++
  }
  if (d.bowler) {
    if (!playerMap[d.bowler]) playerMap[d.bowler] = {
      name: d.bowler, team: d.bowling_team,
      battingRuns: 0, battingBalls: 0, fours: 0, sixes: 0,
      dismissals: 0, innings: new Set(),
      bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0
    }
    const p = playerMap[d.bowler]
    if (!d.wides && !d.noballs) p.bowlingBalls++
    p.bowlingRuns += Number(d.runs_off_bat||0) + Number(d.extras||0)
    if (d.player_dismissed && d.wicket_type?.trim() &&
        d.wicket_type !== 'run out') p.bowlingWickets++
  }
})

const players = Object.values(playerMap).map(p => ({
  name: p.name,
  team: p.team,
  innings: p.innings.size,
  runs: p.battingRuns,
  balls: p.battingBalls,
  strikeRate: p.battingBalls > 0 ? +((p.battingRuns/p.battingBalls)*100).toFixed(2) : 0,
  average: p.dismissals > 0 ? +(p.battingRuns/p.dismissals).toFixed(2) : p.battingRuns,
  fours: p.fours,
  sixes: p.sixes,
  wickets: p.bowlingWickets,
  economy: p.bowlingBalls > 0 ? +((p.bowlingRuns/p.bowlingBalls)*6).toFixed(2) : 0,
  fantasyScore: (p.battingRuns*1)+(p.bowlingWickets*25)+(p.fours*1)+(p.sixes*2)
}))

// Process teams
const TEAM_META = {
  'Mumbai Indians':              { code: 'mi',   color: '#004BA0' },
  'Chennai Super Kings':         { code: 'csk',  color: '#F9CD05' },
  'Royal Challengers Bengaluru': { code: 'rcb',  color: '#EC1C24' },
  'Royal Challengers Bangalore': { code: 'rcb',  color: '#EC1C24' },
  'Kolkata Knight Riders':       { code: 'kkr',  color: '#3A225D' },
  'Delhi Capitals':              { code: 'dc',   color: '#0078BC' },
  'Rajasthan Royals':            { code: 'rr',   color: '#EA1A85' },
  'Punjab Kings':                { code: 'pbks', color: '#ED1B24' },
  'Kings XI Punjab':             { code: 'pbks', color: '#ED1B24' },
  'Sunrisers Hyderabad':         { code: 'srh',  color: '#F7A721' },
  'Gujarat Titans':              { code: 'gt',   color: '#1C1C1C' },
  'Lucknow Super Giants':        { code: 'lsg',  color: '#A72056' },
}
const teamNames = [...new Set(allDeliveries.flatMap(d =>
  [d.batting_team, d.bowling_team].filter(Boolean)
))]
const teams = teamNames.map(name => ({
  name,
  code: TEAM_META[name]?.code || name.split(' ').map(w=>w[0]).join('').toLowerCase(),
  color: TEAM_META[name]?.color || '#FFD700'
}))

// Process matches
const matchMap = {}
allDeliveries.forEach(d => {
  if (!matchMap[d.match_id]) matchMap[d.match_id] = {
    id: String(d.match_id), season: d.season,
    date: d.start_date, venue: d.venue,
    team1: d.batting_team, team2: d.bowling_team
  }
})
const matches = Object.values(matchMap)

// Process points table
const inningsMap = {}
allDeliveries.filter(d => d.season === '2025').forEach(d => {
  const key = `${d.match_id}_${d.innings}`
  if (!inningsMap[key]) inningsMap[key] = {
    batting_team: d.batting_team, runs: 0
  }
  inningsMap[key].runs += Number(d.runs_off_bat||0) + Number(d.extras||0)
})
const matchIds = [...new Set(
  allDeliveries.filter(d => d.season==='2025').map(d => d.match_id)
)]
const standingsMap = {}
const init = t => { if (!standingsMap[t]) standingsMap[t] = {
  season: '2025', team: t, played: 0, won: 0, lost: 0, points: 0, last5: []
}}
matchIds.forEach(mid => {
  const i1 = inningsMap[`${mid}_1`]
  const i2 = inningsMap[`${mid}_2`]
  if (!i1||!i2) return
  init(i1.batting_team); init(i2.batting_team)
  standingsMap[i1.batting_team].played++
  standingsMap[i2.batting_team].played++
  const winner = i2.runs > i1.runs ? i2.batting_team : i1.batting_team
  const loser  = winner===i1.batting_team ? i2.batting_team : i1.batting_team
  standingsMap[winner].won++; standingsMap[winner].points+=2
  standingsMap[winner].last5.push('W')
  standingsMap[loser].lost++; standingsMap[loser].last5.push('L')
})
const pointsTable = Object.values(standingsMap)
  .sort((a,b) => b.points-a.points)
  .map((t,i) => ({ ...t, rank: i+1, last5: t.last5.slice(-5) }))

// ── Seed database using Prisma ────────────────
async function seed() {
  console.log('\n🌱 Seeding database with Prisma...\n')

  // Teams
  console.log('📤 Upserting teams...')
  for (const team of teams) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: team,
      create: team
    })
  }
  console.log(`✅ ${teams.length} teams done`)

  // Players (in batches)
  console.log('📤 Upserting players...')
  let count = 0
  for (const player of players) {
    await prisma.player.upsert({
      where: { name: player.name },
      update: player,
      create: player
    })
    count++
    if (count % 50 === 0) process.stdout.write(`  ${count}/${players.length}\r`)
  }
  console.log(`✅ ${players.length} players done`)

  // Matches (in batches)
  console.log('📤 Upserting matches...')
  for (const match of matches) {
    await prisma.match.upsert({
      where: { id: match.id },
      update: match,
      create: match
    })
  }
  console.log(`✅ ${matches.length} matches done`)

  // Points table
  console.log('📤 Upserting points table...')
  for (const row of pointsTable) {
    await prisma.pointsTable.upsert({
      where: { season_team: { season: row.season, team: row.team } },
      update: row,
      create: row
    })
  }
  console.log(`✅ ${pointsTable.length} rows done`)

  console.log('\n🏏 Database seeded successfully!')
  await prisma.$disconnect()
}

seed().catch(async e => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
