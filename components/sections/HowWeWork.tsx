"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover & Diagnose",
    tagline: "Understand first, automate second.",
    bullets: [
      "We learn how your business actually works — your goals, constraints, handoffs, and what a 'win' looks like for you.",
      "We map your tech stack and where your data lives: CRMs, inboxes, spreadsheets, and internal tools.",
      "We audit your processes to find real bottlenecks and decide what should — and shouldn't — be automated.",
    ],
    numColor: "text-teal",
    dotColor: "bg-teal",
    borderColor: "border-teal/25",
    glowColor: "rgba(0,212,200,0.14)",
  },
  {
    number: "02",
    title: "Design, Build & Validate",
    tagline: "Custom solutions, tested before launch.",
    bullets: [
      "We prioritise high-impact opportunities and decide where AI helps — and where it doesn't.",
      "We design and build custom workflows, test different approaches on real data, and explain every decision in plain language.",
      "We run evaluations in a real-world environment before any full rollout — no surprises on launch day.",
    ],
    numColor: "text-electricBlue",
    dotColor: "bg-electricBlue",
    borderColor: "border-electricBlue/25",
    glowColor: "rgba(0,170,255,0.14)",
  },
  {
    number: "03",
    title: "Launch, Monitor & Optimise",
    tagline: "Continuous improvement, not a one-off project.",
    bullets: [
      "We launch into production with clear success metrics, safeguards, and rollback options in place.",
      "We monitor performance, collect feedback from your team and customers, and fix issues quickly.",
      "We continuously refine prompts, logic, and models so the system improves as your business evolves.",
    ],
    numColor: "text-teal",
    dotColor: "bg-teal",
    borderColor: "border-teal/25",
    glowColor: "rgba(0,212,200,0.14)",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,170,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading — left-aligned like uppitai */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-3">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            A methodical, low-risk approach
          </h2>
          <p className="text-silver/60 text-lg max-w-xl leading-relaxed">
            We start with understanding your business — not jumping straight into tools.
          </p>
        </motion.div>

        {/* Steps — vertical cards */}
        <div className="flex flex-col gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className={`relative bg-white/5 backdrop-blur-md border ${step.borderColor} rounded-2xl p-7 sm:p-9 transition-all duration-300 group`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 32px ${step.glowColor}`;
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
                {/* Step number */}
                <div className="flex-shrink-0 sm:w-16">
                  <span
                    className={`text-6xl font-bold ${step.numColor} opacity-25 leading-none select-none block`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`text-xs font-bold tracking-widest uppercase ${step.numColor} opacity-60 mb-1`}>
                    Step {step.number}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-silver/60 text-sm italic mb-5">
                    {step.tagline}
                  </p>

                  <ul className="flex flex-col gap-3.5">
                    {step.bullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.14 + bi * 0.07 + 0.25,
                        }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={`mt-2 w-1.5 h-1.5 rounded-full ${step.dotColor} flex-shrink-0`}
                        />
                        <span className="text-silver/70 text-sm leading-relaxed">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom inline CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <p className="text-silver/55 text-base">
            Ready to see where AI can help your business?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
              boxShadow: "0 4px 20px rgba(0,170,255,0.22), 0 0 0 1px rgba(0,212,200,0.18)",
            }}
          >
            Book a Consultation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
