"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error
            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F2E9] p-4">
            <Card className="w-full max-w-md bg-white border-[#D4AF37]/20 shadow-xl rounded-none">
                <CardHeader className="space-y-1 text-center border-b border-[#F5F2E9] pb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                            <Lock className="h-6 w-6 text-[#D4AF37]" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bebas tracking-wider uppercase text-[#1a1a1a]">Intelligence Access</CardTitle>
                    <CardDescription className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4a4a]">Enter your clearance credentials</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] font-mono uppercase tracking-widest">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">Email Node</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#D4AF37]" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="analyst@22yards.ai"
                                    className="pl-10 h-12 bg-[#F5F2E9]/50 border-[#D4AF37]/10 rounded-none focus-visible:ring-[#D4AF37]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">Passcode Key</Label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#D4AF37]" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10 h-12 bg-[#F5F2E9]/50 border-[#D4AF37]/10 rounded-none focus-visible:ring-[#D4AF37]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bebas text-xl tracking-widest rounded-none mt-4 transition-all"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "AUTHENTICATE SESSID"}
                        </Button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-[#F5F2E9] text-center">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">
                            New analyst? <a href="/register" className="text-[#D4AF37] hover:underline font-bold">Register Profile</a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
