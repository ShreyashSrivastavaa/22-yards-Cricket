"use client"

import { Cpu, Zap, Trophy, MapPin, Calculator, BarChart3, LineChart, Search } from "lucide-react"

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
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mb-20 space-y-4">
                    <div className="text-primary font-mono text-[10px] uppercase tracking-widest font-bold">— Tactical Advantage</div>
                    <h2 className="text-4xl md:text-6xl font-bebas tracking-wider uppercase leading-none">Unrivaled <span className="text-primary">Analytical Depth</span></h2>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.1em] opacity-80">
                        We deliver the same level of intelligence used by professional franchises, adapted for high-stakes fantasy players.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {features.map((feature, i) => (
                        <div key={i} className="group relative flex flex-col gap-6 p-8 rounded-3xl border border-white/5 bg-muted/5 hover:bg-muted/10 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Module Status</div>
                                    <div className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest">PRODUCTION READY</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-2xl font-bebas tracking-wider uppercase group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-muted-foreground text-[11px] font-mono uppercase leading-relaxed tracking-wider opacity-70">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-white/5">
                                {feature.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-primary" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Visual Mock Overlay (Abstract) */}
                            <div className="absolute top-8 right-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                <feature.icon className="h-full w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
