import { useState } from 'react';
import { motion } from 'framer-motion';
import { PHASE_3_PODS, PHASE_2_PODS, getInitials, ICONS } from '../lib/constants';
import './TeamsPage.css';

const pageAnim = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } };

export default function TeamsPage() {
    const [phase, setPhase] = useState(3);
    const pods = phase === 3 ? PHASE_3_PODS : PHASE_2_PODS;

    return (
        <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit">
            <section className="teams-page page-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-title">
                            <div className="section-icon">{ICONS.users}</div>
                            <h2>Botany Teams</h2>
                        </div>
                        <div className="filter-tabs">
                            <button className={`filter-tab ${phase === 3 ? 'active' : ''}`} onClick={() => setPhase(3)}>Phase 3 — Current</button>
                            <button className={`filter-tab ${phase === 2 ? 'active' : ''}`} onClick={() => setPhase(2)}>Phase 2 — Archive</button>
                        </div>
                    </div>

                    <p className="teams-subtitle">Explore pods and find your crew. Each team tackles a real consulting challenge using AI.</p>

                    <div className="teams-grid">
                        {pods.map((pod, i) => {
                            const totalMembers = pod.leads.length + pod.members.length;
                            return (
                                <motion.div
                                    key={`${phase}-${pod.id}`}
                                    className="team-card glass-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: i * 0.04 }}
                                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(74,222,128,0.08)' }}
                                >
                                    <div className="team-card-top">
                                        <span className="team-number">{typeof pod.id === 'number' ? `#${pod.id}` : '—'}</span>
                                        <span className="team-member-count">{totalMembers} members</span>
                                    </div>
                                    <h3 className="team-name">{pod.name}</h3>
                                    <p className="team-desc">{pod.description}</p>

                                    {pod.leads.length > 0 && (
                                        <div className="team-leads">
                                            <span className="team-label">Leads</span>
                                            <div className="team-avatars">
                                                {pod.leads.map(name => (
                                                    <div key={name} className="team-avatar-row">
                                                        <div className="avatar avatar-sm" style={{ background: 'var(--accent-green)', color: 'var(--text-inverse)' }}>
                                                            {getInitials(name)}
                                                        </div>
                                                        <span>{name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {pod.members.length > 0 && (
                                        <div className="team-members">
                                            <span className="team-label">Members</span>
                                            <div className="team-chips">
                                                {pod.members.map(name => <span key={name} className="team-chip">{name}</span>)}
                                            </div>
                                        </div>
                                    )}

                                    {totalMembers === 0 && <p className="team-empty">Open for sign-ups!</p>}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
