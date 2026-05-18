#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://remshield.solutions";

const endpointMap = {
  get_index: "/api/ai-discovery",
  get_snapshot: "/api/ai-discovery/snapshot",
  get_changes: "/api/ai-discovery/changes",
  get_security: "/api/ai-discovery/security",
  get_health: "/api/ai-discovery/health",
  get_proof: "/api/ai-discovery/proof",
  get_company: "/api/ai-discovery/company",
  get_founder: "/api/ai-discovery/founder",
  get_services: "/api/ai-discovery/services",
  get_capabilities: "/api/ai-discovery/capabilities",
  get_products: "/api/ai-discovery/products",
  get_faqs: "/api/ai-discovery/faqs",
  get_policies: "/api/ai-discovery/policies",
  get_contact: "/api/ai-discovery/contact",
  get_openapi: "/api/ai-discovery/openapi",
  get_mcp: "/api/ai-discovery/mcp",
};

function parseArgs(argv) {
  const args = [...argv];
  let baseUrl = process.env.AI_DISCOVERY_BASE_URL || DEFAULT_BASE_URL;

  const baseIndex = args.indexOf("--base");
  if (baseIndex !== -1) {
    baseUrl = args[baseIndex + 1];
    args.splice(baseIndex, 2);
  }

  return {
    command: args[0],
    rest: args.slice(1),
    baseUrl: baseUrl.replace(/\/$/, ""),
  };
}

function usage() {
  console.log(`
RemShield AI Discovery Agent Tester

Usage:
  node tools/remshield-ai-discovery-agent.mjs <command> [args] [--base <url>]

Examples:
  node tools/remshield-ai-discovery-agent.mjs get_index
  node tools/remshield-ai-discovery-agent.mjs get_services
  node tools/remshield-ai-discovery-agent.mjs search_services automation
  node tools/remshield-ai-discovery-agent.mjs check_all --base http://localhost:3000

Commands:
  ${Object.keys(endpointMap).join("\n  ")}
  search_services <query>
  list_tools
  check_all
`);
}

async function fetchJson(baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "remshield-ai-discovery-agent-tester/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} from ${url}`);
  }

  return {
    url,
    data: await response.json(),
  };
}

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
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

async function searchServices(baseUrl, query) {
  if (!query) {
    throw new Error("search_services needs a query, for example: automation");
  }

  const result = await fetchJson(baseUrl, endpointMap.get_services);
  const services = Array.isArray(result.data.data) ? result.data.data : [];
  const normalizedQuery = query.toLowerCase();

  const matches = services.filter((service) =>
    textForSearch(service).toLowerCase().includes(normalizedQuery)
  );

  printJson({
    command: "search_services",
    source: result.url,
    query,
    matchCount: matches.length,
    matches,
  });
}

async function listTools(baseUrl) {
  const result = await fetchJson(baseUrl, endpointMap.get_mcp);
  printJson({
    source: result.url,
    tools: result.data.tools,
    safety: result.data.safety,
  });
}

async function checkAll(baseUrl) {
  const checks = [];

  for (const [command, path] of Object.entries(endpointMap)) {
    try {
      const startedAt = Date.now();
      const result = await fetchJson(baseUrl, path);
      checks.push({
        command,
        url: result.url,
        status: "ok",
        durationMs: Date.now() - startedAt,
        version: result.data.version || result.data.info?.version || null,
      });
    } catch (error) {
      checks.push({
        command,
        url: `${baseUrl}${path}`,
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  printJson({
    command: "check_all",
    baseUrl,
    ok: checks.every((check) => check.status === "ok"),
    checks,
  });
}

async function main() {
  const { command, rest, baseUrl } = parseArgs(process.argv.slice(2));

  if (!command || command === "help" || command === "--help") {
    usage();
    return;
  }

  if (command === "search_services") {
    await searchServices(baseUrl, rest.join(" "));
    return;
  }

  if (command === "list_tools") {
    await listTools(baseUrl);
    return;
  }

  if (command === "check_all") {
    await checkAll(baseUrl);
    return;
  }

  const endpoint = endpointMap[command];
  if (!endpoint) {
    usage();
    process.exitCode = 1;
    return;
  }

  const result = await fetchJson(baseUrl, endpoint);
  printJson({
    command,
    source: result.url,
    data: result.data,
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
