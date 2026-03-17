"use client"

import { Zap, TrendingUp, Award, Target } from "lucide-react"

export function LiveStatusTicker() {
    const tickerItems = [
        { label: "ORANGE CAP", value: "R. GAIKWAD (724 RUNS)" },
        { label: "PURPLE CAP", value: "H. PATEL (24 WICKETS)" },
        { label: "HIGHEST SR", value: "A. SHARMA (208.4)" },
        { label: "MOST SIXES", value: "H. KLAASEN (38)" },
        { label: "AVG DELAY", value: "144 MS" },
        { label: "ACTIVE NODES", value: "IPL26_TERMINAL" },
    ]

    return (
        <div className="bg-[#C9A84C] py-2.5 overflow-hidden relative">
            <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#0A0A0A]">
                            <span className="font-bold">{item.label}:</span> {item.value}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-[#0A0A0A]/30 mx-4" />
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    )
}
