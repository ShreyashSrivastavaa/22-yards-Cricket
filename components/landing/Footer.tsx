"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Twitter, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="mt-20 border-t border-[#D4AF37]/10 bg-white">
            {/* Final CTA Section */}
            <section className="py-24 border-b border-[#D4AF37]/10 relative overflow-hidden bg-[#F5F2E9]">
                <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bebas tracking-tighter uppercase leading-none text-[#1a1a1a]">
                        Stop Guessing. <span className="text-[#D4AF37]">Start Winning.</span>
                    </h2>
                    <p className="text-[#4a4a4a] text-[10px] font-mono uppercase tracking-[0.2em] max-w-xl mx-auto font-bold">
                        Join serious fantasy players using the 22 Yards tactical intelligence engine.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/register">
                            <Button size="lg" className="h-14 px-10 text-xs font-mono uppercase tracking-widest bg-[#D4AF37] hover:bg-[#B8860B] text-white rounded-none gap-2">
                                Initialize Pro Clearance <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="h-14 px-10 text-xs font-mono uppercase tracking-widest border-[#1a1a1a]/10 hover:bg-[#1a1a1a]/5 rounded-none">
                                Access Existing Node
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[#1a1a1a]">
                    <div className="col-span-2 space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="font-bebas text-3xl tracking-tighter text-[#1a1a1a]">22 YARDS</span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B8860B] font-bold">Intelligence Platform v2.0.4</span>
                        </div>
                        <p className="text-[10px] font-mono uppercase leading-relaxed text-[#4a4a4a] max-w-xs font-medium opacity-80">
                            The definitive data-moat for high-stakes cricket analytics, match simulations, and fantasy optimization.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Twitter className="h-4 w-4 text-[#4a4a4a] hover:text-[#D4AF37] cursor-pointer transition-colors" />
                            <Github className="h-4 w-4 text-[#4a4a4a] hover:text-[#D4AF37] cursor-pointer transition-colors" />
                            <Linkedin className="h-4 w-4 text-[#4a4a4a] hover:text-[#D4AF37] cursor-pointer transition-colors" />
                            <Mail className="h-4 w-4 text-[#4a4a4a] hover:text-[#D4AF37] cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-[#B8860B]">Platform</h4>
                        <ul className="space-y-3 text-[10px] font-mono uppercase tracking-wider text-[#4a4a4a] font-bold">
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Intelligence Hub</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Player Database</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Match Predictions</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Fantasy Optimizer</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-[#B8860B]">Company</h4>
                        <ul className="space-y-3 text-[10px] font-mono uppercase tracking-wider text-[#4a4a4a] font-bold">
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">About AI Engine</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Privacy Vault</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-[#D4AF37] cursor-pointer transition-colors">Contact Node</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#4a4a4a] font-medium opacity-60">
                        © 2026 22 YARDS INTELLIGENCE SYSTEMS. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#B8860B] font-bold">System Status: Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
