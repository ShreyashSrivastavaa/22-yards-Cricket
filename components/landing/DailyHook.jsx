"use client"

import { useDailyPicks, useTrending } from "@/lib/hooks"
import { ChevronRight, Target, Trophy, TrendingUp, Activity } from "lucide-react"

export function DailyHook() {
    const { data: picksData, loading: picksLoading } = useDailyPicks()
    const { data: trendingRaw, loading: trendingLoading } = useTrending()

    const trendingData = trendingRaw || { trending: [], undervalued: [] }
    const isLoading = picksLoading || trendingLoading

    const dailyPick = picksData?.picks?.[0]
    const captainPick = picksData?.picks?.[1]
    const trendingPick = trendingData.trending?.[0]
    const undervaluedPick = trendingData.undervalued?.[0]

    const cards = [
        {
            title: "STRATEGIC TARGET",
            player: dailyPick?.player_name || "Virat Kohli",
            team: dailyPick?.team_code || "IND",
            metric: "9.4",
            metricLabel: "Impact Score",
            reason: dailyPick?.reasoning || "Venue atmospheric bias alignment",
            icon: Target,
            trend: "neutral",
            status: "ELITE PICK"
        },
        {
            title: "LEADERSHIP NODE",
            player: captainPick?.player_name || "Hardik Pandya",
            team: captainPick?.team_code || "IND",
            metric: "82%",
            metricLabel: "Consistency",
            reason: captainPick?.reasoning || "Peak performance cycle projected",
            icon: Trophy,
            trend: "positive",
            status: "TOP PRIORITY"
        },
        {
            title: "MARKET ALPHA",
            player: trendingPick?.name || "Y. Jaiswal",
            team: trendingPick?.team || "IND",
            metric: "+14%",
            metricLabel: "Momentum",
            reason: trendingPick?.reason || "Significant form rating acceleration",
            icon: TrendingUp,
            trend: "positive",
            status: "BULLISH"
        },
        {
            title: "VALUE ASSET",
            player: undervaluedPick?.name || "Rinku Singh",
            team: undervaluedPick?.team || "IND",
            metric: "7.2",
            metricLabel: "Efficiency",
            reason: "Positive efficiency to cost ratio",
            icon: Activity,
            trend: "neutral",
            status: "MARKET BUY"
        }
    ]

    return (
        <section id="features" className="py-32 bg-[#0A0A0A] border-y border-[rgba(245,240,232,0.05)] relative overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-bebas text-[rgba(245,240,232,0.015)] select-none pointer-events-none tracking-tighter">
                ANALYTICS
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#C9A84C]" />
                            <span className="text-[#C9A84C] font-mono text-[11px] uppercase tracking-[0.4em] font-bold">Market Intelligence Feed</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bebas tracking-tight uppercase text-[#F5F0E8] leading-none">
                            Live Market <span className="text-[#C9A84C]">Insights</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-8 p-6 border border-[rgba(245,240,232,0.08)] bg-[#111111]">
                        <div className="text-right">
                            <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest mb-1">Intelligence Relay</div>
                            <div className="text-xs font-bold font-mono text-[#C9A84C]">ACTIVE_SYNC</div>
                        </div>
                        <div className="h-10 w-px bg-[rgba(245,240,232,0.1)]" />
                        <div className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-none bg-[#1DB954] animate-pulse shadow-[0_0_10px_#1DB954]" />
                            <span className="text-[10px] font-mono text-[#1DB954] uppercase tracking-[0.2em] font-bold">Live Feed</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[420px] bg-[#111111] animate-pulse border border-[rgba(245,240,232,0.05)]" />
                        ))
                    ) : (
                        cards.map((card, i) => (
                            <div key={i} className="group bg-[#111111] border border-[rgba(245,240,232,0.08)] hover:border-[#C9A84C]/40 hover:bg-[#1A1A1A] transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden">
                                <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] flex justify-between items-center bg-[#0d0d0d]">
                                    <span className="text-[9px] font-mono text-[rgba(245,240,232,0.3)] uppercase tracking-[0.2em]">{card.status}</span>
                                    <div className="px-2 py-0.5 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-[8px] font-mono uppercase tracking-widest">LATEST AVAILABLE</div>
                                </div>

                                <div className="p-8 space-y-10 flex-grow">
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]/60">{card.title}</div>
                                        <div className="space-y-1">
                                            <div className="text-4xl font-bebas tracking-widest text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors leading-none uppercase">
                                                {card.player}
                                            </div>
                                            <div className="inline-block px-2 py-0.5 bg-[#C9A84C] text-[#0A0A0A] text-[9px] font-mono font-bold uppercase tracking-widest">
                                                {card.team}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-mono uppercase text-[rgba(245,240,232,0.2)] tracking-[0.2em]">{card.metricLabel}</span>
                                            <span className={`text-5xl font-bebas tracking-widest ${card.trend === 'positive' ? 'text-[#1DB954]' : 'text-[#C9A84C]'
                                                }`}>{card.metric}</span>
                                        </div>
                                        <p className="text-[11px] font-mono leading-relaxed text-[rgba(245,240,232,0.4)] uppercase h-12 overflow-hidden tracking-wider border-t border-[rgba(245,240,232,0.05)] pt-4">
                                            {card.reason}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-2 space-y-1">
                                    <div className="w-full h-[3px] bg-[rgba(245,240,232,0.03)]">
                                        <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D08A] opacity-60" style={{ width: (65 + (i * 8)) + '%' }} />
                                    </div>
                                    <div className="flex justify-between items-center px-4 py-2">
                                        <span className="text-[8px] font-mono text-[rgba(245,240,232,0.15)] uppercase tracking-widest">Node ID: SC-{100 + i}</span>
                                        <ChevronRight className="h-3 w-3 text-[rgba(245,240,232,0.2)] group-hover:text-[#C9A84C] transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
