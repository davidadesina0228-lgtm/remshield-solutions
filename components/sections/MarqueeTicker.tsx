"use client";

import { motion } from "framer-motion";

// Tool/tech logos as clean SVG text badges — replace with real client logos later
const brands = [
  { name: "OpenAI", icon: "⬡" },
  { name: "Zapier", icon: "⚡" },
  { name: "Make.com", icon: "◎" },
  { name: "n8n", icon: "◈" },
  { name: "HubSpot", icon: "◉" },
  { name: "Notion", icon: "▣" },
  { name: "Slack", icon: "◆" },
  { name: "Airtable", icon: "⬟" },
  { name: "GPT-4o", icon: "◈" },
  { name: "Stripe", icon: "◇" },
  { name: "Webflow", icon: "◉" },
  { name: "Anthropic", icon: "⬡" },
];

// Duplicate for seamless loop
const doubled = [...brands, ...brands];

export default function MarqueeTicker() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.06]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080E1E 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080E1E 0%, transparent 100%)" }} />

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-silver/30 text-xs font-semibold tracking-[0.2em] uppercase mb-6"
      >
        Integrates with your existing stack
      </motion.p>

      {/* Marquee track */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-0 whitespace-nowrap">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="inline-flex items-center gap-2.5 mx-5 px-5 py-2.5 rounded-full border border-white/8 bg-white/[0.03] hover:border-teal/25 hover:bg-teal/5 transition-all duration-300 group cursor-default flex-shrink-0"
            >
              <span className="text-teal/50 text-sm group-hover:text-teal transition-colors duration-300">
                {brand.icon}
              </span>
              <span className="text-silver/50 text-sm font-medium group-hover:text-silver/80 transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
