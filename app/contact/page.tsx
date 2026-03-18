import { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ServiceContactForm from "@/components/ui/ServiceContactForm";

const serviceMeta: Record<string, { title: string; badge: string; heading: string; subheading: string; accentColor: string; accentRgb: string }> = {
  "ai-systems": {
    title: "AI Systems — RemShield",
    badge: "AI Systems",
    heading: "Build Your AI System",
    subheading: "Tell us what you need to automate or augment. We'll design the intelligent system that fits your workflows.",
    accentColor: "#00D4C8",
    accentRgb: "0,212,200",
  },
  "automation-infrastructure": {
    title: "Automation Infrastructure — RemShield",
    badge: "Automation Infrastructure",
    heading: "Automate Your Operations",
    subheading: "Tell us what's slowing your team down. We'll map and build the automation infrastructure that removes the bottlenecks.",
    accentColor: "#00AAFF",
    accentRgb: "0,170,255",
  },
  "custom-software": {
    title: "Custom Software — RemShield",
    badge: "Custom Software",
    heading: "Build Your Software",
    subheading: "From SaaS products to internal tools — tell us what you need to build and we'll ship it fast.",
    accentColor: "#00D4C8",
    accentRgb: "0,212,200",
  },
};

const defaultMeta = {
  title: "Get in Touch — RemShield AI Engineering Studio",
  badge: "Limited Spots Available",
  heading: "Let's Connect",
  subheading: "Tell us about your business and how we can help you build with AI.",
  accentColor: "#00D4C8",
  accentRgb: "0,212,200",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { service?: string };
}): Promise<Metadata> {
  const meta = (searchParams.service ? serviceMeta[searchParams.service] : null) ?? defaultMeta;
  return {
    title: meta.title,
    description: meta.subheading,
    alternates: { canonical: "https://remshield.solutions/contact" },
    openGraph: {
      title: "Get in Touch — RemShield AI Engineering Studio",
      description: "Book a free strategy call with RemShield. Tell us about your business and how we can help you build with AI.",
      url: "https://remshield.solutions/contact",
      type: "website",
      images: [{ url: "/assets/remshield-logo.png", width: 500, height: 500, alt: "RemShield — Book a Consultation" }],
    },
  };
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact RemShield",
  url: "https://remshield.solutions/contact",
  description:
    "Book a free strategy call with RemShield AI Engineering Studio. Tell us about your project and we'll design the right AI solution for your business.",
  mainEntity: {
    "@type": "Organization",
    name: "RemShield",
    email: "support@remshield.solutions",
    url: "https://remshield.solutions",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const service = searchParams.service;
  const meta = (service ? serviceMeta[service] : null) ?? defaultMeta;

  return (
    <div className="min-h-screen bg-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Navbar />

      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, rgba(${meta.accentRgb},0.06) 0%, transparent 70%)`,
        }}
      />

      <main className="relative z-10 pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide mb-5"
              style={{
                borderColor: `rgba(${meta.accentRgb},0.3)`,
                background: `rgba(${meta.accentRgb},0.08)`,
                color: meta.accentColor,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: meta.accentColor }}
              />
              {meta.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {meta.heading}
            </h1>
            <p className="text-silver/70 text-lg leading-relaxed">{meta.subheading}</p>
            <p className="mt-3 text-silver/45 text-sm">
              Due to high demand, we carefully review every application before reaching out.
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-10"
            style={{
              background: `linear-gradient(90deg, rgba(${meta.accentRgb},0.4), rgba(${meta.accentRgb},0.1), transparent)`,
            }}
          />

          <ServiceContactForm service={service} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
