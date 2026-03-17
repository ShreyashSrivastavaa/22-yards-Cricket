"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, BarChart3, Calculator, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const hasOnboarded = localStorage.getItem("22yards_onboarded")
        if (!hasOnboarded) {
            const timer = setTimeout(() => setIsOpen(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleSelect = (path: string) => {
        localStorage.setItem("22yards_onboarded", "true")
        setIsOpen(false)
        router.push(path)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md bg-black/90 border-primary/20 backdrop-blur-2xl p-8">
                <DialogHeader className="space-y-4">
                    <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-3xl font-bebas tracking-widest text-center uppercase">Welcome to 22 Yards</DialogTitle>
                    <DialogDescription className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        What is your primary tactical objective today?
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 py-6">
                    <Button
                        variant="outline"
                        className="h-16 justify-start gap-4 border-white/5 hover:bg-primary/5 hover:border-primary/30 group"
                        onClick={() => handleSelect("/dashboard#elite-picks")}
                    >
                        <div className="p-2 rounded bg-primary/10 text-primary">
                            <Trophy className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold font-mono group-hover:text-primary">WIN FANTASY MATCHES</div>
                            <div className="text-[9px] font-mono text-muted-foreground opacity-60">ACCESS ELITE AI PICK FEED</div>
                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-16 justify-start gap-4 border-white/5 hover:bg-blue-500/5 hover:border-blue-500/30 group"
                        onClick={() => handleSelect("/players")}
                    >
                        <div className="p-2 rounded bg-blue-500/10 text-blue-500">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold font-mono group-hover:text-blue-500">ANALYZE PLAYERS</div>
                            <div className="text-[9px] font-mono text-muted-foreground opacity-60">DEEP RADAR & FORM METRICS</div>
                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-16 justify-start gap-4 border-white/5 hover:bg-amber-500/5 hover:border-amber-500/30 group"
                        onClick={() => handleSelect("/predictor")}
                    >
                        <div className="p-2 rounded bg-amber-500/10 text-amber-500">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold font-mono group-hover:text-amber-500">PREDICT OUTCOMES</div>
                            <div className="text-[9px] font-mono text-muted-foreground opacity-60">SIMULATE LIVE MATCH FLOW</div>
                        </div>
                    </Button>
                </div>

                <DialogFooter>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                    >
                        Skip for now
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
