"use client"

import {
  Users,
  ShieldCheck,
  Zap,
  Target,
  UserPlus
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const players = [
  // Openers
  { name: "Virat Kohli", role: "Batter", rating: 94, subRole: "Opener", overseas: false },
  { name: "Faf du Plessis", role: "Batter", rating: 91, subRole: "Opener", overseas: true },
  { name: "Will Jacks", role: "All-rounder", rating: 85, subRole: "Opener", overseas: true },
  // Middle Order
  { name: "Rajat Patidar", role: "Batter", rating: 86, subRole: "Middle Order", overseas: false },
  { name: "Cameron Green", role: "All-rounder", rating: 87, subRole: "Middle Order", overseas: true },
  { name: "Glenn Maxwell", role: "All-rounder", rating: 89, subRole: "Middle Order", overseas: true },
  // Finishers
  { name: "Dinesh Karthik", role: "WK-Batter", rating: 85, subRole: "Finisher", overseas: false },
  { name: "Mahipal Lomror", role: "Batter", rating: 81, subRole: "Finisher", overseas: false },
  // Bowlers
  { name: "Mohammed Siraj", role: "Bowler", rating: 88, subRole: "Pacer", overseas: false },
  { name: "Yash Dayal", role: "Bowler", rating: 82, subRole: "Pacer", overseas: false },
  { name: "Reece Topley", role: "Bowler", rating: 84, subRole: "Pacer", overseas: true },
  { name: "Karn Sharma", role: "Bowler", rating: 81, subRole: "Spinner", overseas: false },
  { name: "Akash Deep", role: "Bowler", rating: 80, subRole: "Pacer", overseas: false },
]

export function BestXIList() {
  // Balanced XI Heuristic
  const getBestXI = () => {
    const xi: typeof players = []

    // 1. Pick 2 Openers
    xi.push(...[...players].filter(p => p.subRole === "Opener").sort((a, b) => b.rating - a.rating).slice(0, 2))

    // 2. Pick 1 Keeper (Heuristic: Dinesh Karthik in this mock)
    const keeper = players.find(p => p.role === "WK-Batter")
    if (keeper) xi.push(keeper)

    // 3. Pick 3 Middle Order
    xi.push(...[...players].filter(p => p.subRole === "Middle Order" && !xi.includes(p)).sort((a, b) => b.rating - a.rating).slice(0, 3))

    // 4. Pick 1 Finisher
    xi.push(...[...players].filter(p => p.subRole === "Finisher" && !xi.includes(p)).sort((a, b) => b.rating - a.rating).slice(0, 1))

    // 5. Pick 4 Bowlers
    xi.push(...[...players].filter(p => p.role === "Bowler").sort((a, b) => b.rating - a.rating).slice(0, 4))

    return xi.sort((a, b) => {
      // Sort for display: Top Order -> Middle -> Finisher -> Bowler
      const order: Record<string, number> = { "Opener": 1, "Middle Order": 2, "Finisher": 3, "Pacer": 4, "Spinner": 4 }
      return (order[a.subRole] || 5) - (order[b.subRole] || 5)
    })
  }

  const bestXI = getBestXI()

  return (
    <div className="grid gap-2">
      {bestXI.map((player, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-2 rounded border border-muted-foreground/10 bg-background/40 hover:border-primary/40 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 text-[10px] font-mono text-muted-foreground">{i + 1}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold font-mono tracking-tight">{player.name}</span>
                {player.overseas && <Badge variant="outline" className="text-[8px] h-3 px-1 uppercase border-primary/20 text-primary">OS</Badge>}
              </div>
              <div className="text-[9px] font-mono text-muted-foreground uppercase">{player.subRole}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-bold font-mono text-primary">{player.rating}</div>
            </div>
            {player.role === "Bowler" ? (
              <Target className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : player.role === "All-rounder" ? (
              <Zap className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ShieldCheck className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
