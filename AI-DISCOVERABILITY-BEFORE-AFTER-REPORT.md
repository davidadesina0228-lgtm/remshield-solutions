# RemShield AI Discoverability Before And After Report

Date: 2026-05-18
Status: Internal pilot evidence

## Simple Summary

Before this pilot, RemShield had a normal website that AI systems could read like a human visitor: pages, blog posts, schema, sitemap, robots.txt, and llms.txt.

After this pilot, RemShield also has a clean technical layer that AI systems and agents can fetch directly. Instead of guessing what RemShield does from page copy, a tool can now read approved facts from structured JSON feeds, a full snapshot, a changes feed, OpenAPI documentation, and an MCP-style read-only manifest.

In plain English: we gave AI tools a cleaner, safer, more official way to understand RemShield.

## What Was Added

The pilot added a public, read-only data layer:

- `/api/ai-discovery`
- `/api/ai-discovery/snapshot`
- `/api/ai-discovery/changes`
- `/api/ai-discovery/security`
- `/api/ai-discovery/health`
- `/api/ai-discovery/proof`
- `/api/ai-discovery/company`
- `/api/ai-discovery/founder`
- `/api/ai-discovery/services`
- `/api/ai-discovery/capabilities`
- `/api/ai-discovery/products`
- `/api/ai-discovery/articles`
- `/api/ai-discovery/case-studies`
- `/api/ai-discovery/faqs`
- `/api/ai-discovery/policies`
- `/api/ai-discovery/contact`
- `/api/ai-discovery/openapi`
- `/api/ai-discovery/mcp`

It also updated:

- `/llms.txt`
- global Organization, WebSite, and WebAPI JSON-LD
- homepage Service and FAQ JSON-LD
- local read-only MCP server tooling

All of this is generated from one canonical file:

`lib/ai-discovery.ts`

## Before And After

| Area | Before | After | Why It Matters |
| --- | --- | --- | --- |
| Business facts | Spread across pages and copy | Stored in one canonical model | Fewer contradictions and cleaner updates |
| AI access | AI had to crawl and infer | AI can fetch official JSON feeds | More accurate answers and citations |
| Full data package | No single complete AI snapshot | `/api/ai-discovery/snapshot` | One approved source for all public facts |
| Freshness | No dedicated AI changelog | `/api/ai-discovery/changes` | AI/tools can see what changed |
| Agent access | No tool manifest | `/api/ai-discovery/mcp` | Gives agents safe read-only actions |
| MCP server | No real MCP server | `tools/remshield-mcp-server.mjs` | MCP clients can call safe read-only RemShield tools |
| API documentation | No discovery API docs | `/api/ai-discovery/openapi` | Developers and tools can understand the API |
| Blog content | AI had to crawl article URLs individually | `/api/ai-discovery/articles` | AI can retrieve article summaries and metadata directly |
| Portfolio proof | No structured public case-study proof | `/api/ai-discovery/case-studies` | AI can see approved anonymized proof without private client data |
| Data safety | Data safety was implicit | `/api/ai-discovery/security` | Clear public/protected/private boundary |
| Monitoring | No discovery health check | `/api/ai-discovery/health` | Easy to test if the layer is alive |
| Client proof | No dedicated proof artifact | `/api/ai-discovery/proof` | Easy before/after evidence for demos |

## Immediate Proof To Show

Use these URLs after deployment:

| Proof | URL | What It Shows |
| --- | --- | --- |
| Discovery index | `https://remshield.solutions/api/ai-discovery` | The AI-readable table of contents |
| Full snapshot | `https://remshield.solutions/api/ai-discovery/snapshot` | All approved public RemShield facts in one package |
| Changes feed | `https://remshield.solutions/api/ai-discovery/changes` | Freshness and version tracking |
| Security policy | `https://remshield.solutions/api/ai-discovery/security` | What is safe, protected, and private |
| Health check | `https://remshield.solutions/api/ai-discovery/health` | Whether the layer is configured and monitorable |
| Proof report | `https://remshield.solutions/api/ai-discovery/proof` | The machine-readable before/after case |
| OpenAPI docs | `https://remshield.solutions/api/ai-discovery/openapi` | API documentation for tools and developers |
| MCP-style manifest | `https://remshield.solutions/api/ai-discovery/mcp` | Read-only agent connector blueprint |
| Real MCP server | `tools/remshield-mcp-server.mjs` | Local stdio server exposing read-only MCP tools and resources |
| Articles feed | `https://remshield.solutions/api/ai-discovery/articles` | Structured blog article summaries and metadata |
| Case studies feed | `https://remshield.solutions/api/ai-discovery/case-studies` | Approved anonymized portfolio proof |
| llms.txt | `https://remshield.solutions/llms.txt` | AI-friendly site map and priority guidance |

## Demo Script For A Client

### Before Prompt

Use the client website URL only.

```text
Using only this website URL, explain what this business sells, who it serves, what the main services or products are, whether pricing and availability are clear, what policies are available, and what information is missing or uncertain.
```

What you are looking for:

- vague answers
- missing prices or availability
- confused service names
- no clear source for policies
- AI guessing from page copy
- no clean data source to cite

### After Prompt

Use the client website URL plus the new AI discovery feed.

```text
Using this website and its AI discovery feed, explain what this business sells, who it serves, what the main services or products are, whether pricing and availability are clear, what policies are available, and cite the exact source endpoints you used.
```

What you are looking for:

- more precise services/products
- cleaner facts
- direct source endpoints
- fewer guesses
- clearer policies and contact routes
- better explanation of what changed recently

## What This Proves For RemShield

This proves we can build the first technical layer of the service:

- audit-friendly canonical data model
- structured public feeds
- full snapshot feed
- changes feed
- security policy
- health endpoint
- OpenAPI documentation
- MCP-style agent connector manifest
- local read-only MCP server
- llms.txt integration
- schema generated from the same data model
- structured article summaries
- anonymized portfolio proof

This is the foundation of the offer.

## What This Does Not Prove Yet

This RemShield pilot is intentionally simple. It does not yet prove:

- authenticated protected data access
- live booking engine integration
- live stock or availability updates
- real CRM integration
- real-time pricing sync
- edge rate limiting inside the application code
- request logging dashboard
- full production MCP server
- named client case studies with private metrics
- founder personal website connection, until the approved URL is confirmed

That is fine. RemShield mostly has stable public business information. The next client pilot should add one live-data use case, such as availability, inventory, package pricing, or appointment slots.

## Best Next Pilot

The strongest next pilot should be a business where structured data changes often:

- hotel
- travel company
- clinic
- event venue
- ecommerce store
- course provider
- real estate company
- local service business with appointments

The ideal first client has:

- clear services/products
- clear public FAQs and policies
- one live-data source
- simple access to the website or CMS
- someone who can approve public facts

## Client Value In Plain Terms

This helps the client because AI tools can:

- understand the business faster
- answer with less guessing
- cite the official source
- fetch current facts from a clean feed
- avoid scraping messy pages
- separate public data from private data
- prepare for future agent workflows

For the client, the promise is not "we guarantee ChatGPT will rank you tomorrow."

The honest promise is:

"We make your business easier for AI systems to understand, trust, cite, and retrieve from safely."

## Recommended Sales Framing

Use this as the first client explanation:

```text
Right now, AI tools mostly have to guess from your pages. We create an official AI-readable data layer for your business, so your services, products, prices, availability, FAQs, policies, and contact routes can be understood and retrieved more accurately.
```

Then show:

1. The messy before answer.
2. The new feed or API.
3. The cleaner after answer.
4. The security boundary.
5. The monitoring plan.
