"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; color: string; opacity: number;
}

const TERMINAL_LINES = [
  { text: "$ remshield deploy --type=ai-agent",   color: "#C8D6E5", delay: 0.6  },
  { text: "",                                      color: "",        delay: 0.95 },
  { text: "  ✓  Mapped your existing workflows",  color: "#00D4C8", delay: 1.15 },
  { text: "  ✓  Trained on your data",            color: "#00D4C8", delay: 1.55 },
  { text: "  ✓  Connected your integrations",     color: "#00D4C8", delay: 1.95 },
  { text: "  ✓  Tested edge cases & fallbacks",   color: "#00D4C8", delay: 2.35 },
  { text: "  ✓  Shipped to production",           color: "#00D4C8", delay: 2.75 },
  { text: "",                                      color: "",        delay: 3.05 },
  { text: "  → Agent is live.",                   color: "#00AAFF", delay: 3.2  },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#00D4C8", "#00AAFF", "#00E0D0", "#0a2a5a"];
    const PARTICLE_COUNT = 35;
    const CONN_DIST = 100;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      if (!isVisibleRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particlesRef.current;
      p.forEach((pt) => {
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color; ctx.globalAlpha = pt.opacity; ctx.fill(); ctx.globalAlpha = 1;
      });
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            ctx.beginPath(); ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y);
            ctx.strokeStyle = `rgba(0,212,200,${(1 - dist / CONN_DIST) * 0.18})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) { cancelAnimationFrame(animFrameRef.current); draw(); }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, []);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#00D4C8" />

      {/* Radial overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          "radial-gradient(ellipse 65% 70% at 20% 50%, rgba(0,212,200,0.06) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 60% at 80% 40%, rgba(0,170,255,0.04) 0%, transparent 55%)",
          "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(8,14,30,0) 0%, rgba(8,14,30,0.85) 100%)",
        ].join(","),
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(0,212,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,200,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">

          {/* LEFT — text */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6 max-w-xl">

            <motion.div variants={fade}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/25 bg-teal/8 text-teal text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                AI Engineering Studio
              </span>
            </motion.div>

            <motion.h1 variants={fade} className="text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] font-bold leading-[1.06] tracking-tight text-white">
              Your business<br />
              <span className="gradient-text">shouldn&apos;t run</span><br />
              on manual work.
            </motion.h1>

            <motion.p variants={fade} className="text-base sm:text-lg text-silver/70 leading-relaxed">
              We build the AI systems you&apos;ve been meaning to build —
              agents that handle leads and customer queries around the clock, automation that
              eliminates the manual work slowing your team down, and{" "}
              <span className="text-silver/90 font-medium">software designed around how your business actually runs.</span>
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap gap-3 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04] hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
                  boxShadow: "0 4px 24px rgba(0,212,200,0.3), 0 0 0 1px rgba(0,212,200,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                Get My Free AI Roadmap
                <span className="text-white/70">→</span>
              </Link>
              <button
                onClick={() => { const el = document.querySelector("#services"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-silver/80 border border-white/10 hover:border-teal/30 hover:text-teal bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                See What We Build
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fade} className="flex items-center gap-5 pt-2 flex-wrap">
              {[
                { val: "50+", label: "Systems Deployed" },
                { val: "2–6wk", label: "Delivery Time" },
                { val: "40%", label: "Avg Cost Reduction" },
                { val: "24/7", label: "Agents Run" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-base font-bold text-teal">{s.val}</span>
                  <span className="text-silver/50 text-xs">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — code terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end h-[420px] sm:h-[480px] lg:h-[520px]"
          >
            {/* Ambient glow behind terminal */}
            <div className="absolute inset-8 rounded-3xl pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,212,200,0.08) 0%, transparent 70%)",
              filter: "blur(28px)",
            }} />

            {/* Terminal window */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "rgba(4, 8, 18, 0.96)",
                border: "1px solid rgba(0,212,200,0.18)",
                boxShadow: "0 0 50px rgba(0,212,200,0.07), 0 0 100px rgba(0,170,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
              >
                {/* Traffic lights */}
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28CA41" }} />
                <span className="text-[11px] text-silver/25 font-mono ml-2 tracking-wide">
                  remshield — deploy
                </span>
              </div>

              {/* Terminal body */}
              <div className="flex-1 px-5 py-5 font-mono text-[13px] sm:text-[14px] leading-7 overflow-hidden">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: line.delay, duration: 0.3, ease: "easeOut" }}
                  >
                    {line.text === "" ? (
                      <div className="h-2" />
                    ) : (
                      <span style={{ color: line.color || "#C8D6E5" }}>{line.text}</span>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.55, duration: 0.2 }}
                  className="inline-flex items-center gap-1 mt-1"
                >
                  <span className="text-silver/30">  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                    className="inline-block w-2 h-[1.1em] align-middle"
                    style={{ background: "#00D4C8", borderRadius: "1px" }}
                  />
                </motion.div>
              </div>

              {/* Bottom bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.7, duration: 0.5 }}
                className="flex items-center justify-between px-4 py-2 flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,212,200,0.04)" }}
              >
                <span className="text-[10px] font-mono" style={{ color: "#00D4C8" }}>● LIVE</span>
                <span className="text-[10px] font-mono text-silver/25">remshield.solutions</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #080E1E 0%, transparent 100%)" }} />
    </section>
  );
}
