import { allPosts } from "./blog-posts";

const SITE_URL = "https://remshield.solutions";
const UPDATED_AT = "2026-05-19";

export const aiDiscoveryVersion = "2026-05-19.1";

export type AiDiscoveryResource =
  | "company"
  | "founder"
  | "services"
  | "capabilities"
  | "products"
  | "articles"
  | "case-studies"
  | "faqs"
  | "policies"
  | "contact";

export const aiDiscoveryResources: AiDiscoveryResource[] = [
  "company",
  "founder",
  "services",
  "capabilities",
  "products",
  "articles",
  "case-studies",
  "faqs",
  "policies",
  "contact",
];

function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

const monthNumbers: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

function toIsoDate(date: string) {
  const match = date.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) {
    return date;
  }

  const [, monthName, day, year] = match;
  const month = monthNumbers[monthName];

  if (!month) {
    return date;
  }

  return `${year}-${month}-${day.padStart(2, "0")}`;
}

function toPascalCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export const remshieldCompany = {
  id: "remshield",
  name: "RemShield",
  legalName: "RemShield Solutions",
  url: SITE_URL,
  description:
    "RemShield is an AI engineering studio that designs and builds AI-powered software, automation infrastructure, and custom AI systems for growing businesses.",
  foundingDate: "2025",
  foundingLocation: {
    country: "Nigeria",
    countryCode: "NG",
  },
  headquarters: {
    country: "Nigeria",
    countryCode: "NG",
  },
  email: "support@remshield.solutions",
  logo: absolute("/assets/remshield-logo.png"),
  areaServed: [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Egypt",
    "United States",
    "United Kingdom",
    "Germany",
    "Netherlands",
    "France",
    "Canada",
    "Australia",
    "Worldwide",
  ],
  sameAs: ["https://www.linkedin.com/in/david-adesina-ai/"],
  publicProofPoints: [
    {
      label: "Systems deployed",
      value: "50+",
      sourceUrl: SITE_URL,
      verificationLevel:
        "Public homepage claim. Individual client names and private implementation details are not exposed without approval.",
    },
  ],
  knowsAbout: [
    "AI engineering",
    "AI automation",
    "AI systems development",
    "AI agents",
    "workflow automation",
    "business process automation",
    "custom AI software",
    "RAG systems",
    "n8n automation",
    "AI search visibility",
    "generative engine optimization",
    "agent readiness",
  ],
  dataClassification: "public",
  lastVerified: UPDATED_AT,
};

export const remshieldFounder = {
  id: "david-adesina",
  name: "David Adesina",
  jobTitle: "Founder and AI Engineer",
  url: absolute("/about"),
  image: absolute("/assets/david-adesina.png"),
  worksFor: "RemShield",
  location: "Nigeria",
  sameAs: ["https://www.linkedin.com/in/david-adesina-ai/"],
  knowsAbout: [
    "AI engineering",
    "AI automation",
    "large language models",
    "AI agents",
    "business process automation",
    "custom software development",
    "n8n workflow automation",
    "campaign intelligence systems",
  ],
  description:
    "David Adesina is the founder of RemShield, an AI engineering studio in Nigeria building intelligent systems, automation infrastructure, and custom AI software for growth-stage businesses.",
  dataClassification: "public",
  lastVerified: UPDATED_AT,
};

export const remshieldServices = [
  {
    id: "ai-systems",
    name: "AI Systems",
    serviceType: "AI systems development",
    shortDescription: "Automate thinking, not just tasks.",
    description:
      "Intelligent assistants, customer support agents, voice agents, document analysis systems, and custom AI copilots built around client workflows and data.",
    url: absolute("/contact?service=ai-systems"),
    contactUrl: absolute("/contact?service=ai-systems"),
    typicalTimeline: "2 to 12 weeks depending on complexity",
    targetCustomers: [
      "Growth-stage businesses",
      "Service companies",
      "Sales and support teams",
      "Operations-heavy businesses",
    ],
    useCases: [
      "Customer support agents",
      "AI voice agents",
      "Document analysis and extraction",
      "Internal AI copilots",
      "RAG knowledge assistants",
    ],
    outcomes: [
      "Reduce manual decision-heavy work",
      "Improve response speed",
      "Give teams access to business-specific AI assistance",
      "Create AI systems connected to existing tools",
    ],
    dataClassification: "public",
  },
  {
    id: "automation-infrastructure",
    name: "Automation Infrastructure",
    serviceType: "Workflow automation",
    shortDescription: "Remove manual work permanently.",
    description:
      "Automation infrastructure that connects tools, qualifies leads, runs operations pipelines, updates systems, monitors workflows, and reduces repetitive manual work.",
    url: absolute("/contact?service=automation-infrastructure"),
    contactUrl: absolute("/contact?service=automation-infrastructure"),
    typicalTimeline: "2 to 6 weeks for most workflow systems",
    targetCustomers: [
      "Founder-led businesses",
      "Sales teams",
      "Marketing teams",
      "Operations teams",
      "Agencies",
    ],
    useCases: [
      "CRM automation",
      "Lead qualification pipelines",
      "Email and follow-up automation",
      "Google Sheets and Airtable operations",
      "n8n workflow orchestration",
      "Campaign intelligence dashboards",
    ],
    outcomes: [
      "Reduce operational cost",
      "Increase team capacity without extra headcount",
      "Improve handoffs between tools",
      "Create monitored, repeatable operations pipelines",
    ],
    dataClassification: "public",
  },
  {
    id: "custom-software",
    name: "Custom Software",
    serviceType: "Custom AI software development",
    shortDescription: "Built for your business and powered by AI.",
    description:
      "Custom AI-powered software products, SaaS platforms, dashboards, client portals, and internal tools designed around how the business actually runs.",
    url: absolute("/contact?service=custom-software"),
    contactUrl: absolute("/contact?service=custom-software"),
    typicalTimeline: "4 to 12 weeks for MVPs and internal tools",
    targetCustomers: [
      "SaaS founders",
      "Agencies",
      "Internal operations teams",
      "Businesses replacing spreadsheet-heavy workflows",
    ],
    useCases: [
      "SaaS platforms",
      "Internal dashboards",
      "Client portals",
      "AI-powered applications",
      "Admin and back-office tools",
    ],
    outcomes: [
      "Ship usable software faster",
      "Replace manual systems with purpose-built tools",
      "Build AI-native product workflows",
      "Create scalable internal infrastructure",
    ],
    dataClassification: "public",
  },
];

export const remshieldCapabilities = [
  {
    id: "ai-discoverability-agent-readiness",
    name: "AI Discoverability and Agent Readiness",
    status: "pilot",
    description:
      "A technical delivery layer that makes business data structured, AI-readable, retrievable, and safer for agent workflows.",
    fitsUnder: ["AI Systems", "Automation Infrastructure", "Custom Software"],
    components: [
      "Website and data-source audit",
      "Canonical entity model",
      "Schema and JSON-LD implementation",
      "llms.txt and AI discovery documentation",
      "Public read-only JSON feeds",
      "OpenAPI documentation",
      "MCP-style read-only connector manifest",
      "Authentication, logging, rate limits, and private-data filtering where needed",
    ],
    bestFitClients: [
      "Travel companies",
      "Hotels",
      "Clinics",
      "Event venues",
      "Ecommerce stores",
      "Training providers",
      "Real estate businesses",
      "Local service businesses with booking or availability data",
    ],
    dataClassification: "public",
  },
  {
    id: "campaign-intelligence",
    name: "Campaign Intelligence Systems",
    status: "available",
    description:
      "Read-only dashboards and workflow infrastructure for tracking outreach sends, replies, hot leads, sender performance, warmup activity, and workflow errors.",
    fitsUnder: ["Automation Infrastructure", "Custom Software"],
    components: [
      "Google Sheets or database tracker",
      "n8n campaign workflows",
      "Reply monitoring",
      "Lead outcome classification",
      "Client dashboard",
      "Error logging",
    ],
    dataClassification: "public",
  },
];

export const remshieldProducts = [
  {
    id: "answer-architect",
    name: "Answer Architect",
    alternateNames: ["AnswerArchitect.ai"],
    domain: "answerarchitect.ai",
    url: "https://answerarchitect.ai",
    signupUrl: "https://answerarchitect.ai",
    learnMoreUrl: absolute("/blog/what-is-answer-architect"),
    status: "SaaS product",
    description:
      "AI search visibility and GEO optimization platform for helping brands understand and improve how they appear in AI-generated answers.",
    category: "AI search visibility",
    targetUsers: [
      "B2B companies",
      "SaaS companies",
      "agencies",
      "content teams",
      "founders who want visibility in AI-generated answers",
    ],
    features: [
      "AI search visibility auditing",
      "GEO content recommendations",
      "AI citability analysis",
      "entity and topic gap identification",
      "structured guidance for getting cited by AI search engines",
    ],
    relatedArticleUrl: absolute("/blog/what-is-answer-architect"),
    pricing: {
      status: "not_public",
      note:
        "Public pricing is not exposed in the RemShield AI discovery layer. Pricing should be added only when approved for public release or protected behind authentication.",
    },
    dataClassification: "public",
  },
];

export const remshieldArticles = allPosts.map((post) => ({
  id: post.slug,
  slug: post.slug,
  title: post.title,
  url: absolute(`/blog/${post.slug}`),
  metaDescription: post.metaDescription,
  excerpt: post.excerpt,
  publishedAt: toIsoDate(post.date),
  originalPublishedDate: post.date,
  readTime: post.readTime,
  category: post.category,
  tag: post.tag,
  isPillar: post.isPillar,
  author: post.author,
  faqQuestions: post.faq.map((item) => item.q),
  relatedArticleUrls: post.relatedSlugs.map((slug) => absolute(`/blog/${slug}`)),
  dataExposed:
    "Article metadata, summaries, FAQ questions, and related article links. Full article content remains available on the public article URL.",
  dataClassification: "public",
}));

export const remshieldCaseStudies = [
  {
    id: "campaign-intelligence-dashboard",
    name: "Campaign intelligence dashboard for cold email operations",
    status: "public_anonymized",
    clientName: "Not disclosed",
    serviceAreas: ["Automation Infrastructure", "Custom Software"],
    summary:
      "RemShield built a read-only campaign intelligence dashboard and workflow layer for tracking outreach sends, replies, hot leads, sender performance, warmup activity, and workflow errors.",
    problem:
      "Cold email campaign data can become scattered across sheets, inboxes, sending tools, and workflow logs, making it hard to see performance and operational issues in one place.",
    solutionComponents: [
      "Client dashboard",
      "Google Sheets or database-backed tracker",
      "n8n workflow monitoring",
      "Reply and lead outcome classification",
      "Sender performance visibility",
      "Workflow error reporting",
    ],
    publicOutcomes: [
      "Centralised campaign reporting",
      "Clearer visibility into sends, replies, warmup activity, and hot leads",
      "Read-only client access to operational campaign intelligence",
      "Private campaign data kept outside public AI discovery feeds",
    ],
    publicEvidenceUrls: [
      absolute("/client-dashboard/login"),
      absolute("/api/ai-discovery/capabilities"),
    ],
    privacyNote:
      "Client names, campaign records, email addresses, reply content, private metrics, and CRM data are intentionally not exposed publicly.",
    evidenceLevel: "Anonymized public portfolio summary",
    dataClassification: "public",
  },
  {
    id: "remshield-ai-discoverability-pilot",
    name: "RemShield AI Discoverability and Agent Readiness pilot",
    status: "internal_pilot",
    clientName: "RemShield",
    serviceAreas: ["AI Systems", "Automation Infrastructure", "Custom Software"],
    summary:
      "RemShield implemented its own AI-readable data layer to prove the AI Discoverability and Agent Readiness service before selling it to clients.",
    problem:
      "AI systems could read the normal website, but there was no single structured source for official RemShield facts, article summaries, proof data, or safe read-only agent actions.",
    solutionComponents: [
      "Canonical entity model",
      "AI discovery index",
      "Full public snapshot",
      "Changes feed",
      "Security policy",
      "Health feed",
      "Proof feed",
      "OpenAPI documentation",
      "MCP-style read-only manifest",
      "Article and case-study feeds",
    ],
    publicOutcomes: [
      "AI tools can fetch official RemShield business facts directly",
      "Approved public data is separated from private data",
      "Agent builders can inspect safe read-only actions",
      "The pilot can be shown as a before-and-after proof asset for future clients",
    ],
    publicEvidenceUrls: [
      absolute("/api/ai-discovery"),
      absolute("/api/ai-discovery/proof"),
      absolute("/api/ai-discovery/mcp"),
      absolute("/api/ai-discovery/health"),
    ],
    privacyNote:
      "Only public RemShield data is exposed. Private clients, credentials, campaign data, proposals, and payment data remain excluded.",
    evidenceLevel: "Direct public implementation evidence",
    dataClassification: "public",
  },
];

export const remshieldFaqs = [
  {
    question: "What services does RemShield offer?",
    answer:
      "RemShield is an AI engineering studio built around three pillars: AI Systems, Automation Infrastructure, and Custom Software. These include AI assistants, voice agents, document AI, custom copilots, workflow automation, CRM automation, operations pipelines, SaaS platforms, internal tools, and AI-powered applications.",
  },
  {
    question: "How long does it take to build an AI system?",
    answer:
      "Simple automations and AI integrations typically take 2 to 3 weeks. AI agents with custom logic and integrations often take 4 to 6 weeks. Enterprise-level or multi-agent systems can take 6 to 12 weeks depending on scope, data access, and integrations.",
  },
  {
    question: "Do clients need technical knowledge to work with RemShield?",
    answer:
      "No. Clients explain their business goals, processes, tools, and bottlenecks. RemShield handles the architecture, implementation, testing, deployment, and technical explanation.",
  },
  {
    question: "Can RemShield integrate AI into an existing business?",
    answer:
      "Yes. RemShield audits existing tools, workflows, data sources, and business processes to identify where AI and automation can create the most value, then builds systems around the current operating model.",
  },
  {
    question: "What makes RemShield different from a traditional agency?",
    answer:
      "RemShield focuses specifically on AI engineering, automation infrastructure, and AI-native custom software rather than bolting AI onto generic web or software projects.",
  },
  {
    question: "How do clients get started?",
    answer:
      "Clients can book a free strategy call or submit a project enquiry through the RemShield contact page. RemShield reviews the business context and recommends the highest-ROI AI or automation opportunities.",
  },
];

export const remshieldPolicies = [
  {
    id: "privacy",
    name: "Privacy Policy",
    url: absolute("/privacy"),
    summary:
      "Explains how RemShield collects, uses, stores, and protects information in line with NDPR and applicable GDPR requirements.",
    dataClassification: "public",
  },
  {
    id: "terms",
    name: "Terms of Service",
    url: absolute("/terms"),
    summary:
      "Defines RemShield service terms, project agreements, deliverable ownership, liability limits, and client responsibilities.",
    dataClassification: "public",
  },
];

export const remshieldContact = {
  email: "support@remshield.solutions",
  website: SITE_URL,
  contactPage: absolute("/contact"),
  consultationUrl: "https://calendly.com/david-remshield/30min",
  responseTime: "RemShield reviews submissions personally and typically responds within 1 to 2 business days.",
  dataClassification: "public",
  lastVerified: UPDATED_AT,
};

export const aiDiscoverySecurityPolicy = {
  version: aiDiscoveryVersion,
  policyName: "RemShield AI Discovery Data Safety Policy",
  dataClassification: "public",
  accessMode: "read-only",
  lastReviewed: UPDATED_AT,
  publicDataAllowed: [
    "Company facts",
    "Founder profile",
    "Service descriptions",
    "Capability descriptions",
    "Product summaries",
    "Article summaries and metadata",
    "Anonymized case study summaries",
    "FAQ answers",
    "Policy summaries and links",
    "Contact details",
  ],
  protectedDataRequiresAuth: [
    "Live availability",
    "Inventory details that should not be fully public",
    "Custom pricing",
    "Partner-only documentation",
    "Client-specific service data",
    "Named case studies with client-specific metrics",
  ],
  privateDataNeverExpose: [
    "Customer records",
    "Client CRM data",
    "Payment data",
    "Credentials and API secrets",
    "Internal notes",
    "Private dashboards",
    "Unpublished proposals",
    "Private pricing",
    "Internal campaign data",
    "Named client outcomes without written approval",
  ],
  currentControls: [
    "Only public RemShield business data is included.",
    "All endpoints are read-only.",
    "No customer, client, credential, CRM, or payment data is exposed.",
    "Discovery data is generated from a single canonical source of truth.",
    "Responses use public caching headers for static public data.",
  ],
  productionControlsForClients: [
    "Authentication for protected data endpoints.",
    "Role- or scope-based access for partner and agent integrations.",
    "Rate limiting at the edge, API gateway, or hosting layer.",
    "Request logging for protected endpoints.",
    "Error responses that do not leak private system details.",
    "Data minimization: expose only the fields needed for the use case.",
    "Human approval for public facts before publishing.",
    "Staging review before changing production feeds.",
  ],
  monitoringSignals: [
    "Endpoint availability",
    "Feed version",
    "Last verified date",
    "Schema validity",
    "Broken URLs",
    "Unexpected private fields",
    "Outdated prices, availability, policies, or service details",
    "Outdated article summaries or portfolio proof",
  ],
};

export const aiDiscoveryChangeLog = [
  {
    version: aiDiscoveryVersion,
    changedAt: UPDATED_AT,
    changeType: "structured_content_added",
    affectedResources: [
      "articles",
      "case-studies",
      "products",
      "company",
      "openapi",
      "mcp",
      "llms.txt",
    ],
    summary:
      "Added structured article summaries, anonymized case-study proof, richer Answer Architect product data, and new MCP-style read-only tools for articles and case studies.",
    dataClassification: "public",
  },
  {
    version: "2026-05-18.1",
    changedAt: "2026-05-18",
    changeType: "foundation_created",
    affectedResources: [
      "company",
      "founder",
      "services",
      "capabilities",
      "products",
      "faqs",
      "policies",
      "contact",
      "openapi",
      "mcp",
      "security",
      "health",
      "proof",
      "llms.txt",
    ],
    summary:
      "Created RemShield's first public AI discovery layer with canonical business data, read-only feeds, schema generated from the same source, OpenAPI documentation, and an MCP-style manifest.",
    dataClassification: "public",
  },
];

export const aiDiscoveryFeeds = [
  {
    id: "snapshot",
    name: "Full snapshot",
    url: absolute("/api/ai-discovery/snapshot"),
    description: "Complete public AI-readable package for RemShield's current approved business facts.",
    freshness: "Updated when any public AI discovery resource changes.",
  },
  {
    id: "changes",
    name: "Changes feed",
    url: absolute("/api/ai-discovery/changes"),
    description: "Versioned public changelog for AI discovery resources and freshness tracking.",
    freshness: "Updated whenever an AI discovery resource changes.",
  },
  {
    id: "security",
    name: "Security policy",
    url: absolute("/api/ai-discovery/security"),
    description: "Public data-safety policy for RemShield's AI discovery layer and client implementation pattern.",
    freshness: "Updated when security rules or client implementation controls change.",
  },
  {
    id: "health",
    name: "Health and monitoring",
    url: absolute("/api/ai-discovery/health"),
    description: "Machine-readable status, freshness, and monitoring checklist for AI discovery resources.",
    freshness: "Updated when the discovery layer changes.",
  },
  {
    id: "proof",
    name: "Before and after proof",
    url: absolute("/api/ai-discovery/proof"),
    description:
      "Client-friendly evidence showing what changed after the AI discovery layer was implemented.",
    freshness: "Updated when proof checks, demo prompts, or implementation evidence changes.",
  },
  {
    id: "company",
    name: "Company profile",
    url: absolute("/api/ai-discovery/company"),
    description: "Canonical public profile for RemShield as an organization.",
    freshness: "Updated when company facts change.",
  },
  {
    id: "founder",
    name: "Founder profile",
    url: absolute("/api/ai-discovery/founder"),
    description: "Canonical public profile for RemShield founder David Adesina.",
    freshness: "Updated when founder facts change.",
  },
  {
    id: "services",
    name: "Services feed",
    url: absolute("/api/ai-discovery/services"),
    description: "Public service definitions, use cases, timelines, and outcomes.",
    freshness: "Updated when service scope changes.",
  },
  {
    id: "capabilities",
    name: "Capabilities feed",
    url: absolute("/api/ai-discovery/capabilities"),
    description: "Public technical capabilities and productized service packages.",
    freshness: "Updated when RemShield adds or changes capabilities.",
  },
  {
    id: "products",
    name: "Products feed",
    url: absolute("/api/ai-discovery/products"),
    description: "Public SaaS and product initiatives associated with RemShield.",
    freshness: "Updated when product facts change.",
  },
  {
    id: "articles",
    name: "Articles feed",
    url: absolute("/api/ai-discovery/articles"),
    description:
      "Structured public article summaries, metadata, categories, FAQ questions, and related article links.",
    freshness: "Updated when RemShield publishes or changes blog article metadata.",
  },
  {
    id: "case-studies",
    name: "Case studies and portfolio proof feed",
    url: absolute("/api/ai-discovery/case-studies"),
    description:
      "Public anonymized case-study and portfolio proof summaries for RemShield work that can be safely exposed.",
    freshness: "Updated when approved public case studies or portfolio summaries change.",
  },
  {
    id: "faqs",
    name: "FAQ feed",
    url: absolute("/api/ai-discovery/faqs"),
    description: "Canonical question-and-answer set for AI and search systems.",
    freshness: "Updated when core FAQs change.",
  },
  {
    id: "policies",
    name: "Policies feed",
    url: absolute("/api/ai-discovery/policies"),
    description: "Links and summaries for public legal and policy pages.",
    freshness: "Updated when policies change.",
  },
  {
    id: "contact",
    name: "Contact feed",
    url: absolute("/api/ai-discovery/contact"),
    description: "Official public contact and consultation information.",
    freshness: "Updated when contact channels change.",
  },
];

const publicResourcePayloads: Record<AiDiscoveryResource, unknown> = {
  company: remshieldCompany,
  founder: remshieldFounder,
  services: remshieldServices,
  capabilities: remshieldCapabilities,
  products: remshieldProducts,
  articles: remshieldArticles,
  "case-studies": remshieldCaseStudies,
  faqs: remshieldFaqs,
  policies: remshieldPolicies,
  contact: remshieldContact,
};

export function getAiDiscoveryResource(resource: string) {
  if (!aiDiscoveryResources.includes(resource as AiDiscoveryResource)) {
    return null;
  }

  return {
    version: aiDiscoveryVersion,
    resource,
    source: SITE_URL,
    dataClassification: "public",
    lastVerified: UPDATED_AT,
    data: publicResourcePayloads[resource as AiDiscoveryResource],
  };
}

export function getAiDiscoveryIndex() {
  return {
    version: aiDiscoveryVersion,
    name: "RemShield AI Discovery Feed",
    description:
      "Public, read-only canonical data for AI systems, agents, search engines, and partner tools that need to understand RemShield accurately.",
    source: SITE_URL,
    dataClassification: "public",
    lastVerified: UPDATED_AT,
    usagePolicy:
      "This feed contains public business information only. It may be indexed, cited, and used to answer questions about RemShield with attribution to https://remshield.solutions.",
    privacyPolicy: absolute("/privacy"),
    termsOfService: absolute("/terms"),
    feeds: aiDiscoveryFeeds,
    documentation: {
      llmsTxt: absolute("/llms.txt"),
      sitemap: absolute("/sitemap.xml"),
      snapshot: absolute("/api/ai-discovery/snapshot"),
      changes: absolute("/api/ai-discovery/changes"),
      security: absolute("/api/ai-discovery/security"),
      health: absolute("/api/ai-discovery/health"),
      proof: absolute("/api/ai-discovery/proof"),
      openApi: absolute("/api/ai-discovery/openapi"),
      mcpStyleManifest: absolute("/api/ai-discovery/mcp"),
    },
  };
}

export function getAiDiscoverySnapshot() {
  return {
    version: aiDiscoveryVersion,
    snapshotType: "full",
    source: SITE_URL,
    dataClassification: "public",
    generatedAt: UPDATED_AT,
    lastVerified: UPDATED_AT,
    freshnessPolicy: {
      stableFacts:
        "Company, founder, service, policy, FAQ, product, article, case-study, and contact facts are updated when approved public information changes.",
      clientPattern:
        "For clients with live data, this endpoint would act as the full daily snapshot for services, products, packages, locations, prices, availability, policies, and reviews.",
      changesFeed: absolute("/api/ai-discovery/changes"),
    },
    resources: publicResourcePayloads,
    resourceCount: Object.keys(publicResourcePayloads).length,
    documentation: {
      index: absolute("/api/ai-discovery"),
      openApi: absolute("/api/ai-discovery/openapi"),
      mcpStyleManifest: absolute("/api/ai-discovery/mcp"),
      proof: absolute("/api/ai-discovery/proof"),
      articles: absolute("/api/ai-discovery/articles"),
      caseStudies: absolute("/api/ai-discovery/case-studies"),
      llmsTxt: absolute("/llms.txt"),
      sitemap: absolute("/sitemap.xml"),
    },
    safety: {
      policy: absolute("/api/ai-discovery/security"),
      allowedData: aiDiscoverySecurityPolicy.publicDataAllowed,
      excludedData: aiDiscoverySecurityPolicy.privateDataNeverExpose,
      accessMode: aiDiscoverySecurityPolicy.accessMode,
    },
  };
}

export function getAiDiscoveryChanges() {
  return {
    version: aiDiscoveryVersion,
    source: SITE_URL,
    dataClassification: "public",
    generatedAt: UPDATED_AT,
    latestSnapshot: absolute("/api/ai-discovery/snapshot"),
    changes: aiDiscoveryChangeLog,
    clientPattern: {
      purpose:
        "For clients with live data, this feed would list price, availability, inventory, service, package, location, policy, or FAQ changes after the last full snapshot.",
      examples: [
        "Room availability changed",
        "Product inventory updated",
        "Package price changed",
        "New service added",
        "Cancellation policy updated",
      ],
    },
  };
}

export function getAiDiscoverySecurity() {
  return {
    version: aiDiscoveryVersion,
    source: SITE_URL,
    generatedAt: UPDATED_AT,
    policy: aiDiscoverySecurityPolicy,
  };
}

export function getAiDiscoveryHealth() {
  return {
    version: aiDiscoveryVersion,
    source: SITE_URL,
    status: "ok",
    generatedAt: UPDATED_AT,
    dataClassification: "public",
    checks: [
      {
        name: "canonical_data_model",
        status: "ok",
        detail: "Public discovery resources are generated from lib/ai-discovery.ts.",
      },
      {
        name: "snapshot_feed",
        status: "ok",
        detail: "Full public snapshot endpoint is configured.",
        endpoint: absolute("/api/ai-discovery/snapshot"),
      },
      {
        name: "changes_feed",
        status: "ok",
        detail: "Versioned public changes endpoint is configured.",
        endpoint: absolute("/api/ai-discovery/changes"),
      },
      {
        name: "openapi_documentation",
        status: "ok",
        detail: "OpenAPI documentation is configured for public discovery endpoints.",
        endpoint: absolute("/api/ai-discovery/openapi"),
      },
      {
        name: "mcp_style_manifest",
        status: "ok",
        detail: "Read-only MCP-style connector manifest is configured.",
        endpoint: absolute("/api/ai-discovery/mcp"),
      },
      {
        name: "articles_feed",
        status: "ok",
        detail: "Structured article summaries and metadata feed is configured.",
        endpoint: absolute("/api/ai-discovery/articles"),
      },
      {
        name: "case_studies_feed",
        status: "ok",
        detail: "Anonymized public case-study and portfolio proof feed is configured.",
        endpoint: absolute("/api/ai-discovery/case-studies"),
      },
      {
        name: "proof_report",
        status: "ok",
        detail: "Before-and-after proof endpoint is configured for demos and client reporting.",
        endpoint: absolute("/api/ai-discovery/proof"),
      },
      {
        name: "private_data_exposure",
        status: "ok",
        detail: "No private client, credential, CRM, payment, or campaign data is included.",
      },
    ],
    monitoringPlan: aiDiscoverySecurityPolicy.monitoringSignals,
    nextProductionControlsForClients: aiDiscoverySecurityPolicy.productionControlsForClients,
  };
}

export function getAiDiscoveryProof() {
  return {
    version: aiDiscoveryVersion,
    source: SITE_URL,
    generatedAt: UPDATED_AT,
    dataClassification: "public",
    purpose:
      "Show the concrete before-and-after value of RemShield's AI Discoverability and Agent Readiness pilot.",
    beforeState: {
      summary:
        "RemShield had normal public pages, blog content, schema, sitemap, robots.txt, and an llms.txt file, but AI systems still had to infer many facts from page copy.",
      limitations: [
        "No single public JSON snapshot containing all approved company facts.",
        "No versioned changes feed for AI freshness.",
        "No public OpenAPI description for discovery data.",
        "No MCP-style manifest describing read-only agent actions.",
        "No explicit public security policy for what AI feeds may and may not expose.",
        "No health endpoint to monitor whether the discovery layer is working.",
        "No structured article summary feed for blog content.",
        "No public case-study or portfolio proof feed.",
      ],
    },
    afterState: {
      summary:
        "RemShield now has a structured, read-only AI discovery layer generated from one canonical source of truth.",
      improvements: [
        {
          improvement: "Canonical business model",
          value:
            "Company, founder, services, capabilities, products, FAQs, policies, and contact data are defined consistently in one place.",
          evidence: "lib/ai-discovery.ts",
        },
        {
          improvement: "Public AI discovery index",
          value:
            "AI tools can find every approved feed from one entry point instead of guessing from page structure.",
          evidence: absolute("/api/ai-discovery"),
        },
        {
          improvement: "Full snapshot feed",
          value:
            "AI tools can fetch one complete package of approved public facts for accurate answers and citations.",
          evidence: absolute("/api/ai-discovery/snapshot"),
        },
        {
          improvement: "Changes feed",
          value:
            "AI tools and partner systems can check what changed instead of re-reading everything.",
          evidence: absolute("/api/ai-discovery/changes"),
        },
        {
          improvement: "OpenAPI documentation",
          value:
            "Developers and tools can understand the available read-only endpoints in a standard machine-readable format.",
          evidence: absolute("/api/ai-discovery/openapi"),
        },
        {
          improvement: "MCP-style manifest",
          value:
            "Agent builders can see the safe read-only actions an AI agent should be allowed to perform.",
          evidence: absolute("/api/ai-discovery/mcp"),
        },
        {
          improvement: "Security policy",
          value:
            "The public layer states what is safe, what needs authentication, and what must never be exposed.",
          evidence: absolute("/api/ai-discovery/security"),
        },
        {
          improvement: "Health endpoint",
          value:
            "The layer can be checked regularly for freshness, availability, and private-data exposure risks.",
          evidence: absolute("/api/ai-discovery/health"),
        },
        {
          improvement: "Structured article feed",
          value:
            "AI systems can retrieve public blog metadata, summaries, categories, FAQ questions, and related article links without crawling every article first.",
          evidence: absolute("/api/ai-discovery/articles"),
        },
        {
          improvement: "Case-study proof feed",
          value:
            "AI systems can see approved anonymized portfolio proof while private client and campaign details remain protected.",
          evidence: absolute("/api/ai-discovery/case-studies"),
        },
      ],
    },
    demoQuestions: [
      {
        question:
          "What does RemShield do, who is it for, and what services does it offer?",
        before:
          "Before the pilot, an AI system had to infer this from pages, blog copy, and schema.",
        after:
          "After the pilot, an AI system can fetch the services, company, founder, FAQ, and contact feeds directly.",
        proofEndpoints: [
          absolute("/api/ai-discovery/company"),
          absolute("/api/ai-discovery/services"),
          absolute("/api/ai-discovery/faqs"),
        ],
      },
      {
        question:
          "What changed in RemShield's approved public data layer recently?",
        before:
          "Before the pilot, there was no dedicated freshness or changelog feed for AI systems.",
        after:
          "After the pilot, the changes feed gives a versioned public answer.",
        proofEndpoints: [absolute("/api/ai-discovery/changes")],
      },
      {
        question:
          "Can an AI agent safely fetch RemShield information without accessing private data?",
        before:
          "Before the pilot, there was no agent-specific safe-access blueprint.",
        after:
          "After the pilot, the MCP-style manifest and security policy describe read-only safe access.",
        proofEndpoints: [
          absolute("/api/ai-discovery/mcp"),
          absolute("/api/ai-discovery/security"),
        ],
      },
    ],
    clientProofPattern: {
      whatToShow:
        "Show the client's website before, then show the new feeds, schema, snapshot, changes feed, security policy, and AI answer tests after implementation.",
      simpleBeforePrompt:
        "Using only this website URL, tell me what this business sells, where the key information is, and whether you can find live pricing, availability, policies, and FAQs.",
      simpleAfterPrompt:
        "Using this website plus its AI discovery feed, answer the same question and cite the exact source endpoints you used.",
      evidenceToCollect: [
        "Endpoint screenshots or JSON previews",
        "Schema validation results",
        "llms.txt before and after",
        "AI answer before and after",
        "Security checklist",
        "Health check result",
      ],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: remshieldCompany.name,
    legalName: remshieldCompany.legalName,
    alternateName: remshieldCompany.legalName,
    url: remshieldCompany.url,
    logo: {
      "@type": "ImageObject",
      url: remshieldCompany.logo,
      width: 400,
      height: 400,
    },
    description: remshieldCompany.description,
    email: remshieldCompany.email,
    foundingDate: remshieldCompany.foundingDate,
    foundingLocation: {
      "@type": "Place",
      addressCountry: remshieldCompany.foundingLocation.countryCode,
      addressLocality: remshieldCompany.foundingLocation.country,
    },
    areaServed: remshieldCompany.areaServed,
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: remshieldFounder.name,
      url: remshieldFounder.url,
      image: remshieldFounder.image,
      jobTitle: remshieldFounder.jobTitle,
      worksFor: { "@type": "Organization", name: remshieldCompany.name },
      knowsAbout: remshieldFounder.knowsAbout,
      sameAs: remshieldFounder.sameAs,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: remshieldCompany.email,
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    knowsAbout: remshieldCompany.knowsAbout,
    sameAs: remshieldCompany.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: remshieldCompany.name,
    url: SITE_URL,
    description: "AI Engineering Studio - AI Systems, Automation Infrastructure, Custom Software",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RemShield Services",
    itemListElement: remshieldServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${service.id}`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
        url: service.url,
        audience: service.targetCustomers.map((customer) => ({
          "@type": "Audience",
          audienceType: customer,
        })),
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: remshieldFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function aiDiscoveryWebApiJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    "@id": `${SITE_URL}/api/ai-discovery#webapi`,
    name: "RemShield AI Discovery API",
    description:
      "Read-only public API exposing canonical RemShield company, service, product, article, case-study, FAQ, policy, and contact data for AI discovery and agent-readiness testing.",
    provider: { "@id": `${SITE_URL}/#organization` },
    documentation: absolute("/api/ai-discovery/openapi"),
    endpointUrl: absolute("/api/ai-discovery"),
    termsOfService: absolute("/terms"),
  };
}

export function openApiSpec() {
  const resourcePaths = Object.fromEntries(
    aiDiscoveryResources.map((resource) => [
      `/api/ai-discovery/${resource}`,
      {
        get: {
          summary: `Get RemShield ${resource} data`,
          description: `Returns the public canonical ${resource} data for RemShield.`,
          operationId: `getRemshield${toPascalCase(resource)}`,
          responses: {
            "200": {
              description: "Public RemShield AI discovery payload.",
            },
            "404": {
              description: "Resource not found.",
            },
          },
        },
      },
    ])
  );

  return {
    openapi: "3.1.0",
    info: {
      title: "RemShield AI Discovery API",
      version: aiDiscoveryVersion,
      description:
        "Read-only public API for AI systems and agents that need canonical RemShield business information.",
      contact: {
        name: "RemShield",
        email: remshieldContact.email,
        url: remshieldContact.contactPage,
      },
    },
    servers: [{ url: SITE_URL }],
    paths: {
      "/api/ai-discovery": {
        get: {
          summary: "Get AI discovery index",
          operationId: "getRemshieldAiDiscoveryIndex",
          responses: {
            "200": {
              description: "List of public AI discovery feeds and documentation URLs.",
            },
          },
        },
      },
      "/api/ai-discovery/snapshot": {
        get: {
          summary: "Get full AI discovery snapshot",
          operationId: "getRemshieldAiDiscoverySnapshot",
          responses: {
            "200": {
              description:
                "Complete public AI-readable package containing all approved RemShield discovery resources.",
            },
          },
        },
      },
      "/api/ai-discovery/changes": {
        get: {
          summary: "Get AI discovery changes feed",
          operationId: "getRemshieldAiDiscoveryChanges",
          responses: {
            "200": {
              description:
                "Versioned changelog and freshness feed for RemShield AI discovery resources.",
            },
          },
        },
      },
      "/api/ai-discovery/security": {
        get: {
          summary: "Get AI discovery security policy",
          operationId: "getRemshieldAiDiscoverySecurity",
          responses: {
            "200": {
              description:
                "Public data-safety policy for RemShield's AI discovery layer and reusable client implementation controls.",
            },
          },
        },
      },
      "/api/ai-discovery/health": {
        get: {
          summary: "Get AI discovery health and monitoring status",
          operationId: "getRemshieldAiDiscoveryHealth",
          responses: {
            "200": {
              description:
                "Machine-readable health, freshness, and monitoring status for RemShield AI discovery resources.",
            },
          },
        },
      },
      "/api/ai-discovery/proof": {
        get: {
          summary: "Get before-and-after proof report",
          operationId: "getRemshieldAiDiscoveryProof",
          responses: {
            "200": {
              description:
                "Client-friendly evidence showing what changed after the AI discovery layer was implemented.",
            },
          },
        },
      },
      ...resourcePaths,
      "/api/ai-discovery/mcp": {
        get: {
          summary: "Get MCP-style read-only tool manifest",
          operationId: "getRemshieldMcpStyleManifest",
          responses: {
            "200": {
              description:
                "Tool manifest describing read-only AI agent actions backed by RemShield public data feeds.",
            },
          },
        },
      },
    },
  };
}

export function mcpStyleManifest() {
  return {
    name: "remshield-public-data",
    title: "RemShield Public Data Connector",
    version: aiDiscoveryVersion,
    description:
      "MCP-style read-only manifest for querying public RemShield business data. This is a connector blueprint, not a private-data integration.",
    transport: "https-json",
    auth: {
      type: "none",
      note: "Public read-only data only. Private or client data requires a separate authenticated connector.",
    },
    tools: [
      {
        name: "search_remshield_services",
        description: "Find RemShield services and use cases by keyword.",
        readOnly: true,
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search term such as AI agents, CRM automation, or SaaS." },
          },
          required: ["query"],
        },
        dataEndpoint: absolute("/api/ai-discovery/services"),
      },
      {
        name: "get_remshield_company",
        description: "Fetch the canonical public company profile for RemShield.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/company"),
      },
      {
        name: "get_remshield_snapshot",
        description: "Fetch the full public AI discovery snapshot for RemShield.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/snapshot"),
      },
      {
        name: "get_remshield_changes",
        description: "Fetch the versioned AI discovery changes feed for RemShield.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/changes"),
      },
      {
        name: "get_remshield_security_policy",
        description: "Fetch RemShield's public AI discovery data-safety policy.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/security"),
      },
      {
        name: "get_remshield_health",
        description: "Fetch AI discovery health and monitoring status.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/health"),
      },
      {
        name: "get_remshield_proof",
        description: "Fetch the before-and-after proof report for the RemShield pilot.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/proof"),
      },
      {
        name: "get_remshield_capabilities",
        description: "Fetch RemShield technical capabilities and productized service packages.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/capabilities"),
      },
      {
        name: "get_remshield_products",
        description: "Fetch RemShield public product initiatives, including Answer Architect.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/products"),
      },
      {
        name: "search_remshield_articles",
        description: "Find RemShield blog article summaries by keyword.",
        readOnly: true,
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search term such as MCP, n8n, GEO, AI agents, or Answer Architect.",
            },
          },
          required: ["query"],
        },
        dataEndpoint: absolute("/api/ai-discovery/articles"),
      },
      {
        name: "get_remshield_articles",
        description: "Fetch structured RemShield article summaries and metadata.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/articles"),
      },
      {
        name: "get_remshield_case_studies",
        description: "Fetch approved public anonymized RemShield case-study and portfolio proof summaries.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/case-studies"),
      },
      {
        name: "get_remshield_faqs",
        description: "Fetch canonical RemShield FAQs and answers.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/faqs"),
      },
      {
        name: "get_remshield_contact",
        description: "Fetch official RemShield contact and consultation information.",
        readOnly: true,
        inputSchema: { type: "object", properties: {} },
        dataEndpoint: absolute("/api/ai-discovery/contact"),
      },
    ],
    safety: {
      dataClassification: "public",
      privateDataExposure: "none",
      allowedUse:
        "Answer questions about RemShield, cite RemShield public information, and route users to official RemShield pages.",
      disallowedUse:
        "Do not infer private client data, internal systems, confidential pricing, or unpublished project details from this manifest.",
    },
  };
}
