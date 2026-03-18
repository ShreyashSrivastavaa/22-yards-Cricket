"use client"

import { Card } from "@/components/ui/card"

// Mock zone data: 3x3 grid representing batting zones
// Each cell has SR (strike rate) and a risk level
const generateZoneData = (batterId, bowlerId) => {
    // Seeded pseudo-random based on IDs for consistent mock data
    const seed = (batterId + bowlerId).length
    return [
        // Row 1: Short length
        [
            { sr: 85 + seed * 2, balls: 8, label: "Short / Off" },
            { sr: 142 + seed, balls: 12, label: "Short / Stumps" },
            { sr: 110 - seed, balls: 6, label: "Short / Leg" },
        ],
        // Row 2: Good length
        [
            { sr: 95 + seed, balls: 18, label: "Good / Off" },
            { sr: 72 - seed, balls: 22, label: "Good / Stumps" },
            { sr: 128 + seed * 2, balls: 10, label: "Good / Leg" },
        ],
        // Row 3: Full length
        [
            { sr: 155 + seed, balls: 14, label: "Full / Off" },
            { sr: 168 - seed, balls: 8, label: "Full / Stumps" },
            { sr: 190 + seed, balls: 4, label: "Full / Leg" },
        ],
    ]
}

const getHeatColor = (sr) => {
    if (sr >= 170) return "bg-emerald-500/80 text-white"
    if (sr >= 140) return "bg-emerald-500/50 text-white"
    if (sr >= 110) return "bg-amber-500/50 text-white"
    if (sr >= 80) return "bg-rose-500/40 text-white"
    return "bg-rose-500/70 text-white"
}

const getRiskLabel = (sr) => {
    if (sr >= 170) return "DOMINANT"
    if (sr >= 140) return "STRONG"
    if (sr >= 110) return "NEUTRAL"
    if (sr >= 80) return "WEAK"
    return "DANGER"
}

export default function MatchupHeatmap({ batterId, bowlerId }) {
    const zones = generateZoneData(batterId, bowlerId)

    return (
        <div className="space-y-4">
            {/* Axis Labels */}
            <div className="flex items-center justify-between px-2">
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">← Outside Off</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Stumps</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Down Leg →</div>
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-cols-3 gap-2">
                {zones.flat().map((zone, i) => (
                    <div
                        key={i}
                        className={`relative rounded-lg p-4 ${getHeatColor(zone.sr)} transition-all hover:scale-105 cursor-default`}
                    >
                        <div className="text-center">
                            <div className="text-2xl font-black font-mono leading-none">{zone.sr}</div>
                            <div className="text-[9px] font-mono uppercase tracking-wider opacity-80 mt-1">SR</div>
                            <div className="mt-2 text-[8px] font-mono font-bold uppercase tracking-widest opacity-70">
                                {getRiskLabel(zone.sr)}
                            </div>
                            <div className="mt-1 text-[8px] font-mono opacity-60">{zone.balls} balls</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Length Labels */}
            <div className="flex flex-col gap-1 pl-2">
                {["Short", "Good Length", "Full / Yorker"].map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-muted-foreground" : i === 1 ? "bg-amber-500" : "bg-emerald-500"}`} />
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">{label}</span>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-muted-foreground/10">
                {[
                    { label: "Danger", color: "bg-rose-500/70" },
                    { label: "Weak", color: "bg-rose-500/40" },
                    { label: "Neutral", color: "bg-amber-500/50" },
                    { label: "Strong", color: "bg-emerald-500/50" },
                    { label: "Dominant", color: "bg-emerald-500/80" },
                ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                        <div className={`h-3 w-3 rounded ${l.color}`} />
                        <span className="text-[8px] font-mono text-muted-foreground uppercase">{l.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
