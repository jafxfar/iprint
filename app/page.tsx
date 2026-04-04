import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeTicker } from "@/components/marquee-ticker"
import { WorkSection } from "@/components/work-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CursorFollower } from "@/components/cursor-follower"
import { ScrollProgress } from "@/components/scroll-progress"

export default function HomePage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <WorkSection />
      <AboutSection />
      <MarqueeTicker inverted />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
