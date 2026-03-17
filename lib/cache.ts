/**
 * Cache Utility — Supabase-backed with TTL
 * 
 * All API route handlers use this to:
 * 1. Check cache first
 * 2. If fresh → return cached data
 * 3. If stale/missing → fetch from API → store → return
 */
import { supabaseAdmin } from "./supabase-admin"

interface CacheEntry {
    data: any
    last_updated: string
}

/**
 * Get data from cache if it exists and is within TTL.
 * Returns null if cache miss or stale.
 */
export async function getFromCache(
    table: string,
    key: string,
    keyColumn: string,
    dataColumn: string,
    ttlHours: number
): Promise<any | null> {
    try {
        const { data, error } = await supabaseAdmin
            .from(table)
            .select("*")
            .eq(keyColumn, key)
            .single()

        if (error || !data) return null

        const record = data as Record<string, any>

        // Check TTL
        const lastUpdated = new Date(record.last_updated).getTime()
        const now = Date.now()
        const ttlMs = ttlHours * 60 * 60 * 1000

        if (now - lastUpdated > ttlMs) {
            return null // Stale
        }

        return record[dataColumn]
    } catch {
        return null
    }
}

/**
 * Set data in cache (upsert).
 */
export async function setCache(
    table: string,
    keyColumn: string,
    keyValue: string,
    dataColumn: string,
    data: any,
    extraColumns?: Record<string, any>
): Promise<void> {
    try {
        await supabaseAdmin
            .from(table)
            .upsert(
                {
                    [keyColumn]: keyValue,
                    [dataColumn]: data,
                    last_updated: new Date().toISOString(),
                    ...extraColumns,
                },
                { onConflict: keyColumn }
            )
    } catch (e) {
        console.error(`[Cache] Failed to set cache for ${table}/${keyValue}:`, e)
    }
}

/**
 * Clear all entries from a cache table.
 */
export async function clearCache(table: string): Promise<void> {
    try {
        await supabaseAdmin.from(table).delete().neq("last_updated", "1970-01-01")
    } catch (e) {
        console.error(`[Cache] Failed to clear ${table}:`, e)
    }
}
