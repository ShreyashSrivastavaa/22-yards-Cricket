"use client"

import { useState, useMemo } from "react"
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
import { useFetch } from "@/lib/hooks"
import { LoadingSkeleton } from "@/components/ui/data-states"
import { Zap, TrendingUp, ShieldCheck } from "lucide-react"

export default function MatchIntelligencePage() {
    const params = useParams()
    const matchId = params.id as string

    const { data: storyData, loading: storyLoading } = useFetch<{ events: any[] }>(`/api/match-story?id=${matchId}`)

    const probabilityData = [
        { over: 0, prob: 50 },
        { over: 4, prob: 36 },
        { over: 8, prob: 40 },
        { over: 11, prob: 48 },
        { over: 14, prob: 30 },
        { over: 18, prob: 42 },
        { over: 20, prob: 55 },
    ]

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/20 pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-primary/40 text-primary">Live Match Intelligence</Badge>
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <h1 className="text-6xl font-bebas tracking-wider leading-none">MI vs CSK</h1>
                    <div className="flex items-center gap-6 font-mono text-[10px] uppercase text-muted-foreground tracking-widest">
                        <span>Wankhede Stadium</span>
                        <span>|</span>
                        <span>IPL 2026 Cycle</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Live Win Prob</div>
                        <div className="text-4xl font-black font-mono text-primary">55%</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Target Score</div>
                        <div className="text-4xl font-black font-mono text-muted-foreground">184</div>
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
                                        label={{ value: 'Overs', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={10}
                                        domain={[0, 100]}
                                        label={{ value: 'Win %', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
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
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-emerald-500/5 border-emerald-500/10 shadow-none">
                            <CardContent className="p-4 flex items-center gap-4">
                                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                <div>
                                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Batting Strength</div>
                                    <div className="text-sm font-bold font-mono">ELITE (+12.4%)</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-rose-500/5 border-rose-500/10 shadow-none">
                            <CardContent className="p-4 flex items-center gap-4">
                                <Zap className="h-5 w-5 text-rose-500" />
                                <div>
                                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Bowling Edge</div>
                                    <div className="text-sm font-bold font-mono">PAR (±2.1%)</div>
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
        </div>
    )
}
