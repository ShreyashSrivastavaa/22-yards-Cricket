"use client"

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
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-[rgba(10,10,10,0.8)] backdrop-blur-xl border-b border-[rgba(245,240,232,0.08)]">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <a href="/" className="flex items-baseline gap-2 group">
                        <span className="font-bebas text-4xl tracking-tighter text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">22 YARDS</span>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-bold">Intelligence</span>
                            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.25)] -mt-1">Systems</span>
                        </div>
                    </a>
                </div>

                <div className="hidden lg:flex items-center gap-10">
                    {[
                        { label: "Database", url: "/players" },
                        { label: "Builder", url: "/builder" },
                        { label: "Teams", url: "/teams" },
                        { label: "Pricing", url: "/#pricing" }
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.url}
                            className="text-[11px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C] transition-all hover:translate-y-[-1px] font-medium"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    {!isLoggedIn ? (
                        <>
                            <a href="/login" className="text-[11px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8] transition-colors">
                                Login
                            </a>
                            <Button className="bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-mono text-[11px] uppercase tracking-[0.4em] px-8 h-12 font-bold transition-all shadow-[0_0_20px_rgba(201,168,76,0.15)]" asChild>
                                <a href="/register">Initialize</a>
                            </Button>
                        </>
                    ) : (
                        <Button className="bg-[#111111] border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] rounded-none font-mono text-[11px] uppercase tracking-[0.4em] px-10 h-12 font-bold transition-all" asChild>
                            <a href="/dashboard">Access Terminal</a>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
