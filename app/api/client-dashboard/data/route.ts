import { createSign } from 'crypto';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1-nm-ad_GoIIzlkKQEcCdcRPu0jGDV8CtnwKeMwrQpG8';

const SHEETS = [
  'Campaign Tracker', 'Hot Leads', 'Reply Log', 'Senders',
  'Settings', 'Warmup Settings', 'Warmup Senders',
  'Warmup Recipients', 'Warmup Log', 'Error Log',
];

// ─── Google auth ────────────────────────────────────────────────

let tokenCache: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) return tokenCache.accessToken;

  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (saJson) {
    const sa = JSON.parse(saJson);
    const iat = Math.floor(now / 1000);
    const exp = iat + 3600;
    const claim = {
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp,
      iat,
    };
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify(claim)).toString('base64url');
    const data = `${header}.${payload}`;
    const signer = createSign('RSA-SHA256');
    signer.update(data);
    const sig = signer.sign(sa.private_key, 'base64url');
    const jwt = `${data}.${sig}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error_description || 'Service account token exchange failed');
    tokenCache = { accessToken: json.access_token, expiresAt: now + (json.expires_in - 120) * 1000 };
    return tokenCache.accessToken;
  }

  // Support refresh token either inside GOOGLE_TOKEN_JSON or as separate env vars
  const tokenJson = process.env.GOOGLE_TOKEN_JSON;
  const token = tokenJson ? JSON.parse(tokenJson) : {};

  const refreshToken   = process.env.GOOGLE_REFRESH_TOKEN  || token.refresh_token;
  const clientId       = process.env.GOOGLE_CLIENT_ID      || token.client_id;
  const clientSecret   = process.env.GOOGLE_CLIENT_SECRET  || token.client_secret;

  if (refreshToken && clientId && clientSecret) {
    const res = await fetch(token.token_uri || 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id:     clientId,
        client_secret: clientSecret,
        grant_type:    'refresh_token',
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(`Token refresh failed: ${json.error} — ${json.error_description || ''}`);
    }
    tokenCache = { accessToken: json.access_token, expiresAt: now + (json.expires_in - 120) * 1000 };
    return tokenCache.accessToken;
  }

  throw new Error(
    'Google auth incomplete. Need GOOGLE_REFRESH_TOKEN + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET ' +
    '(or a GOOGLE_TOKEN_JSON containing all three), or use GOOGLE_SERVICE_ACCOUNT_JSON.'
  );
}

// ─── Sheets fetch ────────────────────────────────────────────────

function valuesUrl(sheetName: string) {
  const safe = sheetName.replace(/'/g, "''");
  const range = encodeURIComponent(`'${safe}'!A1:ZZ10000`);
  return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`;
}

async function fetchSheet(sheetName: string, accessToken: string) {
  const res = await fetch(valuesUrl(sheetName), {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheet "${sheetName}" fetch failed: ${text}`);
  }
  return res.json();
}

// ─── Data helpers ────────────────────────────────────────────────

type Row = Record<string, string>;

function rowsFromValues(values: string[][] = []): Row[] {
  const [headers = [], ...rows] = values;
  return rows
    .filter(row => row.some(v => String(v || '').trim()))
    .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] || ''])));
}

function mergeTrackerRows(rows: Row[]): Row[] {
  const byLeadId = new Map<string, Row>();
  const passthrough: Row[] = [];

  for (const row of rows) {
    const leadId = String(row.Lead_ID || '').trim();
    if (!leadId) {
      passthrough.push(row);
      continue;
    }

    const existing = byLeadId.get(leadId) || {};
    const merged = { ...existing };
    for (const [key, value] of Object.entries(row)) {
      if (String(value || '').trim()) merged[key] = value;
    }
    byLeadId.set(leadId, merged);
  }

  return [...byLeadId.values(), ...passthrough];
}

function toNumber(value: string | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isTrue(value: string | undefined): boolean {
  return ['TRUE', 'YES', 'Y', '1', 'ACTIVE'].includes(String(value || '').trim().toUpperCase());
}

const CAMPAIGN_TIME_ZONE = process.env.CAMPAIGN_TIME_ZONE || 'Europe/London';

function isoDay(value?: string, timeZone = CAMPAIGN_TIME_ZONE): string {
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

function pct(part: number, whole: number): number {
  if (!whole) return 0;
  return Math.round((part / whole) * 1000) / 10;
}

function countBy(rows: Row[], keyFn: (row: Row) => string) {
  return rows.reduce<Record<string, number>>((acc, row) => {
    const key = keyFn(row) || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function sortEntries(obj: Record<string, number>) {
  return Object.entries(obj)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

function recentRows(rows: Row[], dateField: string, limit = 10): Row[] {
  return [...rows]
    .filter(row => row[dateField])
    .sort((a, b) => String(b[dateField]).localeCompare(String(a[dateField])))
    .slice(0, limit);
}

function campaignSendDates(row: Row): string[] {
  return [
    row.Email_1_Sent_At,
    row.Follow_Up_1_Sent_At,
    row.Follow_Up_2_Sent_At,
    row.Follow_Up_3_Sent_At,
  ].filter(Boolean);
}

function buildSenderCatalog(senders: Row[], trackerBySender: Record<string, Row[]>): Row[] {
  const byEmail = new Map<string, Row>();

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

// ─── Dashboard builder ───────────────────────────────────────────

function buildDashboard(data: Record<string, { values?: string[][] }>) {
  const trackerRows = rowsFromValues(data['Campaign Tracker']?.values);
  const tracker = mergeTrackerRows(trackerRows).filter(row =>
    row.Lead_ID && row.Recipient_Email && row.Campaign_Domain && row.Email_Type
  );
  const hotLeads   = rowsFromValues(data['Hot Leads']?.values);
  const replies    = rowsFromValues(data['Reply Log']?.values);
  const senders    = rowsFromValues(data.Senders?.values);
  const warmupSenders    = rowsFromValues(data['Warmup Senders']?.values);
  const warmupRecipients = rowsFromValues(data['Warmup Recipients']?.values);
  const warmupLog  = rowsFromValues(data['Warmup Log']?.values);
  const errors     = rowsFromValues(data['Error Log']?.values);

  const today = isoDay(new Date().toISOString());
  const activeWarmupSenders   = warmupSenders.filter(row => isTrue(row.Active) && !isTrue(row.Paused));
  const activeWarmupRecipients = warmupRecipients.filter(row => isTrue(row.Active));

  const initialSent = tracker.filter(row => row.Email_1_Sent_At).length;
  const fu1 = tracker.filter(row => row.Follow_Up_1_Sent_At).length;
  const fu2 = tracker.filter(row => row.Follow_Up_2_Sent_At).length;
  const fu3 = tracker.filter(row => row.Follow_Up_3_Sent_At).length;
  const followupsSent      = fu1 + fu2 + fu3;
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
  const standard     = tracker.filter(row => row.Email_Type === 'standard');
  const personalizedSent = personalized.filter(row => row.Email_1_Sent_At).length;
  const standardSent     = standard.filter(row => row.Email_1_Sent_At).length;
  const personalizedReplies = personalized.filter(row => isTrue(row.Has_Replied)).length;
  const standardReplies     = standard.filter(row => isTrue(row.Has_Replied)).length;

  const replyTypeCounts = countBy(replies, row => row.Reply_Type || row.Reply_Type_Normalized || row.classification);
  const statusCounts    = countBy(tracker, row => row.Status || 'blank');
  const domainCounts    = countBy(tracker, row => row.Campaign_Domain || 'Unknown');
  const warmupToday   = warmupLog.filter(row => isoDay(row.Run_Date || row.Sent_At || row.Planned_Send_At) === today);
  const warmupSentRows = warmupToday.filter(row => String(row.Status || '').toLowerCase() === 'sent');
  const warmupSentToday = warmupSentRows.length;
  const warmupSentBySender = countBy(warmupSentRows, row => row.Sender_Email);

  const trackerBySender = tracker.reduce<Record<string, Row[]>>((acc, row) => {
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
    const sent  = leads.reduce((sum, row) => sum + campaignSendDates(row).length, 0);
    const senderReplies = leads.filter(row => isTrue(row.Has_Replied)).length;
    const positives     = leads.filter(row => String(row.Reply_Type || '').toLowerCase() === 'positive').length;
    const todaySent     = leads.reduce((sum, row) => {
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
      replies: senderReplies,
      positives,
      replyRate: pct(senderReplies, Math.max(initialSentForSender, 1)),
    };
  }).sort((a, b) => b.totalToday - a.totalToday || b.sent - a.sent || a.sender.localeCompare(b.sender));

  const warmupBySender = activeWarmupSenders
    .map(sender => ({
      name: sender.Sender_Email || 'Unknown',
      value: warmupSentBySender[sender.Sender_Email || ''] || 0,
    }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));

  const positiveReplies = replyTypeCounts.positive || 0;
  const bounces         = replyTypeCounts.bounce    || 0;

  return {
    generatedAt: new Date().toISOString(),
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
      bounces,
      activeSenders: senderCatalog.length,
      warmupSentToday,
      activeWarmupSenders: activeWarmupSenders.length,
      activeWarmupRecipients: activeWarmupRecipients.length,
      errors: errors.length,
      replyRate:    pct(replies.length, Math.max(initialSent, 1)),
      positiveRate: pct(positiveReplies, Math.max(replies.length, 1)),
      bounceRate:   pct(bounces, Math.max(totalCampaignEmails, 1)),
      personalizedReplyRate: pct(personalizedReplies, Math.max(personalizedSent, 1)),
      standardReplyRate:     pct(standardReplies, Math.max(standardSent, 1)),
    },
    breakdowns: {
      status:   sortEntries(statusCounts),
      domains:  sortEntries(domainCounts),
      replyTypes: sortEntries(replyTypeCounts),
      emailType: [
        { name: 'Deep personalized', leads: personalized.length, replies: personalizedReplies, rate: pct(personalizedReplies, personalizedSent) },
        { name: 'Standard',          leads: standard.length,     replies: standardReplies,     rate: pct(standardReplies, standardSent) },
      ],
      warmupBySender,
    },
    tables: {
      senders:  senderRows,
      hotLeads: recentRows(hotLeads, 'Reply_Received_At', 10),
      replies:  recentRows(replies, 'Reply_Received_At', 12),
      errors:   recentRows(errors, 'Occurred_At', 10),
    },
  };
}

// ─── Route handler ───────────────────────────────────────────────

function assertSheetsSynced(data: Record<string, { values?: string[][]; error?: string }>) {
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

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const results = await Promise.all(
      SHEETS.map(async name => {
        try {
          const data = await fetchSheet(name, accessToken);
          return [name, data] as const;
        } catch (err) {
          return [name, { values: [], error: (err as Error).message }] as const;
        }
      })
    );

    const data = Object.fromEntries(results);
    assertSheetsSynced(data);
    return NextResponse.json(buildDashboard(data));
  } catch (err) {
    const message = (err as Error).message || 'Unknown error';
    console.error('[client-dashboard/data]', message);
    if (message.includes('No Google auth')) {
      return NextResponse.json({ error: message }, { status: 503 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
