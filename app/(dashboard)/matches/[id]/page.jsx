"use client"

import { useParams } from "next/navigation"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MatchStoryTimeline } from "@/components/match-story"
import { useMatchDetails, useFetch } from "@/lib/hooks"
import { LoadingSkeleton } from "@/components/ui/data-states"
import { Zap, TrendingUp, ShieldCheck, AlertCircle, Loader2 } from "lucide-react"

export default function MatchIntelligencePage() {
    const params = useParams()
    const matchId = params.id

    const { data, loading, error } = useMatchDetails(matchId)
    const { data: storyData, loading: storyLoading } = useFetch(`/api/match-story?id=${matchId}`)

    const match = data?.match || {}
    const isLive = match.matchHeader?.state === "InProgress"

    // Probability data would ideally come from a real model.
    // Since we don't have one, we show an empty chart or a "Predictor Node Offline" message rather than mock data.
    const probabilityData = []

    return (
        <div className="flex flex-col gap-8">
            {loading ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Initializing Match Neural Net...</p>
                </div>
            ) : error || !match.matchHeader ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-center">
                    <AlertCircle className="h-10 w-10 text-rose-500/50" />
                    <div className="space-y-1">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{error || "Match Node Not Found"}</p>
                        <p className="text-[8px] font-mono text-muted-foreground/50 uppercase">Verify Match ID or API connectivity in Netlify</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/20 pb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-primary/40 text-primary">
                                    {isLive ? "Active Match Feed" : "Match Archive Node"}
                                </Badge>
                                {isLive && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                            </div>
                            <h1 className="text-6xl font-bebas tracking-wider leading-none">
                                {match.matchHeader?.team1?.shortName} vs {match.matchHeader?.team2?.shortName}
                            </h1>
                            <div className="flex items-center gap-6 font-mono text-[10px] uppercase text-muted-foreground tracking-widest">
                                <span>{match.matchHeader?.venueName}</span>
                                <span>|</span>
                                <span>{match.matchHeader?.seriesName}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Status</div>
                                <div className="text-2xl font-black font-mono text-primary uppercase">{match.matchHeader?.status}</div>
                            </div>
                        </div>
                    </div>

                    {/* Story Grid */}
                    <div className="grid gap-6 lg:grid-cols-7">
                        {/* Visual probability Chart */}
                        <div className="lg:col-span-4 space-y-6">
                            <Card className="border-muted-foreground/10 bg-muted/5 shadow-none overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="h-3 w-3 text-primary" /> Win Probability Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-[350px] p-6 pr-10">
                                    {probabilityData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={probabilityData}>
                                                <defs>
                                                    <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                                <XAxis
                                                    dataKey="over"
                                                    stroke="#64748b"
                                                    fontSize={10}
                                                />
                                                <YAxis
                                                    stroke="#64748b"
                                                    fontSize={10}
                                                    domain={[0, 100]}
                                                />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px', fontFamily: 'monospace' }}
                                                    itemStyle={{ color: '#2563eb' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="prob"
                                                    stroke="#2563eb"
                                                    fillOpacity={1}
                                                    fill="url(#colorProb)"
                                                    strokeWidth={3}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground border border-dashed border-muted-foreground/20 rounded-lg">
                                            <TrendingUp className="h-6 w-6 opacity-20" />
                                            <span className="text-[9px] font-mono uppercase tracking-widest">Predictor Node Offline for this sequence</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-emerald-500/5 border-emerald-500/10 shadow-none">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                        <div>
                                            <div className="text-[10px] font-mono text-muted-foreground uppercase">Data Node</div>
                                            <div className="text-sm font-bold font-mono">ENCRYPTED</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-rose-500/5 border-rose-500/10 shadow-none">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Zap className="h-5 w-5 text-rose-500" />
                                        <div>
                                            <div className="text-[10px] font-mono text-muted-foreground uppercase">Telemetry</div>
                                            <div className="text-sm font-bold font-mono">SYNCHRONIZED</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Match Story Timeline */}
                        <div className="lg:col-span-3 space-y-6">
                            <Card className="h-full border-muted-foreground/10 bg-muted/5 shadow-none overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-xs font-mono uppercase tracking-widest">— Match Narrative</CardTitle>
                                    <CardDescription className="text-[9px] font-mono uppercase">Deciphering key game-state oscillations.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {storyLoading ? (
                                        <LoadingSkeleton rows={5} label="Processing Match Nodes..." />
                                    ) : (
                                        <MatchStoryTimeline events={storyData?.events || []} />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
