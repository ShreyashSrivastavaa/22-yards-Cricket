"use client"

import { Suspense, useMemo, use } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
            leagueAvgSR: 135, // Static benchmarks for now
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

    if (playerLoading) return <div className="container mx-auto py-10"><LoadingSkeleton rows={10} label="Synthesizing Player Intelligence..." /></div>
    if (playerError) return <div className="container mx-auto py-10"><ErrorState message={playerError} onRetry={refetch} /></div>
    if (!player) return <div className="container mx-auto py-10 text-center font-mono text-muted-foreground">Player profile not found</div>

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary pb-6 gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-6xl font-black tracking-tighter uppercase">{player.name}</h1>
                        <Badge variant="outline" className="font-mono text-[10px] uppercase border-primary/30">
                            {computed?.risk.risk} Risk
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 font-mono text-sm text-muted-foreground uppercase">
                        <span>{player.role}</span>
                        <span>|</span>
                        <span>{player.team}</span>
                        <span>|</span>
                        <span>{player.nationality}</span>
                        <span>|</span>
                        <span>Age {player.age}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-4xl font-black text-emerald-500 leading-none">{computed?.impact}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Impact Score</div>
                    </div>
                    <div className="text-right">
                        <div className="text-6xl font-black text-primary leading-none">{computed?.rating}</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">22Y Rating</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-muted/5 border-muted-foreground/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded bg-emerald-500/10">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-muted-foreground uppercase">Form Status</div>
                            <div className="text-sm font-bold font-mono" style={{ color: computed?.form.color }}>
                                {computed?.form.level}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/5 border-muted-foreground/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded bg-amber-500/10">
                            <Zap className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-muted-foreground uppercase">Boundary %</div>
                            <div className="text-sm font-bold font-mono">{computed?.boundaryPct.toFixed(1)}%</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/5 border-muted-foreground/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded bg-rose-500/10">
                            <ShieldAlert className="h-4 w-4 text-rose-500" />
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-muted-foreground uppercase">Injury Risk</div>
                            <div className="text-sm font-bold font-mono" style={{ color: computed?.risk.color }}>
                                {computed?.risk.risk}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/5 border-muted-foreground/10">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded bg-primary/10">
                            <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <div className="text-[9px] font-mono text-muted-foreground uppercase">Data Source</div>
                            <div className="text-sm font-bold font-mono uppercase">{playerData?.source}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 font-mono uppercase">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="matchups">Matchups</TabsTrigger>
                    <TabsTrigger value="form">Form</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-muted/5 border-muted-foreground/10">
                                <CardHeader>
                                    <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-primary">— Batting Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-6">
                                        {Object.entries(player.stats?.batting || {}).map(([key, val]: [any, any]) => (
                                            <div key={key} className="text-center group">
                                                <div className="text-2xl font-black font-mono group-hover:text-primary transition-colors">{val}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/5 border-muted-foreground/10">
                                <CardHeader>
                                    <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-primary">— Bowling Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-6">
                                        {Object.entries(player.stats?.bowling || {}).map(([key, val]: [any, any]) => (
                                            <div key={key} className="text-center group">
                                                <div className="text-2xl font-black font-mono group-hover:text-primary transition-colors">{val}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-primary/5 border-primary/20 shadow-none">
                            <CardHeader>
                                <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-primary">— Insight Engine v1.0</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {computed?.radarData && <PlayerRadarChart stats={computed.radarData} />}
                                <div className="mt-4 pt-4 border-t border-primary/10 space-y-3">
                                    {computed?.insights.map((insight: string, idx: number) => (
                                        <div key={idx} className="flex gap-2">
                                            <AlertCircle className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                                            <p className="text-[10px] text-muted-foreground font-mono leading-relaxed uppercase">
                                                {insight}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-6">
                    <Suspense fallback={<div className="font-mono">Loading Data Visualization...</div>}>
                        <PlayerCharts playerId={id} />
                    </Suspense>
                </TabsContent>

                <TabsContent value="matchups" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-mono text-sm uppercase">— Performance in Critical Moments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="p-4 border border-muted-foreground/10 rounded-lg">
                                    <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Pressure Index</div>
                                    <div className="text-3xl font-black font-mono text-rose-500">7.8</div>
                                    <Badge className="mt-2 bg-rose-500">HIGH STAKES</Badge>
                                </div>
                                <div className="p-4 border border-muted-foreground/10 rounded-lg">
                                    <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">vs LHB/RHB Bias</div>
                                    <div className="text-3xl font-black font-mono text-emerald-500">12%</div>
                                    <Badge className="mt-2 bg-emerald-500">NEUTRAL</Badge>
                                </div>
                                <div className="p-4 border border-muted-foreground/10 rounded-lg">
                                    <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Success Rate</div>
                                    <div className="text-3xl font-black font-mono text-primary">64%</div>
                                    <Badge className="mt-2 bg-primary">ABOVE AVG</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="form" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-mono text-sm uppercase">— Recent Match Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {formLoading ? (
                                <LoadingSkeleton rows={5} />
                            ) : (
                                <div className="space-y-3">
                                    {formData?.form?.map((match: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/5 border border-muted-foreground/5">
                                            <div className="font-mono text-xs font-bold">{match.date}</div>
                                            <div className="font-mono text-xs">{match.opponent}</div>
                                            <div className={`font-mono font-black ${match.runs > 30 ? 'text-emerald-500' : 'text-primary'}`}>
                                                {match.runs} ({match.balls})
                                            </div>
                                        </div>
                                    ))}
                                    {!formData?.form?.length && (
                                        <div className="text-center py-6 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                                            No recent match data found in cache
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
