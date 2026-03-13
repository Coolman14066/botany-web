import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getInitials, ICONS, TIERS } from '../lib/constants';
import './ProfilePage.css';

const pageAnim = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0 },
};

const TIER_PLANTS = {
    planted: { emoji: '', label: 'Seed', desc: 'Just getting started — plant your first use case!' },
    seedling: { emoji: '', label: 'Seedling', desc: 'Growing roots — your AI journey has begun.' },
    pollinator: { emoji: '', label: 'Pollinator', desc: 'Spreading knowledge — you\'re making an impact.' },
    propagator: { emoji: '', label: 'Propagator', desc: 'A tree of innovation — leading the way.' },
};

export default function ProfilePage() {
    const { id } = useParams();
    const { profile: myProfile, updateProfile } = useAuth();
    const [viewProfile, setViewProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const isOwnProfile = !id || id === myProfile?.id;

    useEffect(() => {
        if (isOwnProfile) {
            setViewProfile(myProfile);
        } else {
            supabase.from('profiles').select('*').eq('id', id).single().then(({ data }) => setViewProfile(data));
        }
    }, [id, myProfile, isOwnProfile]);

    const p = viewProfile;
    if (!p) return <div className="container page-section" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading profile...</div>;

    const tier = p.tier || 'planted';
    const plant = TIER_PLANTS[tier] || TIER_PLANTS.planted;

    async function saveProfile() {
        await updateProfile(editForm);
        setEditing(false);
    }

    return (
        <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit">
            <section className="profile-page page-section">
                <div className="container">
                    <div className="profile-layout">
                        {/* Main Card */}
                        <motion.div className="profile-card glass-card" whileHover={{ boxShadow: '0 8px 40px rgba(74,222,128,0.1)' }}>
                            <div className="profile-card-top" data-tier={tier}>
                                <motion.div
                                    className="profile-plant-visual"
                                    animate={{ rotate: [0, 2, -2, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <span className="plant-emoji">{plant.emoji}</span>
                                </motion.div>
                                <div className="profile-avatar" style={{ background: p.avatar_color || 'var(--accent-green)' }}>
                                    {getInitials(p.display_name || p.email)}
                                </div>
                            </div>
                            <div className="profile-card-body">
                                <h2 className="profile-name">{p.display_name || p.email?.split('@')[0]}</h2>
                                <p className="profile-email">{p.email}</p>
                                <span className={`tier-badge ${tier}`}>{ICONS[tier] || ICONS.planted} {(TIERS[tier]?.name || 'Planted')}</span>
                                <p className="profile-tier-desc">{plant.desc}</p>
                                {p.bio && <p className="profile-bio">{p.bio}</p>}
                                {p.location && <p className="profile-location">{p.location}</p>}
                                {p.role && <p className="profile-role">{p.role}</p>}
                                {p.is_botanist && <span className="botanist-badge">Botanist</span>}
                                {p.is_admin && <span className="admin-badge">Admin</span>}

                                {isOwnProfile && !editing && (
                                    <button className="btn btn-secondary edit-profile-btn" onClick={() => { setEditForm({ display_name: p.display_name || '', bio: p.bio || '', location: p.location || '', role: p.role || '', avatar_color: p.avatar_color || '#4ade80' }); setEditing(true); }}>
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        {/* Stats Sidebar */}
                        <div className="profile-stats-grid">
                            {[
                                { label: 'Hours Saved', value: Math.round(p.total_hours_saved || 0), color: 'var(--accent-green)' },
                                { label: 'Use Cases', value: p.total_use_cases || 0, color: 'var(--accent-emerald)' },
                                { label: 'Avg Comfort', value: (p.avg_comfort || 0).toFixed(1), color: 'var(--accent-gold)' },
                                { label: 'Member Since', value: p.joined_at ? new Date(p.joined_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—', color: 'var(--text-secondary)' },
                            ].map(stat => (
                                <motion.div key={stat.label} className="profile-stat glass-card" whileHover={{ y: -2 }}>
                                    <span className="profile-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                                    <span className="profile-stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Edit Modal */}
                    {editing && (
                        <div className="edit-overlay" onClick={() => setEditing(false)}>
                            <motion.div className="edit-modal glass-card" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <h3>Edit Profile</h3>
                                <div className="form-grid" style={{ gap: 'var(--space-md)' }}>
                                    <div className="form-group">
                                        <label className="form-label">Display Name</label>
                                        <input value={editForm.display_name} onChange={e => setEditForm({ ...editForm, display_name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Location</label>
                                        <input value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Role</label>
                                        <input value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Avatar Color</label>
                                        <input type="color" value={editForm.avatar_color} onChange={e => setEditForm({ ...editForm, avatar_color: e.target.value })} style={{ height: 40, padding: 2 }} />
                                    </div>
                                    <div className="form-group form-full">
                                        <label className="form-label">Bio</label>
                                        <textarea value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} rows="3" placeholder="Tell us about yourself..." />
                                    </div>
                                </div>
                                <div className="step-actions" style={{ marginTop: 'var(--space-lg)' }}>
                                    <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    );
}
