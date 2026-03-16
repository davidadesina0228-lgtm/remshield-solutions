"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Link from "next/link";

const bentoItems = [
  {
    type: "stat",
    stat: { target: 50, suffix: "+", label: "Projects Delivered" },
    accent: "teal",
    span: "col-span-1",
  },
  {
    type: "feature",
    title: "AI Engineering, Not AI Add-Ons",
    body: "Enterprise AI adoption has grown 270% in 4 years — but most agencies still bolt AI onto legacy processes. We're an AI engineering studio: every system is designed AI-native from the ground up, so you capture the full advantage, not a fraction of it.",
    accent: "blue",
    span: "col-span-1 md:col-span-2",
  },
  {
    type: "stat",
    stat: { target: 10, suffix: "x", label: "Faster Delivery" },
    accent: "blue",
    span: "col-span-1",
  },
  {
    type: "stat",
    stat: { target: 100, suffix: "%", label: "AI-Powered" },
    accent: "teal",
    span: "col-span-1",
  },
  {
    type: "stat",
    stat: { target: 24, suffix: "/7", label: "Systems Online" },
    accent: "blue",
    span: "col-span-1",
  },
  {
    type: "feature",
    title: "You Describe Outcomes. We Build Systems.",
    body: "94% of employees waste time on tasks AI can automate — yet most businesses don't know where to start. We handle all the technical complexity. You describe what you need; we engineer the system that delivers it.",
    accent: "teal",
    span: "col-span-1 md:col-span-2",
  },
  {
    type: "cta",
    title: "Ready to scale with AI?",
    accent: "teal",
    span: "col-span-1",
  },
];

export default function WhyRemShield() {
  return (
    <section id="why" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-electricBlue text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Why RemShield
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            The RemShield<br className="hidden sm:block" /> Advantage
          </h2>
        </motion.div>

        {/* Bento grid — 3 cols, clean rows: [1+2], [1+1+1], [2+1] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bentoItems.map((item, i) => {
            const isTeal = item.accent === "teal";
            const accentColor = isTeal ? "#00D4C8" : "#00AAFF";
            const accentRgb = isTeal ? "0,212,200" : "0,170,255";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl overflow-hidden ${item.span}`}
                style={{
                  background: "linear-gradient(135deg, rgba(13,21,48,0.95) 0%, rgba(8,14,30,0.98) 100%)",
                  border: `1px solid rgba(${accentRgb},0.1)`,
                  minHeight: item.type === "stat" ? "140px" : item.type === "cta" ? "140px" : "180px",
                }}
              >
                {item.type === "stat" && item.stat && (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
                    {/* Background number glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <span className="text-8xl font-black" style={{ color: accentColor }}>
                        {item.stat.target}
                      </span>
                    </div>
                    <span
                      className="text-4xl sm:text-5xl font-black leading-none mb-2 relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}, #fff)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <AnimatedCounter target={item.stat.target} suffix={item.stat.suffix} duration={1800} />
                    </span>
                    <span className="text-silver/65 text-xs font-medium tracking-wide relative z-10">
                      {item.stat.label}
                    </span>
                    {/* Corner glow */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full pointer-events-none opacity-20"
                      style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.4) 0%, transparent 70%)` }} />
                  </div>
                )}

                {item.type === "feature" && (
                  <div className="h-full flex flex-col gap-3 p-6 justify-center">
                    <div className="w-8 h-0.5 rounded-full" style={{ background: accentColor }} />
                    <h3 className="text-white font-bold text-base leading-snug">{item.title}</h3>
                    <p className="text-silver/70 text-sm leading-relaxed">{item.body}</p>
                  </div>
                )}

                {item.type === "cta" && (
                  <div className="h-full flex flex-col items-start justify-center gap-4 p-6"
                    style={{ background: `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, rgba(${accentRgb},0.02) 100%)` }}>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-silver/65 text-sm">Book a free 30-minute strategy call.</p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04]"
                      style={{
                        background: `linear-gradient(135deg, #00AAFF 0%, ${accentColor} 100%)`,
                        boxShadow: `0 4px 16px rgba(${accentRgb},0.25)`,
                      }}
                    >
                      Get in Touch →
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
