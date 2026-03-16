"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 94,
    suffix: "%",
    label: "of employees waste time on tasks that AI can automate",
    source: "Smartsheet Research",
    accent: "teal",
  },
  {
    value: 40,
    suffix: "%",
    label: "average reduction in operational costs from AI automation",
    source: "Deloitte Insights",
    accent: "blue",
  },
  {
    value: 270,
    suffix: "%",
    label: "growth in enterprise AI adoption over the past 4 years",
    source: "Gartner",
    accent: "teal",
  },
  {
    value: 88,
    suffix: "%",
    label: "of users won't return to a site after one bad experience",
    source: "Google UX Research",
    accent: "blue",
  },
  {
    value: 35,
    suffix: "x",
    label: "more business growth for companies with a defined AI strategy",
    source: "McKinsey & Co.",
    accent: "teal",
  },
  {
    value: 374,
    suffix: "B",
    prefix: "$",
    label: "projected global SaaS market size by 2026",
    source: "Gartner Forecast",
    accent: "blue",
  },
];

const insight = {
  headline: "AI is not the future. It's the present competitive advantage.",
  body: "Businesses that adopt AI today aren't just saving time — they're compounding advantages that will be nearly impossible for late adopters to catch up with. The cost of waiting is rising every quarter.",
};

export default function IndustryStats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,200,0.03) 0%, transparent 65%)",
        }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,200,0.25), rgba(0,170,255,0.25), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Industry Data
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The numbers don&apos;t lie
          </h2>
          <p className="text-silver/55 text-lg max-w-xl mx-auto">
            Here&apos;s why thousands of businesses are making the move to AI right now.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => {
            const isTeal = s.accent === "teal";
            const accentColor = isTeal ? "#00D4C8" : "#00AAFF";
            const accentRgb = isTeal ? "0,212,200" : "0,170,255";

            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl p-6 flex flex-col gap-3 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(13,21,48,0.9) 0%, rgba(8,14,30,0.95) 100%)",
                  border: `1px solid rgba(${accentRgb},0.12)`,
                }}
              >
                {/* Glow corner */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, rgba(${accentRgb},0.12) 0%, transparent 70%)`,
                  }}
                />

                {/* Big number */}
                <span
                  className="text-5xl font-black leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, #fff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix ?? ""}
                    duration={1600}
                  />
                </span>

                {/* Label */}
                <p className="text-silver/75 text-sm leading-snug">{s.label}</p>

                {/* Source */}
                <p className="text-[10px] font-semibold tracking-widest uppercase mt-auto" style={{ color: `rgba(${accentRgb},0.5)` }}>
                  Source: {s.source}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Insight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-2xl p-8 sm:p-10 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,200,0.07) 0%, rgba(0,170,255,0.04) 50%, rgba(8,14,30,0.9) 100%)",
            border: "1px solid rgba(0,212,200,0.15)",
          }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
            style={{ background: "linear-gradient(180deg, #00D4C8, #00AAFF)" }}
          />

          <div className="pl-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-white font-bold text-lg sm:text-xl leading-snug mb-2">
                {insight.headline}
              </p>
              <p className="text-silver/60 text-sm leading-relaxed">{insight.body}</p>
            </div>
            <a
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
                boxShadow: "0 4px 20px rgba(0,212,200,0.25)",
              }}
            >
              Start Today →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,170,255,0.25), rgba(0,212,200,0.25), transparent)",
        }}
      />
    </section>
  );
}
