"use client"

import { Check, X } from "lucide-react"

export function Comparison() {
    const comparisons = [
        { feature: "AI Predictions", ours: true, others: false },
        { feature: "Deep Analytics", ours: true, others: "Limited" },
        { feature: "Fantasy Optimization", ours: true, others: false },
        { feature: "Match Simulation", ours: true, others: false },
        { feature: "Venue Atmospheric Bias", ours: true, others: false },
        { feature: "Daily Insight Engine", ours: true, others: false },
    ]

    return (
        <section className="py-24 bg-muted/5">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase">Engine <span className="text-primary">Differentiation</span></h2>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest opacity-80">
                        Why serious fantasy players chose the 22 Yards neural pipeline over traditional stat platforms.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tactical Feature</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-widest text-primary text-center">22 Yards AI</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-center">Others</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                            {comparisons.map((item, i) => (
                                <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                                    <td className="p-6 text-[11px] font-bold uppercase tracking-wider">{item.feature}</td>
                                    <td className="p-6 text-center">
                                        <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-primary/10 border border-primary/20">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                    </td>
                                    <td className="p-6 text-center text-[10px] uppercase text-muted-foreground opacity-40">
                                        {typeof item.others === "string" ? (
                                            item.others
                                        ) : item.others ? (
                                            <Check className="h-4 w-4 mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 mx-auto" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
