/* SVG icon paths as React-friendly strings */
export const ICONS = {
    propagator: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" /><path d="M12 2a5.5 5.5 0 0 0 0 8" /><path d="M12 2a5.5 5.5 0 0 1 0 8" /></svg>,
    pollinator: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" /><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>,
    seedling: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12c-3-3-7-2-7 2 3 0 5.5-1 7-2z" /><path d="M12 12c3-3 7-2 7 2-3 0-5.5-1-7-2z" /></svg>,
    planted: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
    trophy: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>,
    lightbulb: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>,
    chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>,
    users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    send: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    arrowRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    user: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    settings: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
    logout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    chevronDown: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
};

/* Tier configuration */
export const TIERS = {
    propagator: { min: 20, icon: 'propagator', name: 'Propagator', className: 'propagator' },
    pollinator: { min: 10, icon: 'pollinator', name: 'Pollinator', className: 'pollinator' },
    seedling: { min: 1, icon: 'seedling', name: 'Seedling', className: 'seedling' },
    planted: { min: 0, icon: 'planted', name: 'Planted', className: 'planted' },
};

export function getTier(hours, useCases) {
    if (hours >= 20 || useCases >= 3) return TIERS.propagator;
    if (hours >= 10 || useCases >= 2) return TIERS.pollinator;
    if (hours >= 1 || useCases >= 1) return TIERS.seedling;
    return TIERS.planted;
}

export function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}

export function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/* Tool color map */
export const TOOL_COLORS = {
    'Enterprise GPT': { className: 'egpt' },
    'Copilot': { className: 'copilot' },
    'Amethyst': { className: 'amethyst' },
    'Nano Banana Pro': { className: 'egpt' },
    'Gemini': { className: 'egpt' },
    default: { className: 'egpt' },
};

/* Parse tools from semicolon-separated string */
export function parseTools(value) {
    if (!value) return [];
    return value.split(';').map(t => t.trim()).filter(t => t.length > 0).map(t => {
        if (t.toLowerCase().includes('enterprise') || t.toLowerCase().includes('egpt')) return 'Enterprise GPT';
        if (t.toLowerCase().includes('copilot')) return 'Copilot';
        if (t.toLowerCase().includes('amethyst')) return 'Amethyst';
        if (t.toLowerCase().includes('gemini') || t.toLowerCase().includes('banana')) return 'Nano Banana Pro';
        return t;
    });
}

/* Parse hours from various formats */
export function parseHours(value) {
    if (!value) return 0;
    const lower = value.toLowerCase();
    if (lower.length > 60 && !lower.match(/^\d/)) return 0;
    if (lower === 'n/a' || lower === 'na' || lower === 'none') return 0;
    const isMinutes = lower.includes('min');
    const rangeMatch = value.match(/^\s*(\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)/);
    if (rangeMatch) {
        const avg = (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2;
        return isMinutes ? avg / 60 : avg;
    }
    const leadingNum = value.match(/^\s*(\d*\.?\d+)/);
    if (leadingNum) {
        const num = parseFloat(leadingNum[1]);
        return isMinutes ? num / 60 : num;
    }
    return 0;
}

/* Pod data (legacy — will migrate to Supabase) */
export const PHASE_3_PODS = [
    { id: 1, name: 'Project Management', description: 'Exploration of building internal cohesive system for managing project details.', leads: ['Luca Bianchi', 'Pedro Henrique'], members: ['Mia Fleming', 'Becca Toren', 'Adam Oliva'] },
    { id: 2, name: 'AI Assistants', description: 'Explore current AI assistant tools and see how they can improve our lives.', leads: ['Ibraheem Ahmad', 'Niko Levin'], members: ['Anthony Saber', 'Preeti Saldanha', 'Kiara Cruz'] },
    { id: 3, name: 'AI is Reshaping Orgs', description: 'How AI is reshaping organizations; exploring real effects on structure and work.', leads: ['Nicole Lehman', 'Connor Alexander'], members: ['Benjamin Casillas', 'Saara Kharal', 'Abigail Dubinski', 'Kate Sweeney'] },
    { id: 4, name: 'Biz Case Development', description: 'Tooling that rapidly builds credible business cases using benchmarks.', leads: ['Alfredo Ramirez', 'Mike Babowice'], members: ['Carleigh Bethea', 'Diego Stoffels-Lopez', 'Frank Vigoa', 'Meghan Lim'] },
    { id: 5, name: 'PPT Upkeep & Storytelling', description: 'Using AI to effectively craft presentations for storytelling.', leads: ['Luke Boyer'], members: ['Connor Rivas', 'Dani Zeller', 'Destiny Ndupu'] },
    { id: 6, name: 'Business Development', description: 'T&O related business development exploration.', leads: ['Katie Lux'], members: ['Catelyn Tankersley', 'Eva Larino', 'Ellie Smith', 'Reese Pulver'] },
    { id: 7, name: 'Stock Uplift Analyst', description: 'Embedding AlphaSense/eGPT into stock price uplift analysis for CPR.', leads: ['Malcolm MacEwan', 'Gabe Pascual'], members: ['Max Thielbahr', 'Mariano Brito', 'Sophia Pasquale'] },
    { id: 8, name: 'Client-Facing Tools', description: 'Developing AI tools for broader deployment and training.', leads: ['Bianca Rodriguez Pagano', 'Megan Bickel'], members: ['Connor Seale', 'Demetrius Smith', 'Colleen Cooke', 'Katie Shin'] },
    { id: 9, name: 'Vibecoding #1', description: 'Deep dive into low-code vibecoding tools (Lovable.AI).', leads: ['Winston Blythe', 'Rishab'], members: ['Daniela Caisaguano', 'Ellis Kolber', 'Dylan Vohra'] },
    { id: 10, name: 'Vibecoding #2', description: 'Deep dive into low-code vibecoding tools (Lovable.AI).', leads: ['Sam McGinty', 'Max Thielbahr'], members: ['Sam Lee', 'Kendall Likosar', 'Hargunn Sandhu', 'Ethan Herr'] },
    { id: 11, name: 'Tactical Hiring / KT', description: 'A centralized assistant to help new joiners ramp up faster.', leads: [], members: [] },
    { id: 12, name: 'PA Support', description: 'AI for performance achievement writing and accountability.', leads: [], members: [] },
    { id: 13, name: 'Agent Catalog', description: 'Creating a searchable inventory of available agents.', leads: [], members: [] },
    { id: 14, name: 'Process Design', description: 'Establishing process standards and using AI for design.', leads: [], members: [] },
    { id: 15, name: 'Enterprise Claude', description: 'Push the jagged frontier of Claude enterprise.', leads: ['Gavin Stewart', 'Bella Watchi'], members: [] },
];

export const PHASE_2_PODS = [
    { id: 1, name: 'Sales Cycle', description: 'RFP, BD, SOW Content Generation', leads: ['Ellis Kolber', 'Connor Seale'], members: ['Bianca Pagano', 'Katie Shin', 'Rishab Balakrishnan', 'Kevin Navarro Santos'] },
    { id: 2, name: 'Best Practice Development', description: 'Best practice development, Knowledge Management', leads: ['Mike Babowice'], members: ['Natalia Basulado Moine', 'Anna English', 'Frank Vigoa', 'Annie Rosenman', 'Beth Canel'] },
    { id: 3, name: 'Client Meeting Facilitation', description: 'Workshops, Co-Creation with AI', leads: ['Nicole Lehman', 'Connor Alexander'], members: ['Malcom MacEwan', 'Nicholas Laurencelle', 'Niko Levin', 'Suzanne Sokolowski'] },
    { id: 4, name: 'Project Mobilization', description: 'Onboarding, Planning, Prioritization', leads: ['Davis DiGregorio', 'Alfredo Ramirez'], members: ['Christopher Arana', 'Mia Pinto', 'Shaam Kanji', 'Gabriel Pascual'] },
    { id: 5, name: 'Deep Research', description: 'Market / Competitor Analysis, Market Research', leads: ['Winston Blythe', 'Maxwell Thielbahr'], members: ['Becca Toren', 'Connor Rivas', 'Reese Pulver', 'Leena Satpathy', 'Peyton Watson'] },
    { id: 6, name: 'Credential Generation', description: 'Develop case study-style credentials', leads: ['Katie Lux', 'Juliette Medina'], members: ['Anthony Saber', 'Daniela Caisaguano', 'Ellie Smith', 'Sohan Vittalam'] },
    { id: 7, name: 'Data Synthesis & Insights', description: 'Quant / Qual Data Synthesis', leads: ['Grant Thomas', 'Ibraheem Ahmad'], members: ['Emily Hammerstein', 'Jay Seckman', 'Isabelle May', 'Meghan Lim'] },
];
