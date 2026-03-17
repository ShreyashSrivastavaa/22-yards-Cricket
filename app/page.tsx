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

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground min-h-screen relative">
      <OnboardingModal />
      <StickyCTA />

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
