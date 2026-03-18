"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Radar } from "lucide-react"
import Link from "next/link"

export function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-12 fade-in duration-700">
            <div className="bg-[#111111] border border-[#C9A84C]/40 p-1 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6">
                <div className="pl-6 pr-2 py-2">
                    <div className="text-[10px] font-mono text-[rgba(245,240,232,0.3)] uppercase tracking-[0.3em] leading-none mb-2 italic">Intelligence Link</div>
                    <div className="text-xs font-bold font-mono text-[#F5F0E8] flex items-center gap-3 tracking-widest uppercase">
                        <Radar className="h-4 w-4 text-[#C9A84C] animate-pulse" />
                        Signal Intercepted
                    </div>
                </div>
                <Link href="#elite-picks">
                    <Button size="lg" className="h-12 px-10 text-[11px] uppercase font-mono tracking-[0.4em] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#E8D08A] rounded-none font-bold gap-3 transition-all hover:gap-5">
                        Intercept Intel <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
