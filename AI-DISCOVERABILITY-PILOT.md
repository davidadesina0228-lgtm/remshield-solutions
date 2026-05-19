# RemShield AI Discoverability Pilot

Date: 2026-05-18
Status: Internal pilot implemented

## What This Pilot Proves

RemShield now has a first version of the technical layer we want to sell as
"AI Discoverability and Agent Readiness."

The site no longer relies only on pages, blog content, schema, and traditional
SEO signals. It also exposes a small public data layer that AI systems, agents,
search tools, and partner integrations can read without guessing from page copy.

## Public Assets Added

- `/api/ai-discovery`
  - Public index for all RemShield AI discovery feeds.

- `/api/ai-discovery/snapshot`
  - Full public AI-readable snapshot of all approved RemShield discovery data.
  - This is the reusable pattern for a client's daily full data snapshot.

- `/api/ai-discovery/changes`
  - Versioned public changelog for RemShield's AI discovery resources.
  - This is the reusable pattern for smaller updates when client prices,
    availability, inventory, services, policies, or FAQs change.

- `/api/ai-discovery/security`
  - Public data-safety policy for the pilot.
  - This explains which fields are public, which should be protected, and which
    must never be exposed.

- `/api/ai-discovery/health`
  - Machine-readable health and monitoring status for the discovery layer.
  - This is the reusable pattern for monthly checks and retainer monitoring.

- `/api/ai-discovery/proof`
  - Client-friendly before-and-after proof data.
  - This explains what changed, why it matters, and which endpoints prove it.

- `/api/ai-discovery/company`
  - Canonical company profile.

- `/api/ai-discovery/founder`
  - Canonical founder profile for David Adesina.

- `/api/ai-discovery/services`
  - Structured service definitions, use cases, target customers, timelines, and outcomes.

- `/api/ai-discovery/capabilities`
  - Technical capabilities, including the AI Discoverability and Agent Readiness pilot.

- `/api/ai-discovery/products`
  - Public product initiatives, including richer Answer Architect details and
    the official `answerarchitect.ai` domain.

- `/api/ai-discovery/articles`
  - Structured blog article summaries, categories, FAQ questions, metadata,
    and related article links.
  - This fixes the gap where AI had to crawl every blog post to understand the
    blog library.

- `/api/ai-discovery/case-studies`
  - Approved anonymized case-study and portfolio proof summaries.
  - This gives AI systems public proof without exposing client names, campaign
    records, CRM data, or private metrics.

- `/api/ai-discovery/faqs`
  - Canonical FAQ answers.

- `/api/ai-discovery/policies`
  - Public policy summaries and URLs.

- `/api/ai-discovery/contact`
  - Official contact and consultation details.

- `/api/ai-discovery/openapi`
  - OpenAPI description for the public discovery API.

- `/api/ai-discovery/mcp`
  - MCP-style read-only connector manifest. This is a blueprint for agent access,
    not a private authenticated MCP server.

- `/llms.txt`
  - Updated AI-readable site summary pointing to the new feeds and important pages.

## Internal Assets Added

- `AI-DISCOVERABILITY-BEFORE-AFTER-REPORT.md`
  - RemShield's internal pilot report showing before, after, proof endpoints,
    client demo prompts, value, and remaining limitations.

- `AI-DISCOVERABILITY-CLIENT-KIT.md`
  - Reusable client delivery kit covering intake, access, data classification,
    canonical models, feeds, APIs, agent readiness, security, testing, launch,
    monitoring, and pricing guidance.

- `tools/remshield-ai-discovery-agent.mjs`
  - Local command-line tester that behaves like a simple read-only agent.
  - It can fetch feeds, list MCP-style tools, search services, and run a full
    endpoint check against production or local development.

- `tools/remshield-mcp-server.mjs`
  - Real read-only MCP stdio server for RemShield's AI discovery layer.
  - It exposes tools and resources that MCP clients can use to fetch trusted
    public RemShield data.

- `tools/remshield-mcp-smoke-test.ps1`
  - MCP smoke test that checks initialization, tools, tool calls, resources,
    and resource reads.

- `REMSHIELD-MCP-SERVER.md`
  - Plain-English and technical explanation of how the MCP server works,
    how to configure it, and how this becomes a client service.

- `REMSHIELD-AI-DISCOVERABILITY-CASE-STUDY.md`
  - Final RemShield proof asset showing the problem, what changed, proof URLs,
    before-and-after comparison, MCP value, and client examples.

- `AI-DISCOVERABILITY-SALES-ONE-PAGER.md`
  - Simple client-facing one-pager your partner can use to explain and sell the
    offer.

- `AI-DISCOVERABILITY-LAUNCH-MONITORING.md`
  - Launch checklist, monitor commands, monthly retainer checklist, demo prompt,
    and partner talk track.

- `tools/remshield-ai-discovery-monitor.mjs`
  - Live endpoint monitor for the deployed AI discovery layer.

## Source Of Truth

All public AI discovery data currently lives in:

`lib/ai-discovery.ts`

This file is the canonical model. Schema, feeds, OpenAPI, and the MCP-style
manifest are generated from the same data so the public facts stay consistent.

## What Changed In Schema

The homepage and global layout now use the canonical model for:

- Organization schema
- WebSite schema
- WebAPI schema
- Service ItemList schema
- FAQPage schema

This makes the structured data more consistent with the public feeds.

## Data Safety Rule

The RemShield pilot exposes public data only.

Allowed:

- public company facts
- service descriptions
- public founder profile
- public product facts
- public FAQ answers
- public policy links
- public contact details

Not allowed:

- client data
- private dashboards
- credentials
- internal campaign details
- unpublished project details
- private pricing or proposals

## Feed Logic Pattern

The RemShield pilot now has two feed layers:

1. Full snapshot
   - Endpoint: `/api/ai-discovery/snapshot`
   - Purpose: one complete package of the current approved public business facts.
   - Client equivalent: daily full export of services, products, packages, locations,
     prices, availability, reviews, FAQs, policies, and booking links.

2. Changes feed
   - Endpoint: `/api/ai-discovery/changes`
   - Purpose: versioned list of what changed in the AI discovery layer.
   - Client equivalent: smaller updates during the day when price, inventory,
     availability, service, policy, or FAQ data changes.

3. Security policy
   - Endpoint: `/api/ai-discovery/security`
   - Purpose: public explanation of allowed, protected, and private data.
   - Client equivalent: the approved data-safety boundary before launch.

4. Health feed
   - Endpoint: `/api/ai-discovery/health`
   - Purpose: simple machine-readable status and monitoring checklist.
   - Client equivalent: monthly retainer checks and launch verification.

5. Proof feed
   - Endpoint: `/api/ai-discovery/proof`
   - Purpose: before-and-after proof that the layer changed how AI/tools can
     retrieve official business data.
   - Client equivalent: demo evidence for the client report.

For RemShield, most data is stable public company information. For future clients,
this same pattern becomes more valuable when live data changes regularly.

## How This Becomes A Client Service

For each client, repeat this pattern:

1. Audit
   - Identify website platform, CMS, booking system, CRM, catalogue, spreadsheets, and APIs.

2. Classify Data
   - Public: safe for anyone.
   - Protected: safe only with authentication.
   - Private: never expose.

3. Build Canonical Model
   - Services, products, packages, locations, prices, availability, reviews, FAQs, policies, and contact data.

4. Improve Website Signals
   - Schema, page structure, entity consistency, internal links, and `llms.txt`.

5. Add Feeds
   - Public JSON feeds for stable facts.
   - Daily snapshots for larger datasets.
   - Update feeds for prices, availability, or inventory where needed.

6. Add API Layer
   - Read-only endpoints for approved data.
   - OpenAPI documentation.
   - Caching and validation.

7. Add Agent Layer
   - MCP-style manifest or full MCP server where useful.
   - Read-only tools first.
   - Authentication for protected data.

8. Secure And Monitor
   - Logs, rate limits, access rules, data filters, and regular checks.

## Local Agent Tester

Use the local tester after starting the site locally or after deployment:

```bash
node tools/remshield-ai-discovery-agent.mjs check_all --base http://localhost:3000
node tools/remshield-ai-discovery-agent.mjs get_services --base http://localhost:3000
node tools/remshield-ai-discovery-agent.mjs search_services automation --base http://localhost:3000
node tools/remshield-ai-discovery-agent.mjs search_articles mcp --base http://localhost:3000
node tools/remshield-ai-discovery-agent.mjs search_case_studies campaign --base http://localhost:3000
node tools/remshield-ai-discovery-agent.mjs list_tools --base http://localhost:3000
```

Against production:

```bash
node tools/remshield-ai-discovery-agent.mjs check_all
```

Run the live monitor:

```bash
npm run ai-discovery:monitor
```

## Real MCP Server

Run the local read-only MCP server:

```bash
npm run mcp:remshield
```

Run the MCP smoke test:

```bash
npm run mcp:smoke
```

Against local development:

```bash
npm run mcp:smoke -- -Base http://localhost:3000
```

This server exposes RemShield's public AI discovery data through MCP tools and
resources. It is read-only and does not connect to private client data, CRM
records, credentials, payment data, or internal campaign data.

## Gap Fixes Added After First Proof Test

The first before-and-after test showed these gaps:

- Answer Architect details were too thin.
- Blog content existed, but no structured article feed existed.
- Portfolio/case-study proof was not machine-readable.

This follow-up adds:

- richer Answer Architect product data
- structured article feed at `/api/ai-discovery/articles`
- anonymized case-study feed at `/api/ai-discovery/case-studies`
- extra MCP-style tools for articles, products, and case studies

Founder personal site links are still not added until the exact approved URL is
confirmed.

## First Client Pilot Criteria

Choose a client where live or structured data matters:

- travel company
- hotel
- clinic
- event venue
- ecommerce store
- course provider
- real estate company
- service business with appointments or availability

Avoid the most complex client first. The best first pilot has clear public data
and one useful live-data question, such as price, availability, services, or locations.

## Partner Intake Checklist

Your partner should collect:

- website URL
- platform/CMS
- main services/products/packages
- locations served
- pricing rules
- availability rules
- FAQs and policies
- review sources
- booking/CRM/catalogue tools
- what changes often
- what must stay private
- who approves public facts
- what access is available

## Implementation Notes

For WordPress clients, start with admin access, custom fields, schema plugins,
the WordPress REST API, and a small custom plugin only if needed.

For Shopify clients, start with collaborator access, product data, collections,
inventory rules, and read-only Admin or Storefront API scopes.

For custom sites, start with repository access, hosting access, staging, and
environment variable rules.

For messy clients, build the data layer separately first using Google Sheets,
Airtable, a CSV export, or a small database, then connect deeper systems later.
