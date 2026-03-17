"use client"

import { useState, useEffect } from "react"
import { Cpu, ShieldCheck, BarChart3, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

    useEffect(() => {
        const target = new Date("2026-03-31T19:30:00").getTime()
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = target - now
            if (distance < 0) {
                clearInterval(timer)
                return
            }
            setTimeLeft({
                h: Math.floor((distance / (1000 * 60 * 60))),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000)
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-40 border-b border-[#D4AF37]/20 bg-[#F5F2E9]">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#B8860B] text-[10px] font-mono uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                    </span>
                    Next Generation Cricket Intelligence
                </div>

                <h1 className="text-6xl md:text-8xl font-bebas tracking-tight leading-[0.9] text-[#1a1a1a] mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    MASTER THE <span className="text-[#D4AF37]">CREASE</span> WITH <br />
                    ELITE ANALYTICS
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-[#4a4a4a] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                    The most advanced match intelligence engine ever built for cricket.
                    From phase-wise matchups to real-time win probability, 22 Yards
                    deciphers the game like never before.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-8 h-14 text-sm font-bold uppercase tracking-widest rounded-none border-b-4 border-[#8B6508]" asChild>
                        <a href="/register">Start Analyzing Now <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button variant="outline" size="lg" className="border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37]/5 px-8 h-14 text-sm font-bold uppercase tracking-widest rounded-none" asChild>
                        <a href="/login">Login to Dashboard</a>
                    </Button>
                </div>

                {/* Countdown / Status Bar */}
                <div className="flex items-center gap-8 py-4 px-8 rounded-none border border-[#D4AF37]/30 bg-white/50 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-600">
                    <div className="text-left">
                        <div className="text-[9px] font-mono text-[#4a4a4a] uppercase tracking-widest mb-1">Season Opener</div>
                        <div className="text-sm font-bold font-mono text-[#B8860B]">IPL 2026 Opening Night</div>
                    </div>
                    <div className="h-10 w-px bg-[#D4AF37]/20" />
                    <div className="text-left">
                        <div className="text-[9px] font-mono text-[#4a4a4a] uppercase tracking-widest mb-1">Intelligence Countdown</div>
                        <div className="text-sm font-bold font-mono text-[#1a1a1a]">
                            {String(timeLeft.h).padStart(2, '0')}h {String(timeLeft.m).padStart(2, '0')}m {String(timeLeft.s).padStart(2, '0')}s
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-800">
                    {[
                        { title: "Neural Forecasting", icon: Cpu, desc: "Predictive engine for game states" },
                        { title: "Tactical Vault", icon: ShieldCheck, desc: "Historical data and archives" },
                        { title: "Live Intelligence", icon: BarChart3, desc: "Real-time stats ingestion" }
                    ].map((trust, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-white shadow-sm border border-[#D4AF37]/10">
                            <div className="p-3 rounded-none bg-[#D4AF37]/10">
                                <trust.icon className="h-5 w-5 text-[#D4AF37]" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-bold uppercase text-[#1a1a1a]">{trust.title}</div>
                                <div className="text-[10px] font-mono text-[#4a4a4a] uppercase mt-0.5">{trust.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
