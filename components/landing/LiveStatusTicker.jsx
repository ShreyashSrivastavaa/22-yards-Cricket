"use client"

export function LiveStatusTicker() {
    const tickerItems = [
        { label: "ORANGE CAP", value: "R. GAIKWAD (724 RUNS)" },
        { label: "PURPLE CAP", value: "H. PATEL (24 WICKETS)" },
        { label: "HIGHEST SR", value: "A. SHARMA (208.4)" },
        { label: "MOST SIXES", value: "H. KLAASEN (38)" },
        { label: "RECENT FORM", value: "V. KOHLI (UP +14%)" },
        { label: "MARKET DELIVERABLES", value: "2026 CYCLE ACTIVE" },
        { label: "DATA STREAM", value: "VERIFIED" },
    ]

    return (
        <div className="bg-[#C9A84C] py-3 overflow-hidden relative border-y border-[#0A0A0A]/20">
            <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-[#0A0A0A]">
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
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    )
}
