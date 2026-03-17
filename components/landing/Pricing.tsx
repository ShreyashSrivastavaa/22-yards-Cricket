"use client"

import { Button } from "@/components/ui/button"
import { Check, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export function Pricing() {
    const plans = [
        {
            name: "Standard",
            price: "0",
            description: "Basic entry-level insights for casual fans.",
            features: [
                "Intelligence Dashboard Access",
                "Basic Player Profiling",
                "Live Match Scorecards",
                "Limited Daily Picks",
                "Community Analysis Feed"
            ],
            cta: "Get Started Free",
            popular: false
        },
        {
            name: "Analyst Pro",
            price: "499",
            period: "/month",
            description: "Elite tools for serious fantasy players and scouts.",
            features: [
                "Full AI Prediction Engine",
                "Interactive Radar Charts",
                "Fantasy Optimizer Pro",
                "Match Story Timeline",
                "Innings Simulation Model",
                "Early Venue Intelligence"
            ],
            cta: "Unlock Pro Early",
            popular: true
        }
    ]

    return (
        <section id="pricing" className="py-24 bg-[#F5F2E9]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase text-[#1a1a1a]">Choose Your <span className="text-[#D4AF37]">Intelligence Tier</span></h2>
                    <p className="text-[#4a4a4a] text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                        Scale your tactical advantage from casual observer to professional analyst.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative flex flex-col p-8 rounded-none border ${plan.popular ? 'border-[#D4AF37] bg-white shadow-2xl shadow-[#D4AF37]/10' : 'border-[#1a1a1a]/10 bg-white/50'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-lg">
                                    <Sparkles className="h-3 w-3" /> Highest Clearance
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-[#B8860B] mb-2">{plan.name} Node</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-mono text-[#4a4a4a]">₹</span>
                                    <span className="text-5xl font-bebas tracking-tighter text-[#1a1a1a]">{plan.price}</span>
                                    <span className="text-sm font-mono text-[#4a4a4a]">{plan.period}</span>
                                </div>
                                <p className="text-[10px] font-mono uppercase text-[#4a4a4a] mt-4 leading-relaxed tracking-wider font-medium opacity-70">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`mt-1 p-0.5 ${plan.popular ? 'text-[#D4AF37]' : 'text-[#4a4a4a]'}`}>
                                            <Check className="h-3 w-3 stroke-[3]" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#1a1a1a] font-bold">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/register" className="w-full">
                                <Button className={`w-full h-14 rounded-none text-xs font-mono uppercase tracking-[0.2em] ${plan.popular ? 'bg-[#D4AF37] hover:bg-[#B8860B] text-white' : 'bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] border border-[#1a1a1a]/10'}`}>
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
