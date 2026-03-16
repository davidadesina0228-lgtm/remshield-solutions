import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  alternates: { canonical: "https://remshield.solutions/" },
};
import Hero from "@/components/sections/Hero";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import Services from "@/components/sections/Services";
import VerticalTabs from "@/components/ui/vertical-tabs";
import IndustryStats from "@/components/sections/IndustryStats";
import HowWeWork from "@/components/sections/HowWeWork";
import WhyRemShield from "@/components/sections/WhyRemShield";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/ui/Footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does RemShield offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RemShield is an AI engineering studio built around three pillars: AI Systems (intelligent assistants, voice agents, document AI, and custom copilots), Automation Infrastructure (workflow automation, CRM automation, and ops pipelines), and Custom Software (SaaS platforms, internal tools, and AI-powered applications). Every system is built AI-native from the ground up.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build an AI system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most projects are completed in 2–6 weeks depending on complexity. Because we use AI-accelerated development workflows, we deliver at 10x the speed of traditional agencies — without cutting corners on quality.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need technical knowledge to work with you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. 94% of employees waste time on tasks AI can automate — yet most business owners don't know where to start. We handle everything technical from end to end. You just share your business goals, and we translate them into a working AI system.",
      },
    },
    {
      "@type": "Question",
      name: "Can you integrate AI into my existing business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this is one of our specialties. We audit your current tools, workflows, and processes to identify where AI creates the most value. Businesses with a defined AI strategy grow 3.5x faster than those without one. We give you that strategy, then build the systems to execute it.",
      },
    },
    {
      "@type": "Question",
      name: "What makes RemShield different from other agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are 100% AI-native. Enterprise AI adoption has grown 270% in 4 years — yet most agencies still treat AI as an add-on. We build everything AI-first: faster delivery, 40% lower operational costs for clients, and systems designed to scale from day one.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple — book a free 30-minute strategy call via the button on this page. We'll audit your operations, identify your highest-ROI AI opportunities, and give you a clear proposal with no obligation.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "RemShield Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "AI Systems",
        description:
          "Intelligent systems that handle complex decisions and support your team — AI assistants, customer support agents, voice agents, document analysis, and custom AI copilots built for your workflows.",
        provider: {
          "@type": "Organization",
          name: "RemShield",
          url: "https://remshield.solutions",
        },
        url: "https://remshield.solutions/contact?service=ai-systems",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Automation Infrastructure",
        description:
          "We design automation infrastructure that connects your tools, qualifies leads, and runs your operations pipelines — without hiring more people.",
        provider: {
          "@type": "Organization",
          name: "RemShield",
          url: "https://remshield.solutions",
        },
        url: "https://remshield.solutions/contact?service=automation-infrastructure",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Custom Software",
        description:
          "From SaaS platforms to internal tools and dashboards — we design, develop, and ship custom AI-powered software products built to scale from day one.",
        provider: {
          "@type": "Organization",
          name: "RemShield",
          url: "https://remshield.solutions",
        },
        url: "https://remshield.solutions/contact?service=custom-software",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="relative bg-navy overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <FloatingCTA />
      <Hero />
      <MarqueeTicker />
      <Services />
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
