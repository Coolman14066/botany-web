import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { getInitials, getTier, parseHours, parseTools, ICONS } from '../../lib/constants';
import './LeaderboardSection.css';

function processCSVData(data) {
    const userMap = new Map();
    data.forEach(row => {
        const name = row['Name'] || '';
        if (!name) return;
        const hours = parseHours(row['Estimated hours saved or impact realized'] || row['How many hours did AI save you this week?']);
        const tools = parseTools(row['Which AI or new tools did you use?']);
        const comfort = parseInt(row['What was your comfort level with AI tools this week?']) || 3;
        const recommends = (row['Would you recommend this use case for others?'] || '').toLowerCase().includes('yes');
        const useCase = row['What was the use case or activity?'] || '';
        const value = row['How did this use case create value for your team or client?'] || '';

        if (userMap.has(name)) {
            const existing = userMap.get(name);
            existing.totalHours += hours;
            existing.useCaseCount++;
            existing.totalComfort += comfort;
            existing.allTools = [...new Set([...existing.allTools, ...tools])];
            existing.useCases.push({ useCase, value, tools, hours });
        } else {
            userMap.set(name, {
                name,
                totalHours: hours,
                useCaseCount: 1,
                totalComfort: comfort,
                allTools: [...tools],
                useCases: [{ useCase, value, tools, hours }],
            });
        }
    });
    return Array.from(userMap.values()).map(u => ({
        ...u,
        avgComfort: (u.totalComfort / u.useCaseCount).toFixed(1),
        tier: getTier(u.totalHours, u.useCaseCount),
    }));
}

function parseCSVLine(line) {
    const result = []; let current = ''; let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
        else current += char;
    }
    result.push(current);
    return result.map(v => v.replace(/^"|"$/g, '').trim());
}

function parseCSV(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = parseCSVLine(lines[0]);
    return lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const row = {};
        headers.forEach((h, i) => { row[h.trim()] = values[i] ? values[i].trim() : ''; });
        return row;
    });
}

export default function LeaderboardSection() {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState('hours');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/data.csv');
                if (res.ok) {
                    const text = await res.text();
                    if (!text.trim().startsWith('<')) {
                        const data = parseCSV(text);
                        setUsers(processCSVData(data));
                    }
                }
            } catch (e) { console.log('CSV not available, using Supabase data'); }
        }
        load();
    }, []);

    const sorted = [...users].sort((a, b) => {
        if (sortBy === 'usecases') return b.useCaseCount - a.useCaseCount;
        if (sortBy === 'comfort') return parseFloat(b.avgComfort) - parseFloat(a.avgComfort);
        return b.totalHours - a.totalHours;
    });
    const top3 = sorted.slice(0, 3);
    const rest = sorted.slice(3);
    const positions = ['first', 'second', 'third'];
    const rankLabels = ['1st', '2nd', '3rd'];

    return (
        <section id="leaderboard" className="leaderboard-section page-section" ref={ref}>
            <div className="container">
                <div className="section-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <span className="section-label" style={{ color: 'var(--accent-green)' }}>THE BEST OF THE BEST</span>
                    <h2 className="display-heading-sm">AI Champions</h2>
                    <div className="filter-tabs">
                        {['hours', 'usecases', 'comfort'].map(key => (
                            <button key={key} className={`filter-tab ${sortBy === key ? 'active' : ''}`} onClick={() => setSortBy(key)}>
                                {key === 'hours' ? 'Hours Saved' : key === 'usecases' ? 'Use Cases' : 'Comfort Level'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Podium */}
                <div className="podium">
                    {top3.map((user, idx) => (
                        <motion.div
                            key={user.name}
                            className={`podium-place ${positions[idx]}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + idx * 0.15 }}
                        >
                            <div className="podium-rank-label">{rankLabels[idx]}</div>
                            <div className="podium-avatar">{getInitials(user.name)}</div>
                            <div className="podium-name">{user.name}</div>
                            <div className="podium-hours">{Math.round(user.totalHours)} hours saved</div>
                            <span className={`tier-badge ${user.tier.className}`}>
                                {ICONS[user.tier.icon]} {user.tier.name}
                            </span>
                            <div className="podium-stand">
                                <span className="podium-stand-rank">{idx + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* List */}
                <div className="leaderboard-list">
                    {rest.map((user, idx) => (
                        <motion.div
                            key={user.name}
                            className="leaderboard-card glass-card"
                            initial={{ opacity: 0, x: -12 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: 0.3 + idx * 0.03 }}
                            whileHover={{ x: 4 }}
                        >
                            <div className="lb-rank">#{idx + 4}</div>
                            <div className="lb-user">
                                <div className="avatar avatar-md" style={{ background: 'var(--bg-surface-hover)', color: 'var(--accent-green)' }}>
                                    {getInitials(user.name)}
                                </div>
                                <div className="lb-info">
                                    <div className="lb-name">{user.name}</div>
                                    <div className="lb-usecase">{user.useCases[0]?.useCase?.substring(0, 50) || 'AI Explorer'}</div>
                                </div>
                            </div>
                            <div className="lb-stats">
                                <div className="lb-hours">
                                    <span className="lb-hours-value">{Math.round(user.totalHours)}</span>
                                    <span className="lb-hours-label">Hours</span>
                                </div>
                            </div>
                            <span className={`tier-badge ${user.tier.className}`}>
                                {ICONS[user.tier.icon]} {user.tier.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
