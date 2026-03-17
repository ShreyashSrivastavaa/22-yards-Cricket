"use client"

import { IPL_TEAMS } from "@/lib/api-clients"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Shield, Globe } from "lucide-react"

export default function TeamsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bebas tracking-wider uppercase leading-none">IPL Franchises</h1>
                <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em] opacity-70">Strategic Overview of all 10 Participating Teams</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {IPL_TEAMS.map((team) => (
                    <Card key={team.code} className="group overflow-hidden border-muted-foreground/10 bg-muted/5 hover:border-primary/50 transition-all border-l-[6px]" style={{ borderLeftColor: team.color }}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start mb-2">
                                <div className="h-10 w-10 flex items-center justify-center font-bebas text-2xl border border-muted-foreground/10 bg-muted/20">
                                    {team.code}
                                </div>
                                <Shield className="h-4 w-4 text-muted-foreground opacity-20" />
                            </div>
                            <CardTitle className="text-lg font-bebas tracking-wide uppercase group-hover:text-primary transition-colors">
                                {team.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 rounded border border-muted-foreground/5 bg-muted/10">
                                    <div className="text-[8px] font-mono text-muted-foreground uppercase">Squad Size</div>
                                    <div className="text-sm font-bold font-mono">25</div>
                                </div>
                                <div className="p-2 rounded border border-muted-foreground/5 bg-muted/10">
                                    <div className="text-[8px] font-mono text-muted-foreground uppercase">Overseas</div>
                                    <div className="text-sm font-bold font-mono">8/8</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">— Core Assets</div>
                                <div className="text-[10px] space-y-1">
                                    <div className="flex justify-between border-b border-muted-foreground/5 pb-1">
                                        <span>Virat Kohli</span>
                                        <span className="text-primary font-bold">IPL ICON</span>
                                    </div>
                                    <div className="flex justify-between border-b border-muted-foreground/5 pb-1">
                                        <span>Glenn Maxwell</span>
                                        <span className="text-emerald-500 font-bold">ALPHA</span>
                                    </div>
                                    <div className="flex justify-between border-b border-muted-foreground/5 pb-1">
                                        <span>Mohammed Siraj</span>
                                        <span className="text-rose-500 font-bold">ELITE</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" size="sm" className="w-full h-9 text-[10px] font-mono uppercase tracking-widest border-muted-foreground/10 hover:bg-primary hover:text-primary-foreground group" asChild>
                                <a href={`/teams/${team.code.toLowerCase()}`}>
                                    Squad Intelligence <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
