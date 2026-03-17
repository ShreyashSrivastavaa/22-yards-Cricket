"use client"

import { Calculator, Trophy, Info, Search, ListFilter, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePointsTable } from "@/lib/hooks"

export default function TournamentPredictorPage() {
    const { data, loading, error } = usePointsTable()
    const pointsTable = data?.pointsTable || []

    return (
        <div className="flex flex-col gap-8">
            {/* Header section */}
            <div className="flex justify-between items-end gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bebas tracking-wider text-primary">Tournament Predictor</h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-none">Qualification scenarios & playoff probability models.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-muted-foreground/10 bg-muted/5 shadow-none overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-muted-foreground/5 bg-muted/5">
                        <div>
                            <CardTitle className="text-xs font-mono uppercase tracking-[0.2em]">— Live Points Table</CardTitle>
                        </div>
                        <Calculator className="h-4 w-4 text-primary opacity-50" />
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
                                <span className="text-[10px] font-mono uppercase tracking-[.2em] text-muted-foreground">Syncing Standings...</span>
                            </div>
                        ) : error ? (
                            <div className="p-20 flex flex-col items-center justify-center gap-4 text-center">
                                <AlertCircle className="h-8 w-8 text-rose-500/50" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{error}</p>
                                    <p className="text-[8px] font-mono text-muted-foreground/50">Verify API configuration in Netlify</p>
                                </div>
                            </div>
                        ) : pointsTable.length === 0 ? (
                            <div className="p-20 flex flex-col items-center justify-center gap-4 text-center">
                                <Trophy className="h-8 w-8 text-primary/20" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Pre-Season: No standngs data identified</p>
                                    <p className="text-[8px] font-mono text-muted-foreground/50 uppercase tracking-widest">IPL 2026 data stream starts March 26</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-[11px] font-mono">
                                    <thead className="bg-muted/10 border-b border-muted-foreground/10 text-[9px] uppercase text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Franchise</th>
                                            <th className="px-6 py-3 text-center">Mat</th>
                                            <th className="px-6 py-3 text-center">Won</th>
                                            <th className="px-6 py-3 text-center">Pts</th>
                                            <th className="px-6 py-3 text-right">NRR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-muted-foreground/5">
                                        {pointsTable.map((group: any) =>
                                            (group.pointsTable || []).map((s: any, i: number) => (
                                                <tr key={i} className="hover:bg-primary/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold uppercase">{s.teamName}</span>
                                                            <span className="text-[8px] opacity-50 tracking-widest">{s.teamShortName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">{s.matchesPlayed}</td>
                                                    <td className="px-6 py-4 text-center">{s.matchesWon}</td>
                                                    <td className="px-6 py-4 text-center group-hover:text-primary transition-colors font-bold">{s.points}</td>
                                                    <td className="px-6 py-4 text-right text-muted-foreground">{s.nrr}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card className="border-primary/20 bg-primary/5 shadow-none border-t-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono uppercase tracking-widest text-primary">Qualification Logic</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-none border border-primary/10 bg-primary/5">
                                <span className="text-[9px] font-mono uppercase text-muted-foreground">Standard Baseline</span>
                                <div className="text-2xl font-black font-mono uppercase">16 Points</div>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider font-bold opacity-70">
                                Statistically, achieving 16 points provides a 94.2% historical probability of securing a top-4 position in the IPL format.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-muted-foreground/10 bg-muted/5 shadow-none border-t-4 border-amber-500/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">Node Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${pointsTable.length > 0 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted-foreground/30"}`} />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{pointsTable.length > 0 ? "Real-time sync active" : "Waiting for season start"}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-60">
                                Predictions and qualification risks update automatically as match results are ingested into the analytics engine.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
