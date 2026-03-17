"use client"

import { useMatches } from "@/lib/hooks"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, AlertCircle, Calendar } from "lucide-react"

export default function MatchesListPage() {
    const { data: upcomingData, loading: upcomingLoading, error: upcomingError } = useMatches("upcoming")
    const { data: liveData, loading: liveLoading } = useMatches("live")

    const allMatches = [
        ...(liveData?.matches?.flatMap((t: any) => t.seriesMatches?.flatMap((s: any) => s.seriesAdWrapper?.matches || [])) || []),
        ...(upcomingData?.matches?.flatMap((t: any) => t.seriesMatches?.flatMap((s: any) => s.seriesAdWrapper?.matches || [])) || [])
    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bebas tracking-wider text-primary">Match Intelligence Nodes</h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-none">Global intercept: Live and upcoming fixtures across all sectors.</p>
                </div>
            </div>

            {(upcomingLoading || liveLoading) ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
                    <p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Scanning Global Feed...</p>
                </div>
            ) : upcomingError ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-center">
                    <AlertCircle className="h-8 w-8 text-rose-500/50" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{upcomingError}</p>
                </div>
            ) : allMatches.length === 0 ? (
                <Card className="border-muted-foreground/10 bg-muted/5 shadow-none p-12 text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">No fixtures identified in current spectrum.</p>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {allMatches.map((match: any) => (
                        <Card key={match.matchInfo.matchId} className="border-muted-foreground/10 bg-muted/5 shadow-none hover:border-primary/30 transition-all group overflow-hidden">
                            <CardHeader className="pb-2 border-b border-muted-foreground/5 mb-4">
                                <div className="flex justify-between items-center">
                                    <Badge variant="outline" className="text-[8px] font-mono border-primary/20 text-primary uppercase">{match.matchInfo.status}</Badge>
                                    <span className="text-[8px] font-mono text-muted-foreground uppercase">{match.matchInfo.matchFormat}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold uppercase">{match.matchInfo.team1.teamName}</span>
                                        <span className="text-[10px] font-mono opacity-50 uppercase">vs</span>
                                        <span className="text-sm font-bold uppercase text-right">{match.matchInfo.team2.teamName}</span>
                                    </div>
                                    <p className="text-[9px] font-mono text-muted-foreground uppercase text-center border-t border-muted-foreground/5 pt-2">
                                        {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
                                    </p>
                                </div>
                                <Button className="w-full h-8 text-[10px] uppercase font-mono tracking-widest group-hover:bg-primary transition-colors" asChild>
                                    <a href={`/matches/${match.matchInfo.matchId}`}>Access Intelligence <ChevronRight className="ml-2 h-3 w-3" /></a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
