"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserPlus, Mail, Lock, Loader2, ShieldAlert, CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username },
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) throw error
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <Card className="w-full max-w-md bg-[#111111] border-[rgba(245,240,232,0.1)] rounded-none text-center p-12 relative z-10 shadow-2xl">
                    <div className="h-20 w-20 border border-[rgba(29,185,84,0.3)] bg-[rgba(29,185,84,0.05)] flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="h-10 w-10 text-[#1DB954]" />
                    </div>
                    <h2 className="text-4xl font-bebas tracking-[0.15em] uppercase text-[#F5F0E8] mb-4">Transmission Sent</h2>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] leading-relaxed mb-10">
                        We have dispatched a validation intercept to your coordinates.
                        Confirm the link to finalize your clearance.
                    </p>
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full h-14 bg-[#111111] hover:bg-[#1a1a1a] border border-[rgba(245,240,232,0.1)] text-[#C9A84C] font-bebas text-xl tracking-widest rounded-none transition-all"
                    >
                        Return to Terminal
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <Card className="w-full max-w-md bg-[#111111] border-[rgba(245,240,232,0.08)] rounded-none relative z-10 shadow-2xl">
                <CardHeader className="space-y-6 text-center border-b border-[rgba(245,240,232,0.05)] pb-10 bg-[#0D0D0D]">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 border border-[#C9A84C]/30 flex items-center justify-center bg-[#C9A84C]/5">
                            <UserPlus className="h-7 w-7 text-[#C9A84C]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-4xl font-bebas tracking-[0.2em] uppercase text-[#F5F0E8]">Register <span className="text-[#C9A84C]">Asset</span></CardTitle>
                        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[rgba(245,240,232,0.4)]">Initialize Global Clearance Protocol</p>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 p-10">
                    <form onSubmit={handleRegister} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-[rgba(192,57,43,0.1)] border border-[rgba(192,57,43,0.3)] text-[#C0392B] text-[10px] font-mono uppercase tracking-widest flex items-center gap-3">
                                <ShieldAlert className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="username" className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.45)]">Registry Codename [Username]</Label>
                            <div className="relative group">
                                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.2)] group-focus-within:text-[#C9A84C] transition-colors" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Scout_Alpha"
                                    className="pl-10 h-14 bg-[#0A0A0A] border-[rgba(245,240,232,0.08)] rounded-none focus-visible:ring-[#C9A84C] text-[#F5F0E8] font-mono text-sm placeholder:text-[rgba(245,240,232,0.1)] transition-all"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.45)]">Desired Analytical Node [Email]</Label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.2)] group-focus-within:text-[#C9A84C] transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="analyst@22yards.io"
                                    className="pl-10 h-14 bg-[#0A0A0A] border-[rgba(245,240,232,0.08)] rounded-none focus-visible:ring-[#C9A84C] text-[#F5F0E8] font-mono text-sm placeholder:text-[rgba(245,240,232,0.1)] transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.45)]">New Passcode Hash</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.2)] group-focus-within:text-[#C9A84C] transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="8+ characters required"
                                    className="pl-10 h-14 bg-[#0A0A0A] border-[rgba(245,240,232,0.08)] rounded-none focus-visible:ring-[#C9A84C] text-[#F5F0E8] transition-all placeholder:text-[rgba(245,240,232,0.1)]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-[#C9A84C] hover:bg-[#E8D08A] text-[#0A0A0A] font-bebas text-2xl tracking-[0.2em] rounded-none mt-4 transition-all"
                        >
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Authorize Clearance"}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-[rgba(245,240,232,0.05)] text-center">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)]">
                            Existing Clearance? <a href="/login" className="text-[#C9A84C] hover:text-[#E8D08A] font-bold transition-colors">Return to Terminal</a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
