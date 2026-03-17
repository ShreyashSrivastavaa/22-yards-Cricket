"use client"

import { useEffect, useState } from "react"
import { Cpu, Zap, Activity } from "lucide-react"

export function LiveStatusTicker() {
    const [scenarios, setScenarios] = useState(1248)

    useEffect(() => {
        const interval = setInterval(() => {
            setScenarios(prev => prev + Math.floor(Math.random() * 5))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-primary/10 border-y border-primary/20 py-2 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-12 whitespace-nowrap animate-in fade-in duration-1000">
                    <div className="flex items-center gap-2">
                        <Activity className="h-3 w-3 text-primary animate-pulse" />
                        <span className="text-[9px] font-mono uppercase tracking-widest font-bold">AI Engine Active</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Cpu className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Analyzing {scenarios.toLocaleString()} Scenarios / sec</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Edge Ingestion: 84ms Latency</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Global Sync: Nodes 14/14 Online</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
