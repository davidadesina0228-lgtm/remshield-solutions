export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "AI Automation" | "AI Systems" | "AI Agents" | "SaaS";
  tag: string;
  tagColor: "teal" | "blue";
  isPillar: boolean;
  author: string;
  content: string;
  faq: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
}

// Content is injected by lib/blog-content.ts (generated)
import { blogContent } from "./blog-content";

const blogMeta: Omit<BlogPost, "content" | "faq" | "relatedSlugs" | "author">[] = [
  {
    slug: "ai-automation-for-businesses",
    title: "AI Automation for Businesses: The Complete Guide (2026)",
    metaDescription: "Discover how AI automation transforms business operations, reduces costs by up to 40%, and enables 24/7 workflows. Your complete guide to implementing AI automation.",
    excerpt: "AI automation is reshaping how businesses operate - eliminating manual work, compressing timelines, and unlocking 24/7 capacity. This guide covers everything decision-makers need to know.",
    date: "March 10, 2026",
    readTime: "12 min read",
    category: "AI Automation",
    tag: "Pillar Guide",
    tagColor: "teal",
    isPillar: true,
  },
  {
    slug: "ai-systems-development",
    title: "AI Systems Development: Building Intelligent Software from the Ground Up",
    metaDescription: "Learn what AI systems development actually means, how it differs from traditional software, and the frameworks top companies use to build intelligent systems.",
    excerpt: "AI systems development is fundamentally different from traditional software engineering. This guide breaks down the architecture, lifecycle, and strategic decisions that determine whether AI projects succeed or fail.",
    date: "March 5, 2026",
    readTime: "11 min read",
    category: "AI Systems",
    tag: "Pillar Guide",
    tagColor: "blue",
    isPillar: true,
  },
  {
    slug: "ai-agents-for-business",
    title: "AI Agents for Business: The Next Digital Workforce",
    metaDescription: "AI agents are autonomous software systems that complete complex tasks. Learn how businesses are deploying AI agents to transform sales, support, and operations.",
    excerpt: "AI agents are software systems that perceive their environment, reason about goals, and take autonomous action. They represent the next evolution beyond chatbots and automation tools - and forward-thinking companies are already deploying them at scale.",
    date: "February 28, 2026",
    readTime: "10 min read",
    category: "AI Agents",
    tag: "Pillar Guide",
    tagColor: "teal",
    isPillar: true,
  },
  {
    slug: "ai-automation-customer-support",
    title: "AI Automation for Customer Support: Reduce Costs, Increase Satisfaction",
    metaDescription: "Learn how AI automation handles 80% of customer support inquiries, reduces costs by 30%, and improves CSAT. A practical implementation guide.",
    excerpt: "Customer support is one of the highest-ROI areas for AI automation. AI systems now handle 80% of routine inquiries without human intervention - while actually improving customer satisfaction scores.",
    date: "February 24, 2026",
    readTime: "8 min read",
    category: "AI Automation",
    tag: "Customer Support",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-automation-sales-teams",
    title: "AI Automation for Sales Teams: How Top Companies Are Closing More Deals",
    metaDescription: "AI automation helps sales teams generate 50% more leads, qualify faster, and close more deals. Discover the exact workflows high-performance sales teams are automating.",
    excerpt: "The best sales teams in 2026 aren't the biggest - they're the most automated. From lead scoring to personalised outreach to pipeline forecasting, AI is giving lean teams enterprise-level capacity.",
    date: "February 18, 2026",
    readTime: "8 min read",
    category: "AI Automation",
    tag: "Sales",
    tagColor: "teal",
    isPillar: false,
  },
  {
    slug: "ai-automation-business-operations",
    title: "AI Automation for Business Operations: Eliminating Bottlenecks Permanently",
    metaDescription: "AI automation reduces operational costs by 25-40% in back-office functions. Learn how to map, prioritise, and automate your core business operations.",
    excerpt: "Every business has operational bottlenecks that consume time without creating value. AI automation can eliminate them permanently - not by hiring more people, but by redesigning how work flows through your organisation.",
    date: "February 12, 2026",
    readTime: "8 min read",
    category: "AI Automation",
    tag: "Operations",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-automation-for-startups",
    title: "AI Automation for Startups: Scale Fast Without Hiring More People",
    metaDescription: "Startups using AI automation grow faster with smaller teams. Learn the high-leverage automation wins that let you compete with larger companies on a fraction of the headcount.",
    excerpt: "Startups have always had to do more with less. AI automation makes that constraint a genuine advantage - letting a small, focused team operate with the output of a company three times its size.",
    date: "February 5, 2026",
    readTime: "8 min read",
    category: "AI Automation",
    tag: "Startups",
    tagColor: "teal",
    isPillar: false,
  },
  {
    slug: "custom-ai-software-development",
    title: "Custom AI Software Development: Why Off-the-Shelf AI Tools Aren't Enough",
    metaDescription: "Generic AI tools give generic results. Learn when and why custom AI software development delivers 10x better outcomes and how the development process actually works.",
    excerpt: "Most businesses start with off-the-shelf AI tools and hit a ceiling within six months. Custom AI software development removes that ceiling entirely - building systems that know your data, your workflows, and your business logic.",
    date: "January 28, 2026",
    readTime: "9 min read",
    category: "AI Systems",
    tag: "Custom AI",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-workflow-automation-guide",
    title: "AI Workflow Automation: A Practical Guide for Business Leaders",
    metaDescription: "AI workflow automation goes beyond RPA to handle complex, decision-heavy processes. This practical guide shows you how to identify, design, and deploy AI-powered workflows.",
    excerpt: "AI workflow automation is not the same as traditional process automation. It can handle ambiguity, make decisions, adapt to new inputs, and orchestrate complex multi-step processes that rule-based systems simply cannot.",
    date: "January 21, 2026",
    readTime: "8 min read",
    category: "AI Systems",
    tag: "Workflows",
    tagColor: "teal",
    isPillar: false,
  },
  {
    slug: "ai-infrastructure-for-companies",
    title: "AI Infrastructure: The Technical Foundation Every Growing Company Needs",
    metaDescription: "85% of AI projects fail due to weak infrastructure - not poor models. Learn what AI infrastructure includes and how to build a foundation that scales with your ambitions.",
    excerpt: "Gartner research shows that 85% of AI projects fail due to inadequate data infrastructure - not poor model quality. Before any AI initiative can succeed, companies need the right foundation underneath it.",
    date: "January 14, 2026",
    readTime: "9 min read",
    category: "AI Systems",
    tag: "Infrastructure",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-engineering-vs-traditional-development",
    title: "AI Engineering vs Traditional Software Development: What's Actually Different",
    metaDescription: "AI engineering requires a fundamentally different approach to building software. Understand the 5 core differences and why they matter for your technology decisions.",
    excerpt: "Many companies try to apply traditional software development practices to AI engineering and wonder why their projects stall. The discipline is fundamentally different - and understanding those differences is the first step to building AI that actually works.",
    date: "January 7, 2026",
    readTime: "8 min read",
    category: "AI Systems",
    tag: "Engineering",
    tagColor: "teal",
    isPillar: false,
  },
  {
    slug: "ai-agents-sales-customer-service",
    title: "AI Agents for Sales and Customer Service: A Practical Deployment Guide",
    metaDescription: "AI agents for sales and customer service are transforming how companies interact with prospects and customers. Learn the architecture, deployment steps, and measurement framework.",
    excerpt: "The difference between a chatbot and an AI agent is the difference between a vending machine and a skilled employee. AI agents for sales and customer service understand context, handle exceptions, and improve over time - making them one of the highest-ROI AI investments a business can make.",
    date: "December 30, 2025",
    readTime: "9 min read",
    category: "AI Agents",
    tag: "Sales + Support",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-copilots-for-teams",
    title: "AI Copilots for Teams: Augmenting Human Intelligence at Scale",
    metaDescription: "AI copilots increase team productivity by up to 55%. Learn how to design, deploy, and drive adoption of AI copilots that genuinely augment - not replace - your people.",
    excerpt: "AI copilots are not about replacing people - they are about removing the friction that prevents talented people from doing their best work. When designed correctly, copilots feel less like software and more like a highly capable colleague who never sleeps.",
    date: "December 22, 2025",
    readTime: "8 min read",
    category: "AI Agents",
    tag: "AI Copilots",
    tagColor: "teal",
    isPillar: false,
  },
  {
    slug: "enterprise-ai-implementation",
    title: "Enterprise AI Implementation: A Step-by-Step Framework That Actually Works",
    metaDescription: "Most enterprise AI projects fail. Learn the 5-phase implementation framework that leading companies use to deploy AI successfully, measure ROI, and govern AI at scale.",
    excerpt: "Enterprise AI implementation has a well-documented problem: most projects fail. Not because the technology doesn't work, but because organisations approach AI deployment with the same frameworks they use for traditional IT projects - and those frameworks are wrong.",
    date: "December 15, 2025",
    readTime: "10 min read",
    category: "AI Agents",
    tag: "Enterprise AI",
    tagColor: "blue",
    isPillar: false,
  },
  {
    slug: "ai-in-saas-products",
    title: "AI in SaaS Products: What Every Founder Needs to Know in 2026",
    metaDescription: "AI is redefining SaaS product strategy. Learn the 4 AI SaaS archetypes, how to build defensible AI moats, and the product decisions that separate AI-native winners from laggards.",
    excerpt: "Every SaaS founder is asking the same question in 2026: how do we build AI into our product without it becoming a gimmick? The answer requires understanding which AI capabilities create genuine defensibility versus which ones your competitors can replicate in 90 days.",
    date: "December 8, 2025",
    readTime: "9 min read",
    category: "SaaS",
    tag: "SaaS + AI",
    tagColor: "teal",
    isPillar: false,
  },
];

// Merge metadata with content from blog-content.ts
export const allPosts: BlogPost[] = blogMeta.map((meta) => {
  const contentData = blogContent.find((c) => c.slug === meta.slug);
  return {
    ...meta,
    author: "David Adesina",
    content: contentData?.content ?? "",
    faq: contentData?.faq ?? [],
    relatedSlugs: contentData?.relatedSlugs ?? [],
  };
});

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];
}
