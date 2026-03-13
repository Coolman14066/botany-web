// ============================================
// RESOURCE LIBRARY — Logic & Data
// ============================================

const RESOURCE_DATA = {
  sections: [
    {
      section: "Start Here",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
      resources: [
        {
          id: "m365-copilot-plug-play-kit",
          title: "M365 Copilot Plug & Play Kit",
          type: "guide",
          description: "Starter enablement kit including responsible use guidance and an internal prompt library concept (filter by application/behavior/date; includes Amethyst prompts).",
          access: { kind: "file", value: "M365 Copilot Plug & Play Kit.pptx" },
          ownerPublisher: "Pérez González, Karla Erika; Atagun, Burak; Habernig, Manuel",
          lastUpdated: "about an hour ago",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot", "Amethyst"],
          verificationStatus: "Verified"
        },
        {
          id: "m365-getting-started-prompts-resources",
          title: "M365 Copilot — Getting Started Prompts & Resources",
          type: "prompt pack",
          description: "Starter prompts and practical usage tips, including meeting preparation and prioritization prompts.",
          access: { kind: "file", value: "M365 Copilot_Getting Started Prompts & Resources.pptx" },
          ownerPublisher: "Perez, Karla Erika; Atagun, Burak; Quarders, Kennedy G.",
          lastUpdated: "this morning",
          audience: ["beginner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "m365-learning-session-deck",
          title: "M365 Copilot Learning Session",
          type: "training",
          description: "Enablement deck covering responsible sharing practices and structured prompting using the REACH framework.",
          access: { kind: "file", value: "M365 Copilot Learning Session.pptx" },
          ownerPublisher: "Pérez González, Karla Erika; Cappello, Guadalupe; Rajput, Shailendra",
          lastUpdated: "Tuesday morning",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        }
      ]
    },
    {
      section: "Responsible Use & Policy",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      resources: [
        {
          id: "responsible-ai-use-guide-core",
          title: "YOUR RESPONSIBLE AI USE GUIDE (9 core principles)",
          type: "policy",
          description: "Core responsible-use principles for Copilot use in daily work (ethics, transparency, meeting use, accuracy/bias, sensitivity labels/permissions, and avoiding sensitive data processing).",
          access: { kind: "communityPost", value: "Viva Engage post in Microsoft 365 Copilot community" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "Wednesday afternoon",
          audience: ["beginner", "practitioner", "leadership"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "responsible-ai-avoid-unethical-prompting",
          title: "YOUR RESPONSIBLE AI USE GUIDE: Avoid unethical prompting",
          type: "policy",
          description: "Defines ethical prompting patterns and explicitly prohibits using Copilot to judge people's intent/emotions/performance.",
          access: { kind: "communityPost", value: "Viva Engage post" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "Wednesday afternoon",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "responsible-ai-teams-meetings",
          title: "YOUR RESPONSIBLE AI USE GUIDE: Use Copilot appropriately in Teams meetings",
          type: "policy",
          description: "Meeting-specific responsible use guidance (inform participants, keep prompts task-focused, avoid analyzing people).",
          access: { kind: "communityPost", value: "Viva Engage post" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "Wednesday afternoon",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot in Teams"],
          verificationStatus: "Verified"
        },
        {
          id: "responsible-use-training-workday",
          title: "Responsible Use of M365 Copilot (Accenture)",
          type: "training",
          description: "Internal 20-minute training covering what Copilot is, risks, and required responsible practices (includes restriction notes).",
          access: { kind: "workday", value: "https://wd103.myworkday.com/accenture/email-universal/inst/17816$6642/rel-task/2998$29489.htmld" },
          ownerPublisher: "Workday (Internal)",
          lastUpdated: "Yesterday morning",
          audience: ["beginner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "purview-dlp-prompt-governance",
          title: "M365 Copilot Product Pitch",
          type: "guide",
          description: "Governance/security overview including Microsoft Purview Data Loss Prevention (DLP) controls for prompts.",
          access: { kind: "file", value: "M365 Copilot Product Pitch.PPTX" },
          ownerPublisher: "Yadin Dkhar; Dodge, Lyle; Román González, Cruz",
          lastUpdated: "this morning",
          audience: ["practitioner", "leadership"],
          tools: ["Microsoft 365 Copilot", "Copilot Chat", "Agents"],
          verificationStatus: "Verified"
        },
        {
          id: "m365-how-to-guide",
          title: "M365 Copilot How-to Guide",
          type: "guide",
          description: "Prompt design guidance plus links to internal resources (persona pack, process flow library, prompt library) and references to Copilot agents resources.",
          access: { kind: "file", value: "M365 Copilot How-to Guide.pdf" },
          ownerPublisher: "Brown, Syd; Burh, Munuren",
          lastUpdated: "January 16th",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot", "Agents"],
          verificationStatus: "Verified"
        }
      ]
    },
    {
      section: "Tool Map",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      resources: [
        {
          id: "building-m365-copilot-agent",
          title: "Building an M365 Copilot Agent",
          type: "agent building guide",
          description: "Explains Copilot Studio Lite (former Agent Builder) inside Microsoft 365 Copilot, what it connects to, and licensed vs non-licensed differences; notes other tools (e.g., Amethyst Studio) exist.",
          access: { kind: "file", value: "Building an M365 Copilot Agent.pdf" },
          ownerPublisher: "Perez, Karla Erika; Burh, Munuren",
          lastUpdated: "January 8th",
          audience: ["practitioner", "developer"],
          tools: ["Microsoft 365 Copilot", "Copilot Studio Lite", "Amethyst Studio"],
          verificationStatus: "Verified"
        }
      ]
    },
    {
      section: "Prompting Fundamentals",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      resources: [
        {
          id: "prompting-guide-resources",
          title: "M365 Copilot — Prompting Guide and Resources",
          type: "guide",
          description: "Prompting guide with REACH framework and scenario-based prompts (Teams meetings, email, document review, data analysis).",
          access: { kind: "file", value: "M365 Copilot_Prompting Guide and Resources.pdf" },
          ownerPublisher: "Perez, Karla Erika; Jedrzejczak, Aneta",
          lastUpdated: "November 11th, 2025",
          audience: ["beginner", "practitioner", "leadership"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "copilot-chat-prompts-10",
          title: "10 Microsoft 365 Copilot Chat Prompts",
          type: "prompt pack",
          description: "Explains Copilot Chat features and provides example prompts for task and communication management.",
          access: { kind: "file", value: "10 Microsoft 365 Copilot Chat Prompts.pdf" },
          ownerPublisher: "Austin Neelankavil",
          lastUpdated: "January 31st",
          audience: ["beginner"],
          tools: ["Microsoft 365 Copilot Chat"],
          verificationStatus: "Verified"
        },
        {
          id: "tip-tuesday-assist",
          title: "TIP TUESDAY — TRY THESE ASSIST PROMPTS!",
          type: "prompt pack",
          description: "Ready prompts for summarizing communications, inclusive language review, and acronym clarification; points to prompt library and responsible use.",
          access: { kind: "communityPost", value: "Viva Engage post" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "Wednesday afternoon",
          audience: ["beginner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "tip-tuesday-ideate",
          title: "TIP TUESDAY — TRY THESE IDEATE PROMPTS!",
          type: "prompt pack",
          description: "Prompts for reframing challenges and exploring bold alternatives; points to prompt library and responsible use.",
          access: { kind: "communityPost", value: "Viva Engage post" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "February 25th, 2026",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "tip-tuesday-evaluate",
          title: "TIP TUESDAY — TRY THESE EVALUATE PROMPTS!",
          type: "prompt pack",
          description: "Prompts to improve tone, clarity, and warmth in communications; points to prompt library and responsible use.",
          access: { kind: "communityPost", value: "Viva Engage post" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "March 6th, 2026",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        }
      ]
    },
    {
      section: "Prompt Library",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      resources: [
        {
          id: "accenture-prompt-library-powerapps",
          title: "Accenture Prompt Library (Power Apps)",
          type: "prompt library",
          description: "Central internal prompt library referenced across guides and community posts (ready-to-use templates).",
          access: { kind: "link", value: "https://apps.powerapps.com/play/e/0f27908d-8a03-434e-a8f5-80e7230b5a9e/a/5f95efc3-515f-4afc-8c77-6285043835b6?tenantId=e0793d39-0939-496d-b129-198edd916feb&hint=50bcce63-561e-426f-8f10-170a5f749f5c&sourcetime=1698090482138" },
          ownerPublisher: "Unverified",
          lastUpdated: "Unverified",
          audience: ["beginner", "practitioner", "leadership"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Partially Verified"
        },
        {
          id: "microsoft-prompt-gallery-discussion",
          title: "Copilot Prompt Gallery (Microsoft feature) — community discussion",
          type: "community",
          description: "Community post referencing Microsoft's prompt gallery/roadmap; notes about availability in Accenture environment appear in post thread.",
          access: { kind: "communityPost", value: "Viva Engage post referencing Microsoft roadmap" },
          ownerPublisher: "Ogawa, Fuji",
          lastUpdated: "October 20th, 2025",
          audience: ["practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Partially Verified"
        }
      ]
    },
    {
      section: "Agents & Automation",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
      resources: [
        {
          id: "copilot-studio-user-guide-governance",
          title: "Microsoft Copilot Studio — User Guide: Enablement & Governance Procedures",
          type: "guide",
          description: "Governance and enablement procedures for building agents: license/capacity request path, allowed authentication options, restrictions, and best practices to publish/monitor/scale.",
          access: { kind: "link", value: "https://ts.accenture.com/:b:/s/genaitoolsinsdlc/IQCk7HtrtMdrQIqA4m9lJoOpAeY67SLVVSc3tFrgNcEFtxU" },
          ownerPublisher: "Tarantino, Tiziano",
          lastUpdated: "March 6th, 2026",
          audience: ["practitioner", "developer"],
          tools: ["Copilot Studio"],
          verificationStatus: "Verified"
        }
      ]
    },
    {
      section: "Training & Enablement",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      resources: [
        {
          id: "skillsoft-using-m365-copilot-ai-course",
          title: "Using Microsoft 365 Copilot AI: Understanding Copilot's Prompt-Based Functionality and Security",
          type: "training",
          description: "Workday-accessible Skillsoft Percipio digital course focused on Copilot functionality and security within Microsoft 365.",
          access: { kind: "workday", value: "https://wd103.myworkday.com/accenture/email-universal/inst/22699$259730/rel-task/2998$35104.htmld" },
          ownerPublisher: "Skillsoft Percipio (via Workday)",
          lastUpdated: "December 17th, 2025",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "prompting-masterclass",
          title: "Prompting Masterclass",
          type: "training",
          description: "Referenced as a masterclass to build advanced prompting collaboration techniques.",
          access: { kind: "link", value: "https://mediaexchange.accenture.com/media/t/1_opa50tcn" },
          ownerPublisher: "Unverified",
          lastUpdated: "Unverified",
          audience: ["practitioner"],
          tools: ["Prompting (general)"],
          verificationStatus: "Unverified"
        }
      ]
    },
    {
      section: "Support & Community",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      resources: [
        {
          id: "viva-engage-m365-copilot-community",
          title: "Viva Engage community: Microsoft 365 Copilot",
          type: "community",
          description: "Official community publishing Responsible AI Use Guide campaign posts, tips, and resource drops with Q&A threads.",
          access: { kind: "community", value: "Viva Engage group (Microsoft 365 Copilot)" },
          ownerPublisher: "M365 Copilot",
          lastUpdated: "Active Feb–Mar 2026",
          audience: ["beginner", "practitioner", "leadership"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        },
        {
          id: "viva-engage-genai-sdlc-community",
          title: "Viva Engage community: Generative AI in SDLC",
          type: "community",
          description: "Developer-focused community where Copilot Studio governance/user guide resources were published.",
          access: { kind: "community", value: "Viva Engage group (Generative AI in SDLC)" },
          ownerPublisher: "Community posters (varies)",
          lastUpdated: "Dec 2025–Mar 2026",
          audience: ["developer"],
          tools: ["Copilot Studio"],
          verificationStatus: "Verified"
        },
        {
          id: "faq-thread-responsible-use-question",
          title: "MS 365 Copilot responsible use — question",
          type: "community",
          description: "Compliance-focused question thread about sensitive client data exposure and data residency concerns; useful as an FAQ entry point.",
          access: { kind: "communityPost", value: "Viva Engage Q&A thread" },
          ownerPublisher: "Verkner, Pavel",
          lastUpdated: "December 4th, 2025",
          audience: ["beginner", "practitioner"],
          tools: ["Microsoft 365 Copilot"],
          verificationStatus: "Verified"
        }
      ]
    }
  ]
};

// ---- Utility: slugify type for CSS class ----
function typeSlug(type) {
  return type.toLowerCase().replace(/\s+/g, '-');
}

// ---- Access icon by kind ----
function accessIcon(kind) {
  const icons = {
    file: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    link: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    workday: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    communityPost: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    community: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  };
  return icons[kind] || icons.link;
}

function accessLabel(kind) {
  const labels = {
    file: 'File Download',
    link: 'Open Link',
    workday: 'Workday Course',
    communityPost: 'Community Post',
    community: 'Community Group'
  };
  return labels[kind] || 'Open';
}

function verificationLabel(status) {
  if (status.startsWith('Verified')) return { dot: 'verified', label: 'Verified' };
  if (status.startsWith('Partially')) return { dot: 'partial', label: 'Partially Verified' };
  return { dot: 'unverified', label: 'Unverified' };
}

// ---- Render a single card ----
function renderCard(resource) {
  const v = verificationLabel(resource.verificationStatus);
  const tSlug = typeSlug(resource.type);
  const isLink = resource.access.kind === 'link' || resource.access.kind === 'workday';
  const accessUrl = isLink ? resource.access.value : '#';
  const accessTarget = isLink ? 'target="_blank" rel="noopener"' : '';

  return `
    <article class="resource-card" data-id="${resource.id}" data-type="${tSlug}" data-audience='${JSON.stringify(resource.audience)}' data-tools='${JSON.stringify(resource.tools)}'>
      <div class="card-top">
        <div class="card-badges">
          <span class="type-badge ${tSlug}">${resource.type}</span>
        </div>
        <span class="verification-indicator">
          <span class="verification-dot ${v.dot}"></span>
          ${v.label}
        </span>
      </div>
      <h3 class="card-title">${resource.title}</h3>
      <p class="card-description">${resource.description}</p>
      <div class="card-tools">
        ${resource.tools.map(t => `<span class="tool-pill">${t}</span>`).join('')}
      </div>
      <div class="card-audience">
        ${resource.audience.map(a => `<span class="audience-tag ${a}">${a}</span>`).join('')}
      </div>
      <div class="card-meta">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${resource.ownerPublisher}
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${resource.lastUpdated}
        </span>
      </div>
      <a class="card-access" href="${accessUrl}" ${accessTarget}>
        ${accessIcon(resource.access.kind)}
        <span>${accessLabel(resource.access.kind)}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </article>
  `;
}

// ---- Render all sections ----
function renderSections() {
  const main = document.getElementById('resources-main');
  if (!main) return;

  let totalResources = 0;
  let html = '';

  RESOURCE_DATA.sections.forEach((section, idx) => {
    totalResources += section.resources.length;
    html += `
      <section class="resource-section" data-section="${section.section}" id="section-${idx}">
        <div class="section-heading">
          <div class="section-heading-icon">${section.icon}</div>
          <h2>${section.section}</h2>
          <span class="resource-count">${section.resources.length} resource${section.resources.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="resources-grid">
          ${section.resources.map(r => renderCard(r)).join('')}
        </div>
      </section>
    `;
  });

  main.innerHTML = html;

  // Update total count
  const countEl = document.getElementById('total-count');
  if (countEl) countEl.textContent = totalResources;
  const footerCount = document.getElementById('footer-resource-count');
  if (footerCount) footerCount.textContent = totalResources;
}

// ---- Render filter tabs ----
function renderFilterTabs() {
  const bar = document.getElementById('filter-bar-inner');
  if (!bar) return;

  let html = `<button class="section-filter-btn active" data-section="all">All</button>`;
  RESOURCE_DATA.sections.forEach(s => {
    html += `<button class="section-filter-btn" data-section="${s.section}">${s.section}</button>`;
  });

  // Add divider + dropdown filters
  html += `<span class="filter-divider"></span>`;

  // Type filter
  const allTypes = [...new Set(RESOURCE_DATA.sections.flatMap(s => s.resources.map(r => r.type)))];
  html += `
    <div class="filter-dropdown" id="type-filter">
      <button class="filter-dropdown-btn" type="button">
        Type
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="filter-dropdown-menu">
        ${allTypes.map(t => `
          <div class="filter-option" data-value="${typeSlug(t)}">
            <span class="filter-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            <span>${t}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Audience filter
  const allAudiences = [...new Set(RESOURCE_DATA.sections.flatMap(s => s.resources.flatMap(r => r.audience)))];
  html += `
    <div class="filter-dropdown" id="audience-filter">
      <button class="filter-dropdown-btn" type="button">
        Audience
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="filter-dropdown-menu">
        ${allAudiences.map(a => `
          <div class="filter-option" data-value="${a}">
            <span class="filter-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            <span>${a}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  bar.innerHTML = html;
}

// ---- Filter state ----
let activeSection = 'all';
let activeTypes = [];
let activeAudiences = [];
let searchQuery = '';

function applyFilters() {
  const sections = document.querySelectorAll('.resource-section');
  const noResults = document.getElementById('no-results');
  let totalVisible = 0;

  sections.forEach(sec => {
    const sectionName = sec.dataset.section;
    // Section filter
    if (activeSection !== 'all' && sectionName !== activeSection) {
      sec.classList.add('hidden');
      return;
    }
    sec.classList.remove('hidden');

    const cards = sec.querySelectorAll('.resource-card');
    let sectionVisible = 0;

    cards.forEach(card => {
      let visible = true;

      // Type filter
      if (activeTypes.length > 0) {
        const cardType = card.dataset.type;
        if (!activeTypes.includes(cardType)) visible = false;
      }

      // Audience filter
      if (visible && activeAudiences.length > 0) {
        const cardAudience = JSON.parse(card.dataset.audience);
        if (!activeAudiences.some(a => cardAudience.includes(a))) visible = false;
      }

      // Search
      if (visible && searchQuery) {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-description').textContent.toLowerCase();
        const tools = card.querySelector('.card-tools').textContent.toLowerCase();
        const q = searchQuery.toLowerCase();
        if (!title.includes(q) && !desc.includes(q) && !tools.includes(q)) visible = false;
      }

      if (visible) {
        card.classList.remove('hidden-card');
        sectionVisible++;
        totalVisible++;
      } else {
        card.classList.add('hidden-card');
      }
    });

    // Hide entire section if no cards visible
    if (sectionVisible === 0 && activeSection === 'all') {
      sec.classList.add('hidden');
    }
  });

  // Update search count
  const searchCount = document.getElementById('search-count');
  if (searchCount) {
    if (searchQuery || activeTypes.length || activeAudiences.length || activeSection !== 'all') {
      searchCount.style.opacity = '1';
      searchCount.textContent = `${totalVisible} resource${totalVisible !== 1 ? 's' : ''} found`;
    } else {
      searchCount.style.opacity = '0';
    }
  }

  // No results
  if (noResults) {
    if (totalVisible === 0) {
      noResults.classList.add('visible');
    } else {
      noResults.classList.remove('visible');
    }
  }
}

// ---- Event setup ----
function setupEvents() {
  // Section tab clicks
  document.getElementById('filter-bar-inner')?.addEventListener('click', e => {
    const btn = e.target.closest('.section-filter-btn');
    if (!btn) return;

    document.querySelectorAll('.section-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSection = btn.dataset.section;
    applyFilters();
  });

  // Dropdown toggles
  document.querySelectorAll('.filter-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const dropdown = btn.closest('.filter-dropdown');
      const wasOpen = dropdown.classList.contains('open');
      // Close all
      document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));
      if (!wasOpen) dropdown.classList.add('open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.filter-dropdown').forEach(d => d.classList.remove('open'));
  });

  // Filter option clicks
  document.querySelectorAll('.filter-dropdown-menu').forEach(menu => {
    menu.addEventListener('click', e => {
      e.stopPropagation();
      const option = e.target.closest('.filter-option');
      if (!option) return;

      option.classList.toggle('selected');
      const dropdown = option.closest('.filter-dropdown');
      const dropdownBtn = dropdown.querySelector('.filter-dropdown-btn');
      const selectedOptions = dropdown.querySelectorAll('.filter-option.selected');

      if (dropdown.id === 'type-filter') {
        activeTypes = [...selectedOptions].map(o => o.dataset.value);
      } else if (dropdown.id === 'audience-filter') {
        activeAudiences = [...selectedOptions].map(o => o.dataset.value);
      }

      // Update button state
      if (selectedOptions.length > 0) {
        dropdownBtn.classList.add('has-selection');
      } else {
        dropdownBtn.classList.remove('has-selection');
      }

      applyFilters();
    });
  });

  // Search
  const searchBar = document.getElementById('search-bar');
  const searchClear = document.getElementById('search-clear');
  if (searchBar) {
    searchBar.addEventListener('input', () => {
      searchQuery = searchBar.value.trim();
      if (searchClear) {
        searchClear.classList.toggle('visible', searchQuery.length > 0);
      }
      applyFilters();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchBar.value = '';
      searchQuery = '';
      searchClear.classList.remove('visible');
      applyFilters();
    });
  }

  // Card spotlight effect
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.resource-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Filter bar sticky effect
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const observer = new IntersectionObserver(
      ([entry]) => filterBar.classList.toggle('stuck', !entry.isIntersecting),
      { threshold: [1], rootMargin: '-70px 0px 0px 0px' }
    );
    observer.observe(filterBar);
  }

  // Submit FAB & modal
  const fab = document.getElementById('submit-fab');
  const modal = document.getElementById('submit-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = modal?.querySelector('.modal-backdrop');

  if (fab && modal) {
    fab.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  [closeBtn, backdrop].forEach(el => {
    el?.addEventListener('click', () => {
      modal?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Submit form handler
  const form = document.getElementById('submit-resource-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      // Collect audience checkboxes
      data.audience = [...form.querySelectorAll('input[name="audience"]:checked')].map(i => i.value);

      console.log('Resource submission:', data);

      // Show success state
      form.style.display = 'none';
      document.getElementById('submit-success')?.classList.add('visible');

      // Reset after 3s
      setTimeout(() => {
        form.style.display = '';
        form.reset();
        document.getElementById('submit-success')?.classList.remove('visible');
        modal?.classList.remove('active');
        document.body.style.overflow = '';
      }, 3000);
    });
  }

  // Hamburger mobile menu
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
}

// ---- Intersection Observer for card entrance ----
function setupCardAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.resource-card').forEach(card => {
    observer.observe(card);
  });
}

// ---- Animate hero on load ----
function animateHero() {
  const els = document.querySelectorAll('.hero-animate');
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150 + i * 150);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderFilterTabs();
  renderSections();
  setupEvents();
  setupCardAnimations();
  animateHero();
});
