# Case Study: How RemShield Made Its Website AI-Discoverable And Agent-Ready

Date: 2026-05-19
Status: Internal proof asset for partner/client conversations

## Short Version

RemShield turned its normal website into an AI-ready business data source.

Before, AI tools could read the website, but they still had to guess from pages.

After, AI tools can fetch approved RemShield facts from clean structured feeds, inspect proof of what changed, read the security rules, and use a read-only MCP server to retrieve trusted data.

This proves the service RemShield can now offer clients:

> We make your business easier for AI systems to understand, trust, cite, and safely retrieve from.

## The Problem

A normal website is built mainly for humans.

That means AI tools often have to inspect pages, infer meaning, and decide what matters.

For RemShield, this created gaps:

- AI could understand the main services, but not always the deeper structure.
- Answer Architect was not strongly represented as a product.
- Blog content existed, but there was no structured article feed.
- Case-study and portfolio proof was not machine-readable.
- There was no real MCP server for AI agent tools.
- There was no single proof asset showing before versus after.

## What We Built

RemShield now has:

- AI discovery index
- full public snapshot
- changes feed
- company feed
- founder feed
- services feed
- capabilities feed
- product feed
- article feed
- case-study feed
- FAQ feed
- policy feed
- contact feed
- security policy
- health feed
- proof feed
- OpenAPI documentation
- MCP-style manifest
- real read-only MCP server
- local monitor script

## Proof URLs

Use these after deployment:

| Proof | URL |
| --- | --- |
| AI discovery index | `https://remshield.solutions/api/ai-discovery` |
| Full snapshot | `https://remshield.solutions/api/ai-discovery/snapshot` |
| Changes feed | `https://remshield.solutions/api/ai-discovery/changes` |
| Proof feed | `https://remshield.solutions/api/ai-discovery/proof` |
| Security policy | `https://remshield.solutions/api/ai-discovery/security` |
| Health feed | `https://remshield.solutions/api/ai-discovery/health` |
| Products feed | `https://remshield.solutions/api/ai-discovery/products` |
| Articles feed | `https://remshield.solutions/api/ai-discovery/articles` |
| Case studies feed | `https://remshield.solutions/api/ai-discovery/case-studies` |
| OpenAPI | `https://remshield.solutions/api/ai-discovery/openapi` |
| MCP-style manifest | `https://remshield.solutions/api/ai-discovery/mcp` |
| llms.txt | `https://remshield.solutions/llms.txt` |

## Before And After

| Area | Before | After |
| --- | --- | --- |
| Business facts | Spread across website pages | Centralised in a canonical AI discovery model |
| AI understanding | AI had to infer from page copy | AI can fetch approved facts directly |
| Product clarity | Answer Architect detail was thin | Product feed includes domain, features, target users, and related article |
| Blog content | AI had to crawl each article | Article feed exposes structured summaries and metadata |
| Proof | Portfolio evidence was not structured | Case-study feed exposes approved anonymized proof |
| Freshness | No AI-specific changelog | Changes feed tracks discovery-layer updates |
| Safety | Private/public boundary was implicit | Security policy states what is public, protected, and private |
| Monitoring | No discovery health check | Health and monitor scripts check the layer |
| Agent readiness | MCP idea only | Real read-only MCP server exposes tools and resources |

## What The MCP Server Adds

The MCP server lets an AI assistant use named tools instead of guessing.

Examples:

- `get_remshield_services`
- `search_remshield_articles`
- `get_remshield_products`
- `get_remshield_case_studies`
- `get_remshield_security_policy`
- `get_remshield_proof`

This matters because agents work better when they have clear, safe tools.

The RemShield MCP server is read-only. It cannot edit the site, send emails, change data, access private dashboards, or expose private client records.

## Business Value

For RemShield, this creates proof that we can deliver a deeper technical service than normal SEO or content work.

For clients, this means:

- AI tools understand the business faster.
- AI answers are less likely to be wrong.
- AI tools can cite official source URLs.
- Live or structured data can be exposed safely.
- Private data can stay private.
- The business becomes more ready for AI agents.

## Client Examples

For a hotel, this could expose:

- rooms
- amenities
- policies
- location
- booking link
- public rates or protected live pricing
- availability through authenticated tools

For an ecommerce store, this could expose:

- products
- categories
- stock status
- delivery policy
- return policy
- product FAQs

For a clinic, this could expose:

- services
- practitioners
- locations
- appointment links
- opening hours
- patient policies

For a travel company, this could expose:

- packages
- destinations
- dates
- itinerary
- pricing rules
- availability
- cancellation terms

## Remaining Controlled Gaps

These are not failures. They are intentional boundaries.

- RemShield does not expose custom/private pricing.
- Named client data is not exposed without approval.
- Private campaign data is excluded.
- CRM records are excluded.
- Payment data is excluded.
- Credentials are excluded.

## Recommended Demo Prompt

```text
Compare RemShield's normal website with its AI discovery layer:

Website:
https://remshield.solutions

AI discovery layer:
https://remshield.solutions/api/ai-discovery
https://remshield.solutions/api/ai-discovery/products
https://remshield.solutions/api/ai-discovery/articles
https://remshield.solutions/api/ai-discovery/case-studies
https://remshield.solutions/api/ai-discovery/security
https://remshield.solutions/api/ai-discovery/proof

Explain what is clearer after the AI discovery layer, what facts are easier to cite, and why this would matter for a client business.
```

## Next Step

Use this case study to pitch the first external pilot.

Best first clients:

- hotel
- clinic
- ecommerce store
- travel company
- event venue
- course provider
- local service business with bookings

