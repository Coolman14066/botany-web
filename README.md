# Botany AI Innovators 🌱

A modern, static landing page for Botany — Accenture S&C's peer-driven AI upskilling community.

## What is Botany?

**Botany** (Building Organic Tech & AI Nerd Enrichment) is a community of ~90 AI practitioners across strategy, consulting, technology, and operations who learn nerd-to-nerd through applied, hands-on AI experimentation.

## Features

- 🏆 **AI Champions Leaderboard** — ranked by hours saved, use cases submitted, and AI comfort level
- 🌿 **Pod Assignments** — Phase 3 (current) and Phase 2 (archive) pod cards with leads and members
- 📊 **Analytics** — tool adoption charts, barrier analysis, recommendation rate
- 🖼️ **Innovation Gallery** — collapsible use case showcase
- 📝 **Join Botany Form** — 4-step intake wizard (connects to Supabase when configured)
- 💡 **Suggest a Pod Idea** — community submission modal

## Tech Stack

- **HTML + Vanilla CSS + Vanilla JS** — zero framework, fully static
- **Vite** — local dev server
- **Supabase** (optional) — form submission backend
- **CSV-driven** — leaderboard and gallery data from `Botany Planting Value Tracker - Copy(Sheet1).csv`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Supabase Setup (optional)

1. Create a free project at [supabase.com](https://supabase.com)
2. Create tables: `intake_submissions` and `pod_ideas`
3. In `app.js`, fill in:
   ```js
   const SUPABASE_URL = 'your-project-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

## Deployment

This site is fully static — deploy anywhere:
- **Netlify**: drag and drop the project folder, or connect GitHub
- **GitHub Pages**: point to the repo root

---

*Botany Group | Accenture © 2025*
