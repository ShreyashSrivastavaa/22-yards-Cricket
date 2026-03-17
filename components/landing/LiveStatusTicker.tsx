"use client"

import { Zap, TrendingUp, Award, Target } from "lucide-react"

export function LiveStatusTicker() {
    const tickerItems = [
        { icon: Award, label: "Orange Cap", value: "Ruturaj Gaikwad (724 Runs)" },
        { icon: Target, label: "Purple Cap", value: "Harshal Patel (24 Wickets)" },
        { icon: TrendingUp, label: "Highest SR", value: "Abhishek Sharma (208.4)" },
        { icon: Zap, label: "Most Sixes", value: "Heinrich Klaasen (38)" },
        { icon: Award, label: "Best Figures", value: "Sandeep Sharma (5/18)" },
    ]

    return (
        <div className="bg-[#D4AF37]/10 border-y border-[#D4AF37]/20 py-2 overflow-hidden relative">
            <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
                {/* Double the list for seamless loop */}
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <item.icon className="h-3 w-3 text-[#B8860B]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#4a4a4a]">
                            {item.label}: <span className="text-[#1a1a1a] font-bold">{item.value}</span>
                        </span>
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
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}
