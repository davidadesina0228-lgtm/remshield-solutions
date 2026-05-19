#!/usr/bin/env node

import readline from "node:readline";

const PROTOCOL_VERSION = "2025-06-18";
const SERVER_VERSION = "2026-05-19.1";
const DEFAULT_BASE_URL = "https://remshield.solutions";

const ERROR_CODES = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  RESOURCE_NOT_FOUND: -32002,
};

const endpointMap = {
  index: "/api/ai-discovery",
  snapshot: "/api/ai-discovery/snapshot",
  changes: "/api/ai-discovery/changes",
  security: "/api/ai-discovery/security",
  health: "/api/ai-discovery/health",
  proof: "/api/ai-discovery/proof",
  company: "/api/ai-discovery/company",
  founder: "/api/ai-discovery/founder",
  services: "/api/ai-discovery/services",
  capabilities: "/api/ai-discovery/capabilities",
  products: "/api/ai-discovery/products",
  articles: "/api/ai-discovery/articles",
  "case-studies": "/api/ai-discovery/case-studies",
  faqs: "/api/ai-discovery/faqs",
  policies: "/api/ai-discovery/policies",
  contact: "/api/ai-discovery/contact",
  openapi: "/api/ai-discovery/openapi",
  mcp: "/api/ai-discovery/mcp",
};

const resourceDefinitions = [
  resource("index", "AI Discovery Index", "Public index of RemShield AI discovery feeds."),
  resource("snapshot", "Full Snapshot", "Complete public package of approved RemShield facts."),
  resource("changes", "Changes Feed", "Versioned feed showing AI discovery layer changes."),
  resource("security", "Security Policy", "Public data-safety policy and exposure boundaries."),
  resource("health", "Health Feed", "Machine-readable status and monitoring checks."),
  resource("proof", "Proof Report", "Before-and-after proof for the RemShield pilot."),
  resource("company", "Company", "Canonical RemShield company profile."),
  resource("founder", "Founder", "Canonical public founder profile."),
  resource("services", "Services", "Structured service definitions."),
  resource("capabilities", "Capabilities", "Technical capabilities and productized packages."),
  resource("products", "Products", "Public product initiatives including Answer Architect."),
  resource("articles", "Articles", "Structured blog article summaries and metadata."),
  resource("case-studies", "Case Studies", "Approved anonymized portfolio proof summaries."),
  resource("faqs", "FAQs", "Canonical public FAQs."),
  resource("policies", "Policies", "Public policy summaries and links."),
  resource("contact", "Contact", "Official contact and consultation details."),
  resource("openapi", "OpenAPI", "Machine-readable API description."),
  resource("mcp", "MCP-Style Manifest", "Connector blueprint exposed by the website."),
];

const tools = [
  tool("get_remshield_discovery_index", "Get the public AI discovery index.", {}),
  tool("get_remshield_snapshot", "Get the full public AI discovery snapshot.", {}),
  tool("get_remshield_changes", "Get the versioned changes feed.", {}),
  tool("get_remshield_company", "Get the canonical RemShield company profile.", {}),
  tool("get_remshield_founder", "Get the canonical public founder profile.", {}),
  tool("get_remshield_services", "Get structured RemShield services.", {}),
  tool("search_remshield_services", "Search RemShield services by keyword.", {
    query: { type: "string", description: "Search term, such as automation, AI agents, CRM, or SaaS." },
    limit: { type: "integer", description: "Maximum number of matches to return. Default 10, max 50." },
  }, ["query"]),
  tool("get_remshield_capabilities", "Get RemShield technical capabilities and service packages.", {}),
  tool("get_remshield_products", "Get RemShield public product initiatives, including Answer Architect.", {}),
  tool("get_remshield_articles", "Get structured blog article summaries and metadata.", {
    category: { type: "string", description: "Optional category filter, such as AI Automation, AI Systems, AI Agents, or SaaS." },
    tag: { type: "string", description: "Optional tag filter, such as MCP, GEO, n8n, or Answer Architect." },
    pillarOnly: { type: "boolean", description: "When true, only return pillar articles." },
    limit: { type: "integer", description: "Maximum number of articles to return. Default 25, max 100." },
  }),
  tool("search_remshield_articles", "Search RemShield blog article summaries by keyword.", {
    query: { type: "string", description: "Search term, such as MCP, GEO, n8n, Answer Architect, or AI agents." },
    limit: { type: "integer", description: "Maximum number of matches to return. Default 10, max 50." },
  }, ["query"]),
  tool("get_remshield_case_studies", "Get approved public anonymized case-study and portfolio proof summaries.", {}),
  tool("search_remshield_case_studies", "Search approved public case-study summaries by keyword.", {
    query: { type: "string", description: "Search term, such as campaign, dashboard, workflow, or AI discovery." },
    limit: { type: "integer", description: "Maximum number of matches to return. Default 10, max 50." },
  }, ["query"]),
  tool("get_remshield_faqs", "Get canonical RemShield FAQs.", {}),
  tool("get_remshield_policies", "Get public policy summaries and URLs.", {}),
  tool("get_remshield_contact", "Get official contact and consultation information.", {}),
  tool("get_remshield_security_policy", "Get the AI discovery data-safety policy.", {}),
  tool("get_remshield_health", "Get AI discovery health and monitoring status.", {}),
  tool("get_remshield_proof", "Get the before-and-after proof report.", {}),
  tool("get_remshield_openapi", "Get the OpenAPI description for the AI discovery API.", {}),
  tool("get_remshield_mcp_manifest", "Get the website's public MCP-style connector manifest.", {}),
].map((definition) => ({
  ...definition,
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
}));

const toolHandlers = {
  get_remshield_discovery_index: () => getEndpoint("index"),
  get_remshield_snapshot: () => getEndpoint("snapshot"),
  get_remshield_changes: () => getEndpoint("changes"),
  get_remshield_company: () => getEndpoint("company"),
  get_remshield_founder: () => getEndpoint("founder"),
  get_remshield_services: () => getEndpoint("services"),
  search_remshield_services: (args) => searchEndpoint("services", args),
  get_remshield_capabilities: () => getEndpoint("capabilities"),
  get_remshield_products: () => getEndpoint("products"),
  get_remshield_articles: (args) => getArticles(args),
  search_remshield_articles: (args) => searchEndpoint("articles", args),
  get_remshield_case_studies: () => getEndpoint("case-studies"),
  search_remshield_case_studies: (args) => searchEndpoint("case-studies", args),
  get_remshield_faqs: () => getEndpoint("faqs"),
  get_remshield_policies: () => getEndpoint("policies"),
  get_remshield_contact: () => getEndpoint("contact"),
  get_remshield_security_policy: () => getEndpoint("security"),
  get_remshield_health: () => getEndpoint("health"),
  get_remshield_proof: () => getEndpoint("proof"),
  get_remshield_openapi: () => getEndpoint("openapi"),
  get_remshield_mcp_manifest: () => getEndpoint("mcp"),
};

const serverConfig = parseArgs(process.argv.slice(2));

function parseArgs(argv) {
  const args = [...argv];
  let baseUrl = process.env.REMSHIELD_AI_DISCOVERY_BASE_URL || DEFAULT_BASE_URL;

  const baseIndex = args.indexOf("--base");
  if (baseIndex !== -1) {
    baseUrl = args[baseIndex + 1] || baseUrl;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    apiKey: process.env.REMSHIELD_AI_DISCOVERY_API_KEY || "",
  };
}

function resource(id, title, description) {
  return {
    uri: `remshield://ai-discovery/${id}`,
    name: id,
    title,
    description,
    mimeType: "application/json",
    annotations: {
      audience: ["assistant"],
      priority: id === "snapshot" || id === "index" ? 1 : 0.8,
      lastModified: "2026-05-19T00:00:00Z",
    },
  };
}

function tool(name, description, properties, required = []) {
  return {
    name,
    title: name
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    description,
    inputSchema: {
      type: "object",
      properties,
      required,
      additionalProperties: false,
    },
  };
}

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message, data) {
  send({
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      ...(data === undefined ? {} : { data }),
    },
  });
}

async function fetchJson(endpointId) {
  const endpoint = endpointMap[endpointId];
  if (!endpoint) {
    throw new McpError(ERROR_CODES.RESOURCE_NOT_FOUND, `Unknown endpoint: ${endpointId}`);
  }

  const url = `${serverConfig.baseUrl}${endpoint}`;
  const headers = {
    Accept: "application/json",
    "User-Agent": "remshield-mcp-server/1.0",
  };

  if (serverConfig.apiKey) {
    headers.Authorization = `Bearer ${serverConfig.apiKey}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new McpError(
      ERROR_CODES.INTERNAL_ERROR,
      `Failed to fetch ${endpointId}: ${response.status} ${response.statusText}`,
      { url }
    );
  }

  return {
    sourceUrl: url,
    payload: await response.json(),
  };
}

async function getEndpoint(endpointId) {
  const { sourceUrl, payload } = await fetchJson(endpointId);
  return {
    sourceUrl,
    payload,
  };
}

async function getArticles(args = {}) {
  const { sourceUrl, payload } = await fetchJson("articles");
  const articles = Array.isArray(payload.data) ? payload.data : [];
  const limit = safeLimit(args.limit, 25, 100);

  let filtered = articles;

  if (typeof args.category === "string" && args.category.trim()) {
    const category = args.category.trim().toLowerCase();
    filtered = filtered.filter((item) => String(item.category || "").toLowerCase() === category);
  }

  if (typeof args.tag === "string" && args.tag.trim()) {
    const tag = args.tag.trim().toLowerCase();
    filtered = filtered.filter((item) => String(item.tag || "").toLowerCase().includes(tag));
  }

  if (args.pillarOnly === true) {
    filtered = filtered.filter((item) => item.isPillar === true);
  }

  return {
    sourceUrl,
    filters: {
      category: args.category || null,
      tag: args.tag || null,
      pillarOnly: args.pillarOnly === true,
      limit,
    },
    totalAvailable: articles.length,
    matchCount: filtered.length,
    data: filtered.slice(0, limit),
  };
}

async function searchEndpoint(endpointId, args = {}) {
  const query = assertString(args.query, "query");
  const limit = safeLimit(args.limit, 10, 50);
  const { sourceUrl, payload } = await fetchJson(endpointId);
  const items = Array.isArray(payload.data) ? payload.data : [];
  const normalizedQuery = query.toLowerCase();

  const matches = items
    .filter((item) => textForSearch(item).toLowerCase().includes(normalizedQuery))
    .slice(0, limit);

  return {
    sourceUrl,
    query,
    limit,
    totalAvailable: items.length,
    matchCount: matches.length,
    data: matches,
  };
}

function assertString(value, name) {
  if (typeof value !== "string" || !value.trim()) {
    throw new McpError(ERROR_CODES.INVALID_PARAMS, `${name} must be a non-empty string`);
  }

  return value.trim();
}

function safeLimit(value, fallback, max) {
  if (value === undefined || value === null) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new McpError(ERROR_CODES.INVALID_PARAMS, "limit must be a positive integer");
  }

  return Math.min(parsed, max);
}

function textForSearch(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(textForSearch).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value).map(textForSearch).join(" ");
  }

  return String(value);
}

function toolResult(data) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: {
      ok: true,
      ...data,
    },
    isError: false,
  };
}

function toolExecutionError(error) {
  return {
    content: [
      {
        type: "text",
        text: error instanceof Error ? error.message : String(error),
      },
    ],
    structuredContent: {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    },
    isError: true,
  };
}

function normalizeResourceUri(uri) {
  if (typeof uri !== "string") {
    throw new McpError(ERROR_CODES.INVALID_PARAMS, "uri must be a string");
  }

  const prefix = "remshield://ai-discovery/";
  if (!uri.startsWith(prefix)) {
    throw new McpError(ERROR_CODES.RESOURCE_NOT_FOUND, "Resource not found", { uri });
  }

  const id = uri.slice(prefix.length);
  if (!endpointMap[id]) {
    throw new McpError(ERROR_CODES.RESOURCE_NOT_FOUND, "Resource not found", { uri });
  }

  return id;
}

async function handleRequest(request) {
  const { id, method, params = {} } = request;

  if (id === null || id === undefined) {
    return;
  }

  switch (method) {
    case "initialize":
      return sendResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          resources: {
            listChanged: false,
          },
          tools: {
            listChanged: false,
          },
        },
        serverInfo: {
          name: "remshield-ai-discovery",
          title: "RemShield AI Discovery MCP Server",
          version: SERVER_VERSION,
        },
        instructions:
          "Use these read-only tools and resources to fetch trusted public RemShield business data. Do not infer private client data, pricing, credentials, or unpublished project details.",
      });

    case "ping":
      return sendResult(id, {});

    case "tools/list":
      return sendResult(id, { tools });

    case "tools/call":
      return callTool(id, params);

    case "resources/list":
      return sendResult(id, { resources: resourceDefinitions });

    case "resources/read":
      return readResource(id, params);

    case "resources/templates/list":
      return sendResult(id, { resourceTemplates: [] });

    default:
      return sendError(id, ERROR_CODES.METHOD_NOT_FOUND, `Method not found: ${method}`);
  }
}

async function callTool(id, params) {
  const name = params?.name;
  const args = params?.arguments || {};

  if (typeof name !== "string" || !toolHandlers[name]) {
    return sendError(id, ERROR_CODES.INVALID_PARAMS, `Unknown tool: ${name}`);
  }

  try {
    const data = await toolHandlers[name](args);
    return sendResult(id, toolResult(data));
  } catch (error) {
    if (error instanceof McpError && error.isProtocolError) {
      return sendError(id, error.code, error.message, error.data);
    }

    return sendResult(id, toolExecutionError(error));
  }
}

async function readResource(id, params) {
  try {
    const endpointId = normalizeResourceUri(params?.uri);
    const { sourceUrl, payload } = await fetchJson(endpointId);
    return sendResult(id, {
      contents: [
        {
          uri: params.uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              sourceUrl,
              payload,
            },
            null,
            2
          ),
        },
      ],
    });
  } catch (error) {
    if (error instanceof McpError) {
      return sendError(id, error.code, error.message, error.data);
    }

    return sendError(
      id,
      ERROR_CODES.INTERNAL_ERROR,
      error instanceof Error ? error.message : String(error)
    );
  }
}

function isRequestLike(value) {
  return value && typeof value === "object" && value.jsonrpc === "2.0" && typeof value.method === "string";
}

class McpError extends Error {
  constructor(code, message, data) {
    super(message);
    this.name = "McpError";
    this.code = code;
    this.data = data;
    this.isProtocolError =
      code === ERROR_CODES.INVALID_PARAMS ||
      code === ERROR_CODES.METHOD_NOT_FOUND ||
      code === ERROR_CODES.INVALID_REQUEST ||
      code === ERROR_CODES.RESOURCE_NOT_FOUND;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", async (line) => {
  if (!line.trim()) {
    return;
  }

  let message;
  try {
    message = JSON.parse(line);
  } catch (error) {
    sendError(null, ERROR_CODES.PARSE_ERROR, "Parse error");
    return;
  }

  const messages = Array.isArray(message) ? message : [message];

  for (const item of messages) {
    if (!isRequestLike(item)) {
      if (item?.id !== undefined) {
        sendError(item.id, ERROR_CODES.INVALID_REQUEST, "Invalid request");
      }
      continue;
    }

    try {
      await handleRequest(item);
    } catch (error) {
      if (item.id !== undefined && item.id !== null) {
        sendError(
          item.id,
          ERROR_CODES.INTERNAL_ERROR,
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  }
});
