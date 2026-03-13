import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ICONS, getInitials } from '../lib/constants';
import './AdminPage.css';

const pageAnim = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } };

function StatusBadge({ status }) {
    const colors = { pending: '#fbbf24', approved: '#4ade80', rejected: '#f87171' };
    return <span className="status-badge" style={{ color: colors[status], borderColor: colors[status] + '33', background: colors[status] + '15' }}>{status}</span>;
}

export default function AdminPage() {
    const { profile } = useAuth();
    const [tab, setTab] = useState('intakes');
    const [intakes, setIntakes] = useState([]);
    const [useCases, setUseCases] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, [tab]);

    async function loadData() {
        setLoading(true);
        try {
            if (tab === 'intakes') {
                const { data } = await supabase.from('intake_submissions').select('*').order('submitted_at', { ascending: false });
                setIntakes(data || []);
            } else if (tab === 'usecases') {
                const { data } = await supabase.from('use_case_submissions').select('*').order('submitted_at', { ascending: false });
                setUseCases(data || []);
            } else if (tab === 'users') {
                const { data } = await supabase.from('profiles').select('*').order('joined_at', { ascending: false });
                setUsers(data || []);
            }
        } catch (err) { console.error('Admin load error:', err); }
        setLoading(false);
    }

    async function updateIntakeStatus(id, status, email) {
        await supabase.from('intake_submissions').update({ status, reviewed_by: profile.id }).eq('id', id);
        if (status === 'approved' && email) {
            const { data: userProfile } = await supabase.from('profiles').select('id').eq('email', email).single();
            if (userProfile) await supabase.from('profiles').update({ is_botanist: true }).eq('id', userProfile.id);
        }
        loadData();
    }

    async function updateUseCaseStatus(id, status) {
        await supabase.from('use_case_submissions').update({ status }).eq('id', id);
        loadData();
    }

    async function toggleRole(userId, field, currentValue) {
        await supabase.from('profiles').update({ [field]: !currentValue }).eq('id', userId);
        loadData();
    }

    function exportCSV(data, filename) {
        if (!data.length) return;
        const headers = Object.keys(data[0]);
        const csv = [headers.join(','), ...data.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    }

    const tabs = [
        { id: 'intakes', label: 'Intake Submissions' },
        { id: 'usecases', label: 'Use Cases' },
        { id: 'users', label: 'Users' },
    ];

    return (
        <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit">
            <section className="admin-page page-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-title">
                            <div className="section-icon">{ICONS.shield}</div>
                            <h2>Admin Dashboard</h2>
                        </div>
                    </div>

                    <div className="admin-tabs">
                        {tabs.map(t => (
                            <button key={t.id} className={`admin-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="admin-loading">Loading...</div>
                    ) : (
                        <>
                            {/* Intakes */}
                            {tab === 'intakes' && (
                                <div className="admin-panel">
                                    <div className="admin-toolbar">
                                        <span className="admin-count">{intakes.length} submissions</span>
                                        <button className="btn btn-secondary" onClick={() => exportCSV(intakes, 'intakes.csv')}>Export CSV</button>
                                    </div>
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
                                            <tbody>
                                                {intakes.map(row => (
                                                    <tr key={row.id}>
                                                        <td className="td-name">{row.name}</td>
                                                        <td className="td-muted">{row.email}</td>
                                                        <td>{row.intake_role}</td>
                                                        <td>{row.office_location}</td>
                                                        <td><StatusBadge status={row.status || 'pending'} /></td>
                                                        <td className="td-actions">
                                                            {row.status === 'pending' && (
                                                                <>
                                                                    <button className="action-btn approve" onClick={() => updateIntakeStatus(row.id, 'approved', row.email)}>✓</button>
                                                                    <button className="action-btn reject" onClick={() => updateIntakeStatus(row.id, 'rejected', row.email)}>✗</button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Use Cases */}
                            {tab === 'usecases' && (
                                <div className="admin-panel">
                                    <div className="admin-toolbar">
                                        <span className="admin-count">{useCases.length} submissions</span>
                                        <button className="btn btn-secondary" onClick={() => exportCSV(useCases, 'use_cases.csv')}>Export CSV</button>
                                    </div>
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead><tr><th>Name</th><th>Use Case</th><th>Tools</th><th>Hours</th><th>Status</th><th>Actions</th></tr></thead>
                                            <tbody>
                                                {useCases.map(row => (
                                                    <tr key={row.id}>
                                                        <td className="td-name">{row.name}</td>
                                                        <td style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.use_case}</td>
                                                        <td>{row.tools}</td>
                                                        <td>{row.hours_saved}</td>
                                                        <td><StatusBadge status={row.status || 'pending'} /></td>
                                                        <td className="td-actions">
                                                            {row.status !== 'approved' && <button className="action-btn approve" onClick={() => updateUseCaseStatus(row.id, 'approved')}>✓</button>}
                                                            {row.status !== 'rejected' && <button className="action-btn reject" onClick={() => updateUseCaseStatus(row.id, 'rejected')}>✗</button>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Users */}
                            {tab === 'users' && (
                                <div className="admin-panel">
                                    <div className="admin-toolbar">
                                        <span className="admin-count">{users.length} users</span>
                                        <button className="btn btn-secondary" onClick={() => exportCSV(users, 'users.csv')}>Export CSV</button>
                                    </div>
                                    <div className="admin-table-wrap">
                                        <table className="admin-table">
                                            <thead><tr><th>User</th><th>Email</th><th>Tier</th><th>Botanist</th><th>Admin</th></tr></thead>
                                            <tbody>
                                                {users.map(u => (
                                                    <tr key={u.id}>
                                                        <td className="td-name">
                                                            <div className="avatar avatar-sm" style={{ background: u.avatar_color || 'var(--accent-green)', color: '#060e08', display: 'inline-flex', marginRight: 8 }}>
                                                                {getInitials(u.display_name || u.email)}
                                                            </div>
                                                            {u.display_name || u.email?.split('@')[0]}
                                                        </td>
                                                        <td className="td-muted">{u.email}</td>
                                                        <td><span className={`tier-badge ${u.tier || 'planted'}`}>{u.tier || 'planted'}</span></td>
                                                        <td>
                                                            <button className={`toggle-btn ${u.is_botanist ? 'on' : ''}`} onClick={() => toggleRole(u.id, 'is_botanist', u.is_botanist)}>
                                                                {u.is_botanist ? 'Yes' : 'No'}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className={`toggle-btn ${u.is_admin ? 'on' : ''}`} onClick={() => toggleRole(u.id, 'is_admin', u.is_admin)}>
                                                                {u.is_admin ? 'Yes' : 'No'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </motion.div>
    );
}
