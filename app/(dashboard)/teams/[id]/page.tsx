"use client"

import { useParams } from "next/navigation"
import { IPL_TEAMS } from "@/lib/api-clients"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Trophy, Target } from "lucide-react"

export default function TeamProfilePage() {
    const params = useParams()
    const teamCode = params.id as string
    const team = IPL_TEAMS.find(t => t.code.toLowerCase() === teamCode.toLowerCase())

    if (!team) return <div>Team not found.</div>

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-primary/20 pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-primary/40 text-primary">Franchise Intelligence</Badge>
                        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: team.color }} />
                    </div>
                    <h1 className="text-6xl font-bebas tracking-wider leading-none">{team.name}</h1>
                    <div className="flex items-center gap-6 font-mono text-[10px] uppercase text-muted-foreground tracking-widest">
                        <span style={{ color: team.color }}>{team.code} Primary Node</span>
                        <span>|</span>
                        <span>IPL 2026 Cycle</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Squad Strength</div>
                        <div className="text-4xl font-black font-mono text-primary">92.4</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Impact Rank</div>
                        <div className="text-4xl font-black font-mono text-muted-foreground">#3</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Players", value: "25", icon: Users },
                    { label: "Win Probability", value: "54%", icon: TrendingUp },
                    { label: "Trophy Count", value: "5", icon: Trophy },
                    { label: "Scouting Targets", value: "3", icon: Target },
                ].map((kpi, idx) => (
                    <Card key={idx} className="bg-muted/5 border-muted-foreground/10 shadow-none">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2 rounded bg-primary/10">
                                <kpi.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-muted-foreground uppercase">{kpi.label}</div>
                                <div className="text-sm font-bold font-mono">{kpi.value}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-muted/5 border-muted-foreground/10 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xs font-mono uppercase tracking-[0.2em]">— Full Squad Roster</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-8 text-center border border-dashed border-muted-foreground/20 rounded-lg text-muted-foreground font-mono text-[10px] uppercase">
                        Sample Squad Data — Fetching from Cricbuzz RapidAPI...
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
