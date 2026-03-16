"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faGears, faCode, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const services = [
  {
    num: "01",
    slug: "ai-systems",
    icon: faBrain,
    title: "AI Systems",
    short: "Automate thinking. Not just tasks.",
    description:
      "Intelligent systems that handle complex decisions and support your team — AI assistants, customer support agents, voice agents, document analysis, and custom AI copilots built for your workflows.",
    tags: ["AI Assistants", "Voice Agents", "Document AI"],
    statVal: "270%",
    statLabel: "growth in enterprise AI adoption over 4 years",
    accent: "teal",
    span: "lg:col-span-2",
  },
  {
    num: "02",
    slug: "automation-infrastructure",
    icon: faGears,
    title: "Automation Infrastructure",
    short: "Remove manual work. Permanently.",
    description:
      "We design automation infrastructure that connects your tools, qualifies leads, and runs your operations pipelines — without hiring more people.",
    tags: ["Workflow Automation", "CRM Automation", "Ops Pipelines"],
    statVal: "40%",
    statLabel: "avg. operational cost reduction",
    accent: "blue",
    span: "lg:col-span-1",
  },
  {
    num: "03",
    slug: "custom-software",
    icon: faCode,
    title: "Custom Software",
    short: "Built for your business. Powered by AI.",
    description:
      "From SaaS platforms to internal tools and dashboards — we design, develop, and ship custom AI-powered software products built to scale from day one.",
    tags: ["SaaS Platforms", "Internal Tools", "AI-Powered Apps"],
    statVal: "$374B",
    statLabel: "projected SaaS market size by 2026",
    accent: "teal",
    span: "md:col-span-2 lg:col-span-3",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              What We Build
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Three pillars.<br className="hidden sm:block" />
              One AI engineering studio.
            </h2>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 text-teal text-sm font-semibold hover:text-teal/80 transition-colors duration-200"
          >
            Get in Touch <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const isTeal = s.accent === "teal";
            const accentColor = isTeal ? "#00D4C8" : "#00AAFF";
            const accentRgb = isTeal ? "0,212,200" : "0,170,255";
            const isFullWidth = s.span.includes("lg:col-span-3");

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-2xl p-7 flex ${isFullWidth ? "flex-col sm:flex-row sm:gap-10" : "flex-col"} gap-5 cursor-default transition-all duration-400 ${s.span}`}
                style={{
                  background: "linear-gradient(135deg, rgba(13,21,48,0.9) 0%, rgba(8,14,30,0.95) 100%)",
                  border: `1px solid rgba(${accentRgb},0.12)`,
                  boxShadow: `0 2px 20px rgba(0,0,0,0.3)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${accentRgb},0.3)`;
                  el.style.boxShadow = `0 8px 40px rgba(${accentRgb},0.1), 0 2px 20px rgba(0,0,0,0.3)`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${accentRgb},0.12)`;
                  el.style.boxShadow = "0 2px 20px rgba(0,0,0,0.3)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Step number — large background watermark */}
                <span
                  className="absolute top-5 right-6 text-6xl font-black select-none leading-none"
                  style={{ color: `rgba(${accentRgb},0.08)` }}
                >
                  {s.num}
                </span>

                {/* Left / main column */}
                <div className={`flex flex-col gap-5 ${isFullWidth ? "flex-1" : ""}`}>
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `rgba(${accentRgb},0.1)`,
                      border: `1px solid rgba(${accentRgb},0.2)`,
                      boxShadow: `0 0 16px rgba(${accentRgb},0.12)`,
                    }}
                  >
                    <FontAwesomeIcon icon={s.icon} className="w-4 h-4" style={{ color: accentColor }} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: `rgba(${accentRgb},0.6)` }}>
                      {s.num}
                    </p>
                    <h3 className="text-xl font-bold text-white">{s.title}</h3>
                    <p className="text-sm font-medium" style={{ color: accentColor }}>{s.short}</p>
                  </div>

                  <p className="text-silver/60 text-sm leading-relaxed flex-1">{s.description}</p>
                </div>

                {/* Right / action column */}
                <div className={`flex flex-col gap-4 ${isFullWidth ? "sm:w-72 flex-shrink-0" : ""}`}>
                  {/* Industry stat badge */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: `rgba(${accentRgb},0.06)`,
                      border: `1px solid rgba(${accentRgb},0.12)`,
                    }}
                  >
                    <span className="text-2xl font-black leading-none" style={{ color: accentColor }}>
                      {s.statVal}
                    </span>
                    <span className="text-silver/50 text-xs leading-snug">{s.statLabel}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `rgba(${accentRgb},0.08)`,
                          color: `rgba(${accentRgb},0.8)`,
                          border: `1px solid rgba(${accentRgb},0.12)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Get started link */}
                  <Link
                    href={`/contact?service=${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5 mt-auto"
                    style={{ color: accentColor }}
                  >
                    Get started
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
