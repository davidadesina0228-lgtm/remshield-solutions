'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────

interface BarItem   { name: string; value: number; }
interface EmailType { name: string; leads: number; replies: number; rate: number; }
interface SenderRow {
  sender: string; domain: string; company: string;
  limit: number; leads: number; sent: number;
  todaySent: number; replies: number; positives: number; replyRate: number;
}
type FeedRow = Record<string, string>;

interface DashboardData {
  generatedAt: string;
  metrics: {
    totalLeads: number; personalizedLeads: number; standardLeads: number;
    pending: number; initialSent: number; followupsSent: number;
    totalCampaignEmails: number; replies: number; hotLeads: number;
    positiveReplies: number; bounces: number; errors: number;
    replyRate: number; positiveRate: number; bounceRate: number;
    warmupSentToday: number; activeWarmupSenders: number; activeWarmupRecipients: number;
  };
  breakdowns: {
    status: BarItem[]; domains: BarItem[];
    replyTypes: BarItem[]; emailType: EmailType[]; warmupBySender: BarItem[];
  };
  tables: { senders: SenderRow[]; hotLeads: FeedRow[]; replies: FeedRow[]; errors: FeedRow[]; };
}

// ─── Helpers ─────────────────────────────────────────────────────

function n(v?: number | string) {
  return new Intl.NumberFormat('en-GB').format(Number(v || 0));
}

function pct(v?: number | string) {
  const num = Number(v || 0);
  return num % 1 === 0 ? `${num}%` : `${num.toFixed(1)}%`;
}

function fmtDate(value: string) {
  if (!value) return 'Unknown date';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function relativeTime(value: string) {
  if (!value) return 'never';
  const diff = Date.now() - new Date(value).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return fmtDate(value);
}

// ─── Sub-components ──────────────────────────────────────────────

function BarList({ items, limit = 8 }: { items: BarItem[]; limit?: number }) {
  if (!items.length) return <div className="empty-state"><p>No data yet.</p></div>;
  const max = Math.max(1, ...items.map(i => i.value));
  return (
    <div className="bar-list">
      {items.slice(0, limit).map((item, i) => (
        <div key={i} className="bar-row">
          <div className="bar-meta">
            <span>{item.name}</span>
            <span>{n(item.value)}</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${Math.max(2, Math.round((item.value / max) * 100))}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmailTypes({ items }: { items: EmailType[] }) {
  if (!items.length) return <div className="empty-state"><p>No email-type data yet.</p></div>;
  return (
    <div className="comparison">
      {items.map((item, i) => (
        <div key={i} className="comparison-item">
          <h3>{item.name}</h3>
          <div className="comparison-number"><span>Leads</span><strong>{n(item.leads)}</strong></div>
          <div className="comparison-number"><span>Replies</span><strong>{n(item.replies)}</strong></div>
          <div className="comparison-number"><span>Reply rate</span><strong>{pct(item.rate)}</strong></div>
          <div className="progress">
            <span style={{ width: `${Math.max(2, Math.min(100, item.rate))}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SenderRows({ rows }: { rows: SenderRow[] }) {
  if (!rows.length) {
    return <tr><td colSpan={7}><div className="empty-state"><p>No sender data yet.</p></div></td></tr>;
  }
  return (
    <>
      {rows.map((row, i) => (
        <tr key={i}>
          <td data-label="Sender">
            <div className="sender">{row.sender}</div>
            <div className="muted">{row.company} {row.domain}</div>
          </td>
          <td className="numeric" data-label="Leads">{n(row.leads)}</td>
          <td className="numeric" data-label="Initial sent">{n(row.sent)}</td>
          <td className="numeric" data-label="Sent today">{n(row.todaySent)} / {n(row.limit)}</td>
          <td className="numeric" data-label="Replies">{n(row.replies)}</td>
          <td className="numeric" data-label="Positive">{n(row.positives)}</td>
          <td className="numeric" data-label="Reply rate">{pct(row.replyRate)}</td>
        </tr>
      ))}
    </>
  );
}

function FeedList({ items, type }: { items: FeedRow[]; type: string }) {
  if (!items.length) return <div className="empty-state"><p>Nothing here yet.</p></div>;
  return (
    <div className="feed">
      {items.map((row, i) => {
        const person = row.Full_Name || [row.First_Name, row.Last_Name].filter(Boolean).join(' ') || row.Recipient_Email || row.Email || 'Unknown person';
        const company = row.Company_Name || row.Campaign_Company || '';
        const kind    = row.Reply_Type || row.Suggested_Next_Action || type;
        const snippet = row.Reply_Snippet || row.Reply_Subject || row.Error_Message || row.Notes || '';
        const date    = row.Reply_Received_At || row.Processed_At || row.Occurred_At || '';
        return (
          <div key={i} className="feed-item">
            <strong>{person}{company ? `, ${company}` : ''}</strong>
            <span className="pill">{kind || 'Update'}</span>
            <p>{snippet.slice(0, 220)}</p>
            <p>{fmtDate(date)}</p>
          </div>
        );
      })}
    </div>
  );
}

function ErrorFeed({ items }: { items: FeedRow[] }) {
  if (!items.length) return <div className="empty-state"><p>No workflow errors logged.</p></div>;
  return (
    <div className="feed">
      {items.map((row, i) => {
        const workflow = row.Workflow_Name || 'Unknown workflow';
        const node     = row.Node_Name ? ` — ${row.Node_Name}` : '';
        const message  = row.Error_Message || 'No details available';
        const errorId  = row.Error_ID || '';
        return (
          <div key={i} className="feed-item error-feed-item">
            <strong>{workflow}{node}</strong>
            {errorId && <span className="pill pill-danger">{errorId}</span>}
            <p>{message.slice(0, 300)}</p>
            <p className="feed-date">{fmtDate(row.Occurred_At || '')}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────

export default function ClientDashboard() {
  const [data, setData]           = useState<DashboardData | null>(null);
  const [statusKind, setStatusKind] = useState<'' | 'ok' | 'bad'>('');
  const [statusText, setStatusText] = useState('Connecting to campaign data...');
  const [lastUpdated, setLastUpdated] = useState('Connecting...');
  const [loading, setLoading]     = useState(false);
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      setStatusKind('');
      setStatusText('Syncing campaign data...');
      const res = await fetch('/api/client-dashboard/data', { cache: 'no-store' });
      const json = await res.json();
      if (res.status === 401 || json.needsAuth) {
        window.location.href = '/client-dashboard/login';
        return;
      }
      if (!res.ok) throw new Error(json.error || 'Request failed');
      setData(json);
      setStatusKind('ok');
      setStatusText('Campaign data live');
      setLastUpdated(`Updated ${relativeTime(json.generatedAt)}`);
    } catch {
      setStatusKind('bad');
      setStatusText('Data refresh failed — retrying in 60s');
      setLastUpdated(`Failed at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 60_000);
    return () => clearInterval(timer);
  }, [load]);

  const m = data?.metrics;
  const b = data?.breakdowns;
  const t = data?.tables;

  return (
    <>
      {/* ── Topbar ─────────────────────────────────────────────── */}
      <header className="topbar">
        <div className="brand-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/assets/remshield-logo.png" alt="RemShield" />
          <div>
            <p className="eyebrow">Campaign Intelligence Platform</p>
            <h1>Tenacious — Campaign Intelligence Center</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <button className="button" onClick={load} disabled={loading} type="button">
            {loading ? 'Refreshing…' : 'Refresh data'}
          </button>
        </div>
      </header>

      <main className="shell">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="client-hero">
          <div>
            <p className="eyebrow">RemShield · Campaign Intelligence</p>
            <h2>Track every send, reply, warmup email, and lead outcome across your full campaign.</h2>
          </div>
          <div className="hero-stat">
            <span>Auto-refresh</span>
            <strong>60s</strong>
          </div>
        </section>

        {/* ── Status ─────────────────────────────────────────────── */}
        <section className="status-strip">
          <div>
            <span className={`status-dot${statusKind === 'ok' ? ' ok' : statusKind === 'bad' ? ' bad' : ''}`} />
            <strong>{statusText}</strong>
          </div>
          <div className="status-meta">
            <span>{lastUpdated}</span>
          </div>
        </section>

        {/* ── Metrics ────────────────────────────────────────────── */}
        <section className="metrics-grid" aria-label="Campaign metrics">
          <article className="metric">
            <span>Total leads</span>
            <strong>{n(m?.totalLeads)}</strong>
            <small>{n(m?.personalizedLeads)} personalized / {n(m?.standardLeads)} standard</small>
          </article>
          <article className="metric">
            <span>Initial sent</span>
            <strong>{n(m?.initialSent)}</strong>
            <small>{n(m?.pending)} pending</small>
          </article>
          <article className="metric">
            <span>Follow-ups sent</span>
            <strong>{n(m?.followupsSent)}</strong>
            <small>{n(m?.totalCampaignEmails)} campaign emails total</small>
          </article>
          <article className="metric accent">
            <span>Replies</span>
            <strong>{n(m?.replies)}</strong>
            <small>{pct(m?.replyRate)} reply rate</small>
          </article>
          <article className="metric success">
            <span>Hot leads</span>
            <strong>{n(m?.hotLeads)}</strong>
            <small>{pct(m?.positiveRate)} positive rate</small>
          </article>
          <article className="metric warning">
            <span>Bounces</span>
            <strong>{n(m?.bounces)}</strong>
            <small>{pct(m?.bounceRate)} bounce rate</small>
          </article>
          <article className="metric">
            <span>Warmup today</span>
            <strong>{n(m?.warmupSentToday)}</strong>
            <small>{n(m?.activeWarmupSenders)} senders / {n(m?.activeWarmupRecipients)} recipients</small>
          </article>
          <article className="metric danger">
            <span>Workflow errors</span>
            <strong>{n(m?.errors)}</strong>
            <small>{(m?.errors ?? 0) > 0 ? `${m!.errors} error${m!.errors !== 1 ? 's' : ''} detected` : 'All systems running'}</small>
          </article>
        </section>

        {/* ── Charts ─────────────────────────────────────────────── */}
        <section className="dashboard-grid">
          <article className="panel wide">
            <div className="panel-header">
              <h2>Personalized vs Standard</h2>
              <span>Reply performance</span>
            </div>
            <EmailTypes items={b?.emailType ?? []} />
          </article>

          <article className="panel">
            <div className="panel-header"><h2>Reply Types</h2><span>AI classification</span></div>
            <BarList items={b?.replyTypes ?? []} />
          </article>

          <article className="panel">
            <div className="panel-header"><h2>Lead Status</h2><span>Tracker state</span></div>
            <BarList items={b?.status ?? []} />
          </article>

          <article className="panel">
            <div className="panel-header"><h2>Campaign Domains</h2><span>Lead split</span></div>
            <BarList items={b?.domains ?? []} />
          </article>

          <article className="panel">
            <div className="panel-header"><h2>Warmup By Sender</h2><span>Today</span></div>
            <BarList items={b?.warmupBySender ?? []} />
          </article>
        </section>

        {/* ── Sender table ───────────────────────────────────────── */}
        <section className="panel table-panel">
          <div className="panel-header">
            <h2>Sender Performance</h2>
            <span>{n(t?.senders.length ?? 0)} active senders</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Leads</th>
                  <th>Initial sent</th>
                  <th>Sent today</th>
                  <th>Replies</th>
                  <th>Positive</th>
                  <th>Reply rate</th>
                </tr>
              </thead>
              <tbody><SenderRows rows={t?.senders ?? []} /></tbody>
            </table>
          </div>
        </section>

        {/* ── Feeds ──────────────────────────────────────────────── */}
        <section className="dashboard-grid">
          <article className="panel table-panel">
            <div className="panel-header"><h2>Recent Replies</h2><span>Latest processed</span></div>
            <FeedList items={t?.replies ?? []} type="Reply" />
          </article>
          <article className="panel table-panel">
            <div className="panel-header"><h2>Hot Leads</h2><span>Call priority</span></div>
            <FeedList items={t?.hotLeads ?? []} type="Hot lead" />
          </article>
        </section>

        {/* ── Errors ─────────────────────────────────────────────── */}
        <section className="panel table-panel">
          <div className="panel-header">
            <h2>Workflow Errors</h2>
            <span>{n(m?.errors ?? 0)} error{(m?.errors ?? 0) !== 1 ? 's' : ''}</span>
          </div>
          <ErrorFeed items={t?.errors ?? []} />
        </section>
      </main>
    </>
  );
}
