"use client"

import { useMatches } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, AlertCircle, Calendar } from "lucide-react"

export default function MatchesListPage() {
    const { data, loading, error, refetch } = useMatches("2025")
    const allMatches = data?.matches || []

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(245,240,232,0.08)]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-bebas tracking-wider text-[#F5F0E8] uppercase">Match Intelligence <span className="text-[#C9A84C]">Nodes</span></h1>
                    <p className="text-[rgba(245,240,232,0.6)] font-mono text-[11px] uppercase tracking-[0.2em] leading-none">Global intercept: Live and upcoming fixtures across all sectors.</p>
                </div>
            </div>

            {(loading) ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C] opacity-50" />
                    <p className="font-mono text-[10px] uppercase tracking-[.25em] text-[rgba(245,240,232,0.4)]">Scanning Local Archive...</p>
                </div>
            ) : error ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-center">
                    <AlertCircle className="h-8 w-8 text-[#C0392B] opacity-50" />
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[rgba(245,240,232,0.4)]">{error}</p>
                </div>
            ) : allMatches.length === 0 ? (
                <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-20 text-center flex flex-col items-center gap-6">
                    <Calendar className="h-12 w-12 text-[rgba(245,240,232,0.1)]" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[rgba(245,240,232,0.4)]">No fixtures identified in current spectrum.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allMatches.map((match) => (
                        <div key={match.id} className="bg-[#111111] border border-[rgba(245,240,232,0.08)] hover:border-[#C9A84C]/40 transition-all group overflow-hidden flex flex-col">
                            <div className="p-4 px-6 border-b border-[rgba(245,240,232,0.05)] flex justify-between items-center bg-[#0D0D0D]">
                                <span className="text-[10px] font-mono px-2 py-0.5 border border-[rgba(201,168,76,0.3)] text-[#C9A84C] bg-[#C9A84C]/5 uppercase tracking-widest">
                                    {match.status}
                                </span>
                                <span className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">{match.seriesName}</span>
                            </div>
                            <div className="p-8 space-y-8 flex-grow">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">Home Sector</span>
                                            <span className="text-xl font-bebas text-[#F5F0E8] tracking-widest uppercase">{match.team1}</span>
                                        </div>
                                        <div className="h-px w-8 bg-[rgba(245,240,232,0.1)]" />
                                        <div className="flex flex-col gap-1 text-right">
                                            <span className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">Away Sector</span>
                                            <span className="text-xl font-bebas text-[#F5F0E8] tracking-widest uppercase">{match.team2}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-[rgba(245,240,232,0.05)]">
                                        <p className="text-[10px] font-mono text-[rgba(245,240,232,0.4)] uppercase text-center tracking-[.15em] leading-relaxed">
                                            {match.venueName}<br />
                                            <span className="text-[#C9A84C] opacity-60">{match.date}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full h-12 bg-[#0A0A0A] group-hover:bg-[#C9A84C] text-[rgba(245,240,232,0.4)] group-hover:text-[#0A0A0A] text-[11px] uppercase font-mono tracking-[.25em] rounded-none border-t border-[rgba(245,240,232,0.05)] transition-all" asChild>
                                <a href={`/matches/${match.id}`}>Access Intelligence <ChevronRight className="ml-2 h-3 w-3" /></a>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
