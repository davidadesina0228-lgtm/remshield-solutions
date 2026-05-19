# AI Discoverability Launch And Monitoring Playbook

Date: 2026-05-19

## Goal

Turn the RemShield pilot into a repeatable service proof and keep the deployed layer healthy.

## Launch Checklist

Before announcing or using as sales proof:

- deploy the latest code
- confirm `/api/ai-discovery` loads
- confirm `/api/ai-discovery/snapshot` loads
- confirm `/api/ai-discovery/products` includes Answer Architect
- confirm `/api/ai-discovery/articles` is populated
- confirm `/api/ai-discovery/case-studies` is populated
- confirm `/api/ai-discovery/security` lists private-data exclusions
- confirm `/api/ai-discovery/health` returns `ok`
- confirm `/api/ai-discovery/proof` explains before and after
- confirm `/api/ai-discovery/mcp` lists safe read-only tools
- confirm `/llms.txt` mentions the AI discovery endpoints
- run the monitor script
- run the MCP smoke test locally

## Monitor Commands

Check the live AI discovery layer:

```bash
npm run ai-discovery:monitor
```

Check a local development server:

```bash
npm run ai-discovery:monitor -- --base http://localhost:3000
```

Check the MCP server:

```bash
npm run mcp:smoke
```

Check MCP against local development:

```bash
npm run mcp:smoke -- -Base http://localhost:3000
```

## Weekly Monitoring

Check:

- endpoint availability
- health status
- feed version
- broken URLs
- stale dates
- missing products/services
- changed contact information
- changed policies
- article feed freshness
- case-study feed accuracy
- private-data exposure risk

## Monthly Retainer Checklist

For each client:

- review new services/products/packages
- review pricing or availability changes
- update FAQs
- update policies
- update llms.txt
- validate schema
- validate feeds
- run API health checks
- run security review
- run before/after AI prompts
- send a short client report

## Client Report Format

```text
AI Discovery Health Report

Client:
Month:

Status:

What stayed healthy:

What changed:

Issues found:

Private-data check:

Recommended updates:

Next actions:
```

## Final RemShield Demo Prompt

```text
Audit RemShield's AI discoverability using these URLs:

https://remshield.solutions
https://remshield.solutions/llms.txt
https://remshield.solutions/api/ai-discovery
https://remshield.solutions/api/ai-discovery/proof
https://remshield.solutions/api/ai-discovery/products
https://remshield.solutions/api/ai-discovery/articles
https://remshield.solutions/api/ai-discovery/case-studies
https://remshield.solutions/api/ai-discovery/security
https://remshield.solutions/api/ai-discovery/health
https://remshield.solutions/api/ai-discovery/mcp

Explain what changed before and after the AI discovery layer, what facts are easier to cite, what remains private, and why this is useful for future client websites.
```

## Partner Talk Track

Use this in a client conversation:

```text
Search is changing. AI tools are not just reading pages anymore; they are starting to rely on structured data, feeds, APIs, and connectors.

We help your business prepare for that shift by creating an official AI-readable data layer.

That means AI tools can understand your services, products, locations, FAQs, policies, pricing rules, availability, and booking routes more accurately.

We also separate public, protected, and private data so sensitive information does not get exposed.
```

## First External Pilot Criteria

Pick a client with:

- simple enough systems to finish quickly
- useful public information
- one live-data need
- clear decision maker
- access to CMS/data sources
- willingness to approve public facts

Best first choices:

- hotel
- clinic
- ecommerce store
- travel company
- event venue
- course provider
- local service business with bookings

