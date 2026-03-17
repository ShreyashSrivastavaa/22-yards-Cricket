"use client"

import { Search, Cpu, Trophy, ArrowRight } from "lucide-react"

export function HowItWorks() {
    const steps = [
        {
            title: "Analyze",
            desc: "We process live + historical cricket data through our proprietary ingestion pipeline.",
            icon: Search,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Predict",
            desc: "AI models simulate outcomes & player performance using neural forecasting.",
            icon: Cpu,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            title: "Win",
            desc: "You make smarter fantasy and match decisions based on tactical intelligence.",
            icon: Trophy,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ]

    return (
        <section className="py-24 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase">The <span className="text-primary">Intelligence Flow</span></h2>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest opacity-80">
                        Three steps from raw data to winning tactical decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-12 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
                            <div className={`h-24 w-24 rounded-3xl ${step.bg} border border-white/10 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                                <step.icon className={`h-10 w-10 ${step.color}`} />

                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary shadow-xl">
                                    0{i + 1}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <h3 className="text-2xl font-bebas tracking-wide uppercase">{step.title}</h3>
                                <p className="text-muted-foreground text-[10px] font-mono uppercase leading-relaxed tracking-wider max-w-[240px] opacity-60">
                                    {step.desc}
                                </p>
                            </div>

                            {i < 2 && (
                                <div className="md:hidden flex justify-center py-4">
                                    <ArrowRight className="h-6 w-6 text-muted-foreground/20 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
