import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// ── Load PapaParse ───────────────────────────
let Papa
try {
  Papa = require('papaparse')
} catch {
  console.error('❌ papaparse not found. Run: npm install papaparse')
  process.exit(1)
}

// ── Config ───────────────────────────────────
const PROJECT_ROOT = path.join(__dirname, '..')
const OUTPUT_DIR   = path.join(PROJECT_ROOT, 'public', 'data')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log(`📁 Created output directory: ${OUTPUT_DIR}`)
}

// ── CSV Loader ───────────────────────────────
function loadCSV(relativePath) {
  const full = path.join(PROJECT_ROOT, relativePath)
  if (!fs.existsSync(full)) {
    console.warn(`⚠️  File not found: ${full}`)
    return []
  }
  const raw = fs.readFileSync(full, 'utf8')
  const result = Papa.parse(raw, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  })
  console.log(`  ✓ Loaded ${result.data.length} rows from ${relativePath}`)
  return result.data
}

// ── Load IPL seasons ─────────────────────────
console.log('\n📦 Loading IPL ball-by-ball data...')
const seasons = ['2022', '2023', '2024', '2025']
const allDeliveries = []

for (const season of seasons) {
  const filePath = `datasets/Domestic/Men's/IPL/${season}/ipl_${season}_deliveries.csv`
  const rows = loadCSV(filePath)
  allDeliveries.push(...rows)
}

console.log(`\n🏏 Total deliveries loaded: ${allDeliveries.length.toLocaleString()}`)

if (allDeliveries.length === 0) {
  console.error('\n❌ No data loaded! Check that your datasets/ folder is at:')
  console.error(`   ${path.join(PROJECT_ROOT, 'datasets')}`)
  console.error('   And that the IPL CSV files exist inside it.')
  process.exit(1)
}

// ── 1. Build Player Stats ────────────────────
console.log('\n⚙️  Processing player statistics...')

const playerMap = {}

allDeliveries.forEach(d => {
  // ── Batting ──
  if (d.striker) {
    if (!playerMap[d.striker]) {
      playerMap[d.striker] = {
        name: d.striker,
        team: d.batting_team || 'Unknown',
        battingRuns: 0, battingBalls: 0,
        fours: 0, sixes: 0, dismissals: 0,
        battingInnings: new Set(),
        bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0,
      }
    }
    const p = playerMap[d.striker]
    p.battingInnings.add(d.match_id)
    // Update team to most recent
    if (d.batting_team) p.team = d.batting_team
    if (!d.wides) {
      p.battingBalls++
      const r = Number(d.runs_off_bat || 0)
      p.battingRuns += r
      if (r === 4) p.fours++
      if (r === 6) p.sixes++
    }
    if (d.player_dismissed === d.striker) p.dismissals++
  }

  // ── Bowling ──
  if (d.bowler) {
    if (!playerMap[d.bowler]) {
      playerMap[d.bowler] = {
        name: d.bowler,
        team: d.bowling_team || 'Unknown',
        battingRuns: 0, battingBalls: 0,
        fours: 0, sixes: 0, dismissals: 0,
        battingInnings: new Set(),
        bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0,
      }
    }
    const p = playerMap[d.bowler]
    if (!d.wides && !d.noballs) p.bowlingBalls++
    p.bowlingRuns += Number(d.runs_off_bat || 0) + Number(d.extras || 0)
    if (
      d.player_dismissed &&
      d.wicket_type &&
      d.wicket_type.trim() !== '' &&
      d.wicket_type !== 'run out' &&
      d.wicket_type !== 'obstructing the field'
    ) {
      p.bowlingWickets++
    }
  }
})

// Serialize to plain objects
const playersJSON = Object.values(playerMap)
  .map(p => {
    const sr      = p.battingBalls > 0 ? +((p.battingRuns / p.battingBalls) * 100).toFixed(1) : 0
    const avg     = p.dismissals > 0 ? +(p.battingRuns / p.dismissals).toFixed(1) : p.battingRuns
    const eco     = p.bowlingBalls > 0 ? +((p.bowlingRuns / p.bowlingBalls) * 6).toFixed(2) : 0
    const fantasy = (p.battingRuns * 1) + (p.bowlingWickets * 25) + (p.fours * 1) + (p.sixes * 2)
    return {
      name:         p.name,
      team:         p.team,
      innings:      p.battingInnings.size,
      runs:         p.battingRuns,
      balls:        p.battingBalls,
      strikeRate:   sr,
      average:      avg,
      fours:        p.fours,
      sixes:        p.sixes,
      wickets:      p.bowlingWickets,
      economy:      eco,
      fantasyScore: fantasy,
    }
  })
  .sort((a, b) => b.fantasyScore - a.fantasyScore)

const playersPath = path.join(OUTPUT_DIR, 'players.json')
fs.writeFileSync(playersPath, JSON.stringify(playersJSON, null, 2))
console.log(`✅ players.json — ${playersJSON.length} players written`)

// ── 2. Points Table (2025 season) ────────────
console.log('\n⚙️  Calculating points table...')

const latestSeason = '2025'
const seasonDeliveries = allDeliveries.filter(d => d.season === latestSeason)

console.log(`  Using ${seasonDeliveries.length.toLocaleString()} deliveries from ${latestSeason}`)

const inningsMap = {}
seasonDeliveries.forEach(d => {
  const key = `${d.match_id}_${d.innings}`
  if (!inningsMap[key]) {
    inningsMap[key] = {
      match_id:    d.match_id,
      innings:     d.innings,
      batting_team: d.batting_team,
      date:        d.start_date,
      venue:       d.venue,
      runs:        0,
      wickets:     0,
    }
  }
  inningsMap[key].runs += Number(d.runs_off_bat || 0) + Number(d.extras || 0)
  if (d.player_dismissed && d.wicket_type && d.wicket_type.trim() !== '') {
    inningsMap[key].wickets++
  }
})

const matchIds2025 = [...new Set(seasonDeliveries.map(d => d.match_id))]
const standings    = {}

const initTeam = name => {
  if (!standings[name]) {
    standings[name] = {
      team: name, played: 0, won: 0,
      lost: 0, points: 0,
      runsFor: 0, ballsFor: 0,
      runsAgainst: 0, ballsAgainst: 0,
      last5: [],
    }
  }
}

matchIds2025.forEach(mid => {
  const i1 = inningsMap[`${mid}_1`]
  const i2 = inningsMap[`${mid}_2`]
  if (!i1 || !i2) return

  initTeam(i1.batting_team)
  initTeam(i2.batting_team)

  standings[i1.batting_team].played++
  standings[i2.batting_team].played++

  const winner = i2.runs > i1.runs ? i2.batting_team : i1.batting_team
  const loser  = winner === i1.batting_team ? i2.batting_team : i1.batting_team

  standings[winner].won++
  standings[winner].points += 2
  standings[winner].last5.push('W')
  standings[loser].lost++
  standings[loser].last5.push('L')
})

const pointsTable = Object.values(standings)
  .map(t => ({ ...t, last5: t.last5.slice(-5) }))
  .sort((a, b) => b.points - a.points || b.won - a.won)
  .map((t, i) => ({ ...t, rank: i + 1 }))

const pointsPath = path.join(OUTPUT_DIR, 'points-table.json')
fs.writeFileSync(pointsPath, JSON.stringify(pointsTable, null, 2))
console.log(`✅ points-table.json — ${pointsTable.length} teams`)

// ── 3. Recent Matches ─────────────────────────
console.log('\n⚙️  Building match list...')

const matchMeta = {}
seasonDeliveries.forEach(d => {
  if (!matchMeta[d.match_id]) {
    matchMeta[d.match_id] = {
      id:     d.match_id,
      date:   d.start_date,
      venue:  d.venue,
      season: d.season,
      team1:  d.batting_team,
      team2:  d.bowling_team,
    }
  }
})

const recentMatches = Object.values(matchMeta)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 30)

const matchesPath = path.join(OUTPUT_DIR, 'matches.json')
fs.writeFileSync(matchesPath, JSON.stringify(recentMatches, null, 2))
console.log(`✅ matches.json — ${recentMatches.length} matches`)

// ── 4. Teams ──────────────────────────────────
console.log('\n⚙️  Building teams list...')

const teamSet = new Set()
allDeliveries.forEach(d => {
  if (d.batting_team) teamSet.add(d.batting_team)
  if (d.bowling_team) teamSet.add(d.bowling_team)
})

const TEAM_META = {
  'Mumbai Indians':               { code: 'mi',   color: '#004BA0' },
  'Chennai Super Kings':          { code: 'csk',  color: '#F9CD05' },
  'Royal Challengers Bengaluru':  { code: 'rcb',  color: '#EC1C24' },
  'Royal Challengers Bangalore':  { code: 'rcb',  color: '#EC1C24' },
  'Kolkata Knight Riders':        { code: 'kkr',  color: '#3A225D' },
  'Delhi Capitals':               { code: 'dc',   color: '#0078BC' },
  'Delhi Daredevils':             { code: 'dc',   color: '#0078BC' },
  'Rajasthan Royals':             { code: 'rr',   color: '#EA1A85' },
  'Punjab Kings':                 { code: 'pbks', color: '#ED1B24' },
  'Kings XI Punjab':              { code: 'pbks', color: '#ED1B24' },
  'Sunrisers Hyderabad':          { code: 'srh',  color: '#F7A721' },
  'Gujarat Titans':               { code: 'gt',   color: '#1C1C1C' },
  'Lucknow Super Giants':         { code: 'lsg',  color: '#A72056' },
}

const teamsJSON = Array.from(teamSet).map((name, i) => ({
  id:   i + 1,
  name,
  code: TEAM_META[name]?.code  || name.split(' ').map(w => w[0]).join('').toLowerCase(),
  color: TEAM_META[name]?.color || '#FFD700',
}))

const teamsPath = path.join(OUTPUT_DIR, 'teams.json')
fs.writeFileSync(teamsPath, JSON.stringify(teamsJSON, null, 2))
console.log(`✅ teams.json — ${teamsJSON.length} teams`)

// ── Done ──────────────────────────────────────
console.log('\n🏏 ══════════════════════════════════════')
console.log('   Data processing COMPLETE!')
console.log(`   Output directory: ${OUTPUT_DIR}`)
console.log('   Files generated:')
console.log(`   • players.json      (${playersJSON.length} players)`)
console.log(`   • points-table.json (${pointsTable.length} teams)`)
console.log(`   • matches.json      (${recentMatches.length} matches)`)
console.log(`   • teams.json        (${teamsJSON.length} teams)`)
console.log('🏏 ══════════════════════════════════════\n')
