"use client"

import { useState, useMemo } from "react"
import { usePlayers } from "@/lib/hooks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"
import { Search, Filter, ArrowUpDown, ChevronRight, User } from "lucide-react"
import Link from "next/link"

export default function PlayersPage() {
    const { data, loading, error, refetch } = usePlayers()
    const [search, setSearch] = useState("")
    const [teamFilter, setTeamFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")

    const filteredPlayers = useMemo(() => {
        if (!data?.players) return []
        return data.players.filter(p => {
            const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
            const matchesTeam = teamFilter === "all" || p.teamCode === teamFilter || p.teamName === teamFilter
            const matchesRole = roleFilter === "all" || p.role?.toLowerCase().includes(roleFilter.toLowerCase())
            return matchesSearch && matchesTeam && matchesRole
        })
    }, [data, search, teamFilter, roleFilter])

    if (loading) return <div className="p-10"><LoadingSkeleton rows={15} label="Synchronizing Global Player Registry..." /></div>
    if (error) return <div className="p-10"><ErrorState message={error} onRetry={refetch} /></div>

    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-[rgba(245,240,232,0.08)]">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-[#C9A84C]" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                            Personnel Registry
                        </span>
                    </div>
                    <h1 className="text-6xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                        Player <span className="text-[#C9A84C]">Database</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#1DB954]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">Records Detected: {data?.count || 0}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.3)] group-focus-within:text-[#C9A84C] transition-colors" />
                    <Input
                        placeholder="SEARCH PLAYER CODENAME..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-14 bg-[#111111] border-[rgba(245,240,232,0.08)] rounded-none text-[#F5F0E8] font-mono text-xs tracking-widest focus-visible:ring-[#C9A84C] focus-visible:border-[#C9A84C]"
                    />
                </div>

                <select
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    className="h-14 bg-[#111111] border border-[rgba(245,240,232,0.08)] px-4 text-[#F5F0E8] font-mono text-[10px] uppercase tracking-widest outline-none focus:border-[#C9A84C] appearance-none"
                >
                    <option value="all">ALL FRANCHISES</option>
                    <option value="MI">MUMBAI INDIANS</option>
                    <option value="CSK">CHENNAI SUPER KINGS</option>
                    <option value="RCB">ROYAL CHALLENGERS BENGALURU</option>
                    <option value="KKR">KOLKATA KNIGHT RIDERS</option>
                    <option value="GT">GUJARAT TITANS</option>
                </select>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-14 bg-[#111111] border border-[rgba(245,240,232,0.08)] px-4 text-[#F5F0E8] font-mono text-[10px] uppercase tracking-widest outline-none focus:border-[#C9A84C] appearance-none"
                >
                    <option value="all">ALL SPECIALIZATIONS</option>
                    <option value="bat">BATTER</option>
                    <option value="bowl">BOWLER</option>
                    <option value="all-rounder">ALL-ROUNDER</option>
                    <option value="wk">WICKETKEEPER</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0D0D0D] border-b border-[rgba(245,240,232,0.05)]">
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)] font-medium">Clearance / Codename</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)] font-medium">Franchise</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)] font-medium">Role</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)] font-medium text-right">Rating</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)] font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(245,240,232,0.03)]">
                            {filteredPlayers.map((player) => (
                                <tr key={player.id} className="group hover:bg-[rgba(201,168,76,0.02)] transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-[#0A0A0A] border border-[rgba(245,240,232,0.05)] flex items-center justify-center overflow-hidden">
                                                {player.image ? (
                                                    <img src={player.image} alt="" className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <User className="h-5 w-5 text-[rgba(245,240,232,0.1)]" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm font-bebas tracking-wide text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{player.name}</div>
                                                <div className="text-[9px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">ID: {player.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.6)]">
                                            {player.teamCode || player.teamName}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-2 py-1 bg-[rgba(245,240,232,0.03)] border border-[rgba(245,240,232,0.05)] text-[9px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.4)]">
                                            {player.role || "FIELD"}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="text-xl font-bebas text-[#C9A84C] tracking-widest">88.4</div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 rounded-none border border-transparent hover:border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.05)] group/btn" asChild>
                                            <Link href={`/players/${player.id}`} className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#C9A84C]">
                                                Intercept <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredPlayers.length === 0 && (
                <div className="py-40 text-center border border-dashed border-[rgba(245,240,232,0.08)] bg-[#111111]">
                    <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-[rgba(245,240,232,0.2)]">
                        No Analytical Intercepts Match Current Sector Constraints
                    </div>
                </div>
            )}
        </div>
    )
}
