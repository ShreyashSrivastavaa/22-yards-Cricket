"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Cpu, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 border-b border-primary/10">
            {/* Background Glows */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/5 text-primary text-[10px] font-mono tracking-[0.2em]">
                            SYSTEM VERSION 2.0.4 · ACTIVE
                        </Badge>
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            AI Engine: Analyzing 1,242 Scenarios...
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-tight leading-[0.9] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Stop Guessing. <span className="text-primary">Start Winning.</span>
                    </h1>

                    <p className="text-muted-foreground text-sm md:text-lg font-mono uppercase tracking-widest max-w-2xl opacity-80 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        Win More Fantasy Matches Using AI Cricket Intelligence. Real-time insights powered by data—not guesswork.
                    </p>

                    <div className="flex flex-col items-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500 w-full">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="#elite-picks">
                                <Button size="lg" className="h-14 px-8 text-xs font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 gap-2">
                                    Get Today’s Picks <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-xs font-mono uppercase tracking-widest border-primary/20 hover:bg-primary/5 gap-2">
                                    Enter Dashboard
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-8 py-3 px-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
                            <div className="text-left">
                                <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Next Major Match</div>
                                <div className="text-sm font-bold font-mono text-primary">MI vs CSK</div>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div className="text-left">
                                <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Starts In</div>
                                <div className="text-sm font-bold font-mono text-white">02h 14m 45s</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-700">
                        {[
                            { title: "AI-Powered", icon: Cpu, desc: "Neural forecasting engine" },
                            { title: "Real Match Data", icon: ShieldCheck, desc: "Live ingestion pipeline" },
                            { title: "Advanced Analytics", icon: BarChart3, desc: "10+ proprietary metrics" }
                        ].map((trust, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <trust.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-bold font-mono uppercase tracking-wider">{trust.title}</div>
                                    <div className="text-[9px] font-mono text-muted-foreground uppercase">{trust.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard Preview Mock */}
                <div className="mt-20 relative animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-1000">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-white/10" />
                            <div className="h-2 w-2 rounded-full bg-white/10" />
                            <div className="h-2 w-2 rounded-full bg-white/10" />
                            <div className="ml-auto flex items-center gap-3">
                                <div className="h-1 w-20 bg-white/10 rounded" />
                                <div className="h-1 w-12 bg-white/10 rounded" />
                            </div>
                        </div>
                        <div className="aspect-[16/9] bg-[url('https://images.unsplash.com/photo-1540747913346-19e3adca174f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 mix-blend-overlay" />
                        <div className="absolute inset-x-0 bottom-0 top-8 bg-black/60 p-8 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-12 w-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 animate-pulse">
                                    <Play className="h-5 w-5 text-primary fill-primary" />
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-primary/80">Preview Live Dashboard Feed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
