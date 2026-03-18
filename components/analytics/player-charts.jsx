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
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillData = [
    { subject: 'Power', A: 120, fullMark: 150 },
    { subject: 'Consistency', A: 98, fullMark: 150 },
    { subject: 'Speed/SR', A: 86, fullMark: 150 },
    { subject: 'Spin Play', A: 99, fullMark: 150 },
    { subject: 'Pace Play', A: 85, fullMark: 150 },
    { subject: 'Finish', A: 65, fullMark: 150 },
]

const phaseData = [
    { name: 'Powerplay', sr: 145, avg: 42 },
    { name: 'Middle', sr: 128, avg: 35 },
    { name: 'Death', sr: 184, avg: 22 },
]

const matchupData = [
    { name: 'Pace', value: 65, color: '#e11d48' },
    { name: 'Spin', value: 35, color: '#3f3f46' },
]

const dismissalData = [
    { name: 'Caught', value: 45, color: '#e11d48' },
    { name: 'LBW', value: 15, color: '#fbbf24' },
    { name: 'Bowled', value: 20, color: '#3f3f46' },
    { name: 'Other', value: 20, color: '#71717a' },
]

export default function PlayerCharts({ playerId }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                            <PolarGrid stroke="#3f3f46" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Player"
                                dataKey="A"
                                stroke="#e11d48"
                                fill="#e11d48"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Phase-wise Strike Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={phaseData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#71717a', fontSize: 10 }}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Bar dataKey="sr" radius={[4, 4, 0, 0]}>
                                {phaseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 2 ? '#e11d48' : '#3f3f46'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Pace vs Spin Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={matchupData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {matchupData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-muted-foreground">— Dismissal Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dismissalData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {dismissalData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
