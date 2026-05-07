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

  const tokenJson = process.env.GOOGLE_TOKEN_JSON;
  if (tokenJson) {
    const token = JSON.parse(tokenJson);
    if (token.refresh_token && token.client_id && token.client_secret) {
      const res = await fetch(token.token_uri || 'https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          refresh_token: token.refresh_token,
          client_id: token.client_id,
          client_secret: token.client_secret,
          grant_type: 'refresh_token',
        }),
      });
      const json = await res.json();
      if (res.ok) {
        tokenCache = { accessToken: json.access_token, expiresAt: now + (json.expires_in - 120) * 1000 };
        return tokenCache.accessToken;
      }
    }
    return token.access_token;
  }

  throw new Error('No Google auth configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_TOKEN_JSON.');
}

// ─── Sheets fetch ────────────────────────────────────────────────

function valuesUrl(sheetName: string) {
  const safe = sheetName.replace(/'/g, "''");
  const range = encodeURIComponent(`'${safe}'!A1:Z5000`);
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

function toNumber(value: string | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isTrue(value: string | undefined): boolean {
  return ['TRUE', 'YES', 'Y', '1', 'ACTIVE'].includes(String(value || '').trim().toUpperCase());
}

function isoDay(value: string | undefined): string {
  return String(value || '').slice(0, 10);
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

// ─── Dashboard builder ───────────────────────────────────────────

function buildDashboard(data: Record<string, { values?: string[][] }>) {
  const trackerRows = rowsFromValues(data['Campaign Tracker']?.values);
  const tracker = trackerRows.filter(row =>
    row.Lead_ID && row.Recipient_Email && row.Campaign_Domain && row.Email_Type
  );
  const hotLeads   = rowsFromValues(data['Hot Leads']?.values);
  const replies    = rowsFromValues(data['Reply Log']?.values);
  const senders    = rowsFromValues(data.Senders?.values);
  const warmupSenders    = rowsFromValues(data['Warmup Senders']?.values);
  const warmupRecipients = rowsFromValues(data['Warmup Recipients']?.values);
  const warmupLog  = rowsFromValues(data['Warmup Log']?.values);
  const errors     = rowsFromValues(data['Error Log']?.values);

  const today = new Date().toISOString().slice(0, 10);
  const activeSenders         = senders.filter(row => isTrue(row.Active));
  const activeWarmupSenders   = warmupSenders.filter(row => isTrue(row.Active) && !isTrue(row.Paused));
  const activeWarmupRecipients = warmupRecipients.filter(row => isTrue(row.Active));

  const initialSent = tracker.filter(row => row.Email_1_Sent_At).length;
  const fu1 = tracker.filter(row => row.Follow_Up_1_Sent_At).length;
  const fu2 = tracker.filter(row => row.Follow_Up_2_Sent_At).length;
  const fu3 = tracker.filter(row => row.Follow_Up_3_Sent_At).length;
  const followupsSent      = fu1 + fu2 + fu3;
  const totalCampaignEmails = initialSent + followupsSent;

  const personalized = tracker.filter(row => row.Email_Type === 'deep_personalized');
  const standard     = tracker.filter(row => row.Email_Type === 'standard');
  const personalizedSent = personalized.filter(row => row.Email_1_Sent_At).length;
  const standardSent     = standard.filter(row => row.Email_1_Sent_At).length;
  const personalizedReplies = personalized.filter(row => isTrue(row.Has_Replied)).length;
  const standardReplies     = standard.filter(row => isTrue(row.Has_Replied)).length;

  const replyTypeCounts = countBy(replies, row => row.Reply_Type || row.Reply_Type_Normalized || row.classification);
  const statusCounts    = countBy(tracker, row => row.Status || 'blank');
  const domainCounts    = countBy(tracker, row => row.Campaign_Domain || 'Unknown');

  const trackerBySender = tracker.reduce<Record<string, Row[]>>((acc, row) => {
    const key = row.Assigned_Sender || '';
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  const senderRows = activeSenders.map(sender => {
    const email = sender.Sender_Email;
    const leads = trackerBySender[email] || [];
    const sent  = leads.filter(row => row.Email_1_Sent_At).length;
    const senderReplies = leads.filter(row => isTrue(row.Has_Replied)).length;
    const positives     = leads.filter(row => String(row.Reply_Type || '').toLowerCase() === 'positive').length;
    const todaySent     = leads.filter(row => [
      row.Email_1_Sent_At, row.Follow_Up_1_Sent_At,
      row.Follow_Up_2_Sent_At, row.Follow_Up_3_Sent_At,
    ].some(v => isoDay(v) === today)).length;
    return {
      sender: email,
      domain: sender.Domain,
      company: sender.Campaign_Company,
      limit: toNumber(sender.Daily_Send_Limit),
      leads: leads.length,
      sent,
      todaySent,
      replies: senderReplies,
      positives,
      replyRate: pct(senderReplies, Math.max(sent, 1)),
    };
  }).sort((a, b) => b.sent - a.sent || a.sender.localeCompare(b.sender));

  const warmupToday   = warmupLog.filter(row => isoDay(row.Run_Date || row.Sent_At || row.Planned_Send_At) === today);
  const warmupSentToday = warmupToday.filter(row => String(row.Status || '').toLowerCase() === 'sent').length;
  const warmupBySender  = sortEntries(countBy(warmupToday, row => row.Sender_Email)).slice(0, 12);

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
      followupsSent,
      totalCampaignEmails,
      replies: replies.length,
      hotLeads: hotLeads.length,
      positiveReplies,
      bounces,
      activeSenders: activeSenders.length,
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
    return NextResponse.json(buildDashboard(data));
  } catch (err) {
    const message = (err as Error).message || 'Unknown error';
    console.error('[client-dashboard/data]', message);
    if (message.includes('No Google auth')) {
      return NextResponse.json({ error: message }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to load dashboard data' }, { status: 500 });
  }
}
