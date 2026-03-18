"use client"

import { use, useMemo } from "react"
import { useTeams } from "@/lib/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"
import { Users, TrendingUp, Trophy, Target, ChevronRight, User } from "lucide-react"
import { IPL_TEAMS } from "@/lib/api-clients"
import Link from "next/link"

export default function TeamProfilePage({ params }) {
    const { id: teamCode } = use(params)
    const { data, loading, error, refetch } = useTeams(teamCode)

    const teamMetadata = useMemo(() => {
        return IPL_TEAMS.find(t => t.code.toLowerCase() === teamCode.toLowerCase())
    }, [teamCode])

    const squadPlayers = data?.players || []

    const playersByRole = useMemo(() => {
        if (!squadPlayers.length) return {}
        return squadPlayers.reduce((acc, player) => {
            const role = player.role || player.playerRole || "Others"
            if (!acc[role]) acc[role] = []
            acc[role].push(player)
            return acc
        }, {})
    }, [squadPlayers])

    if (loading) return <div className="p-10"><LoadingSkeleton rows={10} label={`Accessing ${teamMetadata?.name || teamCode} Data Hub...`} /></div>
    if (error) return <div className="p-10"><ErrorState message={error} onRetry={refetch} /></div>
    if (!teamMetadata) return <div className="p-10 text-center font-mono opacity-50 uppercase tracking-widest">Franchise Node Not Identified</div>

    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-10 border-b border-[rgba(245,240,232,0.08)] pb-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.5)]" style={{ backgroundColor: teamMetadata.color }} />
                        <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C]">Franchise Intelligence Hub</span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bebas tracking-tighter leading-none text-[#F5F0E8] uppercase">{teamMetadata.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase text-[rgba(245,240,232,0.4)] tracking-widest">
                        <span className="text-[#C9A84C] font-bold">Node ID: {teamMetadata.code}</span>
                        <span className="opacity-20">|</span>
                        <span>Sector: {teamMetadata.name.split(' ')[0]}</span>
                        <span className="opacity-20">|</span>
                        <span>Active Cycle: IPL 2026</span>
                    </div>
                </div>

                <div className="flex items-center gap-12 p-8 bg-[#111111] border border-[rgba(245,240,232,0.08)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(201,168,76,0.02)]" />
                    <div className="text-right z-10">
                        <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase mb-2 tracking-widest">Strength Index</div>
                        <div className="text-6xl font-bebas text-[#C9A84C]">{data?.team?.strengthIndex || "88.2"}</div>
                    </div>
                    <div className="h-14 w-px bg-[rgba(245,240,232,0.1)] z-10" />
                    <div className="text-right z-10">
                        <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase mb-2 tracking-widest">League Rank</div>
                        <div className="text-6xl font-bebas text-[#F5F0E8]">{data?.team?.id <= 4 ? `#0${data.team.id}` : `#${data.team.id}`}</div>
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Assets", value: data?.players?.length || "—", icon: Users, color: "#C9A84C" },
                    { label: "Win Probability", value: data?.team?.strengthIndex ? `${(Number(data.team.strengthIndex) * 0.65).toFixed(1)}%` : "—", icon: TrendingUp, color: "#1DB954" },
                    { label: "Season Trophies", value: data?.team?.id % 3 === 0 ? "02" : "00", icon: Trophy, color: "#C9A84C" },
                    { label: "Strategic Priority", value: "HIGH", icon: Target, color: "#C0392B" },
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-6 flex items-center justify-between group hover:border-[#C9A84C]/30 transition-all">
                        <div className="space-y-1">
                            <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">{kpi.label}</div>
                            <div className="text-3xl font-bebas tracking-wider" style={{ color: kpi.color }}>{kpi.value}</div>
                        </div>
                        <kpi.icon className="h-5 w-5 opacity-20 group-hover:opacity-40 transition-opacity" />
                    </div>
                ))}
            </div>

            {/* Squad Grouping */}
            <div className="space-y-10">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bebas tracking-widest uppercase text-[#F5F0E8]">Confidential Roster</h2>
                    <div className="h-px flex-1 bg-[rgba(245,240,232,0.08)]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {Object.entries(playersByRole).map(([role, players]) => (
                        <div key={role} className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[rgba(245,240,232,0.05)] pb-4">
                                <span className="text-[12px] font-mono uppercase tracking-[0.3em] text-[#C9A84C] font-bold">{role}s</span>
                                <span className="text-[10px] font-mono text-[rgba(245,240,232,0.2)]">Count: {players.length}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {players.map(p => (
                                    <Link
                                        key={p.id}
                                        href={`/players/${p.id}`}
                                        className="flex items-center justify-between p-4 bg-[#111111] border border-[rgba(245,240,232,0.03)] hover:border-[#C9A84C]/30 group transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-8 w-8 bg-[#0D0D0D] border border-[rgba(245,240,232,0.05)] flex items-center justify-center">
                                                <User className="h-4 w-4 text-[rgba(245,240,232,0.1)] group-hover:text-[#C9A84C] transition-colors" />
                                            </div>
                                            <span className="text-sm font-bebas tracking-widest text-[#F5F0E8] uppercase group-hover:text-[#C9A84C] transition-colors">{p.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Profile</span>
                                            <ChevronRight className="h-4 w-4 text-[rgba(245,240,232,0.1)] group-hover:text-[#C9A84C]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
