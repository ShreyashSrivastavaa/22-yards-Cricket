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
import { OnboardingModal } from "@/components/landing/OnboardingModal"
import { LandingNavbar } from "@/components/landing/LandingNavbar"

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-[#F5F2E9] text-[#1a1a1a] selection:bg-[#D4AF37] selection:text-white min-h-screen relative">
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
