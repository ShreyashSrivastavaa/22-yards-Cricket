"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Swords, TrendingUp, Target, Zap, Search } from "lucide-react"
import MatchupHeatmap from "@/components/analytics/matchup-heatmap"
import { useSquads, usePlayer } from "@/lib/hooks"
import { LoadingSkeleton, ErrorState, StatSkeleton } from "@/components/ui/data-states"
import { Input } from "@/components/ui/input"

export default function MatchupsPage() {
    const { data: squadData, loading: squadsLoading, error: squadsError, refetch: refetchSquads } = useSquads()

    // Flatten all players for selection
    const allPlayers = useMemo(() => {
        if (!squadData?.teams) return []
        return squadData.teams.flatMap(team =>
            team.players.map(p => ({ ...p, teamName: team.name, teamCode: team.id }))
        )
    }, [squadData])

    const battersPool = useMemo(() =>
        allPlayers.filter(p => p.role?.toLowerCase().includes("bat") || p.role?.toLowerCase().includes("all-rounder"))
        , [allPlayers])

    const bowlersPool = useMemo(() =>
        allPlayers.filter(p => p.role?.toLowerCase().includes("bowl") || p.role?.toLowerCase().includes("all-rounder"))
        , [allPlayers])

    const [selectedBatterId, setSelectedBatterId] = useState("")
    const [selectedBowlerId, setSelectedBowlerId] = useState("")
    const [searchBatter, setSearchBatter] = useState("")
    const [searchBowler, setSearchBowler] = useState("")

    // Set defaults when data loads
    useEffect(() => {
        if (battersPool.length && !selectedBatterId) setSelectedBatterId(battersPool[0].id)
        if (bowlersPool.length && !selectedBowlerId) setSelectedBowlerId(bowlersPool[0].id)
    }, [battersPool, bowlersPool, selectedBatterId, selectedBowlerId])

    const { data: batterData, loading: batterLoading } = usePlayer(selectedBatterId)
    const { data: bowlerData, loading: bowlerLoading } = usePlayer(selectedBowlerId)

    const filteredBatters = battersPool.filter(p => p.name.toLowerCase().includes(searchBatter.toLowerCase())).slice(0, 5)
    const filteredBowlers = bowlersPool.filter(p => p.name.toLowerCase().includes(searchBowler.toLowerCase())).slice(0, 5)

    const selectedBatter = batterData?.player || battersPool.find(p => p.id === selectedBatterId)
    const selectedBowler = bowlerData?.player || bowlersPool.find(p => p.id === selectedBowlerId)

    if (squadsError) return <ErrorState message={squadsError} onRetry={refetchSquads} />

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Header */}
            <div className="border-b-2 border-primary pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Swords className="h-6 w-6 text-primary" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Matchups Engine</h1>
                </div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Live Intelligence · {squadData?.source || "Real-time Stats"} · Batter vs Bowler Analysis
                </p>
            </div>

            {/* Selector Row */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* Batter Selector */}
                <Card className="border-emerald-500/20 bg-emerald-500/[0.02]">
                    <CardHeader className="pb-2">
                        <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-emerald-500 flex justify-between items-center">
                            <span>— Select Batter</span>
                            <div className="relative w-32">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                <Input
                                    value={searchBatter}
                                    onChange={(e) => setSearchBatter(e.target.value)}
                                    placeholder="Search..."
                                    className="h-6 pl-7 text-[10px] bg-background/50 border-emerald-500/20"
                                />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar">
                        {squadsLoading ? <LoadingSkeleton rows={5} /> : (
                            filteredBatters.map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => setSelectedBatterId(b.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${selectedBatterId === b.id
                                        ? "border-emerald-500/50 bg-emerald-500/10"
                                        : "border-muted-foreground/10 hover:border-emerald-500/30"
                                        }`}
                                >
                                    <div className="text-left">
                                        <div className="text-sm font-bold font-mono">{b.name}</div>
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">{b.teamName || b.teamCode}</div>
                                    </div>
                                    <div className="text-right font-mono text-xs">
                                        <div className="text-emerald-500 font-bold">{b.role}</div>
                                    </div>
                                </button>
                            ))
                        )}
                        {filteredBatters.length === 0 && !squadsLoading && (
                            <div className="text-[10px] font-mono text-center text-muted-foreground py-4">No batters found</div>
                        )}
                    </CardContent>
                </Card>

                {/* VS Badge */}
                <div className="hidden md:flex flex-col items-center gap-2">
                    <div className="h-20 w-20 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
                        <span className="text-2xl font-black text-primary italic">VS</span>
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Live H2H</div>
                </div>

                {/* Bowler Selector */}
                <Card className="border-rose-500/20 bg-rose-500/[0.02]">
                    <CardHeader className="pb-2">
                        <CardTitle className="font-mono text-[10px] uppercase tracking-widest text-rose-500 flex justify-between items-center">
                            <span>— Select Bowler</span>
                            <div className="relative w-32">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                <Input
                                    value={searchBowler}
                                    onChange={(e) => setSearchBowler(e.target.value)}
                                    placeholder="Search..."
                                    className="h-6 pl-7 text-[10px] bg-background/50 border-rose-500/20"
                                />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar">
                        {squadsLoading ? <LoadingSkeleton rows={5} /> : (
                            filteredBowlers.map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => setSelectedBowlerId(b.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${selectedBowlerId === b.id
                                        ? "border-rose-500/50 bg-rose-500/10"
                                        : "border-muted-foreground/10 hover:border-rose-500/30"
                                        }`}
                                >
                                    <div className="text-left">
                                        <div className="text-sm font-bold font-mono">{b.name}</div>
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">{b.teamName || b.teamCode}</div>
                                    </div>
                                    <div className="text-right font-mono text-xs">
                                        <div className="text-rose-500 font-bold">{b.role}</div>
                                    </div>
                                </button>
                            ))
                        )}
                        {filteredBowlers.length === 0 && !squadsLoading && (
                            <div className="text-[10px] font-mono text-center text-muted-foreground py-4">No bowlers found</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* H2H Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {batterLoading || bowlerLoading ? (
                    <div className="col-span-full"><StatSkeleton count={5} /></div>
                ) : (
                    [
                        { label: "B-Avg", value: selectedBatter?.stats?.batting?.avg || "-", icon: TrendingUp, color: "text-emerald-500" },
                        { label: "B-SR", value: selectedBatter?.stats?.batting?.sr || "-", icon: Target, color: "text-emerald-500" },
                        { label: "Econ", value: selectedBowler?.stats?.bowling?.econ || "-", icon: Zap, color: "text-rose-500" },
                        { label: "Wkts", value: selectedBowler?.stats?.bowling?.wickets || "-", icon: Target, color: "text-rose-500" },
                        { label: "Predicted H2H", value: "DYNAMIC", icon: Zap, color: "text-primary text-xs" },
                    ].map((stat) => (
                        <Card key={stat.label} className="bg-muted/10 border-muted-foreground/10">
                            <CardContent className="pt-4 text-center">
                                <stat.icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                                <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Heatmap */}
            <Tabs defaultValue="zones" className="w-full">
                <TabsList className="grid w-full grid-cols-2 font-mono uppercase">
                    <TabsTrigger value="zones">Zone Heatmap</TabsTrigger>
                    <TabsTrigger value="phases">Phase Breakdown</TabsTrigger>
                </TabsList>

                <TabsContent value="zones" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-mono text-sm uppercase text-muted-foreground">
                                — {selectedBatter?.name || "Player"} vs {selectedBowler?.name || "Player"} · Zone Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MatchupHeatmap batterId={selectedBatterId} bowlerId={selectedBowlerId} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="phases" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Phase-wise Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { phase: "Powerplay", sr: selectedBatter?.stats?.phases?.powerplay?.sr || "120.0", dismissals: 0 },
                                    { phase: "Middle", sr: selectedBatter?.stats?.phases?.middle?.sr || "115.0", dismissals: 1 },
                                    { phase: "Death", sr: selectedBatter?.stats?.phases?.death?.sr || "160.0", dismissals: 1 },
                                ].map((p) => (
                                    <div key={p.phase} className="text-center p-4 rounded-lg bg-muted/10 border border-muted-foreground/10">
                                        <div className="text-[10px] font-mono uppercase text-muted-foreground mb-2">{p.phase}</div>
                                        <div className="text-2xl font-black font-mono text-primary">{p.sr}</div>
                                        <div className="text-[9px] font-mono text-muted-foreground uppercase">SR</div>
                                        <Badge variant="outline" className="mt-2 text-[8px]">{p.dismissals} Dismissal{p.dismissals !== 1 ? "s" : ""}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
