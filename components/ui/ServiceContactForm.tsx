"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

// ─── Field & Config Types ─────────────────────────────────────────────────────

type SelectField = { type: "select"; id: string; label: string; required?: boolean; options: string[] };
type TextField = { type: "text" | "email" | "url"; id: string; label: string; placeholder?: string; required?: boolean };
type TextareaField = { type: "textarea"; id: string; label: string; placeholder?: string; required?: boolean; rows?: number };
type ChipsField = { type: "chips"; id: string; label: string; options: string[] };
type Field = SelectField | TextField | TextareaField | ChipsField;

interface ServiceConfig {
  badge: string;
  heading: string;
  subheading: string;
  accentColor: string;
  accentRgb: string;
  fields: Field[];
}

// ─── Service Configs ──────────────────────────────────────────────────────────

const configs: Record<string, ServiceConfig> = {
  "ai-systems": {
    badge: "AI Systems",
    heading: "Build Your AI System",
    subheading:
      "Tell us what you need to automate or augment. We'll design the intelligent system that fits your workflows.",
    accentColor: "#00D4C8",
    accentRgb: "0,212,200",
    fields: [
      {
        type: "select",
        id: "systemType",
        label: "What type of AI system do you need?",
        required: true,
        options: [
          "AI assistant / chatbot",
          "Customer support agent",
          "AI voice agent",
          "Document analysis & extraction",
          "AI copilot for internal teams",
          "Other / not sure yet",
        ],
      },
      {
        type: "text",
        id: "tools",
        label: "Tools & platforms you currently use",
        placeholder: "e.g. HubSpot, Slack, Notion, Salesforce, your website...",
      },
      {
        type: "textarea",
        id: "useCase",
        label: "Describe the use case",
        placeholder:
          "What does the AI need to do? Who will use it? What does a successful outcome look like?",
        required: true,
        rows: 4,
      },
      {
        type: "select",
        id: "deployment",
        label: "Where will this AI be deployed?",
        options: [
          "Customer-facing (website, chat, phone)",
          "Internal team use only",
          "Both internal and customer-facing",
        ],
      },
      {
        type: "select",
        id: "size",
        label: "Company size",
        options: ["Solo / Freelancer", "2–10 employees", "11–50 employees", "51–200 employees", "200+ employees"],
      },
      {
        type: "select",
        id: "budget",
        label: "Project budget",
        options: ["Under $2,000", "$2,000–$8,000", "$8,000–$20,000", "$20,000+", "Not sure yet"],
      },
      {
        type: "select",
        id: "timeline",
        label: "Desired timeline",
        options: ["ASAP (within 4 weeks)", "1–3 months", "3–6 months", "Flexible"],
      },
    ],
  },

  "automation-infrastructure": {
    badge: "Automation Infrastructure",
    heading: "Automate Your Operations",
    subheading:
      "Tell us what's slowing your team down. We'll map and build the automation infrastructure that removes the bottlenecks.",
    accentColor: "#00AAFF",
    accentRgb: "0,170,255",
    fields: [
      {
        type: "textarea",
        id: "tasks",
        label: "What tasks do you want to automate?",
        placeholder:
          "e.g. Lead follow-up emails, invoice processing, data entry between apps, report generation...",
        required: true,
        rows: 3,
      },
      {
        type: "text",
        id: "tools",
        label: "Tools & platforms you currently use",
        placeholder: "e.g. HubSpot, Zapier, Excel, Notion, Slack, Gmail...",
      },
      {
        type: "select",
        id: "hours",
        label: "Hours lost to manual tasks per week",
        required: true,
        options: ["Under 5 hours", "5–20 hours", "20–40 hours", "40+ hours"],
      },
      {
        type: "chips",
        id: "goals",
        label: "Automation goals (select all that apply)",
        options: [
          "Lead capture & follow-up",
          "Email sequences",
          "Data processing",
          "Reporting & dashboards",
          "Customer onboarding",
          "Internal approvals",
        ],
      },
      {
        type: "select",
        id: "budget",
        label: "Monthly budget for automation",
        options: ["Under $500/mo", "$500–$1,500/mo", "$1,500–$5,000/mo", "$5,000+/mo", "Not sure yet"],
      },
      {
        type: "select",
        id: "timeline",
        label: "When do you want to start?",
        options: ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"],
      },
    ],
  },

  "custom-software": {
    badge: "Custom Software",
    heading: "Build Your Software",
    subheading:
      "From SaaS products to internal tools — tell us what you need to build and we'll ship it fast.",
    accentColor: "#00D4C8",
    accentRgb: "0,212,200",
    fields: [
      {
        type: "select",
        id: "buildType",
        label: "What are you building?",
        required: true,
        options: [
          "SaaS product",
          "Internal tool / dashboard",
          "Client portal",
          "AI-powered application",
          "Website / landing page",
          "Not sure yet",
        ],
      },
      {
        type: "textarea",
        id: "description",
        label: "Describe what you need",
        placeholder:
          "What problem does it solve? Who is it for? What should it do?",
        required: true,
        rows: 4,
      },
      {
        type: "select",
        id: "stage",
        label: "Current stage",
        options: [
          "Idea only — nothing built yet",
          "Have wireframes or designs",
          "Existing product to rebuild / improve",
          "MVP built — need to scale",
        ],
      },
      {
        type: "chips",
        id: "features",
        label: "Must-have features",
        options: [
          "User authentication",
          "Subscriptions & payments",
          "AI features / LLM integration",
          "Analytics & dashboards",
          "Admin / back-office panel",
          "Third-party API integrations",
        ],
      },
      {
        type: "text",
        id: "targetUsers",
        label: "Who are the target users?",
        placeholder: "e.g. Small business owners, HR teams, e-commerce stores...",
      },
      {
        type: "select",
        id: "timeline",
        label: "Desired timeline",
        options: ["ASAP (1–3 months)", "3–6 months", "6–12 months", "Flexible"],
      },
      {
        type: "select",
        id: "budget",
        label: "Development budget",
        options: ["Under $3,000", "$3,000–$10,000", "$10,000–$30,000", "$30,000+", "Not sure yet"],
      },
    ],
  },
};

const defaultConfig: ServiceConfig = {
  badge: "Get in Touch",
  heading: "Let's Connect",
  subheading: "Tell us about your business and how we can help you build with AI.",
  accentColor: "#00D4C8",
  accentRgb: "0,212,200",
  fields: [
    {
      type: "select",
      id: "service",
      label: "Which area are you interested in?",
      options: ["AI Systems", "Automation Infrastructure", "Custom Software", "Not sure yet"],
    },
    {
      type: "textarea",
      id: "message",
      label: "Tell us about your goals",
      placeholder: "What are you trying to build or automate? What does success look like?",
      required: true,
      rows: 4,
    },
    {
      type: "select",
      id: "budget",
      label: "Estimated budget",
      options: ["Under $2,000", "$2,000–$10,000", "$10,000–$30,000", "$30,000+", "Not sure yet"],
    },
  ],
};

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-silver/30 focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-colors duration-200";

const labelClass = "block text-silver/70 text-xs font-semibold tracking-wide uppercase mb-1.5";

// ─── Field Renderers ──────────────────────────────────────────────────────────

function SelectInput({ field, value, onChange }: { field: SelectField; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}{field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select id={field.id} value={value} onChange={(e) => onChange(e.target.value)} required={field.required}
        className={inputClass} style={{ backgroundColor: "#0D1B3E", colorScheme: "dark" }}>
        <option value="" disabled style={{ backgroundColor: "#0D1B3E", color: "rgba(200,214,229,0.35)" }}>Select an option</option>
        {field.options.map((opt) => <option key={opt} value={opt} style={{ backgroundColor: "#0D1B3E", color: "#C8D6E5" }}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextInput({ field, value, onChange }: { field: TextField; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}{field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input id={field.id} type={field.type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder} required={field.required} className={inputClass} />
    </div>
  );
}

function TextareaInput({ field, value, onChange }: { field: TextareaField; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}{field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea id={field.id} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder} required={field.required} rows={field.rows ?? 3}
        className={`${inputClass} resize-none`} />
    </div>
  );
}

function ChipsInput({ field, selected, onChange, accentColor, accentRgb }: {
  field: ChipsField; selected: string[]; onChange: (v: string[]) => void;
  accentColor: string; accentRgb: string;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  return (
    <div>
      <p className={labelClass}>{field.label}</p>
      <div className="flex flex-wrap gap-2">
        {field.options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200"
              style={active
                ? { background: `rgba(${accentRgb},0.15)`, borderColor: accentColor, color: accentColor }
                : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(200,214,229,0.55)" }
              }>
              {active && "✓ "}{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServiceContactForm({ service }: { service?: string }) {
  const config = (service && configs[service]) ? configs[service] : defaultConfig;
  const { accentColor, accentRgb, fields } = config;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [chipsValues, setChipsValues] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = (id: string, val: string) => setFieldValues((p) => ({ ...p, [id]: val }));
  const setChips = (id: string, val: string[]) => setChipsValues((p) => ({ ...p, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d2b7db4c-da5e-4147-8dcf-848ecf429bde",
          subject: `New ${service || "enquiry"} from ${firstName} ${lastName} — ${company}`,
          from_name: "RemShield Website",
          firstName,
          lastName,
          email,
          company,
          service,
          ...fieldValues,
          ...Object.fromEntries(
            Object.entries(chipsValues).map(([k, v]) => [k, v.join(", ")])
          ),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center gap-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>
          <FontAwesomeIcon icon={faCheck} className="w-7 h-7" style={{ color: accentColor }} />
        </div>
        <h3 className="text-2xl font-bold text-white">Application received!</h3>
        <p className="text-silver/65 text-sm max-w-xs leading-relaxed">
          We review every submission personally and will be in touch within 1–2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Common fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First name <span className="text-red-400">*</span></label>
          <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            placeholder="David" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last name <span className="text-red-400">*</span></label>
          <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
            placeholder="Smith" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email address <span className="text-red-400">*</span></label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Company / Business name</label>
        <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company" className={inputClass} />
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.3), transparent)` }} />

      {/* Service-specific fields */}
      {fields.map((field) => {
        if (field.type === "select") return (
          <SelectInput key={field.id} field={field} value={fieldValues[field.id] ?? ""} onChange={(v) => setField(field.id, v)} />
        );
        if (field.type === "textarea") return (
          <TextareaInput key={field.id} field={field} value={fieldValues[field.id] ?? ""} onChange={(v) => setField(field.id, v)} />
        );
        if (field.type === "chips") return (
          <ChipsInput key={field.id} field={field} selected={chipsValues[field.id] ?? []}
            onChange={(v) => setChips(field.id, v)} accentColor={accentColor} accentRgb={accentRgb} />
        );
        return (
          <TextInput key={field.id} field={field as TextField} value={fieldValues[field.id] ?? ""} onChange={(v) => setField(field.id, v)} />
        );
      })}

      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-400 text-sm">
            Something went wrong. Please try again or email us directly.
          </motion.p>
        )}
      </AnimatePresence>

      <button type="submit" disabled={status === "loading"}
        className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb},0.9) 0%, rgba(${accentRgb},0.6) 100%)`,
          boxShadow: `0 4px 24px rgba(${accentRgb},0.25)`,
        }}>
        {status === "loading" ? (
          <><FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" /> Sending...</>
        ) : "Submit Application →"}
      </button>

      <p className="text-center text-silver/35 text-xs">
        We review every application personally and respond within 1–2 business days.
      </p>
    </form>
  );
}
