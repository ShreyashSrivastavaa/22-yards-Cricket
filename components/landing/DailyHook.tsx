"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Target, Trophy, Flame, Share2, Activity, ChevronRight } from "lucide-react"
import { useDailyPicks, useTrending } from "@/lib/hooks"
import { LoadingSkeleton } from "@/components/ui/data-states"
import { Button } from "@/components/ui/button"

export function DailyHook() {
    const { data: picksData, loading: picksLoading } = useDailyPicks()
    const { data: trendingRaw, loading: trendingLoading } = useTrending()

    const trendingData = (trendingRaw as any) || { trending: [], undervalued: [] }
    const isLoading = picksLoading || trendingLoading

    const dailyPick = picksData?.picks?.[0]
    const captainPick = picksData?.picks?.[1]
    const trendingPick = trendingData.trending?.[0]
    const undervaluedPick = trendingData.undervalued?.[0]

    const cards = [
        {
            title: "Prime Strategic Target",
            player: dailyPick?.player_name || "Virat Kohli",
            team: dailyPick?.team_code || "IND",
            metric: `${dailyPick?.projected_points || '9.4'} Impact`,
            reason: dailyPick?.reasoning || "Venue atmospheric bias alignment",
            icon: Target,
            color: "text-[#C9A84C]",
            status: "High Conviction"
        },
        {
            title: "Leadership Selection",
            player: captainPick?.player_name || "Hardik Pandya",
            team: captainPick?.team_code || "IND",
            metric: "82% Probability",
            reason: captainPick?.reasoning || "Peak performance cycle projected",
            icon: Trophy,
            color: "text-[#C9A84C]",
            status: "Top Priority"
        },
        {
            title: "Market Momentum",
            player: trendingPick?.name || "Y. Jaiswal",
            team: trendingPick?.team || "IND",
            metric: trendingPick?.trend || "+14% Alpha",
            reason: trendingPick?.reason || "Significant form rating acceleration",
            icon: TrendingUp,
            color: "text-[#1DB954]",
            status: "Bullish Trend"
        },
        {
            title: "Undervalued Asset",
            player: undervaluedPick?.name || "Rinku Singh",
            team: undervaluedPick?.team || "IND",
            metric: undervaluedPick?.impact || "7.2 Score",
            reason: "Positive efficiency to cost ratio",
            icon: Activity,
            color: "text-[#C9A84C]",
            status: "Market Buy"
        }
    ]

    return (
        <section id="elite-picks" className="py-32 bg-[#0D0D0D] border-y border-[rgba(245,240,232,0.05)] relative overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bebas text-[rgba(245,240,232,0.02)] select-none pointer-events-none tracking-tighter">
                INTELLIGENCE
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-[#C9A84C]" />
                            <span className="text-[#C9A84C] font-mono text-[11px] uppercase tracking-[0.4em] font-bold">Terminal Intelligence Feed</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bebas tracking-wider uppercase text-[#F5F0E8]">Daily Strategic <span className="text-[#C9A84C]">Intercepts</span></h2>
                        <p className="text-[rgba(245,240,232,0.4)] text-[12px] font-mono uppercase tracking-[0.2em] max-w-2xl leading-relaxed">
                            Global data-streams synthesized into actionable scouting intelligence. Real-time form monitoring across all sectors.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 p-6 border border-[rgba(245,240,232,0.08)] bg-[#111111]">
                        <div className="text-right">
                            <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">Global Sync Status</div>
                            <div className="text-xs font-bold font-mono text-[#C9A84C]">
                                {picksData?.date ? new Date(picksData.date).toLocaleTimeString() : "READY"}
                            </div>
                        </div>
                        <div className="h-8 w-px bg-[rgba(245,240,232,0.1)]" />
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#1DB954] animate-pulse" />
                            <span className="text-[10px] font-mono text-[#1DB954] uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 bg-[#111111] animate-pulse border border-[rgba(245,240,232,0.05)]" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, i) => (
                            <div key={i} className="group bg-[#111111] border border-[rgba(245,240,232,0.08)] hover:border-[#C9A84C]/40 transition-all cursor-pointer flex flex-col">
                                <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] flex justify-between items-center bg-[#0d0d0d]">
                                    <span className="text-[10px] font-mono text-[rgba(245,240,232,0.4)] uppercase tracking-widest">{card.status}</span>
                                    <card.icon className={`h-3 w-3 ${card.color}`} />
                                </div>
                                <div className="p-8 space-y-8 flex-grow">
                                    <div className="space-y-2">
                                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C9A84C]/60">{card.title}</div>
                                        <div className="text-3xl font-bebas tracking-widest text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors leading-none uppercase">
                                            {card.player} <span className="text-[11px] font-mono opacity-20">[{card.team}]</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-4 border-y border-[rgba(245,240,232,0.05)]">
                                            <span className="text-[10px] font-mono uppercase text-[rgba(245,240,232,0.25)] tracking-widest">Intelligence Score</span>
                                            <span className={`text-xl font-bebas tracking-widest ${card.color}`}>{card.metric}</span>
                                        </div>
                                        <p className="text-[11px] font-mono leading-relaxed text-[rgba(245,240,232,0.4)] uppercase h-10 overflow-hidden tracking-wider">
                                            {card.reason}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 px-6 border-t border-[rgba(245,240,232,0.05)] bg-[#0d0d0d] flex justify-between items-center">
                                    <div className="flex-grow mr-6">
                                        <div className="w-full h-1 bg-[rgba(245,240,232,0.05)]">
                                            <div className={`h-full ${card.color.replace('text-', 'bg-')} opacity-60`} style={{ width: (60 + (i * 10)) + '%' }} />
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-[rgba(245,240,232,0.2)] group-hover:text-[#C9A84C] transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
