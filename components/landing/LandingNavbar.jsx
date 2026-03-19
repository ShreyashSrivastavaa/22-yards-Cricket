import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function LandingNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsLoggedIn(!!session)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(201,168,76,0.3)]">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-baseline gap-2 group">
                        <span className="font-bebas text-4xl tracking-tighter text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">22 YARDS</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">CRICKET</span>
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-10">
                    {[
                        { label: "FEATURES", url: "/#features" },
                        { label: "METHODOLOGY", url: "/#methodology" },
                        { label: "PRICING", url: "/#pricing" },
                        { label: "ARCHIVES", url: "/#archives" }
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.url}
                            className="text-[12px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.6)] hover:text-[#F5F0E8] transition-all font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    {!isLoggedIn ? (
                        <>
                            <a href="/login" className="text-[12px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.6)] hover:text-[#F5F0E8] transition-colors">
                                LOGIN
                            </a>
                            <Button className="bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-mono text-[12px] uppercase tracking-[0.25em] px-8 h-12 font-bold transition-all" asChild>
                                <a href="/register">INITIALIZE</a>
                            </Button>
                        </>
                    ) : (
                        <Button className="bg-[#111111] border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] rounded-none font-mono text-[12px] uppercase tracking-[0.25em] px-10 h-12 font-bold transition-all" asChild>
                            <a href="/dashboard">ACCESS TERMINAL</a>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
