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
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(245,240,232,0.08)]">
        <div>
          <h1 className="text-4xl md:text-5xl font-bebas tracking-tight uppercase text-[#F5F0E8]">Intelligence <span className="text-[#C9A84C]">Dashboard</span></h1>
          <p className="text-[rgba(245,240,232,0.6)] text-[11px] font-mono uppercase tracking-[0.2em] mt-1">Strategic Analytics & Ecosystem Overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-9 px-6 text-[11px] uppercase font-mono tracking-widest border-[rgba(245,240,232,0.1)] hover:bg-[#1A1A1A] rounded-none">Export CSV</Button>
          <Button size="sm" className="h-9 px-6 text-[11px] uppercase font-mono tracking-widest bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none">Refresh Nodes</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Franchise Nodes", value: IPL_TEAMS.length.toString(), sub: "Total IPL Teams", icon: Target },
          { title: "Live Feed", value: liveData?.batting?.length ? "ACTIVE" : "OFFLINE", sub: "Match Connectivity", icon: Trophy, isStatus: true },
          { title: "Data Integrity", value: "99.2%", sub: "Service Status", icon: TrendingUp },
          { title: "Scouting Vol", value: "1.2K+", sub: "Analyst Cycles", icon: Users },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-6 space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">
              <span>{stat.title}</span>
              <stat.icon className="h-3 w-3 opacity-30" />
            </div>
            <div className="space-y-1">
              <div className={`text-4xl font-bebas ${stat.isStatus ? (stat.value === 'ACTIVE' ? 'text-[#1DB954]' : 'text-[#C0392B]') : 'text-[#C9A84C]'}`}>
                {stat.value}
              </div>
              <p className="text-[10px] font-mono uppercase text-[rgba(245,240,232,0.4)] tracking-wider">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-4 bg-[#111111] border border-[rgba(245,240,232,0.08)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[rgba(245,240,232,0.05)]">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#C9A84C]">Tactical Probability Matrix</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] mt-1">Live Win Probabilities Across Active Cycles</p>
          </div>
          <div className="flex-grow min-h-[300px] flex items-center justify-center border-b border-dashed border-[rgba(245,240,232,0.1)] bg-[rgba(245,240,232,0.02)] m-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-10 w-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center animate-pulse">
                <TrendingUp className="h-4 w-4 text-[#C9A84C]" />
              </div>
              <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[rgba(245,240,232,0.4)]">
                Matrix Initializing...<br />
                <span className="text-[9px] opacity-50 mt-1 block">Requires Active Tactical Feed Connection</span>
              </span>
            </div>
          </div>
          <div className="p-4 px-6 flex justify-between items-center bg-[#0D0D0D]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)]">Master Node: IPL26_LIVE</span>
            <Button variant="ghost" className="h-8 text-[10px] uppercase font-mono tracking-widest text-[#C9A84C] hover:bg-[#1A1A1A] rounded-none" asChild>
              <a href="/matches">Intelligence Hub <ChevronRight className="ml-1 h-3 w-3" /></a>
            </Button>
          </div>
        </div>

        {/* Trending Intelligence */}
        <div className="lg:col-span-3 bg-[#111111] border border-[rgba(245,240,232,0.08)] flex flex-col">
          <div className="p-6 border-b border-[rgba(245,240,232,0.05)]">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#C9A84C]">High-Value Target Index</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.25)] mt-1">Top Scouting Assets Flagged by Strategic Models</p>
          </div>
          <div className="p-6 flex-grow">
            {trendingLoading ? (
              <div className="h-48 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C] opacity-50" />
              </div>
            ) : trendingError ? (
              <div className="h-48 flex flex-col items-center justify-center gap-3 text-center">
                <AlertCircle className="h-5 w-5 text-[#C0392B] opacity-50" />
                <p className="text-[10px] font-mono uppercase px-4 text-[rgba(245,240,232,0.4)]">{trendingError}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(trendingData?.trending || []).slice(0, 5).map((p: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-[rgba(245,240,232,0.05)] bg-[#0D0D0D] hover:bg-[#1A1A1A] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 border border-[rgba(201,168,76,0.2)] bg-[#0A0A0A] flex items-center justify-center text-[11px] font-bebas text-[#C9A84C]">
                        {p.name?.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-bebas text-[#F5F0E8] tracking-widest uppercase">{p.name}</div>
                        <div className="text-[10px] font-mono text-[rgba(245,240,232,0.4)] mt-0.5 uppercase tracking-wider">{p.team} Operational</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${p.trend === 'up' ? 'border-[#1DB954] text-[#1DB954] bg-[#1DB954]/5' :
                        p.trend === 'down' ? 'border-[#C0392B] text-[#C0392B] bg-[#C0392B]/5' : 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5'
                        }`}>
                        {p.trend === 'up' && '+'}
                        {p.trend === 'down' && '-'}
                        {p.delta}%
                      </span>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-[rgba(245,240,232,0.25)] hover:text-[#C9A84C] hover:bg-transparent" asChild>
                        <a href={`/players/${p.id}`}><ChevronRight className="h-4 w-4" /></a>
                      </Button>
                    </div>
                  </div>
                ))}
                {(!trendingData?.trending || trendingData.trending.length === 0) && (
                  <p className="text-center text-[10px] font-mono uppercase text-[rgba(245,240,232,0.25)] py-12">No tactical targets identified in current cycle.</p>
                )}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-[rgba(245,240,232,0.05)]">
            <Button variant="link" className="w-full text-[10px] font-mono uppercase tracking-[.25em] text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] h-8" asChild>
              <a href="/players">Access Strategic Vault</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
