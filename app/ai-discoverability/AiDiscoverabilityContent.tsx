"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const TEAL = "#00D4C8";
const BLUE = "#00AAFF";
const TEAL_RGB = "0,212,200";
const BLUE_RGB = "0,170,255";

const capabilities = [
  {
    icon: "⬡",
    title: "Schema & Structured Data",
    desc: "Organization, Service, FAQ, Product, and WebAPI schemas wired together from a single canonical source — not copy-pasted HTML.",
    accent: TEAL_RGB,
  },
  {
    icon: "⟁",
    title: "AI-Readable Feeds",
    desc: "Public JSON endpoints for company facts, services, products, FAQs, policies, and contact data. Always in sync with your source of truth.",
    accent: BLUE_RGB,
  },
  {
    icon: "⊞",
    title: "Full Snapshot Feed",
    desc: "One URL returns a complete, versioned package of all approved public business data. Ideal for AI crawlers, aggregators, and partner integrations.",
    accent: TEAL_RGB,
  },
  {
    icon: "⟳",
    title: "Changes Feed",
    desc: "A versioned changelog that tells AI tools exactly what changed, when. Critical for businesses where prices, availability, or services update frequently.",
    accent: BLUE_RGB,
  },
  {
    icon: "⧉",
    title: "OpenAPI Documentation",
    desc: "Machine-readable API description so AI tools, developers, and partner systems understand exactly how to query your data layer.",
    accent: TEAL_RGB,
  },
  {
    icon: "⬡",
    title: "MCP-Style Connector",
    desc: "A read-only connector manifest that describes your public data tools in a format AI agents and orchestration systems already understand.",
    accent: BLUE_RGB,
  },
  {
    icon: "✦",
    title: "llms.txt & Crawler Policy",
    desc: "An updated llms.txt pointing AI crawlers to every feed, endpoint, and key page — so nothing important gets missed during indexing.",
    accent: TEAL_RGB,
  },
  {
    icon: "◎",
    title: "Health & Monitoring",
    desc: "A live health feed with freshness timestamps, status checks, and a public security policy explaining exactly what data is shared — and what isn't.",
    accent: BLUE_RGB,
  },
];

const steps = [
  {
    num: "01",
    title: "Audit",
    tagline: "Map what you have before building anything.",
    detail: "We review your website platform, CMS, booking system, CRM, catalogue, spreadsheets, and APIs to understand where your data lives and how it flows.",
    accent: TEAL_RGB,
  },
  {
    num: "02",
    title: "Classify Data",
    tagline: "Decide what's public, protected, and private.",
    detail: "Every field gets a classification: Public (safe for anyone), Protected (authenticated only), or Private (never exposed). No guesswork on what gets shared.",
    accent: BLUE_RGB,
  },
  {
    num: "03",
    title: "Build Canonical Model",
    tagline: "One source of truth for all your business facts.",
    detail: "Services, products, packages, locations, prices, availability, FAQs, policies, and contact data — modelled once, used everywhere.",
    accent: TEAL_RGB,
  },
  {
    num: "04",
    title: "Improve Website Signals",
    tagline: "Make existing pages work harder for AI.",
    detail: "Schema enrichment, page structure improvements, entity consistency, internal linking, and llms.txt — so AI tools can trust what your pages already say.",
    accent: BLUE_RGB,
  },
  {
    num: "05",
    title: "Add Feeds",
    tagline: "Public JSON for stable and changing data.",
    detail: "Full snapshot for large datasets. Update feeds for prices, availability, or inventory. Versioned changelogs so AI tools know what changed.",
    accent: TEAL_RGB,
  },
  {
    num: "06",
    title: "Add API Layer",
    tagline: "Structured endpoints with OpenAPI documentation.",
    detail: "Read-only API routes for approved data, complete with OpenAPI specs, caching, and validation. Developers and AI tools get the same clean interface.",
    accent: BLUE_RGB,
  },
  {
    num: "07",
    title: "Add Agent Layer",
    tagline: "Let AI agents query your data safely.",
    detail: "An MCP-style manifest describing your public tools in a format AI agents already understand. Read-only access first; authenticated access only where needed.",
    accent: TEAL_RGB,
  },
  {
    num: "08",
    title: "Secure & Monitor",
    tagline: "Logs, rate limits, and regular health checks.",
    detail: "Access rules, data filters, rate limiting, freshness monitoring, and a public security policy so your team always knows what's exposed.",
    accent: BLUE_RGB,
  },
];

const industries = [
  { label: "Travel & Tourism", icon: "✈" },
  { label: "Hotels & Hospitality", icon: "🏨" },
  { label: "Clinics & Healthcare", icon: "⚕" },
  { label: "Event Venues", icon: "◉" },
  { label: "E-commerce & Retail", icon: "⬡" },
  { label: "Course Providers", icon: "◈" },
  { label: "Real Estate", icon: "⊞" },
  { label: "SaaS Products", icon: "⟁" },
  { label: "Service Businesses", icon: "✦" },
  { label: "Restaurants & Food", icon: "◎" },
  { label: "Logistics & Freight", icon: "⬡" },
  { label: "Professional Services", icon: "⧉" },
];

const proofEndpoints = [
  { label: "Full Snapshot", path: "/api/ai-discovery/snapshot" },
  { label: "Company Feed", path: "/api/ai-discovery/company" },
  { label: "Services Feed", path: "/api/ai-discovery/services" },
  { label: "OpenAPI Spec", path: "/api/ai-discovery/openapi" },
  { label: "MCP Manifest", path: "/api/ai-discovery/mcp" },
  { label: "Health Feed", path: "/api/ai-discovery/health" },
];

export default function AiDiscoverabilityContent() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(0,212,200,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full mb-6"
              style={{
                background: `rgba(${TEAL_RGB},0.1)`,
                border: `1px solid rgba(${TEAL_RGB},0.2)`,
                color: TEAL,
              }}
            >
              New Pilot Service
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Make your business{" "}
              <span
                className="inline-block"
                style={{
                  background: `linear-gradient(90deg, ${TEAL} 0%, ${BLUE} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                visible to AI
              </span>
            </h1>

            <p className="text-silver/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              AI search engines, agents, and tools are replacing traditional search — but most
              businesses aren't built for them to read. We add the structured data layer, public
              feeds, OpenAPI docs, and agent-ready connectors that let AI systems find, trust,
              and cite your business accurately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?service=ai-discoverability"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`,
                  boxShadow: `0 4px 24px rgba(${TEAL_RGB},0.25), 0 0 0 1px rgba(${TEAL_RGB},0.15)`,
                }}
              >
                Book a Pilot Call →
              </Link>
              <a
                href="/api/ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white/8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${TEAL_RGB},0.18)`,
                  color: `rgba(${TEAL_RGB},0.9)`,
                }}
              >
                View Live Demo ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem strip ── */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { val: "~50%", label: "of searches now answered by AI without a click" },
              { val: "3×", label: "more likely to be cited if you have structured feeds" },
              { val: "< 4 wks", label: "typical delivery for the full discovery layer" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="text-3xl font-black"
                  style={{ color: i % 2 === 0 ? TEAL : BLUE }}
                >
                  {stat.val}
                </span>
                <span className="text-silver/50 text-sm max-w-[180px] leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              What&apos;s Included
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
              Eight technical components.
              <br className="hidden sm:block" />
              One coherent AI layer.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${cap.accent},0.12)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.07)";
                  el.style.borderColor = `rgba(${cap.accent},0.28)`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = `rgba(${cap.accent},0.12)`;
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    background: `rgba(${cap.accent},0.08)`,
                    color: `rgb(${cap.accent})`,
                    border: `1px solid rgba(${cap.accent},0.15)`,
                  }}
                >
                  {cap.icon}
                </span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{cap.title}</h3>
                  <p className="text-silver/55 text-xs leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8-Step Process ── */}
      <section
        className="py-24"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,170,255,0.03) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
              From audit to agent-ready
              <br className="hidden sm:block" />
              in eight steps.
            </h2>
            <p className="text-silver/55 text-base mt-4 max-w-xl leading-relaxed">
              We handle everything technical. You just provide access and approve what gets shared.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl p-6 flex gap-5 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${step.accent},0.1)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.borderColor = `rgba(${step.accent},0.22)`;
                  el.style.boxShadow = `0 4px 24px rgba(${step.accent},0.07)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = `rgba(${step.accent},0.1)`;
                  el.style.boxShadow = "none";
                }}
              >
                <span
                  className="text-4xl font-black leading-none select-none flex-shrink-0 mt-0.5"
                  style={{ color: `rgba(${step.accent},0.2)` }}
                >
                  {step.num}
                </span>
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5"
                    style={{ color: `rgba(${step.accent},0.55)` }}
                  >
                    Step {step.num}
                  </p>
                  <h3 className="text-white font-bold text-base mb-0.5">{step.title}</h3>
                  <p
                    className="text-xs italic mb-2"
                    style={{ color: `rgb(${step.accent})`, opacity: 0.7 }}
                  >
                    {step.tagline}
                  </p>
                  <p className="text-silver/55 text-xs leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Who It&apos;s For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Any business where AI tools should be able
              <br className="hidden sm:block" />
              to find and trust your data.
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${i % 2 === 0 ? TEAL_RGB : BLUE_RGB},0.18)`,
                  color: "rgba(200,214,229,0.85)",
                }}
              >
                <span style={{ color: i % 2 === 0 ? TEAL : BLUE }}>{ind.icon}</span>
                {ind.label}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Proof ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Live Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              RemShield runs on this layer right now.
            </h2>
            <p className="text-silver/55 text-base max-w-xl mx-auto leading-relaxed">
              Every endpoint below is live. You can query them, share them with AI tools, or use
              them to verify exactly what gets exposed before your client&apos;s pilot goes live.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {proofEndpoints.map((ep, i) => (
              <motion.a
                key={i}
                href={ep.path}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-250"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${TEAL_RGB},0.12)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.07)";
                  el.style.borderColor = `rgba(${TEAL_RGB},0.28)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = `rgba(${TEAL_RGB},0.12)`;
                }}
              >
                <div>
                  <p className="text-white text-sm font-semibold">{ep.label}</p>
                  <p className="text-silver/40 text-xs font-mono mt-0.5">{ep.path}</p>
                </div>
                <span
                  className="text-xs font-bold ml-3 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ color: TEAL }}
                >
                  ↗
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <a
              href="/api/ai-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-silver/40 hover:text-teal transition-colors duration-200"
            >
              View full discovery index →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl p-10 sm:p-14 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,200,0.07) 0%, rgba(0,170,255,0.07) 100%)",
              border: `1px solid rgba(${TEAL_RGB},0.18)`,
              boxShadow: `0 0 60px rgba(${TEAL_RGB},0.07)`,
            }}
          >
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Pilot — Limited Spots
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to become
              <br />
              AI-discoverable?
            </h2>
            <p className="text-silver/55 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              We&apos;re running a limited pilot with early clients. Book a free 30-minute call —
              we&apos;ll audit your site, show you exactly what&apos;s missing, and give you a
              clear implementation plan.
            </p>
            <Link
              href="/contact?service=ai-discoverability"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`,
                boxShadow: `0 4px 28px rgba(${TEAL_RGB},0.28)`,
              }}
            >
              Book a Pilot Call →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
