"use client"

import { Clock, TrendingDown, TrendingUp, Zap, Target } from "lucide-react"

interface MatchEvent {
    over: string
    description: string
    impact: string // e.g. "-15% Win Prob"
    type: "wicket" | "boundary" | "turning-point" | "neutral"
}

interface MatchStoryProps {
    events: MatchEvent[]
}

export function MatchStoryTimeline({ events }: MatchStoryProps) {
    return (
        <div className="space-y-6">
            {events.map((event, i) => (
                <div key={i} className="relative pl-8 pb-6 last:pb-0 border-l border-muted-foreground/20 ml-2">
                    {/* Timeline dot */}
                    <div className={`absolute left-[-5px] top-1 h-2 w-2 rounded-full border-2 border-background shadow-sm ${event.type === 'wicket' ? 'bg-red-500' :
                            event.type === 'turning-point' ? 'bg-amber-500' :
                                event.type === 'boundary' ? 'bg-emerald-500' : 'bg-muted-foreground'
                        }`} />

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase bg-muted/30 px-2 py-0.5 rounded leading-none">
                                Over {event.over}
                            </span>
                            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-black">
                                {event.impact.includes("+") ? (
                                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={event.impact.includes("+") ? "text-emerald-500" : "text-red-500"}>
                                    {event.impact}
                                </span>
                            </div>
                        </div>

                        <div className="text-xs font-mono mt-1 text-foreground leading-relaxed">
                            {event.description}
                        </div>

                        {event.type === 'turning-point' && (
                            <div className="mt-2 flex items-center gap-2">
                                <Zap className="h-3 w-3 text-amber-500 fill-amber-500/20" />
                                <span className="text-[9px] font-mono text-amber-500 uppercase font-black tracking-widest leading-none">Intelligence Flag: Critical Shift</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
