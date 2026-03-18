"use client"

export function HowItWorks() {
    const steps = [
        {
            title: "DATA INTERCEPT",
            desc: "We capture live + historical match variables through our institutional-grade tactical pipeline."
        },
        {
            title: "ANALYTICS HUB",
            desc: "Predictive models evaluate match outcomes and player ceiling using multivariate risk variables."
        },
        {
            title: "STRATEGIC EDGE",
            desc: "Deploy smarter fantasy and match decisions based on high-integrity tactical intelligence."
        }
    ]

    return (
        <section id="methodology" className="py-32 bg-[#0D0D0D] border-b border-[rgba(201,168,76,0.1)] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#C9A84C]" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#C9A84C] font-bold">
                                The Intelligence Flow
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bebas text-[#F5F0E8] tracking-tight uppercase leading-none">
                            Methodology <span className="text-[#C9A84C]">& Pipeline</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group bg-[#111111] border border-[rgba(245,240,232,0.08)] p-12 pt-20 hover:border-[#C9A84C]/40 transition-all duration-300">
                            {/* Huge Step Number */}
                            <div className="absolute top-4 right-8 font-bebas text-[180px] text-[#C9A84C] opacity-[0.06] select-none group-hover:opacity-[0.1] transition-opacity leading-none">
                                {i + 1}
                            </div>

                            <div className="relative z-10 space-y-8">
                                <h3 className="text-5xl font-bebas tracking-widest uppercase text-[#F5F0E8] leading-none">{step.title}</h3>
                                <p className="text-[rgba(245,240,232,0.5)] text-[12px] font-mono uppercase leading-relaxed tracking-[0.15em] max-w-[280px]">
                                    {step.desc}
                                </p>
                                <div className="h-1 w-16 bg-[#C9A84C] transform origin-left group-hover:scale-x-150 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
