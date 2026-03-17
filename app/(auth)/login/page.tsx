"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Loader2, ShieldAlert } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

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
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <Card className="w-full max-w-md bg-[#111111] border-[rgba(245,240,232,0.08)] rounded-none relative z-10 shadow-2xl">
                <CardHeader className="space-y-6 text-center border-b border-[rgba(245,240,232,0.05)] pb-10 bg-[#0D0D0D]">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 border border-[#C9A84C]/30 flex items-center justify-center bg-[#C9A84C]/5">
                            <Lock className="h-7 w-7 text-[#C9A84C]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-4xl font-bebas tracking-[0.2em] uppercase text-[#F5F0E8]">Access <span className="text-[#C9A84C]">Terminal</span></CardTitle>
                        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[rgba(245,240,232,0.4)]">Clearance Level: Delta Required</p>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 p-10">
                    <form onSubmit={handleLogin} className="space-y-8">
                        {message && (
                            <p style={{
                                color: '#C9A84C',
                                fontFamily: 'var(--font-dm-mono)',
                                fontSize: '13px',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                {message}
                            </p>
                        )}
                        {error && (
                            <div className="p-4 bg-[rgba(192,57,43,0.1)] border border-[rgba(192,57,43,0.3)] text-[#C0392B] text-[10px] font-mono uppercase tracking-widest flex items-center gap-3">
                                <ShieldAlert className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.45)]">Analytical Node [Email]</Label>
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
                            <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(245,240,232,0.45)]">Passcode Cipher</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(245,240,232,0.2)] group-focus-within:text-[#C9A84C] transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10 h-14 bg-[#0A0A0A] border-[rgba(245,240,232,0.08)] rounded-none focus-visible:ring-[#C9A84C] text-[#F5F0E8] transition-all"
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
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Initiate Session"}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-[rgba(245,240,232,0.05)] text-center">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[rgba(245,240,232,0.3)]">
                            Unrecognized Intel? <a href="/register" className="text-[#C9A84C] hover:text-[#E8D08A] font-bold transition-colors">Register Asset</a>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Bottom info */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[rgba(245,240,232,0.15)] uppercase tracking-[0.5em]">
                Secure Sector Intercept // Global Distribution
            </div>
        </div>
    )
}
