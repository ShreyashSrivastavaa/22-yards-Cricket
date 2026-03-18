/**
 * Cricbuzz API Utility — Server-side only
 *
 * Provides functions to fetch data from the 'Free Cricbuzz Cricket API' via RapidAPI.
 * HOST: free-cricbuzz-cricket-api.p.rapidapi.com
 */

const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "free-cricbuzz-cricket-api.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

/**
 * Standard fetch wrapper for RapidAPI requests.
 */
async function rapidApiFetch(endpoint) {
    if (!RAPIDAPI_KEY || RAPIDAPI_KEY === "YOUR_RAPIDAPI_KEY") {
        throw new Error("RAPIDAPI_KEY is missing. Access to real-world data requires a valid key.");
    }

    const res = await fetch(`https://${RAPIDAPI_HOST}/${endpoint}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': RAPIDAPI_HOST,
            'x-rapidapi-key': RAPIDAPI_KEY,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(`RapidAPI Error (${res.status}): ${errorData.message || res.statusText}`);
    }

    return res.json();
}

/**
 * GET /fixtures — list of upcoming/live matches.
 */
export async function getFixtures() {
    return rapidApiFetch("fixtures");
}

/**
 * GET /score/{matchId} — live score for a specific match.
 */
export async function getLiveMatchScore(matchId) {
    return rapidApiFetch(`score/${matchId}`);
}

/**
 * GET /series — list of all seasons/series.
 */
export async function getSeries() {
    return rapidApiFetch("series");
}

/**
 * GET /teams — list of all international and domestic teams.
 */
export async function getAllTeams() {
    return rapidApiFetch("teams");
}

/**
 * GET /players/{teamId} — list of players on a specific team.
 */
export async function getPlayersByTeam(teamId) {
    return rapidApiFetch(`players/${teamId}`);
}
