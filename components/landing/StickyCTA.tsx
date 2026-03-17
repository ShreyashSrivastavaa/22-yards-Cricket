"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-black/40 backdrop-blur-xl border border-primary/30 p-2 rounded-2xl shadow-2xl shadow-primary/20 flex items-center gap-4">
                <div className="pl-4 pr-2">
                    <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-1">Live Intelligence</div>
                    <div className="text-xs font-bold font-mono text-white flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-primary" />
                        Elite Picks Ready
                    </div>
                </div>
                <Link href="#elite-picks">
                    <Button size="sm" className="h-10 px-6 text-[10px] uppercase font-mono tracking-widest bg-primary hover:bg-primary/90 gap-2">
                        Get Today’s Picks <ArrowRight className="h-3 w-3" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
