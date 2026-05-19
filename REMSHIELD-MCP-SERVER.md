# RemShield MCP Server

Date: 2026-05-19
Status: Local read-only MCP server implemented

## Simple Explanation

The RemShield MCP server is a safe connector that lets an AI assistant fetch trusted RemShield information through tools instead of guessing from web pages.

Think of it like this:

- The AI discovery API is the library.
- The MCP server is the librarian.
- The AI assistant asks the librarian for specific things.
- The librarian only gives approved public information.
- The librarian cannot edit the website, access private client data, change prices, or touch internal systems.

This is useful because AI agents work better when they have clear tools. Instead of saying "browse the website and figure it out," we give the agent named tools like:

- get RemShield services
- search RemShield articles
- get Answer Architect product data
- get case studies
- get the security policy
- get the proof report

## What It Does

The MCP server exposes RemShield's AI discovery layer as read-only MCP tools and resources.

It can retrieve:

- company profile
- founder profile
- services
- capabilities
- products
- article summaries
- case studies
- FAQs
- policies
- contact details
- security policy
- health status
- proof report
- full snapshot
- changes feed
- OpenAPI description
- public MCP-style manifest

## What It Does Not Do

It does not:

- expose customer records
- expose client CRM data
- expose campaign records
- expose payment data
- expose credentials
- expose private dashboards
- expose private pricing
- change website content
- create bookings
- send emails
- update CRMs
- write to databases

This first version is intentionally read-only.

## Why It Matters For Clients

For clients, this is the advanced version of AI Discoverability and Agent Readiness.

The normal feed/API layer makes their data readable.

The MCP layer makes their data usable by AI agents.

Example for a hotel:

- `search_rooms`
- `get_room`
- `check_availability`
- `get_price`
- `get_cancellation_policy`
- `get_booking_link`

Example for a clinic:

- `search_services`
- `get_service`
- `get_doctor`
- `get_location`
- `check_appointment_availability`
- `get_patient_policy`

Example for ecommerce:

- `search_products`
- `get_product`
- `check_stock`
- `get_delivery_policy`
- `get_return_policy`

The business value is simple: AI agents can answer customers with approved, current, trusted information instead of scraping messy pages.

## How It Works

The server runs locally over `stdio`, which means an MCP client launches it as a child process and talks to it through standard input/output.

The message flow is:

1. The MCP client starts the server.
2. The client sends `initialize`.
3. The server replies with its capabilities.
4. The client asks `tools/list`.
5. The server returns the available tools.
6. The AI chooses a tool.
7. The client sends `tools/call`.
8. The server fetches the matching RemShield AI discovery endpoint.
9. The server returns structured JSON back to the AI.

The server also supports resources:

1. The client asks `resources/list`.
2. The server returns resources like `remshield://ai-discovery/products`.
3. The client asks `resources/read`.
4. The server fetches the matching endpoint and returns JSON.

## Files Added

- `tools/remshield-mcp-server.mjs`
  - The actual MCP server.

- `tools/remshield-mcp-smoke-test.ps1`
  - A quick test that launches the server, lists tools, calls a tool, lists resources, and reads a resource.

## NPM Scripts

Run the MCP server:

```bash
npm run mcp:remshield
```

Run the smoke test:

```bash
npm run mcp:smoke
```

Run against local development:

```bash
npm run mcp:smoke -- -Base http://localhost:3000
```

## MCP Client Configuration Example

Use this shape in an MCP client that supports stdio servers:

```json
{
  "mcpServers": {
    "remshield-ai-discovery": {
      "command": "node",
      "args": [
        "D:/Remshield Solutions/tools/remshield-mcp-server.mjs"
      ],
      "env": {
        "REMSHIELD_AI_DISCOVERY_BASE_URL": "https://remshield.solutions"
      }
    }
  }
}
```

For local testing, change the environment variable:

```json
{
  "REMSHIELD_AI_DISCOVERY_BASE_URL": "http://localhost:3000"
}
```

## Available Tools

- `get_remshield_discovery_index`
- `get_remshield_snapshot`
- `get_remshield_changes`
- `get_remshield_company`
- `get_remshield_founder`
- `get_remshield_services`
- `search_remshield_services`
- `get_remshield_capabilities`
- `get_remshield_products`
- `get_remshield_articles`
- `search_remshield_articles`
- `get_remshield_case_studies`
- `search_remshield_case_studies`
- `get_remshield_faqs`
- `get_remshield_policies`
- `get_remshield_contact`
- `get_remshield_security_policy`
- `get_remshield_health`
- `get_remshield_proof`
- `get_remshield_openapi`
- `get_remshield_mcp_manifest`

## Available Resources

- `remshield://ai-discovery/index`
- `remshield://ai-discovery/snapshot`
- `remshield://ai-discovery/changes`
- `remshield://ai-discovery/security`
- `remshield://ai-discovery/health`
- `remshield://ai-discovery/proof`
- `remshield://ai-discovery/company`
- `remshield://ai-discovery/founder`
- `remshield://ai-discovery/services`
- `remshield://ai-discovery/capabilities`
- `remshield://ai-discovery/products`
- `remshield://ai-discovery/articles`
- `remshield://ai-discovery/case-studies`
- `remshield://ai-discovery/faqs`
- `remshield://ai-discovery/policies`
- `remshield://ai-discovery/contact`
- `remshield://ai-discovery/openapi`
- `remshield://ai-discovery/mcp`

## Security Notes

This MCP server is safe by design because:

- every tool is read-only
- it fetches only approved public discovery endpoints
- it does not connect to private databases
- it does not store credentials
- it does not expose private campaign data
- it does not accept arbitrary URLs
- resource URIs are validated against an allowlist
- search is limited to known RemShield public data feeds

For client implementations with protected data, add:

- API authentication
- per-client API keys
- role-based access
- rate limits
- audit logs
- data minimization
- staging review
- human approval before exposing new fields

## When To Use Full MCP For Clients

Do not start every client with MCP.

Start with:

1. audit
2. canonical data model
3. schema
4. llms.txt
5. feeds
6. APIs
7. security policy

Then add MCP when:

- the client has useful structured data
- the data is stable enough
- an AI agent use case is clear
- protected access rules are agreed
- logs and rate limits are ready

MCP is the advanced layer. The data foundation comes first.
