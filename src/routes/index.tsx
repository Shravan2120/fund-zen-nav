import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero, StatsStrip } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { ServicesSection } from "@/components/sections/Services";
import { FundsSection } from "@/components/sections/Funds";
import { CalculatorSection } from "@/components/sections/Calculator";
import { WhySipSection } from "@/components/sections/WhySip";
import { FaqSection } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/Cta";
import { ContactSection } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyFundSIP — Start Your SIP Journey in Mutual Funds" },
      {
        name: "description",
        content:
          "Plan your wealth with SIPs in top-rated Indian mutual funds. Use our free SIP calculator, explore fund performance, and start investing from ₹100/month.",
      },
      { property: "og:title", content: "MyFundSIP — Start Your SIP Journey in Mutual Funds" },
      {
        property: "og:description",
        content:
          "Plan your wealth with SIPs in top-rated Indian mutual funds. Free SIP calculator, fund explorer, and investing from ₹100/month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <AboutSection />
        <ServicesSection />
        <FundsSection />
        <CalculatorSection />
        <WhySipSection />
        <FaqSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
