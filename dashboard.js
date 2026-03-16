/**
 * BOTANY AI — Personal Dashboard
 * ===============================
 * Loads data from Supabase, finds the logged-in user, renders
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
// CONFIG — uses shared GROWTH_LEVELS from pods-data.js
// ============================================
// TIER_ICONS is no longer needed — icons come from GROWTH_LEVELS

// ============================================
// DATA LOADING — Supabase-first (matches app.js)
// ============================================

// Use shared level system from pods-data.js
function getTier(hours, useCases) {
  const xp = calculateXP(hours, useCases);
  const level = getLevelFromXP(xp);
  return { key: level.key, name: level.name, icon: level.icon, min: level.xpThreshold, class: level.cssClass };
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

async function loadData() {
  let allRows = [];

  // Primary: load from Supabase use_case_submissions
  if (dbClient) {
    try {
      const { data, error } = await dbClient
        .from('use_case_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('submitted_at', { ascending: true });

      if (!error && data && data.length > 0) {
        allRows = data;
        console.log(`Dashboard: loaded ${data.length} submissions from Supabase`);
      }
    } catch (e) {
      console.warn('Supabase fetch failed:', e);
    }
  }

  // Merge localStorage submissions for immediate access (before Supabase sync)
  const localUseCases = JSON.parse(localStorage.getItem('botany-usecase-submissions') || '[]');
  localUseCases.forEach(sub => {
    // Convert localStorage format to Supabase column format
    allRows.push({
      name: sub.name || '',
      email: sub.email || '',
      use_case: sub.useCase || '',
      tools: sub.tools || '',
      hours_saved: parseFloat(sub.hours) || 0,
      comfort_level: parseInt(sub.comfort) || null,
      submitted_at: sub.submittedAt || '',
      recommends: sub.recommend === 'Yes',
      value_created: sub.value || '',
      challenges: sub.challenges || '',
      used_in_client_work: sub.clientWork === 'Yes',
      _source: 'localStorage'
    });
  });

  return allRows;
}

function processUsers(data) {
  const map = {};
  data.forEach(row => {
    const name = (row.name || '').trim();
    if (!name) return;
    if (!map[name]) {
      map[name] = { name, hours: 0, useCases: 0, comfort: [], tools: new Set(), entries: [], usedInClientWork: false, tipCount: 0 };
    }
    const h = parseFloat(row.hours_saved) || 0;
    map[name].hours += h;
    map[name].useCases += 1;
    const comfort = parseInt(row.comfort_level) || 0;
    if (comfort > 0) map[name].comfort.push(comfort);
    const toolStr = row.tools || '';
    toolStr.split(';').map(t => t.trim()).filter(Boolean).forEach(t => map[name].tools.add(t));
    map[name].entries.push(row);
    // Track client work usage for badge
    if (row.used_in_client_work === true) {
      map[name].usedInClientWork = true;
    }
  });

  return Object.values(map).map(u => {
    const xp = calculateXP(u.hours, u.useCases, u.tipCount);
    return {
      ...u,
      totalHours: Math.round(u.hours * 10) / 10,
      avgComfort: u.comfort.length > 0 ? Math.round(u.comfort.reduce((a,b) => a+b, 0) / u.comfort.length * 10) / 10 : 0,
      toolCount: u.tools.size,
      tools: [...u.tools],
      tier: getTier(u.hours, u.useCases),
      useCaseCount: u.useCases,
      xp
    };
  });
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
const TUTORIAL_VERSION = '2';

const TUTORIAL_STEPS = [
  {
    type: 'modal', icon: '\ud83c\udf31', title: 'Welcome to your Botany Profile!',
    body: 'This is your personal dashboard — everything about your AI journey lives here. Let\u2019s take a quick tour!'
  },
  {
    type: 'modal', icon: '\u2b50', title: 'How XP & Levels Work',
    body: 'You earn XP by saving hours (10 XP/hr), submitting use cases (50 XP each), and sharing pro tips (15 XP each). Your level grows from \ud83e\udeb4 Moss to \ud83c\udfd4\ufe0f Sequoia!'
  },
  {
    type: 'highlight', target: '#dash-stats-row', title: 'Your Stats at a Glance',
    body: 'Hours saved, use cases submitted, comfort level, and tools mastered — all tracked in real-time from Supabase.'
  },
  {
    type: 'highlight', target: '#streak-section', title: '\ud83d\udd25 Weekly Streaks',
    body: 'Stay active every week to build a streak. Use the Quick Win form to log any small AI win — it counts!'
  },
  {
    type: 'highlight', target: '#badges', title: '\ud83c\udfc5 Achievement Badges',
    body: '11 badges to unlock! From First Bloom (your first use case) to Knowledge Pollinator (3+ pro tips). New unlocks trigger confetti \ud83c\udf89'
  },
  {
    type: 'highlight', target: '#mytips', title: '\ud83d\udca1 Pro Tips',
    body: 'Share quick AI tips, prompts, and discoveries with the community. Your tips appear here — and on the main page for everyone to see.'
  },
  {
    type: 'modal', icon: '\ud83c\udf89', title: 'You\u2019re all set!',
    body: 'Explore your profile, share a tip, and keep your streak alive. Welcome to Botany \ud83c\udf3f'
  }
];

let tutorialStep = 0;

function startTutorial() {
  const dismissKey = `botany-tutorial-done-${TUTORIAL_VERSION}`;
  if (localStorage.getItem(dismissKey)) return;

  tutorialStep = 0;
  showTutorialStep();
}

function showTutorialStep() {
  // Clean up previous step
  document.querySelector('.tutorial-overlay')?.remove();
  document.querySelector('.tutorial-card')?.remove();
  document.querySelectorAll('.tutorial-highlighted').forEach(el => el.classList.remove('tutorial-highlighted'));

  if (tutorialStep >= TUTORIAL_STEPS.length) {
    localStorage.setItem(`botany-tutorial-done-${TUTORIAL_VERSION}`, 'true');
    return;
  }

  const step = TUTORIAL_STEPS[tutorialStep];
  const total = TUTORIAL_STEPS.length;
  const isLast = tutorialStep === total - 1;

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  document.body.appendChild(overlay);

  // Progress dots
  const dots = Array.from({ length: total }, (_, i) =>
    `<span class="tutorial-dot ${i === tutorialStep ? 'active' : ''} ${i < tutorialStep ? 'done' : ''}"></span>`
  ).join('');

  if (step.type === 'modal') {
    // Centered modal card
    const card = document.createElement('div');
    card.className = 'tutorial-card tutorial-card-modal';
    card.innerHTML = `
      <div class="tutorial-card-icon">${step.icon}</div>
      <h3 class="tutorial-card-title">${step.title}</h3>
      <p class="tutorial-card-body">${step.body}</p>
      <div class="tutorial-dots">${dots}</div>
      <div class="tutorial-actions">
        <button class="tutorial-skip">${isLast ? '' : 'Skip tour'}</button>
        <button class="tutorial-next">${isLast ? 'Let\u2019s go!' : 'Next \u2192'}</button>
      </div>
    `;
    document.body.appendChild(card);
    setupTutorialButtons(card);

  } else if (step.type === 'highlight') {
    const target = document.querySelector(step.target);
    if (!target) { tutorialStep++; showTutorialStep(); return; }

    // Elevate the target element ABOVE the overlay
    target.classList.add('tutorial-highlighted');

    // Scroll into view and wait for scroll to settle
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const viewH = window.innerHeight;
      const viewW = window.innerWidth;

      // Build tooltip card
      const card = document.createElement('div');
      card.className = 'tutorial-card tutorial-card-highlight';
      card.innerHTML = `
        <h3 class="tutorial-card-title">${step.title}</h3>
        <p class="tutorial-card-body">${step.body}</p>
        <div class="tutorial-dots">${dots}</div>
        <div class="tutorial-actions">
          <button class="tutorial-skip">Skip tour</button>
          <button class="tutorial-next">Next \u2192</button>
        </div>
      `;
      document.body.appendChild(card);

      // Measure then position smartly
      const cardH = card.getBoundingClientRect().height;
      const cardW = Math.min(380, viewW - 32);
      const gap = 16;
      const spaceBelow = viewH - rect.bottom;
      const spaceAbove = rect.top;
      let top;

      if (spaceBelow >= cardH + gap) {
        top = rect.bottom + gap;
      } else if (spaceAbove >= cardH + gap) {
        top = rect.top - gap - cardH;
      } else {
        top = Math.max(16, (viewH - cardH) / 2);
      }

      let left = rect.left + rect.width / 2 - cardW / 2;
      left = Math.max(16, Math.min(left, viewW - cardW - 16));

      card.style.position = 'fixed';
      card.style.top = `${top}px`;
      card.style.left = `${left}px`;
      card.style.width = `${cardW}px`;

      setupTutorialButtons(card);
    }, 500);
  }

  // Close on overlay click
  overlay.addEventListener('click', () => skipTutorial());
}

function setupTutorialButtons(card) {
  card.querySelector('.tutorial-next')?.addEventListener('click', () => {
    tutorialStep++;
    showTutorialStep();
  });
  card.querySelector('.tutorial-skip')?.addEventListener('click', () => skipTutorial());
}

function skipTutorial() {
  document.querySelector('.tutorial-overlay')?.remove();
  document.querySelector('.tutorial-card')?.remove();
  document.querySelectorAll('.tutorial-highlighted').forEach(el => el.classList.remove('tutorial-highlighted'));
  localStorage.setItem(`botany-tutorial-done-${TUTORIAL_VERSION}`, 'true');
}

function restartTutorial() {
  localStorage.removeItem(`botany-tutorial-done-${TUTORIAL_VERSION}`);
  tutorialStep = 0;
  showTutorialStep();
}

// ============================================
// PLANT AVATAR PICKER
// ============================================
function openPlantPicker(user) {
  // Remove existing picker
  document.getElementById('plant-picker-modal')?.remove();

  const userLevelIdx = GROWTH_LEVELS.findIndex(l => l.key === (user.tier.key || user.level?.key || 'moss'));
  const selectedPlant = localStorage.getItem('botany-plant-avatar') || user.tier.key || 'moss';

  const cards = GROWTH_LEVELS.map((level, idx) => {
    const unlocked = idx <= userLevelIdx;
    const isSelected = level.key === selectedPlant;
    return `
      <div class="plant-pick ${unlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}"
           data-plant="${level.key}" ${unlocked ? '' : 'aria-disabled="true"'}>
        <img src="${getPlantAvatar(level.key)}" alt="${level.name}" class="plant-pick-img">
        ${!unlocked ? '<div class="plant-pick-lock">\ud83d\udd12</div>' : ''}
        <div class="plant-pick-name">${level.icon} ${level.name}</div>
        <div class="plant-pick-xp">${level.xpThreshold} XP</div>
      </div>
    `;
  }).join('');

  const modal = document.createElement('div');
  modal.id = 'plant-picker-modal';
  modal.innerHTML = `
    <div class="plant-picker-overlay"></div>
    <div class="plant-picker-container">
      <div class="plant-picker-header">
        <h3>Choose Your Plant Avatar</h3>
        <button class="plant-picker-close">&times;</button>
      </div>
      <p class="plant-picker-hint">Unlock new plants by earning XP! You're currently <strong>${user.tier.icon} ${user.tier.name}</strong>.</p>
      <div class="plant-picker-grid">${cards}</div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close handlers
  modal.querySelector('.plant-picker-overlay').onclick = () => modal.remove();
  modal.querySelector('.plant-picker-close').onclick = () => modal.remove();

  // Select handlers
  modal.querySelectorAll('.plant-pick.unlocked').forEach(card => {
    card.onclick = () => {
      const key = card.dataset.plant;
      localStorage.setItem('botany-plant-avatar', key);
      const avatarEl = document.getElementById('dash-avatar');
      avatarEl.innerHTML = `<img src="${getPlantAvatar(key)}" alt="${key}" class="plant-avatar-img" title="Click to change your plant avatar">`;
      modal.remove();
    };
  });
}

function renderDashboard(user, allUsers, allData) {
  // Interactive tutorial (shows only once per version)
  setTimeout(() => startTutorial(), 800);
  // Identity — Plant avatar
  const avatarEl = document.getElementById('dash-avatar');
  const savedPlant = localStorage.getItem('botany-plant-avatar');
  const currentLevelKey = user.tier.key || user.level?.key || 'moss';
  const plantKey = savedPlant || currentLevelKey;
  avatarEl.innerHTML = `<img src="${getPlantAvatar(plantKey)}" alt="${plantKey}" class="plant-avatar-img" title="Click to change your plant avatar">`;
  avatarEl.style.cursor = 'pointer';
  avatarEl.onclick = () => openPlantPicker(user);

  document.getElementById('dash-name').textContent = user.name;
  // Add replay tour button next to name
  const nameEl = document.getElementById('dash-name');
  const replayBtn = document.createElement('button');
  replayBtn.className = 'restart-tutorial';
  replayBtn.textContent = 'Replay Tour';
  replayBtn.onclick = () => restartTutorial();
  nameEl.appendChild(replayBtn);

  document.getElementById('dash-tier').textContent = `${user.tier.icon} ${user.tier.name}`;

  const pod = findUserPod(user.name);
  const podEl = document.getElementById('dash-pod');
  if (pod) {
    podEl.textContent = `Pod #${pod.id} \u00b7 ${pod.name}`;
    podEl.style.cursor = 'pointer';
    podEl.title = 'Click to view your pod';
    podEl.onclick = () => {
      document.getElementById('pod')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  } else {
    podEl.textContent = 'No pod assigned';
  }

  // Stats
  document.getElementById('ds-hours').textContent = user.totalHours;
  document.getElementById('ds-usecases').textContent = user.useCaseCount;
  document.getElementById('ds-comfort').textContent = user.avgComfort;
  document.getElementById('ds-tools').textContent = user.toolCount;

  // Tier progression
  renderTierProgress(user);

  // Streaks + Challenges (async — loads from DB)
  (async () => {
    const streakData = await updateStreak(user.name);
    renderStreak(streakData, user.name);
    renderChallenges(user.name);
  })();

  // Badges
  renderBadges(user, allUsers);

  // My Tips (async)
  (async () => {
    const tips = await loadUserTips(user.name);
    user.tipCount = tips.length;
    renderMyTips(tips, user.name);
  })();

  // Use cases
  renderUseCases(user);

  // Comparison
  renderComparison(user, allUsers);

  // Pod card
  renderPodCard(pod, user.name);
}

function renderTierProgress(user) {
  const el = document.getElementById('tier-progress');
  const xp = calculateXP(user.totalHours, user.useCaseCount);
  const level = getLevelFromXP(xp);

  // Build the level markers
  const markers = GROWTH_LEVELS.map((gl, i) => {
    let cls = '';
    if (i < level.levelIndex) cls = 'completed';
    else if (i === level.levelIndex) cls = 'active';
    return `<div class="tier-marker ${cls}"><div class="tier-marker-dot"></div>${gl.icon} ${gl.name}</div>`;
  }).join('');

  // Next level hint
  let nextHint = '';
  if (level.nextLevel) {
    const xpNeeded = level.nextLevel.xpThreshold - xp;
    const hoursEquiv = Math.ceil(xpNeeded / 10);
    const casesEquiv = Math.ceil(xpNeeded / 50);
    nextHint = `<div class="tier-next-hint">Next: <strong>${level.nextLevel.icon} ${level.nextLevel.name}</strong> in ${xpNeeded} XP &mdash; submit ${casesEquiv} use case${casesEquiv > 1 ? 's' : ''} or save ${hoursEquiv} hours</div>`;
  } else {
    nextHint = '<div class="tier-next-hint">🏆 You\'ve reached <strong>Sequoia</strong> &mdash; legendary status!</div>';
  }

  el.innerHTML = `
    <div class="level-header">
      <span class="level-icon-big">${level.icon}</span>
      <div class="level-info">
        <div class="level-name">${level.name}</div>
        <div class="level-xp">${xp} XP</div>
      </div>
      <span class="tier-badge ${level.cssClass}">${level.icon} ${level.name}</span>
    </div>
    <div class="tier-bar-wrap">
      <div class="tier-bar-track">
        <div class="tier-bar-fill" style="width:${level.progressPercent}%"></div>
      </div>
      <div class="tier-markers">
        ${markers}
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
    const da = new Date(a.submitted_at || '');
    const db = new Date(b.submitted_at || '');
    return db - da;
  });

  el.innerHTML = sorted.map(entry => {
    const date = entry.submitted_at || '';
    const usecase = entry.use_case || 'No description';
    const tools = (entry.tools || '').split(';').map(t => t.trim()).filter(Boolean);
    const hours = entry.hours_saved || '\u2014';
    const value = entry.value_created || '';
    const recommended = entry.recommends;
    const comfort = entry.comfort_level || '';
    const challenges = entry.challenges || '';

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
          ${typeof recommended === 'boolean' ? `<div class="dash-uc-metric">${recommended ? '\u{1F44D} Recommended' : '\u2014'}</div>` : ''}
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
// STREAK SYSTEM
// ============================================
function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 604800000;
  return { week: Math.ceil(diff / oneWeek), year: now.getFullYear() };
}

async function loadStreakData(userName) {
  if (!dbClient) return null;
  try {
    const { data, error } = await dbClient
      .from('user_streaks')
      .select('*')
      .eq('user_name', userName)
      .maybeSingle();
    if (error && error.code !== 'PGRST116' && error.code !== '406') console.warn('Streak load error:', error);
    return data || null;
  } catch (e) { return null; }
}

async function updateStreak(userName) {
  if (!dbClient) return null;
  const { week, year } = getCurrentWeek();

  // Check if there's activity this week
  const { data: activity } = await dbClient
    .from('activity_log')
    .select('id')
    .eq('user_name', userName)
    .eq('week_number', week)
    .eq('year', year)
    .limit(1);

  if (!activity || activity.length === 0) return await loadStreakData(userName);

  // Get or create streak record
  let streak = await loadStreakData(userName);

  if (!streak) {
    // First time — create record
    const { data } = await dbClient.from('user_streaks').insert([{
      user_name: userName, current_streak: 1, longest_streak: 1,
      last_active_week: week, last_active_year: year
    }]).select().single();
    return data;
  }

  // Already updated this week
  if (streak.last_active_week === week && streak.last_active_year === year) {
    return streak;
  }

  // Check if last week was active (continuation) or if streak broke
  const lastWeekNum = week - 1;
  const isConsecutive = (streak.last_active_year === year && streak.last_active_week === lastWeekNum) ||
    (streak.last_active_year === year - 1 && lastWeekNum <= 0 && streak.last_active_week >= 52);

  const newStreak = isConsecutive ? streak.current_streak + 1 : 1;
  const longest = Math.max(newStreak, streak.longest_streak);

  const { data } = await dbClient.from('user_streaks')
    .update({ current_streak: newStreak, longest_streak: longest, last_active_week: week, last_active_year: year, updated_at: new Date().toISOString() })
    .eq('user_name', userName)
    .select().single();

  return data;
}

async function submitQuickWin(userName, description) {
  if (!dbClient) return false;
  const { week, year } = getCurrentWeek();

  const { error } = await dbClient.from('activity_log').insert([{
    user_name: userName, action_type: 'quick_win',
    description, week_number: week, year
  }]);

  if (error) { console.error('Quick win error:', error); return false; }
  return true;
}

function renderStreak(streakData, userName) {
  const el = document.getElementById('streak-widget');
  if (!el) return;

  const current = streakData ? streakData.current_streak : 0;
  const longest = streakData ? streakData.longest_streak : 0;
  const flameSizes = current > 0 ? 'active' : '';

  el.innerHTML = `
    <div class="streak-display ${flameSizes}">
      <div class="streak-flame">${current > 0 ? '🔥' : '❄️'}</div>
      <div class="streak-info">
        <div class="streak-count">${current}</div>
        <div class="streak-label">week streak</div>
      </div>
      <div class="streak-best">Best: ${longest} ${longest === 1 ? 'week' : 'weeks'}</div>
    </div>
    <form class="quick-win-form" id="quick-win-form">
      <input type="text" id="quick-win-input" placeholder="Quick AI win this week\u2026" maxlength="200" required>
      <button type="submit" class="btn btn-primary btn-sm">Log Win</button>
    </form>
    <div class="quick-win-success" id="quick-win-success" style="display:none;">
      ✅ Nice! Streak updated.
    </div>
  `;

  // Quick win form handler
  el.querySelector('#quick-win-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('quick-win-input');
    const desc = input.value.trim();
    if (!desc) return;

    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Saving\u2026';

    const ok = await submitQuickWin(userName, desc);
    if (ok) {
      const updated = await updateStreak(userName);
      e.target.style.display = 'none';
      document.getElementById('quick-win-success').style.display = 'block';
      // Re-render with updated streak
      setTimeout(() => renderStreak(updated, userName), 1500);
    } else {
      btn.disabled = false;
      btn.textContent = 'Log Win';
    }
  });
}

// ============================================
// BADGE SYSTEM
// ============================================
const BADGE_CATALOG = [
  {
    key: 'first_bloom', name: 'First Bloom', icon: '🌸',
    desc: 'Submit your first use case',
    check: u => u.useCaseCount >= 1
  },
  {
    key: 'tool_collector', name: 'Tool Collector', icon: '🧰',
    desc: 'Use 3+ different AI tools',
    check: u => u.toolCount >= 3
  },
  {
    key: 'time_wizard', name: 'Time Wizard', icon: '⏱️',
    desc: 'Save 20+ total hours with AI',
    check: u => u.totalHours >= 20
  },
  {
    key: 'comfort_climber', name: 'Comfort Climber', icon: '📈',
    desc: 'Reach comfort level 4+',
    check: u => parseFloat(u.avgComfort) >= 4
  },
  {
    key: 'client_trailblazer', name: 'Client Trailblazer', icon: '💼',
    desc: 'Use AI in client work',
    check: u => u.usedInClientWork === true
  },
  {
    key: 'galaxy_brain', name: 'Galaxy Brain', icon: '🧠',
    desc: 'Submit 5+ use cases',
    check: u => u.useCaseCount >= 5
  },
  {
    key: 'pod_pioneer', name: 'Pod Pioneer', icon: '📌',
    desc: 'Be assigned to a pod',
    check: u => !!findUserPod(u.name)
  },
  {
    key: 'early_adopter', name: 'Early Adopter', icon: '🚀',
    desc: 'One of the first 30 members',
    check: (u, allUsers) => {
      if (!allUsers) return false;
      const sorted = [...allUsers].sort((a, b) => a.name.localeCompare(b.name));
      const idx = sorted.findIndex(x => x.name === u.name);
      return idx < 30;
    }
  },
  {
    key: 'hour_hero', name: 'Hour Hero', icon: '🦸',
    desc: 'Save 50+ total hours',
    check: u => u.totalHours >= 50
  },
  {
    key: 'recommender', name: 'Recommender', icon: '👍',
    desc: 'Recommend a use case to others',
    check: u => u.entries && u.entries.some(e => e.recommends === true)
  },
  {
    key: 'knowledge_pollinator', name: 'Knowledge Pollinator', icon: '🌻',
    desc: 'Share 3+ pro tips with the community',
    check: u => (u.tipCount || 0) >= 3
  }
];

function checkBadges(user, allUsers) {
  return BADGE_CATALOG.map(badge => ({
    ...badge,
    earned: badge.check(user, allUsers)
  }));
}

function renderBadges(user, allUsers) {
  const el = document.getElementById('badge-grid');
  if (!el) return;

  const badges = checkBadges(user, allUsers);
  const earnedCount = badges.filter(b => b.earned).length;

  // Update section title with count
  const countEl = document.getElementById('badge-count');
  if (countEl) countEl.textContent = `${earnedCount}/${badges.length}`;

  el.innerHTML = badges.map(b => `
    <div class="badge-card ${b.earned ? 'earned' : 'locked'}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>
  `).join('');

  // Detect newly earned badges since last visit
  const storageKey = `botany-badges-seen-${user.name}`;
  const seenBadges = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const earnedKeys = badges.filter(b => b.earned).map(b => b.key);
  const newBadges = badges.filter(b => b.earned && !seenBadges.includes(b.key));

  // Save current earned badges
  localStorage.setItem(storageKey, JSON.stringify(earnedKeys));

  // Show toasts for newly earned badges
  if (newBadges.length > 0) {
    newBadges.forEach((badge, i) => {
      setTimeout(() => showBadgeUnlockToast(badge), i * 1800);
    });
  }
}

function showBadgeUnlockToast(badge) {
  // Create confetti burst
  createConfetti();

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast-icon">${badge.icon}</div>
    <div class="badge-toast-content">
      <div class="badge-toast-title">Badge Unlocked!</div>
      <div class="badge-toast-name">${badge.name}</div>
      <div class="badge-toast-desc">${badge.desc}</div>
    </div>
  `;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));

  // Auto-dismiss after 4s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

function createConfetti() {
  const colors = ['#a100ff', '#7b2ff2', '#ff6b35', '#ffa500', '#4ade80', '#38bdf8', '#f472b6'];
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.cssText = `
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay:${Math.random() * 0.5}s;
      animation-duration:${1.5 + Math.random() * 1.5}s;
      width:${4 + Math.random() * 6}px;
      height:${4 + Math.random() * 6}px;
    `;
    container.appendChild(particle);
  }

  setTimeout(() => container.remove(), 3500);
}


// ============================================
// CHALLENGE SYSTEM
// ============================================
async function loadActiveChallenges() {
  if (!dbClient) return [];
  try {
    const { data, error } = await dbClient
      .from('competitions')
      .select('*')
      .eq('is_active', true)
      .order('end_date', { ascending: true });
    if (error) { console.warn('Challenge load error:', error); return []; }
    return data || [];
  } catch (e) { return []; }
}

async function loadChallengeParticipants(competitionId) {
  if (!dbClient) return [];
  try {
    const { data } = await dbClient
      .from('challenge_participants')
      .select('*')
      .eq('competition_id', competitionId);
    return data || [];
  } catch (e) { return []; }
}

async function joinChallenge(competitionId, userName) {
  if (!dbClient) return false;
  const { error } = await dbClient.from('challenge_participants').insert([{
    competition_id: competitionId, user_name: userName
  }]);
  if (error) { console.error('Join error:', error); return false; }
  return true;
}

async function renderChallenges(userName) {
  const el = document.getElementById('challenge-list');
  if (!el) return;

  const challenges = await loadActiveChallenges();

  if (challenges.length === 0) {
    el.innerHTML = '<div class="challenge-empty">No active challenges right now. Check back soon! 🌱</div>';
    return;
  }

  const cards = await Promise.all(challenges.map(async (c) => {
    const participants = await loadChallengeParticipants(c.id);
    const isJoined = participants.some(p => p.user_name.toLowerCase() === userName.toLowerCase());
    const endDate = c.end_date ? new Date(c.end_date) : null;
    const now = new Date();
    let timeLeft = '';
    if (endDate) {
      const diff = endDate - now;
      const days = Math.ceil(diff / 86400000);
      timeLeft = days > 0 ? `${days}d left` : 'Ended';
    }

    return `
      <div class="challenge-card" data-id="${c.id}">
        <div class="challenge-header">
          <div class="challenge-title">${c.title}</div>
          ${timeLeft ? `<span class="challenge-timer">${timeLeft}</span>` : ''}
        </div>
        <div class="challenge-desc">${c.description || ''}</div>
        <div class="challenge-stats">
          <span>${participants.length} participant${participants.length !== 1 ? 's' : ''}</span>
          <button class="challenge-join-btn ${isJoined ? 'joined' : ''}" data-challenge-id="${c.id}" ${isJoined ? 'disabled' : ''}>
            ${isJoined ? '✔ Joined' : 'Join Challenge'}
          </button>
        </div>
      </div>
    `;
  }));

  el.innerHTML = `<div class="challenge-list">${cards.join('')}</div>`;

  // Join button handlers
  el.querySelectorAll('.challenge-join-btn:not(.joined)').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Joining\u2026';
      const ok = await joinChallenge(btn.dataset.challengeId, userName);
      if (ok) {
        btn.classList.add('joined');
        btn.textContent = '✔ Joined';
      } else {
        btn.disabled = false;
        btn.textContent = 'Join Challenge';
      }
    });
  });
}

// ============================================
// MY TIPS (Dashboard)
// ============================================
const DASH_TIP_TYPE_CONFIG = {
  quick_tip:      { label: '💡 Quick Tip',      color: '#ffa500' },
  tool_spotlight:  { label: '🔧 Tool Spotlight',  color: '#38bdf8' },
  prompt:          { label: '💬 Prompt',          color: '#a100ff' },
  til:             { label: '🧪 TIL',             color: '#4ade80' }
};

async function loadUserTips(userName) {
  if (!dbClient) return [];
  try {
    const { data, error } = await dbClient
      .from('pro_tips')
      .select('*')
      .eq('author_name', userName)
      .order('created_at', { ascending: false });
    if (error) { console.warn('My tips load error:', error); return []; }
    return data || [];
  } catch (e) { return []; }
}

function renderMyTips(tips, userName) {
  const el = document.getElementById('my-tips-feed');
  if (!el) return;

  if (tips.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">
      <p>You haven't shared any tips yet.</p>
      <a href="index.html#tips" class="btn btn-primary btn-sm" style="margin-top:0.75rem;">Share Your First Tip</a>
    </div>`;
    return;
  }

  el.innerHTML = tips.map(tip => {
    const cfg = DASH_TIP_TYPE_CONFIG[tip.tip_type] || DASH_TIP_TYPE_CONFIG.quick_tip;
    const date = new Date(tip.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `
      <div class="my-tip-card">
        <div class="tip-header">
          <div class="tip-type-badge" style="--tip-color:${cfg.color}">${cfg.label}</div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="font-size:0.75rem;color:var(--text-muted);">▲ ${tip.upvotes || 0}</span>
            <span class="tip-date">${date}</span>
          </div>
        </div>
        <div class="tip-content" style="font-size:0.85rem;">${tip.content}</div>
      </div>
    `;
  }).join('');
}

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
    document.getElementById('dash-tier').textContent = `${GROWTH_LEVELS[0].icon} ${GROWTH_LEVELS[0].name}`;
    document.getElementById('dash-usecases').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No data yet \u2014 <a href="index.html#submit" style="color:var(--purple-light);">submit your first use case!</a></p>';
    renderPodCard(findUserPod(userName), userName);
    return;
  }

  // Load tip counts per user to include in XP
  let tipCounts = {};
  if (dbClient) {
    try {
      const { data: allTipsData } = await dbClient.from('pro_tips').select('author_name');
      if (allTipsData) {
        allTipsData.forEach(t => {
          const n = t.author_name;
          tipCounts[n] = (tipCounts[n] || 0) + 1;
        });
      }
    } catch (e) { /* ok */ }
  }
  const allUsers = processUsers(allData);
  // Inject tip counts into user objects
  allUsers.forEach(u => {
    u.tipCount = tipCounts[u.name] || 0;
    u.xp = calculateXP(u.totalHours, u.useCaseCount, u.tipCount);
    u.tier = getTier(u.totalHours, u.useCaseCount);
  });

  // Find the current user — use CASE-INSENSITIVE matching to handle variations
  let currentUser = allUsers.find(u => u.name === userName);
  if (!currentUser) {
    // Try case-insensitive
    currentUser = allUsers.find(u => u.name.toLowerCase().trim() === userName.toLowerCase().trim());
  }

  if (!currentUser) {
    // User exists in pods but not in Supabase data — show basic info with pod
    document.getElementById('dash-avatar').textContent = getInitials(userName);
    document.getElementById('dash-name').textContent = userName;
    const pod = findUserPod(userName);
    document.getElementById('dash-pod').textContent = pod ? `Pod #${pod.id} \u00b7 ${pod.name}` : '';
    document.getElementById('dash-tier').textContent = `${GROWTH_LEVELS[0].icon} ${GROWTH_LEVELS[0].name}`;
    document.getElementById('dash-usecases').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No data yet \u2014 <a href="index.html#submit" style="color:var(--purple-light);">submit your first use case!</a></p>';
    renderPodCard(pod, userName);
    renderComparison({ totalHours: 0, useCaseCount: 0, avgComfort: 0, toolCount: 0 }, allUsers);
    return;
  }

  renderDashboard(currentUser, allUsers, allData);
})();
