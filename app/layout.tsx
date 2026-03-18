import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://remshield.solutions"),
  title: "RemShield — AI Engineering Studio | AI Systems & Automation",
  description:
    "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses — engineered AI-native from the ground up.",
  keywords: [
    "AI engineering studio",
    "AI systems",
    "AI automation",
    "automation infrastructure",
    "custom AI software",
    "RemShield",
  ],
  icons: {
    icon: "/assets/remshield-logo.png",
    apple: "/assets/remshield-logo.png",
  },
  openGraph: {
    title: "RemShield — AI Engineering Studio",
    description:
      "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses — engineered AI-native from the ground up.",
    url: "https://remshield.solutions",
    siteName: "RemShield",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/remshield-logo.png",
        width: 500,
        height: 500,
        alt: "RemShield — AI Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RemShield — AI Engineering Studio",
    description:
      "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses — engineered AI-native from the ground up.",
    images: ["/assets/remshield-logo.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://remshield.solutions/#organization",
  name: "RemShield",
  alternateName: "RemShield Solutions",
  url: "https://remshield.solutions",
  logo: {
    "@type": "ImageObject",
    url: "https://remshield.solutions/assets/remshield-logo.png",
    width: 400,
    height: 400,
  },
  description:
    "RemShield is an AI engineering studio that designs and builds AI-powered software, automation infrastructure, and custom AI solutions for growth-stage businesses globally.",
  email: "support@remshield.solutions",
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    addressCountry: "NG",
    addressLocality: "Nigeria",
  },
  areaServed: ["NG", "GH", "KE", "ZA", "EG", "US", "GB", "DE", "NL", "FR", "CA", "AU"],
  founder: {
    "@type": "Person",
    "@id": "https://remshield.solutions/#founder",
    name: "David Adesina",
    url: "https://remshield.solutions/about",
    jobTitle: "Founder & AI Engineer",
    worksFor: { "@type": "Organization", name: "RemShield" },
    knowsAbout: [
      "AI engineering",
      "AI automation",
      "large language models",
      "AI agents",
      "business process automation",
      "n8n workflow automation",
      "RAG systems",
      "custom AI software development",
    ],
    sameAs: [
      "https://www.linkedin.com/in/david-adesina-ai/",
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@remshield.solutions",
    contactType: "customer service",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
  knowsAbout: [
    "AI systems development",
    "AI automation for businesses",
    "AI agents",
    "custom AI software",
    "workflow automation",
    "large language models",
    "RAG (retrieval-augmented generation)",
    "AI infrastructure",
    "n8n automation",
    "agentic AI",
    "AI strategy",
    "AI for African businesses",
  ],
  sameAs: [
    "https://www.linkedin.com/in/david-adesina-ai/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://remshield.solutions/#website",
  name: "RemShield",
  url: "https://remshield.solutions",
  description:
    "AI Engineering Studio — AI Systems, Automation Infrastructure, Custom Software",
  publisher: { "@id": "https://remshield.solutions/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://remshield.solutions/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[#080E1E] text-silver font-grotesk antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
