import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — RemShield AI Engineering Studio",
  description:
    "AI insights, automation frameworks, and strategic perspectives for decision-makers building intelligent companies. Pillar guides and deep-dive articles on AI systems, automation, and agents.",
  alternates: { canonical: "https://remshield.solutions/blog" },
  openGraph: {
    title: "Blog — RemShield AI Engineering Studio",
    description:
      "AI insights, automation frameworks, and strategic perspectives for decision-makers building intelligent companies.",
    url: "https://remshield.solutions/blog",
    type: "website",
    images: [{ url: "/assets/remshield-logo.png", width: 500, height: 500, alt: "RemShield Blog" }],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "RemShield Blog",
  url: "https://remshield.solutions/blog",
  description:
    "AI insights, automation frameworks, and strategic perspectives for decision-makers building intelligent companies.",
  publisher: {
    "@type": "Organization",
    name: "RemShield",
    url: "https://remshield.solutions",
    logo: {
      "@type": "ImageObject",
      url: "https://remshield.solutions/assets/remshield-logo.png",
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
