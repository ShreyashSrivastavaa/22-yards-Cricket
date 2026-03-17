"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-[rgba(201,168,76,0.3)]">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-bebas text-2xl tracking-tight text-[#F5F0E8]">22 YARDS</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C9A84C]">Cricket</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Methodology", "Pricing", "Archives"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.6)] hover:text-[#F5F0E8] transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a href="/login" className="text-[11px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.6)] hover:text-[#F5F0E8] transition-colors px-4">
                        Login
                    </a>
                    <Button className="bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-mono text-[11px] uppercase tracking-widest px-6 h-9 transition-colors" asChild>
                        <a href="/register">Join Platform</a>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
