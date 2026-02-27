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
  // Tier icons
  propagator: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z"/><path d="M12 2a5.5 5.5 0 0 0 0 8"/><path d="M12 2a5.5 5.5 0 0 1 0 8"/></svg>',
  pollinator: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',
  seedling: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12c-3-3-7-2-7 2 3 0 5.5-1 7-2z"/><path d="M12 12c3-3 7-2 7 2-3 0-5.5-1-7-2z"/></svg>',
  planted: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',

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
  csvPath: '/data.csv',
  tiers: {
    propagator: { min: 20, icon: ICONS.propagator, name: 'Propagator', class: 'propagator' },
    pollinator: { min: 10, icon: ICONS.pollinator, name: 'Pollinator', class: 'pollinator' },
    seedling: { min: 1, icon: ICONS.seedling, name: 'Seedling', class: 'seedling' },
    planted: { min: 0, icon: ICONS.planted, name: 'Planted', class: 'planted' }
  },
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
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';
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
// CSV PARSING
// ============================================
async function loadCSVData() {
  try {
    // URL-encode the path for servers that need it
    const response = await fetch(encodeURI(CONFIG.csvPath));
    if (!response.ok) {
      console.error('CSV fetch failed:', response.status);
      return [];
    }
    const text = await response.text();
    // Guard: if the response looks like HTML (e.g. a 404 page), bail
    if (text.trim().startsWith('<!') || text.trim().startsWith('<html')) {
      console.error('CSV endpoint returned HTML instead of CSV data');
      return [];
    }
    return parseCSV(text);
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
}

function parseCSV(text) {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index] ? values[index].trim() : '';
    });

    data.push(row);
  }

  return data;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);

  return result.map(val => val.replace(/^"|"$/g, '').trim());
}

// ============================================
// DATA PROCESSING
// ============================================
function processData(data) {
  const userMap = new Map();

  data.forEach(row => {
    const name = row['Name'] || '';
    const email = row['Email'] || '';

    if (!name) return;

    const hours = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?']);
    const tools = parseTools(row['Which AI or new tools did you use?']);
    const comfort = parseInt(row['What was your comfort level with AI tools this week?']) || 3;
    const recommends = (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes');
    const barrier = row['What is your biggest barrier to AI adoption?'] || 'Unknown';
    const useCase = row['What was the use case or activity?'] || '';
    const value = row['How did this use case create value for your team or client?'] || '';
    const challenges = row['What challenges or barriers did you encounter?'] || '';
    const usedInClientWork = (row['Have you used AI in client work yet?'] || '').toLowerCase().includes('yes');

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
  return Array.from(userMap.values()).map(user => ({
    ...user,
    avgComfort: (user.totalComfort / user.useCaseCount).toFixed(1),
    allTools: Array.from(user.allTools),
    tier: getTier(user.totalHours, user.useCaseCount)
  }));
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
  if (hours >= 20 || useCases >= 3) return CONFIG.tiers.propagator;
  if (hours >= 10 || useCases >= 2) return CONFIG.tiers.pollinator;
  if (hours >= 1 || useCases >= 1) return CONFIG.tiers.seedling;
  return CONFIG.tiers.planted;
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

  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.round(current) + (target > 50 ? '+' : '');
  }, stepTime);
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
      <div class="podium-place ${position}">
        <div class="podium-rank-label">${rankLabels[idx]}</div>
        <div class="podium-avatar">${initials}</div>
        <div class="podium-name">${user.name}</div>
        <div class="podium-hours">${Math.round(user.totalHours)} hours saved</div>
        <span class="tier-badge ${user.tier.class}"><span class="tier-icon">${user.tier.icon}</span> ${user.tier.name}</span>
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
      <div class="leaderboard-card" data-user="${user.name}">
        <div class="rank">#${rank}</div>
        <div class="user-info">
          <div class="user-avatar">${initials}</div>
          <div class="user-details">
            <div class="user-name">${user.name}</div>
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
  const uniqueTools = [...new Set(data.flatMap(row => parseTools(row['Which AI or new tools did you use?'])))];
  renderToolFilters(uniqueTools);

  gridEl.innerHTML = data.map((row, index) => {
    const tools = parseTools(row['Which AI or new tools did you use?']);
    const mainTool = tools[0] || 'AI Tool';
    const toolConfig = CONFIG.toolColors[mainTool] || CONFIG.toolColors.default;
    const recommends = (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes');
    const comfort = parseInt(row['What was your comfort level with AI tools this week?']) || 3;
    const hours = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?']);
    const useCase = row['What was the use case or activity?'] || 'AI Innovation';
    const name = row['Name'] || 'Anonymous';
    const value = row['How did this use case create value for your team or client?'] || '';
    const comfortPercent = (comfort / 5) * 100;

    return `
      <div class="usecase-card" data-tools="${tools.join(',')}" data-index="${index}" role="button" tabindex="0" aria-label="View details for: ${truncateText(useCase, 40)}">
        <div class="usecase-header">
          <span class="tool-badge ${toolConfig.class}"><span class="tool-icon">${toolConfig.icon}</span> ${mainTool}</span>
          ${recommends ? `<span class="recommend-badge">${ICONS.check} Recommended</span>` : ''}
        </div>
        <h3 class="usecase-title">${truncateText(useCase, 80)}</h3>
        <p class="usecase-author">by ${name}</p>
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
  const totalRecommends = data.filter(row =>
    (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes')
  ).length;
  const recommendRate = Math.round((totalRecommends / data.length) * 100);
  document.getElementById('recommend-rate').textContent = recommendRate + '%';

  // Average comfort
  const comfortLevels = data
    .map(row => parseInt(row['What was your comfort level with AI tools this week?']) || 0)
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

  const tools = parseTools(row['Which AI or new tools did you use?']);
  const mainTool = tools[0] || 'AI Tool';
  const toolConfig = CONFIG.toolColors[mainTool] || CONFIG.toolColors.default;
  const recommends = (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes');
  const comfort = parseInt(row['What was your comfort level with AI tools this week?']) || 3;
  const hours = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?']);
  const useCase = row['What was the use case or activity?'] || 'AI Innovation';
  const name = row['Name'] || 'Anonymous';
  const value = row['How did this use case create value for your team or client?'] || 'Not specified';
  const challenges = row['What challenges or barriers did you encounter?'] || 'None reported';
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
      <p class="modal-author">by ${name}</p>

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
// SCROLL ANIMATIONS
// ============================================
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section > .container').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// POD RENDERING
// ============================================
function renderPods(phase) {
  const grid = document.getElementById('pods-grid');
  if (!grid) return;

  const pods = phase === 3 ? PHASE_3_PODS : PHASE_2_PODS;

  grid.innerHTML = pods.map((pod, idx) => {
    const leadAvatars = pod.leads.map(name => {
      const initials = getInitials(name);
      return `<div class="pod-lead"><div class="pod-lead-avatar">${initials}</div><span>${name}</span></div>`;
    }).join('');

    const memberChips = pod.members.map(name =>
      `<span class="pod-member-chip">${name}</span>`
    ).join('');

    const podLabel = typeof pod.id === 'number' ? `Pod #${pod.id}` : (pod.id === 'fw' ? '\ud83d\udc41\ufe0f' : '\ud83c\udf31');
    const hasMembers = pod.leads.length > 0 || pod.members.length > 0;
    const emptyState = !hasMembers ? '<p class="pod-empty">Open for sign-ups!</p>' : '';

    return `
      <div class="pod-card" style="animation-delay: ${idx * 0.05}s">
        <div class="pod-card-header">
          <span class="pod-number">${podLabel}</span>
          <h3 class="pod-name">${pod.name}</h3>
        </div>
        <p class="pod-description">${pod.description}</p>
        ${pod.leads.length > 0 ? `<div class="pod-leads-section"><span class="pod-section-label">Leads</span><div class="pod-leads-row">${leadAvatars}</div></div>` : ''}
        ${pod.members.length > 0 ? `<div class="pod-members-section"><span class="pod-section-label">Members</span><div class="pod-members-row">${memberChips}</div></div>` : ''}
        ${emptyState}
      </div>
    `;
  }).join('');
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
      const payload = {
        name: document.getElementById('idea-name').value.trim(),
        email: document.getElementById('idea-email').value.trim(),
        idea_title: document.getElementById('idea-title').value.trim(),
        idea_description: document.getElementById('idea-desc').value.trim()
      };

      if (!payload.name || !payload.email || !payload.idea_title) return;

      try {
        if (supabase) {
          await supabase.from('pod_ideas').insert([payload]);
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
      current_role: form.querySelector('input[name="role"]:checked')?.value || '',
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
// INITIALIZATION
// ============================================
async function init() {
  try {
    // Load and process data
    allData = await loadCSVData();
    processedUsers = processData(allData);

    // Sort by hours saved (default)
    processedUsers.sort((a, b) => b.totalHours - a.totalHours);

    // Render all components
    renderStats(processedUsers, allData);
    renderPods(3); // Phase 3 by default
    renderPodium(processedUsers);
    renderLeaderboard(processedUsers);
    renderGallery(allData);
    renderAnalytics(allData);

    // Setup interactions
    setupLeaderboardSorting();
    setupScrollAnimations();
    setupSubmissionForm();
    setupGalleryCollapse();
    setupPodPhaseToggle();
    setupPodIdeaModal();
    setupIntakeForm();

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
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Webhook response not ok');
      } else {
        // No webhook configured — simulate a short delay
        console.log('No WEBHOOK_URL configured. Form data:', payload);
        await new Promise(r => setTimeout(r, 800));
      }

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
