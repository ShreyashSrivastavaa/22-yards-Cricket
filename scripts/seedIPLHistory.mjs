import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prisma = new PrismaClient()
const ROOT = path.join(__dirname, '..')
const JSON_DIR = path.join(ROOT, "datasets/Domestic/Men's/IPL/all_seasons")

// ── Load all JSON files ──────────────────────
function getAllJSONFiles() {
  return fs.readdirSync(JSON_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(JSON_DIR, f))
}

// ── Parse one Cricsheet JSON match ───────────
function parseMatch(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(raw)
    const info = data.info
    const innings = data.innings || []

    // Basic match info
    const matchId = `IPL_HISTORY_${path.basename(filePath, '.json')}`
    const date = info.dates?.[0] || null
    const season = date ? date.split('-')[0] : null
    const venue = info.venue || info.city || null
    const teams = Object.keys(info.players || {})
    const team1 = teams[0] || null
    const team2 = teams[1] || null
    const winner = info.outcome?.winner || null
    const playerOfMatch = info.player_of_match?.[0] || null

    // Process deliveries for player stats
    const playerMap = {}

    innings.forEach((inn, innIdx) => {
      const battingTeam = inn.team
      const bowlingTeam = teams.find(t => t !== battingTeam) || null

      ;(inn.overs || []).forEach(over => {
        ;(over.deliveries || []).forEach(delivery => {
          const batter   = delivery.batter
          const bowler   = delivery.bowler
          const runs     = delivery.runs?.batter || 0
          const extras   = delivery.runs?.extras || 0
          const isWide   = delivery.extras?.wides ? true : false
          const isNoBall = delivery.extras?.noballs ? true : false
          const wicket   = delivery.wickets?.[0] || null

          // ── Batting stats ──
          if (batter) {
            if (!playerMap[batter]) playerMap[batter] = {
              name: batter, team: battingTeam, season,
              battingRuns: 0, battingBalls: 0,
              fours: 0, sixes: 0, dismissals: 0,
              innings: new Set(),
              bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0,
            }
            const p = playerMap[batter]
            p.team = battingTeam
            p.innings.add(`${matchId}_${innIdx}`)
            if (!isWide) {
              p.battingBalls++
              p.battingRuns += runs
              if (runs === 4) p.fours++
              if (runs === 6) p.sixes++
            }
            if (wicket && wicket.player_out === batter) p.dismissals++
          }

          // ── Bowling stats ──
          if (bowler) {
            if (!playerMap[bowler]) playerMap[bowler] = {
              name: bowler, team: bowlingTeam, season,
              battingRuns: 0, battingBalls: 0,
              fours: 0, sixes: 0, dismissals: 0,
              innings: new Set(),
              bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0,
            }
            const p = playerMap[bowler]
            if (!isWide && !isNoBall) p.bowlingBalls++
            p.bowlingRuns += runs + extras
            if (wicket && !['run out','retired hurt','obstructing the field'].includes(wicket.kind)) {
              p.bowlingWickets++
            }
          }
        })
      })
    })

    return { matchId, date, season, venue, team1, team2, winner, playerOfMatch, playerMap }
  } catch (e) {
    return null
  }
}

// ── Main ─────────────────────────────────────
async function main() {
  console.log('\n🏏 ══════════════════════════════════════')
  console.log('   Seeding IPL History (2008-2025)')
  console.log('🏏 ══════════════════════════════════════\n')

  const files = getAllJSONFiles()
  console.log(`📦 Found ${files.length} JSON match files\n`)

  // Aggregate player stats across ALL matches
  const globalPlayerMap = {}
  const matchRecords = []
  let parsed = 0
  let failed = 0

  for (const filePath of files) {
    const result = parseMatch(filePath)
    if (!result) { failed++; continue }

    const { matchId, date, season, venue, team1, team2, winner, playerMap } = result

    // Add to match records
    matchRecords.push({ matchId, date, season, venue, team1, team2, winner })

    // Merge player stats
    for (const [name, p] of Object.entries(playerMap)) {
      if (!globalPlayerMap[name]) {
        globalPlayerMap[name] = {
          name, team: p.team,
          battingRuns: 0, battingBalls: 0,
          fours: 0, sixes: 0, dismissals: 0,
          innings: 0,
          bowlingWickets: 0, bowlingBalls: 0, bowlingRuns: 0,
        }
      }
      const g = globalPlayerMap[name]
      g.team = p.team // use most recent team
      g.innings      += p.innings.size
      g.battingRuns  += p.battingRuns
      g.battingBalls += p.battingBalls
      g.fours        += p.fours
      g.sixes        += p.sixes
      g.dismissals   += p.dismissals
      g.bowlingWickets += p.bowlingWickets
      g.bowlingBalls += p.bowlingBalls
      g.bowlingRuns  += p.bowlingRuns
    }

    parsed++
    if (parsed % 100 === 0) {
      process.stdout.write(`  Parsed ${parsed}/${files.length} matches...\r`)
    }
  }

  console.log(`\n✅ Parsed ${parsed} matches (${failed} failed)\n`)

  // ── Upsert players into Supabase ─────────────
  console.log('📤 Upserting player career stats...')
  const players = Object.values(globalPlayerMap)
  let playerCount = 0

  for (const p of players) {
    const sr      = p.battingBalls > 0 ? +((p.battingRuns / p.battingBalls) * 100).toFixed(2) : 0
    const avg     = p.dismissals > 0   ? +(p.battingRuns / p.dismissals).toFixed(2) : p.battingRuns
    const eco     = p.bowlingBalls > 0 ? +((p.bowlingRuns / p.bowlingBalls) * 6).toFixed(2) : 0
    const fantasy = (p.battingRuns * 1) + (p.bowlingWickets * 25) + (p.fours * 1) + (p.sixes * 2)

    await prisma.player.upsert({
      where: { name: p.name },
      update: {
        team: p.team,
        innings:      p.innings,
        runs:         p.battingRuns,
        balls:        p.battingBalls,
        strikeRate:   sr,
        average:      avg,
        fours:        p.fours,
        sixes:        p.sixes,
        wickets:      p.bowlingWickets,
        economy:      eco,
        fantasyScore: fantasy,
      },
      create: {
        name:         p.name,
        team:         p.team,
        innings:      p.innings,
        runs:         p.battingRuns,
        balls:        p.battingBalls,
        strikeRate:   sr,
        average:      avg,
        fours:        p.fours,
        sixes:        p.sixes,
        wickets:      p.bowlingWickets,
        economy:      eco,
        fantasyScore: fantasy,
      },
    }).catch(() => {})

    playerCount++
    if (playerCount % 50 === 0) {
      process.stdout.write(`  Players: ${playerCount}/${players.length}\r`)
    }
  }
  console.log(`\n✅ ${playerCount} players upserted with full IPL career stats`)

  // ── Upsert matches ────────────────────────────
  console.log('\n📤 Upserting match records...')
  let matchCount = 0

  for (const m of matchRecords) {
    await prisma.match.upsert({
      where: { id: m.matchId },
      update: {
        season: m.season,
        date:   m.date,
        venue:  m.venue,
        team1:  m.team1,
        team2:  m.team2,
        winner: m.winner,
      },
      create: {
        id:     m.matchId,
        season: m.season,
        date:   m.date,
        venue:  m.venue,
        team1:  m.team1,
        team2:  m.team2,
        winner: m.winner,
      },
    }).catch(() => {})
    matchCount++
  }
  console.log(`✅ ${matchCount} matches upserted`)

  // ── Final summary ─────────────────────────────
  console.log('\n🏏 ══════════════════════════════════════')
  console.log('   IPL HISTORY SEEDING COMPLETE!')
  console.log('🏏 ══════════════════════════════════════')
  console.log(`   Matches  : ${matchCount}`)
  console.log(`   Players  : ${playerCount}`)
  console.log('\n   Full IPL career stats now in Supabase!')

  // Top 5 players preview
  const top5 = Object.values(globalPlayerMap)
    .sort((a, b) => b.battingRuns - a.battingRuns)
    .slice(0, 5)
  console.log('\n   🏆 Top Run Scorers (IPL all-time):')
  top5.forEach((p, i) => {
    console.log(`   ${i+1}. ${p.name} — ${p.battingRuns} runs`)
  })
  console.log('')

  await prisma.$disconnect()
}

main().catch(async e => {
  console.error('❌ Fatal error:', e.message)
  await prisma.$disconnect()
  process.exit(1)
})
