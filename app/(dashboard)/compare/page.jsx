"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, BarChart3, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { ComparisonRadar, ComparisonBars } from "@/components/analytics/comparison-charts"
import { usePlayers } from "@/lib/hooks"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"

function PlayerComparisonRow({ player, i, onRemove }) {
    const { data: stats, loading } = usePlayerStats(player.name)
    const color = ["#e11d48", "#2563eb", "#10b981"][i]

    return (
        <Badge
            variant="outline"
            className="px-3 py-1.5 text-sm font-mono gap-2"
            style={{ borderColor: color + "80", color: color }}
        >
            {player.name} · {player.teamCode || player.teamName}
            <button onClick={() => onRemove(player.id)} className="hover:opacity-70">
                <X className="h-3 w-3" />
            </button>
        </Badge>
    )
}

function StatCell({ player, metric }) {
    const { data: stats, loading } = usePlayerStats(player.name)
    if (loading) return <td className="text-center py-2 px-4 animate-pulse opacity-50">—</td>
    
    const val = stats?.[metric.category]?.[metric.key] || stats?.[metric.key]
    return (
        <td className="text-center py-2 px-4 font-bold text-[#F5F0E8]">
            {val || "—"}
        </td>
    )
}

import { useDebounce } from "@/hooks/useDebounce"
import { Loader2 } from "lucide-react"

export default function ComparePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearch = useDebounce(searchQuery, 400)
    const { data: searchData, loading, error } = usePlayers(debouncedSearch)
    const [selected, setSelected] = useState([])

    const isDebouncing = searchQuery !== debouncedSearch

    const filteredPool = useMemo(() => {
        if (!searchData?.players) return []
        return searchData.players.filter(p => !selected.find(s => s.id === p.id)).slice(0, 10)
    }, [searchData, selected])

    const addPlayer = (player) => {
        if (selected.length < 3) {
            setSelected([...selected, player])
            setSearchQuery("")
        }
    }

    const removePlayer = (id) => {
        setSelected(selected.filter(p => p.id !== id))
    }

    const compData = selected.map((p, i) => ({
        name: p.name,
        color: ["#e11d48", "#2563eb", "#10b981"][i],
        // Skills and phases will be defaulted as CSV doesn't have them
        skills: [80, 75, 85, 90, 70],
        phases: [70, 85, 90]
    }))

    if (error) return <div className="container mx-auto py-10"><ErrorState message={error.message || "An error occurred"} /></div>

    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Header */}
            <div className="border-b-2 border-primary pb-6">
                <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Data Explorer</h1>
                </div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Cross-Player Comparison · Side-by-Side Intelligence · Sources: Local JSON Engine
                </p>
            </div>

            {/* Player Selection */}
            <Card>
                <CardContent className="pt-6 space-y-4">
                    {/* Selected Players */}
                    <div className="flex flex-wrap gap-2">
                        {selected.map((p, i) => (
                            <PlayerComparisonRow key={p.id} player={p} i={i} onRemove={removePlayer} />
                        ))}
                        {selected.length === 0 && !loading && (
                            <span className="text-[10px] font-mono text-muted-foreground uppercase self-center opacity-50">
                                Search and add players to begin comparison matrix
                            </span>
                        )}
                        {selected.length > 0 && selected.length < 3 && (
                            <span className="text-[10px] font-mono text-muted-foreground uppercase self-center">
                                {3 - selected.length} slot{3 - selected.length > 1 ? "s" : ""} remaining
                            </span>
                        )}
                    </div>

                    {/* Search */}
                    {selected.length < 3 && (
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.3)] group-focus-within:text-[#e11d48]" />
                            <input
                                placeholder="ADD PLAYER TO MATRIX..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                disabled={loading}
                                className="pl-12 h-14 w-full bg-[#111111] border border-[rgba(245,240,232,0.08)] rounded-none text-[#F5F0E8] font-mono text-xs tracking-widest focus-visible:ring-[#e11d48] focus-visible:border-[#e11d48] outline-none"
                            />
                            {isDebouncing && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dropdown */}
                    {searchQuery && (
                        <div className="grid gap-1 max-h-48 overflow-y-auto border border-muted-foreground/10 p-2 rounded-lg bg-muted/5">
                            {filteredPool.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => addPlayer(p)}
                                    className="flex items-center justify-between p-2 rounded hover:bg-primary/10 transition-colors text-left group"
                                >
                                    <span className="text-sm font-mono font-bold group-hover:text-primary transition-colors">{p.name}</span>
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{p.teamName} · {p.role}</span>
                                </button>
                            ))}
                            {filteredPool.length === 0 && (
                                <div className="text-[10px] font-mono p-4 text-center text-muted-foreground uppercase tracking-widest">No matching players found</div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Comparison Content */}
            {selected.length >= 2 && (
                <div className="space-y-6">
                    {/* Stat Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Head-to-Head Base Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full font-mono text-sm">
                                    <thead>
                                        <tr className="border-b border-muted-foreground/10">
                                            <th className="text-left text-[10px] uppercase text-muted-foreground py-2 pr-4">Metric</th>
                                            {selected.map((p, i) => (
                                                <th key={p.id} className="text-center py-2 px-4" style={{ color: ["#e11d48", "#2563eb", "#10b981"][i] }}>
                                                    {p.name.split(" ").pop()}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { [
                                            { label: "Runs", key: "runs", category: "batting" },
                                            { label: "Strike Rate", key: "strikeRate", category: "batting" },
                                            { label: "Average", key: "average", category: "batting" },
                                            { label: "Wickets", key: "wickets", category: "bowling" },
                                            { label: "Economy", key: "economy", category: "bowling" },
                                            { label: "Fantasy Pts", key: "fantasyScore", category: null },
                                        ].map(metric => (
                                            <tr key={`${metric.category}-${metric.key}`} className="border-b border-muted-foreground/5">
                                                <td className="text-[10px] uppercase text-muted-foreground py-2 pr-4">{metric.label}</td>
                                                {selected.map((p, i) => (
                                                    <StatCell key={p.id} player={p} metric={metric} />
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ComparisonRadar players={compData} />
                        <ComparisonBars players={compData} />
                    </div>
                </div>
            )}

            {selected.length < 2 && !loading && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground font-mono gap-4 opacity-50">
                    <BarChart3 className="h-10 w-10 animate-pulse" />
                    <div className="text-sm uppercase tracking-[0.3em]">Comparison Engine Offline</div>
                    <div className="text-[10px]">SELECT AT LEAST 2 PROFILES TO ACTIVATE MATRIX</div>
                </div>
            )}

            {loading && <div className="py-20"><LoadingSkeleton rows={5} label="Synchronizing Global Playbook..." /></div>}
        </div>
    )
}
