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
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200",
    accent: "#00D4C8",
    accentRgb: "0,212,200",
    href: "/contact?service=ai-systems",
  },
  {
    id: "02",
    title: "Automation Infrastructure",
    description:
      "End-to-end automation that connects your tools, qualifies leads, and runs your operations pipelines — without extra headcount.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    accent: "#00AAFF",
    accentRgb: "0,170,255",
    href: "/contact?service=automation-infrastructure",
  },
  {
    id: "03",
    title: "Custom Software",
    description:
      "SaaS platforms, internal tools, and AI-powered applications — designed, built, and shipped fast from day one.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    accent: "#00D4C8",
    accentRgb: "0,212,200",
    href: "/contact?service=custom-software",
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  const active = SERVICES[activeIndex];

  return (
    <section className="w-full bg-[#080E1E] py-16 md:py-24">
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

          {/* Right: Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: "16/11",
                  border: `1px solid rgba(${active.accentRgb},0.2)`,
                  transition: "border-color 0.5s ease",
                }}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E]/50 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex gap-2 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-90 hover:bg-white/20"
                    style={{
                      background: "rgba(8,14,30,0.75)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                    }}
                    aria-label="Previous service"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-90 hover:bg-white/20"
                    style={{
                      background: "rgba(8,14,30,0.75)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                    }}
                    aria-label="Next service"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;
