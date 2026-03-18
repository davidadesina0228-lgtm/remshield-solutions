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

const capabilities = [
  { label: "AI Agents",     x: "37%", y: "5%",  accent: "#00D4C8", rgb: "0,212,200", fy: -9,  delay: 0   },
  { label: "Voice AI",      x: "3%",  y: "22%", accent: "#00AAFF", rgb: "0,170,255", fy: -7,  delay: 0.4 },
  { label: "Document AI",   x: "63%", y: "18%", accent: "#00D4C8", rgb: "0,212,200", fy: -8,  delay: 0.2 },
  { label: "CRM Flows",     x: "70%", y: "62%", accent: "#00AAFF", rgb: "0,170,255", fy: 7,   delay: 0.6 },
  { label: "Chatbots",      x: "3%",  y: "65%", accent: "#00D4C8", rgb: "0,212,200", fy: 8,   delay: 0.3 },
  { label: "Automation",    x: "33%", y: "85%", accent: "#00AAFF", rgb: "0,170,255", fy: 6,   delay: 0.5 },
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
              Build Smarter<br />
              <span className="gradient-text">Businesses</span><br />
              with AI
            </motion.h1>

            <motion.p variants={fade} className="text-base sm:text-lg text-silver/70 leading-relaxed">
              We design AI-powered software and automation systems that help
              companies scale faster, reduce manual work, and{" "}
              <span className="text-silver/90 font-medium">unlock new capabilities.</span>
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
                Book a Consultation
                <span className="text-white/70">→</span>
              </Link>
              <button
                onClick={() => { const el = document.querySelector("#services"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-silver/80 border border-white/10 hover:border-teal/30 hover:text-teal bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                See Our Services
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fade} className="flex items-center gap-5 pt-2 flex-wrap">
              {[
                { val: "50+", label: "Projects" },
                { val: "24/7", label: "AI Systems" },
                { val: "10x", label: "Faster" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-base font-bold text-teal">{s.val}</span>
                  <span className="text-silver/50 text-xs">{s.label}</span>
                </div>
              ))}
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1l1.545 3.09L12 4.636l-2.5 2.455.59 3.41L7 9l-3.09 1.5.59-3.41L2 4.636l3.455-.546L7 1z" fill="#00D4C8" opacity="0.9" />
                  </svg>
                ))}
                <span className="text-silver/50 text-xs ml-1">100% AI-Powered</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — capability network (no fake data) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end h-[420px] sm:h-[500px] lg:h-[560px]"
          >
            {/* Outer glow */}
            <div className="absolute inset-4 rounded-3xl pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,200,0.07) 0%, transparent 70%)",
              filter: "blur(24px)",
            }} />

            {/* Card */}
            <div
              className="relative w-full h-full rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(8,14,30,0.85) 0%, rgba(13,21,48,0.65) 100%)",
                border: "1px solid rgba(0,212,200,0.14)",
                boxShadow: "0 0 60px rgba(0,212,200,0.07), 0 0 120px rgba(0,170,255,0.04), inset 0 1px 0 rgba(0,212,200,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Ambient radial glow from center — ties chips together visually */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "50%", top: "47%",
                  transform: "translate(-50%, -50%)",
                  width: "75%", height: "70%",
                  background: "radial-gradient(ellipse, rgba(0,212,200,0.07) 0%, rgba(0,170,255,0.03) 40%, transparent 70%)",
                }}
              />

              {/* Central orb — RemShield core */}
              <motion.div
                className="absolute"
                style={{ left: "50%", top: "47%", transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0,212,200,0.15), 0 0 40px rgba(0,212,200,0.06)",
                      "0 0 32px rgba(0,212,200,0.28), 0 0 60px rgba(0,212,200,0.1)",
                      "0 0 20px rgba(0,212,200,0.15), 0 0 40px rgba(0,212,200,0.06)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(0,212,200,0.18) 0%, rgba(0,212,200,0.04) 70%, transparent 100%)",
                    border: "1px solid rgba(0,212,200,0.35)",
                  }}
                >
                  {/* Shield — RemShield brand mark */}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.35C17.25 23.15 21 18.25 21 13V7L12 2z"
                      stroke="#00D4C8"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      fill="rgba(0,212,200,0.1)"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="#00D4C8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Capability chips — float around the orb */}
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  className="absolute"
                  style={{ left: cap.x, top: cap.y }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + cap.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, cap.fy, 0] }}
                    transition={{
                      duration: 3.2 + i * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2 + cap.delay,
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: `rgba(${cap.rgb}, 0.08)`,
                      border: `1px solid rgba(${cap.rgb}, 0.22)`,
                      backdropFilter: "blur(8px)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cap.accent }}
                    />
                    <span
                      className="text-[11px] font-medium text-silver/80"
                      style={{ letterSpacing: "0.025em" }}
                    >
                      {cap.label}
                    </span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Bottom label — honest positioning statement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-5 left-0 right-0 flex justify-center"
              >
                <span className="text-[10px] text-silver/25 font-medium tracking-[0.12em] uppercase">
                  End-to-end AI engineering
                </span>
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
