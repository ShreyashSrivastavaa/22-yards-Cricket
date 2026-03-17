"use client"

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlayerCompData {
    name: string
    color: string
    skills: Record<string, number>
    phases: { name: string; sr: number }[]
}

const COLORS = ["#e11d48", "#2563eb", "#10b981"]

export function ComparisonRadar({ players }: { players: PlayerCompData[] }) {
    const subjects = Object.keys(players[0]?.skills || {})
    const data = subjects.map(subject => {
        const point: Record<string, string | number> = { subject }
        players.forEach((p, i) => {
            point[`p${i}`] = p.skills[subject] || 0
        })
        return point
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Skill Overlay</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#27272a" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        {players.map((p, i) => (
                            <Radar
                                key={p.name}
                                name={p.name}
                                dataKey={`p${i}`}
                                stroke={COLORS[i]}
                                fill={COLORS[i]}
                                fillOpacity={0.15}
                                strokeWidth={2}
                            />
                        ))}
                        <Legend verticalAlign="bottom" height={36} />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export function ComparisonBars({ players }: { players: PlayerCompData[] }) {
    const phases = players[0]?.phases.map(p => p.name) || []
    const data = phases.map(phase => {
        const point: Record<string, string | number> = { phase }
        players.forEach((p, i) => {
            const match = p.phases.find(ph => ph.name === phase)
            point[`p${i}`] = match?.sr || 0
        })
        return point
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Phase-wise Strike Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '11px' }}
                        />
                        {players.map((p, i) => (
                            <Bar key={p.name} dataKey={`p${i}`} name={p.name} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
                        ))}
                        <Legend verticalAlign="bottom" height={36} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
