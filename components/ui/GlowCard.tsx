"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "teal";
  delay?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  delay = 0,
}: GlowCardProps) {
  const glowHover =
    glowColor === "blue"
      ? "hover:shadow-[0_0_30px_rgba(0,170,255,0.25),0_0_60px_rgba(0,170,255,0.1)] hover:border-electricBlue/30"
      : "hover:shadow-[0_0_30px_rgba(0,212,200,0.25),0_0_60px_rgba(0,212,200,0.1)] hover:border-teal/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 ${glowHover} ${className}`}
    >
      {children}
    </motion.div>
  );
}
