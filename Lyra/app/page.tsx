import { LandingHero } from "@/components/landing/hero"
import { LandingHowItWorks } from "@/components/landing/how-it-works"
import { LandingTrust } from "@/components/landing/trust"
import { LandingDoctor } from "@/components/landing/doctor-section"
import { LandingParent } from "@/components/landing/parent-section"
import { LandingFaq } from "@/components/landing/faq"
import { LandingFooter } from "@/components/landing/footer"
import { LandingNav } from "@/components/landing/nav"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNav />
      <LandingHero />
      <LandingHowItWorks />
      <LandingTrust />
      <LandingDoctor />
      <LandingParent />
      <LandingFaq />
      <LandingFooter />
    </main>
  )
}
