#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://remshield.solutions";

const requiredEndpoints = [
  { id: "index", path: "/api/ai-discovery" },
  { id: "snapshot", path: "/api/ai-discovery/snapshot" },
  { id: "changes", path: "/api/ai-discovery/changes" },
  { id: "security", path: "/api/ai-discovery/security" },
  { id: "health", path: "/api/ai-discovery/health" },
  { id: "proof", path: "/api/ai-discovery/proof" },
  { id: "company", path: "/api/ai-discovery/company" },
  { id: "founder", path: "/api/ai-discovery/founder" },
  { id: "services", path: "/api/ai-discovery/services" },
  { id: "capabilities", path: "/api/ai-discovery/capabilities" },
  { id: "products", path: "/api/ai-discovery/products" },
  { id: "articles", path: "/api/ai-discovery/articles" },
  { id: "case-studies", path: "/api/ai-discovery/case-studies" },
  { id: "faqs", path: "/api/ai-discovery/faqs" },
  { id: "policies", path: "/api/ai-discovery/policies" },
  { id: "contact", path: "/api/ai-discovery/contact" },
  { id: "openapi", path: "/api/ai-discovery/openapi" },
  { id: "mcp", path: "/api/ai-discovery/mcp" },
  { id: "llms", path: "/llms.txt", text: true },
  { id: "robots", path: "/robots.txt", text: true },
  { id: "sitemap", path: "/sitemap.xml", text: true },
];

function parseArgs(argv) {
  const args = [...argv];
  let baseUrl = process.env.REMSHIELD_AI_DISCOVERY_BASE_URL || DEFAULT_BASE_URL;

  const baseIndex = args.indexOf("--base");
  if (baseIndex !== -1) {
    baseUrl = args[baseIndex + 1] || baseUrl;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
  };
}

async function fetchEndpoint(baseUrl, endpoint) {
  const url = `${baseUrl}${endpoint.path}`;
  const startedAt = Date.now();
  const response = await fetch(url, {
    headers: {
      Accept: endpoint.text ? "text/plain,text/xml,*/*" : "application/json",
      "User-Agent": "remshield-ai-discovery-monitor/1.0",
    },
  });

  const rawBody = await response.text();
  const durationMs = Date.now() - startedAt;
  let body = rawBody;

  if (!endpoint.text && rawBody) {
    body = JSON.parse(rawBody);
  }

  return {
    id: endpoint.id,
    url,
    ok: response.ok,
    status: response.status,
    durationMs,
    contentType: response.headers.get("content-type"),
    body,
    size: rawBody.length,
  };
}

function arrayLength(value) {
  return Array.isArray(value) ? value.length : 0;
}

function getResourceData(result) {
  return result?.body?.data;
}

function addCheck(checks, name, ok, detail, severity = "error") {
  checks.push({ name, ok, severity, detail });
}

function validate(results) {
  const checks = [];
  const byId = Object.fromEntries(results.map((result) => [result.id, result]));
  const jsonResults = results.filter((result) => typeof result.body === "object");
  const versions = new Set(
    jsonResults
      .map((result) => result.body?.version || result.body?.info?.version)
      .filter(Boolean)
  );

  for (const result of results) {
    addCheck(
      checks,
      `${result.id}_available`,
      result.ok,
      `${result.status} from ${result.url} in ${result.durationMs}ms`
    );
  }

  addCheck(
    checks,
    "version_consistency",
    versions.size === 1,
    versions.size === 1
      ? `All versioned JSON endpoints report ${[...versions][0]}.`
      : `Multiple versions found: ${[...versions].join(", ")}`
  );

  addCheck(
    checks,
    "health_status_ok",
    byId.health?.body?.status === "ok",
    `Health status: ${byId.health?.body?.status || "missing"}`
  );

  addCheck(
    checks,
    "snapshot_has_resources",
    Boolean(byId.snapshot?.body?.resources && byId.snapshot.body.resourceCount >= 8),
    `Snapshot resourceCount: ${byId.snapshot?.body?.resourceCount || 0}`
  );

  addCheck(
    checks,
    "products_include_answer_architect",
    JSON.stringify(getResourceData(byId.products) || "").includes("Answer Architect"),
    "Products feed should include Answer Architect."
  );

  addCheck(
    checks,
    "articles_feed_populated",
    arrayLength(getResourceData(byId.articles)) >= 10,
    `Articles found: ${arrayLength(getResourceData(byId.articles))}`
  );

  addCheck(
    checks,
    "case_studies_feed_populated",
    arrayLength(getResourceData(byId["case-studies"])) >= 1,
    `Case studies found: ${arrayLength(getResourceData(byId["case-studies"]))}`
  );

  addCheck(
    checks,
    "mcp_tools_available",
    arrayLength(byId.mcp?.body?.tools) >= 5,
    `MCP-style manifest tools found: ${arrayLength(byId.mcp?.body?.tools)}`
  );

  addCheck(
    checks,
    "openapi_paths_available",
    Boolean(byId.openapi?.body?.paths?.["/api/ai-discovery"]),
    "OpenAPI should describe /api/ai-discovery."
  );

  addCheck(
    checks,
    "llms_mentions_ai_discovery",
    String(byId.llms?.body || "").includes("/api/ai-discovery"),
    "llms.txt should mention AI discovery endpoints."
  );

  addCheck(
    checks,
    "security_policy_lists_private_exclusions",
    arrayLength(byId.security?.body?.policy?.privateDataNeverExpose) >= 5,
    `Private exclusions listed: ${arrayLength(byId.security?.body?.policy?.privateDataNeverExpose)}`
  );

  const errors = checks.filter((check) => !check.ok && check.severity === "error");
  const warnings = checks.filter((check) => !check.ok && check.severity === "warning");

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    checks,
  };
}

async function main() {
  const { baseUrl } = parseArgs(process.argv.slice(2));
  const results = [];

  for (const endpoint of requiredEndpoints) {
    try {
      results.push(await fetchEndpoint(baseUrl, endpoint));
    } catch (error) {
      results.push({
        id: endpoint.id,
        url: `${baseUrl}${endpoint.path}`,
        ok: false,
        status: 0,
        durationMs: 0,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const validation = validate(results);

  const report = {
    ok: validation.ok,
    checkedAt: new Date().toISOString(),
    baseUrl,
    summary: {
      endpointCount: results.length,
      availableCount: results.filter((result) => result.ok).length,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length,
    },
    errors: validation.errors,
    warnings: validation.warnings,
    checks: validation.checks,
    endpoints: results.map((result) => ({
      id: result.id,
      url: result.url,
      ok: result.ok,
      status: result.status,
      durationMs: result.durationMs,
      size: result.size || 0,
      error: result.error || null,
    })),
  };

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
