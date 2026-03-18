"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { OnboardingModal } from "@/components/landing/OnboardingModal"
import { Loader2 } from "lucide-react"

export default function AppLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/login")
            } else {
                setLoading(false)
            }
        }
        checkUser()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <SidebarProvider>
            <OnboardingModal />
            <AppSidebar />
            <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
