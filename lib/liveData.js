/**
 * Live Data Service — Using cricketdata.org (formerly CricAPI)
 */

const BASE = 'https://api.cricapi.com/v1'
const KEY = process.env.CRICKETDATA_API_KEY

/**
 * Get current live/upcoming matches.
 */
export async function getLiveMatches() {
    try {
        if (!KEY) return []
        const res = await fetch(`${BASE}/cricScore?apikey=${KEY}`)
        const data = await res.json()
        if (data.status !== 'success') return []
        return data.data || []
    } catch (err) {
        console.error("[liveData] getLiveMatches failed:", err)
        return []
    }
}

/**
 * Search player by name (returns player id + profile).
 */
export async function searchPlayerOnline(name) {
    try {
        if (!KEY) return []
        const res = await fetch(`${BASE}/players?apikey=${KEY}&search=${encodeURIComponent(name)}&offset=0`)
        const data = await res.json()
        if (data.status !== 'success') return []
        return data.data || []
    } catch (err) {
        console.error("[liveData] searchPlayerOnline failed:", err)
        return []
    }
}

/**
 * Get player career stats by player id.
 */
export async function getPlayerInfoOnline(playerId) {
    try {
        if (!KEY) return null
        const res = await fetch(`${BASE}/players_info?apikey=${KEY}&id=${playerId}`)
        const data = await res.json()
        if (data.status !== 'success') return null
        return data.data || null
    } catch (err) {
        console.error("[liveData] getPlayerInfoOnline failed:", err)
        return null
    }
}

/**
 * Get current IPL points table / series standings.
 */
export async function getLivePointsTable(seriesId) {
    try {
        if (!KEY) return []
        const res = await fetch(`${BASE}/series_points?apikey=${KEY}&id=${seriesId}`)
        const data = await res.json()
        if (data.status !== 'success') return []
        return data.data || []
    } catch (err) {
        console.error("[liveData] getLivePointsTable failed:", err)
        return []
    }
}

/**
 * Get current IPL series ID dynamically.
 */
export async function getIPLSeriesId() {
    try {
        if (!KEY) return null
        const res = await fetch(`${BASE}/series?apikey=${KEY}&offset=0`)
        const data = await res.json()
        if (data.status !== 'success') return null
        const ipl = (data.data || []).find(s =>
            s.name?.toLowerCase().includes('indian premier league') ||
            s.name?.toLowerCase().includes('ipl')
        )
        return ipl?.id || null
    } catch (err) {
        console.error("[liveData] getIPLSeriesId failed:", err)
        return null
    }
}
