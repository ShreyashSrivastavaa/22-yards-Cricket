"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#0A0A0A] border-t border-[rgba(201,168,76,0.1)]">
            {/* Final CTA Section */}
            <section className="py-32 bg-[#C9A84C] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none flex items-center justify-center">
                    <span className="font-bebas text-[30vw] leading-none text-[#0A0A0A] uppercase whitespace-nowrap">MISSION CONTROL</span>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
                    <h2 className="text-7xl md:text-[120px] font-bebas tracking-tighter uppercase leading-[0.85] text-[#0A0A0A]">
                        SCOUT SMARTER.<br />WIN THE PITCH.
                    </h2>
                    <p className="text-[#0A0A0A] text-[15px] font-mono uppercase tracking-[0.2em] max-w-2xl mx-auto font-bold opacity-80">
                        JOIN INSTITUTIONAL-GRADE CRICKET INTELLIGENCE. THE NEXT CYCLE STARTS NOW.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                        <Button className="h-16 px-16 text-[12px] font-mono uppercase tracking-[0.3em] bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#C9A84C] rounded-none font-bold transition-all shadow-2xl" asChild>
                            <a href="/register">INITIALIZE PROTOCOL</a>
                        </Button>
                        <Button variant="outline" className="h-16 px-16 text-[12px] font-mono uppercase tracking-[0.3em] border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A]/10 rounded-none font-bold transition-all" asChild>
                            <a href="/login">ACCESS TERMINAL</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="col-span-2 space-y-10">
                        <div className="flex flex-col gap-1">
                            <span className="font-bebas text-5xl tracking-tighter text-[#F5F0E8] uppercase">22 YARDS</span>
                            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">CRICKET INTELLIGENCE SYSTEMS // V3.0</span>
                        </div>
                        <p className="text-[12px] font-mono uppercase leading-relaxed text-[rgba(245,240,232,0.4)] max-w-md tracking-widest">
                            THE DEFINITIVE DATA-MOAT FOR HIGH-STAKES CRICKET ANALYTICS, MATCH SIMULATIONS, AND SCOUTING OPTIMIZATION. BUILT FOR THE NEXT GENERATION OF STRATEGISTS.
                        </p>
                        <div className="flex items-center gap-8 pt-4">
                            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="text-[rgba(245,240,232,0.2)] hover:text-[#C9A84C] transition-colors">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-bold">PLATFORM ARCHIVE</h4>
                        <ul className="space-y-5 text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.5)]">
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">INTELLIGENCE TERMINAL</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">PLAYER DATA-STREAMS</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">SQUAD OPTIMIZERS</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">VENUE ANALYTICS</li>
                        </ul>
                    </div>

                    <div className="space-y-10">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-bold">PROTOCOLS</h4>
                        <ul className="space-y-5 text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.5)]">
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">SYSTEM ARCHITECTURE</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">SECURITY CLEARANCE</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">TERMS OF MISSION</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">ENGINE STATUS</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-[rgba(201,168,76,0.1)] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.2)]">
                        © 2026 22 YARDS INTELLIGENCE. ALL DATA-STREAMS VERIFIED. NO PLACEHOLDERS.
                    </div>
                    <div className="flex items-center gap-4 px-4 py-2 bg-[rgba(201,168,76,0.03)] border border-[rgba(201,168,76,0.15)]">
                        <div className="h-2 w-2 rounded-none bg-[#1DB954] shadow-[0_0_8px_#1DB954]" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-bold">NODE_STATUS: OPTIMAL</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
