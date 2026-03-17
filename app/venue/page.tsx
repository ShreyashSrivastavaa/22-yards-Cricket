"use client"

import { MapPin, Wind, Thermometer, Droplets, TrendingUp, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VenueIntelligencePage() {
    const venues = [
        { id: "wankhede", name: "Wankhede Stadium", city: "Mumbai", avgScore: 184, paceWkt: "62%", spinWkt: "38%", tossBias: "Bat Second (64%)" },
        { id: "chepauk", name: "MA Chidambaram Stadium", city: "Chennai", avgScore: 162, paceWkt: "45%", spinWkt: "55%", tossBias: "Bat First (58%)" },
        { id: "chinnaswamy", name: "M. Chinnaswamy Stadium", city: "Bengaluru", avgScore: 192, paceWkt: "70%", spinWkt: "30%", tossBias: "Bat Second (71%)" },
    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bebas tracking-wider">Venue Intelligence Hub</h1>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Ground conditions, historical trends, and atmospheric bias.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {venues.map((venue) => (
                    <Card key={venue.id} className="border-muted-foreground/10 bg-muted/5 shadow-none hover:border-primary/30 transition-colors cursor-pointer group">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="text-[9px] font-mono border-primary/20 text-primary uppercase">{venue.city}</Badge>
                                <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <CardTitle className="text-lg font-bebas tracking-wide mt-2">{venue.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono uppercase text-muted-foreground">Avg 1st Inn Score</span>
                                    <div className="text-xl font-bold font-mono tracking-tighter">{venue.avgScore}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono uppercase text-muted-foreground">Toss Advantage</span>
                                    <div className="text-[10px] font-bold font-mono text-primary">{venue.tossBias}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-mono uppercase">
                                    <span>Pace {venue.paceWkt}</span>
                                    <span>Spin {venue.spinWkt}</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted-foreground/10 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-primary" style={{ width: venue.paceWkt }} />
                                    <div className="h-full bg-blue-500" style={{ width: venue.spinWkt }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-primary/20 bg-primary/5 shadow-none">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center">
                        <Wind className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-mono uppercase">Live Atmospheric Bias</CardTitle>
                        <CardDescription className="text-[10px]">Real-time weather data influencing ball flight and dew factor.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Humidity", val: "72%", icon: Droplets, trend: "Rising (Dew Prob: High)" },
                            { label: "Temp", val: "28°C", icon: Thermometer, trend: "Stable" },
                            { label: "Wind Speed", val: "14 km/h", icon: Wind, trend: "From West (Short Boundary)" },
                            { label: "Recent Win Prob", val: "+8%", icon: TrendingUp, trend: "Favoring Chasing Team" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <stat.icon className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-[9px] font-mono uppercase text-muted-foreground">{stat.label}</span>
                                </div>
                                <div className="text-2xl font-bold font-mono tracking-tighter">{stat.val}</div>
                                <div className="text-[9px] font-mono text-primary opacity-80">{stat.trend}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
