"use client"

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts"

const data = [
    { over: 0, team1: 50, team2: 50 },
    { over: 2, team1: 55, team2: 45 },
    { over: 4, team1: 48, team2: 52 },
    { over: 6, team1: 62, team2: 38 },
    { over: 8, team1: 58, team2: 42 },
    { over: 10, team1: 71, team2: 29 },
    { over: 12, team1: 75, team2: 25 },
    { over: 14, team1: 65, team2: 35 },
    { over: 16, team1: 45, team2: 55 },
    { over: 18, team1: 30, team2: 70 },
    { over: 20, team1: 10, team2: 90 },
]

export function WinProbChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorTeam1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTeam2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis
                    dataKey="over"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 10 }}
                    label={{ value: 'Overs', position: 'insideBottom', offset: -5, fill: '#71717a', fontSize: 10 }}
                />
                <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '10px', color: '#71717a', marginBottom: '4px' }}
                    formatter={(value) => [`${value}%`, 'Win Chance']}
                    labelFormatter={(label) => `Over: ${label}`}
                />
                <Area
                    type="monotone"
                    dataKey="team1"
                    stroke="#e11d48"
                    fillOpacity={1}
                    fill="url(#colorTeam1)"
                    strokeWidth={2}
                    name="RCB"
                />
                <Area
                    type="monotone"
                    dataKey="team2"
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#colorTeam2)"
                    strokeWidth={2}
                    name="MI"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
