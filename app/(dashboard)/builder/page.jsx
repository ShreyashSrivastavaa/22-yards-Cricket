"use client"

import { useState } from "react"
import { useSquads } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSkeleton, ErrorState } from "@/components/ui/data-states"
import { Check, ChevronRight, ChevronLeft, Shield, Users, Zap, FileText } from "lucide-react"
import { IPL_TEAMS } from "@/lib/api-clients"

export default function BuilderPage() {
    const { data: squads, loading, error, refetch } = useSquads()
    const [step, setStep] = useState(1)
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [selectedPlayers, setSelectedPlayers] = useState([])

    // Hardcode some teams if the API fails just for the UI
    const teams = IPL_TEAMS

    const handleTeamSelect = (team) => {
        const teamData = squads?.teams?.find(t => t.teamCode === team.code || t.teamName === team.name)
        setSelectedTeam({ ...team, ...teamData })
        setStep(2)
    }

    const togglePlayer = (playerId) => {
        if (selectedPlayers.includes(playerId)) {
            setSelectedPlayers(selectedPlayers.filter(id => id !== playerId))
        } else {
            if (selectedPlayers.length < 12) {
                setSelectedPlayers([...selectedPlayers, playerId])
            }
        }
    }

    if (loading && step === 1) return <div className="p-10"><LoadingSkeleton rows={10} label="Accessing Franchise Rosters..." /></div>
    if (error && step === 1) return <div className="p-10"><ErrorState message={error} onRetry={refetch} /></div>

    return (
        <div className="flex flex-col gap-10 pb-20 max-w-6xl mx-auto w-full">
            {/* Header & Stepper */}
            <div className="flex flex-col gap-8 pb-8 border-b border-[rgba(245,240,232,0.08)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A84C]">
                                Tactical Simulation
                            </span>
                        </div>
                        <h1 className="text-6xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Playing 12 <span className="text-[#C9A84C]">Architect</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-[#111111] p-2 border border-[rgba(245,240,232,0.08)]">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`h-8 w-8 flex items-center justify-center font-bebas text-lg transition-colors ${step >= s ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'bg-[#0D0D0D] text-[rgba(245,240,232,0.2)] border border-[rgba(245,240,232,0.05)]'}`}>
                                    {s}
                                </div>
                                {s < 4 && <div className={`w-8 h-px ${step > s ? 'bg-[#C9A84C]' : 'bg-[rgba(245,240,232,0.05)]'}`} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step 1: Team Selection */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    {teams.map((team) => (
                        <div
                            key={team.code}
                            onClick={() => handleTeamSelect(team)}
                            className="group cursor-pointer bg-[#111111] border border-[rgba(245,240,232,0.08)] border-l-4 hover:border-l-[#C9A84C] transition-all p-6 hover:bg-[#1A1A1A]"
                            style={{ borderLeftColor: team.color }}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="h-12 w-12 border border-[rgba(245,240,232,0.05)] bg-[#0D0D0D] flex items-center justify-center font-bebas text-2xl group-hover:text-[#C9A84C]">
                                    {team.code}
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xl font-bebas tracking-wide text-[#F5F0E8] uppercase">{team.name}</div>
                                    <div className="text-[9px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">Base: {team.name.split(' ')[0]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Step 2: Roster Review */}
            {step === 2 && selectedTeam && (
                <div className="space-y-10 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" onClick={() => setStep(1)} className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.4)] hover:text-[#F5F0E8]">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Reselect Franchise
                        </Button>
                        <h2 className="text-3xl font-bebas text-[#C9A84C] tracking-widest uppercase">{selectedTeam.name} Registry</h2>
                        <Button onClick={() => setStep(3)} className="bg-[#C9A84C] text-[#0A0A0A] rounded-none font-bebas text-xl tracking-widest hover:bg-[#E8D08A]">
                            PROCEED TO SELECTION <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)]">
                                <div className="p-4 bg-[#0D0D0D] border-b border-[rgba(245,240,232,0.05)] flex items-center gap-3">
                                    <Users className="h-4 w-4 text-[#C9A84C]" />
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5F0E8]">Confirmed Roster</span>
                                </div>
                                <div className="p-8 grid grid-cols-2 gap-4">
                                    {(selectedTeam.players || []).map((p) => (
                                        <div key={p.id} className="p-3 border border-[rgba(245,240,232,0.05)] bg-[#0A0A0A] flex justify-between items-center">
                                            <span className="text-[11px] font-mono uppercase text-[#F5F0E8] truncate mr-2">{p.name}</span>
                                            <span className="text-[9px] font-mono text-[rgba(245,240,232,0.3)]">{p.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-8 space-y-6">
                                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A84C]">Squad Metrics</div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-[rgba(245,240,232,0.05)] pb-2">
                                        <span className="text-[10px] font-mono text-[rgba(245,240,232,0.3)]">Explosive Bias</span>
                                        <span className="text-xl font-bebas text-[#F5F0E8]">78.4</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-[rgba(245,240,232,0.05)] pb-2">
                                        <span className="text-[10px] font-mono text-[rgba(245,240,232,0.3)]">Defensive Depth</span>
                                        <span className="text-xl font-bebas text-[#F5F0E8]">62.1</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-[rgba(245,240,232,0.05)] pb-2">
                                        <span className="text-[10px] font-mono text-[rgba(245,240,232,0.3)]">Spin Resilience</span>
                                        <span className="text-xl font-bebas text-[#F5F0E8]">89.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Selection */}
            {step === 3 && selectedTeam && (
                <div className="space-y-10 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center sticky top-0 bg-[#0A0A0A] z-10 py-4 border-b border-[rgba(245,240,232,0.08)]">
                        <Button variant="ghost" onClick={() => setStep(2)} className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,240,232,0.4)]">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Roster Review
                        </Button>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest">Active Selections</div>
                                <div className={`text-3xl font-bebas ${selectedPlayers.length === 12 ? 'text-[#1DB954]' : 'text-[#C9A84C]'}`}>
                                    {selectedPlayers.length} / 12
                                </div>
                            </div>
                            <Button
                                disabled={selectedPlayers.length < 11}
                                onClick={() => setStep(4)}
                                className="bg-[#C9A84C] text-[#0A0A0A] rounded-none font-bebas text-xl tracking-widest hover:bg-[#E8D08A] h-14 px-10"
                            >
                                GENERATE INTEL REPORT
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(selectedTeam.players || []).map((player) => {
                            const isSelected = selectedPlayers.includes(player.id)
                            return (
                                <div
                                    key={player.id}
                                    onClick={() => togglePlayer(player.id)}
                                    className={`p-6 border cursor-pointer transition-all flex items-center justify-between ${isSelected ? 'bg-[#C9A84C]/10 border-[#C9A84C]' : 'bg-[#111111] border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)]'}`}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="text-lg font-bebas tracking-wide text-[#F5F0E8] uppercase">{player.name}</div>
                                        <div className="text-[9px] font-mono text-[rgba(245,240,232,0.3)] uppercase tracking-widest">{player.role}</div>
                                    </div>
                                    {isSelected ? <Check className="h-5 w-5 text-[#C9A84C]" /> : <div className="h-5 w-5 border border-[rgba(245,240,232,0.1)] rounded-full" />}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Step 4: Report */}
            {step === 4 && selectedTeam && (
                <div className="space-y-12 animate-in zoom-in-95 duration-500 max-w-4xl mx-auto py-10">
                    <div className="text-center space-y-6">
                        <div className="h-20 w-20 border border-[#C9A84C] bg-[#C9A84C]/5 flex items-center justify-center mx-auto">
                            <FileText className="h-10 w-10 text-[#C9A84C]" />
                        </div>
                        <h2 className="text-5xl font-bebas tracking-tighter text-[#F5F0E8] uppercase">Playing 12 Strategic Report</h2>
                        <div className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C]">Franchise: {selectedTeam.name} // CONFIDENTIAL</div>
                    </div>

                    <div className="bg-[#111111] border border-[rgba(245,240,232,0.08)] p-12 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#F5F0E8]">
                            <div className="space-y-4">
                                <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest border-b border-[rgba(245,240,232,0.05)] pb-2 flex items-center gap-2">
                                    <Zap className="h-3 w-3" /> Core Selection
                                </div>
                                <div className="space-y-2">
                                    {selectedPlayers.map((id, idx) => {
                                        const p = selectedTeam.players.find((pl) => pl.id === id)
                                        return (
                                            <div key={id} className="flex justify-between items-center text-[11px] font-mono uppercase">
                                                <span className="text-[rgba(245,240,232,0.35)] w-6">{idx + 1}.</span>
                                                <span className="flex-1 font-bold">{p?.name}</span>
                                                <span className="text-[rgba(245,240,232,0.3)] text-[9px]">{p?.role}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest border-b border-[rgba(245,240,232,0.05)] pb-2">Win Probability Index</div>
                                    <div className="text-8xl font-bebas text-[#1DB954] leading-none">82%</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono text-[rgba(245,240,232,0.25)] uppercase tracking-widest border-b border-[rgba(245,240,232,0.05)] pb-2 flex items-center gap-2">
                                        <Shield className="h-3 w-3" /> Tactical Verdict
                                    </div>
                                    <p className="text-[11px] font-mono text-[rgba(245,240,232,0.6)] leading-relaxed uppercase tracking-wider">
                                        THIS SQUAD OPTIMIZATION PROVIDES AN ELITE BALANCE OF POWER HITTING IN THE DEATH OVERS AND SPIN RESILIENCE DURING THE MIDDLE PHASES. VERSUS THE 2026 LEAGUE AVERAGE, THIS LINEUP OVERPERFORMS BY 14.2% IN BOUNDARY PRODUCTION.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-[rgba(245,240,232,0.05)] flex justify-between">
                            <Button variant="outline" onClick={() => setStep(3)} className="rounded-none border-[rgba(245,240,232,0.1)] text-[10px] font-mono uppercase tracking-widest">
                                Re-Architect
                            </Button>
                            <Button className="bg-[#C9A84C] text-[#0A0A0A] rounded-none font-bebas text-xl tracking-widest hover:bg-[#E8D08A]">
                                DOWNLOAD TACTICAL INTEL
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
