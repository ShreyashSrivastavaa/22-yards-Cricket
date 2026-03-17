"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

const data = [
  { subject: 'Top Order', A: 85, fullMark: 100 },
  { subject: 'Finishing', A: 72, fullMark: 100 },
  { subject: 'Spin Surge', A: 65, fullMark: 100 },
  { subject: 'Death Overs', A: 78, fullMark: 100 },
  { subject: 'Powerplay', A: 88, fullMark: 100 },
  { subject: 'Agility', A: 82, fullMark: 100 },
]

export function TeamBalanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#27272a" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Team Balance"
          dataKey="A"
          stroke="#e11d48"
          fill="#e11d48"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
