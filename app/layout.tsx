import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  aiDiscoveryWebApiJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/ai-discovery";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://remshield.solutions"),
  title: "RemShield - AI Engineering Studio | AI Systems & Automation",
  description:
    "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses - engineered AI-native from the ground up.",
  keywords: [
    "AI engineering studio",
    "AI systems",
    "AI automation",
    "automation infrastructure",
    "custom AI software",
    "AI discoverability",
    "agent readiness",
    "RemShield",
  ],
  icons: {
    icon: "/assets/remshield-logo.png",
    apple: "/assets/remshield-logo.png",
  },
  openGraph: {
    title: "RemShield - AI Engineering Studio",
    description:
      "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses - engineered AI-native from the ground up.",
    url: "https://remshield.solutions",
    siteName: "RemShield",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/remshield-logo.png",
        width: 500,
        height: 500,
        alt: "RemShield - AI Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RemShield - AI Engineering Studio",
    description:
      "RemShield builds AI systems, automation infrastructure, and custom AI software for growing businesses - engineered AI-native from the ground up.",
    images: ["/assets/remshield-logo.png"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiDiscoveryWebApiJsonLd()) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
