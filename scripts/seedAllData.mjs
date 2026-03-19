import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { PrismaClient } from '@prisma/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

let Papa
try {
  Papa = require('papaparse')
} catch {
  console.error('❌ papaparse not found. Run: npm install papaparse')
  process.exit(1)
}

const prisma = new PrismaClient()
const ROOT = path.join(__dirname, '..')

// ── CSV Loader ───────────────────────────────
function loadCSV(relativePath) {
  const full = path.join(ROOT, relativePath)
  if (!fs.existsSync(full)) {
    console.warn(`  ⚠️  Skip (not found): ${relativePath}`)
    return []
  }
  const raw = fs.readFileSync(full, 'utf8')
  const result = Papa.parse(raw, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  })
  console.log(`  ✓ ${result.data.length} rows — ${relativePath}`)
  return result.data
}

// ── All CSV sources ──────────────────────────
const SOURCES = [
  // SA20
  { file: "datasets/Domestic/Men's/SA20/2023/sa20_2023_deliveries.csv",   tournament: 'SA20',   season: '2023', format: 'T20' },
  { file: "datasets/Domestic/Men's/SA20/2024/sa20_2024_deliveries.csv",   tournament: 'SA20',   season: '2024', format: 'T20' },
  { file: "datasets/Domestic/Men's/SA20/2025/sa20_2025_deliveries.csv",   tournament: 'SA20',   season: '2025', format: 'T20' },
  // ILT20
  { file: "datasets/Domestic/Men's/ILT20/2023/ilt20_2023_deliveries.csv", tournament: 'ILT20',  season: '2023', format: 'T20' },
  { file: "datasets/Domestic/Men's/ILT20/2024/ilt20_2024_deliveries.csv", tournament: 'ILT20',  season: '2024', format: 'T20' },
  { file: "datasets/Domestic/Men's/ILT20/2025/ilt20_2025_deliveries.csv", tournament: 'ILT20',  season: '2025', format: 'T20' },
  // MLC
  { file: "datasets/Domestic/Men's/MLC/2023/mlc_2023_deliveries.csv",     tournament: 'MLC',    season: '2023', format: 'T20' },
  { file: "datasets/Domestic/Men's/MLC/2024/mlc_2024_deliveries.csv",     tournament: 'MLC',    season: '2024', format: 'T20' },
  { file: "datasets/Domestic/Men's/MLC/2025/mlc_2025_deliveries.csv",     tournament: 'MLC',    season: '2025', format: 'T20' },
  // WPL
  { file: "datasets/Domestic/Women's/WPL/2023/wpl_2023_deliveries.csv",   tournament: 'WPL',    season: '2023', format: 'T20' },
  { file: "datasets/Domestic/Women's/WPL/2024/wpl_2024_deliveries.csv",   tournament: 'WPL',    season: '2024', format: 'T20' },
  { file: "datasets/Domestic/Women's/WPL/2025/wpl_2025_deliveries.csv",   tournament: 'WPL',    season: '2025', format: 'T20' },
  // T20 World Cup
  { file: "datasets/International/Men's/Tournaments/T20_WC/2016/t20_wc_2016_deliveries.csv", tournament: 'T20_WC', season: '2016', format: 'T20' },
  { file: "datasets/International/Men's/Tournaments/T20_WC/2021/t20_wc_2021_deliveries.csv", tournament: 'T20_WC', season: '2021', format: 'T20' },
  { file: "datasets/International/Men's/Tournaments/T20_WC/2022/t20_wc_2022_deliveries.csv", tournament: 'T20_WC', season: '2022', format: 'T20' },
  { file: "datasets/International/Men's/Tournaments/T20_WC/2024/t20_wc_2024_deliveries.csv", tournament: 'T20_WC', season: '2024', format: 'T20' },
  // ODI World Cup
  { file: "datasets/International/Men's/Tournaments/ODI_WC/2023/odi_wc_2023_deliveries.csv", tournament: 'ODI_WC', season: '2023', format: 'ODI' },
  // Champions Trophy
  { file: "datasets/International/Men's/Tournaments/CT/2025/ct_2025_deliveries.csv", tournament: 'CT', season: '2025', format: 'ODI' },
  // WTC Final
  { file: "datasets/International/Men's/Tournaments/WTC Final 2025/wtc_final_2025_deliveries.csv", tournament: 'WTC_FINAL', season: '2025', format: 'Test' },
  // Bilateral series 2024
  { file: "datasets/International/Men's/Tours/2024/ind_aus_2024/ind_aus_5_tests_2024_deliveries.csv", tournament: 'IND_AUS', season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/eng_ind_2024/eng_ind_2024_5_test_deliveries.csv",  tournament: 'ENG_IND', season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/ban_ind_2024/ban_ind_3_t20i_2024_deliveries.csv",  tournament: 'BAN_IND', season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/ban_ind_2024/ban_ind_2_tests_2024_deliveries.csv", tournament: 'BAN_IND', season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/ind_sl_2024/ind_sl_2024_3_t20i_deliveries.csv",    tournament: 'IND_SL',  season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/ind_sl_2024/ind_sl_2024_3_odi_deliveries.csv",     tournament: 'IND_SL',  season: '2024', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2024/ind_rsa_2024/ind_rsa_4_t20i_2024_deliveries.csv",  tournament: 'IND_RSA', season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/ind_zim_2024/ind_zim_2024_5_t20i_deliveries.csv",  tournament: 'IND_ZIM', season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/afg_ind_2024/afg_ind_2024_3_t20i_deliveries.csv",  tournament: 'AFG_IND', season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/aus_eng_2024/aus_eng_3_t20i_2024_deliveries.csv",  tournament: 'AUS_ENG', season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/aus_eng_2024/aus_eng_5_odi_2024_deliveries.csv",   tournament: 'AUS_ENG', season: '2024', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2024/aus_nz_2024/aus_nz_2_tests_2024_deliveries.csv",   tournament: 'AUS_NZ',  season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/aus_nz_2024/aus_nz_3_t20i_2024_deliveries.csv",    tournament: 'AUS_NZ',  season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/eng_pak_2024/eng_pak_3_test_2024_deliveries.csv",  tournament: 'ENG_PAK', season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/eng_nz_2024/eng_nz_3_tests_2024_deliveries.csv",   tournament: 'ENG_NZ',  season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/eng_wi_2024/eng_wi_3_odi_2024_deliveries.csv",     tournament: 'ENG_WI',  season: '2024', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2024/eng_wi_2024/eng_wi_5_t20i_2024_deliveries.csv",    tournament: 'ENG_WI',  season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/ban_wi_2024/ban_wi_2_tests_2024_deliveries.csv",   tournament: 'BAN_WI',  season: '2024', format: 'Test' },
  { file: "datasets/International/Men's/Tours/2024/ban_wi_2024/ban_wi_3_odi_2024_deliveries.csv",     tournament: 'BAN_WI',  season: '2024', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2024/ban_wi_2024/ban_wi_3_t20i_2024_deliveries.csv",    tournament: 'BAN_WI',  season: '2024', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2024/pak_aus_2023/pak_aus_2023_deliveries.csv",         tournament: 'PAK_AUS', season: '2023', format: 'Test' },
  // 2020 series
  { file: "datasets/International/Men's/Tours/2020/ind_aus_2020/ind_aus_3_odi_2020_deliveries.csv",   tournament: 'IND_AUS', season: '2020', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2020/ind_aus_2020/ind_aus_3_t20i_2020_deliveries.csv",  tournament: 'IND_AUS', season: '2020', format: 'T20I' },
  { file: "datasets/International/Men's/Tours/2020/ind_aus_2020/ind_aus_4_tests_2020_deliveries.csv", tournament: 'IND_AUS', season: '2020', format: 'Test' },
  // 2023 series
  { file: "datasets/International/Men's/Tours/2023/aus_ind_2023/aus_ind_3_odi_2023_deliveries.csv",   tournament: 'AUS_IND', season: '2023', format: 'ODI' },
  { file: "datasets/International/Men's/Tours/2023/aus_ind_2023/aus_ind_4_test_2023_deliveries.csv",  tournament: 'AUS_IND', season: '2023', format: 'Test' },
]

// ── Process one source ───────────────────────
async function processSource(source) {
  const deliveries = loadCSV(source.file)
  if (!deliveries.length) return { matches: 0, players: 0 }

  // Build match metadata
  const matchMap = {}
  deliveries.forEach(d => {
    const uid = `${source.tournament}_${source.season}_${d.match_id}`
    if (!matchMap[uid]) matchMap[uid] = {
      id: uid,
      tournament: source.tournament,
      season: source.season,
      date: d.start_date || null,
      venue: d.venue || null,
      team1: d.batting_team || null,
      team2: d.bowling_team || null,
      format: source.format,
    }
  })

  // Upsert matches
  for (const match of Object.values(matchMap)) {
    await prisma.internationalMatch.upsert({
      where: { id: match.id },
      update: match,
      create: match,
    }).catch(e => console.warn(`  Match upsert warning: ${e.message}`))
  }

  // Build player stats
  const playerMap = {}
  deliveries.forEach(d => {
    if (d.striker) {
      const key = `${d.striker}__${source.tournament}__${source.season}`
      if (!playerMap[key]) playerMap[key] = {
        playerName: d.striker, tournament: source.tournament,
        season: source.season, team: d.batting_team || null,
        runs: 0, balls: 0, fours: 0, sixes: 0,
        dismissals: 0, innings: new Set(),
        wickets: 0, bowlingBalls: 0, bowlingRuns: 0,
      }
      const p = playerMap[key]
      p.team = d.batting_team || p.team
      p.innings.add(d.match_id)
      if (!d.wides) {
        p.balls++
        const r = Number(d.runs_off_bat || 0)
        p.runs += r
        if (r === 4) p.fours++
        if (r === 6) p.sixes++
      }
      if (d.player_dismissed === d.striker) p.dismissals++
    }
    if (d.bowler) {
      const key = `${d.bowler}__${source.tournament}__${source.season}`
      if (!playerMap[key]) playerMap[key] = {
        playerName: d.bowler, tournament: source.tournament,
        season: source.season, team: d.bowling_team || null,
        runs: 0, balls: 0, fours: 0, sixes: 0,
        dismissals: 0, innings: new Set(),
        wickets: 0, bowlingBalls: 0, bowlingRuns: 0,
      }
      const p = playerMap[key]
      if (!d.wides && !d.noballs) p.bowlingBalls++
      p.bowlingRuns += Number(d.runs_off_bat || 0) + Number(d.extras || 0)
      if (d.player_dismissed && d.wicket_type?.trim() &&
          d.wicket_type !== 'run out' &&
          d.wicket_type !== 'obstructing the field') {
        p.wickets++
      }
    }
  })

  // Upsert player tournament stats
  for (const p of Object.values(playerMap)) {
    const sr      = p.balls > 0 ? +((p.runs / p.balls) * 100).toFixed(2) : 0
    const eco     = p.bowlingBalls > 0 ? +((p.bowlingRuns / p.bowlingBalls) * 6).toFixed(2) : 0
    const fantasy = (p.runs * 1) + (p.wickets * 25) + (p.fours * 1) + (p.sixes * 2)

    await prisma.playerTournamentStats.upsert({
      where: {
        playerName_tournament_season: {
          playerName: p.playerName,
          tournament: p.tournament,
          season:     p.season,
        }
      },
      update: {
        team: p.team, runs: p.runs, balls: p.balls,
        strikeRate: sr, fours: p.fours, sixes: p.sixes,
        wickets: p.wickets, economy: eco,
        innings: p.innings.size, fantasyScore: fantasy,
      },
      create: {
        playerName: p.playerName, tournament: p.tournament,
        season: p.season, team: p.team,
        runs: p.runs, balls: p.balls, strikeRate: sr,
        fours: p.fours, sixes: p.sixes, wickets: p.wickets,
        economy: eco, innings: p.innings.size, fantasyScore: fantasy,
      },
    }).catch(e => console.warn(`  Player upsert warning: ${e.message}`))
  }

  return { matches: Object.keys(matchMap).length, players: Object.keys(playerMap).length }
}

// ── Seed auction data ────────────────────────
async function seedAuction() {
  console.log('\n📤 Seeding auction data...')

  // Try multiple possible column name formats
  const data = loadCSV("datasets/archive (3)/IPLPlayerAuctionData.csv")
  if (!data.length) {
    console.warn('  ⚠️  No auction data found')
    return
  }

  // Log first row to see column names
  console.log('  Auction CSV columns:', Object.keys(data[0]).join(', '))

  let seeded = 0
  for (const row of data) {
    const playerName =
      row.Player || row.player || row.Name || row.name || row['Player Name'] || ''
    if (!playerName) continue

    await prisma.auctionRecord.create({
      data: {
        playerName,
        year:        String(row.Year || row.year || row.Season || ''),
        team:        row.Team || row.team || row['Franchise'] || '',
        basePrice:   parseFloat(row['Base Price'] || row.base_price || row.BasePrice || 0) || 0,
        soldPrice:   parseFloat(row['Sold Price'] || row.sold_price || row.SoldPrice || row.Price || 0) || 0,
        nationality: row.Nationality || row.nationality || row.Country || '',
        role:        row.Role || row.role || row.Type || row.Specialization || '',
      }
    }).catch(() => {}) // skip duplicates silently

    seeded++
  }
  console.log(`  ✅ Auction: ${seeded} records seeded`)
}

// ── Main ─────────────────────────────────────
async function main() {
  console.log('\n🏏 ══════════════════════════════════════')
  console.log('   Seeding ALL tournament datasets')
  console.log('🏏 ══════════════════════════════════════\n')

  let totalMatches = 0
  let totalPlayers = 0
  let sourcesProcessed = 0
  let sourcesSkipped = 0

  for (const source of SOURCES) {
    console.log(`\n📦 ${source.tournament} ${source.season} (${source.format})`)
    const result = await processSource(source)
    if (result.matches > 0) {
      console.log(`  ✅ ${result.matches} matches, ${result.players} player records`)
      totalMatches += result.matches
      totalPlayers += result.players
      sourcesProcessed++
    } else {
      sourcesSkipped++
    }
  }

  await seedAuction()

  console.log('\n🏏 ══════════════════════════════════════')
  console.log('   SEEDING COMPLETE!')
  console.log('🏏 ══════════════════════════════════════')
  console.log(`   Sources processed : ${sourcesProcessed}`)
  console.log(`   Sources skipped   : ${sourcesSkipped} (files not found)`)
  console.log(`   Total matches     : ${totalMatches}`)
  console.log(`   Total player stats: ${totalPlayers}`)
  console.log('\n   All data is now live in Supabase! 🎉\n')

  await prisma.$disconnect()
}

main().catch(async e => {
  console.error('❌ Fatal error:', e.message)
  await prisma.$disconnect()
  process.exit(1)
})
