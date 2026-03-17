/**
 * Supabase Admin Client — Server-side only
 * Uses service role key for cache table operations.
 * NEVER import this in client components.
 * 
 * Lazy-initialized: won't crash if env vars are missing at build time.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
    if (_client) return _client

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ""

    if (!supabaseUrl || !supabaseServiceKey) {
        console.warn("[Supabase] URL or Service Key missing. Cache will be bypassed.")
        // Return a dummy client that won't crash
        return createClient("https://placeholder.supabase.co", "placeholder-key", {
            auth: { persistSession: false },
        })
    }

    _client = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
    })

    return _client
}

// Convenience export for backwards compatibility
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get: (_target, prop) => {
        const client = getSupabaseAdmin()
        return (client as any)[prop]
    },
})
