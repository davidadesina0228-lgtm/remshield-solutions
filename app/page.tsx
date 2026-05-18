import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import Hero from "@/components/sections/Hero";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import VerticalTabs from "@/components/ui/vertical-tabs";
import IndustryStats from "@/components/sections/IndustryStats";
import HowWeWork from "@/components/sections/HowWeWork";
import WhyRemShield from "@/components/sections/WhyRemShield";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/ui/Footer";
import { faqJsonLd, serviceItemListJsonLd } from "@/lib/ai-discovery";

export const metadata: Metadata = {
  alternates: { canonical: "https://remshield.solutions/" },
};

export default function Home() {
  return (
    <main className="relative bg-navy overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemListJsonLd()) }}
      />
      <Navbar />
      <FloatingCTA />
      <Hero />
      <MarqueeTicker />
      <VerticalTabs />
      <IndustryStats />
      <HowWeWork />
      <WhyRemShield />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
