"use client"

import { Suspense, useMemo, use } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import PlayerCharts from "@/components/analytics/player-charts"
import { usePlayer, useMatchForm } from "@/lib/hooks"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"
import {
    formRating,
    impactScore,
    batterRating,
    bowlerRating,
    injuryRiskRating,
    boundaryPercentage,
    normalizeRadarStats
} from "@/lib/computed-stats"
import { Activity, ShieldAlert, Zap, TrendingUp, Info, Clock, AlertCircle } from "lucide-react"
import { PlayerRadarChart } from "@/components/player-radar"
import { InsightEngine } from "@/lib/insight-engine"

export default function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { data: playerData, loading: playerLoading, error: playerError, refetch } = usePlayer(id)
    const { data: formData, loading: formLoading } = useMatchForm(id)

    const player = playerData?.player

    // Compute metrics
    const computed = useMemo(() => {
        if (!player) return null

        const lastScores = formData?.form?.map((m: any) => m.runs) || []
        const form = formRating(lastScores)

        const stats = player.stats?.batting || {}
        const boundaryPct = boundaryPercentage(stats.fours || 0, stats.sixes || 0, stats.runs || 0)

        const impact = impactScore({
            sr: stats.sr || 0,
            avg: stats.avg || 0,
            boundaryPct,
            knockoutAvg: stats.knockoutAvg || stats.avg || 0,
            regularAvg: stats.avg || 0,
            leagueAvgSR: 135,
            leagueAvgAvg: 28,
            leagueAvgBoundaryPct: 15
        })

        const rating = player.role?.toLowerCase().includes("bat")
            ? batterRating({
                avg: stats.avg || 0,
                sr: stats.sr || 0,
                ppSRvsAvg: 1.1,
                deathSRvsAvg: 1.2,
                impact,
                fielding: 7
            })
            : bowlerRating({
                econVsAvg: (player.stats?.bowling?.econ || 8) / 8.5,
                sr: player.stats?.bowling?.sr || 24,
                deathEconVsAvg: 1.0,
                wicketsPerMatch: (player.stats?.bowling?.wickets || 0) / 14,
                dotBallPct: 35
            })

        const risk = injuryRiskRating(player.injuryHistory?.missed || 2, player.age || 25, !!player.injuryHistory)

        const radarData = normalizeRadarStats(
            player.stats?.batting || {},
            player.stats?.bowling || {},
            impact,
            7.5,
            3.2
        )

        const insights = InsightEngine.generatePlayerInsight(player, { ...computed, boundaryPct, impact })

        return { form, impact, rating, risk, boundaryPct, radarData, insights }
    }, [player, formData])

    if (playerLoading) return <div className="p-10"><LoadingSkeleton rows={10} label="Synthesizing Player Intelligence..." /></div>
    if (playerError) return <div className="p-10"><ErrorState message={playerError} onRetry={refetch} /></div>
    if (!player) return <div className="p-10 text-center font-mono text-[rgba(245,240,232,0.4)]">Player profile not found</div>

    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-8 border-b border-[rgba(245,240,232,0.08)]">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 bg-[#C9A84C]" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#C9A84C]">Personnel File // {player.team}</span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bebas tracking-tight text-[#F5F0E8] leading-none uppercase">{player.name}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono text-[rgba(245,240,232,0.6)] uppercase tracking-widest">
                        <span>Role: {player.role}</span>
                        <span className="text-[rgba(245,240,232,0.2)]">|</span>
                        <span>Origin: {player.nationality}</span>
                        <span className="text-[rgba(245,240,232,0.2)]">|</span>
                        <span>Age: {player.age} Years</span>
                    </div>
                </div>

                <div className="flex items-center gap-12 p-8 bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                    <div className="text-right space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Impact Index</div>
                        <div className="text-6xl font-bebas text-[#1DB954] leading-none">{computed?.impact}</div>
                    </div>
                    <div className="h-12 w-px bg-[rgba(245,240,232,0.1)]" />
                    <div className="text-right space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">22Y Rating</div>
                        <div className="text-7xl font-bebas text-[#C9A84C] leading-none">{computed?.rating}</div>
                    </div>
                </div>
            </div>

            {/* Tactical Briefing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Form Status", value: computed?.form.level, color: computed?.form.color, icon: Activity },
                    { label: "Boundary %", value: `${computed?.boundaryPct.toFixed(1)}%`, color: '#C9A84C', icon: Zap },
                    { label: "Injury Risk", value: computed?.risk.risk, color: computed?.risk.color, icon: ShieldAlert },
                    { label: "Data Integrity", value: "99.8%", color: 'rgba(245,240,232,0.6)', icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">{item.label}</span>
                            <div className="text-2xl font-bebas tracking-wider" style={{ color: item.color }}>{item.value}</div>
                        </div>
                        <item.icon className="h-5 w-5 opacity-20" />
                    </div>
                ))}
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full h-14 bg-[#111111] border border-[rgba(245,240,232,0.08)] rounded-none p-0">
                    {['overview', 'analytics', 'matchups', 'form'].map(tab => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="flex-1 h-full rounded-none font-mono text-[11px] uppercase tracking-widest text-[rgba(245,240,232,0.4)] data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#C9A84C] data-[state=active]:border-b-2 data-[state=active]:border-[#C9A84C] transition-all"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="mt-8 space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Batting Analytics */}
                            <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                                <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] bg-[#0D0D0D]">
                                    <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C9A84C]">Batting Profile Matrix</h4>
                                </div>
                                <div className="p-10">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
                                        {Object.entries(player.stats?.batting || {}).map(([key, val]: [any, any]) => (
                                            <div key={key} className="space-y-1 group">
                                                <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest group-hover:text-[#C9A84C] transition-colors">{key}</div>
                                                <div className="text-3xl font-bebas text-[#F5F0E8] tracking-widest">{val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bowling Analytics */}
                            <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                                <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] bg-[#0D0D0D]">
                                    <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C9A84C]">Bowling Profile Matrix</h4>
                                </div>
                                <div className="p-10">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
                                        {Object.entries(player.stats?.bowling || {}).map(([key, val]: [any, any]) => (
                                            <div key={key} className="space-y-1 group">
                                                <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest group-hover:text-[#C9A84C] transition-colors">{key}</div>
                                                <div className="text-3xl font-bebas text-[#F5F0E8] tracking-widest">{val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intelligence Report Card */}
                        <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] flex flex-col">
                            <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] bg-[#0D0D0D]">
                                <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C9A84C]">Tactical Briefing</h4>
                            </div>
                            <div className="p-8 space-y-10">
                                {computed?.radarData && <PlayerRadarChart stats={computed.radarData} />}
                                <div className="space-y-6">
                                    <div className="h-px w-full bg-[rgba(245,240,232,0.05)]" />
                                    <div className="space-y-5">
                                        {computed?.insights.map((insight: string, idx: number) => (
                                            <div key={idx} className="flex gap-4 group">
                                                <div className="mt-1.5 h-1.5 w-1.5 bg-[#C9A84C] group-hover:scale-150 transition-transform" />
                                                <p className="text-[11px] text-[rgba(245,240,232,0.6)] font-mono leading-relaxed uppercase tracking-wider">
                                                    {insight}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-8 animate-in fade-in duration-500">
                    <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-10">
                        <Suspense fallback={<div className="font-mono text-center py-20 uppercase tracking-[0.4em] text-[rgba(245,240,232,0.2)]">Global Feed Connection Active...</div>}>
                            <PlayerCharts playerId={id} />
                        </Suspense>
                    </div>
                </TabsContent>

                <TabsContent value="matchups" className="mt-8 animate-in fade-in duration-500">
                    <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                        <div className="p-6 border-b border-[rgba(245,240,232,0.05)] bg-[#0D0D0D]">
                            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C9A84C]">Performance in High-Stakes Intervals</h4>
                        </div>
                        <div className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { label: "Pressure Index", value: "7.8", badge: "CRITICAL", color: "#C0392B" },
                                    { label: "vs LHB Bias", value: "12%", badge: "NEUTRAL", color: "#F5F0E8" },
                                    { label: "Success Rate", value: "64%", badge: "OVER-PERFORM", color: "#1DB954" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-8 border border-[rgba(245,240,232,0.05)] bg-[#0D0D0D] text-center space-y-4">
                                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)]">{stat.label}</div>
                                        <div className="text-6xl font-bebas tracking-widest" style={{ color: stat.color }}>{stat.value}</div>
                                        <div className="inline-block px-3 py-1 border border-[rgba(245,240,232,0.1)] text-[10px] font-mono text-[rgba(245,240,232,0.6)] tracking-widest uppercase">
                                            {stat.badge}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="form" className="mt-8 animate-in fade-in duration-500">
                    <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                        <div className="p-6 border-b border-[rgba(245,240,232,0.05)] bg-[#0D0D0D]">
                            <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C9A84C]">Recent Match Intercepts</h4>
                        </div>
                        <div className="p-8">
                            {formLoading ? (
                                <LoadingSkeleton rows={5} />
                            ) : (
                                <div className="space-y-3">
                                    {formData?.form?.map((match: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-5 bg-[#0D0D0D] border border-[rgba(245,240,232,0.05)] group hover:border-[#C9A84C]/30 transition-all">
                                            <div className="flex items-center gap-10">
                                                <div className="font-mono text-[11px] uppercase tracking-widest text-[rgba(245,240,232,0.25)]">{match.date}</div>
                                                <div className="font-bebas text-xl text-[#F5F0E8] tracking-widest uppercase">{match.opponent}</div>
                                            </div>
                                            <div className={`font-bebas text-3xl tracking-widest ${match.runs > 40 ? 'text-[#1DB954]' : (match.runs > 20 ? 'text-[#C9A84C]' : 'text-[#C0392B]')}`}>
                                                {match.runs} <span className="text-[11px] font-mono opacity-50">({match.balls})</span>
                                            </div>
                                        </div>
                                    ))}
                                    {!formData?.form?.length && (
                                        <div className="text-center py-20 font-mono text-[11px] uppercase tracking-[0.4em] text-[rgba(245,240,232,0.2)]">
                                            No recent intercepts found in sectoral cache
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
