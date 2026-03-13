import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PHASE_3_PODS, PHASE_2_PODS, getInitials, ICONS } from '../../lib/constants';
import './PodsSection.css';

/* Botanical SVG icons for each pod — unique per pod */
const POD_ICONS = [
    /* 1 - Project Management */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="6" width="32" height="36" rx="3" /><path d="M16 14h16M16 22h16M16 30h10" /><circle cx="36" cy="36" r="6" fill="var(--accent-green)" stroke="none" opacity="0.3"/></svg>,
    /* 2 - AI Assistants */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="20" r="12" /><path d="M18 18h0M30 18h0" strokeWidth="2.5" strokeLinecap="round"/><path d="M18 24c2 3 10 3 12 0" /><path d="M24 32v8M16 40h16" /></svg>,
    /* 3 - AI Reshaping Orgs */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 4v40M4 24h40" /><circle cx="24" cy="24" r="16" /><circle cx="24" cy="24" r="8" fill="var(--accent-purple)" opacity="0.15"/></svg>,
    /* 4 - Biz Case */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 38l10-14 8 8 8-12 10 14" /><rect x="6" y="6" width="36" height="36" rx="3" /></svg>,
    /* 5 - PPT Storytelling */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="8" width="40" height="28" rx="3" /><path d="M4 36l20 8 20-8" /><path d="M16 20h16M16 26h10" /></svg>,
    /* 6 - Business Development */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 4l6 12h14l-11 8 4 14-13-9-13 9 4-14-11-8h14z" fill="var(--accent-gold)" opacity="0.15"/></svg>,
    /* 7 - Stock Analyst */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 40V8" /><path d="M6 40h36" /><path d="M12 32l8-10 6 6 10-16" strokeWidth="2"/><circle cx="36" cy="12" r="3" fill="var(--accent-green)" opacity="0.5"/></svg>,
    /* 8 - Client-Facing */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="16" r="10" /><path d="M8 42c0-8 7-14 16-14s16 6 16 14" /><path d="M30 14l4-4M34 14l-4-4" strokeWidth="2"/></svg>,
    /* 9 - Vibecoding #1 */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 8l-8 16 8 16" /><path d="M34 8l8 16-8 16" /><path d="M28 4L20 44" strokeWidth="2"/></svg>,
    /* 10 - Vibecoding #2 */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="32" height="32" rx="4" /><path d="M16 20l4 4-4 4M24 28h8" strokeWidth="2"/></svg>,
    /* 11 - Tactical Hiring */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10h8v8h-8z" /><path d="M14 20h20v22H14z" rx="2" /><path d="M24 28v6M20 32h8" /></svg>,
    /* 12 - PA Support */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 4h24v40H12z" rx="3" /><path d="M18 12h12M18 18h12M18 24h8" /><circle cx="24" cy="36" r="3" /></svg>,
    /* 13 - Agent Catalog */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="20" cy="20" r="12" /><path d="M30 30l12 12" strokeWidth="2.5" /><path d="M16 18h8M16 22h5" /></svg>,
    /* 14 - Process Design */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="6" /><circle cx="36" cy="12" r="6" /><circle cx="24" cy="36" r="6" /><path d="M16 16l6 14M32 16l-6 14" /></svg>,
    /* 15 - Enterprise Claude */
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 4c-11 0-20 9-20 20s9 20 20 20 20-9 20-20S35 4 24 4z" /><path d="M24 14v10l7 7" strokeWidth="2" /><circle cx="24" cy="24" r="3" fill="var(--accent-purple)" opacity="0.3"/></svg>,
];

export default function PodsSection() {
    const [phase, setPhase] = useState(3);
    const ref = useRef(null);
    const scrollRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const pods = phase === 3 ? PHASE_3_PODS : PHASE_2_PODS;

    return (
        <section id="pods" className="pods-section light-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="pods-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label" style={{ color: 'var(--accent-emerald)' }}>
                        FROM OUR COMMUNITY TO YOURS
                    </span>
                    <h2 className="display-heading-sm" style={{ color: 'var(--text-on-cream)' }}>
                        Our Innovation Pods
                    </h2>
                    <div className="pods-phase-toggle">
                        <button className={`phase-btn ${phase === 3 ? 'active' : ''}`} onClick={() => setPhase(3)}>
                            Phase 3 — Current
                        </button>
                        <button className={`phase-btn ${phase === 2 ? 'active' : ''}`} onClick={() => setPhase(2)}>
                            Phase 2 — Archive
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal scrolling carousel */}
            <div className="pods-carousel-wrapper">
                <div className="pods-carousel" ref={scrollRef}>
                    {pods.map((pod, i) => (
                        <motion.div
                            key={`${phase}-${pod.id}`}
                            className="pod-card cream-card"
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5) }}
                            whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                        >
                            <div className="pod-icon-area">
                                {POD_ICONS[i % POD_ICONS.length]}
                            </div>
                            <span className="pod-number">Pod #{typeof pod.id === 'number' ? pod.id : '—'}</span>
                            <h3 className="pod-name">{pod.name}</h3>
                            <p className="pod-description">{pod.description}</p>

                            {pod.leads.length > 0 && (
                                <div className="pod-people">
                                    <span className="pod-people-label">Leads</span>
                                    <div className="pod-avatars">
                                        {pod.leads.map(name => (
                                            <div key={name} className="pod-avatar-chip">
                                                <div className="avatar avatar-sm" style={{ background: 'var(--accent-emerald)', color: '#fff', fontSize: '9px' }}>
                                                    {getInitials(name)}
                                                </div>
                                                <span>{name.split(' ')[0]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pod.members.length > 0 && (
                                <div className="pod-people">
                                    <span className="pod-people-label">Members</span>
                                    <div className="pod-member-chips">
                                        {pod.members.map(name => (
                                            <span key={name} className="pod-member-chip">{name.split(' ')[0]}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pod.leads.length === 0 && pod.members.length === 0 && (
                                <p className="pod-open">Open for sign-ups</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
