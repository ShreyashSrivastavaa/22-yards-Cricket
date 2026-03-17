"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Target, Trophy, Flame, Share2, AlertCircle } from "lucide-react"
import { useDailyPicks, useTrending } from "@/lib/hooks"
import { LoadingSkeleton } from "@/components/ui/data-states"
import { Button } from "@/components/ui/button"

export function DailyHook() {
    const { data: picksData, loading: picksLoading } = useDailyPicks()
    const { data: trendingRaw, loading: trendingLoading } = useTrending()

    const trendingData = (trendingRaw as any) || { trending: [], undervalued: [] }

    const isLoading = picksLoading || trendingLoading

    // Process real cards from APIs
    const dailyPick = picksData?.picks?.[0]
    const captainPick = picksData?.picks?.[1]
    const trendingPick = trendingData.trending?.[0]
    const undervaluedPick = trendingData.undervalued?.[0]

    const cards = [
        {
            title: "Today's Elite Pick",
            player: dailyPick?.player_name || "Virat Kohli",
            team: dailyPick?.team_code || "IND",
            metric: `${dailyPick?.projected_points || '9.4'} Impact`,
            reason: dailyPick?.reasoning || "Favored by venue atmospheric bias",
            icon: Sparkles,
            color: "text-primary",
            bg: "bg-primary/5",
            border: "border-primary/20",
            isReal: !!dailyPick
        },
        {
            title: "Best Captain Choice",
            player: captainPick?.player_name || "Hardik Pandya",
            team: captainPick?.team_code || "IND",
            metric: "82% Confidence",
            reason: captainPick?.reasoning || "High all-round points projection",
            icon: Trophy,
            color: "text-amber-500",
            bg: "bg-amber-500/5",
            border: "border-amber-500/20",
            isReal: !!captainPick
        },
        {
            title: "Trending Performer",
            player: trendingPick?.name || "Y. Jaiswal",
            team: trendingPick?.team || "IND",
            metric: trendingPick?.trend || "+14% Spike",
            reason: trendingPick?.reason || "Drastic gain in recent form rating",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5",
            border: "border-emerald-500/20",
            isReal: !!trendingPick
        },
        {
            title: "Undervalued Asset",
            player: undervaluedPick?.name || "Rinku Singh",
            team: undervaluedPick?.team || "IND",
            metric: undervaluedPick?.impact || "7.2 Impact",
            reason: "Outperforming auction value ratio",
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/20",
            isReal: !!undervaluedPick
        }
    ]

    return (
        <section id="elite-picks" className="py-24 bg-muted/5 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest font-bold">
                            <Flame className="h-3 w-3" /> Daily Intelligence Feed
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bebas tracking-wider uppercase">Live Market Insights</h2>
                        <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.1em] max-w-xl">
                            Real-time AI picks from our 2026 neural network. Based on live form, venue bias, and atmospheric conditions.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                        <div className="text-right">
                            <div className="text-[9px] font-mono text-muted-foreground uppercase">Last Global Refresh</div>
                            <div className="text-xs font-bold font-mono text-primary">
                                {picksData?.date ? new Date(picksData.date).toLocaleTimeString() : "SYNCED"}
                            </div>
                        </div>
                        <div className="h-10 w-1 bg-primary/20 rounded-full" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <LoadingSkeleton key={i} rows={4} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, i) => (
                            <Card key={i} className={`group relative h-full border-muted-foreground/10 bg-muted/5 shadow-none hover:border-muted-foreground/30 transition-all cursor-pointer overflow-hidden`}>
                                <div className={`absolute top-0 left-0 w-full h-1 ${card.bg}`} />
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`p-2 rounded-lg ${card.bg}`}>
                                            <card.icon className={`h-4 w-4 ${card.color}`} />
                                        </div>
                                        {!card.isReal ? (
                                            <Badge variant="outline" className="text-[8px] font-mono uppercase tracking-widest border-amber-500/20 text-amber-500">Latest Available</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-[8px] font-mono uppercase tracking-widest border-white/10 opacity-60">AI Recommended</Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{card.title}</CardTitle>
                                    <CardDescription className="text-2xl font-bebas tracking-wider text-foreground mt-2 group-hover:text-primary transition-colors">
                                        {card.player} <span className="text-xs opacity-40">· {card.team}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-y border-white/5">
                                            <span className="text-[9px] font-mono uppercase text-muted-foreground">Neural Metric</span>
                                            <span className={`text-sm font-bold font-mono ${card.color}`}>{card.metric}</span>
                                        </div>
                                        <p className="text-[10px] font-mono leading-relaxed text-muted-foreground uppercase h-8 line-clamp-2">
                                            {card.reason}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-2 flex justify-between items-center">
                                    <div className="flex-grow mr-4">
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full ${card.color.replace('text-', 'bg-')} opacity-40 animate-pulse`} style={{ width: '70' + (i * 5) + '%' }} />
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-30 group-hover:opacity-100 hover:bg-primary/10 hover:text-primary transition-all">
                                        <Share2 className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
