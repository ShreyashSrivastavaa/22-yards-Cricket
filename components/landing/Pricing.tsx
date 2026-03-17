"use client"

import { Button } from "@/components/ui/button"
import { Check, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export function Pricing() {
    const plans = [
        {
            name: "Standard",
            price: "FREE",
            description: "Basic entry-level insights for tactical observers.",
            features: [
                "Intelligence Dashboard Access",
                "Basic Player Profiling",
                "Live Match Scorecards",
                "Limited Daily Insights",
                "Tactical Archive Access"
            ],
            cta: "Initialize Access",
            popular: false
        },
        {
            name: "Analyst Pro",
            price: "499",
            period: "/MO",
            description: "Elite tools for professional fantasy scouts and analysts.",
            features: [
                "Tactical Intelligence Engine",
                "Interactive Radar Charts",
                "Strategic Squad Optimizer",
                "Full Match Story Timeline",
                "Multivariate Simulations",
                "Venue Advantage Analysis"
            ],
            cta: "Join Analyst Tier",
            popular: true
        }
    ]

    return (
        <section id="pricing" className="py-24 bg-[#0D0D0D] border-b border-[rgba(201,168,76,0.1)]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                                Pricing Structure
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Intelligence <span className="text-[#C9A84C]">Access Tiers</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative flex flex-col p-10 bg-[#111111] border ${plan.popular ? 'border-[#C9A84C] shadow-2xl shadow-[#C9A84C]/5' : 'border-[rgba(245,240,232,0.08)]'}`}>
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A84C] text-[10px] font-mono font-bold uppercase tracking-widest text-[#0A0A0A]">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-10">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] mb-2">{plan.name} Tier</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-mono text-[#C9A84C] font-bold">₹</span>
                                    <span className="text-6xl font-bebas tracking-tighter text-[#C9A84C]">{plan.price}</span>
                                    {plan.period && <span className="text-sm font-mono text-[rgba(245,240,232,0.4)] ml-1">{plan.period}</span>}
                                </div>
                                <p className="text-[11px] font-mono uppercase text-[rgba(245,240,232,0.6)] mt-6 leading-relaxed tracking-wider">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Check className="h-3 w-3 text-[#C9A84C]" />
                                        </div>
                                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5F0E8]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full h-14 bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-mono text-[11px] uppercase tracking-widest transition-colors" asChild>
                                <a href="/register">{plan.cta}</a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
