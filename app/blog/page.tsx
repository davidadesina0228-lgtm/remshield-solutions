import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { allPosts } from "@/lib/blog-posts";
import BlogFilter from "./_components/BlogFilter";

export default function BlogPage() {
  const pillarPosts = allPosts.filter((p) => p.isPillar);
  const clusterPosts = allPosts.filter((p) => !p.isPillar);

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(0,212,200,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Insights &amp; Guides
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              The RemShield Blog
            </h1>
            <p className="text-silver/70 text-lg leading-relaxed">
              AI insights, automation frameworks, and strategic perspectives for decision-makers building intelligent companies.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Pillar guides — server-rendered */}
        <div className="mb-16">
          <p className="text-teal text-xs font-bold tracking-[0.2em] uppercase mb-6">Pillar Guides</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillarPosts.map((post) => {
              const isTeal = post.tagColor === "teal";
              const accentRgb = isTeal ? "0,212,200" : "0,170,255";
              const accentHex = isTeal ? "#00D4C8" : "#00AAFF";
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative pillar-card rounded-2xl p-6 flex flex-col gap-4"
                  style={{
                    "--accent-rgb": accentRgb,
                    background: `linear-gradient(135deg, rgba(${accentRgb},0.06) 0%, rgba(13,21,48,0.95) 100%)`,
                  } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `rgba(${accentRgb},0.12)`, color: accentHex, border: `1px solid rgba(${accentRgb},0.2)` }}
                    >
                      Pillar Guide
                    </span>
                    <span className="text-silver/50 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-white font-bold text-lg leading-snug group-hover:text-white/90 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-silver/65 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-silver/40 text-xs">{post.date}</span>
                    <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-block" style={{ color: accentHex }}>
                      Read guide →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category filter + cluster posts — client component */}
        <BlogFilter posts={clusterPosts} />

      </div>

      <Footer />
    </div>
  );
}
