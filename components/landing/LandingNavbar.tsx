"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function LandingNavbar() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 h-20 flex items-center bg-transparent">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-[#D4AF37] flex items-center justify-center font-bebas text-2xl text-white">22</div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bebas text-2xl tracking-tight text-[#1a1a1a]">22 YARDS</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B8860B] font-bold">Intelligence</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Methodology", "Pricing", "Archives"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a] hover:text-[#D4AF37] transition-colors font-bold">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-[10px] font-mono uppercase tracking-widest text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-transparent" asChild>
                        <a href="/login">Access Terminal</a>
                    </Button>
                    <Button className="bg-[#D4AF37] hover:bg-[#B8860B] text-white rounded-none font-bebas text-lg tracking-widest px-6" asChild>
                        <a href="/register">Initialize Clearance</a>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
