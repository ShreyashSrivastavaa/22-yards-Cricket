"use client"

import { useState } from "react"
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useTrending } from "@/lib/hooks"

export function Features() {
    const { data, loading, error } = useTrending()
    const [activeCategory, setActiveCategory] = useState("Batting")

    const trending = data?.trending?.slice(0, 6) || []

    const categories = ["Batting", "Bowling", "All-Round", "Fielding"]

    return (
        <section id="features" className="py-32 bg-[#0A0A0A] border-b border-[rgba(201,168,76,0.1)] relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">
                                Performance Showcases
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-[100px] font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Tactical <span className="text-[#C9A84C]">Metrics</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all border ${activeCategory === cat
                                        ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]"
                                        : "border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="h-[400px] flex flex-col items-center justify-center gap-4 border border-[rgba(245,240,232,0.08)] bg-[#111111]">
                        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C] opacity-50" />
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">Accessing Intelligence Nodes...</p>
                    </div>
                ) : error || trending.length === 0 ? (
                    <div className="h-[400px] flex flex-col items-center justify-center gap-4 border border-dashed border-[rgba(245,240,232,0.1)] opacity-50 bg-[#111111]">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">Data Feed Dormant // Session Inactive</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trending.map((player, i) => (
                            <div key={i} className="group relative bg-[#111111] border border-[rgba(245,240,232,0.08)] p-10 hover:border-[#C9A84C]/40 hover:bg-[#1A1A1A] transition-all duration-300 shadow-xl overflow-hidden">
                                {/* Card Label */}
                                <div className="flex justify-between items-center mb-10">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)]">
                                        Asset Profile // SC-{500 + i}
                                    </span>
                                    {player.delta > 10 && (
                                        <div className="px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] text-[9px] font-mono font-bold uppercase tracking-widest border border-[#1DB954]/30">
                                            TOP 10%
                                        </div>
                                    )}
                                </div>

                                {/* Player Info */}
                                <div className="space-y-6 mb-12">
                                    <div className="space-y-2">
                                        <h3 className="text-4xl font-bebas text-[#F5F0E8] tracking-widest leading-none uppercase group-hover:text-[#C9A84C] transition-colors">{player.name}</h3>
                                        <div className="inline-block px-3 py-1 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-mono font-bold uppercase tracking-widest">
                                            {player.team} | {player.role}
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-10 pb-10 mb-10 border-b border-[rgba(245,240,232,0.05)]">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Analytical Score</div>
                                        <div className="text-4xl font-bebas text-[#C9A84C]">{player.score}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Momentum Alpha</div>
                                        <div className={`flex items-center gap-2 text-xl font-mono font-bold ${player.trend === 'up' ? 'text-[#1DB954]' :
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
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em]">
                                        <span className="text-[rgba(245,240,232,0.4)]">Data Confidence Index</span>
                                        <span className="text-[#C9A84C] font-bold">{(player.score * 0.95).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-[2px] bg-[#1A1A1A]">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D08A] transition-all duration-1000"
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
