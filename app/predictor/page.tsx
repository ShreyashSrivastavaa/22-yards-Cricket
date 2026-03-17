"use client"

import { Calculator, Trophy, Info, Search, ListFilter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TournamentPredictorPage() {
    const standings = [
        { team: "CSK", matches: 10, won: 7, lost: 3, points: 14, nrr: "+0.650", prob: 98 },
        { team: "Kolkata Knight Riders", won: 6, lost: 4, points: 12, nrr: "+0.420", prob: 85 },
        { team: "Mumbai Indians", won: 5, lost: 5, points: 10, nrr: "-0.120", prob: 45 },
        { team: "RCB", won: 4, lost: 6, points: 8, nrr: "+0.110", prob: 22 },
        { team: "Gujarat Titans", won: 3, lost: 7, points: 6, nrr: "-0.850", prob: 5 },
    ]

    return (
        <div className="flex flex-col gap-8">
            {/* Header section... */}
            <div className="flex justify-between items-end gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bebas tracking-wider">Tournament Predictor</h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Real-time qualification scenarios & playoff probability models.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="font-mono text-[9px] uppercase px-3 py-1">Simulations Run: 10,000</Badge>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-muted-foreground/10 bg-muted/5 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xs font-mono uppercase tracking-widest">Qualication Probability Matrix</CardTitle>
                        </div>
                        <Calculator className="h-4 w-4 text-primary opacity-50" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-[11px] font-mono">
                                <thead className="bg-muted/20 border-y border-muted-foreground/10 text-[9px] uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Franchise</th>
                                        <th className="px-6 py-3 text-center">Pts</th>
                                        <th className="px-6 py-3 text-center">NRR</th>
                                        <th className="px-6 py-3 text-center">Remaining</th>
                                        <th className="px-6 py-3 text-right">Playoff Prob</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-muted-foreground/5">
                                    {standings.map((s, i) => (
                                        <tr key={i} className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4 font-bold">{s.team}</td>
                                            <td className="px-6 py-4 text-center">{s.points}</td>
                                            <td className="px-6 py-4 text-center text-primary">{s.nrr}</td>
                                            <td className="px-6 py-4 text-center text-muted-foreground">4 Matches</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <span className={s.prob > 50 ? "text-primary" : "text-muted-foreground"}>{s.prob}%</span>
                                                    <div className="w-16 h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${s.prob}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    {/* Sidebar stats... */}
                    <Card className="border-primary/20 bg-primary/5 shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono uppercase tracking-widest text-primary">Magic Numbers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded border border-primary/10 bg-primary/5 scale-95 origin-left">
                                <span className="text-[9px] font-mono uppercase text-muted-foreground">Qualification Threshold</span>
                                <div className="text-xl font-bold font-mono">16 Points</div>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                "CSK needs 1 win in their next 4 matches to mathematically guarantee a top 4 finish."
                            </p>
                            <div className="space-y-2 pt-2 border-t border-muted-foreground/10">
                                <div className="flex justify-between text-[9px] font-mono uppercase">
                                    <span className="text-muted-foreground">CSK Clinch Prob</span>
                                    <span className="text-primary">99.2%</span>
                                </div>
                                <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: "99.2%" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-muted-foreground/10 bg-muted/5 shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono uppercase tracking-widest">Scenario Simulator</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-[9px] text-muted-foreground">"What if RCB wins all their remaining games?"</p>
                            <div className="bg-muted/20 p-3 rounded-sm border border-muted-foreground/5">
                                <span className="text-[10px] font-bold font-mono text-primary uppercase">Scenario Alpha</span>
                                <p className="text-[10px] mt-1">RCB wins 4/4 matches → Playoff Prob climbs to <span className="text-primary font-bold">78%</span></p>
                            </div>
                            <button className="w-full text-[9px] font-mono uppercase py-2 bg-muted hover:bg-primary/20 border border-muted-foreground/10 transition-all">Launch Deep Simulator</button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
