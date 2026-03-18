"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPaperPlane,
  faChartLine,
  faHeadset,
  faGears,
  faDatabase,
  faBullhorn,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const aiGoalOptions = [
  { icon: faChartLine, label: "Lead generation or sales" },
  { icon: faHeadset, label: "Customer support" },
  { icon: faGears, label: "Internal operations" },
  { icon: faDatabase, label: "Data processing or reporting" },
  { icon: faBullhorn, label: "Content or marketing workflows" },
  { icon: faCircleQuestion, label: "Not sure yet" },
];

const roleOptions = [
  "CEO / Founder",
  "COO / Operations",
  "CTO / Tech Lead",
  "Marketing Director",
  "Sales Director",
  "Other",
];

const companySizeOptions = [
  "Solo / Freelancer",
  "2–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
];

const revenueOptions = [
  "Pre-revenue",
  "$0–$100k/yr",
  "$100k–$500k/yr",
  "$500k–$2M/yr",
  "$2M–$10M/yr",
  "$10M+/yr",
];

const budgetOptions = [
  "Under $1,000",
  "$1,000–$5,000",
  "$5,000–$15,000",
  "$15,000–$50,000",
  "$50,000+",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  role: string;
  companySize: string;
  revenue: string;
  budget: string;
  howCanWeHelp: string;
  aiGoals: string[];
  extra: string;
}

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  website: "",
  role: "",
  companySize: "",
  revenue: "",
  budget: "",
  howCanWeHelp: "",
  aiGoals: [],
  extra: "",
};

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-silver/85 mb-2">
      {children}
      {required && <span className="text-teal ml-1">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-silver/35 text-sm focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 focus:bg-teal/5 transition-all duration-200"
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all duration-200 appearance-none"
      style={{
        backgroundColor: "#0D1B3E",
        color: value ? "#C8D6E5" : "rgba(200,214,229,0.35)",
        colorScheme: "dark",
      }}
    >
      <option value="" disabled style={{ backgroundColor: "#0D1B3E", color: "rgba(200,214,229,0.35)" }}>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} style={{ backgroundColor: "#0D1B3E", color: "#C8D6E5" }}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleGoal = (label: string) => {
    setForm((f) => ({
      ...f,
      aiGoals: f.aiGoals.includes(label)
        ? f.aiGoals.filter((g) => g !== label)
        : [...f.aiGoals, label],
    }));
  };

  const required = [
    "firstName",
    "lastName",
    "email",
    "company",
    "role",
    "companySize",
    "revenue",
    "budget",
    "howCanWeHelp",
  ];

  const isValid = required.every((k) => form[k as keyof FormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate submission — replace with your form handler (Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/5 backdrop-blur-md border border-teal/20 rounded-2xl p-10 text-center"
        style={{ boxShadow: "0 0 40px rgba(0,212,200,0.08)" }}
      >
        <div className="w-16 h-16 rounded-2xl bg-teal/10 border border-teal/30 flex items-center justify-center mx-auto mb-5">
          <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Application Received</h2>
        <p className="text-silver/70 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. We review every application personally and will
          be in touch within <span className="text-teal font-medium">1–2 business days</span>{" "}
          if there&apos;s a strong fit.
        </p>
        <div className="mt-8 pt-6 border-t border-white/10 text-silver/40 text-sm">
          Questions? Email us at{" "}
          <a href="mailto:contact@remshield.solutions" className="text-electricBlue hover:underline">
            contact@remshield.solutions
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>First Name</FieldLabel>
          <Input value={form.firstName} onChange={set("firstName")} placeholder="John" />
        </div>
        <div>
          <FieldLabel required>Last Name</FieldLabel>
          <Input value={form.lastName} onChange={set("lastName")} placeholder="Doe" />
        </div>
      </div>

      {/* Email */}
      <div>
        <FieldLabel required>Email Address</FieldLabel>
        <Input
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="john@company.com"
        />
      </div>

      {/* Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Company Name</FieldLabel>
          <Input value={form.company} onChange={set("company")} placeholder="Acme Inc." />
        </div>
        <div>
          <FieldLabel>Company Website</FieldLabel>
          <Input
            value={form.website}
            onChange={set("website")}
            placeholder="https://acme.com"
          />
        </div>
      </div>

      {/* Role */}
      <div>
        <FieldLabel required>Your Role</FieldLabel>
        <Select
          value={form.role}
          onChange={set("role")}
          options={roleOptions}
          placeholder="Select your role"
        />
      </div>

      {/* Company size + Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>Company Size</FieldLabel>
          <Select
            value={form.companySize}
            onChange={set("companySize")}
            options={companySizeOptions}
            placeholder="Select company size"
          />
        </div>
        <div>
          <FieldLabel required>Annual Revenue</FieldLabel>
          <Select
            value={form.revenue}
            onChange={set("revenue")}
            options={revenueOptions}
            placeholder="Select revenue range"
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <FieldLabel required>Project Budget</FieldLabel>
        <Select
          value={form.budget}
          onChange={set("budget")}
          options={budgetOptions}
          placeholder="Select budget range"
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-white/8" />

      {/* How can we help */}
      <div>
        <FieldLabel required>How can we help?</FieldLabel>
        <textarea
          value={form.howCanWeHelp}
          onChange={(e) => set("howCanWeHelp")(e.target.value)}
          placeholder="Tell us what you're looking to achieve..."
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-silver/35 text-sm focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 focus:bg-teal/5 transition-all duration-200 resize-none"
        />
      </div>

      {/* AI Goals — multi-select chips */}
      <div>
        <FieldLabel>What are you hoping to improve with AI or automation?</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {aiGoalOptions.map((opt) => {
            const active = form.aiGoals.includes(opt.label);
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => toggleGoal(opt.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200 ${
                  active
                    ? "border-teal/50 bg-teal/10 text-teal"
                    : "border-white/10 bg-white/5 text-silver/70 hover:border-white/20 hover:text-silver"
                }`}
              >
                <FontAwesomeIcon
                  icon={opt.icon}
                  className={`w-3.5 h-3.5 flex-shrink-0 ${active ? "text-teal" : "text-silver/40"}`}
                />
                {opt.label}
                {active && (
                  <span className="ml-auto text-teal text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Extra */}
      <div>
        <FieldLabel>Anything else we should know? (optional)</FieldLabel>
        <textarea
          value={form.extra}
          onChange={(e) => set("extra")(e.target.value)}
          placeholder="Any additional context or questions..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-silver/35 text-sm focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 focus:bg-teal/5 transition-all duration-200 resize-none"
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-start gap-2.5 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
        style={{
          background: loading
            ? "rgba(0,212,200,0.4)"
            : "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
          boxShadow: loading
            ? "none"
            : "0 4px 20px rgba(0,170,255,0.25), 0 0 0 1px rgba(0,212,200,0.2)",
        }}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
            />
            Submitting...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            Submit Application
          </>
        )}
      </button>

      <p className="text-silver/35 text-xs text-center">
        We typically respond within 1–2 business days.
      </p>
    </form>
  );
}
