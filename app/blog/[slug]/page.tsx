import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { allPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

function toISODate(dateStr: string): string {
  const months: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };
  const parts = dateStr.split(" ");
  return `${parts[2]}-${months[parts[0]]}-${parts[1].replace(",", "").padStart(2, "0")}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found — RemShield" };
  return {
    title: `${post.title} — RemShield Blog`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://remshield.solutions/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://remshield.solutions/blog/${params.slug}`,
      type: "article",
      publishedTime: toISODate(post.date),
      images: [
        {
          url: "/assets/remshield-logo.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// ── Markdown renderer ──────────────────────────────────────────────────────

function bold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
}

function inlineLink(text: string): string {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-teal underline underline-offset-2 hover:text-teal/80 transition-colors duration-150">$1</a>'
  );
}

function processInline(text: string): string {
  return inlineLink(bold(text));
}

function renderContent(raw: string) {
  const blocks = raw.trim().split(/\n\n+/);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // H3
    if (block.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-white mt-7 mb-3">
          {block.slice(4)}
        </h3>
      );
      continue;
    }

    // H2
    if (block.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4 pt-4 border-t border-white/6">
          {block.slice(3)}
        </h2>
      );
      continue;
    }

    // Unordered list
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      elements.push(
        <ul key={i} className="space-y-2.5 my-5 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-silver/75">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: processInline(item.slice(2)) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\./.test(block)) {
      const items = block.split("\n").filter((l) => /^\d+\./.test(l));
      elements.push(
        <ol key={i} className="space-y-3 my-5 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-silver/75">
              <span className="text-teal font-bold text-sm mt-0.5 flex-shrink-0 w-5">{j + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: processInline(item.replace(/^\d+\.\s/, "")) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (block === "---") {
      elements.push(<hr key={i} className="border-white/10 my-8" />);
      continue;
    }

    // Default paragraph
    elements.push(
      <p
        key={i}
        className="text-silver/75 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processInline(block) }}
      />
    );
  }

  return elements;
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-navy">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-silver/70 mb-6">This article does not exist or may have moved.</p>
          <Link href="/blog" className="text-teal hover:underline font-medium">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isTeal = post.tagColor === "teal";
  const accentHex = isTeal ? "#00D4C8" : "#00AAFF";
  const accentRgb = isTeal ? "0,212,200" : "0,170,255";
  const relatedPosts = getRelatedPosts(post.relatedSlugs);
  const isoDate = toISODate(post.date);
  const wordCount = post.content.split(/\s+/).length;

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://remshield.solutions/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://remshield.solutions/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://remshield.solutions/blog/${post.slug}`,
      },
    ],
  };

  // FAQ JSON-LD schema
  const faqSchema = post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  } : null;

  // Article JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.isPillar ? "Article" : "BlogPosting",
    "@id": `https://remshield.solutions/blog/${post.slug}#article`,
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "wordCount": wordCount,
    "image": {
      "@type": "ImageObject",
      "url": "https://remshield.solutions/assets/remshield-logo.png",
      "width": 1200,
      "height": 630,
    },
    "url": `https://remshield.solutions/blog/${post.slug}`,
    "isPartOf": { "@id": "https://remshield.solutions/blog#blog" },
    "author": {
      "@type": "Person",
      "@id": "https://remshield.solutions/#founder",
      "name": "David Adesina",
      "url": "https://remshield.solutions/about",
      "jobTitle": "Founder & AI Engineer",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://remshield.solutions/#organization",
        "name": "RemShield",
      },
      "knowsAbout": [
        "AI engineering",
        "AI automation",
        "large language models",
        "AI agents",
        "business process automation",
      ],
      "sameAs": [
        "https://www.linkedin.com/in/david-adesina-ai/",
      ],
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://remshield.solutions/#organization",
      "name": "RemShield",
      "url": "https://remshield.solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://remshield.solutions/assets/remshield-logo.png",
        "width": 400,
        "height": 400,
      },
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "article p"],
    },
    "inLanguage": "en",
    "about": { "@id": "https://remshield.solutions/#organization" },
  };

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-silver/40 mb-8">
            <Link href="/blog" className="hover:text-silver/70 transition-colors duration-150">Blog</Link>
            <span>/</span>
            <span style={{ color: accentHex }}>{post.category}</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: `rgba(${accentRgb},0.12)`, color: accentHex, border: `1px solid rgba(${accentRgb},0.2)` }}
            >
              {post.isPillar ? "Pillar Guide" : post.tag}
            </span>
            <span className="text-silver/40 text-xs">{post.date}</span>
            <span className="text-silver/25 text-xs">·</span>
            <span className="text-silver/40 text-xs">{post.readTime}</span>
            <span className="text-silver/25 text-xs">·</span>
            <span className="text-silver/40 text-xs">By David Adesina</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Accent line */}
          <div
            className="h-px mb-10"
            style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.5), rgba(${accentRgb},0.1), transparent)` }}
          />

          {/* Body */}
          <div className="space-y-5">
            {renderContent(post.content)}
          </div>

          {/* FAQ Section */}
          {post.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6 pt-4 border-t border-white/6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faq.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{
                      background: `rgba(${accentRgb},0.04)`,
                      border: `1px solid rgba(${accentRgb},0.1)`,
                    }}
                  >
                    <p className="text-white font-semibold mb-2 leading-snug">{q}</p>
                    <p className="text-silver/70 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden border border-white/10">
                <img
                  src="/assets/david-adesina.jpg"
                  alt="David Adesina"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-white font-semibold">David Adesina</p>
                <p className="text-teal text-xs font-medium mb-2">Founder, RemShield</p>
                <p className="text-silver/65 text-sm leading-relaxed mb-3">
                  David is the founder of RemShield, an AI engineering studio building intelligent systems and automation infrastructure for growth-stage businesses. He brings a global career spanning customer service, operations management, and fraud prevention before transitioning into AI engineering — giving him a grounded, business-first perspective on what AI can actually deliver in the real world.
                </p>
                <a
                  href="https://www.linkedin.com/in/david-adesina-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electricBlue text-sm hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div
            className="mt-14 p-8 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, rgba(13,21,48,0.95) 100%)`,
              border: `1px solid rgba(${accentRgb},0.2)`,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to build your AI systems?
            </h3>
            <p className="text-silver/65 text-sm mb-6 max-w-sm mx-auto">
              Book a free 30-minute strategy call with the RemShield team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, #00AAFF 0%, ${accentHex} 100%)`,
                boxShadow: `0 4px 20px rgba(${accentRgb},0.25)`,
              }}
            >
              Book a Free Consultation →
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.slice(0, 4).map((related) => {
                  const rTeal = related.tagColor === "teal";
                  const rAccent = rTeal ? "#00D4C8" : "#00AAFF";
                  return (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 bg-white/[0.03] border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <span className="text-xs font-medium" style={{ color: rAccent }}>{related.tag}</span>
                      <p className="text-white text-sm font-semibold leading-snug group-hover:text-white/85 transition-colors duration-150">
                        {related.title}
                      </p>
                      <span className="text-xs text-silver/40">{related.readTime}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link href="/blog" className="text-silver/50 hover:text-teal transition-colors duration-150 text-sm">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
