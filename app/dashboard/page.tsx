import {
  TrendingUp,
  Users,
  Trophy,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">INTELLIGENCE DASHBOARD</h1>
          <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest opacity-70">Strategic Analytics & Ecosystem Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-mono">Export CSV</Button>
          <Button size="sm" className="h-8 text-[10px] uppercase font-mono">Refresh Data</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Vault Assets", value: "2,481", sub: "+12 Indexed Players", icon: Users, trend: "up" },
          { title: "Prediction Accuracy", value: "84.2%", sub: "ML Model v1.0", icon: Target, trend: "up" },
          { title: "Live Streams", value: "3", sub: "Data Feed Active", icon: Trophy, trend: "none" },
          { title: "Market Volatility", value: "68", sub: "Consistency Index", icon: TrendingUp, trend: "down" },
        ].map((stat, i) => (
          <Card key={i} className="border-muted-foreground/10 bg-muted/5 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-3 w-3 text-muted-foreground opacity-50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono tracking-tighter">{stat.value}</div>
              <p className="flex items-center gap-1 text-[10px] font-medium mt-1">
                {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500" />}
                {stat.trend === "down" && <ArrowDownRight className="h-3 w-3 text-red-500" />}
                <span className="text-muted-foreground">{stat.sub}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <Card className="col-span-4 border-muted-foreground/10 bg-muted/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-xs font-mono uppercase tracking-widest">Win Probability Matrix</CardTitle>
            <CardDescription className="text-[10px]">Heuristic-based probability fluctuations across recent cycles.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed bg-muted/10 m-6 rounded-lg opacity-50">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-6 w-6" />
              <span className="text-[10px] uppercase font-mono tracking-[0.2em]">Matrix Load Pending...</span>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t border-muted-foreground/5 p-4 text-[10px] font-mono uppercase tracking-tight text-muted-foreground/60">
            <span>Core Node: 0xF29...B24</span>
            <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-mono hover:bg-muted">Deep Analysis <ChevronRight className="ml-1 h-3 w-3" /></Button>
          </CardFooter>
        </Card>

        {/* Trending Intelligence */}
        <Card className="col-span-3 border-muted-foreground/10 bg-muted/5 shadow-none">
          <CardHeader>
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-primary">High-Value Targets</CardTitle>
            <CardDescription className="text-[10px]">Top asset profiles flagged by scouting algorithms.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Virat Kohli", team: "RCB", img: "VK", trend: "Hot" },
                { name: "Jasprit Bumrah", team: "MI", img: "JB", trend: "Alpha" },
                { name: "Rashid Khan", team: "GT", img: "RK", trend: "Elite" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary border border-primary/20">
                      {p.img}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-none uppercase">{p.name}</div>
                      <div className="text-[9px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">{p.team} Intelligence Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${p.trend === 'Hot' ? 'border-orange-500/50 text-orange-500' : 'border-muted-foreground/30 text-muted-foreground'}`}>{p.trend}</span>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0"><ChevronRight className="h-3 w-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-muted-foreground/5">
            <Button variant="link" size="sm" className="w-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">Access Vault Records</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
