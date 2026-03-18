import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const token_hash = requestUrl.searchParams.get('token_hash')
    const type = requestUrl.searchParams.get('type')

    const supabase = await createClient()

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        return NextResponse.redirect(
            new URL('/dashboard', requestUrl.origin)
        )
    }

    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type,
        })
        if (!error) {
            return NextResponse.redirect(
                new URL('/dashboard', requestUrl.origin)
            )
        }
    }

    // return the user to an error page with some instructions
    return NextResponse.redirect(
        new URL('/login?message=Email confirmed. Please sign in.', requestUrl.origin)
    )
}
