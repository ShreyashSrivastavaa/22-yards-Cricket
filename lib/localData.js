// lib/localData.js
// Import JSON directly — works on Vercel serverless, no fs needed
import playersData   from '../public/data/players.json' assert { type: 'json' }
import pointsTable   from '../public/data/points-table.json' assert { type: 'json' }
import matchesData   from '../public/data/matches.json' assert { type: 'json' }
import teamsData     from '../public/data/teams.json' assert { type: 'json' }

export function searchPlayers(query) {
  if (!query || query.trim() === '') return playersData.slice(0, 50)
  const q = query.toLowerCase().trim()
  return playersData.filter(p => p.name.toLowerCase().includes(q))
}

export function getPlayerStats(name) {
  if (!name) return null
  return playersData.find(
    p => p.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  ) || null
}

export function getAllPlayers() {
  return playersData
}

export function getPointsTable() {
  return pointsTable
}

export function getRecentMatches(limit = 20) {
  return matchesData.slice(0, limit)
}

export function getIPLTeams() {
  return teamsData
}

export function getPlayersByTeam(teamNameOrCode) {
  const val = teamNameOrCode.toLowerCase()
  // Match by team code OR team name
  const team = teamsData.find(
    t => t.code === val || t.name.toLowerCase().includes(val)
  )
  if (!team) return []
  return playersData.filter(
    p => p.team?.toLowerCase() === team.name.toLowerCase()
  )
}

export function getFantasyPicks(limit = 20) {
  return [...playersData]
    .sort((a, b) => b.fantasyScore - a.fantasyScore)
    .slice(0, limit)
}

export function getTeamByCode(code) {
  return teamsData.find(
    t => t.code === code.toLowerCase() ||
         t.name.toLowerCase().includes(code.toLowerCase())
  ) || null
}
