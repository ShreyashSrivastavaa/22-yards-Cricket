"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/dashboard`
                }
            })

            if (error) throw error
            setSuccess(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F2E9] p-4">
                <Card className="w-full max-w-md bg-white border-[#D4AF37]/20 shadow-xl rounded-none text-center p-8">
                    <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bebas tracking-wide uppercase text-[#1a1a1a] mb-4">Verification Sent</h2>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#4a4a4a] leading-relaxed">
                        We have dispatched a confirmation link to your terminal.
                        Please verify your email to activate your clearance.
                    </p>
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full mt-10 bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bebas text-xl tracking-widest rounded-none"
                    >
                        Return to Login
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F2E9] p-4">
            <Card className="w-full max-w-md bg-white border-[#D4AF37]/20 shadow-xl rounded-none">
                <CardHeader className="space-y-1 text-center border-b border-[#F5F2E9] pb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                            <UserPlus className="h-6 w-6 text-[#D4AF37]" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bebas tracking-wider uppercase text-[#1a1a1a]">Register Profile</CardTitle>
                    <CardDescription className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#4a4a4a]">Initialize your analyst clearance</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleRegister} className="space-y-6">
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
                            <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">Create Passcode</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#D4AF37]" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Min. 8 characters"
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
                            className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bebas text-xl tracking-widest rounded-none mt-4"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "PROVISIONAL REGISTRATION"}
                        </Button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-[#F5F2E9] text-center">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#4a4a4a]">
                            Existing clearance? <a href="/login" className="text-[#D4AF37] hover:underline font-bold">Access Terminal</a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
