import { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog-posts";

function toISODate(dateStr: string): string {
  const months: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };
  const parts = dateStr.split(" ");
  return `${parts[2]}-${months[parts[0]]}-${parts[1].replace(",", "").padStart(2, "0")}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://remshield.solutions";
  const today = new Date().toISOString().split("T")[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: toISODate(post.date),
    changeFrequency: "monthly",
    priority: post.isPillar ? 0.9 : 0.7,
  }));

  return [...staticPages, ...blogPages];
}
