"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  divider?: "blue" | "teal" | "none";
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  divider = "none",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {divider !== "none" && (
        <div className={`absolute top-0 left-0 right-0 h-px pointer-events-none section-divider-${divider}`} />
      )}
      {children}
    </motion.section>
  );
}
