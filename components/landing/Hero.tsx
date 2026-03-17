"use client"

import { useState, useEffect } from "react"
import { Cpu, ShieldCheck, BarChart3, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A] pt-32 pb-20 border-b border-[rgba(201,168,76,0.1)]">
            {/* Background Watermark */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none overflow-hidden">
                <span className="font-bebas text-[40vw] leading-none text-[#F5F0E8] -rotate-[5deg] whitespace-nowrap">
                    22 YARDS
                </span>
            </div>

            <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                                IPL 2026 Intelligence Platform
                            </span>
                        </div>
                        <h1 className="text-[96px] md:text-[120px] font-bebas leading-[0.85] text-[#F5F0E8] tracking-tighter uppercase">
                            Scout <br />
                            Smarter. <br />
                            Win The <span className="text-[#C9A84C]">Pitch.</span>
                        </h1>
                        <p className="max-w-lg text-[17px] leading-relaxed text-[rgba(245,240,232,0.6)] font-sans">
                            The most advanced match intelligence engine ever built for cricket.
                            From phase-wise matchups to real-time probability, 22 Yards
                            deciphers the game with institutional-grade analytics.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] px-10 h-14 text-xs font-mono uppercase tracking-widest rounded-none transition-colors" asChild>
                            <a href="/register">Join Platform</a>
                        </Button>
                        <Button variant="outline" className="border-[#C9A84C] text-[#F5F0E8] hover:bg-[#C9A84C]/5 px-10 h-14 text-xs font-mono uppercase tracking-widest rounded-none transition-colors" asChild>
                            <a href="/login">Access Terminal</a>
                        </Button>
                    </div>

                    {/* Hero Stats Row */}
                    <div className="pt-12 border-t border-[rgba(201,168,76,0.3)] grid grid-cols-3 gap-8">
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">1.2K+</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Active Players</div>
                        </div>
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">144ms</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Data Latency</div>
                        </div>
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">IPL26</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Active Nodes</div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Scouting Card */}
                <div className="hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                    <div className="bg-[#111111] border border-[rgba(201,168,76,0.3)] p-8 max-w-md mx-auto relative overflow-hidden group shadow-2xl">
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="space-y-1">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] block">Intelligence Profile</span>
                                <h2 className="text-4xl font-bebas text-[#F5F0E8] tracking-wider leading-none">V. KOHLI</h2>
                                <span className="text-[11px] font-mono text-[#C9A84C] uppercase tracking-widest">RCB | TOP ORDER BAT</span>
                            </div>
                            <div className="h-12 w-12 bg-[#0A0A0A] border border-[rgba(201,168,76,0.2)] flex items-center justify-center">
                                <span className="font-bebas text-2xl text-[#C9A84C]">92</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] mb-2">Aggression Index</div>
                                <div className="text-3xl font-mono text-[#C9A84C]">8.4<span className="text-xs opacity-50 ml-1">pts</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] mb-2">Risk Variance</div>
                                <div className="text-3xl font-mono text-[#C9A84C]">2.1%</div>
                            </div>
                        </div>

                        {/* Phase Bars */}
                        <div className="space-y-6">
                            {[
                                { label: "Powerplay", value: 88 },
                                { label: "Middle Overs", value: 64 },
                                { label: "Death Overs", value: 92 }
                            ].map((phase) => (
                                <div key={phase.label} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                        <span className="text-[rgba(245,240,232,0.6)]">{phase.label}</span>
                                        <span className="text-[#C9A84C]">{phase.value}%</span>
                                    </div>
                                    <div className="h-1 bg-[#1A1A1A]">
                                        <div className="h-full bg-[#C9A84C]" style={{ width: `${phase.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Verdict Strip */}
                        <div className="mt-12 p-3 bg-[#1A1A1A] border-l-2 border-[#C9A84C]">
                            <p className="text-[11px] font-mono text-[#C9A84C] uppercase tracking-widest">
                                SCOUT VERDICT: ELITE RECOVERY NODES ACTIVE
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
