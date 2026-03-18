"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A] pt-32 pb-20 border-b border-[rgba(201,168,76,0.1)]">
            {/* Background Watermark */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.06] pointer-events-none select-none overflow-hidden">
                <span className="font-bebas text-[40vw] leading-none text-[#F5F0E8] -rotate-[5deg] whitespace-nowrap">
                    22 YARDS
                </span>
            </div>

            <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C]">
                                IPL 2026 Intelligence Platform
                            </span>
                        </div>
                        <h1 className="text-[96px] md:text-[110px] font-bebas leading-[0.85] text-[#F5F0E8] tracking-tighter uppercase whitespace-pre-line">
                            SCOUT<br />
                            SMARTER.<br />
                            WIN THE<br />
                            <span className="text-[#C9A84C]">PITCH.</span>
                        </h1>
                        <p className="max-w-md text-[17px] leading-relaxed text-[rgba(245,240,232,0.6)] font-sans">
                            The most advanced analytics engine ever built for cricket.
                            From situational data-streams to predictive probability, 22 Yards
                            delivers institutional-grade intelligence for the next cycle.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] px-12 h-14 text-[12px] font-mono uppercase tracking-[0.3em] rounded-none font-bold transition-all" asChild>
                            <a href="/register">Initialize</a>
                        </Button>
                        <Button variant="outline" className="border-[#C9A84C] text-[#F5F0E8] hover:bg-[#C9A84C]/5 px-12 h-14 text-[12px] font-mono uppercase tracking-[0.3em] rounded-none font-bold transition-all" asChild>
                            <a href="/login">Access Terminal</a>
                        </Button>
                    </div>

                    {/* Hero Stats Row */}
                    <div className="pt-12 border-t border-[rgba(201,168,76,0.3)] grid grid-cols-3 gap-8">
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">1,267</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Intelligence Nodes</div>
                        </div>
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">84ms</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Global Latency</div>
                        </div>
                        <div>
                            <div className="font-bebas text-5xl text-[#C9A84C]">100%</div>
                            <div className="text-[11px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mt-1">Data Integrity</div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Scouting Card */}
                <div className="hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                    <div className="bg-[#111111] border border-[rgba(201,168,76,0.3)] p-10 max-w-sm ml-auto relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                        </div>

                        {/* Card Header */}
                        <div className="space-y-6 mb-12">
                            <div className="space-y-1">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)] block">Strategic Profile // Active</span>
                                <h2 className="text-5xl font-bebas text-[#F5F0E8] tracking-widest leading-none">V. KOHLI</h2>
                                <span className="text-[11px] font-mono text-[#C9A84C] uppercase tracking-[0.3em]">RCB | ANCHOR TYPE</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-10 mb-12 font-mono">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.25)] mb-2">Aggression</div>
                                <div className="text-4xl font-bebas text-[#C9A84C]">8.4/10</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.25)] mb-2">Stability</div>
                                <div className="text-4xl font-bebas text-[#1DB954]">ELITE</div>
                            </div>
                        </div>

                        {/* Phase Bars */}
                        <div className="space-y-8">
                            {[
                                { label: "Powerplay", value: 88 },
                                { label: "Middle", value: 74 },
                                { label: "Death", value: 92 }
                            ].map((phase) => (
                                <div key={phase.label} className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em]">
                                        <span className="text-[rgba(245,240,232,0.4)]">{phase.label} Overs</span>
                                        <span className="text-[#C9A84C] font-bold">{phase.value}%</span>
                                    </div>
                                    <div className="h-1 bg-[rgba(245,240,232,0.05)]">
                                        <div className="h-full bg-[#C9A84C]" style={{ width: `${phase.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Verdict Strip */}
                        <div className="mt-12 p-4 bg-[#1A1A1A] border-l-2 border-[#C9A84C]">
                            <p className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-[0.2em] leading-relaxed">
                                SCOUT VERDICT: OPTIMAL EFFICIENCY DETECTED IN CHASE SCENARIOS. SECTOR 7 CLEARANCE.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
