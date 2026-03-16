/**
 * BOTANY AI SHOWCASE - Main Application
 * =====================================
 * Parses CSV data and populates the showcase page with
 * leaderboard, gallery, and analytics components.
 */

// ============================================
// SVG ICON LIBRARY
// ============================================
const ICONS = {
  // Level icons (now using emoji from GROWTH_LEVELS, SVGs removed)

  // Tool icons
  egpt: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  copilot: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6"/><path d="M9 15h6"/><path d="M9 12h6"/></svg>',
  amethyst: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>',
  defaultTool: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',

  // Section icons
  trophy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  lightbulb: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',

  // Misc
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arrowRight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  shield: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  thumbsUp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
  target: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  wrench: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
};

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  // Tiers now come from GROWTH_LEVELS in pods-data.js
  // Access via: GROWTH_LEVELS array or getSharedLevel(hours, useCases),
  toolColors: {
    'Enterprise GPT': { class: 'egpt', icon: ICONS.egpt },
    'Copilot': { class: 'copilot', icon: ICONS.copilot },
    'Amethyst': { class: 'amethyst', icon: ICONS.amethyst },
    'Gemini': { class: 'egpt', icon: ICONS.egpt },
    'Nano Banana Pro': { class: 'egpt', icon: ICONS.egpt },
    'default': { class: 'egpt', icon: ICONS.defaultTool }
  }
};

// ============================================
// SUPABASE CONFIG
// ============================================
// ⚠️  PASTE YOUR SUPABASE PROJECT URL AND ANON KEY BELOW
const SUPABASE_URL = 'https://pfpgnuuaueqpitfyfhko.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGdudXVhdWVxcGl0ZnlmaGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDM0MDMsImV4cCI6MjA4Nzc3OTQwM30.wDSbj24oklscbYUaZvhIIm6E2lD6gZrZ5K0PA9FozLA';
let supabase = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ============================================
// DATA STORAGE
// ============================================
let allData = [];
let processedUsers = [];
let toolStats = {};

// Global profile navigation — used across pods, leaderboard, gallery
function viewProfile(name) {
  sessionStorage.setItem('botany-user', name);
  window.location.href = 'dashboard.html';
}
let barrierStats = {};

// ============================================
// POD DATA (extracted from CSVs)
// ============================================
const PHASE_3_PODS = [
  {
    id: 1, name: 'Project Management',
    description: 'Exploration of building internal cohesive system for managing project details (e.g., RAID log, meeting notes, Loop, MS planner, new MS Planner Agent, etc.)',
    leads: ['Luca Bianchi', 'Pedro Henrique'],
    members: ['Mia Fleming', 'Becca Toren', 'Adam Oliva']
  },
  {
    id: 2, name: 'AI Assistants',
    description: 'Explore current AI assistant tools and see how they can improve our lives from a personal/productive POV.',
    leads: ['Ibraheem Ahmad', 'Niko Levin'],
    members: ['Anthony Saber', 'Preeti Saldanha', 'Kiara Cruz']
  },
  {
    id: 3, name: 'AI is Reshaping Orgs',
    description: 'How AI is reshaping organizations; Exploring real effects on how companies are structured and how work gets done.',
    leads: ['Nicole Lehman', 'Connor Alexander'],
    members: ['Benjamin Casillas', 'Saara Kharal', 'Abigail Dubinski', 'Kate Sweeney']
  },
  {
    id: 4, name: 'Biz Case Development',
    description: 'Tooling that rapidly builds credible business cases using benchmarks, assumptions, and scenario modeling.',
    leads: ['Alfredo Ramirez', 'Mike Babowice'],
    members: ['Carleigh Bethea', 'Diego Stoffels-Lopez', 'Frank Vigoa', 'Meghan Lim']
  },
  {
    id: 5, name: 'PPT Upkeep & Storytelling',
    description: 'Exploration of using AI tooling to effectively craft PowerPoints or .htmls for effective storytelling with clients.',
    leads: ['Luke Boyer'],
    members: ['Connor Rivas', 'Dani Zeller', 'Destiny Ndupu']
  },
  {
    id: 6, name: 'Business Development',
    description: 'T&O related business development exploration.',
    leads: ['Katie Lux'],
    members: ['Catelyn Tankersley', 'Eva Larino', 'Ellie Smith', 'Reese Pulver']
  },
  {
    id: 7, name: 'Stock Uplift Analyst',
    description: 'Embedding AlphaSense insight, Enterprise GPT, or other tools into an integrated stock price uplift analysis for CPR.',
    leads: ['Malcolm MacEwan', 'Gabe Pascual'],
    members: ['Max Thielbahr', 'Mariano Brito', 'Sophia Pasquale']
  },
  {
    id: 8, name: 'Client-Facing Tools',
    description: 'Developing AI tools designed explicitly for broader deployment and training, not just internal experimentation.',
    leads: ['Bianca Rodriguez Pagano', 'Megan Bickel'],
    members: ['Connor Seale', 'Demetrius Smith', 'Colleen Cooke', 'Katie Shin']
  },
  {
    id: 9, name: 'Vibecoding #1',
    description: 'Deep dive into exploring the impact of low-code vibecoding tools to day-to-day Consulting work (Lovable.AI).',
    leads: ['Winston Blythe', 'Rishab'],
    members: ['Daniela Caisaguano', 'Ellis Kolber', 'Dylan Vohra']
  },
  {
    id: 10, name: 'Vibecoding #2',
    description: 'Deep dive into exploring the impact of low-code vibecoding tools to day-to-day Consulting work (Lovable.AI).',
    leads: ['Sam McGinty', 'Max Thielbahr'],
    members: ['Sam Lee', 'Kendall Likosar', 'Hargunn Sandhu', 'Ethan Herr']
  },
  {
    id: 11, name: 'Tactical Hiring / KT',
    description: 'A centralized or agentic assistant to help new joiners navigate information overload and ramp up faster.',
    leads: [], members: []
  },
  {
    id: 12, name: 'PA Support',
    description: 'AI support for performance achievement writing priorities, updating one-pagers, reflecting on progress, and maintaining accountability.',
    leads: [], members: []
  },
  {
    id: 13, name: 'Agent Catalog',
    description: 'Creating and maintaining a searchable inventory of available agents and their use cases across the firm.',
    leads: [], members: []
  },
  {
    id: 14, name: 'Process Design',
    description: 'Establishing foundational process standards and using AI to accelerate future-state process design.',
    leads: [], members: []
  },
  {
    id: 15, name: 'Enterprise Claude',
    description: 'Push the jagged frontier of Claude enterprise \u2014 to identify where we can use it in our work to change the world.',
    leads: ['Gavin Stewart', 'Bella Watchi'],
    members: []
  }
];

const PHASE_2_PODS = [
  {
    id: 1, name: 'Sales Cycle',
    description: 'RFP, BD, SOW Content Generation',
    leads: ['Ellis Kolber', 'Connor Seale'],
    members: ['Bianca Pagano', 'Katie Shin', 'Rishab Balakrishnan', 'Kevin Navarro Santos']
  },
  {
    id: 2, name: 'Best Practice Development',
    description: 'Best practice development, Knowledge Management, Information Retention',
    leads: ['Mike Babowice'],
    members: ['Natalia Basulado Moine', 'Anna English', 'Frank Vigoa', 'Annie Rosenman', 'Beth Canel']
  },
  {
    id: 3, name: 'Client Meeting Facilitation',
    description: 'Workshops, Co-Creation with AI',
    leads: ['Nicole Lehman', 'Connor Alexander'],
    members: ['Malcom MacEwan', 'Nicholas Laurencelle', 'Niko Levin', 'Suzanne Sokolowski']
  },
  {
    id: 4, name: 'Project Mobilization',
    description: 'Onboarding, Planning, Prioritization',
    leads: ['Davis DiGregorio', 'Alfredo Ramirez'],
    members: ['Christopher Arana', 'Mia Pinto', 'Shaam Kanji', 'Gabriel Pascual']
  },
  {
    id: 5, name: 'Deep Research',
    description: 'Market / Competitor Analysis, Market Research',
    leads: ['Winston Blythe', 'Maxwell Thielbahr'],
    members: ['Becca Toren', 'Connor Rivas', 'Reese Pulver', 'Leena Satpathy', 'Peyton Watson']
  },
  {
    id: 6, name: 'Credential Generation',
    description: 'Develop case study-style credential after project completion',
    leads: ['Katie Lux', 'Juliette Medina'],
    members: ['Anthony Saber', 'Daniela Caisaguano', 'Ellie Smith', 'Sohan Vittalam']
  },
  {
    id: 7, name: 'Data Synthesis & Insights',
    description: 'Quant / Qual Data Synthesis',
    leads: ['Grant Thomas', 'Ibraheem Ahmad'],
    members: ['Emily Hammerstein', 'Jay Seckman', 'Isabelle May', 'Meghan Lim']
  },
  {
    id: 'fw', name: 'Flies on the Wall',
    description: 'Observers and supporters of the Botany program',
    leads: [],
    members: ['Jamari Benologa', 'Rikako Kent', 'Katie DeGeyter', 'Annie Rosenman', 'Landon Barnhart', 'Ethan Beh', 'Jeena Cockburn', 'Ali Mahmoud', 'Jack Havemann', 'Carolyn Chen', 'Gavin Stewart', 'Olivia Battison', 'Shloak Dutta']
  },
  {
    id: 'pr', name: 'Propagators',
    description: 'Logistics, PMO, and organization support for Botany',
    leads: [],
    members: ['Catelyn Tankersly', 'Maxwell Thielbahr', 'Pedro Henrique', 'Luca Bianchi', 'Eva Larino', 'Bianca Rodriguez Pagano', 'Megan Bickel', 'Daniela Caisaguano', 'Beth Canel', 'Sophia Pasquale', 'Mike Babowice', 'Julietta Medina']
  }
];

// ============================================
// SUPABASE DATA LOADING
// ============================================
async function loadSupabaseData() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    const { data, error } = await supabase
      .from('use_case_submissions')
      .select('*')
      .eq('status', 'approved')
      .order('submitted_at', { ascending: true });

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }
    console.log(`Loaded ${data.length} use cases from Supabase`);
    return data || [];
  } catch (error) {
    console.error('Error loading data from Supabase:', error);
    return [];
  }
}

// ============================================
// DATA PROCESSING
// ============================================
function processData(data) {
  const userMap = new Map();

  data.forEach(row => {
    // Read from Supabase column names (snake_case)
    const name = row.name || '';
    const email = row.email || '';

    if (!name) return;

    const hours = parseFloat(row.hours_saved) || 0;
    const tools = parseTools(row.tools || '');
    const comfort = parseInt(row.comfort_level) || 3;
    const recommends = row.recommends === true;
    const barrier = row.barrier || 'Unknown';
    const useCase = row.use_case || '';
    const value = row.value_created || '';
    const challenges = row.challenges || '';
    const usedInClientWork = row.used_in_client_work === true;

    // Track tool usage
    tools.forEach(tool => {
      toolStats[tool] = (toolStats[tool] || 0) + 1;
    });

    // Track barriers
    if (barrier && barrier !== 'Unknown') {
      barrierStats[barrier] = (barrierStats[barrier] || 0) + 1;
    }

    // Aggregate by user
    if (userMap.has(name)) {
      const existing = userMap.get(name);
      existing.totalHours += hours;
      existing.useCases.push({ useCase, value, tools, hours, recommends, comfort, challenges });
      existing.useCaseCount++;
      existing.totalComfort += comfort;
      existing.recommendCount += recommends ? 1 : 0;
      tools.forEach(t => existing.allTools.add(t));
    } else {
      userMap.set(name, {
        name,
        email,
        totalHours: hours,
        useCases: [{ useCase, value, tools, hours, recommends, comfort, challenges }],
        useCaseCount: 1,
        totalComfort: comfort,
        recommendCount: recommends ? 1 : 0,
        allTools: new Set(tools),
        usedInClientWork
      });
    }
  });

  // Convert to array and calculate averages
  return Array.from(userMap.values()).map(user => {
    const xp = calculateXP(user.totalHours, user.useCaseCount);
    const level = getLevelFromXP(xp);
    return {
      ...user,
      avgComfort: (user.totalComfort / user.useCaseCount).toFixed(1),
      allTools: Array.from(user.allTools),
      xp,
      level,
      // Backward compat: tier object with class/name/icon for existing render code
      tier: { key: level.key, name: level.name, class: level.cssClass, icon: level.icon }
    };
  });
}

function parseHours(value) {
  if (!value) return 0;

  const lower = value.toLowerCase();

  // Skip if it's clearly not a numeric answer (long text / narrative)
  if (lower.length > 60 && !lower.match(/^\d/)) return 0;
  if (lower === 'n/a' || lower === 'na' || lower === 'none') return 0;

  // Detect if the value mentions minutes
  const isMinutes = lower.includes('min');

  // Handle explicit ranges at start: "10-15", "5 - 10", "30-45 mins"
  const rangeMatch = value.match(/^\s*(\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)/);
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

function parseTools(value) {
  if (!value) return [];

  return value
    .split(';')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map(t => {
      // Normalize tool names
      if (t.toLowerCase().includes('enterprise') || t.toLowerCase().includes('egpt')) return 'Enterprise GPT';
      if (t.toLowerCase().includes('copilot')) return 'Copilot';
      if (t.toLowerCase().includes('amethyst')) return 'Amethyst';
      if (t.toLowerCase().includes('gemini') || t.toLowerCase().includes('banana')) return 'Nano Banana Pro';
      return t;
    });
}

function getTier(hours, useCases) {
  const xp = calculateXP(hours, useCases);
  const level = getLevelFromXP(xp);
  return { key: level.key, name: level.name, class: level.cssClass, icon: level.icon, min: level.xpThreshold };
}

// ============================================
// UI RENDERING
// ============================================
function renderStats(users, data) {
  const totalHours = Math.round(users.reduce((sum, u) => sum + u.totalHours, 0));
  const totalUseCases = data.length;
  const totalInnovators = users.length;
  const totalTools = Object.keys(toolStats).length;

  animateCounter('hours-counter', totalHours);
  animateCounter('usecases-counter', totalUseCases);
  animateCounter('innovators-counter', totalInnovators);
  animateCounter('tools-counter', totalTools);
}

function animateCounter(elementId, target) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.dataset.target = target;

  // Use IntersectionObserver to trigger count-up when stats become visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(element, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(element);
}

function countUp(element, target) {
  const duration = 1600;
  const startTime = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const current = Math.round(easedProgress * target);
    element.textContent = current + (target > 50 ? '+' : '');
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function renderPodium(users) {
  const podiumEl = document.getElementById('podium');
  if (!podiumEl) return;

  const top3 = users.slice(0, 3);
  const rankLabels = ['1st', '2nd', '3rd'];

  podiumEl.innerHTML = top3.map((user, idx) => {
    const position = idx === 0 ? 'first' : idx === 1 ? 'second' : 'third';
    const initials = getInitials(user.name);

    return `
      <div class="podium-place ${position}" data-profile="${user.name}" style="cursor:pointer" title="View ${user.name}'s profile">
        <div class="podium-rank-label">${rankLabels[idx]}</div>
        <div class="podium-avatar">${initials}</div>
        <div class="podium-name profile-link">${user.name}</div>
        <div class="podium-hours">${Math.round(user.totalHours)} hours saved</div>
        <span class="tier-badge ${user.tier.class}"><span class="tier-icon">${user.tier.icon}</span> ${user.tier.name}</span><span class="xp-label">${user.xp || 0} XP</span>
        <div class="podium-stand"><span class="podium-stand-rank">${idx + 1}</span></div>
      </div>
    `;
  }).join('');
}

function renderLeaderboard(users, startRank = 4) {
  const listEl = document.getElementById('leaderboard-list');
  if (!listEl) return;

  const remaining = users.slice(3);

  listEl.innerHTML = remaining.map((user, idx) => {
    const rank = startRank + idx;
    const initials = getInitials(user.name);
    const mainUseCase = user.useCases[0]?.useCase || 'AI Explorer';
    const truncatedUseCase = mainUseCase.length > 50 ? mainUseCase.substring(0, 50) + '...' : mainUseCase;

    return `
      <div class="leaderboard-card" data-user="${user.name}" data-profile="${user.name}" style="cursor:pointer" title="View ${user.name}'s profile">
        <div class="rank">#${rank}</div>
        <div class="user-info">
          <div class="user-avatar">${initials}</div>
          <div class="user-details">
            <div class="user-name profile-link">${user.name}</div>
            <div class="user-usecase">${truncatedUseCase}</div>
          </div>
        </div>
        <div class="user-stats">
          <div class="hours-saved">
            <div class="hours-value">${Math.round(user.totalHours)}</div>
            <div class="hours-label">Hours Saved</div>
          </div>
        </div>
        <span class="tier-badge ${user.tier.class}"><span class="tier-icon">${user.tier.icon}</span> ${user.tier.name}</span>
      </div>
    `;
  }).join('');
}

function renderGallery(data) {
  const gridEl = document.getElementById('gallery-grid');
  if (!gridEl) return;

  // Get unique tools for filters
  const uniqueTools = [...new Set(data.flatMap(row => parseTools(row.tools || '')))];
  renderToolFilters(uniqueTools);

  gridEl.innerHTML = data.map((row, index) => {
    const tools = parseTools(row.tools || '');
    const mainTool = tools[0] || 'AI Tool';
    const toolConfig = CONFIG.toolColors[mainTool] || CONFIG.toolColors.default;
    const recommends = row.recommends === true;
    const comfort = parseInt(row.comfort_level) || 3;
    const hours = parseFloat(row.hours_saved) || 0;
    const useCase = row.use_case || 'AI Innovation';
    const name = row.name || 'Anonymous';
    const value = row.value_created || '';
    const comfortPercent = (comfort / 5) * 100;

    return `
      <div class="usecase-card" data-tools="${tools.join(',')}" data-index="${index}" role="button" tabindex="0" aria-label="View details for: ${truncateText(useCase, 40)}">
        <div class="usecase-header">
          <span class="tool-badge ${toolConfig.class}"><span class="tool-icon">${toolConfig.icon}</span> ${mainTool}</span>
          ${recommends ? `<span class="recommend-badge">${ICONS.check} Recommended</span>` : ''}
        </div>
        <h3 class="usecase-title">${truncateText(useCase, 80)}</h3>
        <p class="usecase-author">by <span class="profile-link" data-profile="${name}" title="View ${name}'s profile">${name}</span></p>
        <p class="usecase-description">${truncateText(value, 150)}</p>
        <div class="usecase-footer">
          <div class="usecase-stats">
            <div class="usecase-stat">
              <div class="usecase-stat-value">${hours}</div>
              <div class="usecase-stat-label">Hours</div>
            </div>
          </div>
          <div class="comfort-bar-container">
            <div class="comfort-bar-track">
              <div class="comfort-bar-fill" style="width: ${comfortPercent}%"></div>
            </div>
            <span class="comfort-bar-label">${comfort}/5</span>
          </div>
        </div>
        <div class="card-read-more">View Details ${ICONS.arrowRight}</div>
      </div>
    `;
  }).join('');

  // Add click listeners for modal
  gridEl.querySelectorAll('.usecase-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index);
      openUseCaseModal(data[index]);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(card.dataset.index);
        openUseCaseModal(data[index]);
      }
    });
  });
}

function renderToolFilters(tools) {
  const filtersEl = document.getElementById('tool-filters');
  if (!filtersEl) return;

  const toolButtons = tools.map(tool => {
    const config = CONFIG.toolColors[tool] || CONFIG.toolColors.default;
    return `<button class="filter-tab" data-tool="${tool}">${tool}</button>`;
  }).join('');

  filtersEl.innerHTML = `
    <button class="filter-tab active" data-tool="all">All Tools</button>
    ${toolButtons}
  `;

  // Add filter event listeners
  filtersEl.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filtersEl.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterGallery(e.target.dataset.tool);
    });
  });
}

function filterGallery(tool) {
  const cards = document.querySelectorAll('.usecase-card');
  cards.forEach(card => {
    const cardTools = card.dataset.tools.split(',');
    if (tool === 'all' || cardTools.includes(tool)) {
      card.style.display = 'flex';
      card.style.animation = 'fadeInUp 0.5s ease-out forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

function renderAnalytics(data) {
  // Tool usage chart
  renderBarChart('tool-chart', toolStats, 'Tool');

  // Barrier chart
  renderBarChart('barrier-chart', barrierStats, 'Barrier');

  // Recommendation rate
  const totalRecommends = data.filter(row => row.recommends === true).length;
  const recommendRate = Math.round((totalRecommends / data.length) * 100);
  document.getElementById('recommend-rate').textContent = recommendRate + '%';

  // Average comfort
  const comfortLevels = data
    .map(row => parseInt(row.comfort_level) || 0)
    .filter(c => c > 0);
  const avgComfort = (comfortLevels.reduce((a, b) => a + b, 0) / comfortLevels.length).toFixed(1);
  document.getElementById('avg-comfort').textContent = avgComfort;
}

function renderBarChart(containerId, stats, label) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const maxValue = Math.max(...Object.values(stats));
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const unit = label === 'Tool' ? 'use cases' : 'reports';

  container.innerHTML = sorted.map(([name, count]) => {
    const percentage = (count / maxValue) * 100;
    return `
      <div class="bar-item">
        <span class="bar-label">${truncateText(name, 30)}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${percentage}%">${count}</div>
        </div>
        <span class="bar-unit">${unit}</span>
      </div>
    `;
  }).join('');
}

// ============================================
// USE CASE MODAL
// ============================================
function openUseCaseModal(row) {
  const modal = document.getElementById('usecase-modal');
  if (!modal) return;

  const tools = parseTools(row.tools || '');
  const mainTool = tools[0] || 'AI Tool';
  const toolConfig = CONFIG.toolColors[mainTool] || CONFIG.toolColors.default;
  const recommends = row.recommends === true;
  const comfort = parseInt(row.comfort_level) || 3;
  const hours = parseFloat(row.hours_saved) || 0;
  const useCase = row.use_case || 'AI Innovation';
  const name = row.name || 'Anonymous';
  const value = row.value_created || 'Not specified';
  const challenges = row.challenges || 'None reported';
  const comfortPercent = (comfort / 5) * 100;

  const toolBadges = tools.map(t => {
    const cfg = CONFIG.toolColors[t] || CONFIG.toolColors.default;
    return `<span class="tool-badge ${cfg.class}"><span class="tool-icon">${cfg.icon}</span> ${t}</span>`;
  }).join('');

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">${ICONS.close}</button>
      <div class="modal-header">
        <div class="modal-tools">${toolBadges}</div>
        ${recommends ? `<span class="recommend-badge modal-recommend">${ICONS.check} Recommended</span>` : ''}
      </div>
      <h2 class="modal-title">${useCase}</h2>
      <p class="modal-author">by <span class="profile-link" data-profile="${name}" style="cursor:pointer;text-decoration:underline;text-decoration-color:rgba(161,0,255,0.4)" title="View ${name}'s profile">${name}</span></p>

      <div class="modal-stats-row">
        <div class="modal-stat">
          <span class="modal-stat-value">${hours}</span>
          <span class="modal-stat-label">Hours Saved</span>
        </div>
        <div class="modal-stat">
          <div class="comfort-bar-container modal-comfort">
            <div class="comfort-bar-track">
              <div class="comfort-bar-fill" style="width: ${comfortPercent}%"></div>
            </div>
            <span class="comfort-bar-label">${comfort}/5 Comfort</span>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h3>Value Created</h3>
        <p>${value}</p>
      </div>

      <div class="modal-section">
        <h3>Challenges Encountered</h3>
        <p>${challenges}</p>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Close handlers
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscClose);
}

function closeModal() {
  const modal = document.getElementById('usecase-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscClose);
  }
}

function handleEscClose(e) {
  if (e.key === 'Escape') closeModal();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// ============================================
// LEADERBOARD SORTING
// ============================================
function setupLeaderboardSorting() {
  const filterTabs = document.querySelectorAll('.leaderboard-section .filter-tabs .filter-tab');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');

      const sortBy = e.target.dataset.sort;
      sortLeaderboard(sortBy);
    });
  });
}

function sortLeaderboard(sortBy) {
  let sorted;

  switch (sortBy) {
    case 'hours':
      sorted = [...processedUsers].sort((a, b) => b.totalHours - a.totalHours);
      break;
    case 'usecases':
      sorted = [...processedUsers].sort((a, b) => b.useCaseCount - a.useCaseCount);
      break;
    case 'comfort':
      sorted = [...processedUsers].sort((a, b) => parseFloat(b.avgComfort) - parseFloat(a.avgComfort));
      break;
    default:
      sorted = processedUsers;
  }

  renderPodium(sorted);
  renderLeaderboard(sorted);
}

// ============================================
// SCROLL ANIMATIONS (Premium Reveal System)
// ============================================
function setupScrollAnimations() {
  // Reveal observer — adds 'revealed' class with staggered children
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          setTimeout(() => child.classList.add('revealed'), i * 100);
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('section > .container, .section-header, .about-header, .about-pillars, .pods-grid, .podium, .leaderboard-list, .analytics-grid, .gallery-grid, .intake-form, .usecase-form').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.pillar-card, .pod-card, .analytics-card, .usecase-card, .leaderboard-card, .stat-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 0.08, 0.5)}s`;
    revealObserver.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Nav link active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => navObserver.observe(s));
  }

  // ---- CARD SPOTLIGHT (mouse-follow glow) ----
  setupCardSpotlight();

  // ---- BAR CHART animate-in on scroll ----
  setupBarChartAnimation();
}

// ============================================
// CARD SPOTLIGHT (Linear-style mouse glow)
// ============================================
function setupCardSpotlight() {
  // Each card type has its own ::after pseudo-element for the spotlight
  // We just need to set the CSS custom properties on mousemove
  document.querySelectorAll('.pillar-card, .pod-card, .analytics-card, .usecase-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// ============================================
// BAR CHART SCROLL ANIMATION
// ============================================
function setupBarChartAnimation() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach(fill => {
          const targetWidth = fill.style.width;
          fill.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              fill.style.width = targetWidth;
            });
          });
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.bar-chart').forEach(chart => barObserver.observe(chart));
}

// ============================================
// POD RENDERING (LIVE — Supabase-powered)
// ============================================

// Cache for Supabase team data and posts
let supabaseTeams = [];
let supabasePosts = {};  // keyed by team_id
let supabaseMembers = {}; // keyed by team_id -> [{member_name, member_role}]
let podsDataLoaded = false;
let currentExpandedPod = null;

// Load teams, members, and posts from Supabase
async function loadLivePodData() {
  if (!supabase || podsDataLoaded) return;
  try {
    // Load teams
    const { data: teams, error: tErr } = await supabase
      .from('teams').select('*').order('phase', { ascending: false }).order('name');
    if (tErr) throw tErr;
    supabaseTeams = teams || [];

    // Load all team members
    const { data: members, error: mErr } = await supabase
      .from('team_members').select('*');
    if (mErr) throw mErr;
    (members || []).forEach(m => {
      if (!supabaseMembers[m.team_id]) supabaseMembers[m.team_id] = [];
      supabaseMembers[m.team_id].push(m);
    });

    // Load all pod posts
    const { data: posts, error: pErr } = await supabase
      .from('pod_posts').select('*').order('created_at', { ascending: false });
    if (pErr) throw pErr;
    (posts || []).forEach(p => {
      if (!supabasePosts[p.team_id]) supabasePosts[p.team_id] = [];
      supabasePosts[p.team_id].push(p);
    });

    podsDataLoaded = true;
    console.log(`Loaded ${supabaseTeams.length} teams, ${members?.length || 0} members, ${posts?.length || 0} posts from Supabase`);
  } catch (err) {
    console.warn('Could not load live pod data from Supabase:', err);
  }
}

// Check logged-in user's role for a specific pod (by team_id or pod object)
// Global admins can edit/post to ALL pods
const POD_GLOBAL_ADMINS = ['katie lux', 'winston blythe'];

function getUserPodRole(pod) {
  const currentUser = sessionStorage.getItem('botany-user');
  if (!currentUser) return null;
  const lower = currentUser.toLowerCase().trim();

  // Global admins get lead access everywhere
  if (POD_GLOBAL_ADMINS.includes(lower)) return 'lead';

  // Check hardcoded pod data first (works w/o Supabase)
  if (pod.leads && pod.leads.some(n => n.toLowerCase().trim() === lower)) return 'lead';
  if (pod.members && pod.members.some(n => n.toLowerCase().trim() === lower)) return 'member';

  // Also check Supabase team_members if available
  if (pod._teamId && supabaseMembers[pod._teamId]) {
    const match = supabaseMembers[pod._teamId].find(m => 
      m.member_name && m.member_name.toLowerCase().trim() === lower
    );
    if (match) return match.member_role || 'member';
  }
  return null;
}

// Map hardcoded pod to Supabase team ID
function getTeamIdForPod(pod) {
  if (pod._teamId) return pod._teamId;
  const match = supabaseTeams.find(t => 
    t.name === pod.name && t.phase === (pod._phase || 3)
  );
  return match ? match.id : null;
}

// Get posts for a pod
function getPostsForPod(teamId) {
  return supabasePosts[teamId] || [];
}

// Render time-ago string
function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderPods(phase) {
  const grid = document.getElementById('pods-grid');
  if (!grid) return;

  const pods = phase === 3 ? PHASE_3_PODS : PHASE_2_PODS;
  const currentUser = sessionStorage.getItem('botany-user');

  grid.innerHTML = pods.map((pod, idx) => {
    // Attach phase and look up team ID
    pod._phase = phase;
    pod._teamId = getTeamIdForPod(pod);
    const teamId = pod._teamId;
    const role = getUserPodRole(pod);
    const posts = teamId ? getPostsForPod(teamId) : [];
    const postCount = posts.length;

    const leadAvatars = pod.leads.map(name => {
      const initials = getInitials(name);
      return `<div class="pod-lead profile-link" data-profile="${name}" title="View ${name}'s profile" style="cursor:pointer"><div class="pod-lead-avatar">${initials}</div><span>${name}</span></div>`;
    }).join('');

    const memberChips = pod.members.map(name =>
      `<span class="pod-member-chip profile-link" data-profile="${name}" title="View ${name}'s profile" style="cursor:pointer">${name}</span>`
    ).join('');

    const podLabel = typeof pod.id === 'number' ? `Pod #${pod.id}` : (pod.id === 'fw' ? '\ud83d\udc41\ufe0f' : '\ud83c\udf31');
    const hasMembers = pod.leads.length > 0 || pod.members.length > 0;
    const emptyState = !hasMembers ? '<p class="pod-empty">Open for sign-ups!</p>' : '';

    // Build action buttons
    let actionsHtml = '';
    if (currentUser && role) {
      actionsHtml += `<div class="pod-actions">`;
      actionsHtml += `
        <button class="pod-action-btn pod-share-btn" data-team-id="${teamId}" data-pod-name="${pod.name}" title="Share a link with your pod">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>Share a Link</span>
        </button>`;
      if (role === 'lead') {
        actionsHtml += `
          <button class="pod-action-btn pod-edit-btn" data-team-id="${teamId}" data-pod-name="${pod.name}" data-pod-desc="${pod.description.replace(/"/g, '&quot;')}" title="Edit pod information">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            <span>Edit Pod</span>
          </button>`;
      }
      actionsHtml += `</div>`;
    }

    // Build activity feed (recent posts)
    let feedHtml = '';
    if (posts.length > 0) {
      const topPosts = posts.slice(0, 3); // show last 3
      feedHtml = `
        <div class="pod-feed">
          <div class="pod-feed-header">
            <span class="pod-section-label">Recent Activity</span>
            <span class="pod-post-count">${postCount} post${postCount !== 1 ? 's' : ''}</span>
          </div>
          ${topPosts.map(p => `
            <div class="pod-post-item">
              <div class="pod-post-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div class="pod-post-body">
                <div class="pod-post-title">${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>` : p.title}</div>
                <div class="pod-post-meta">
                  <span>${p.author_name}</span>
                  <span class="pod-post-dot">·</span>
                  <span>${timeAgo(p.created_at)}</span>
                </div>
                ${p.description ? `<div class="pod-post-desc">${p.description}</div>` : ''}
              </div>
            </div>
          `).join('')}
          ${postCount > 3 ? `<button class="pod-view-all-btn" data-team-id="${teamId}" data-pod-name="${pod.name}">View all ${postCount} posts</button>` : ''}
        </div>`;
    }

    // Live indicator
    const liveIndicator = postCount > 0
      ? `<span class="pod-live-badge"><span class="pod-live-dot"></span>${postCount}</span>`
      : '';

    return `
      <div class="pod-card ${role ? 'pod-card-member' : ''}" style="animation-delay: ${idx * 0.05}s" data-team-id="${teamId}">
        <div class="pod-card-header">
          <span class="pod-number">${podLabel}${liveIndicator}</span>
          <h3 class="pod-name">${pod.name}</h3>
        </div>
        <p class="pod-description">${pod.description}</p>
        ${pod.leads.length > 0 ? `<div class="pod-leads-section"><span class="pod-section-label">Leads</span><div class="pod-leads-row">${leadAvatars}</div></div>` : ''}
        ${pod.members.length > 0 ? `<div class="pod-members-section"><span class="pod-section-label">Members</span><div class="pod-members-row">${memberChips}</div></div>` : ''}
        ${emptyState}
        ${feedHtml}
        ${actionsHtml}
      </div>
    `;
  }).join('');

  // Attach event listeners for pod actions
  setupPodActionListeners();
}

function setupPodActionListeners() {
  // Share a Link buttons
  document.querySelectorAll('.pod-share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPodPostModal(btn.dataset.teamId, btn.dataset.podName);
    });
  });

  // Edit Pod buttons
  document.querySelectorAll('.pod-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPodEditModal(btn.dataset.teamId, btn.dataset.podName, btn.dataset.podDesc);
    });
  });

  // View All posts buttons
  document.querySelectorAll('.pod-view-all-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAllPostsModal(btn.dataset.teamId, btn.dataset.podName);
    });
  });
}

// ---- Pod Post Modal (Share a Link) ----
function openPodPostModal(teamId, podName) {
  const modal = document.getElementById('pod-post-modal');
  if (!modal) return;
  const currentUser = sessionStorage.getItem('botany-user') || '';

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">${ICONS.close}</button>
      <h2 class="modal-title">Share a Link</h2>
      <p class="modal-author">Post a resource or link to <strong>${podName}</strong></p>
      <form id="pod-post-form" class="pod-idea-form">
        <div class="form-grid">
          <div class="form-group form-full">
            <label for="post-title">Title <span class="required">*</span></label>
            <input type="text" id="post-title" required placeholder="e.g. Great article on AI project management">
          </div>
          <div class="form-group form-full">
            <label for="post-url">URL</label>
            <input type="url" id="post-url" placeholder="https://...">
          </div>
          <div class="form-group form-full">
            <label for="post-description">Description</label>
            <textarea id="post-description" rows="3" placeholder="Why is this useful for the pod?"></textarea>
          </div>
          <div class="form-group form-full">
            <label>Posting as</label>
            <div class="post-author-display">
              <div class="pod-lead-avatar" style="width:28px;height:28px;font-size:0.65rem">${getInitials(currentUser)}</div>
              <span>${currentUser}</span>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-submit">
            ${ICONS.send}
            <span>Post to Pod</span>
          </button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  modal.querySelector('.modal-backdrop').addEventListener('click', () => closePodPostModal());
  modal.querySelector('.modal-close').addEventListener('click', () => closePodPostModal());

  modal.querySelector('#pod-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value.trim();
    const url = document.getElementById('post-url').value.trim();
    const description = document.getElementById('post-description').value.trim();
    if (!title) return;

    const payload = {
      team_id: teamId,
      author_name: currentUser,
      title,
      url: url || null,
      description: description || ''
    };

    try {
      if (supabase) {
        const { error } = await supabase.from('pod_posts').insert([payload]);
        if (error) throw error;
        // Log activity for streak tracking
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const weekNum = Math.ceil((now - start) / 604800000);
        await supabase.from('activity_log').insert([{
          user_name: currentUser,
          action_type: 'pod_post',
          description: title.slice(0, 200),
          week_number: weekNum,
          year: now.getFullYear()
        }]);
      }

      // Add to local cache
      if (!supabasePosts[teamId]) supabasePosts[teamId] = [];
      supabasePosts[teamId].unshift({ ...payload, created_at: new Date().toISOString() });

      // Show success
      modal.querySelector('.modal-content').innerHTML = `
        <div class="form-success" style="display:flex">
          <div class="success-icon">${ICONS.check}</div>
          <h3>Link Shared!</h3>
          <p>Your post has been added to ${podName}.</p>
        </div>
      `;

      // Re-render pods and close
      setTimeout(() => {
        closePodPostModal();
        const activePhaseTab = document.querySelector('#pod-phase-tabs .filter-tab.active');
        const phase = activePhaseTab ? parseInt(activePhaseTab.dataset.phase) : 3;
        renderPods(phase);
        setupScrollAnimations();
      }, 1500);
    } catch (err) {
      console.error('Post submission error:', err);
      alert('Error sharing link. Please try again.');
    }
  });
}

function closePodPostModal() {
  const modal = document.getElementById('pod-post-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

// ---- Pod Edit Modal (Lead Only) ----
function openPodEditModal(teamId, podName, podDesc) {
  const modal = document.getElementById('pod-edit-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">${ICONS.close}</button>
      <h2 class="modal-title">Edit Pod</h2>
      <p class="modal-author">Update information for <strong>${podName}</strong></p>
      <form id="pod-edit-form" class="pod-idea-form">
        <div class="form-grid">
          <div class="form-group form-full">
            <label for="edit-pod-name">Pod Name <span class="required">*</span></label>
            <input type="text" id="edit-pod-name" required value="${podName}">
          </div>
          <div class="form-group form-full">
            <label for="edit-pod-desc">Description <span class="required">*</span></label>
            <textarea id="edit-pod-desc" rows="4" required>${podDesc}</textarea>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-submit">
            ${ICONS.check}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  modal.querySelector('.modal-backdrop').addEventListener('click', () => closePodEditModal());
  modal.querySelector('.modal-close').addEventListener('click', () => closePodEditModal());

  modal.querySelector('#pod-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = document.getElementById('edit-pod-name').value.trim();
    const newDesc = document.getElementById('edit-pod-desc').value.trim();
    if (!newName || !newDesc) return;

    try {
      if (supabase) {
        const { error } = await supabase
          .from('teams')
          .update({ name: newName, description: newDesc })
          .eq('id', teamId);
        if (error) throw error;
      }

      // Update local hardcoded data too
      const allPods = [...PHASE_3_PODS, ...PHASE_2_PODS];
      const localPod = allPods.find(p => p._teamId === teamId);
      if (localPod) {
        localPod.name = newName;
        localPod.description = newDesc;
      }

      // Update Supabase cache
      const cachedTeam = supabaseTeams.find(t => t.id === teamId);
      if (cachedTeam) {
        cachedTeam.name = newName;
        cachedTeam.description = newDesc;
      }

      // Show success
      modal.querySelector('.modal-content').innerHTML = `
        <div class="form-success" style="display:flex">
          <div class="success-icon">${ICONS.check}</div>
          <h3>Pod Updated!</h3>
          <p>${newName} has been updated successfully.</p>
        </div>
      `;

      setTimeout(() => {
        closePodEditModal();
        const activePhaseTab = document.querySelector('#pod-phase-tabs .filter-tab.active');
        const phase = activePhaseTab ? parseInt(activePhaseTab.dataset.phase) : 3;
        renderPods(phase);
        setupScrollAnimations();
      }, 1500);
    } catch (err) {
      console.error('Pod edit error:', err);
      alert('Error updating pod. Please try again.');
    }
  });
}

function closePodEditModal() {
  const modal = document.getElementById('pod-edit-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

// ---- View All Posts Modal ----
function openAllPostsModal(teamId, podName) {
  const modal = document.getElementById('pod-post-modal');
  if (!modal) return;
  const posts = getPostsForPod(teamId);

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content" style="max-width:720px">
      <button class="modal-close" aria-label="Close">${ICONS.close}</button>
      <h2 class="modal-title">${podName} — Activity</h2>
      <p class="modal-author">${posts.length} post${posts.length !== 1 ? 's' : ''} shared by pod members</p>
      <div class="pod-all-posts">
        ${posts.map(p => `
          <div class="pod-post-item pod-post-item-full">
            <div class="pod-post-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <div class="pod-post-body">
              <div class="pod-post-title">${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>` : p.title}</div>
              <div class="pod-post-meta">
                <span>${p.author_name}</span>
                <span class="pod-post-dot">·</span>
                <span>${timeAgo(p.created_at)}</span>
              </div>
              ${p.description ? `<div class="pod-post-desc">${p.description}</div>` : ''}
            </div>
          </div>
        `).join('')}
        ${posts.length === 0 ? '<p style="color:var(--text-muted);text-align:center;padding:2rem">No posts yet. Be the first to share!</p>' : ''}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-backdrop').addEventListener('click', () => closePodPostModal());
  modal.querySelector('.modal-close').addEventListener('click', () => closePodPostModal());
}

function setupPodPhaseToggle() {
  const tabs = document.querySelectorAll('#pod-phase-tabs .filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderPods(parseInt(e.target.dataset.phase));
    });
  });
}

// ============================================
// POD IDEA MODAL
// ============================================
function setupPodIdeaModal() {
  const btn = document.getElementById('suggest-idea-btn');
  const modal = document.getElementById('pod-idea-modal');
  if (!btn || !modal) return;

  btn.addEventListener('click', () => {
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close">${ICONS.close}</button>
        <h2 class="modal-title">Suggest a Pod Idea</h2>
        <p class="modal-author">Have a problem that a pod could tackle with AI? Let us know!</p>
        <form id="pod-idea-form" class="pod-idea-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="idea-name">Your Name <span class="required">*</span></label>
              <input type="text" id="idea-name" required placeholder="e.g. Jane Smith">
            </div>
            <div class="form-group">
              <label for="idea-email">Email <span class="required">*</span></label>
              <input type="email" id="idea-email" required placeholder="jane.smith@accenture.com">
            </div>
            <div class="form-group form-full">
              <label for="idea-title">Idea Title <span class="required">*</span></label>
              <input type="text" id="idea-title" required placeholder="e.g. AI-Powered Client Onboarding">
            </div>
            <div class="form-group form-full">
              <label for="idea-desc">Description</label>
              <textarea id="idea-desc" rows="4" placeholder="Describe the problem and how AI could help..."></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-submit">Submit Idea</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.querySelector('.modal-backdrop').addEventListener('click', () => closePodIdeaModal());
    modal.querySelector('.modal-close').addEventListener('click', () => closePodIdeaModal());

    modal.querySelector('#pod-idea-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const ideaName = document.getElementById('idea-name').value.trim();
      const ideaEmail = document.getElementById('idea-email').value.trim();
      const ideaTitle = document.getElementById('idea-title').value.trim();
      const ideaDesc = document.getElementById('idea-desc').value.trim();

      if (!ideaName || !ideaEmail || !ideaTitle) return;

      // Build payload that matches the pod_ideas table schema: { idea }
      const ideaText = `[${ideaName} / ${ideaEmail}] ${ideaTitle}${ideaDesc ? ': ' + ideaDesc : ''}`;
      const payload = { idea: ideaText };

      try {
        if (supabase) {
          const { error } = await supabase.from('pod_ideas').insert([payload]);
          if (error) {
            console.error('Pod idea insert error:', error);
            throw error;
          }
          // Log activity for streak tracking
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 1);
          const weekNum = Math.ceil((now - start) / 604800000);
          await supabase.from('activity_log').insert([{
            user_name: ideaName,
            action_type: 'pod_idea',
            description: ideaTitle.slice(0, 200),
            week_number: weekNum,
            year: now.getFullYear()
          }]);
        } else {
          console.log('Pod idea submitted (no Supabase):', payload);
          await new Promise(r => setTimeout(r, 500));
        }

        modal.querySelector('.modal-content').innerHTML = `
          <div class="form-success" style="display:flex">
            <div class="success-icon">${ICONS.check}</div>
            <h3>Idea Submitted!</h3>
            <p>Thanks for contributing. We'll review your suggestion!</p>
          </div>
        `;
        setTimeout(() => closePodIdeaModal(), 2500);
      } catch (err) {
        console.error('Idea submission error:', err);
        alert('Error submitting idea. Please try again.');
      }
    });
  });
}

function closePodIdeaModal() {
  const modal = document.getElementById('pod-idea-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// INTAKE FORM (Multi-Step Wizard)
// ============================================
function setupIntakeForm() {
  const form = document.getElementById('intake-form');
  if (!form) return;

  let currentStep = 1;

  // Comfort rating dots
  const comfortDots = document.querySelectorAll('.comfort-dot');
  const comfortInput = document.getElementById('intake-comfort');
  comfortDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const val = dot.dataset.value;
      comfortInput.value = val;
      comfortDots.forEach(d => {
        d.classList.toggle('active', parseInt(d.dataset.value) <= parseInt(val));
      });
    });
  });

  // Step navigation
  function goToStep(step) {
    const steps = form.querySelectorAll('.intake-step');
    const dots = document.querySelectorAll('.step-dot');
    const lines = document.querySelectorAll('.step-line');

    steps.forEach(s => s.classList.remove('active'));
    const target = form.querySelector(`.intake-step[data-step="${step}"]`);
    if (target) target.classList.add('active');

    dots.forEach(d => {
      const dStep = parseInt(d.dataset.step);
      d.classList.toggle('active', dStep <= step);
      d.classList.toggle('completed', dStep < step);
    });

    lines.forEach((line, idx) => {
      line.classList.toggle('active', idx < step - 1);
    });

    currentStep = step;
    // Scroll the join section into view
    document.getElementById('join').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Next buttons
  form.querySelectorAll('.step-next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next);
      goToStep(nextStep);
    });
  });

  // Prev buttons
  form.querySelectorAll('.step-prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.dataset.prev);
      goToStep(prevStep);
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('intake-name').value.trim(),
      email: document.getElementById('intake-email').value.trim(),
      office_location: document.getElementById('intake-location').value,
      intake_role: form.querySelector('input[name="role"]:checked')?.value || '',
      ai_comfort: parseInt(document.getElementById('intake-comfort').value) || null,
      ai_relationship: form.querySelector('input[name="ai_relationship"]:checked')?.value || '',
      colleagues_introduced: parseInt(document.getElementById('intake-colleagues').value) || 0,
      used_in_client_work: document.getElementById('intake-clientwork').checked,
      hours_saved_per_week: parseFloat(document.getElementById('intake-hours').value) || 0,
      participation_preference: form.querySelector('input[name="participation"]:checked')?.value || '',
      interested_in_pod: document.getElementById('intake-pod-interest').checked,
      interested_in_leading: document.getElementById('intake-lead-interest').checked,
      leadership_role: document.getElementById('intake-leadership').value,
      pod_ideas: document.getElementById('intake-pod-ideas').value.trim(),
      questions: document.getElementById('intake-questions').value.trim()
    };

    if (!payload.name || !payload.email) {
      goToStep(1);
      form.querySelectorAll('#intake-name, #intake-email').forEach(f => {
        if (!f.value.trim()) {
          f.classList.add('field-error');
          f.addEventListener('input', () => f.classList.remove('field-error'), { once: true });
        }
      });
      return;
    }

    const submitBtn = document.getElementById('intake-submit-btn');
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    try {
      if (supabase) {
        const { error } = await supabase.from('intake_submissions').insert([payload]);
        if (error) throw error;
      } else {
        console.log('Intake form submitted (no Supabase):', payload);
        await new Promise(r => setTimeout(r, 800));
      }

      // Always persist locally for dashboard access
      saveSubmissionToLocal('intake', payload);

      // Success
      form.querySelectorAll('.intake-step').forEach(s => s.classList.remove('active'));
      document.getElementById('intake-success').style.display = 'flex';
      document.querySelector('.step-indicator').style.display = 'none';
    } catch (error) {
      console.error('Intake submission error:', error);
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Submit Application';
      alert('There was an error submitting. Please try again.');
    }
  });
}

// ============================================
// LOGIN MODAL
// ============================================
function setupLoginModal() {
  const modal = document.getElementById('login-modal');
  const btn = document.getElementById('login-btn');
  const btnText = document.getElementById('login-btn-text');
  const closeBtn = document.getElementById('login-close');
  const backdrop = modal?.querySelector('.login-backdrop');
  const searchInput = document.getElementById('login-search');
  const resultsEl = document.getElementById('login-results');

  if (!modal || !btn) return;

  // Check if already logged in
  const currentUser = sessionStorage.getItem('botany-user');
  if (currentUser) {
    btnText.textContent = 'My Dashboard';
    btn.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
    return;
  }

  // Open modal
  btn.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput?.focus(), 300);
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (searchInput) searchInput.value = '';
    if (resultsEl) resultsEl.innerHTML = '';
  }
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Search and autocomplete — searches BOTH CSV users AND pod members
  // Build a combined search pool so everyone can log in
  function buildSearchPool() {
    const pool = new Map();

    // Add all CSV/processed users with their full data
    processedUsers.forEach(u => {
      pool.set(u.name.toLowerCase().trim(), {
        name: u.name,
        tier: u.tier.name,
        totalHours: u.totalHours,
        useCaseCount: u.useCaseCount,
        source: 'data'
      });
    });

    // Add all pod members who aren't already in the pool
    const allPods = [...PHASE_3_PODS, ...PHASE_2_PODS];
    allPods.forEach(pod => {
      [...pod.leads, ...pod.members].forEach(name => {
        const key = name.toLowerCase().trim();
        if (!pool.has(key)) {
          pool.set(key, {
            name: name,
            tier: 'Moss',
            totalHours: 0,
            useCaseCount: 0,
            source: 'pod'
          });
        }
      });
    });

    return Array.from(pool.values());
  }

  const searchPool = buildSearchPool();

  let debounceTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        resultsEl.innerHTML = '';
        return;
      }
      const matches = searchPool.filter(u =>
        u.name.toLowerCase().includes(query)
      ).slice(0, 8);

      if (matches.length === 0) {
        resultsEl.innerHTML = '<p class="login-no-results">No matching names found</p>';
        return;
      }

      resultsEl.innerHTML = matches.map(user => {
        const initials = getInitials(user.name);
        const subtitle = user.source === 'pod'
          ? `${user.tier} · Pod member`
          : `${user.tier} · ${user.totalHours}h saved · ${user.useCaseCount} use cases`;
        return `
          <div class="login-result-item" data-name="${user.name}">
            <div class="login-result-avatar">${initials}</div>
            <div>
              <div class="login-result-name">${user.name}</div>
              <div class="login-result-tier">${subtitle}</div>
            </div>
          </div>
        `;
      }).join('');

      // Click handler for results
      resultsEl.querySelectorAll('.login-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const name = item.dataset.name;
          sessionStorage.setItem('botany-user', name);
          window.location.href = 'dashboard.html';
        });
      });
    }, 200);
  });
}

// ============================================
// PROFILE LINKS (Global delegated click handler)
// ============================================
function setupProfileLinks() {
  // Single delegated listener on body catches ALL profile-link clicks
  document.body.addEventListener('click', (e) => {
    const profileEl = e.target.closest('[data-profile]');
    if (profileEl) {
      e.preventDefault();
      e.stopPropagation();
      const name = profileEl.dataset.profile;
      if (name) viewProfile(name);
    }
  });
}

// ============================================
// LOCALSTORAGE SUBMISSIONS (Persist form data)
// ============================================
function saveSubmissionToLocal(type, payload) {
  const key = `botany-${type}-submissions`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  payload.submittedAt = new Date().toISOString();
  existing.push(payload);
  localStorage.setItem(key, JSON.stringify(existing));
}

// ============================================
// PRO TIPS FEED
// ============================================
const TIP_TYPE_CONFIG = {
  quick_tip:      { label: '\ud83d\udca1 Quick Tip',      color: '#ffa500', maxLen: 280 },
  tool_spotlight:  { label: '\ud83d\udd27 Tool Spotlight',  color: '#38bdf8', maxLen: 500 },
  prompt:          { label: '\ud83d\udcac Prompt',          color: '#a100ff', maxLen: 500 },
  til:             { label: '\ud83e\uddea TIL',             color: '#4ade80', maxLen: 280 }
};

let allTips = [];

async function loadProTips() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('pro_tips')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.warn('Tips load error:', error); return []; }
    return data || [];
  } catch (e) { return []; }
}

function renderTipsFeed(tips, filter = 'all') {
  const el = document.getElementById('tips-feed');
  if (!el) return;

  const filtered = filter === 'all' ? tips : tips.filter(t => t.tip_type === filter);
  const currentUser = sessionStorage.getItem('botany-user');

  if (filtered.length === 0) {
    el.innerHTML = `<div class="tips-empty">
      <p>${filter === 'all' ? 'No tips shared yet. Be the first! \ud83c\udf31' : 'No tips in this category yet.'}</p>
    </div>`;
    return;
  }

  el.innerHTML = filtered.map(tip => {
    const cfg = TIP_TYPE_CONFIG[tip.tip_type] || TIP_TYPE_CONFIG.quick_tip;
    const date = new Date(tip.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const tools = (tip.tool_tags || '').split(';').filter(Boolean);
    const initials = tip.author_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    return `
      <div class="tip-card" data-tip-id="${tip.id}">
        <div class="tip-header">
          <div class="tip-type-badge" style="--tip-color:${cfg.color}">${cfg.label}</div>
          <span class="tip-date">${date}</span>
        </div>
        <div class="tip-content">${tip.content}</div>
        ${tools.length > 0 ? `<div class="tip-tools">${tools.map(t => `<span class="tip-tool-tag">${t.trim()}</span>`).join('')}</div>` : ''}
        <div class="tip-footer">
          <div class="tip-author">
            <div class="tip-author-avatar">${initials}</div>
            <span>${tip.author_name}</span>
          </div>
          <button class="tip-upvote-btn ${currentUser ? '' : 'disabled'}" data-tip-id="${tip.id}" title="${currentUser ? 'Upvote' : 'Log in to upvote'}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span class="tip-upvote-count">${tip.upvotes || 0}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function upvoteTip(tipId) {
  const currentUser = sessionStorage.getItem('botany-user');
  if (!currentUser || !supabase) return false;

  // Check if already voted
  const { data: existing } = await supabase
    .from('tip_upvotes')
    .select('id')
    .eq('tip_id', tipId)
    .eq('user_name', currentUser)
    .limit(1);

  if (existing && existing.length > 0) return false; // Already voted

  // Insert upvote
  const { error: insertErr } = await supabase
    .from('tip_upvotes')
    .insert([{ tip_id: tipId, user_name: currentUser }]);
  if (insertErr) return false;

  // Increment count
  const tip = allTips.find(t => t.id === tipId);
  if (tip) {
    tip.upvotes = (tip.upvotes || 0) + 1;
    await supabase.from('pro_tips').update({ upvotes: tip.upvotes }).eq('id', tipId);
  }
  return true;
}

async function submitProTip(authorName, tipType, content, toolTags) {
  if (!supabase) return false;

  const { error } = await supabase.from('pro_tips').insert([{
    author_name: authorName,
    tip_type: tipType,
    content,
    tool_tags: toolTags
  }]);
  if (error) { console.error('Tip submit error:', error); return false; }

  // Log to activity_log for streak
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil((now - start) / 604800000);
  await supabase.from('activity_log').insert([{
    user_name: authorName,
    action_type: 'pro_tip',
    description: content.slice(0, 200),
    week_number: weekNum,
    year: now.getFullYear()
  }]);

  return true;
}

function setupTipsSection() {
  const currentUser = sessionStorage.getItem('botany-user');

  // Show share button if logged in
  const shareBtn = document.getElementById('share-tip-btn');
  if (shareBtn && currentUser) {
    shareBtn.style.display = 'inline-flex';
    shareBtn.addEventListener('click', () => showTipModal(currentUser));
  }

  // Type filter tabs
  document.getElementById('tips-type-filters')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('#tips-type-filters .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderTipsFeed(allTips, tab.dataset.type);
  });

  // Upvote clicks (delegated)
  document.getElementById('tips-feed')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('.tip-upvote-btn:not(.disabled)');
    if (!btn) return;
    btn.classList.add('disabled');
    const ok = await upvoteTip(btn.dataset.tipId);
    if (ok) {
      const countEl = btn.querySelector('.tip-upvote-count');
      countEl.textContent = parseInt(countEl.textContent) + 1;
      btn.classList.add('upvoted');
    } else {
      btn.classList.remove('disabled');
    }
  });
}

function showTipModal(authorName) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.id = 'tip-modal';
  modal.innerHTML = `
    <div class="modal-content" style="max-width:520px;">
      <button class="modal-close" onclick="document.getElementById('tip-modal').remove()">&times;</button>
      <h3 style="font-family:var(--font-display);margin-bottom:1rem;">Share a Pro Tip</h3>
      <form id="tip-form">
        <div class="form-group">
          <label>Tip Type</label>
          <select id="tip-type" required style="padding:10px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(161,0,255,0.15);color:var(--text-primary);width:100%;">
            <option value="quick_tip">\ud83d\udca1 Quick Tip (280 chars)</option>
            <option value="tool_spotlight">\ud83d\udd27 Tool Spotlight (500 chars)</option>
            <option value="prompt">\ud83d\udcac Prompt (500 chars)</option>
            <option value="til">\ud83e\uddea TIL - Today I Learned (280 chars)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Your Tip</label>
          <textarea id="tip-content" required maxlength="280" rows="4" placeholder="Share your AI tip, trick, or discovery\u2026" style="padding:10px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(161,0,255,0.15);color:var(--text-primary);width:100%;resize:vertical;"></textarea>
          <div style="font-size:0.75rem;color:var(--text-muted);text-align:right;" id="tip-char-count">0/280</div>
        </div>
        <div class="form-group">
          <label>Tools Used (optional, semicolon-separated)</label>
          <input type="text" id="tip-tools" placeholder="e.g. Copilot; ChatGPT; Claude" style="padding:10px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(161,0,255,0.15);color:var(--text-primary);width:100%;">
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem;">Share Tip</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Set up character counter and type switching
  const typeSelect = modal.querySelector('#tip-type');
  const textarea = modal.querySelector('#tip-content');
  const charCount = modal.querySelector('#tip-char-count');

  function updateMaxLen() {
    const cfg = TIP_TYPE_CONFIG[typeSelect.value];
    textarea.maxLength = cfg.maxLen;
    charCount.textContent = `${textarea.value.length}/${cfg.maxLen}`;
  }
  typeSelect.addEventListener('change', updateMaxLen);
  textarea.addEventListener('input', updateMaxLen);

  // Submit handler
  modal.querySelector('#tip-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sharing\u2026';

    const ok = await submitProTip(
      authorName,
      typeSelect.value,
      textarea.value.trim(),
      modal.querySelector('#tip-tools').value.trim()
    );

    if (ok) {
      modal.querySelector('.modal-content').innerHTML = `
        <div class="form-success" style="display:flex">
          <div class="success-icon">\u2705</div>
          <h3>Tip Shared!</h3>
          <p>Your pro tip is now live. +15 XP earned!</p>
        </div>
      `;
      // Reload tips
      allTips = await loadProTips();
      renderTipsFeed(allTips);
      setTimeout(() => modal.remove(), 2500);
    } else {
      btn.disabled = false;
      btn.textContent = 'Share Tip';
    }
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ============================================
// INITIALIZATION
// ============================================
async function init() {
  try {
    allData = await loadSupabaseData();
    processedUsers = processData(allData);
    processedUsers.sort((a, b) => b.totalHours - a.totalHours);

    renderStats(processedUsers, allData);

    // Load live pod data from Supabase before rendering pods
    await loadLivePodData();
    renderPods(3);

    renderPodium(processedUsers);
    renderLeaderboard(processedUsers);
    renderGallery(allData);
    renderAnalytics(allData);

    // Pro Tips
    allTips = await loadProTips();
    renderTipsFeed(allTips);
    setupTipsSection();

    setupLeaderboardSorting();
    setupScrollAnimations();
    setupSubmissionForm();
    setupGalleryCollapse();
    setupPodPhaseToggle();
    setupPodIdeaModal();
    setupIntakeForm();
    setupLoginModal();
    setupProfileLinks();

    console.log('Botany AI Showcase initialized successfully!');
    console.log(`Loaded ${allData.length} use cases from ${processedUsers.length} innovators`);

  } catch (error) {
    console.error('Failed to initialize:', error);
  }
}

// ============================================
// GALLERY COLLAPSE / EXPAND
// ============================================
function setupGalleryCollapse() {
  const wrapper = document.getElementById('gallery-wrapper');
  const toggle = document.getElementById('gallery-toggle');
  const fade = document.getElementById('gallery-fade');
  if (!wrapper || !toggle) return;

  let expanded = false;

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    if (expanded) {
      wrapper.classList.remove('collapsed');
      toggle.querySelector('span').textContent = 'Show Less';
      toggle.querySelector('svg').style.transform = 'rotate(180deg)';
    } else {
      wrapper.classList.add('collapsed');
      toggle.querySelector('span').textContent = 'Show All Use Cases';
      toggle.querySelector('svg').style.transform = 'rotate(0deg)';
      // Scroll gallery section into view
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ============================================
// SUBMISSION FORM + POWER AUTOMATE WEBHOOK
// ============================================

// ⚠️  PASTE YOUR POWER AUTOMATE WEBHOOK URL BELOW
const WEBHOOK_URL = '';

function setupSubmissionForm() {
  const form = document.getElementById('usecase-form');
  if (!form) return;

  // Comfort slider live value
  const slider = document.getElementById('form-comfort');
  const sliderVal = document.getElementById('slider-value');
  if (slider && sliderVal) {
    slider.addEventListener('input', () => {
      sliderVal.textContent = slider.value;
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate required fields
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const useCase = document.getElementById('form-usecase').value.trim();
    const tools = document.getElementById('form-tools').value;
    const hours = document.getElementById('form-hours').value.trim();

    if (!name || !email || !useCase || !tools || !hours) {
      // Highlight missing fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('field-error');
          field.addEventListener('input', () => field.classList.remove('field-error'), { once: true });
        }
      });
      return;
    }

    const payload = {
      name,
      email,
      useCase,
      tools,
      hours,
      value: document.getElementById('form-value').value.trim(),
      challenges: document.getElementById('form-challenges').value.trim(),
      comfort: document.getElementById('form-comfort').value,
      barrier: document.getElementById('form-barrier').value,
      recommend: document.getElementById('form-recommend').checked ? 'Yes' : 'No',
      clientWork: document.getElementById('form-clientwork').checked ? 'Yes' : 'No',
      submittedAt: new Date().toISOString()
    };

    const submitBtn = document.getElementById('submit-btn');
    const successEl = document.getElementById('form-success');

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    try {
      // 1. Persist to Supabase (primary storage)
      if (supabase) {
        const dbPayload = {
          name: payload.name,
          email: payload.email,
          use_case: payload.useCase,
          tools: payload.tools,
          hours_saved: parseFloat(payload.hours) || 0,
          value_created: payload.value,
          challenges: payload.challenges,
          comfort_level: parseInt(payload.comfort) || null,
          barrier: payload.barrier,
          recommends: payload.recommend === 'Yes',
          used_in_client_work: payload.clientWork === 'Yes',
          status: 'approved'
        };
        const { error: dbError } = await supabase.from('use_case_submissions').insert([dbPayload]);
        if (dbError) {
          console.error('Supabase insert error:', dbError);
          // Continue — still save to localStorage as backup
        } else {
          console.log('Use case saved to Supabase successfully');
          // Log activity for streak tracking
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 1);
          const weekNum = Math.ceil((now - start) / 604800000);
          await supabase.from('activity_log').insert([{
            user_name: payload.name,
            action_type: 'use_case',
            description: payload.useCase.slice(0, 200),
            week_number: weekNum,
            year: now.getFullYear()
          }]);
        }
      }

      // 2. Also send to webhook if configured
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) console.warn('Webhook response not ok');
      }

      // 3. Always persist to localStorage for immediate dashboard access
      saveSubmissionToLocal('usecase', payload);

      // Success
      form.querySelector('.form-grid').style.display = 'none';
      form.querySelector('.form-actions').style.display = 'none';
      successEl.style.display = 'flex';

    } catch (error) {
      console.error('Submission error:', error);
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Submit Use Case';
      alert('There was an error submitting your use case. Please try again.');
    }
  });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
