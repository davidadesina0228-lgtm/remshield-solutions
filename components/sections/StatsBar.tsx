"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 24, suffix: "/7", label: "AI Systems Online" },
  { value: 10, suffix: "x", label: "Faster Delivery" },
  { value: 100, suffix: "%", label: "AI-Powered" },
];

export default function StatsBar() {
  return (
    <section className="relative py-10 border-y border-white/8 overflow-hidden">
      {/* Glow strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,212,200,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col items-center text-center lg:border-r lg:last:border-r-0 border-white/8 px-4"
            >
              <span
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #00AAFF, #00D4C8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1600}
                />
              </span>
              <span className="text-silver/55 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
