/**
 * BOTANY AI — Personal Dashboard
 * ===============================
 * Loads CSV + Supabase + localStorage data, finds the logged-in user, renders
 * their personal dashboard with stats, tier progress, use cases, comparisons,
 * and pod assignment.
 *
 * CRITICAL: This file now uses shared pod data and functions from pods-data.js
 * to ensure consistency with the main page (app.js).
 */

// ============================================
// SUPABASE CONFIG
// ============================================
const SUPABASE_URL = 'https://pfpgnuuaueqpitfyfhko.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGdudXVhdWVxcGl0ZnlmaGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDM0MDMsImV4cCI6MjA4Nzc3OTQwM30.wDSbj24oklscbYUaZvhIIm6E2lD6gZrZ5K0PA9FozLA';
let dbClient = null;
if (window.supabase) {
  dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ============================================
// CONFIG — uses shared tier icons from pods-data.js
// ============================================
const TIER_ICONS = {
  propagator: '\u{1F333}',
  pollinator: '\u{1F33B}',
  seedling:   '\u{1F331}',
  planted:    '\u{1F330}'
};

// ============================================
// DATA LOADING — loads from /data.csv (same as app.js)
// ============================================
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
}

// Use the SAME parseHours logic as app.js for consistency
function parseHours(value) {
  if (!value) return 0;

  const lower = value.toLowerCase();

  // Skip if it's clearly not a numeric answer (long text / narrative)
  if (lower.length > 60 && !lower.match(/^\d/)) return 0;
  if (lower === 'n/a' || lower === 'na' || lower === 'none') return 0;

  // Detect if the value mentions minutes
  const isMinutes = lower.includes('min');

  // Handle explicit ranges at start: "10-15", "5 - 10", "30-45 mins"
  const rangeMatch = value.match(/^\s*(\d+\.?\d*)\s*[-\u2013]\s*(\d+\.?\d*)/);
  if (rangeMatch) {
    const avg = (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2;
    return isMinutes ? avg / 60 : avg;
  }

  // Handle leading number: "40 - Automated analysis...", "3", "2 hours", ".5"
  const leadingNum = value.match(/^\s*(\d*\.?\d+)/);
  if (leadingNum) {
    const num = parseFloat(leadingNum[1]);
    return isMinutes ? num / 60 : num;
  }

  return 0;
}

// Use the SAME getTier logic as app.js — NOT score-based, uses OR thresholds
function getTier(hours, useCases) {
  if (hours >= 20 || useCases >= 3) return { key: 'propagator', name: 'Propagator', icon: TIER_ICONS.propagator, min: 20 };
  if (hours >= 10 || useCases >= 2) return { key: 'pollinator', name: 'Pollinator', icon: TIER_ICONS.pollinator, min: 10 };
  if (hours >= 1 || useCases >= 1)  return { key: 'seedling',   name: 'Seedling',   icon: TIER_ICONS.seedling,   min: 1 };
  return { key: 'planted', name: 'Planted', icon: TIER_ICONS.planted, min: 0 };
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

async function loadData() {
  let csvData = [];

  // Load from /data.csv — SAME path as app.js
  try {
    const resp = await fetch('/data.csv');
    if (resp.ok) {
      const text = await resp.text();
      // Guard: if the response looks like HTML, bail
      if (!text.trim().startsWith('<!') && !text.trim().startsWith('<html')) {
        csvData = parseCSV(text);
      }
    }
  } catch (e) {
    console.warn('CSV load failed, trying fallback:', e);
  }

  // Fallback: try the legacy named CSV
  if (csvData.length === 0) {
    try {
      const resp = await fetch('Botany Planting Value Tracker - Copy(Sheet1).csv');
      if (resp.ok) {
        const text = await resp.text();
        csvData = parseCSV(text);
      }
    } catch (e) { /* continue without CSV */ }
  }

  // Pull use case submissions from Supabase
  if (dbClient) {
    try {
      const { data: dbRows, error } = await dbClient
        .from('use_case_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!error && dbRows && dbRows.length > 0) {
        dbRows.forEach(row => {
          csvData.push({
            'Name': row.name || '',
            'Email': row.email || '',
            'What was the use case or activity?': row.use_case || '',
            'Which AI or new tools did you use?': row.tools || '',
            'Estimated hours saved or impact realized': String(row.hours_saved || 0),
            'What was your comfort level with AI tools this week?': String(row.comfort_level || ''),
            'Completion time': row.submitted_at || '',
            'Would you recommend this use case for others?': row.recommends ? 'Yes' : 'No',
            'How did this use case create value for your team or client?': row.value_created || '',
            'What challenges or barriers did you encounter?': row.challenges || '',
            '_source': 'supabase'
          });
        });
        console.log(`Loaded ${dbRows.length} submissions from Supabase`);
      }
    } catch (e) { console.log('Supabase fetch skipped:', e); }
  }

  // Merge localStorage use case submissions (from the Submit form)
  const localUseCases = JSON.parse(localStorage.getItem('botany-usecase-submissions') || '[]');
  localUseCases.forEach(sub => {
    csvData.push({
      'Name': sub.name || '',
      'Email': sub.email || '',
      'What was the use case or activity?': sub.useCase || '',
      'Which AI or new tools did you use?': sub.tools || '',
      'Estimated hours saved or impact realized': String(sub.hours || 0),
      'What was your comfort level with AI tools this week?': String(sub.comfort || ''),
      'Completion time': sub.submittedAt || '',
      'Would you recommend this use case for others?': sub.recommend || 'Yes',
      'How did this use case create value for your team or client?': sub.value || '',
      'What challenges or barriers did you encounter?': sub.challenges || '',
      '_source': 'local-usecase'
    });
  });

  // Merge localStorage intake submissions
  const localIntake = JSON.parse(localStorage.getItem('botany-intake-submissions') || '[]');
  localIntake.forEach(sub => {
    csvData.push({
      'Name': sub.name || '',
      'Email': sub.email || '',
      'What was the use case or activity?': 'Joined Botany \u2014 ' + (sub.participation_preference || 'Active'),
      'Which AI or new tools did you use?': '',
      'Estimated hours saved or impact realized': String(sub.hours_saved_per_week || 0),
      'What was your comfort level with AI tools this week?': String(sub.ai_comfort || ''),
      'Completion time': sub.submittedAt || '',
      'Would you recommend this use case for others?': 'Yes',
      'How did this use case create value for your team or client?': 'Intake application \u2014 ' + (sub.intake_role || ''),
      '_source': 'local-intake'
    });
  });

  return csvData;
}

function processUsers(data) {
  const map = {};
  data.forEach(row => {
    const name = (row.Name || row['Name'] || '').trim();
    if (!name) return;
    if (!map[name]) {
      map[name] = { name, hours: 0, useCases: 0, comfort: [], tools: new Set(), entries: [] };
    }
    const h = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?'] || '');
    map[name].hours += h;
    map[name].useCases += 1;
    const comfort = parseInt(row['What was your comfort level with AI tools this week?'] || '0');
    if (comfort > 0) map[name].comfort.push(comfort);
    const toolStr = row['Which AI or new tools did you use?'] || row['If yes, which tools did you use?'] || '';
    toolStr.split(';').map(t => t.trim()).filter(Boolean).forEach(t => map[name].tools.add(t));
    map[name].entries.push(row);
  });

  return Object.values(map).map(u => ({
    ...u,
    totalHours: Math.round(u.hours * 10) / 10,
    avgComfort: u.comfort.length > 0 ? Math.round(u.comfort.reduce((a,b) => a+b, 0) / u.comfort.length * 10) / 10 : 0,
    toolCount: u.tools.size,
    tools: [...u.tools],
    tier: getTier(u.hours, u.useCases),
    useCaseCount: u.useCases
  }));
}

// ============================================
// FIND USER POD — searches the SAME pod data as app.js
// Uses SHARED_PHASE_3_PODS from pods-data.js (loaded via script tag)
// Falls back to inline data if pods-data.js didn't load
// ============================================
function findUserPod(userName) {
  const lower = userName.toLowerCase().trim();
  // Use the full SHARED pod data if available, otherwise fall back
  const pods = (typeof SHARED_PHASE_3_PODS !== 'undefined') ? SHARED_PHASE_3_PODS : FALLBACK_PODS;

  for (const pod of pods) {
    const allMembers = [...pod.leads, ...pod.members];
    if (allMembers.some(m => m.toLowerCase().trim() === lower)) {
      return pod;
    }
  }
  return null;
}

// Fallback pods if pods-data.js doesn't load (this matches app.js exactly)
const FALLBACK_PODS = [
  { id: 1, name: 'Project Management', leads: ['Luca Bianchi', 'Pedro Henrique'], members: ['Mia Fleming', 'Becca Toren', 'Adam Oliva'] },
  { id: 2, name: 'AI Assistants', leads: ['Ibraheem Ahmad', 'Niko Levin'], members: ['Anthony Saber', 'Preeti Saldanha', 'Kiara Cruz'] },
  { id: 3, name: 'AI is Reshaping Orgs', leads: ['Nicole Lehman', 'Connor Alexander'], members: ['Benjamin Casillas', 'Saara Kharal', 'Abigail Dubinski', 'Kate Sweeney'] },
  { id: 4, name: 'Biz Case Development', leads: ['Alfredo Ramirez', 'Mike Babowice'], members: ['Carleigh Bethea', 'Diego Stoffels-Lopez', 'Frank Vigoa', 'Meghan Lim'] },
  { id: 5, name: 'PPT Upkeep & Storytelling', leads: ['Luke Boyer'], members: ['Connor Rivas', 'Dani Zeller', 'Destiny Ndupu'] },
  { id: 6, name: 'Business Development', leads: ['Katie Lux'], members: ['Catelyn Tankersley', 'Eva Larino', 'Ellie Smith', 'Reese Pulver'] },
  { id: 7, name: 'Stock Uplift Analyst', leads: ['Malcolm MacEwan', 'Gabe Pascual'], members: ['Max Thielbahr', 'Mariano Brito', 'Sophia Pasquale'] },
  { id: 8, name: 'Client-Facing Tools', leads: ['Bianca Rodriguez Pagano', 'Megan Bickel'], members: ['Connor Seale', 'Demetrius Smith', 'Colleen Cooke', 'Katie Shin'] },
  { id: 9, name: 'Vibecoding #1', leads: ['Winston Blythe', 'Rishab'], members: ['Daniela Caisaguano', 'Ellis Kolber', 'Dylan Vohra'] },
  { id: 10, name: 'Vibecoding #2', leads: ['Sam McGinty', 'Max Thielbahr'], members: ['Sam Lee', 'Kendall Likosar', 'Hargunn Sandhu', 'Ethan Herr'] },
  { id: 11, name: 'Tactical Hiring / KT', leads: [], members: [] },
  { id: 12, name: 'PA Support', leads: [], members: [] },
  { id: 13, name: 'Agent Catalog', leads: [], members: [] },
  { id: 14, name: 'Process Design', leads: [], members: [] },
  { id: 15, name: 'Enterprise Claude', leads: ['Gavin Stewart', 'Bella Watchi'], members: [] }
];

// ============================================
// RENDER DASHBOARD
// ============================================
function renderDashboard(user, allUsers, allData) {
  // Identity
  document.getElementById('dash-avatar').textContent = getInitials(user.name);
  document.getElementById('dash-name').textContent = user.name;
  document.getElementById('dash-tier').textContent = `${user.tier.icon} ${user.tier.name}`;

  const pod = findUserPod(user.name);
  document.getElementById('dash-pod').textContent = pod ? `Pod #${pod.id} \u00b7 ${pod.name}` : 'No pod assigned';

  // Stats
  document.getElementById('ds-hours').textContent = user.totalHours;
  document.getElementById('ds-usecases').textContent = user.useCaseCount;
  document.getElementById('ds-comfort').textContent = user.avgComfort;
  document.getElementById('ds-tools').textContent = user.toolCount;

  // Tier progression
  renderTierProgress(user);

  // Use cases
  renderUseCases(user);

  // Comparison
  renderComparison(user, allUsers);

  // Pod card
  renderPodCard(pod, user.name);
}

function renderTierProgress(user) {
  const el = document.getElementById('tier-progress');
  const tiers = [
    { key: 'planted', name: 'Planted', icon: TIER_ICONS.planted },
    { key: 'seedling', name: 'Seedling', icon: TIER_ICONS.seedling },
    { key: 'pollinator', name: 'Pollinator', icon: TIER_ICONS.pollinator },
    { key: 'propagator', name: 'Propagator', icon: TIER_ICONS.propagator }
  ];

  // Calculate effective progress using the SAME tier logic as app.js
  // Progress metric: hours toward 20 (max tier threshold)
  const progressVal = user.totalHours;
  const maxVal = 25; // slightly above propagator threshold for visual breathing room
  const pct = Math.min(100, (progressVal / maxVal) * 100);
  const currentIdx = tiers.findIndex(t => t.key === user.tier.key);

  // Next tier hint
  let nextHint = '';
  if (currentIdx < tiers.length - 1) {
    const next = tiers[currentIdx + 1];
    // Calculate what's needed based on app.js thresholds
    let needed = '';
    if (user.tier.key === 'planted') {
      needed = 'Submit 1 use case or save 1+ hour with AI';
    } else if (user.tier.key === 'seedling') {
      const hoursNeeded = Math.max(0, 10 - user.totalHours);
      const casesNeeded = Math.max(0, 2 - user.useCaseCount);
      needed = `${hoursNeeded > 0 ? hoursNeeded + ' more hours saved' : ''}${hoursNeeded > 0 && casesNeeded > 0 ? ' or ' : ''}${casesNeeded > 0 ? casesNeeded + ' more use cases' : ''}`;
    } else if (user.tier.key === 'pollinator') {
      const hoursNeeded = Math.max(0, 20 - user.totalHours);
      const casesNeeded = Math.max(0, 3 - user.useCaseCount);
      needed = `${hoursNeeded > 0 ? hoursNeeded + ' more hours saved' : ''}${hoursNeeded > 0 && casesNeeded > 0 ? ' or ' : ''}${casesNeeded > 0 ? casesNeeded + ' more use cases' : ''}`;
    }
    nextHint = `<div class="tier-next-hint">Next tier: <strong>${next.icon} ${next.name}</strong> \u2014 ${needed || 'Keep going!'}</div>`;
  } else {
    nextHint = '<div class="tier-next-hint">\u{1F3C6} You\'ve reached the highest tier \u2014 <strong>Propagator</strong>!</div>';
  }

  el.innerHTML = `
    <div class="tier-bar-wrap">
      <div class="tier-bar-track">
        <div class="tier-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="tier-markers">
        ${tiers.map((t, i) => {
          const cls = i < currentIdx ? 'completed' : i === currentIdx ? 'active' : '';
          return `<div class="tier-marker ${cls}"><div class="tier-marker-dot"></div>${t.icon} ${t.name}</div>`;
        }).join('')}
      </div>
    </div>
    ${nextHint}
  `;
}

function renderUseCases(user) {
  const el = document.getElementById('dash-usecases');
  if (!user.entries || user.entries.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No use cases submitted yet \u2014 <a href="index.html#submit" style="color:var(--purple-light);">submit your first one!</a></p>';
    return;
  }

  // Sort newest first
  const sorted = [...user.entries].sort((a, b) => {
    const da = new Date(a['Completion time'] || a['Start time'] || '');
    const db = new Date(b['Completion time'] || b['Start time'] || '');
    return db - da;
  });

  el.innerHTML = sorted.map(entry => {
    const date = entry['Completion time'] || entry['When did you experiment with this use case?'] || '';
    const usecase = entry['What was the use case or activity?'] || 'No description';
    const tools = (entry['Which AI or new tools did you use?'] || '').split(';').map(t => t.trim()).filter(Boolean);
    const hours = entry['Estimated hours saved or impact realized'] || '\u2014';
    const value = entry['How did this use case create value for your team or client?'] || '';
    const recommended = entry['Would you recommend this use case for others?'] || '';
    const comfort = entry['What was your comfort level with AI tools this week?'] || '';
    const challenges = entry['What challenges or barriers did you encounter?'] || '';

    const toolBadges = tools.map(t => `<span class="dash-uc-tool-badge">${t}</span>`).join('');
    const dateStr = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    return `
      <div class="dash-uc-card">
        <div class="dash-uc-header">
          <div class="dash-uc-title">${usecase}</div>
          <div class="dash-uc-date">${dateStr}</div>
        </div>
        ${value ? `<p class="dash-uc-value">${value}</p>` : ''}
        ${challenges ? `<p class="dash-uc-challenges" style="color:var(--text-muted);font-size:0.85rem;margin-top:0.25rem;"><em>Challenges: ${challenges}</em></p>` : ''}
        <div class="dash-uc-footer">
          <div class="dash-uc-metric">\u23F1 <strong>${hours}</strong></div>
          ${comfort ? `<div class="dash-uc-metric">Comfort: <strong>${comfort}/5</strong></div>` : ''}
          ${recommended ? `<div class="dash-uc-metric">${recommended.toLowerCase().includes('yes') ? '\u{1F44D}' : '\u2014'} ${recommended}</div>` : ''}
          ${toolBadges}
        </div>
      </div>
    `;
  }).join('');
}

function renderComparison(user, allUsers) {
  const el = document.getElementById('dash-compare');
  if (allUsers.length < 2) {
    el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Not enough data for comparison yet.</p>';
    return;
  }

  const avgHours = allUsers.reduce((s, u) => s + u.totalHours, 0) / allUsers.length;
  const comfortUsers = allUsers.filter(u => u.avgComfort > 0);
  const avgComfort = comfortUsers.length > 0 ? comfortUsers.reduce((s, u) => s + u.avgComfort, 0) / comfortUsers.length : 0;
  const avgTools = allUsers.reduce((s, u) => s + u.toolCount, 0) / allUsers.length;
  const avgUC = allUsers.reduce((s, u) => s + u.useCaseCount, 0) / allUsers.length;

  function compBar(label, you, avg, max) {
    const youPct = Math.min(100, (you / max) * 100);
    const avgPct = Math.min(100, (avg / max) * 100);
    return `
      <div class="dash-compare-card">
        <div class="dash-compare-label">${label}</div>
        <div class="dash-compare-bars">
          <div class="dash-compare-row">
            <span class="dash-compare-row-label">You</span>
            <div class="dash-compare-track"><div class="dash-compare-fill-you" style="width:${youPct}%"></div></div>
            <span class="dash-compare-val">${typeof you === 'number' ? (you % 1 === 0 ? you : you.toFixed(1)) : you}</span>
          </div>
          <div class="dash-compare-row">
            <span class="dash-compare-row-label">Average</span>
            <div class="dash-compare-track"><div class="dash-compare-fill-avg" style="width:${avgPct}%"></div></div>
            <span class="dash-compare-val">${typeof avg === 'number' ? avg.toFixed(1) : avg}</span>
          </div>
        </div>
      </div>
    `;
  }

  const maxH = Math.max(user.totalHours, avgHours, 20);
  const maxUC = Math.max(user.useCaseCount, avgUC, 10);

  el.innerHTML = [
    compBar('Hours Saved', user.totalHours, avgHours, maxH * 1.2),
    compBar('Use Cases Submitted', user.useCaseCount, avgUC, maxUC * 1.2),
    compBar('Comfort Level', user.avgComfort, avgComfort, 5),
    compBar('Tools Used', user.toolCount, avgTools, Math.max(user.toolCount, avgTools, 5) * 1.2)
  ].join('');
}

function renderPodCard(pod, currentUserName) {
  const el = document.getElementById('dash-pod-card');
  if (!pod) {
    el.innerHTML = '<div class="dash-compare-card" style="text-align:center;padding:2rem;"><p style="color:var(--text-muted);">You\'re not currently assigned to a pod. <a href="index.html#pods" style="color:var(--purple-light);">Browse available pods \u2192</a></p></div>';
    return;
  }

  // Render leads with profile links (clickable to navigate to their dashboard)
  const leads = pod.leads.map(n => {
    const isYou = n.toLowerCase().trim() === currentUserName.toLowerCase().trim();
    return `<div class="pod-lead ${isYou ? '' : 'profile-link-dash'}" data-profile="${n}" title="${isYou ? 'That\'s you!' : 'View ' + n + '\'s profile'}" style="cursor:${isYou ? 'default' : 'pointer'}">
      <div class="pod-lead-avatar">${getInitials(n)}</div>
      <span>${n}${isYou ? ' (you)' : ''}</span>
    </div>`;
  }).join('');

  // Render members with profile links
  const members = pod.members.map(n => {
    const isYou = n.toLowerCase().trim() === currentUserName.toLowerCase().trim();
    return `<span class="pod-member-chip ${isYou ? '' : 'profile-link-dash'}" data-profile="${n}" title="${isYou ? 'That\'s you!' : 'View ' + n + '\'s profile'}" style="cursor:${isYou ? 'default' : 'pointer'}">${n}${isYou ? ' (you)' : ''}</span>`;
  }).join('');

  el.innerHTML = `
    <div class="pod-card dash-pod-card">
      <span class="pod-number">Pod #${pod.id}</span>
      <h3 class="pod-name">${pod.name}</h3>
      <p class="pod-description" style="color:var(--text-muted);font-size:0.9rem;margin:0.5rem 0 1rem;">${pod.description || ''}</p>
      ${pod.leads.length > 0 ? `<div class="pod-leads-section"><span class="pod-section-label">Leads</span><div class="pod-leads-row">${leads}</div></div>` : ''}
      ${pod.members.length > 0 ? `<div class="pod-members-section"><span class="pod-section-label">Members</span><div class="pod-members-row">${members}</div></div>` : ''}
    </div>
  `;
}

// ============================================
// PROFILE LINKS — clickable names in dashboard
// ============================================
function setupDashboardProfileLinks() {
  document.body.addEventListener('click', (e) => {
    const profileEl = e.target.closest('[data-profile].profile-link-dash');
    if (profileEl) {
      e.preventDefault();
      e.stopPropagation();
      const name = profileEl.dataset.profile;
      if (name) {
        sessionStorage.setItem('botany-user', name);
        // Reload the dashboard with the new user
        window.location.reload();
      }
    }
  });
}

// ============================================
// LOGOUT
// ============================================
document.getElementById('logout-btn')?.addEventListener('click', () => {
  sessionStorage.removeItem('botany-user');
  window.location.href = 'index.html';
});

// ============================================
// INIT
// ============================================
(async function dashboardInit() {
  const userName = sessionStorage.getItem('botany-user');
  if (!userName) {
    window.location.href = 'index.html';
    return;
  }

  // Setup clickable profile links on the dashboard
  setupDashboardProfileLinks();

  const allData = await loadData();

  if (allData.length === 0) {
    // No data at all — show basic info from the user name
    document.getElementById('dash-name').textContent = userName;
    document.getElementById('dash-avatar').textContent = getInitials(userName);
    const pod = findUserPod(userName);
    document.getElementById('dash-pod').textContent = pod ? `Pod #${pod.id} \u00b7 ${pod.name}` : '';
    document.getElementById('dash-tier').textContent = `${TIER_ICONS.planted} Planted`;
    document.getElementById('dash-usecases').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No data yet \u2014 <a href="index.html#submit" style="color:var(--purple-light);">submit your first use case!</a></p>';
    renderPodCard(findUserPod(userName), userName);
    return;
  }

  const allUsers = processUsers(allData);

  // Find the current user — use CASE-INSENSITIVE matching to handle variations
  let currentUser = allUsers.find(u => u.name === userName);
  if (!currentUser) {
    // Try case-insensitive
    currentUser = allUsers.find(u => u.name.toLowerCase().trim() === userName.toLowerCase().trim());
  }

  if (!currentUser) {
    // User exists in pods but not in CSV data — show basic info with pod
    document.getElementById('dash-avatar').textContent = getInitials(userName);
    document.getElementById('dash-name').textContent = userName;
    const pod = findUserPod(userName);
    document.getElementById('dash-pod').textContent = pod ? `Pod #${pod.id} \u00b7 ${pod.name}` : '';
    document.getElementById('dash-tier').textContent = `${TIER_ICONS.planted} Planted`;
    document.getElementById('dash-usecases').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No data yet \u2014 <a href="index.html#submit" style="color:var(--purple-light);">submit your first use case!</a></p>';
    renderPodCard(pod, userName);
    renderComparison({ totalHours: 0, useCaseCount: 0, avgComfort: 0, toolCount: 0 }, allUsers);
    return;
  }

  renderDashboard(currentUser, allUsers, allData);
})();
