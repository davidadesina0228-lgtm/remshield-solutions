const fs = require('fs');
const http = require('http');
const path = require('path');
const { URLSearchParams } = require('url');

const PORT = parseInt(process.env.DASHBOARD_PORT || '8787', 10);
const HOST = process.env.DASHBOARD_HOST || '127.0.0.1';
const ACCESS_CODE = process.env.DASHBOARD_ACCESS_CODE || '';
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1-nm-ad_GoIIzlkKQEcCdcRPu0jGDV8CtnwKeMwrQpG8';
const SPREADSHEET_NAME = 'Dean Cold Outreach Tracker';
const TOKEN_PATH = path.join(process.cwd(), '.tmp', 'codex-live-dashboard-google-token.json');
const DEFAULT_CLIENT_SECRET = 'D:\\client_secret_670800944696-irfo0phtiq3586652t8sitj9p32uqkt2.apps.googleusercontent.com.json';
const CLIENT_SECRET_PATH = process.env.GOOGLE_CLIENT_SECRET || DEFAULT_CLIENT_SECRET;
const REDIRECT_URI = `http://${HOST}:${PORT}/oauth2callback`;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const PUBLIC_DIR = path.join(__dirname, 'public');

const SHEETS = [
  'Campaign Tracker',
  'Hot Leads',
  'Reply Log',
  'Senders',
  'Settings',
  'Warmup Settings',
  'Warmup Senders',
  'Warmup Recipients',
  'Warmup Log',
  'Error Log',
];

function jsonResponse(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function textResponse(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(body);
}

function loadClient() {
  if (process.env.GOOGLE_CLIENT_SECRET_JSON) {
    const raw = JSON.parse(process.env.GOOGLE_CLIENT_SECRET_JSON);
    const client = raw.installed || raw.web;
    if (!client) throw new Error('GOOGLE_CLIENT_SECRET_JSON must contain installed or web config');
    return client;
  }
  if (!fs.existsSync(CLIENT_SECRET_PATH)) {
    throw new Error(`Google client secret not found at ${CLIENT_SECRET_PATH}`);
  }
  const raw = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, 'utf8'));
  const client = raw.installed || raw.web;
  if (!client) throw new Error('Google client secret must contain installed or web config');
  return client;
}

function loadToken() {
  if (process.env.GOOGLE_TOKEN_JSON) {
    return JSON.parse(process.env.GOOGLE_TOKEN_JSON);
  }
  if (!fs.existsSync(TOKEN_PATH)) return null;
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
}

function saveToken(token) {
  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify({ ...token, saved_at: new Date().toISOString() }, null, 2));
}

function authUrl() {
  const client = loadClient();
  const url = new URL(client.auth_uri || 'https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', client.client_id);
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', SCOPES.join(' '));
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  return url.toString();
}

async function exchangeCode(code) {
  const client = loadClient();
  const body = new URLSearchParams({
    code,
    client_id: client.client_id,
    client_secret: client.client_secret,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const response = await fetch(client.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));

  saveToken({
    ...json,
    client_id: client.client_id,
    client_secret: client.client_secret,
    token_uri: client.token_uri || 'https://oauth2.googleapis.com/token',
  });
}

async function refreshToken(token) {
  if (!token.refresh_token) return token;
  const body = new URLSearchParams({
    refresh_token: token.refresh_token,
    client_id: token.client_id,
    client_secret: token.client_secret,
    grant_type: 'refresh_token',
  });

  const response = await fetch(token.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  const updated = { ...token, ...json, refresh_token: token.refresh_token };
  saveToken(updated);
  return updated;
}

async function authedRequest(url) {
  let token = loadToken();
  if (!token) {
    const error = new Error('Google Sheets authorization required');
    error.code = 'NEEDS_AUTH';
    throw error;
  }

  let response = await fetch(url, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (response.status === 401) {
    token = await refreshToken(token);
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
  }

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json;
}

function valuesUrl(sheetName) {
  const safe = sheetName.replace(/'/g, "''");
  const range = encodeURIComponent(`'${safe}'!A1:ZZ10000`);
  return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`;
}

function rowsFromValues(values = []) {
  const [headers = [], ...rows] = values;
  return rows
    .filter(row => row.some(value => String(value || '').trim()))
    .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
}

function mergeTrackerRows(rows) {
  const byLeadId = new Map();
  const passthrough = [];
  const dateFields = new Set([
    'Last_Email_Sent_At',
    'Email_1_Sent_At',
    'Follow_Up_1_Sent_At',
    'Follow_Up_2_Sent_At',
    'Follow_Up_3_Sent_At',
    'Reply_Received_At',
  ]);

  function isNewerDate(candidate, current) {
    const candidateDate = new Date(candidate || '');
    const currentDate = new Date(current || '');
    if (Number.isNaN(candidateDate.getTime())) return false;
    if (Number.isNaN(currentDate.getTime())) return true;
    return candidateDate.getTime() > currentDate.getTime();
  }

  for (const row of rows) {
    const leadId = String(row.Lead_ID || '').trim();
    if (!leadId) {
      passthrough.push(row);
      continue;
    }

    const existing = byLeadId.get(leadId) || {};
    const merged = { ...existing };
    for (const [key, value] of Object.entries(row)) {
      if (!String(value || '').trim()) continue;

      if (dateFields.has(key)) {
        if (isNewerDate(value, merged[key])) merged[key] = value;
        continue;
      }

      if (key === 'Follow_Up_Count') {
        const current = parseInt(merged[key] || '0', 10) || 0;
        const incoming = parseInt(value || '0', 10) || 0;
        if (incoming > current) merged[key] = String(incoming);
        continue;
      }

      if (key === 'Has_Replied') {
        if (isTrue(value)) merged[key] = value;
        else if (!String(merged[key] || '').trim()) merged[key] = value;
        continue;
      }

      if (!String(merged[key] || '').trim()) merged[key] = value;
    }

    const TERMINAL = new Set(['replied', 'bounced', 'unsubscribed', 'opted_out', 'positive', 'negative']);
    if (!TERMINAL.has(String(merged.Status || '').toLowerCase())) {
      if (merged.Follow_Up_3_Sent_At) merged.Status = 'follow_up_3_sent';
      else if (merged.Follow_Up_2_Sent_At) merged.Status = 'follow_up_2_sent';
      else if (merged.Follow_Up_1_Sent_At) merged.Status = 'follow_up_1_sent';
      else if (merged.Email_1_Sent_At && String(merged.Status || '').toLowerCase() === 'pending') merged.Status = 'email_1_sent';
    }

    byLeadId.set(leadId, merged);
  }

  return [...byLeadId.values(), ...passthrough];
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isTrue(value) {
  return ['TRUE', 'YES', 'Y', '1', 'ACTIVE'].includes(String(value || '').trim().toUpperCase());
}

const CAMPAIGN_TIME_ZONE = process.env.CAMPAIGN_TIME_ZONE || 'Europe/London';

function isoDay(value, timeZone = CAMPAIGN_TIME_ZONE) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw.slice(0, 10);

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const byType = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function percent(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 1000) / 10;
}

function countBy(rows, keyFn) {
  return rows.reduce((acc, row) => {
    const key = keyFn(row) || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function sortEntries(object) {
  return Object.entries(object)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

function recentRows(rows, dateField, limit = 10) {
  return [...rows]
    .filter(row => row[dateField])
    .sort((a, b) => String(b[dateField]).localeCompare(String(a[dateField])))
    .slice(0, limit);
}

function campaignSendDates(row) {
  return [
    row.Email_1_Sent_At,
    row.Follow_Up_1_Sent_At,
    row.Follow_Up_2_Sent_At,
    row.Follow_Up_3_Sent_At,
  ].filter(Boolean);
}

function buildSenderCatalog(senders, trackerBySender) {
  const byEmail = new Map();

  for (const sender of senders) {
    const email = String(sender.Sender_Email || sender.Assigned_Sender || '').trim();
    if (!email) continue;
    byEmail.set(email, sender);
  }

  for (const [email, leads] of Object.entries(trackerBySender)) {
    if (!email || byEmail.has(email)) continue;
    const sample = leads[0] || {};
    byEmail.set(email, {
      Sender_Email: email,
      Domain: sample.Campaign_Domain || email.split('@')[1] || '',
      Campaign_Company: sample.Campaign_Company || '',
      Daily_Send_Limit: '0',
      Active: 'TRUE',
    });
  }

  return [...byEmail.values()].filter(sender => {
    const email = String(sender.Sender_Email || sender.Assigned_Sender || '').trim();
    return Boolean(email) && (isTrue(sender.Active) || Boolean(trackerBySender[email]?.length));
  });
}

function buildDashboard(data) {
  const trackerRows = rowsFromValues(data['Campaign Tracker']?.values);
  const tracker = mergeTrackerRows(trackerRows).filter(row =>
    row.Lead_ID &&
    row.Recipient_Email &&
    row.Campaign_Domain &&
    row.Email_Type
  );
  const hotLeads = rowsFromValues(data['Hot Leads']?.values);
  const replies = rowsFromValues(data['Reply Log']?.values);
  const senders = rowsFromValues(data.Senders?.values);
  const settingsRows = rowsFromValues(data.Settings?.values);
  const warmupSettingsRows = rowsFromValues(data['Warmup Settings']?.values);
  const warmupSenders = rowsFromValues(data['Warmup Senders']?.values);
  const warmupRecipients = rowsFromValues(data['Warmup Recipients']?.values);
  const warmupLog = rowsFromValues(data['Warmup Log']?.values);
  const errors = rowsFromValues(data['Error Log']?.values);

  const today = isoDay(new Date().toISOString());
  const activeWarmupSenders = warmupSenders.filter(row => isTrue(row.Active) && !isTrue(row.Paused));
  const activeWarmupRecipients = warmupRecipients.filter(row => isTrue(row.Active));

  const initialSent = tracker.filter(row => row.Email_1_Sent_At).length;
  const fu1 = tracker.filter(row => row.Follow_Up_1_Sent_At).length;
  const fu2 = tracker.filter(row => row.Follow_Up_2_Sent_At).length;
  const fu3 = tracker.filter(row => row.Follow_Up_3_Sent_At).length;
  const followupsSent = fu1 + fu2 + fu3;
  const totalCampaignEmails = initialSent + followupsSent;
  const initialSentToday = tracker.filter(row => isoDay(row.Email_1_Sent_At) === today).length;
  const followupsSentToday = tracker.reduce((sum, row) => {
    return sum + [
      row.Follow_Up_1_Sent_At,
      row.Follow_Up_2_Sent_At,
      row.Follow_Up_3_Sent_At,
    ].filter(value => isoDay(value) === today).length;
  }, 0);
  const campaignSentToday = initialSentToday + followupsSentToday;
  const personalized = tracker.filter(row => row.Email_Type === 'deep_personalized');
  const standard = tracker.filter(row => row.Email_Type === 'standard');
  const personalizedReplies = personalized.filter(row => isTrue(row.Has_Replied)).length;
  const standardReplies = standard.filter(row => isTrue(row.Has_Replied)).length;
  const replyTypeCounts = countBy(replies, row => row.Reply_Type || row.Reply_Type_Normalized || row.classification);
  const statusCounts = countBy(tracker, row => row.Status || 'blank');
  const domainCounts = countBy(tracker, row => row.Campaign_Domain || 'Unknown');
  const warmupToday = warmupLog.filter(row => isoDay(row.Run_Date || row.Sent_At || row.Planned_Send_At) === today);
  const warmupSentRows = warmupToday.filter(row => String(row.Status || '').toLowerCase() === 'sent');
  const warmupSentToday = warmupSentRows.length;
  const warmupSentBySender = countBy(warmupSentRows, row => row.Sender_Email);

  const trackerBySender = tracker.reduce((acc, row) => {
    const key = row.Assigned_Sender || '';
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
  const senderCatalog = buildSenderCatalog(senders, trackerBySender);
  const senderRows = senderCatalog.map(sender => {
    const email = String(sender.Sender_Email || sender.Assigned_Sender || '').trim();
    const leads = trackerBySender[email] || [];
    const initialSentForSender = leads.filter(row => row.Email_1_Sent_At).length;
    const sent = leads.reduce((sum, row) => sum + campaignSendDates(row).length, 0);
    const repliesForSender = leads.filter(row => isTrue(row.Has_Replied)).length;
    const positives = leads.filter(row => String(row.Reply_Type || '').toLowerCase() === 'positive').length;
    const todaySent = leads.reduce((sum, row) => {
      return sum + campaignSendDates(row).filter(value => isoDay(value) === today).length;
    }, 0);
    const warmupTodayForSender = warmupSentBySender[email] || 0;
    return {
      sender: email,
      domain: sender.Domain,
      company: sender.Campaign_Company,
      limit: toNumber(sender.Daily_Send_Limit),
      leads: leads.length,
      sent,
      todaySent,
      warmupToday: warmupTodayForSender,
      totalToday: todaySent + warmupTodayForSender,
      replies: repliesForSender,
      positives,
      replyRate: percent(repliesForSender, Math.max(initialSentForSender, 1)),
    };
  }).sort((a, b) => b.totalToday - a.totalToday || b.sent - a.sent || a.sender.localeCompare(b.sender));

  const warmupBySender = activeWarmupSenders
    .map(sender => ({
      name: sender.Sender_Email || 'Unknown',
      value: warmupSentBySender[sender.Sender_Email || ''] || 0,
    }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));

  const positiveReplies = replyTypeCounts.positive || 0;
  const bounces = replyTypeCounts.bounce || 0;
  const unsubscribes = replyTypeCounts.unsubscribe || 0;
  const outOfOffice = replyTypeCounts.out_of_office || 0;
  const negative = replyTypeCounts.negative || 0;
  const unclear = replyTypeCounts.unclear || 0;

  return {
    generatedAt: new Date().toISOString(),
    spreadsheet: {
      name: SPREADSHEET_NAME,
    },
    metrics: {
      totalLeads: tracker.length,
      personalizedLeads: personalized.length,
      standardLeads: standard.length,
      pending: tracker.filter(row => String(row.Status || '').toLowerCase() === 'pending').length,
      initialSent,
      initialSentToday,
      followupsSent,
      followupsSentToday,
      totalCampaignEmails,
      campaignSentToday,
      replies: replies.length,
      hotLeads: hotLeads.length,
      positiveReplies,
      negative,
      bounces,
      unsubscribes,
      outOfOffice,
      unclear,
      activeSenders: senderCatalog.length,
      warmupSentToday,
      activeWarmupSenders: activeWarmupSenders.length,
      activeWarmupRecipients: activeWarmupRecipients.length,
      errors: errors.length,
      replyRate: percent(replies.length, Math.max(initialSent, 1)),
      positiveRate: percent(positiveReplies, Math.max(replies.length, 1)),
      bounceRate: percent(bounces, Math.max(totalCampaignEmails, 1)),
      personalizedReplyRate: percent(personalizedReplies, Math.max(personalized.filter(row => row.Email_1_Sent_At).length, 1)),
      standardReplyRate: percent(standardReplies, Math.max(standard.filter(row => row.Email_1_Sent_At).length, 1)),
    },
    breakdowns: {
      status: sortEntries(statusCounts),
      domains: sortEntries(domainCounts),
      replyTypes: sortEntries(replyTypeCounts),
      emailType: [
        { name: 'Deep personalized', leads: personalized.length, replies: personalizedReplies, rate: percent(personalizedReplies, personalized.filter(row => row.Email_1_Sent_At).length) },
        { name: 'Standard', leads: standard.length, replies: standardReplies, rate: percent(standardReplies, standard.filter(row => row.Email_1_Sent_At).length) },
      ],
      warmupBySender,
    },
    tables: {
      senders: senderRows,
      hotLeads: recentRows(hotLeads, 'Reply_Received_At', 10),
      replies: recentRows(replies, 'Reply_Received_At', 12),
      errors: recentRows(errors, 'Occurred_At', 10),
      warmup: recentRows(warmupLog, 'Planned_Send_At', 12),
    },
  };
}

function assertSheetsSynced(data) {
  const failed = Object.entries(data)
    .filter(([, sheet]) => sheet.error)
    .map(([name, sheet]) => `${name}: ${sheet.error}`);

  if (failed.length) {
    throw new Error(`Google Sheets sync failed. ${failed.join(' | ')}`);
  }

  const trackerRows = data['Campaign Tracker']?.values || [];
  if (trackerRows.length <= 1) {
    throw new Error('Google Sheets sync returned no Campaign Tracker rows.');
  }
}

async function fetchDashboard() {
  const result = {};
  await Promise.all(SHEETS.map(async sheetName => {
    try {
      result[sheetName] = await authedRequest(valuesUrl(sheetName));
    } catch (error) {
      if (error.code === 'NEEDS_AUTH') throw error;
      result[sheetName] = { values: [], error: error.message };
    }
  }));
  assertSheetsSynced(result);
  return buildDashboard(result);
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
  }[ext] || 'application/octet-stream';
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const cleanPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, cleanPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    textResponse(res, 403, 'Forbidden');
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    textResponse(res, 404, 'Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': contentType(filePath) });
  fs.createReadStream(filePath).pipe(res);
}

function checkAccessCode(req, requestUrl) {
  if (!ACCESS_CODE) return true;
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/(?:^|;\s*)dashboard_access=([^;]+)/);
  if (match && match[1] === ACCESS_CODE) return true;
  if (requestUrl.searchParams.get('code') === ACCESS_CODE) return true;
  return false;
}

const LOCK_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Access Required</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d1b3e;font-family:'Space Grotesk',sans-serif}
.card{background:#ffffff;border-radius:12px;padding:40px 36px;width:min(380px,90vw);text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.4)}
h1{margin:0 0 6px;font-size:20px;color:#0f172a}p{margin:0 0 24px;color:#5a7085;font-size:14px}
input{width:100%;height:44px;padding:0 14px;border:1px solid #dde3ec;border-radius:8px;font:inherit;font-size:15px;outline:none;letter-spacing:3px;text-align:center}
input:focus{border-color:#00aaff;box-shadow:0 0 0 3px rgba(0,170,255,0.14)}
button{margin-top:12px;width:100%;height:44px;background:linear-gradient(135deg,#00aaff,#00d4c8);border:none;border-radius:8px;font:inherit;font-weight:700;font-size:15px;color:#06101f;cursor:pointer}
.err{margin-top:12px;color:#c0392b;font-size:13px;display:none}
</style></head><body>
<div class="card">
  <h1>Campaign Intelligence Center</h1>
  <p>Enter your access code to continue</p>
  <form method="GET" action="/">
    <input type="password" name="code" placeholder="••••••" autocomplete="off" autofocus>
    <button type="submit">Access Dashboard</button>
  </form>
  <p class="err" id="e">Incorrect access code</p>
</div>
<script>if(location.search.includes('err=1')){document.getElementById('e').style.display='block'}</script>
</body></html>`;

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    /* Access code gate — runs before everything except OAuth callback */
    if (ACCESS_CODE && requestUrl.pathname !== '/oauth2callback') {
      const submitted = requestUrl.searchParams.get('code');
      if (submitted) {
        if (submitted === ACCESS_CODE) {
          res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `dashboard_access=${ACCESS_CODE}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000`,
          });
          res.end();
        } else {
          res.writeHead(302, { Location: '/?err=1' });
          res.end();
        }
        return;
      }
      if (!checkAccessCode(req, requestUrl)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(LOCK_HTML);
        return;
      }
    }

    if (requestUrl.pathname === '/auth/google') {
      res.writeHead(302, { Location: authUrl() });
      res.end();
      return;
    }

    if (requestUrl.pathname === '/oauth2callback') {
      const error = requestUrl.searchParams.get('error');
      if (error) throw new Error(`OAuth error: ${error}`);
      const code = requestUrl.searchParams.get('code');
      if (!code) throw new Error('Missing OAuth code');
      await exchangeCode(code);
      res.writeHead(302, { Location: '/?authorized=1' });
      res.end();
      return;
    }

    if (requestUrl.pathname === '/api/status') {
      jsonResponse(res, 200, {
        authorized: Boolean(loadToken()),
        generatedAt: new Date().toISOString(),
      });
      return;
    }

    if (requestUrl.pathname === '/api/dashboard') {
      try {
        const payload = await fetchDashboard();
        jsonResponse(res, 200, payload);
      } catch (error) {
        if (error.code === 'NEEDS_AUTH') {
          jsonResponse(res, 401, { needsAuth: true, authUrl: '/auth/google', message: error.message });
          return;
        }
        throw error;
      }
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    console.error('[dashboard]', error.stack || error.message);
    jsonResponse(res, 500, { error: error.message || 'Internal server error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Codex live dashboard: http://${HOST}:${PORT}`);
  console.log(`Google auth: http://${HOST}:${PORT}/auth/google`);
});
