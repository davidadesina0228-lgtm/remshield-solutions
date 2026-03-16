"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

const categories = ["All", "AI Automation", "AI Systems", "AI Agents", "SaaS"] as const;

interface Props {
  posts: BlogPost[];
}

export default function BlogFilter({ posts }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? posts
      : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              active === cat
                ? { background: "rgba(0,212,200,0.15)", color: "#00D4C8", border: "1px solid rgba(0,212,200,0.35)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(200,214,229,0.6)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-xs opacity-60">
                {posts.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post) => {
          const isTeal = post.tagColor === "teal";
          const accentRgb = isTeal ? "0,212,200" : "0,170,255";
          const accentHex = isTeal ? "#00D4C8" : "#00AAFF";
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(13,21,48,0.9) 0%, rgba(8,14,30,0.95) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `rgba(${accentRgb},0.25)`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 30px rgba(${accentRgb},0.08)`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `rgba(${accentRgb},0.1)`, color: accentHex, border: `1px solid rgba(${accentRgb},0.15)` }}
                >
                  {post.tag}
                </span>
                <span className="text-silver/40 text-xs">{post.readTime}</span>
              </div>
              <h2 className="text-white font-semibold text-base leading-snug group-hover:text-white/90 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-silver/60 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-silver/35 text-xs">{post.date}</span>
                <span
                  className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200 inline-block"
                  style={{ color: accentHex }}
                >
                  Read →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-silver/50">No articles in this category yet.</p>
        </div>
      )}
    </>
  );
}
