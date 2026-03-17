"use client"

import {
  TrendingUp,
  Users,
  Trophy,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTrending, useLiveStats } from "@/lib/hooks"
import { IPL_TEAMS } from "@/lib/api-clients"

export default function DashboardPage() {
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useTrending()
  const { data: liveData } = useLiveStats()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bebas tracking-tight uppercase">INTELLIGENCE DASHBOARD</h1>
          <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest opacity-70">Strategic Analytics & Ecosystem Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-mono">Export CSV</Button>
          <Button size="sm" className="h-8 text-[10px] uppercase font-mono">Refresh Nodes</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Franchise Nodes", value: IPL_TEAMS.length.toString(), sub: "Total IPL Teams", icon: Target, trend: "none" },
          { title: "Live Feed", value: liveData?.batting?.length ? "ACTIVE" : "OFFLINE", sub: "Match Connectivity", icon: Trophy, trend: "none" },
          { title: "Data Integrity", value: "99.2%", sub: "Service Status", icon: TrendingUp, trend: "up" },
        ].map((stat, i) => (
          <Card key={i} className="border-muted-foreground/10 bg-muted/5 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-3 w-3 text-muted-foreground opacity-50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tighter">{stat.value}</div>
              <p className="flex items-center gap-1 text-[10px] font-medium mt-1">
                {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500" />}
                <span className="text-muted-foreground">{stat.sub}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <Card className="col-span-4 border-muted-foreground/10 bg-muted/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-xs font-mono uppercase tracking-widest">Global Win Probabilities</CardTitle>
            <CardDescription className="text-[10px]">Heuristic-based probability fluctuations across recent cycles.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed bg-muted/10 m-6 rounded-lg opacity-50">
            <div className="flex flex-col items-center gap-2 text-muted-foreground text-center">
              <TrendingUp className="h-6 w-6" />
              <span className="text-[10px] uppercase font-mono tracking-[0.2em]">Real-time Matrix<br /><span className="text-[8px] opacity-50 mt-1 block">Requires Active Match Feed Connection</span></span>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t border-muted-foreground/5 p-4 text-[10px] font-mono uppercase tracking-tight text-muted-foreground/60">
            <span>Core Node: IPL_2026_MASTER</span>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-mono hover:bg-muted" asChild>
              <a href="/matches">Live Intelligence <ChevronRight className="ml-1 h-3 w-3" /></a>
            </Button>
          </CardFooter>
        </Card>

        {/* Trending Intelligence */}
        <Card className="col-span-3 border-muted-foreground/10 bg-muted/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-primary">High-Value Target Index</CardTitle>
            <CardDescription className="text-[10px]">Top asset profiles flagged by scouting algorithms from live data.</CardDescription>
          </CardHeader>
          <CardContent>
            {trendingLoading ? (
              <div className="h-48 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary opacity-50" />
              </div>
            ) : trendingError ? (
              <div className="h-48 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                <AlertCircle className="h-5 w-5 text-rose-500/50" />
                <p className="text-[9px] font-mono uppercase px-4">{trendingError}</p>
                <p className="text-[8px] font-mono text-muted-foreground/50">Ensure RAPIDAPI_KEY is configured in Netlify</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(trendingData?.trending || []).slice(0, 5).map((p: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary border border-primary/20">
                        {p.name?.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none uppercase">{p.name}</div>
                        <div className="text-[9px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">{p.team} Operational</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border border-orange-500/50 text-orange-500">{p.trend}</span>
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0" asChild><a href={`/players/${p.id}`}><ChevronRight className="h-3 w-3" /></a></Button>
                    </div>
                  </div>
                ))}
                {(!trendingData?.trending || trendingData.trending.length === 0) && (
                  <p className="text-center text-[9px] font-mono uppercase text-muted-foreground py-8">No trending data identified in current cycle.</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-muted-foreground/5">
            <Button variant="link" size="sm" className="w-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary" asChild><a href="/players">Access Player Vault</a></Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
