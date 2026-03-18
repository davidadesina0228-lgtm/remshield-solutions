import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "About — RemShield AI Engineering Studio",
  description:
    "RemShield is an AI engineering studio founded in 2025 by David Adesina. We design and build AI systems, automation infrastructure, and custom software for growing businesses.",
  alternates: { canonical: "https://remshield.solutions/about" },
  openGraph: {
    title: "About RemShield — AI Engineering Studio",
    description:
      "RemShield is an AI engineering studio founded in 2025 by David Adesina. We design and build AI systems, automation infrastructure, and custom software for growing businesses.",
    url: "https://remshield.solutions/about",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About RemShield",
  url: "https://remshield.solutions/about",
  description:
    "RemShield is an AI engineering studio that designs and builds AI-powered software, automation systems, and custom AI solutions for growing businesses.",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://remshield.solutions/#organization",
    name: "RemShield",
    url: "https://remshield.solutions",
    description: "AI engineering studio that designs and builds intelligent software, automation systems, and custom AI solutions for growing businesses.",
    foundingDate: "2025",
    foundingLocation: { "@type": "Place", addressCountry: "NG" },
    areaServed: "Worldwide",
    knowsAbout: ["AI engineering", "AI automation", "AI agents", "custom software development", "business process automation"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@remshield.solutions",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.linkedin.com/in/david-adesina-ai/",
    ],
    founder: {
      "@id": "https://remshield.solutions/#founder",
    },
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://remshield.solutions/#founder",
  name: "David Adesina",
  jobTitle: "Founder & AI Engineer",
  url: "https://remshield.solutions/about",
  worksFor: {
    "@id": "https://remshield.solutions/#organization",
  },
  knowsAbout: [
    "AI engineering",
    "AI automation",
    "large language models",
    "AI agents",
    "business process automation",
    "custom software development",
  ],
  sameAs: [
    "https://www.linkedin.com/in/david-adesina-ai/",
  ],
  description: "David Adesina is the founder of RemShield, an AI engineering studio in Nigeria. He builds intelligent software, automation infrastructure, and custom AI solutions for growth-stage businesses globally.",
};

const services = [
  {
    title: "AI Systems",
    desc: "Intelligent assistants, voice agents, document analysis, and custom AI copilots built for your specific workflows.",
    color: "teal" as const,
  },
  {
    title: "Automation Infrastructure",
    desc: "Workflow automation, CRM pipelines, and operations infrastructure that removes manual work permanently.",
    color: "blue" as const,
  },
  {
    title: "Custom Software",
    desc: "SaaS platforms, internal tools, and AI-powered applications — engineered from the ground up to scale.",
    color: "teal" as const,
  },
];

const stats = [
  { stat: "2025", label: "Founded" },
  { stat: "3", label: "Core Services" },
  { stat: "AI-Native", label: "Approach" },
  { stat: "Nigeria", label: "Headquarters" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {/* Top glow line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,200,0.3), transparent)",
            }}
          />

          <span className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4">
            About
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            We build AI systems
            <br />
            <span className="gradient-text">that actually work.</span>
          </h1>
          <p className="text-silver/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
            RemShield is an AI engineering studio. We design and build intelligent
            software, automation infrastructure, and custom AI solutions — engineered
            from the ground up for growing businesses.
          </p>
        </section>

        {/* Founder */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/assets/david-adesina.png"
                    alt="David Adesina — Founder, RemShield"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  David Adesina
                </h2>
                <p className="text-teal text-sm font-semibold mb-1">
                  Founder, RemShield
                </p>
                <p className="text-silver/50 text-xs mb-5">
                  Nigeria · Founded RemShield in 2025
                </p>
                <p className="text-silver/70 leading-relaxed mb-4">
                  David is the founder of RemShield. He started the studio after
                  recognising a clear gap in the market: most businesses want to adopt
                  AI but don&apos;t have the technical depth to build it properly.
                  RemShield exists to close that gap — delivering AI systems,
                  automation infrastructure, and custom software that are engineered to
                  last.
                </p>
                <p className="text-silver/70 leading-relaxed mb-6">
                  The studio was built on a simple conviction: AI adoption is no longer
                  optional for companies that want to scale. The question is not whether
                  to build AI into your business — it&apos;s whether to do it right.
                </p>
                <a
                  href="https://www.linkedin.com/in/david-adesina-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-electricBlue hover:text-teal transition-colors duration-200"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ stat, label }) => (
              <div
                key={label}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center"
              >
                <p className="text-teal font-bold text-xl mb-1">{stat}</p>
                <p className="text-silver/60 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Build */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">What We Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map(({ title, desc, color }) => (
              <div
                key={title}
                className="bg-white/[0.03] rounded-2xl p-6 border"
                style={{
                  borderColor:
                    color === "teal"
                      ? "rgba(0,212,200,0.15)"
                      : "rgba(0,170,255,0.15)",
                }}
              >
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: color === "teal" ? "#00D4C8" : "#00AAFF" }}
                >
                  {title}
                </h3>
                <p className="text-silver/65 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,200,0.07) 0%, rgba(13,21,48,0.95) 100%)",
              border: "1px solid rgba(0,212,200,0.2)",
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to build with AI?
            </h2>
            <p className="text-silver/65 text-sm mb-6 max-w-sm mx-auto">
              Book a free 30-minute strategy call and let&apos;s design the AI systems
              that will power your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
                boxShadow: "0 4px 20px rgba(0,170,255,0.25)",
              }}
            >
              Book a Free Consultation →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
