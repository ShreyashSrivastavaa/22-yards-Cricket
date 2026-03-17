"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Twitter, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="mt-20 border-t border-white/5 bg-black/40 backdrop-blur-md">
            {/* Final CTA Section */}
            <section className="py-24 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bebas tracking-tighter uppercase leading-none">
                        Stop Guessing. <span className="text-primary">Start Winning.</span>
                    </h2>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em] max-w-xl mx-auto opacity-70">
                        Join 10,000+ serious fantasy players using the 22 Yards neural intelligence engine.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-14 px-10 text-xs font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 gap-2">
                                Get Started Free <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="lg" variant="outline" className="h-14 px-10 text-xs font-mono uppercase tracking-widest border-white/10 hover:bg-white/5">
                                View Today’s Picks
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="col-span-2 space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="font-bebas text-3xl tracking-tighter text-primary">22 YARDS</span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Intelligence Platform v2.0.4</span>
                        </div>
                        <p className="text-[10px] font-mono uppercase leading-relaxed text-muted-foreground max-w-xs opacity-60">
                            The definitive data-moat for high-stakes cricket analytics, match simulations, and fantasy optimization.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Github className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Mail className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            <li className="hover:text-primary cursor-pointer transition-colors">Intelligence Hub</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Player Database</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Match Predictions</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Fantasy Optimizer</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest">Company</h4>
                        <ul className="space-y-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            <li className="hover:text-primary cursor-pointer transition-colors">About AI Engine</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Privacy Vault</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Contact Node</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground opacity-40">
                        © 2026 22 YARDS INTELLIGENCE SYSTEMS. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Mainnet Node: Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
