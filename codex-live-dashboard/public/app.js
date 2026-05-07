const state = {
  refreshMs: 60000,
  timer: null,
  loading: false,
};

const $ = id => document.getElementById(id);

function number(value) {
  return new Intl.NumberFormat('en-GB').format(Number(value || 0));
}

function percent(value) {
  return `${Number(value || 0).toFixed(1).replace('.0', '')}%`;
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function setStatus(kind, text) {
  const dot = $('statusDot');
  dot.className = `status-dot ${kind === 'ok' ? 'ok' : kind === 'bad' ? 'bad' : ''}`;
  setText('statusText', text);
}

function formatDate(value) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function maxOf(items, key = 'value') {
  return Math.max(1, ...items.map(item => Number(item[key] || 0)));
}

function renderBars(id, items, options = {}) {
  const target = $(id);
  const max = maxOf(items, options.valueKey || 'value');
  if (!items.length) {
    target.innerHTML = '<div class="empty-state"><p>No data yet.</p></div>';
    return;
  }
  target.innerHTML = items.slice(0, options.limit || 8).map(item => {
    const value = Number(item[options.valueKey || 'value'] || 0);
    const label = item.name || item.label || 'Unknown';
    const width = Math.max(2, Math.round((value / max) * 100));
    return `
      <div class="bar-row">
        <div class="bar-meta">
          <span>${escapeHtml(label)}</span>
          <span>${number(value)}</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
      </div>
    `;
  }).join('');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderEmailTypes(items = []) {
  const target = $('emailTypeComparison');
  if (!items.length) {
    target.innerHTML = '<div class="empty-state"><p>No email-type data yet.</p></div>';
    return;
  }
  target.innerHTML = items.map(item => {
    const width = Math.max(2, Math.min(100, Number(item.rate || 0)));
    return `
      <div class="comparison-item">
        <h3>${escapeHtml(item.name)}</h3>
        <div class="comparison-number"><span>Leads</span><strong>${number(item.leads)}</strong></div>
        <div class="comparison-number"><span>Replies</span><strong>${number(item.replies)}</strong></div>
        <div class="comparison-number"><span>Reply rate</span><strong>${percent(item.rate)}</strong></div>
        <div class="progress"><span style="width:${width}%"></span></div>
      </div>
    `;
  }).join('');
}

function renderSenders(rows = []) {
  setText('senderSummary', `${number(rows.length)} active senders`);
  const target = $('senderTable');
  if (!rows.length) {
    target.innerHTML = '<tr><td colspan="7"><div class="empty-state"><p>No sender data yet.</p></div></td></tr>';
    return;
  }
  target.innerHTML = rows.map(row => `
    <tr>
      <td data-label="Sender">
        <div class="sender">${escapeHtml(row.sender)}</div>
        <div class="muted">${escapeHtml(row.company || '')} ${escapeHtml(row.domain || '')}</div>
      </td>
      <td class="numeric" data-label="Leads">${number(row.leads)}</td>
      <td class="numeric" data-label="Initial sent">${number(row.sent)}</td>
      <td class="numeric" data-label="Today / Limit">${number(row.todaySent)} / ${number(row.limit)}</td>
      <td class="numeric" data-label="Replies">${number(row.replies)}</td>
      <td class="numeric" data-label="Positive">${number(row.positives)}</td>
      <td class="numeric" data-label="Reply rate">${percent(row.replyRate)}</td>
    </tr>
  `).join('');
}

function renderFeed(id, rows = [], type) {
  const target = $(id);
  if (!rows.length) {
    target.innerHTML = '<div class="empty-state"><p>Nothing here yet.</p></div>';
    return;
  }
  target.innerHTML = rows.map(row => {
    const person = row.Full_Name || [row.First_Name, row.Last_Name].filter(Boolean).join(' ') || row.Recipient_Email || row.Email || 'Unknown person';
    const company = row.Company_Name || row.Campaign_Company || '';
    const kind = row.Reply_Type || row.Suggested_Next_Action || type;
    const snippet = row.Reply_Snippet || row.Reply_Subject || row.Error_Message || row.Notes || '';
    const date = row.Reply_Received_At || row.Processed_At || row.Occurred_At || '';
    return `
      <div class="feed-item">
        <strong>${escapeHtml(person)}${company ? `, ${escapeHtml(company)}` : ''}</strong>
        <span class="pill">${escapeHtml(kind || 'Update')}</span>
        <p>${escapeHtml(snippet).slice(0, 220)}</p>
        <p>${escapeHtml(formatDate(date))}</p>
      </div>
    `;
  }).join('');
}

function renderDashboard(data) {
  const m = data.metrics;
  $('authPanel').classList.add('hidden');

  setStatus('ok', 'Campaign data live');
  setText('lastUpdated', `Updated ${relativeTime(data.generatedAt)}`);

  setText('totalLeads', number(m.totalLeads));
  setText('leadSplit', `${number(m.personalizedLeads)} personalized / ${number(m.standardLeads)} standard`);
  setText('initialSent', number(m.initialSent));
  setText('pendingLeads', `${number(m.pending)} pending`);
  setText('followupsSent', number(m.followupsSent));
  setText('totalCampaignEmails', `${number(m.totalCampaignEmails)} campaign emails total`);
  setText('replyCount', number(m.replies));
  setText('replyRate', `${percent(m.replyRate)} reply rate`);
  setText('hotLeads', number(m.hotLeads));
  setText('positiveRate', `${percent(m.positiveRate)} positive rate`);
  setText('bounces', number(m.bounces));
  setText('bounceRate', `${percent(m.bounceRate)} bounce rate`);
  setText('warmupSentToday', number(m.warmupSentToday));
  setText('warmupSeedInfo', `${number(m.activeWarmupSenders)} senders / ${number(m.activeWarmupRecipients)} recipients`);
  setText('errors', number(m.errors));

  renderEmailTypes(data.breakdowns.emailType);
  renderBars('replyTypeBars', data.breakdowns.replyTypes);
  renderBars('statusBars', data.breakdowns.status);
  renderBars('domainBars', data.breakdowns.domains);
  renderBars('warmupBars', data.breakdowns.warmupBySender);
  renderSenders(data.tables.senders);
  renderFeed('replyFeed', data.tables.replies, 'Reply');
  renderFeed('hotLeadFeed', data.tables.hotLeads, 'Hot lead');
  setText('errorSummary', `${number(m.errors)} error${m.errors !== 1 ? 's' : ''}`);
  if (m.errors > 0) {
    setText('errorSubtext', `${number(m.errors)} error${m.errors !== 1 ? 's' : ''} detected`);
  }
  renderErrorFeed('errorFeed', data.tables.errors);
}

async function loadDashboard() {
  if (state.loading) return;
  state.loading = true;
  $('refreshButton').disabled = true;
  try {
    setStatus('', 'Syncing campaign data...');
    const response = await fetch('/api/dashboard', { cache: 'no-store' });
    const payload = await response.json();
    if (response.status === 401 || payload.needsAuth) {
      $('authPanel').classList.remove('hidden');
      setStatus('bad', 'Authorization required — click to reconnect');
      return;
    }
    if (!response.ok) throw new Error(payload.error || payload.message || 'Dashboard request failed');
    renderDashboard(payload);
  } catch (error) {
    setStatus('bad', 'Data refresh failed — retrying in 60s');
    setText('lastUpdated', `Failed at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`);
  } finally {
    state.loading = false;
    $('refreshButton').disabled = false;
  }
}

function relativeTime(value) {
  if (!value) return 'never';
  const diff = Date.now() - new Date(value).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return formatDate(value);
}

function renderErrorFeed(id, rows = []) {
  const target = $(id);
  if (!rows.length) {
    target.innerHTML = '<div class="empty-state"><p>No workflow errors logged.</p></div>';
    return;
  }
  target.innerHTML = rows.map(row => {
    const workflow = row.Workflow_Name || 'Unknown workflow';
    const node = row.Node_Name ? ` — ${escapeHtml(row.Node_Name)}` : '';
    const message = row.Error_Message || 'No details available';
    const date = row.Occurred_At || '';
    const errorId = row.Error_ID || '';
    return `
      <div class="feed-item error-feed-item">
        <strong>${escapeHtml(workflow)}${node}</strong>
        ${errorId ? `<span class="pill pill-danger">${escapeHtml(errorId)}</span>` : ''}
        <p>${escapeHtml(message).slice(0, 300)}</p>
        <p class="feed-date">${escapeHtml(formatDate(date))}</p>
      </div>
    `;
  }).join('');
}

function start() {
  $('refreshButton').addEventListener('click', loadDashboard);
  loadDashboard();
  state.timer = setInterval(loadDashboard, state.refreshMs);
}

start();
