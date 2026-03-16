/**
 * FEEDBACK WIDGET — "Help Us Improve"
 * ====================================
 * Self-contained floating widget for feature requests / ideas.
 * Connects to Supabase `feature_requests` table.
 * Include this script + feedback-widget.css on any page.
 */
(function () {
  'use strict';

  // ---- Supabase config (same as main app) ----
  const SB_URL = 'https://pfpgnuuaueqpitfyfhko.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGdudXVhdWVxcGl0ZnlmaGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDM0MDMsImV4cCI6MjA4Nzc3OTQwM30.wDSbj24oklscbYUaZvhIIm6E2lD6gZrZ5K0PA9FozLA';

  let sb = null;

  // Reuse existing supabase client if available, else create our own
  function getSB() {
    if (sb) return sb;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      sb = window.supabase.createClient(SB_URL, SB_KEY);
    }
    return sb;
  }

  // Track upvotes locally to prevent double-voting in same session
  const votedIds = new Set(JSON.parse(sessionStorage.getItem('fb-votes') || '[]'));
  function saveVotes() {
    sessionStorage.setItem('fb-votes', JSON.stringify([...votedIds]));
  }

  // ---- SVG Icons ----
  const ICONS = {
    lightbulb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    pencil: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    browse: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    arrowUp: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
    chevDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    empty: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
  };

  const CATEGORIES = [
    { value: 'feature', label: 'Feature' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'other', label: 'Other' }
  ];

  // ---- Build DOM ----
  function createWidget() {
    // FAB
    const fab = document.createElement('button');
    fab.className = 'feedback-fab';
    fab.id = 'feedback-fab';
    fab.setAttribute('aria-label', 'Open feedback widget');
    fab.innerHTML = `${ICONS.lightbulb}<span>Ideas</span><span class="feedback-fab-dot"></span>`;

    // Panel
    const panel = document.createElement('div');
    panel.className = 'feedback-panel';
    panel.id = 'feedback-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <!-- Header -->
      <div class="feedback-header">
        <div class="feedback-header-left">
          <div class="feedback-header-icon">${ICONS.lightbulb}</div>
          <div>
            <h3>Help Us Improve</h3>
            <p class="feedback-header-sub">Share your ideas with the B.O.T.A.N.Y(E). team</p>
          </div>
        </div>
        <button class="feedback-close" id="feedback-close" aria-label="Close">${ICONS.close}</button>
      </div>

      <!-- Tabs -->
      <div class="feedback-tabs">
        <button class="feedback-tab active" data-tab="submit">${ICONS.pencil} Submit Idea</button>
        <button class="feedback-tab" data-tab="browse">${ICONS.browse} Browse Ideas</button>
      </div>

      <!-- Body -->
      <div class="feedback-body">
        <!-- Submit Tab -->
        <div class="feedback-tab-content active" data-content="submit">
          <form class="feedback-form" id="feedback-form" novalidate>
            <div>
              <label>Category <span class="fb-required">*</span></label>
              <div class="feedback-categories" id="feedback-categories">
                ${CATEGORIES.map((c, i) => `<button type="button" class="feedback-cat-pill${i === 0 ? ' active' : ''}" data-value="${c.value}">${c.label}</button>`).join('')}
              </div>
            </div>
            <div>
              <label for="fb-title">Title <span class="fb-required">*</span></label>
              <input type="text" id="fb-title" placeholder="Summarize your idea in a few words..." required maxlength="120">
            </div>
            <div>
              <label for="fb-desc">Description</label>
              <textarea id="fb-desc" rows="3" placeholder="Add more details if you'd like..." maxlength="1000"></textarea>
            </div>
            <button type="button" class="feedback-optional-toggle" id="fb-optional-toggle">${ICONS.chevDown} Add your name (optional)</button>
            <div class="feedback-optional-fields" id="fb-optional-fields">
              <div>
                <label for="fb-name">Your Name</label>
                <input type="text" id="fb-name" placeholder="e.g. Jane Smith" maxlength="100">
              </div>
              <div>
                <label for="fb-email">Your Email</label>
                <input type="email" id="fb-email" placeholder="jane.smith@accenture.com" maxlength="200">
              </div>
            </div>
            <button type="submit" class="feedback-submit" id="feedback-submit">${ICONS.send} Submit Idea</button>
          </form>

          <div class="feedback-success" id="feedback-success">
            <div class="feedback-success-icon">${ICONS.check}</div>
            <h4>Idea Submitted!</h4>
            <p>Thank you for helping us improve B.O.T.A.N.Y(E).. Your feedback shapes what we build next.</p>
            <button class="feedback-success-btn" id="feedback-another">Submit Another Idea</button>
          </div>
        </div>

        <!-- Browse Tab -->
        <div class="feedback-tab-content" data-content="browse">
          <div class="feedback-ideas-list" id="feedback-ideas-list">
            <div class="feedback-loading"><div class="feedback-spinner"></div></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    bindEvents(fab, panel);
  }

  // ---- Event Bindings ----
  function bindEvents(fab, panel) {
    const closeBtn = panel.querySelector('#feedback-close');
    const form = panel.querySelector('#feedback-form');
    const submitBtn = panel.querySelector('#feedback-submit');
    const successEl = panel.querySelector('#feedback-success');
    const anotherBtn = panel.querySelector('#feedback-another');
    const optionalToggle = panel.querySelector('#fb-optional-toggle');
    const optionalFields = panel.querySelector('#fb-optional-fields');
    const tabs = panel.querySelectorAll('.feedback-tab');
    const tabContents = panel.querySelectorAll('.feedback-tab-content');
    const catPills = panel.querySelectorAll('.feedback-cat-pill');

    // Toggle panel
    fab.addEventListener('click', () => {
      const isHidden = panel.getAttribute('aria-hidden') === 'true';
      panel.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
      fab.classList.toggle('hidden', isHidden);
    });

    closeBtn.addEventListener('click', () => {
      panel.setAttribute('aria-hidden', 'true');
      fab.classList.remove('hidden');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') {
        panel.setAttribute('aria-hidden', 'true');
        fab.classList.remove('hidden');
      }
    });

    // Tabs
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        tabContents.forEach(tc => {
          tc.classList.toggle('active', tc.dataset.content === target);
        });
        if (target === 'browse') {
          loadIdeas();
        }
      });
    });

    // Category pills
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    // Optional fields toggle
    optionalToggle.addEventListener('click', () => {
      const isExpanded = optionalToggle.classList.toggle('expanded');
      optionalFields.classList.toggle('visible', isExpanded);
      optionalToggle.innerHTML = `${ICONS.chevDown} ${isExpanded ? 'Hide optional fields' : 'Add your name (optional)'}`;
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = panel.querySelector('#fb-title').value.trim();
      if (!title) {
        panel.querySelector('#fb-title').focus();
        return;
      }

      const activeCat = panel.querySelector('.feedback-cat-pill.active');
      const category = activeCat ? activeCat.dataset.value : 'feature';
      const description = panel.querySelector('#fb-desc').value.trim();
      const authorName = panel.querySelector('#fb-name').value.trim();
      const authorEmail = panel.querySelector('#fb-email').value.trim();

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<div class="feedback-spinner" style="width:16px;height:16px;border-width:2px;"></div> Sending...`;

      try {
        const client = getSB();
        if (!client) throw new Error('Supabase not available');

        const { error } = await client.from('feature_requests').insert([{
          category,
          title,
          description,
          author_name: authorName,
          author_email: authorEmail,
          page_url: window.location.pathname
        }]);

        if (error) throw error;

        // Show success
        form.style.display = 'none';
        successEl.classList.add('show');

      } catch (err) {
        console.error('Feedback submission error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${ICONS.send} Submit Idea`;
        // Inline error message
        let errMsg = form.querySelector('.feedback-error-msg');
        if (!errMsg) {
          errMsg = document.createElement('p');
          errMsg.className = 'feedback-error-msg';
          errMsg.style.cssText = 'color:#ef4444;font-size:0.78rem;text-align:center;margin-top:4px;';
          form.appendChild(errMsg);
        }
        errMsg.textContent = 'Something went wrong. Please try again.';
        setTimeout(() => errMsg.remove(), 5000);
      }
    });

    // "Submit another" button
    anotherBtn.addEventListener('click', () => {
      form.reset();
      // Reset category pills
      catPills.forEach((p, i) => p.classList.toggle('active', i === 0));
      // Reset optional fields
      optionalToggle.classList.remove('expanded');
      optionalFields.classList.remove('visible');
      optionalToggle.innerHTML = `${ICONS.chevDown} Add your name (optional)`;
      // Show form again
      form.style.display = 'flex';
      successEl.classList.remove('show');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${ICONS.send} Submit Idea`;
    });
  }

  // ---- Load Ideas ----
  async function loadIdeas() {
    const list = document.getElementById('feedback-ideas-list');
    if (!list) return;

    list.innerHTML = '<div class="feedback-loading"><div class="feedback-spinner"></div></div>';

    try {
      const client = getSB();
      if (!client) throw new Error('Supabase not available');

      const { data, error } = await client
        .from('feature_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;

      if (!data || data.length === 0) {
        list.innerHTML = `
          <div class="feedback-ideas-empty">
            ${ICONS.empty}
            <p>No ideas yet — be the first to share yours!</p>
          </div>
        `;
        return;
      }

      list.innerHTML = data.map(idea => renderIdeaCard(idea)).join('');
      bindUpvoteButtons(list);

    } catch (err) {
      console.error('Failed to load ideas:', err);
      list.innerHTML = `
        <div class="feedback-ideas-empty">
          <p style="color:#ef4444">Failed to load ideas. Please try again.</p>
        </div>
      `;
    }
  }

  function renderIdeaCard(idea) {
    const catClass = `cat-${idea.category}`;
    const catLabel = CATEGORIES.find(c => c.value === idea.category)?.label || idea.category;
    const timeAgo = getTimeAgo(idea.created_at);
    const isVoted = votedIds.has(idea.id);
    const authorDisplay = idea.author_name || 'Anonymous';
    const desc = idea.description || '';

    return `
      <div class="feedback-idea-card" data-id="${idea.id}">
        <div class="feedback-idea-top">
          <div class="feedback-idea-title">${escapeHtml(idea.title)}</div>
          <span class="feedback-idea-cat ${catClass}">${catLabel}</span>
        </div>
        ${desc ? `<div class="feedback-idea-desc">${escapeHtml(desc)}</div>` : ''}
        <div class="feedback-idea-footer">
          <span class="feedback-idea-meta">${escapeHtml(authorDisplay)} &middot; ${timeAgo}</span>
          <button class="feedback-upvote-btn${isVoted ? ' voted' : ''}" data-id="${idea.id}" data-votes="${idea.upvotes}" ${isVoted ? 'disabled' : ''}>
            ${ICONS.arrowUp}
            <span>${idea.upvotes}</span>
          </button>
        </div>
      </div>
    `;
  }

  function bindUpvoteButtons(container) {
    container.querySelectorAll('.feedback-upvote-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (votedIds.has(id)) return;

        const currentVotes = parseInt(btn.dataset.votes, 10) || 0;
        const newVotes = currentVotes + 1;

        // Optimistic update
        btn.classList.add('voted');
        btn.disabled = true;
        btn.querySelector('span').textContent = newVotes;
        btn.dataset.votes = newVotes;
        votedIds.add(id);
        saveVotes();

        try {
          const client = getSB();
          if (!client) throw new Error('Supabase not available');

          const { error } = await client
            .from('feature_requests')
            .update({ upvotes: newVotes })
            .eq('id', id);

          if (error) throw error;
        } catch (err) {
          console.error('Upvote error:', err);
          // Revert optimistic update
          btn.classList.remove('voted');
          btn.disabled = false;
          btn.querySelector('span').textContent = currentVotes;
          btn.dataset.votes = currentVotes;
          votedIds.delete(id);
          saveVotes();
        }
      });
    });
  }

  // ---- Utilities ----
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getTimeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // ---- Init on DOM ready ----
  function init() {
    // Wait for Supabase SDK to load (it may be loaded async)
    if (!window.supabase) {
      // Dynamically load the Supabase CDN if not already present
      const existing = document.querySelector('script[src*="supabase"]');
      if (!existing) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
          createWidget();
        };
        document.head.appendChild(script);
        return;
      }
    }
    createWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
