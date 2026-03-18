import { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — RemShield",
  description: "Terms of service for RemShield AI Engineering Studio. Read our service terms, IP ownership, and liability policies.",
  alternates: { canonical: "https://remshield.solutions/terms" },
  openGraph: {
    title: "Terms of Service — RemShield",
    description: "Terms of service for RemShield AI Engineering Studio. Read our service terms, IP ownership, and liability policies.",
    url: "https://remshield.solutions/terms",
    type: "website",
    images: [{ url: "/assets/remshield-logo.png", width: 500, height: 500, alt: "RemShield" }],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <main className="relative z-10 pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Terms of Service
            </h1>
            <p className="text-silver/60 text-sm">Last updated: March 2026</p>
          </div>

          <div className="h-px mb-10" style={{ background: "linear-gradient(90deg, rgba(0,212,200,0.4), rgba(0,212,200,0.1), transparent)" }} />

          <div className="prose prose-invert max-w-none">
            <p className="text-silver/70 leading-relaxed mb-6">
              By accessing remshield.solutions, you agree to these terms. Please read them carefully.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">Services</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              RemShield provides AI engineering, automation, and custom software development services. The scope, deliverables, and pricing for each engagement are defined in a separate project agreement signed between RemShield and the client.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">Intellectual Property</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              Upon full payment, clients receive ownership of deliverables as specified in the project agreement. RemShield retains rights to general methodologies, frameworks, and tools developed independently of client projects.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">Limitation of Liability</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              RemShield&apos;s liability is limited to the fees paid for the relevant service. We are not liable for indirect or consequential damages arising from the use of our services.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">Contact</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              Questions about these terms? Email us at{" "}
              <a href="mailto:support@remshield.solutions" className="text-teal hover:underline">
                support@remshield.solutions
              </a>.
            </p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-teal text-sm hover:underline">← Back to home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
