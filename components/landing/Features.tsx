"use client"

import { Cpu, Trophy, MapPin, LineChart } from "lucide-react"

export function Features() {
    const features = [
        {
            title: "Player Intelligence",
            description: "Visual strength Profiles across 5 dimensions: Attack, Power, Consistency, Clutch, and Pressure.",
            icon: Cpu,
            stats: ["Radar Charts", "Form Tracking", "Role-Based Ratings"]
        },
        {
            title: "Prediction Engine",
            description: "Live win probability shifts driven by ball-by-ball neural simulations.",
            icon: LineChart,
            stats: ["Win Prob Graph", "Scenario Simulation", "Innings Projection"]
        },
        {
            title: "Fantasy Optimizer",
            description: "Strategic lineup suggesting based on proprietary Impact Scores and venue bias.",
            icon: Trophy,
            stats: ["Captain Suggestions", "Squad Balancing", "Value Detection"]
        },
        {
            title: "Venue Intelligence",
            description: "Micro-climate and pitch analysis quantifying specific ground advantages.",
            icon: MapPin,
            stats: ["Pace vs Spin Bias", "Chasing Advantage", "Boundary Dimensions"]
        }
    ]

    return (
        <section className="py-24 bg-[#F5F2E9]">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mb-20 space-y-4">
                    <div className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest font-bold">— Tactical Advantage</div>
                    <h2 className="text-4xl md:text-6xl font-bebas tracking-wider uppercase leading-none text-[#1a1a1a]">Unrivaled <span className="text-[#D4AF37]">Analytical Depth</span></h2>
                    <p className="text-[#4a4a4a] text-xs font-mono uppercase tracking-[0.1em] opacity-80">
                        We deliver the same level of intelligence used by professional franchises, adapted for high-stakes fantasy players.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {features.map((feature, i) => (
                        <div key={i} className="group relative flex flex-col gap-6 p-8 bg-white border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/10">
                                    <feature.icon className="h-6 w-6 text-[#D4AF37]" />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-mono text-[#4a4a4a] uppercase">Intelligence Node</div>
                                    <div className="text-[10px] font-mono text-[#B8860B] uppercase font-bold tracking-widest leading-none mt-1">OPERATIONAL</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-2xl font-bebas tracking-wider uppercase text-[#1a1a1a] group-hover:text-[#D4AF37] transition-colors">{feature.title}</h3>
                                <p className="text-[#4a4a4a] text-[11px] font-mono uppercase leading-relaxed tracking-wider">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-[#D4AF37]/10">
                                {feature.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">{stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
