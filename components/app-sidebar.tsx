"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Users,
    Trophy,
    History,
    TrendingUp,
    Search,
    Settings,
    HelpCircle,
    MapPin,
    Calculator,
    Zap,
    Scale,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Player Database",
        url: "/players",
        icon: Users,
    },
    {
        title: "Match Intelligence",
        url: "/matches",
        icon: Zap,
    },
    {
        title: "Comparison Engine",
        url: "/compare",
        icon: Scale,
    },
    {
        title: "Team Analytics",
        url: "/teams",
        icon: TrendingUp,
    },
    {
        title: "Venue Intelligence",
        url: "/venue",
        icon: MapPin,
    },
    {
        title: "Tournament Predictor",
        url: "/predictor",
        icon: Calculator,
    },
    {
        title: "Fantasy Pro",
        url: "/fantasy",
        icon: Trophy,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-1">
                    <span className="font-bebas text-2xl tracking-tighter text-primary">22 YARDS</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Intelligence Platform</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2 text-xs">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase opacity-70">Core Engine: Active</span>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
