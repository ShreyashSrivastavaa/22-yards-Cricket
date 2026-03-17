"use client"

import { Cpu, Trophy, MapPin, LineChart } from "lucide-react"

import { useTrending } from "@/lib/hooks"
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function Features() {
    const { data, loading, error } = useTrending()
    const trending = data?.trending?.slice(0, 3) || []

    return (
        <section className="py-24 bg-[#0A0A0A] border-b border-[rgba(201,168,76,0.1)]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                                Live Market Insights
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Trading <span className="text-[#C9A84C]">Intelligence</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">Status: LIVE_FEED_ACTIVE</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                    </div>
                </div>

                {loading ? (
                    <div className="h-[400px] flex flex-col items-center justify-center gap-4 border border-[rgba(245,240,232,0.08)] bg-[#111111]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C] opacity-50" />
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">Synchronizing Analytics...</p>
                    </div>
                ) : error || trending.length === 0 ? (
                    <div className="h-[400px] flex flex-col items-center justify-center gap-4 border border-dashed border-[rgba(245,240,232,0.1)] opacity-50">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">Intelligence Feed Dormant — Check Back Pre-Season</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {trending.map((player: any, i: number) => (
                            <div key={i} className="group relative bg-[#111111] border border-[rgba(245,240,232,0.08)] p-6 hover:border-[#C9A84C]/40 hover:bg-[#1A1A1A] transition-all duration-300 shadow-xl overflow-hidden">
                                {/* Card Label */}
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">
                                        {i === 0 ? "Today's Elite Pick" : i === 1 ? "Market Value Gain" : "Stability Index"}
                                    </span>
                                    <div className="px-2 py-0.5 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-[9px] font-mono uppercase tracking-widest">
                                        Latest Available
                                    </div>
                                </div>

                                {/* Player Info */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl font-bebas text-[#F5F0E8] tracking-wider leading-none">{player.name}</h3>
                                        <span className="px-2 py-1 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-mono font-bold uppercase tracking-widest">
                                            {player.team}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-mono text-[rgba(245,240,232,0.6)] uppercase tracking-wider">
                                        {player.role}
                                    </p>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-6 pb-6 mb-6 border-b border-[rgba(245,240,232,0.05)]">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Scouting Score</div>
                                        <div className="text-2xl font-bebas text-[#C9A84C]">{player.score}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Delta Shift</div>
                                        <div className={`flex items-center gap-1.5 text-lg font-mono font-bold ${player.trend === 'up' ? 'text-[#1DB954]' :
                                                player.trend === 'down' ? 'text-[#C0392B]' : 'text-[#C9A84C]'
                                            }`}>
                                            {player.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                                            {player.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                                            {player.trend === 'stable' && <Minus className="h-4 w-4" />}
                                            {player.delta}%
                                        </div>
                                    </div>
                                </div>

                                {/* Intelligence Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                        <span className="text-[rgba(245,240,232,0.6)]">Data Integrity Range</span>
                                        <span className="text-[#C9A84C]">{(player.score * 0.95).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-1 bg-[#1A1A1A]">
                                        <div
                                            className="h-full bg-[#C9A84C] transition-all duration-1000"
                                            style={{ width: `${player.score}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
