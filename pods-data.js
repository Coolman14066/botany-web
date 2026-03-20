/**
 * BOTANY AI — Shared Pod Data
 * ============================
 * Single source of truth for all pod assignments.
 * Imported by both app.js and dashboard.js.
 */

const SHARED_PHASE_3_PODS = [
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

const SHARED_PHASE_2_PODS = [
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
    description: 'Observers and supporters of the B.O.T.A.N.Y(E). program',
    leads: [],
    members: ['Jamari Benologa', 'Rikako Kent', 'Katie DeGeyter', 'Annie Rosenman', 'Landon Barnhart', 'Ethan Beh', 'Jeena Cockburn', 'Ali Mahmoud', 'Jack Havemann', 'Carolyn Chen', 'Gavin Stewart', 'Olivia Battison', 'Shloak Dutta']
  },
  {
    id: 'pr', name: 'Propagators',
    description: 'Logistics, PMO, and organization support for B.O.T.A.N.Y(E).',
    leads: [],
    members: ['Catelyn Tankersly', 'Maxwell Thielbahr', 'Pedro Henrique', 'Luca Bianchi', 'Eva Larino', 'Bianca Rodriguez Pagano', 'Megan Bickel', 'Daniela Caisaguano', 'Beth Canel', 'Sophia Pasquale', 'Mike Babowice', 'Julietta Medina']
  }
];

// Shared utility: get all unique member names across both phases
function getAllPodMembers() {
  const names = new Set();
  [...SHARED_PHASE_3_PODS, ...SHARED_PHASE_2_PODS].forEach(pod => {
    pod.leads.forEach(n => names.add(n));
    pod.members.forEach(n => names.add(n));
  });
  return Array.from(names);
}

// Shared utility: find which pod(s) a user belongs to
function findUserPods(userName) {
  const lower = userName.toLowerCase().trim();
  const results = { phase3: null, phase2: null };

  for (const pod of SHARED_PHASE_3_PODS) {
    const allMembers = [...pod.leads, ...pod.members];
    if (allMembers.some(m => m.toLowerCase().trim() === lower)) {
      results.phase3 = pod;
      break;
    }
  }

  for (const pod of SHARED_PHASE_2_PODS) {
    const allMembers = [...pod.leads, ...pod.members];
    if (allMembers.some(m => m.toLowerCase().trim() === lower)) {
      results.phase2 = pod;
      break;
    }
  }

  return results;
}

// ============================================
// GROWTH LEVELS — the SINGLE source of truth
// ============================================
// 8 botanical species levels, ordered from humblest to most legendary.
// Each level has: key, name, icon (emoji), xpThreshold, cssClass, description
const GROWTH_LEVELS = [
  { key: 'moss',     name: 'Moss',     icon: '🌿', xpThreshold: 0,    cssClass: 'moss',     description: 'Tiny, resilient, first to colonize' },
  { key: 'fern',     name: 'Fern',     icon: '🌱', xpThreshold: 50,   cssClass: 'fern',     description: 'Ancient, elegant, growing' },
  { key: 'bamboo',   name: 'Bamboo',   icon: '🎋', xpThreshold: 150,  cssClass: 'bamboo',   description: 'Fastest-growing plant on Earth' },
  { key: 'magnolia', name: 'Magnolia', icon: '🌸', xpThreshold: 350,  cssClass: 'magnolia', description: 'Bold, beautiful, visible impact' },
  { key: 'willow',   name: 'Willow',   icon: '🌳', xpThreshold: 700,  cssClass: 'willow',   description: 'Graceful, deeply rooted' },
  { key: 'oak',      name: 'Oak',      icon: '🌲', xpThreshold: 1200, cssClass: 'oak',      description: 'Pillar of the forest' },
  { key: 'redwood',  name: 'Redwood',  icon: '🪵', xpThreshold: 2000, cssClass: 'redwood',  description: 'Towers above, lives millennia' },
  { key: 'sequoia',  name: 'Sequoia',  icon: '🏔️', xpThreshold: 3500, cssClass: 'sequoia',  description: 'Legendary. The largest living thing.' }
];

// Plant avatar sprite paths — one per growth level
const PLANT_AVATARS = {
  moss:     '/assets/plants/moss.png',
  sprout:   '/assets/plants/sprout.png',
  fern:     '/assets/plants/fern.png',
  bamboo:   '/assets/plants/bamboo.png',
  magnolia: '/assets/plants/magnolia.png',
  willow:   '/assets/plants/willow.png',
  oak:      '/assets/plants/oak.png',
  redwood:  '/assets/plants/redwood.png',
  sequoia:  '/assets/plants/sequoia.png'
};

// Get plant avatar path for a level key
function getPlantAvatar(levelKey) {
  return PLANT_AVATARS[levelKey] || PLANT_AVATARS.moss;
}

// XP calculation: 10 XP per hour saved + 50 XP per use case + 15 XP per pro tip + 25 XP per claimed referral
function calculateXP(hours, useCaseCount, tipCount, referralCount) {
  return Math.round((hours || 0) * 10) + ((useCaseCount || 0) * 50) + ((tipCount || 0) * 15) + ((referralCount || 0) * 25);
}

// Get level object from XP value
function getLevelFromXP(xp) {
  let level = GROWTH_LEVELS[0];
  for (let i = GROWTH_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= GROWTH_LEVELS[i].xpThreshold) {
      level = GROWTH_LEVELS[i];
      break;
    }
  }
  // Calculate progress to next level
  const currentIndex = GROWTH_LEVELS.indexOf(level);
  const nextLevel = GROWTH_LEVELS[currentIndex + 1] || null;
  const xpInCurrentLevel = xp - level.xpThreshold;
  const xpNeededForNext = nextLevel ? (nextLevel.xpThreshold - level.xpThreshold) : 0;
  const progressPercent = nextLevel ? Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100) : 100;

  return {
    ...level,
    xp,
    nextLevel,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
    levelIndex: currentIndex
  };
}

// Shared level calculation — the SINGLE source of truth
// Replaces the old getSharedTier(hours, useCases)
function getSharedLevel(hours, useCases) {
  const xp = calculateXP(hours, useCases);
  return getLevelFromXP(xp);
}

// Backward-compatible alias — old code calls getSharedTier, it now returns level data
function getSharedTier(hours, useCases) {
  const level = getSharedLevel(hours, useCases);
  // Return in the old { key, name, min } format for compatibility with existing render code
  return { key: level.key, name: level.name, min: level.xpThreshold, class: level.cssClass, icon: level.icon };
}

// Shared hours parser — the SINGLE source of truth
function parseSharedHours(value) {
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

// Shared initials helper
function getSharedInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
