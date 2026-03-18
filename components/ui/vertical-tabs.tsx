"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "01",
    title: "AI Systems",
    description:
      "Intelligent assistants, voice agents, document analysis, and custom AI copilots — built around your specific workflows and data.",
    accent: "#00D4C8",
    accentRgb: "0,212,200",
    href: "/contact?service=ai-systems",
    features: [
      "Custom AI chatbots & voice agents",
      "Document analysis & data extraction",
      "AI copilots integrated into your tools",
      "Connects to your existing stack",
    ],
  },
  {
    id: "02",
    title: "Automation Infrastructure",
    description:
      "End-to-end automation that connects your tools, qualifies leads, and runs your operations pipelines — without extra headcount.",
    accent: "#00AAFF",
    accentRgb: "0,170,255",
    href: "/contact?service=automation-infrastructure",
    features: [
      "End-to-end workflow automation",
      "CRM & lead qualification pipelines",
      "Multi-tool API orchestration",
      "Real-time operations monitoring",
    ],
  },
  {
    id: "03",
    title: "Custom Software",
    description:
      "SaaS platforms, internal tools, and AI-powered applications — designed, built, and shipped fast from day one.",
    accent: "#00D4C8",
    accentRgb: "0,212,200",
    href: "/contact?service=custom-software",
    features: [
      "SaaS platforms built AI-native",
      "Internal dashboards & portals",
      "AI-powered web applications",
      "Designed, built & shipped in weeks",
    ],
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const active = SERVICES[activeIndex];

  return (
    <section id="services" className="w-full bg-[#080E1E] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="mb-12">
              <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Three Pillars
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                What we<br />build for you
              </h2>
            </div>

            <div className="flex flex-col">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-white/[0.08] first:border-0",
                      isActive ? "text-white" : "text-silver/40 hover:text-silver/80"
                    )}
                  >
                    {/* Progress bar */}
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-white/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full origin-top"
                          style={{ background: service.accent }}
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[10px] font-medium mt-1 tabular-nums opacity-40 flex-shrink-0">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <span
                        className="text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-500"
                        style={isActive ? { color: service.accent } : {}}
                      >
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-silver/65 text-sm md:text-base leading-relaxed max-w-sm pb-2">
                              {service.description}
                            </p>
                            <a
                              href={service.href}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-colors duration-150"
                              style={{ color: service.accent }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Get started
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Feature card (no images) */}
          <div
            className="lg:col-span-7 order-1 lg:order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-8 sm:p-10"
                style={{
                  background: "linear-gradient(135deg, rgba(8,14,30,0.85) 0%, rgba(13,21,48,0.6) 100%)",
                  border: `1px solid rgba(${active.accentRgb},0.2)`,
                  boxShadow: `0 0 40px rgba(${active.accentRgb},0.06)`,
                  backdropFilter: "blur(12px)",
                  minHeight: "380px",
                }}
              >
                {/* Service number + accent line */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: active.accent }}
                  >
                    /{active.id}
                  </span>
                  <div className="h-px flex-1" style={{ background: `rgba(${active.accentRgb},0.2)` }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  {active.title}
                </h3>

                {/* Description */}
                <p className="text-silver/60 text-sm sm:text-base leading-relaxed mb-8">
                  {active.description}
                </p>

                {/* Feature list */}
                <div className="flex flex-col gap-3 mb-8">
                  {active.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `rgba(${active.accentRgb},0.12)` }}
                      >
                        <svg width="10" height="10" fill="none" stroke={active.accent} strokeWidth="2.5" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-silver/75 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={active.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: `rgba(${active.accentRgb},0.12)`,
                    border: `1px solid rgba(${active.accentRgb},0.25)`,
                    color: active.accent,
                  }}
                >
                  Start this project
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;
