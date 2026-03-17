"use client"

import { Search, Cpu, Trophy, ArrowRight } from "lucide-react"

export function HowItWorks() {
    const steps = [
        {
            title: "Data Ingestion",
            desc: "We process live + historical cricket data through our proprietary tactical pipeline.",
            icon: Search,
            color: "text-[#D4AF37]",
            bg: "bg-[#D4AF37]/5"
        },
        {
            title: "AI Forecasting",
            desc: "Neural models simulate match outcomes & player performance using multivariate risk analysis.",
            icon: Cpu,
            color: "text-[#B8860B]",
            bg: "bg-[#B8860B]/5"
        },
        {
            title: "Victory Node",
            desc: "Execute smarter fantasy and match decisions based on high-integrity tactical intelligence.",
            icon: Trophy,
            color: "text-[#1a1a1a]",
            bg: "bg-[#1a1a1a]/5"
        }
    ]

    return (
        <section id="methodology" className="py-24 border-y border-[#D4AF37]/10 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase text-[#1a1a1a]">The <span className="text-[#D4AF37]">Intelligence Flow</span></h2>
                    <p className="text-[#4a4a4a] text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                        Architecting victory from raw match variables.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[48px] left-0 w-full h-[1px] bg-[#D4AF37]/10 z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
                            <div className={`h-24 w-24 ${step.bg} border border-[#D4AF37]/20 flex items-center justify-center transition-all duration-500`}>
                                <step.icon className={`h-10 w-10 ${step.color}`} />

                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center text-[10px] font-mono font-bold text-[#D4AF37] shadow-xl">
                                    0{i + 1}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <h3 className="text-2xl font-bebas tracking-wide uppercase text-[#1a1a1a]">{step.title}</h3>
                                <p className="text-[#4a4a4a] text-[10px] font-mono uppercase leading-relaxed tracking-wider max-w-[240px] font-medium opacity-80">
                                    {step.desc}
                                </p>
                            </div>

                            {i < 2 && (
                                <div className="md:hidden flex justify-center py-4">
                                    <ArrowRight className="h-6 w-6 text-[#D4AF37]/40 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
