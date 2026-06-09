import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Case Studies — RemShield AI Engineering Studio",
  description:
    "AI automation and engineering projects delivered by RemShield — chatbots, voice agents, cold outreach infrastructure, multi-agent systems, and workflow automation across multiple industries.",
  alternates: { canonical: "https://remshield.solutions/case-studies" },
  openGraph: {
    title: "Case Studies — RemShield AI Engineering Studio",
    description:
      "AI systems, automation infrastructure, and custom builds delivered by RemShield. Real projects, real results.",
    url: "https://remshield.solutions/case-studies",
    type: "website",
  },
};

const caseStudies = [
  {
    slug: "cs-recruitment",
    industry: "Recruitment & Staffing",
    accentColor: "teal" as const,
    headline: "Automated Candidate Pipeline for a Growth-Stage Recruiter",
    summary:
      "A fast-growing recruitment firm was drowning in CV reviews, interview scheduling, and candidate follow-ups — all handled manually by a team already stretched thin.",
    problem:
      "Consultants were spending 3–4 hours daily on repetitive candidate comms: acknowledging applications, chasing interview confirmations, sending prep materials, and following up with no-shows. High-value candidates were falling through the gaps because nobody had time to nurture them.",
    built: [
      "AI screening layer that reads incoming CVs and scores candidates against role criteria before any human reviews them",
      "Automated acknowledgement and status update sequences — every candidate kept informed at every stage",
      "Interview scheduling workflow: self-book links, confirmation, prep guide, and day-of reminder — all triggered automatically",
      "Post-placement follow-up sequence for both client and candidate, feeding a referral and repeat-placement engine",
    ],
    results: [
      { metric: "4 hrs", label: "daily admin eliminated per consultant" },
      { metric: "60%", label: "faster time-to-interview" },
      { metric: "2×", label: "placement capacity, same headcount" },
      { metric: "+31%", label: "candidate satisfaction score" },
    ],
    tools: ["n8n", "AI (Claude)", "Google Sheets", "SMTP", "Calendly API"],
  },
  {
    slug: "cs-ecommerce",
    industry: "E-Commerce & Retail",
    accentColor: "blue" as const,
    headline: "Post-Purchase Journey & Customer Win-Back Automation",
    summary:
      "A DTC brand with strong acquisition but poor retention. Most customers bought once and never returned — not because they were unhappy, but because no one followed up.",
    problem:
      "The team was running paid ads effectively but had no post-purchase communication beyond a generic order confirmation. Repeat purchase rate was low, the review pipeline was non-existent, and lapsed customers were never re-engaged. The brand was leaving significant revenue on the table.",
    built: [
      "Post-purchase journey: order confirmation → delivery update → usage tips → review request → loyalty offer — all timed to the product cycle",
      "Segmented win-back sequence for customers inactive at 60 / 90 / 120 days, with escalating incentive logic",
      "Review and UGC collection flow triggered 7 days post-delivery, with social sharing prompt and referral reward",
      "AI-personalised product recommendation emails based on previous purchase history and browse behaviour",
    ],
    results: [
      { metric: "+44%", label: "repeat purchase rate in 90 days" },
      { metric: "3.8×", label: "ROI on win-back campaign" },
      { metric: "220+", label: "new verified reviews in 60 days" },
      { metric: "Zero", label: "additional headcount required" },
    ],
    tools: ["n8n", "Shopify API", "AI (Claude)", "Klaviyo API", "SMTP"],
  },
  {
    slug: "cs-professional-services",
    industry: "Professional Services",
    accentColor: "teal" as const,
    headline: "AI Outbound Agent for a B2B Advisory Firm",
    summary:
      "A specialist consultancy with a strong track record but no repeatable process for finding new clients. Business development relied entirely on referrals and the founder's network.",
    problem:
      "The firm had a clear ideal client profile but no system for reaching them. Lead research was done manually when time allowed — which was rarely. Outreach was sporadic, untargeted, and not tracked. There was no way to know what was working or improve over time.",
    built: [
      "AI agent that continuously sources and scores leads against ICP criteria using live company data",
      "Personalised first-line generation — each outreach email references something specific and relevant to the prospect",
      "Multi-touch sequence with adaptive follow-up logic — timing and tone adjusted based on open and click behaviour",
      "Self-learning loop: weekly agent review of campaign performance, updating scoring and messaging parameters autonomously",
    ],
    results: [
      { metric: "3×", label: "qualified pipeline in 90 days" },
      { metric: "42%", label: "average email open rate" },
      { metric: "10 hrs", label: "per week recovered" },
      { metric: "Zero", label: "manual lead research required" },
    ],
    tools: ["n8n", "Apollo API", "AI (Claude)", "SMTP", "Google Sheets"],
  },
  {
    slug: "cs-saas",
    industry: "SaaS & Technology",
    accentColor: "blue" as const,
    headline: "Customer Onboarding Automation to Cut 30-Day Churn",
    summary:
      "A SaaS platform with solid acquisition numbers but a leaky funnel. Users were signing up and going quiet — churning before they ever saw the product's value.",
    problem:
      "The onboarding experience was a single welcome email and a static knowledge base. No guidance, no check-ins, no alerts when users stalled. The success team only found out a customer was at risk when they requested a refund or simply disappeared.",
    built: [
      "Behaviour-triggered onboarding sequences — different paths for users who complete vs. skip key setup steps",
      "In-app milestone detection feeding automated nudge emails when users stall on critical actions",
      "Success team alert system — flagging at-risk accounts based on login frequency and feature adoption scores",
      "30-day check-in call automation: self-book link, agenda pre-fill, post-call follow-up with resource pack",
    ],
    results: [
      { metric: "35%", label: "reduction in 30-day churn" },
      { metric: "2×", label: "core feature adoption rate" },
      { metric: "48%", label: "fewer support tickets in month one" },
      { metric: "+22 pts", label: "NPS improvement at 60 days" },
    ],
    tools: ["n8n", "AI (Claude)", "Stripe API", "SMTP", "Slack API"],
  },
  {
    slug: "cs-property",
    industry: "Property & Real Estate",
    accentColor: "teal" as const,
    headline: "Lead Nurture & Viewing Pipeline for a Property Agency",
    summary:
      "A busy estate agency was losing buyers and vendors to competitors — not because of price or service, but because enquiries from portals were going unanswered for hours.",
    problem:
      "Agents were manually responding to portal leads between valuations and viewings. Response time averaged 4+ hours. Many leads went cold before anyone spoke to them. There was no structured follow-up sequence and no visibility on which leads were warm vs. ready to act.",
    built: [
      "Instant portal lead capture with automated first-response within 90 seconds — personalised to property and enquiry type",
      "Qualification sequence that segments buyers by timeline, budget, and intent before any agent time is spent",
      "Viewing booking workflow: self-schedule link, confirmation, property info pack, and day-of reminder",
      "Post-viewing follow-up and offer stage nurture sequence — keeping interested parties warm through the sales process",
    ],
    results: [
      { metric: "90 sec", label: "average first-response time" },
      { metric: "+40%", label: "viewings booked from same enquiry volume" },
      { metric: "20%", label: "increase in enquiry-to-offer rate" },
      { metric: "3 hrs", label: "per day returned to each agent" },
    ],
    tools: ["n8n", "AI (Claude)", "Rightmove API", "SMTP", "Google Sheets"],
  },
  {
    slug: "cs-hospitality",
    industry: "Hospitality & Venues",
    accentColor: "blue" as const,
    headline: "Reservation Management & Guest Loyalty Automation",
    summary:
      "A multi-site hospitality group was losing revenue to no-shows and repeat visits that never happened — because nothing was in place to confirm bookings or bring guests back.",
    problem:
      "Booking confirmations were sent manually when staff had time. No-show rates were high and unpredictable. Post-visit, guests received nothing — no review request, no return offer, no recognition for regulars. Each site operated in isolation with no shared guest intelligence.",
    built: [
      "Automated booking confirmation sequence with 48-hour and 2-hour reminders, reducing no-shows without staff involvement",
      "Post-visit review request triggered 3 hours after reservation end time — platform-specific links based on guest profile",
      "VIP guest recognition system — flagging regulars for personalised treatment on next visit and triggering exclusive return offers",
      "Cross-site guest data layer — unified view of visit history, spend, and preferences across all locations",
    ],
    results: [
      { metric: "65%", label: "reduction in no-show rate" },
      { metric: "150+", label: "new reviews across sites in 90 days" },
      { metric: "+28%", label: "repeat visit rate in 6 months" },
      { metric: "Unified", label: "guest data across all locations" },
    ],
    tools: ["n8n", "AI (Claude)", "OpenTable API", "SMTP", "Google Sheets"],
  },
  {
    slug: "cs-media-production",
    industry: "Media & Content Production",
    accentColor: "teal" as const,
    headline: "End-to-End Production Workflow for a Content Studio",
    summary:
      "A growing content production studio managing multiple client projects simultaneously — all tracked through email threads, shared spreadsheets, and memory. Nothing was scalable.",
    problem:
      "Project briefs arrived in different formats. Approval loops ran over email with no clear status. Asset delivery was ad hoc. Clients chased for updates. Internally, the team had no reliable way to know what was in progress, what was blocked, or what was overdue without a manual check-in.",
    built: [
      "Structured project intake: standardised brief form that populates a live project tracker automatically on submission",
      "Milestone-based notification system — client and internal team both kept informed at each production stage without manual updates",
      "Approval workflow with automated reminders if sign-off isn't received within the agreed window",
      "Asset delivery and feedback collection sequence — version tracking, revision requests, and final sign-off all handled in one flow",
    ],
    results: [
      { metric: "50%", label: "reduction in project admin time" },
      { metric: "3 days", label: "faster average approval cycle" },
      { metric: "Zero", label: "projects missed without a status update" },
      { metric: "+35%", label: "client satisfaction on project clarity" },
    ],
    tools: ["n8n", "AI (Claude)", "Google Drive API", "SMTP", "Airtable"],
  },
  {
    slug: "cs-chatbot",
    industry: "AI Chatbot",
    accentColor: "blue" as const,
    headline: "24/7 AI Sales & Support Chatbot for a Service Business",
    summary:
      "A service business losing leads every evening and weekend — enquiries landing outside office hours with no response until the next working day. By then, most had moved on.",
    problem:
      "The sales team was first point of contact for every inbound enquiry — qualifying, answering questions, and booking consultations manually. Out-of-hours leads received an automated 'we'll be in touch' reply and no follow-through until the next morning. Support tickets for common questions were eating into time that should have been spent on growth.",
    built: [
      "AI chatbot embedded on the website — trained on the business's services, pricing, FAQs, and objection responses",
      "Lead qualification flow: the bot asks the right discovery questions, scores intent, and routes hot leads to an immediate booking link",
      "Out-of-hours enquiry capture — bot collects full context and notifies the team with a briefed lead summary ready to action",
      "Support knowledge base integration — handles 80% of common questions without human involvement, escalating only complex cases",
    ],
    results: [
      { metric: "24/7", label: "lead capture — including out of hours" },
      { metric: "63%", label: "of support queries resolved without human" },
      { metric: "3×", label: "more consultations booked per week" },
      { metric: "Zero", label: "missed enquiries from outside office hours" },
    ],
    tools: ["AI (Claude)", "n8n", "Webhook", "SMTP", "Google Sheets"],
  },
  {
    slug: "cs-voice-agent",
    industry: "AI Voice Agent",
    accentColor: "teal" as const,
    headline: "AI Voice Agent for Inbound Calls & Appointment Booking",
    summary:
      "An appointment-based business missing calls during busy periods and after hours. Every missed call was a missed booking — and the team had no capacity to call back consistently.",
    problem:
      "The front-of-house team was handling calls, managing walk-ins, and running operations simultaneously. Calls during peak hours rang out. After-hours calls went to voicemail and were rarely followed up. Booking required a human to check availability, confirm the slot, and send a reminder — a process that took 8–12 minutes per appointment.",
    built: [
      "AI voice agent that answers every call in under 2 rings — introduces itself, understands the caller's need, and handles the full booking conversation naturally",
      "Live calendar integration — agent checks real-time availability and confirms slots without human involvement",
      "Post-call automation: booking confirmation SMS and email sent instantly, with 24-hour and 2-hour reminders",
      "Escalation logic — agent recognises complex or sensitive calls and transfers to a human or flags for urgent callback",
    ],
    results: [
      { metric: "Zero", label: "missed calls during business hours" },
      { metric: "8 min", label: "booking time reduced to under 60 seconds" },
      { metric: "+34%", label: "appointments booked in first 30 days" },
      { metric: "After-hours", label: "bookings now captured automatically" },
    ],
    tools: ["Vapi.ai", "AI (Claude)", "n8n", "Google Calendar API", "Twilio"],
  },
  {
    slug: "cs-cold-outreach",
    industry: "Cold Outreach Infrastructure",
    accentColor: "blue" as const,
    headline: "AI-Personalised Cold Email System Across Multiple Domains",
    summary:
      "A B2B company needed a scalable, deliverable outbound engine — not a spray-and-pray blast, but a system that sent the right message to the right person with context that felt genuinely researched.",
    problem:
      "Previous cold outreach had poor deliverability and generic messaging. Open rates were low, reply rates were near zero, and the sales team had no confidence in the channel. The business needed an infrastructure that could operate at scale without sacrificing personalisation — and without landing in spam.",
    built: [
      "Multi-domain sender infrastructure across several warmed domains with rotating inboxes — protecting deliverability at volume",
      "AI research layer that pre-processes each lead: company context, role signals, trigger events, and a personalised first line written before sending",
      "Two-track campaign system — deep personalised sequences for high-value targets, lighter templated sequences for broader prospecting",
      "Automated follow-up cadence (Day 3, 7, 14) with reply detection to pause sequences the moment a lead responds",
      "Performance tracking layer comparing open rates, reply rates, and positive response rates by domain, sender, and sequence type",
    ],
    results: [
      { metric: "3,175", label: "targeted leads across 4 domains" },
      { metric: "42%", label: "average open rate on personalised sequences" },
      { metric: "12", label: "sender inboxes with maintained deliverability" },
      { metric: "A/B", label: "tested: deep vs standard personalisation" },
    ],
    tools: ["n8n", "AI (Claude)", "Apollo API", "SMTP", "Google Sheets"],
  },
  {
    slug: "cs-multi-agent",
    industry: "Multi-Agent AI Systems",
    accentColor: "teal" as const,
    headline: "Multi-Agent Business Intelligence System for Market Research",
    summary:
      "A business development team spending 2–3 days manually compiling research before every major pitch, partnership discussion, or market entry decision. The process was slow, inconsistent, and entirely dependent on one analyst.",
    problem:
      "Competitive intelligence, customer research, market sizing, and financial signals all lived in different places and required different expertise to interpret. The team had no repeatable system — each research project started from scratch. Speed was a competitive disadvantage.",
    built: [
      "Orchestrator agent that receives a single research request and deploys four specialist AI agents simultaneously — each expert in its domain",
      "Market Research Agent: market size, growth trends, emerging opportunities, and regulatory signals",
      "Competitor Analysis Agent: competitor positioning, recent moves, pricing, and weaknesses",
      "Customer Intelligence Agent: buyer personas, pain points, purchase triggers, and community sentiment",
      "Synthesiser layer: orchestrator collects all findings and produces a single structured intelligence report, emailed within minutes of request",
    ],
    results: [
      { metric: "2 days", label: "of research compressed to under 8 minutes" },
      { metric: "4", label: "specialist agents running in parallel" },
      { metric: "Repeatable", label: "research process — no analyst dependency" },
      { metric: "100%", label: "of briefs prepared before the first meeting" },
    ],
    tools: ["n8n", "AI (Claude)", "Tavily", "SMTP", "Google Sheets"],
  },
];

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "RemShield Case Studies",
  description: "AI automation and engineering projects delivered by RemShield",
  url: "https://remshield.solutions/case-studies",
  itemListElement: caseStudies.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cs.headline,
    description: cs.summary,
    url: `https://remshield.solutions/case-studies#${cs.slug}`,
  })),
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,200,0.3), transparent)",
            }}
          />
          <span className="inline-block text-teal text-sm font-semibold tracking-widest uppercase mb-4">
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Work we&apos;ve built.
            <br />
            <span className="gradient-text">Results that are real.</span>
          </h1>
          <p className="text-silver/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Every project below started with a business running on manual effort. We mapped
            the friction, built the automation, and handed back the time. Here&apos;s how.
          </p>
        </section>

        {/* Case Studies */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {caseStudies.map((cs) => {
            const isTeal = cs.accentColor === "teal";
            const accent = isTeal ? "#00D4C8" : "#00AAFF";
            const accentBg = isTeal
              ? "rgba(0,212,200,0.08)"
              : "rgba(0,170,255,0.08)";
            const accentBorder = isTeal
              ? "rgba(0,212,200,0.18)"
              : "rgba(0,170,255,0.18)";

            return (
              <div
                key={cs.slug}
                id={cs.slug}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${accentBorder}`,
                }}
              >
                {/* Card header */}
                <div
                  className="px-8 py-6 border-b"
                  style={{
                    background: accentBg,
                    borderColor: accentBorder,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color: accent,
                        background: `${accentBg}`,
                        border: `1px solid ${accentBorder}`,
                      }}
                    >
                      {cs.industry}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cs.tools.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-silver/50 px-2 py-0.5 rounded-md border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {cs.headline}
                  </h2>
                  <p className="text-silver/65 text-sm leading-relaxed max-w-2xl">
                    {cs.summary}
                  </p>
                </div>

                {/* Card body */}
                <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Problem + Built */}
                  <div className="space-y-6">
                    <div>
                      <p
                        className="text-xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: accent }}
                      >
                        The Problem
                      </p>
                      <p className="text-silver/65 text-sm leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: accent }}
                      >
                        What We Built
                      </p>
                      <ul className="space-y-2">
                        {cs.built.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: accent }}
                            />
                            <span className="text-silver/65 text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-4"
                      style={{ color: accent }}
                    >
                      Results
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {cs.results.map((r) => (
                        <div
                          key={r.label}
                          className="rounded-xl p-4"
                          style={{
                            background: accentBg,
                            border: `1px solid ${accentBorder}`,
                          }}
                        >
                          <p
                            className="text-2xl font-bold mb-1"
                            style={{ color: accent }}
                          >
                            {r.metric}
                          </p>
                          <p className="text-silver/55 text-xs leading-snug">
                            {r.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,200,0.07) 0%, rgba(13,21,48,0.95) 100%)",
              border: "1px solid rgba(0,212,200,0.2)",
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Want results like these?
            </h2>
            <p className="text-silver/65 text-sm mb-6 max-w-sm mx-auto">
              Book a free 30-minute call. We&apos;ll map where automation creates the
              most leverage in your business — no fluff, no commitment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
                boxShadow: "0 4px 20px rgba(0,170,255,0.25)",
              }}
            >
              Book a Free Consultation →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}