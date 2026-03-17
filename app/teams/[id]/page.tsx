"use client"

import { Suspense, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamBalanceChart } from "@/components/analytics/team-charts"
import { BestXIList } from "@/components/analytics/best-xi-list"
import { Users, Target, Shield, Zap, TrendingUp } from "lucide-react"
import { useSquads } from "@/lib/hooks"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TeamAnalyticsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const { data: squadData, loading, error, refetch } = useSquads()

    const team = useMemo(() => {
        if (!squadData?.teams) return null
        return squadData.teams.find(t => t.id === id || t.shortName === id)
    }, [squadData, id])

    if (loading) return <div className="container mx-auto py-10"><LoadingSkeleton rows={10} label="Gathering Franchise Intel..." /></div>
    if (error) return <div className="container mx-auto py-10"><ErrorState message={error} onRetry={refetch} /></div>
    if (!team) return <div className="container mx-auto py-10 text-center font-mono text-muted-foreground uppercase">Franchise not found</div>

    const overseasCount = team.players?.filter((p: any) => p.nationality === "Overseas").length || 0
    const squadSize = team.players?.length || 0

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Team Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary pb-6 gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
                            <span className="text-3xl font-black text-primary italic">{team.name[0]}</span>
                        </div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">{team.name}</h1>
                            <div className="flex gap-4 mt-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                                <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Home: Bangalore</span>
                                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Squad: {squadSize}</span>
                                <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> {squadData?.source}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary leading-none">84</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Team Power</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-emerald-500 leading-none">88</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Batting</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-rose-500 leading-none">76</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Bowling</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Analytics Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Tabs defaultValue="squad" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 font-mono uppercase">
                            <TabsTrigger value="squad">Squad Depth</TabsTrigger>
                            <TabsTrigger value="balance">Team Balance</TabsTrigger>
                        </TabsList>

                        <TabsContent value="squad" className="mt-6">
                            <Card className="bg-muted/10 border-muted-foreground/10">
                                <CardHeader>
                                    <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-primary">— Confirmed Squad</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {team.players?.map((p: any) => (
                                            <Link key={p.id} href={`/players/${p.id}`}>
                                                <div className="group flex items-center justify-between p-3 rounded bg-muted/5 border border-muted-foreground/5 hover:border-primary/50 transition-all cursor-pointer">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold font-mono group-hover:text-primary transition-colors">{p.name}</span>
                                                        <span className="text-[9px] font-mono text-muted-foreground uppercase">{p.role}</span>
                                                    </div>
                                                    <Badge variant="outline" className={`text-[8px] font-mono uppercase ${p.nationality === 'Overseas' ? 'text-rose-500 border-rose-500/30' : 'text-emerald-500 border-emerald-500/30'}`}>
                                                        {p.nationality === 'Overseas' ? 'OS' : 'IND'}
                                                    </Badge>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="balance" className="mt-6 space-y-6">
                            <Card className="bg-muted/10 border-muted-foreground/10">
                                <CardHeader>
                                    <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Balance Matrix</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[400px]">
                                    <TeamBalanceChart />
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-muted/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs uppercase font-mono text-muted-foreground">Powerplay Efficiency</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-black text-emerald-500">8.4 RPO</div>
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">+12% vs League Avg</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs uppercase font-mono text-muted-foreground">Death Bowling Econ</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-black text-rose-500">11.2 RPO</div>
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">-8% vs League Avg</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar: Best XI */}
                <div className="space-y-6">
                    <Card className="border-primary/20 bg-primary/[0.02]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="font-mono text-sm uppercase leading-none">Best Playing XI</CardTitle>
                                <div className="text-[10px] font-mono text-muted-foreground uppercase">AI Recommended</div>
                            </div>
                            <Shield className="h-4 w-4 text-primary opacity-50" />
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div className="font-mono text-xs uppercase animate-pulse">Running Simulation...</div>}>
                                <BestXIList />
                            </Suspense>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/10 border-none">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-background/50 p-2 rounded border border-muted-foreground/10">
                                    <span className="text-[10px] font-mono uppercase text-muted-foreground">Overseas Limit</span>
                                    <span className="text-xs font-bold font-mono">{overseasCount} Players</span>
                                </div>
                                <div className="flex justify-between items-center bg-background/50 p-2 rounded border border-muted-foreground/10">
                                    <span className="text-[10px] font-mono uppercase text-muted-foreground">Avg. Match Experience</span>
                                    <span className="text-xs font-bold font-mono">142 Matches</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
