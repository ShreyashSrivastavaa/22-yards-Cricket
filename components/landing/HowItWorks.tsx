"use client"

import { Search, Cpu, Trophy, ArrowRight } from "lucide-react"

export function HowItWorks() {
    const steps = [
        {
            title: "Data Intercept",
            desc: "We capture live + historical match variables through our institutional-grade tactical pipeline."
        },
        {
            title: "Analytics Forge",
            desc: "Predictive models evaluate match outcomes and player ceiling using multivariate risk variables."
        },
        {
            title: "Strategic Edge",
            desc: "Deploy smarter fantasy and match decisions based on high-integrity tactical intelligence."
        }
    ]

    return (
        <section id="methodology" className="py-24 bg-[#0D0D0D] border-b border-[rgba(201,168,76,0.1)] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                                The Intelligence Flow
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Methodology <span className="text-[#C9A84C]">& Pipeline</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group bg-[#111111] border border-[rgba(245,240,232,0.08)] p-10 pt-16 hover:border-[#C9A84C]/40 transition-all duration-300">
                            {/* Huge Step Number */}
                            <div className="absolute top-4 right-6 font-bebas text-9xl text-[#C9A84C] opacity-[0.08] select-none group-hover:opacity-[0.12] transition-opacity">
                                0{i + 1}
                            </div>

                            <div className="relative z-10 space-y-6">
                                <h3 className="text-4xl font-bebas tracking-wide uppercase text-[#F5F0E8]">{step.title}</h3>
                                <p className="text-[rgba(245,240,232,0.6)] text-[11px] font-mono uppercase leading-relaxed tracking-wider max-w-[240px]">
                                    {step.desc}
                                </p>
                                <div className="h-0.5 w-12 bg-[#C9A84C] transform origin-left group-hover:scale-x-150 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
