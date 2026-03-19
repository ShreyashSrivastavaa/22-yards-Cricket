"use client"

import Link from "next/link"
import {
  TrendingUp,
  Users,
  Trophy,
  Target,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTrending, useLiveStats } from "@/lib/hooks"
import { IPL_TEAMS } from "@/lib/api-clients"

export default function DashboardPage() {
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useTrending()
  const { data: liveData } = useLiveStats()

  return (
    <div className="flex flex-col gap-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[rgba(201,168,76,0.15)] mt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-[#C9A84C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">Node Session Active</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bebas tracking-tight uppercase text-[#F5F0E8] leading-none">Central <span className="text-[#C9A84C]">Terminal</span></h1>
          <p className="text-[rgba(245,240,232,0.4)] text-[12px] font-mono uppercase tracking-[0.15em]">Institutional Intelligence Relay // Sector 4 Clear</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" className="h-12 px-8 text-[11px] uppercase font-mono tracking-[0.2em] border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[#C9A84C]/5 rounded-none font-bold">Protocol Export</Button>
          <Button size="lg" className="h-12 px-8 text-[11px] uppercase font-mono tracking-[0.2em] bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] rounded-none font-bold">Refresh Nodes</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Franchise Nodes", value: IPL_TEAMS.length.toString(), sub: "Total Franchise Units", icon: Target },
          { title: "Relay Status", value: liveData?.batting?.length ? "OPERATIONAL" : "DORMANT", sub: "Satellite Connectivity", icon: Trophy, isStatus: true },
          { title: "Data Integrity", value: "99.2%", sub: "Validation Ratio", icon: TrendingUp },
          { title: "Scouting Vol", value: "1,267", sub: "Unique Asset IDs", icon: Users },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-8 space-y-6 group hover:border-[#C9A84C]/40 transition-all duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)]">
              <span>{stat.title}</span>
              <stat.icon className="h-3 w-3 opacity-20 group-hover:text-[#C9A84C] group-hover:opacity-100 transition-all" />
            </div>
            <div className="space-y-2">
              <div className={`text-6xl font-bebas leading-none ${stat.isStatus ? (stat.value === 'OPERATIONAL' ? 'text-[#1DB954]' : 'text-[#C0392B]') : 'text-[#C9A84C]'}`}>
                {stat.value}
              </div>
              <p className="text-[11px] font-mono uppercase text-[rgba(245,240,232,0.4)] tracking-widest border-t border-[rgba(245,240,232,0.03)] pt-3">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-4 bg-[#111111] border border-[rgba(245,240,232,0.08)] overflow-hidden flex flex-col group hover:border-[#C9A84C]/20 transition-all">
          <div className="p-8 border-b border-[rgba(245,240,232,0.05)] bg-[#0d0d0d]">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#C9A84C] font-bold">Tactical Probability Matrix</h3>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)] mt-2">Live Probability Streams // Multidimensional Projections</p>
          </div>
          <div className="flex-grow min-h-[350px] flex items-center justify-center border-b border-dashed border-[rgba(245,240,232,0.05)] bg-[rgba(245,240,232,0.01)] m-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="h-12 w-12 border border-[rgba(201,168,76,0.3)] flex items-center justify-center animate-pulse">
                <TrendingUp className="h-5 w-5 text-[#C9A84C]" />
              </div>
              <span className="text-[12px] uppercase font-mono tracking-[0.3em] text-[rgba(245,240,232,0.5)]">
                Initializing Matrix Relay...<br />
                <span className="text-[10px] opacity-40 mt-2 block italic">Pending Active Sector Connection</span>
              </span>
            </div>
          </div>
          <div className="p-6 px-8 flex justify-between items-center bg-[#0D0D0D]">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.2)]">MASTER NODE: IPL26_LIVE_FEED</span>
            <Button variant="ghost" className="h-10 text-[11px] uppercase font-mono tracking-[0.2em] text-[#C9A84C] hover:bg-[#1A1A1A] rounded-none group-hover:pl-6 transition-all" asChild>
              <Link href="/matches">Intelligence Hub <ChevronRight className="ml-2 h-3 w-3" /></Link>
            </Button>
          </div>
        </div>

        {/* Trending Intelligence */}
        <div className="lg:col-span-3 bg-[#111111] border border-[rgba(245,240,232,0.08)] flex flex-col group hover:border-[#C9A84C]/20 transition-all">
          <div className="p-8 border-b border-[rgba(245,240,232,0.05)] bg-[#0d0d0d]">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[#C9A84C] font-bold">High-Value Target Index</h3>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.25)] mt-2">Asset Performance Flagging // Elite Volatility</p>
          </div>
          <div className="p-8 flex-grow">
            {trendingLoading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C] opacity-50" />
                <span className="text-[10px] font-mono uppercase text-[rgba(245,240,232,0.3)]">Decrypting Assets...</span>
              </div>
            ) : trendingError ? (
              <div className="h-64 flex flex-col items-center justify-center gap-4 text-center">
                <AlertCircle className="h-6 w-6 text-[#C0392B] opacity-50" />
                <p className="text-[11px] font-mono uppercase px-6 text-[rgba(245,240,232,0.4)] leading-relaxed tracking-widest">{trendingError}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(trendingData?.trending || []).slice(0, 6).map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-[rgba(245,240,232,0.03)] bg-[#0D0D0D] hover:bg-[#151515] transition-all group/item border-l-2 border-l-transparent hover:border-l-[#C9A84C]">
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 border border-[rgba(201,168,76,0.1)] bg-[#0A0A0A] flex items-center justify-center text-xs font-bebas text-[#C9A84C] group-hover/item:border-[#C9A84C]/40 transition-colors">
                        {p.name?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-base font-bebas text-[#F5F0E8] tracking-widest uppercase group-hover/item:text-[#C9A84C] transition-colors">{p.name}</div>
                        <div className="text-[9px] font-mono text-[rgba(245,240,232,0.3)] mt-0.5 uppercase tracking-widest">{p.team} {/* STABLE FLOW */}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${p.trend === 'up' ? 'border-[#1DB954]/30 text-[#1DB954] bg-[#1DB954]/5' :
                        p.trend === 'down' ? 'border-[#C0392B]/30 text-[#C0392B] bg-[#C0392B]/5' : 'border-[#C9A84C]/30 text-[#C9A84C] bg-[#C9A84C]/5'
                        }`}>
                        {p.trend === 'up' && '+'}
                        {(p.delta || 0)}%
                      </div>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-[rgba(245,240,232,0.1)] hover:text-[#C9A84C] hover:bg-transparent transition-all" asChild>
                        <Link href={`/players/${p.id}`}><ChevronRight className="h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                ))}
                {(!trendingData?.trending || trendingData.trending.length === 0) && (
                  <div className="flex flex-col items-center justify-center h-64 border border-dashed border-[rgba(245,240,232,0.05)]">
                    <p className="text-center text-[10px] font-mono uppercase text-[rgba(245,240,232,0.25)] tracking-widest">No Tactical Targets Detected</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-4 bg-[#0d0d0d] border-t border-[rgba(245,240,232,0.05)]">
            <Button variant="ghost" className="w-full text-[10px] font-mono uppercase tracking-[0.4em] text-[rgba(245,240,232,0.3)] hover:text-[#C9A84C] h-10 font-bold" asChild>
              <Link href="/players">Access Registry Vault</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
