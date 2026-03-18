"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    question: "What services does RemShield offer?",
    answer:
      "RemShield is an AI engineering studio built around three pillars: AI Systems (intelligent assistants, voice agents, document AI, and custom copilots), Automation Infrastructure (workflow automation, CRM automation, and ops pipelines), and Custom Software (SaaS platforms, internal tools, and AI-powered applications). Every system is built AI-native from the ground up.",
  },
  {
    question: "How long does it take to build an AI system?",
    answer:
      "Most projects are completed in 2–6 weeks depending on complexity. Because we use AI-accelerated development workflows, we deliver at 10x the speed of traditional agencies — without cutting corners on quality. Companies that move fast on AI adoption are already compounding advantages their competitors can't easily close.",
  },
  {
    question: "Do I need technical knowledge to work with you?",
    answer:
      "Not at all. 94% of employees waste time on tasks AI can automate — yet most business owners don't know where to start. We handle everything technical from end to end. You just share your business goals, and we translate them into a working AI system. Plain language throughout.",
  },
  {
    question: "Can you integrate AI into my existing business?",
    answer:
      "Yes — this is one of our specialties. We audit your current tools, workflows, and processes to identify where AI creates the most value. Businesses with a defined AI strategy grow 3.5x faster than those without one. We give you that strategy, then build the systems to execute it.",
  },
  {
    question: "What makes RemShield different from other agencies?",
    answer:
      "We are 100% AI-native. Enterprise AI adoption has grown 270% in 4 years — yet most agencies still treat AI as an add-on. We build everything AI-first: faster delivery, 40% lower operational costs for clients, and systems designed to scale from day one.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute strategy call. We'll audit your operations, identify your highest-ROI AI opportunities, and give you a clear action plan with no obligation. Most clients come out of the call with a specific roadmap — even if they don't hire us.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-electricBlue/40 bg-electricBlue/5"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-base leading-snug">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 ${isOpen ? "text-electricBlue" : "text-silver/50"}`}
        >
          <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-white/10 mb-4" />
              <p className="text-silver/75 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      {/* Top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,200,0.4), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Questions, answered.
          </h2>
          <p className="mt-4 text-silver/70 text-lg">
            Everything you need to know before working with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-silver/60 mt-10 text-sm"
        >
          Still have questions?{" "}
          <a
            href="mailto:support@remshield.solutions"
            className="text-electricBlue hover:underline"
          >
            Email us directly
          </a>{" "}
          or{" "}
          <a
            href="/contact"
            className="text-teal hover:underline"
          >
            apply to work with us
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
