"use client"

import { Button } from "@/components/ui/button"
import { Check, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export function Pricing() {
    const plans = [
        {
            name: "Free",
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
            name: "Pro",
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
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase">Choose Your <span className="text-primary">Intelligence Tier</span></h2>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest opacity-80">
                        Scale your tactical advantage from casual observer to professional analyst.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative flex flex-col p-8 rounded-3xl border ${plan.popular ? 'border-primary/50 bg-primary/[0.03] shadow-2xl shadow-primary/10' : 'border-white/5 bg-muted/5'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-[10px] font-mono font-bold uppercase tracking-widest text-primary-foreground flex items-center gap-1.5 shadow-lg">
                                    <Sparkles className="h-3 w-3" /> Most Recommended
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{plan.name} Intelligence</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-mono opacity-60">₹</span>
                                    <span className="text-5xl font-bebas tracking-tighter">{plan.price}</span>
                                    <span className="text-sm font-mono opacity-60">{plan.period}</span>
                                </div>
                                <p className="text-[10px] font-mono uppercase text-muted-foreground mt-4 leading-relaxed tracking-wider opacity-60">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`mt-1 p-0.5 rounded-full ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-white/10 text-muted-foreground'}`}>
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-80">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/dashboard" className="w-full">
                                <Button className={`w-full h-14 text-xs font-mono uppercase tracking-widest ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-muted-foreground/10 hover:bg-muted-foreground/20 text-white border border-white/5'}`}>
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
