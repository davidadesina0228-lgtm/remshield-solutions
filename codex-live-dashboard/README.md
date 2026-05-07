# Codex Live Dashboard

Local dashboard for the Dean cold outreach automation.

## What It Does

- Reads the existing Google Sheet tracker.
- Refreshes dashboard data every 60 seconds.
- Shows campaign sends, replies, bounces, hot leads, sender performance, warmup activity, and errors.
- Uses read-only Google Sheets OAuth.

## Run It

```powershell
node codex-live-dashboard/server.js
```

Open:

```text
http://127.0.0.1:8787
```

If Google authorization is needed, click **Authorize Google Sheets** in the dashboard.

## Notes

- Tokens are stored locally in `.tmp/codex-live-dashboard-google-token.json`.
- No extra npm packages are required.
- The dashboard reads the Sheet only; it does not edit campaign data.

## Share With A Client

`http://127.0.0.1:8787` only works on your computer. To send a client a real link, deploy this folder to a Node host such as Render, Railway, or a small VPS.

Recommended deployment settings:

```text
Start command: node codex-live-dashboard/server.js
Environment:
  DASHBOARD_PORT=10000
  DASHBOARD_HOST=0.0.0.0
  DASHBOARD_ACCESS_CODE=tenacious2025        ← give this code to Dean
  GOOGLE_SHEETS_ID=1-nm-ad_GoIIzlkKQEcCdcRPu0jGDV8CtnwKeMwrQpG8
  GOOGLE_CLIENT_SECRET_JSON=<the full Google OAuth client JSON>
  GOOGLE_TOKEN_JSON=<the local .tmp/codex-live-dashboard-google-token.json content after authorization>
```

If using Google OAuth on the hosted URL, add this redirect URI in Google Cloud:

```text
https://YOUR-DASHBOARD-DOMAIN/oauth2callback
```

## Client Access Code

Set `DASHBOARD_ACCESS_CODE` to any passphrase (e.g. `tenacious2025`). Visitors see a
lock screen; once they enter the correct code a 30-day HttpOnly cookie is set and they
land straight on the dashboard on every return visit. No account, no signup required.

Leave `DASHBOARD_ACCESS_CODE` unset (or empty) to disable the gate entirely — useful
for local development.

## Hosting on Your Own Website

You cannot embed this Node server inside your Next.js site directly, but you can:

**Option A — Subdomain (recommended)**
Point `dashboard.remshield.solutions` to a small server (Render free tier, Railway,
or any $5 VPS). Dean's link becomes: `https://dashboard.remshield.solutions`

**Option B — Path proxy**
If your hosting supports Node or serverless functions you can proxy `/dashboard/*`
to this server. Not recommended unless you already have that infrastructure.

**Option C — iframe embed (simplest)**
In your Next.js site, add a protected page that renders an `<iframe>` pointing at the
deployed dashboard URL. The dashboard handles its own auth via the access code cookie.
