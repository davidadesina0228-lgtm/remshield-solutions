"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls past 400px
      if (window.scrollY > 400 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= 400) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          {/* Main CTA pill */}
          <a
            href="/contact"
            className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
              boxShadow:
                "0 4px 24px rgba(0,170,255,0.35), 0 0 0 1px rgba(0,212,200,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
            </motion.span>
            <span>Book a Free Call</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-white/70">
              →
            </span>
          </a>

          {/* Dismiss button */}
          <button
            onClick={() => {
              setDismissed(true);
              setVisible(false);
            }}
            className="w-8 h-8 rounded-full bg-navy/80 backdrop-blur border border-white/10 flex items-center justify-center text-silver/50 hover:text-silver transition-colors duration-200"
            aria-label="Dismiss"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
