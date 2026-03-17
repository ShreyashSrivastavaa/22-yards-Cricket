"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-[rgba(245,240,232,0.08)]">
            {/* Final CTA Section */}
            <section className="py-24 bg-[#C9A84C] relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                    <h2 className="text-7xl md:text-9xl font-bebas tracking-tighter uppercase leading-none text-[#0A0A0A]">
                        Scout Smarter. <br className="hidden md:block" /> Win The Pitch.
                    </h2>
                    <p className="text-[#0A0A0A] text-lg font-sans max-w-xl mx-auto font-medium">
                        Join serious fantasy players using the 22 Yards institutional-grade tactical intelligence platform.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                        <Button className="h-14 px-10 text-xs font-mono uppercase tracking-[0.2em] bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#C9A84C] rounded-none transition-colors" asChild>
                            <a href="/register">Join Platform Now</a>
                        </Button>
                        <Button variant="outline" className="h-14 px-10 text-xs font-mono uppercase tracking-[0.2em] border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A]/10 rounded-none transition-colors" asChild>
                            <a href="/login">Access Terminal</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                    <div className="col-span-2 space-y-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-bebas text-4xl tracking-tighter text-[#F5F0E8]">22 YARDS</span>
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">Intelligence Platform v2.1.0</span>
                        </div>
                        <p className="text-[11px] font-mono uppercase leading-relaxed text-[rgba(245,240,232,0.6)] max-w-xs tracking-wider">
                            The definitive data-moat for high-stakes cricket analytics, match simulations, and scouting optimization.
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <Twitter className="h-5 w-5 text-[rgba(245,240,232,0.25)] hover:text-[#F5F0E8] cursor-pointer transition-colors" />
                            <Github className="h-5 w-5 text-[rgba(245,240,232,0.25)] hover:text-[#F5F0E8] cursor-pointer transition-colors" />
                            <Linkedin className="h-5 w-5 text-[rgba(245,240,232,0.25)] hover:text-[#F5F0E8] cursor-pointer transition-colors" />
                            <Mail className="h-5 w-5 text-[rgba(245,240,232,0.25)] hover:text-[#F5F0E8] cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A84C]">Platform</h4>
                        <ul className="space-y-4 text-[11px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.6)]">
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Intelligence Hub</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Player Registry</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Match Analytics</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Squad Optimizer</li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A84C]">Protocol</h4>
                        <ul className="space-y-4 text-[11px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.6)]">
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">About Engine</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Terms of Use</li>
                            <li className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Support Node</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-[rgba(245,240,232,0.08)] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">
                        © 2026 22 YARDS INTELLIGENCE SYSTEMS. NO MOCK CONTENT.
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#1DB954]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">Global Nodes: Active</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
