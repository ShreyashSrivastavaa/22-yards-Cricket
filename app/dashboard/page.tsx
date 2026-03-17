"use client"

import { useMemo } from "react"
import {
    TrendingUp,
    Users,
    ShieldCheck,
    Target,
    ChevronRight,
    Sparkles,
    BarChart3,
    Search,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSquads, useDailyPicks, useTrending } from "@/lib/hooks"
import { LoadingSkeleton, StatSkeleton } from "@/components/ui/data-states"
import Link from "next/link"

export default function DashboardPage() {
    const { data: squadData, loading: squadLoading } = useSquads()
    const { data: picksData, loading: picksLoading } = useDailyPicks()
    const { data: trendingRaw, loading: trendingLoading } = useTrending()

    // Safer casting to handle the actual response structure
    const trendingData = (trendingRaw as any) || { trending: [], undervalued: [] }

    const allPlayers = useMemo(() => {
        if (!squadData?.teams) return []
        return squadData.teams.flatMap(team =>
            (team.players || []).map((p: any) => ({
                ...p,
                teamName: team.teamName || team.name,
                teamCode: team.teamCode || team.id
            }))
        )
    }, [squadData])

    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-muted-foreground/10 pb-8">
                <div className="space-y-2">
                    <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-[0.2em] border-primary/40 text-primary px-3">Live Intelligence Active</Badge>
                    <h1 className="text-5xl font-bebas tracking-wider leading-none">Intelligence Feed</h1>
                    <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.15em] opacity-80">Next-gen analytical insights for the 2026 IPL ecosystem</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button size="sm" className="h-10 text-[10px] uppercase font-mono px-6 gap-2 bg-primary hover:bg-primary/90">
                        <Search className="h-3 w-3" /> Search Vault
                    </Button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {squadLoading ? <StatSkeleton count={4} /> : (
                    [
                        { title: "Vault Assets", value: allPlayers.length.toLocaleString(), sub: "Archived Profiles", icon: Users },
                        { title: "Franchise Sync", value: squadData?.teams?.length || "0", sub: "Live Squads", icon: ShieldCheck },
                        { title: "Ingestion Latency", value: "840ms", sub: "Edge Delivery", icon: Target },
                        { title: "Prediction Accuracy", value: "79.4%", sub: "AI Confidence", icon: TrendingUp },
                    ].map((stat, i) => (
                        <Card key={i} className="border-muted-foreground/10 bg-muted/5 shadow-none overflow-hidden relative group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold font-mono tracking-tighter">{stat.value}</div>
                                <p className="text-[9px] font-medium mt-1 uppercase font-mono tracking-wider text-muted-foreground">
                                    {stat.sub}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Elite Picks */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bebas tracking-widest uppercase">Today's Elite Picks</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {picksLoading ? <LoadingSkeleton rows={1} /> : (picksData?.picks || []).map((pick: any, i: number) => (
                        <Card key={i} className={`border-primary/20 bg-primary/5 shadow-none group hover:border-primary/50 transition-all ${i === 0 ? 'ring-1 ring-primary/20' : ''}`}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-10 rounded bg-primary/20 border border-primary/30 flex items-center justify-center font-bebas text-xl text-primary">
                                        {pick.team_code}
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] uppercase px-2 h-5">
                                        {pick.risk_level}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bebas tracking-wide mt-3 group-hover:text-primary transition-colors">{pick.player_name}</CardTitle>
                                <CardDescription className="text-[10px] font-mono leading-relaxed">{pick.reasoning}</CardDescription>
                            </CardHeader>
                            <CardFooter className="border-t border-primary/10 pt-4 flex justify-between items-center bg-primary/5">
                                <div className="text-[9px] font-mono uppercase text-muted-foreground">Projection</div>
                                <div className="text-xl font-bold font-mono text-primary">{pick.projected_points} <span className="text-[10px] opacity-70">PTS</span></div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Feed Rows */}
            <div className="grid gap-8 lg:grid-cols-7">
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bebas tracking-widest uppercase">Hot Assets (Trending)</h2>
                    </div>

                    <Card className="border-muted-foreground/10 bg-muted/5 shadow-none overflow-hidden">
                        <CardContent className="p-0">
                            <div className="divide-y divide-muted-foreground/5">
                                {trendingLoading ? <LoadingSkeleton rows={4} /> : (trendingData.trending || []).map((p: any, i: number) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <div>
                                                <div className="text-sm font-bold uppercase font-mono group-hover:text-primary transition-colors">{p.name}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} · {p.reason}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-right">
                                            <div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase leading-none">24h Spike</div>
                                                <div className="text-sm font-bold font-mono text-emerald-500">{p.trend}</div>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-30" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-blue-500" />
                        <h2 className="text-xl font-bebas tracking-widest uppercase text-blue-500">Undervalued Radar</h2>
                    </div>

                    <div className="grid gap-3">
                        {trendingLoading ? <LoadingSkeleton rows={3} /> : (trendingData.undervalued || []).map((p: any, i: number) => (
                            <Card key={i} className="border-blue-500/20 bg-blue-500/5 shadow-none group hover:bg-blue-500/10 transition-all cursor-pointer">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm font-bebas tracking-wider uppercase group-hover:text-blue-500 transition-colors">{p.name}</div>
                                            <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} · Impact Asset</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold font-mono text-blue-500">{p.impact}</div>
                                            <div className="text-[8px] font-mono text-muted-foreground uppercase opacity-60">Impact V.</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center pt-3 border-t border-blue-500/10">
                                        <Badge variant="outline" className="text-[8px] font-mono border-blue-500/20 text-blue-500 uppercase">Underpriced</Badge>
                                        <div className="text-xs font-bold font-mono text-blue-500">{p.value}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden relative">
                <CardContent className="p-8 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-3xl font-bebas tracking-widest">Unlock Deep Match Simulations</h3>
                            <p className="text-muted-foreground text-xs font-mono uppercase leading-relaxed max-w-lg">
                                Access the 22 Yards Predictor Pro feature set including ball-by-ball win probability shifts and venue-specific atmospheric bias.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Button className="h-10 text-[10px] uppercase font-mono px-8 bg-primary hover:bg-primary/90">Upgrade to PRO</Button>
                            </div>
                        </div>
                        <BarChart3 className="h-32 w-32 text-primary/10" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
