import { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — RemShield",
  description: "Privacy policy for RemShield AI Engineering Studio. Learn how we collect, use, and protect your information in compliance with NDPR and GDPR.",
  alternates: { canonical: "https://remshield.solutions/privacy" },
  openGraph: {
    title: "Privacy Policy — RemShield",
    description: "Privacy policy for RemShield AI Engineering Studio. Learn how we collect, use, and protect your information in compliance with NDPR and GDPR.",
    url: "https://remshield.solutions/privacy",
    type: "website",
    images: [{ url: "/assets/remshield-logo.png", width: 500, height: 500, alt: "RemShield" }],
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-silver/60 text-sm">Last updated: March 2026</p>
          </div>

          <div className="h-px mb-10" style={{ background: "linear-gradient(90deg, rgba(0,212,200,0.4), rgba(0,212,200,0.1), transparent)" }} />

          <div className="prose prose-invert max-w-none">
            <p className="text-silver/70 leading-relaxed mb-6">
              RemShield (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, store, and protect your information when you visit our website or engage our services. We operate in compliance with the Nigeria Data Protection Regulation (NDPR) and, where applicable, the EU General Data Protection Regulation (GDPR).
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">1. Information We Collect</h2>
            <p className="text-silver/70 leading-relaxed mb-3">
              We collect information you provide directly, including:
            </p>
            <ul className="text-silver/70 leading-relaxed mb-4 space-y-1 list-disc list-inside">
              <li>Name, email address, and company name submitted via our contact form</li>
              <li>Project details, budget range, and timeline information you share when enquiring</li>
              <li>Communications you send us by email or other channels</li>
            </ul>
            <p className="text-silver/70 leading-relaxed mb-4">
              We may also collect basic, anonymised analytics data (page views, referral sources, approximate location by country) through privacy-respecting analytics tools. We do not use Google Analytics or any tracking that builds cross-site user profiles.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">2. How We Use Your Information</h2>
            <p className="text-silver/70 leading-relaxed mb-3">We use your information to:</p>
            <ul className="text-silver/70 leading-relaxed mb-4 space-y-1 list-disc list-inside">
              <li>Respond to your enquiries and assess project fit</li>
              <li>Communicate about potential and active engagements</li>
              <li>Send project-related updates and invoices</li>
              <li>Improve our website and service quality</li>
            </ul>
            <p className="text-silver/70 leading-relaxed mb-4">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">3. Cookies</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              Our website uses only essential cookies necessary for basic functionality. We do not use advertising cookies, social tracking pixels, or third-party cookies that follow you across the web. You may disable cookies in your browser settings without affecting your ability to use our site.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">4. Data Retention</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              We retain contact form submissions and project-related communications for up to 3 years after our last interaction, or for as long as required by applicable law. After this period, personal data is securely deleted. Client project data is retained as agreed in the project agreement.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">5. Third-Party Processors</h2>
            <p className="text-silver/70 leading-relaxed mb-3">
              We use a small number of trusted third-party services to operate our business:
            </p>
            <ul className="text-silver/70 leading-relaxed mb-4 space-y-1 list-disc list-inside">
              <li><strong className="text-white/80">Email hosting</strong> — to receive and send emails</li>
              <li><strong className="text-white/80">Cloud infrastructure</strong> — for hosting our website</li>
              <li><strong className="text-white/80">Payment processors</strong> — for invoicing (no card data stored by us)</li>
            </ul>
            <p className="text-silver/70 leading-relaxed mb-4">
              All processors are contractually required to handle your data securely and in accordance with applicable data protection law.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">6. Your Rights (NDPR &amp; GDPR)</h2>
            <p className="text-silver/70 leading-relaxed mb-3">
              Under the NDPR and GDPR, you have the right to:
            </p>
            <ul className="text-silver/70 leading-relaxed mb-4 space-y-1 list-disc list-inside">
              <li><strong className="text-white/80">Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong className="text-white/80">Rectification</strong> — ask us to correct inaccurate data</li>
              <li><strong className="text-white/80">Erasure</strong> — request deletion of your data where no legal basis exists for retention</li>
              <li><strong className="text-white/80">Restriction</strong> — ask us to limit processing in certain circumstances</li>
              <li><strong className="text-white/80">Portability</strong> — receive your data in a machine-readable format</li>
              <li><strong className="text-white/80">Objection</strong> — object to processing based on legitimate interests</li>
            </ul>
            <p className="text-silver/70 leading-relaxed mb-4">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:support@remshield.solutions" className="text-teal hover:underline">
                support@remshield.solutions
              </a>. We will respond within 30 days.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">7. Security</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              We use industry-standard security measures including HTTPS encryption and access controls to protect your data. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security, but we take reasonable precautions to protect your information.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">8. Changes to This Policy</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              We may update this policy periodically. The date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-white font-bold text-xl mt-8 mb-3">9. Contact</h2>
            <p className="text-silver/70 leading-relaxed mb-4">
              For any privacy-related questions or to exercise your data rights, contact us at{" "}
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
