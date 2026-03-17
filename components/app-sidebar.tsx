"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
    LayoutDashboard,
    Users,
    Trophy,
    TrendingUp,
    MapPin,
    Calculator,
    Zap,
    Scale,
    LogOut,
    ChevronUp,
    UserCircle
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-1">
                    <span className="font-bebas text-2xl tracking-tighter text-primary">22 YARDS</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Intelligence Terminal</span>
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full justify-between">
                                    <div className="flex items-center gap-2">
                                        <UserCircle className="h-4 w-4" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest">Analyst Profile</span>
                                    </div>
                                    <ChevronUp className="h-3 w-3 opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-56 mb-2">
                                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer text-xs font-mono uppercase tracking-widest">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
