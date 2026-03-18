"use client"

import { Check, X, ShieldCheck } from "lucide-react"

export function Comparison() {
    const comparisons = [
        { feature: "Real-time Win Probability", ours: true, others: false },
        { feature: "Advanced Scouting Metrics", ours: true, others: "Basic Stats" },
        { feature: "Playing XII Optimization", ours: true, others: false },
        { feature: "Match Scenario Simulation", ours: true, others: false },
        { feature: "Atmospheric Pitch Analysis", ours: true, others: false },
        { feature: "Daily Tactical Briefing", ours: true, others: false },
    ]

    return (
        <section className="py-32 bg-[#0D0D0D] border-b border-[rgba(245,240,232,0.05)] relative overflow-hidden">
            {/* Decorative lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#111111] border border-[#C9A84C]/20 text-[#C9A84C] font-mono text-[10px] uppercase tracking-[0.3em]">
                        <ShieldCheck className="h-3 w-3" /> Competitive Advantage
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bebas tracking-wider uppercase text-[#F5F0E8]">Platform <span className="text-[#C9A84C]">Differentiation</span></h2>
                    <p className="text-[rgba(245,240,232,0.4)] text-[12px] font-mono uppercase tracking-[0.2em] leading-relaxed">
                        Why elite analysts choose 22 Yards over traditional statistical repositories.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-[#111111] border border-[rgba(245,240,232,0.08)] shadow-2xl">
                    <div className="grid grid-cols-12 border-b border-[rgba(245,240,232,0.08)] bg-[#0d0d0d]">
                        <div className="col-span-6 p-8 text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)]">Analytical Capabilities</div>
                        <div className="col-span-3 p-8 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A84C] border-x border-[rgba(245,240,232,0.08)]">22 Yards</div>
                        <div className="col-span-3 p-8 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)]">Standard</div>
                    </div>

                    <div className="divide-y divide-[rgba(245,240,232,0.05)]">
                        {comparisons.map((item, i) => (
                            <div key={i} className="grid grid-cols-12 group hover:bg-[#151515] transition-colors">
                                <div className="col-span-6 p-8 flex items-center gap-4">
                                    <div className="h-1 w-1 bg-[#C9A84C]/40 group-hover:bg-[#C9A84C]" />
                                    <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[rgba(245,240,232,0.8)]">{item.feature}</span>
                                </div>
                                <div className="col-span-3 p-8 flex justify-center items-center border-x border-[rgba(245,240,232,0.05)] bg-[#C9A84C]/[0.02]">
                                    <div className="flex items-center justify-center h-8 w-8 border border-[#C9A84C]/30 bg-[#C9A84C]/10">
                                        <Check className="h-4 w-4 text-[#C9A84C]" />
                                    </div>
                                </div>
                                <div className="col-span-3 p-8 flex justify-center items-center">
                                    <span className="text-[10px] font-mono uppercase text-[rgba(245,240,232,0.2)] tracking-widest">
                                        {typeof item.others === "string" ? (
                                            item.others
                                        ) : item.others ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <X className="h-4 w-4" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-10 bg-[#0d0d0d] border-t border-[rgba(245,240,232,0.08)] text-center">
                        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[rgba(245,240,232,0.2)]">Benchmark Data validated on 2024-25 Series intercept</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
