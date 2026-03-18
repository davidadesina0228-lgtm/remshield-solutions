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

  const metrics = [
    { label: "Tasks Automated", value: "2,847", sub: "+12% this week", accent: "#00D4C8", rgb: "0,212,200" },
    { label: "Response Time", value: "<180ms", sub: "avg latency", accent: "#00AAFF", rgb: "0,170,255" },
    { label: "Cost Reduction", value: "40%", sub: "vs traditional ops", accent: "#00D4C8", rgb: "0,212,200" },
    { label: "System Uptime", value: "99.9%", sub: "30-day average", accent: "#00AAFF", rgb: "0,170,255" },
  ];

  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#00D4C8" />

      {/* Deep radial overlays */}
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

            {/* Mini trust row */}
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

          {/* RIGHT — AI dashboard (pure CSS, zero external resources) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end h-[420px] sm:h-[500px] lg:h-[560px]"
          >
            {/* Glow behind card */}
            <div className="absolute inset-4 rounded-3xl pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,200,0.08) 0%, transparent 70%)",
              filter: "blur(24px)",
            }} />

            {/* Dashboard card */}
            <div
              className="relative w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(8,14,30,0.85) 0%, rgba(13,21,48,0.65) 100%)",
                border: "1px solid rgba(0,212,200,0.15)",
                boxShadow: "0 0 60px rgba(0,212,200,0.08), 0 0 120px rgba(0,170,255,0.04), inset 0 1px 0 rgba(0,212,200,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal text-xs font-semibold tracking-wide">AI Systems Active</span>
                </div>
                <span className="text-silver/25 text-[10px] font-mono">v2.4.1</span>
              </motion.div>

              {/* Metric grid */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl p-3.5 sm:p-4 flex flex-col gap-1"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid rgba(${m.rgb},0.12)`,
                    }}
                  >
                    <span className="text-silver/40 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider leading-none">{m.label}</span>
                    <span className="font-bold text-lg sm:text-xl leading-tight" style={{ color: m.accent }}>{m.value}</span>
                    <span className="text-silver/30 text-[9px] sm:text-[10px]">{m.sub}</span>
                  </motion.div>
                ))}
              </div>

              {/* Activity bar chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="rounded-xl p-3.5 sm:p-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-silver/35 text-[9px] sm:text-[10px] uppercase tracking-wider font-medium">Live Activity</span>
                  <span className="text-teal text-[9px] sm:text-[10px] flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-teal animate-pulse inline-block" />
                    Processing
                  </span>
                </div>
                <div className="flex items-end gap-[3px] h-7 sm:h-8">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-[2px]"
                      style={{
                        background: `rgba(0,212,200,${0.15 + (h / 100) * 0.55})`,
                        height: `${h}%`,
                      }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1, originY: 1 }}
                      transition={{ delay: 1.0 + i * 0.04, duration: 0.35, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Delivery badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                style={{
                  background: "rgba(0,170,255,0.07)",
                  border: "1px solid rgba(0,170,255,0.15)",
                }}
              >
                <span className="text-silver/45 text-[10px] uppercase tracking-wide font-medium">Delivery Speed</span>
                <span className="text-electricBlue font-bold text-sm">10x Faster</span>
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
