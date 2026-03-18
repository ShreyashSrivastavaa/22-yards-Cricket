"use client"

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts"

export function PlayerRadarChart({ stats }) {
    const data = [
        { subject: 'Attack', A: stats.attack, fullMark: 100 },
        { subject: 'Consistency', A: stats.consistency, fullMark: 100 },
        { subject: 'Power', A: stats.power, fullMark: 100 },
        { subject: 'Clutch', A: stats.clutch, fullMark: 100 },
        { subject: 'Pressure', A: stats.pressure, fullMark: 100 },
    ]

    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'medium' }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Player Profile"
                        dataKey="A"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}
