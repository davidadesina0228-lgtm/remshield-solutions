# AI Discoverability And Agent Readiness Client Kit

Date: 2026-05-18
Purpose: Reusable delivery checklist for RemShield and partner-led client projects

## The Offer In One Sentence

We make a client's website, data, and systems easier for AI tools to understand, trust, cite, and retrieve from safely.

## Who Handles What

Your partner handles:

- client conversations
- AEO/GEO content strategy
- service/product wording
- FAQs
- answer pages
- page copy
- positioning
- approvals

RemShield handles:

- technical audit
- data modelling
- schema
- llms.txt
- feeds
- APIs
- MCP-style connector planning
- security rules
- testing
- monitoring plan

## What We Need From The Client

### Minimum Needed For Audit

- website URL
- business name and legal name
- main services, products, packages, or locations
- target customers
- contact details
- booking link or sales enquiry route
- known FAQs
- policies, including cancellation, refunds, delivery, privacy, and terms
- where key data lives
- who approves public facts

### Access Needed If We Implement On Their Website

For WordPress:

- WordPress admin access
- plugin list
- theme or child-theme access if needed
- custom fields access if they use ACF, Meta Box, JetEngine, or similar
- REST API status
- staging access if available
- hosting or file access only if a custom plugin is needed

For Shopify:

- collaborator access
- products and collections access
- inventory rules
- location rules
- read-only Admin API scopes if needed
- Storefront API access if needed

For Webflow:

- workspace or site collaborator access
- CMS collection access
- sitemap and page list
- API token if feed generation needs automation

For Wix or Squarespace:

- admin access
- page and CMS access
- business info access
- booking/product/catalogue settings
- export access where available

For custom sites:

- repository access
- staging URL
- deployment process
- hosting dashboard access if needed
- environment variable process
- database schema or safe export if needed
- API documentation for existing systems

For external systems:

- CRM name and access level
- booking engine name and access level
- product catalogue source
- spreadsheet or Airtable links
- payment provider data boundaries
- review source links
- any existing API documentation

## Phase 1: Audit

Goal: understand what data exists, where it lives, and what AI would need to answer correctly.

Ask the client:

- What do you sell?
- Who do you sell it to?
- What services, products, packages, rooms, courses, properties, or locations exist?
- What changes often?
- Where does that information live?
- What is public?
- What should need login/API key?
- What must never be exposed?
- What would a customer ask an AI before buying?
- What questions does your team answer repeatedly?

Deliverables:

- audit notes
- data-source map
- public/protected/private classification
- before AI answer test
- quick opportunity score

## Phase 2: Data Classification

Sort every field into one of three buckets.

| Bucket | Meaning | Examples |
| --- | --- | --- |
| Public | Safe for anyone | service names, descriptions, locations, public FAQs, opening hours, policy links |
| Protected | Useful but controlled | live availability, partner pricing, stock depth, booking slots, unpublished package rules |
| Private | Never expose | customer records, payment data, CRM notes, credentials, internal dashboards, private proposals |

Rule: if unsure, mark it protected or private until approved.

## Phase 3: Canonical Business Model

Create one clean truth sheet.

### Service Template

```json
{
  "id": "service-id",
  "name": "Service Name",
  "description": "Plain description",
  "whoItIsFor": ["Customer type"],
  "price": "Public price or pricing note",
  "location": "Where it is available",
  "availability": "Stable note or endpoint",
  "bookingUrl": "https://example.com/book",
  "faqs": [],
  "policies": [],
  "lastUpdated": "YYYY-MM-DD",
  "dataClassification": "public"
}
```

### Product Template

```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Plain description",
  "category": "Category",
  "price": "Public price or pricing endpoint",
  "availability": "In stock, out of stock, or endpoint",
  "sku": "Optional SKU",
  "url": "https://example.com/product",
  "lastUpdated": "YYYY-MM-DD",
  "dataClassification": "public"
}
```

### Location Template

```json
{
  "id": "location-id",
  "name": "Location Name",
  "address": "Public address",
  "city": "City",
  "country": "Country",
  "openingHours": [],
  "servicesAvailable": [],
  "bookingUrl": "https://example.com/book",
  "dataClassification": "public"
}
```

## Phase 4: Website AI Foundation

Improve the public website so AI systems can understand it.

Add or improve:

- schema markup
- service/product pages
- FAQ sections
- policies
- pricing explanations
- clear booking/contact routes
- internal links
- consistent names
- llms.txt
- sitemap
- robots.txt AI crawler access

Deliverables:

- schema implemented
- llms.txt implemented
- core page recommendations
- content gaps for partner to handle

## Phase 5: Feeds

Feeds are clean files AI tools can read.

Start simple:

- `/api/ai-discovery`
- `/api/ai-discovery/snapshot`
- `/api/ai-discovery/changes`
- `/api/ai-discovery/services`
- `/api/ai-discovery/products`
- `/api/ai-discovery/locations`
- `/api/ai-discovery/articles`
- `/api/ai-discovery/case-studies`
- `/api/ai-discovery/faqs`
- `/api/ai-discovery/policies`
- `/api/ai-discovery/contact`

For stable clients:

- update manually when approved facts change
- expose article summaries and approved case studies as structured feeds

For live-data clients:

- full daily snapshot
- smaller update feed during the day
- source-system sync where possible

## Phase 6: APIs

APIs are controlled doorways for tools.

Start read-only.

Useful endpoints:

- get all services
- get one service
- get all products
- get one product
- get location
- get price
- check availability
- get policy
- get FAQs
- get contact route

Do not allow AI agents to create, update, delete, book, refund, or message customers in the first version.

## Phase 7: Agent Readiness

Start with an MCP-style manifest before building a full MCP server.

Example tool names:

- `search_services`
- `get_service`
- `get_product`
- `get_location`
- `get_policy`
- `check_availability`
- `get_price`
- `get_booking_link`

Only move to a real MCP server when:

- the client has clear ROI
- the data model is stable
- protected data needs controlled access
- authentication and logging are ready

For the RemShield pilot, the first real MCP server is implemented as a local
read-only stdio server:

- it exposes approved public data as MCP tools
- it exposes approved public feeds as MCP resources
- it does not write to any system
- it does not expose private campaign, CRM, payment, or customer data
- it uses the AI discovery API as the source of truth

## Phase 8: Security

Minimum controls:

- public/protected/private classification
- read-only endpoints by default
- no customer records in public feeds
- no credentials in code
- no payment details
- no private CRM notes
- no unpublished proposals
- no private pricing unless protected
- errors do not reveal system internals
- protected endpoints use authentication
- rate limits are active at hosting/API layer
- logs exist for protected access

Client sign-off:

- client approves public facts
- client approves what is protected
- client confirms private exclusions
- client names the person responsible for future updates

## Phase 9: Testing

Run these checks before launch:

- endpoint returns 200
- JSON is valid
- schema is valid
- llms.txt loads
- sitemap loads
- robots.txt does not block intended AI crawlers
- snapshot includes approved public fields
- changes feed has latest version
- private data is absent
- OpenAPI loads
- MCP-style manifest is read-only
- AI before/after prompt shows improvement

## Phase 10: Launch

Launch order:

1. publish canonical data
2. publish schema
3. publish llms.txt
4. publish feeds
5. publish OpenAPI
6. publish MCP-style manifest
7. test endpoints
8. run AI before/after prompts
9. send client report
10. move into monitoring

## Phase 11: Monitoring Retainer

Monitor monthly:

- broken endpoints
- schema errors
- outdated service/product facts
- outdated prices
- outdated availability
- changed policies
- missing new products/services
- AI crawler access
- private-data exposure risk
- API errors
- feed freshness

Monthly output:

- health summary
- changes made
- risks found
- new content/data gaps
- recommended next improvements

## Client Proof Report Template

Use this format:

```text
Before:
AI had to infer your services, pricing, policies, and availability from normal pages.

After:
AI can now fetch approved facts from structured feeds and cite official endpoints.

Proof:
- Discovery index:
- Snapshot:
- Changes feed:
- Security policy:
- Health check:
- OpenAPI:
- MCP-style manifest:

Result:
Your business is now easier for AI systems to understand, trust, cite, and retrieve from safely.
```

## Pricing Guidance

Simple audit:

- GBP 750 to GBP 2,000

Foundation implementation:

- GBP 2,500 to GBP 7,500

Feeds and read-only API:

- GBP 5,000 to GBP 15,000

Advanced protected API or MCP-style connector:

- GBP 10,000 to GBP 30,000+

Monthly monitoring:

- GBP 500 to GBP 3,000+

Price depends on platform, data messiness, live-data complexity, security requirements, and how many systems need integration.
