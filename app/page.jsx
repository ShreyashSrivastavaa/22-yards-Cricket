"use client"

import { Hero } from "@/components/landing/Hero"
import { DailyHook } from "@/components/landing/DailyHook"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Features } from "@/components/landing/Features"
import { Comparison } from "@/components/landing/Comparison"
import { Pricing } from "@/components/landing/Pricing"
import { Footer } from "@/components/landing/Footer"
import { LiveStatusTicker } from "@/components/landing/LiveStatusTicker"
import { StickyCTA } from "@/components/landing/StickyCTA"
import { LandingNavbar } from "@/components/landing/LandingNavbar"

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-[#0A0A0A] text-[#F5F0E8] selection:bg-[#C9A84C] selection:text-[#0A0A0A] min-h-screen relative font-sans">
      <LandingNavbar />

      <main className="flex-grow">
        <LiveStatusTicker />
        <Hero />
        <DailyHook />
        <HowItWorks />
        <Features />
        <Comparison />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}
