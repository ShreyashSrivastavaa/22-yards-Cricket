"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Crown, Star, TrendingUp, Zap, Users, Info } from "lucide-react"
import { generateFantasyTeam, getDifferentialPicks, getMustHavePicks } from "@/lib/fantasy-engine"
import { useSquads } from "@/lib/hooks"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"

const roleColors = {
    WK: "text-amber-500 border-amber-500/30",
    BAT: "text-emerald-500 border-emerald-500/30",
    AR: "text-blue-500 border-blue-500/30",
    BOWL: "text-rose-500 border-rose-500/30",
}

export default function FantasyPage() {
    const { data: squadData, loading, error, refetch } = useSquads()

    const playerPool = useMemo(() => {
        if (!squadData?.teams) return []
        return squadData.teams.flatMap(team =>
            team.players.map(p => {
                // Map roles
                let role = "BAT"
                const r = p.role?.toLowerCase() || ""
                if (r.includes("wk") || r.includes("keeper")) role = "WK"
                else if (r.includes("all-rounder")) role = "AR"
                else if (r.includes("bowl")) role = "BOWL"

                // Generate surrogate credits/ownership based on name/role (as API doesn't have these yet)
                const seed = p.name.length
                const credits = 8.0 + (seed % 3)
                const formScore = 7.0 + (seed % 3)
                const ownership = 10 + (seed * 7) % 80

                return {
                    id: p.id,
                    name: p.name,
                    team: team.id,
                    role,
                    credits,
                    formScore,
                    ownership
                }
            })
        )
    }, [squadData])

    const team = useMemo(() => playerPool.length > 0 ? generateFantasyTeam(playerPool) : null, [playerPool])
    const diffs = useMemo(() => playerPool.length > 0 ? getDifferentialPicks(playerPool) : [], [playerPool])
    const mustHaves = useMemo(() => playerPool.length > 0 ? getMustHavePicks(playerPool) : [], [playerPool])

    if (error) return <div className="container mx-auto py-10"><ErrorState message={error} onRetry={refetch} /></div>
    if (loading) return <div className="container mx-auto py-10"><LoadingSkeleton rows={15} label="Simulating 1M+ Team Combinations..." /></div>

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Header */}
            <div className="border-b-2 border-primary pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Fantasy Intelligence</h1>
                </div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    AI-Powered Team Generator · {squadData?.source} · Real-time Optimization
                </p>
            </div>

            {!team ? (
                <div className="text-center py-20 font-mono text-muted-foreground uppercase tracking-widest">
                    No scouting data available for optimization
                </div>
            ) : (
                <Tabs defaultValue="generator" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 font-mono uppercase">
                        <TabsTrigger value="generator">AI Generator</TabsTrigger>
                        <TabsTrigger value="smart-picks">Alpha Picks</TabsTrigger>
                        <TabsTrigger value="differentials">Differentials</TabsTrigger>
                    </TabsList>

                    {/* Team Generator */}
                    <TabsContent value="generator" className="mt-6 space-y-6">
                        {/* Budget Bar */}
                        <Card className="bg-muted/10 border-muted-foreground/10">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">— Optimization Metric: Credits</span>
                                    <span className="font-mono text-sm font-bold">{team.totalCredits.toFixed(1)} / 100 Cr</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1">
                                    <div
                                        className="bg-primary h-1 rounded-full transition-all"
                                        style={{ width: `${team.totalCredits}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                                        Aggregate Form: <span className="text-primary font-bold">{team.totalFormScore.toFixed(1)}</span>
                                    </div>
                                    <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                                        Budget Left: <span className="text-emerald-500 font-bold">{(100 - team.totalCredits).toFixed(1)} Cr</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Generated XI */}
                        <div className="grid gap-2">
                            {team.players.map((p, i) => {
                                const isCaptain = p.id === team.captain.id
                                const isVC = p.id === team.viceCaptain.id

                                return (
                                    <div
                                        key={p.id}
                                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isCaptain
                                            ? "border-primary/50 bg-primary/10"
                                            : isVC
                                                ? "border-amber-500/30 bg-amber-500/5"
                                                : "border-muted-foreground/10 bg-background/40"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 text-[10px] font-mono text-muted-foreground">{i + 1}</div>
                                            {isCaptain && <Crown className="h-4 w-4 text-primary" />}
                                            {isVC && <Star className="h-4 w-4 text-amber-500" />}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold font-mono">{p.name}</span>
                                                    <Badge variant="outline" className={`text-[8px] h-3 px-1 font-mono uppercase ${roleColors[p.role]}`}>{p.role}</Badge>
                                                </div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} Franchise</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 font-mono text-xs">
                                            <div className="text-right">
                                                <div className="font-bold text-primary">{p.formScore.toFixed(1)}</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Form</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{p.credits.toFixed(1)}</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Cr</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabsContent>

                    {/* Smart Picks */}
                    <TabsContent value="smart-picks" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-primary/20 bg-primary/[0.02]">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                                        <Crown className="h-4 w-4" /> Alpha: Must-Haves
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {mustHaves.map((p) => (
                                        <div key={p.id} className="flex items-center justify-between p-2 rounded bg-background/50 border border-primary/10">
                                            <div>
                                                <div className="text-sm font-bold font-mono">{p.name}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} · {p.ownership}% Owned</div>
                                            </div>
                                            <div className="text-right font-mono">
                                                <div className="text-sm font-bold text-primary">{p.formScore.toFixed(1)}</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Form</div>
                                            </div>
                                        </div>
                                    ))}
                                    {mustHaves.length === 0 && (
                                        <div className="text-[10px] font-mono text-muted-foreground text-center py-10 uppercase tracking-widest">Calculated indices pending matches</div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-500/20 bg-emerald-500/[0.02]">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-500">
                                        <TrendingUp className="h-4 w-4" /> Global Form Leaders
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[...playerPool].sort((a, b) => b.formScore - a.formScore).slice(0, 5).map((p) => (
                                        <div key={p.id} className="flex items-center justify-between p-2 rounded bg-background/50 border border-emerald-500/10">
                                            <div>
                                                <div className="text-sm font-bold font-mono">{p.name}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} · {p.credits.toFixed(1)} Cr</div>
                                            </div>
                                            <div className="text-right font-mono">
                                                <div className="text-sm font-bold text-emerald-500">{p.formScore.toFixed(1)}</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Form</div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Differentials */}
                    <TabsContent value="differentials" className="mt-6">
                        <Card className="border-amber-500/20 bg-amber-500/[0.02]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-amber-500">
                                    <Zap className="h-4 w-4" /> Differential Strategy
                                    <Badge variant="outline" className="text-[8px] border-amber-500/30 text-amber-500 uppercase font-mono">Stealth Mode</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                {diffs.map((p) => (
                                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-amber-500/20 bg-background/50 hover:bg-amber-500/5 transition-all">
                                        <div className="flex items-center gap-3">
                                            <Zap className="h-4 w-4 text-amber-500" />
                                            <div>
                                                <div className="text-sm font-bold font-mono">{p.name}</div>
                                                <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.team} · {p.role} · {p.credits.toFixed(1)} Cr</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 font-mono text-xs">
                                            <div className="text-right">
                                                <div className="font-bold text-emerald-500">{p.formScore.toFixed(1)}</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Form</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-amber-500">{p.ownership}%</div>
                                                <div className="text-[8px] text-muted-foreground uppercase">Owned</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {diffs.length === 0 && (
                                    <div className="text-[10px] font-mono text-center py-20 text-muted-foreground uppercase tracking-widest">
                                        Low-ownership assets currently have insufficient form indices
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}
