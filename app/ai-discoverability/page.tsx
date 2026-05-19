import { Metadata } from "next";
import AiDiscoverabilityContent from "./AiDiscoverabilityContent";

export const metadata: Metadata = {
  title: "AI Discoverability & Agent Readiness — RemShield",
  description:
    "RemShield adds the structured data layer, public feeds, OpenAPI docs, and agent-ready connectors that let AI systems find, trust, and cite your business accurately.",
  alternates: { canonical: "https://remshield.solutions/ai-discoverability" },
  openGraph: {
    title: "AI Discoverability & Agent Readiness — RemShield",
    description:
      "Make your business visible to AI. Structured feeds, schema, OpenAPI, MCP-style connectors, and llms.txt — implemented in under 4 weeks.",
    url: "https://remshield.solutions/ai-discoverability",
    type: "website",
    images: [{ url: "/assets/remshield-logo.png", width: 500, height: 500, alt: "RemShield AI Discoverability" }],
  },
};

export default function AiDiscoverabilityPage() {
  return <AiDiscoverabilityContent />;
}
