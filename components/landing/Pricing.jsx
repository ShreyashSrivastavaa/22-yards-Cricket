"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
    const plans = [
        {
            name: "STANDARD",
            price: "FREE",
            description: "BASIC ENTRY-LEVEL INSIGHTS FOR TACTICAL OBSERVERS.",
            features: [
                "Intelligence Dashboard Access",
                "Basic Player Profiling",
                "Live Match Scorecards",
                "Limited Daily Insights",
                "Tactical Archive Access"
            ],
            cta: "INITIALIZE ACCESS",
            popular: false
        },
        {
            name: "ANALYST PRO",
            price: "499",
            period: "/MO",
            description: "ELITE TOOLS FOR PROFESSIONAL FANTASY SCOUTS AND ANALYSTS.",
            features: [
                "Tactical Intelligence Engine",
                "Interactive Radar Charts",
                "Strategic Squad Optimizer",
                "Full Match Story Timeline",
                "Multivariate Simulations",
                "Venue Advantage Analysis"
            ],
            cta: "JOIN ANALYST TIER",
            popular: true
        }
    ]

    return (
        <section id="pricing" className="py-32 bg-[#0A0A0A] border-b border-[rgba(201,168,76,0.1)]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">
                                Subscription Architecture
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-[100px] font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Intelligence <span className="text-[#C9A84C]">Access</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative flex flex-col p-12 bg-[#111111] border ${plan.popular ? 'border-[#C9A84C] shadow-2xl shadow-[#C9A84C]/5' : 'border-[rgba(245,240,232,0.08)]'}`}>
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#C9A84C] text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#0A0A0A]">
                                    RECOMMENDED TIER
                                </div>
                            )}

                            <div className="mb-12">
                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)] mb-4">{plan.name} PROTOCOL</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-mono text-[#C9A84C] font-bold">₹</span>
                                    <span className="text-7xl font-bebas tracking-tighter text-[#C9A84C]">{plan.price}</span>
                                    {plan.period && <span className="text-sm font-mono text-[rgba(245,240,232,0.4)] ml-2 uppercase tracking-widest">{plan.period}</span>}
                                </div>
                                <p className="text-[12px] font-mono uppercase text-[rgba(245,240,232,0.5)] mt-8 leading-relaxed tracking-[0.15em]">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-6 mb-16 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4 border-b border-[rgba(245,240,232,0.03)] pb-4">
                                        <Check className="h-3 w-3 text-[#C9A84C]" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F5F0E8]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full h-16 bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-mono text-[12px] uppercase tracking-[0.3em] font-bold transition-all" asChild>
                                <a href="/register">{plan.cta}</a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
