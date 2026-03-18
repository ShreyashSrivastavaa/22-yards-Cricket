/**
 * API Clients — Server-side only
 *
 * Centralized fetch wrappers for all external data sources.
 * All keys come from environment variables — never hardcoded.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CricAPI (cricketdata.org) — 100 req/day free
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CRICAPI_BASE = "https://api.cricapi.com/v1"

export async function cricApiFetch(endpoint, params) {
    const apiKey = process.env.CRICAPI_KEY
    if (!apiKey) throw new Error("CRICAPI_KEY is not set")

    const url = new URL(`${CRICAPI_BASE}/${endpoint}`)
    url.searchParams.set("apikey", apiKey)
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`CricAPI ${endpoint} failed: ${res.status}`)
    return res.json()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Cricbuzz via RapidAPI — 500 req/month free
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const RAPIDAPI_HOST = "cricbuzz-cricket.p.rapidapi.com"

export async function cricbuzzFetch(endpoint) {
    const apiKey = process.env.RAPIDAPI_KEY
    if (!apiKey || apiKey === "YOUR_RAPIDAPI_KEY") {
        throw new Error("RAPIDAPI_KEY is missing. Real-world data access requires a valid RapidAPI (Cricbuzz) key.")
    }

    const res = await fetch(`https://${RAPIDAPI_HOST}/${endpoint}`, {
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": RAPIDAPI_HOST,
        },
        next: { revalidate: 3600 },
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }))
        throw new Error(`Cricbuzz API Error (${res.status}): ${errorData.message || res.statusText}`)
    }

    return res.json()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ESPN Cricinfo Scraper via allorigins proxy
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CORS_PROXY = "https://api.allorigins.win/get"

export async function espnScrape(espnUrl) {
    const proxyUrl = `${CORS_PROXY}?url=${encodeURIComponent(espnUrl)}`
    const res = await fetch(proxyUrl, { next: { revalidate: 43200 } }) // 12h
    if (!res.ok) throw new Error(`ESPN scrape failed: ${res.status}`)
    const json = await res.json()
    return json.contents // Raw HTML
}

/**
 * Parse an ESPN Cricinfo stats HTML table into structured data.
 * Works with both batting and bowling leaderboard pages.
 */
export function parseEspnStatsTable(html) {
    const results = []

    // Extract table rows using regex (server-side, no DOM)
    const tableMatch = html.match(/<table[^>]*class="[^"]*engineTable[^"]*"[^>]*>([\s\S]*?)<\/table>/i)
    if (!tableMatch) return results

    const tableHtml = tableMatch[1]

    // Extract headers
    const headers = []
    const headerMatches = tableHtml.match(/<th[^>]*>([\s\S]*?)<\/th>/gi) || []
    for (const th of headerMatches) {
        const text = th.replace(/<[^>]+>/g, "").trim()
        if (text) headers.push(text)
    }

    // Extract rows
    const rowMatches = tableHtml.match(/<tr[^>]*class="data1"[^>]*>([\s\S]*?)<\/tr>/gi) || []
    for (const row of rowMatches) {
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []
        const entry = {}
        cells.forEach((cell, i) => {
            const text = cell.replace(/<[^>]+>/g, "").trim()
            if (headers[i]) entry[headers[i]] = text
        })
        if (Object.keys(entry).length > 0) results.push(entry)
    }

    return results
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Team metadata (the ONLY hardcoded data allowed)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const IPL_TEAMS = [
    { code: "CSK", name: "Chennai Super Kings", color: "#FCCA06" },
    { code: "MI", name: "Mumbai Indians", color: "#004BA0" },
    { code: "RCB", name: "Royal Challengers Bengaluru", color: "#D4213D" },
    { code: "KKR", name: "Kolkata Knight Riders", color: "#3A225D" },
    { code: "DC", name: "Delhi Capitals", color: "#17479E" },
    { code: "PBKS", name: "Punjab Kings", color: "#ED1B24" },
    { code: "RR", name: "Rajasthan Royals", color: "#EA1A85" },
    { code: "SRH", name: "Sunrisers Hyderabad", color: "#FF822A" },
    { code: "GT", name: "Gujarat Titans", color: "#1C1C2B" },
    { code: "LSG", name: "Lucknow Super Giants", color: "#A72056" },
]
