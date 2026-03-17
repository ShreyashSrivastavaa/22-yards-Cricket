"use client"

import { MapPin, Wind, Thermometer, Droplets, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLiveStats } from "@/lib/hooks"

export default function VenueIntelligencePage() {
    const { data, loading, error } = useLiveStats()
    const venuesActive = (data?.batting?.length ?? 0) > 0

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bebas tracking-wider text-primary">Venue Intelligence Hub</h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-none">Ground conditions, historical trends, and atmospheric bias.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card className="border-muted-foreground/10 bg-muted/5 shadow-none rounded-none border-t-4 border-primary">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="h-12 w-12 rounded-none bg-primary/20 flex items-center justify-center border border-primary/10">
                            <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-mono uppercase tracking-widest">— Tactical Ground Status</CardTitle>
                            <CardDescription className="text-[10px] font-mono uppercase">Analyzing 10 primary franchise nodes for IPL 2026.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="min-h-[300px] flex flex-col items-center justify-center p-12 text-center">
                        {loading ? (
                            <div className="space-y-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto opacity-50" />
                                <p className="text-[10px] font-mono uppercase tracking-[.2em] text-muted-foreground">Calibrating Ground Sensors...</p>
                            </div>
                        ) : !venuesActive ? (
                            <div className="space-y-6 max-w-md">
                                <div className="p-4 bg-primary/5 border border-primary/10 inline-block">
                                    <Wind className="h-8 w-8 text-primary/40 mx-auto" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bebas tracking-widest uppercase">Nodes Dormant (Pre-Season)</h3>
                                    <p className="text-[10px] font-mono uppercase text-muted-foreground leading-relaxed">
                                        Ground-level data, pitch reports, and ball-tracking metrics will initialize 2 hours prior to the first match at each venue.
                                    </p>
                                </div>
                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <div className="p-3 border border-muted-foreground/10 text-left">
                                        <span className="text-[8px] font-mono uppercase text-muted-foreground">Next Scheduled Node</span>
                                        <div className="text-xs font-bold font-mono">DY PATIL (NAV)</div>
                                    </div>
                                    <div className="p-3 border border-muted-foreground/10 text-left">
                                        <span className="text-[8px] font-mono uppercase text-muted-foreground">ETA</span>
                                        <div className="text-xs font-bold font-mono">T-9 DAYS</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {/* This section would map real matches/venues once live */}
                                <p className="col-span-full text-xs font-mono text-muted-foreground">Live Match Feed Detected. Synthesizing Venue Profiles...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-muted-foreground/10 bg-muted/5 shadow-none rounded-none border-t-4 border-amber-500/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="h-12 w-12 rounded-none bg-amber-500/10 flex items-center justify-center border border-amber-500/10">
                            <Wind className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-mono uppercase tracking-widest">— Live Atmospheric Tracking</CardTitle>
                            <CardDescription className="text-[10px] font-mono uppercase">Real-time variables influencing ball flight and dew factor.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale">
                            {[
                                { label: "Humidity", val: "--", icon: Droplets, trend: "Pending Data", color: "text-blue-500" },
                                { label: "Temp", val: "--", icon: Thermometer, trend: "Pending Data", color: "text-emerald-500" },
                                { label: "Wind Speed", val: "--", icon: Wind, trend: "Pending Data", color: "text-primary" },
                                { label: "Dew Factor", val: "--", icon: TrendingUp, trend: "Pending Data", color: "text-amber-500" },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className={`h-3 w-3 ${stat.color}`} />
                                        <span className="text-[9px] font-mono uppercase text-muted-foreground">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-black font-mono tracking-tighter">{stat.val}</div>
                                    <div className={`text-[8px] font-mono uppercase font-bold tracking-widest`}>{stat.trend}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
