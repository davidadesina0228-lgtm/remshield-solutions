"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,170,255,0.12) 0%, rgba(17,34,85,0.8) 40%, rgba(0,212,200,0.12) 100%)",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,170,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,200,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Border lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,170,255,0.5), rgba(0,212,200,0.5), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,200,0.5), rgba(0,170,255,0.5), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electricBlue/10 border border-electricBlue/30 mb-6"
          style={{ boxShadow: "0 0 30px rgba(0,170,255,0.2)" }}
        >
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="w-7 h-7 text-electricBlue"
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          One conversation. A clear picture of{" "}
          <span className="gradient-text">what AI can do for your business.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-silver/75 max-w-xl mx-auto mb-10"
        >
          In 30 minutes, we&apos;ll map your highest-ROI AI opportunities and give you
          a clear action plan — no pitch, no pressure.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.04] group"
            style={{
              background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
              boxShadow: "0 4px 28px rgba(0,170,255,0.3), 0 0 0 1px rgba(0,212,200,0.2)",
            }}
          >
            Book My Free Strategy Call
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-6 text-silver/60 text-sm"
        >
          Free. No commitment. No credit card.
        </motion.p>
      </div>
    </section>
  );
}
