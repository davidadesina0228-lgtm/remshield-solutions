import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
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
  name: "RemShield",
  url: "https://remshield.solutions",
  logo: "https://remshield.solutions/assets/remshield-logo.png",
  description:
    "AI Engineering Studio that designs and builds AI-powered software, automation systems, and custom AI solutions for growing businesses.",
  email: "contact@remshield.solutions",
  foundingDate: "2025",
  foundingLocation: { "@type": "Place", addressCountry: "NG" },
  founder: {
    "@type": "Person",
    name: "David Adesina",
    url: "https://www.linkedin.com/in/david-adesina-ai/",
    jobTitle: "Founder",
    sameAs: ["https://www.linkedin.com/in/david-adesina-ai/"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@remshield.solutions",
    contactType: "customer service",
  },
  sameAs: ["https://www.linkedin.com/in/david-adesina-ai/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RemShield",
  url: "https://remshield.solutions",
  description:
    "AI Engineering Studio — AI Systems, Automation Infrastructure, Custom Software",
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
      </body>
    </html>
  );
}
