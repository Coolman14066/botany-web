import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import './JoinForm.css';

const steps = [
    { id: 1, label: 'Personal' },
    { id: 2, label: 'AI & You' },
    { id: 3, label: 'Pods & Roles' },
    { id: 4, label: 'Submit' },
];

export default function JoinForm() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', location: '', role: '',
        comfort: '', ai_relationship: '', colleagues: 0, hours: 0, clientWork: false,
        participation: '', podInterest: false, leadInterest: false,
        leadershipRole: '', podIdeas: '', questions: '',
    });

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email) { setStep(1); return; }
        setSending(true);
        try {
            const payload = {
                name: form.name, email: form.email,
                office_location: form.location, intake_role: form.role,
                ai_comfort: parseInt(form.comfort) || null,
                ai_relationship: form.ai_relationship,
                colleagues_introduced: parseInt(form.colleagues) || 0,
                used_in_client_work: form.clientWork,
                hours_saved_per_week: parseFloat(form.hours) || 0,
                participation_preference: form.participation,
                interested_in_pod: form.podInterest,
                interested_in_leading: form.leadInterest,
                leadership_role: form.leadershipRole,
                pod_ideas: form.podIdeas, questions: form.questions,
            };
            const { error } = await supabase.from('intake_submissions').insert([payload]);
            if (error) throw error;
            setSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            alert('Error submitting. Please try again.');
        }
        setSending(false);
    }

    if (submitted) {
        return (
            <section id="join" className="join-section page-section">
                <div className="container">
                    <motion.div className="join-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
                        <div className="join-success-icon">🌱</div>
                        <h3>Welcome to Botany!</h3>
                        <p>Your application has been submitted. We'll be in touch soon!</p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="join" className="join-section page-section">
            <div className="container">
                <div className="section-header" style={{ justifyContent: 'center' }}>
                    <div className="section-title">
                        <div className="section-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
                        </div>
                        <h2>Join Botany</h2>
                    </div>
                </div>
                <p className="join-subtitle">Become part of the AI upskilling community.</p>

                {/* Step indicator */}
                <div className="step-indicator">
                    {steps.map((s, i) => (
                        <div key={s.id} className="step-row">
                            <button
                                className={`step-dot ${step >= s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}
                                onClick={() => setStep(s.id)}
                            >
                                <span>{s.id}</span>
                                <small>{s.label}</small>
                            </button>
                            {i < steps.length - 1 && <div className={`step-line ${step > s.id ? 'active' : ''}`} />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="intake-form">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" className="intake-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3>Personal & Role Info</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Full Name <span className="required">*</span></label>
                                        <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. Jane Smith" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email <span className="required">*</span></label>
                                        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="jane.smith@accenture.com" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Office / Location <span className="required">*</span></label>
                                        <select value={form.location} onChange={e => set('location', e.target.value)} required>
                                            <option value="">Select your office</option>
                                            {['Arlington', 'Atlanta', 'Austin', 'Boston', 'Charlotte', 'Chicago', 'DC', 'Denver', 'Houston', 'LA', 'Minneapolis', 'NYC', 'Philadelphia', 'San Francisco', 'Seattle', 'Tampa', 'Toronto', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Current Role <span className="required">*</span></label>
                                        <div className="role-cards">
                                            {['Analyst', 'Consultant', 'Manager', 'Senior Manager', 'Other'].map(r => (
                                                <label key={r} className={`role-card ${form.role === r ? 'selected' : ''}`}>
                                                    <input type="radio" name="role" value={r} checked={form.role === r} onChange={() => set('role', r)} />
                                                    <span>{r}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <div />
                                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>Next →</button>
                                </div>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div key="s2" className="intake-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3>AI & Participation</h3>
                                <div className="form-grid">
                                    <div className="form-group form-full">
                                        <label className="form-label">Comfort with AI <span className="required">*</span></label>
                                        <div className="comfort-dots">
                                            {[1, 2, 3, 4, 5].map(v => (
                                                <button key={v} type="button" className={`comfort-dot ${parseInt(form.comfort) >= v ? 'active' : ''}`} onClick={() => set('comfort', v)}>{v}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group form-full">
                                        <label className="form-label">Your AI relationship <span className="required">*</span></label>
                                        <div className="rel-cards">
                                            {[{ v: 'experimenting', e: '🧪', t: "I'm actively experimenting" }, { v: 'transforming', e: '🚀', t: 'AI is transforming my work' }, { v: 'curious', e: '🌱', t: "Sounds exciting, haven't tried" }].map(r => (
                                                <label key={r.v} className={`rel-card ${form.ai_relationship === r.v ? 'selected' : ''}`}>
                                                    <input type="radio" name="ai_rel" value={r.v} checked={form.ai_relationship === r.v} onChange={() => set('ai_relationship', r.v)} />
                                                    <span className="rel-emoji">{r.e}</span><span>{r.t}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Colleagues introduced to AI</label>
                                        <input type="number" value={form.colleagues} onChange={e => set('colleagues', e.target.value)} min="0" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Hours AI saves per week</label>
                                        <input type="number" value={form.hours} onChange={e => set('hours', e.target.value)} min="0" />
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next →</button>
                                </div>
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div key="s3" className="intake-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3>Pods & Roles</h3>
                                <div className="form-grid">
                                    <div className="form-group form-full">
                                        <label className="form-label">Active or passive? <span className="required">*</span></label>
                                        <div className="part-cards">
                                            {[{ v: 'active', icon: '🌿', t: 'I WANT TO BE A BOTANIST', d: 'Hands-on, actively building with AI' }, { v: 'passive', icon: '👂', t: 'Passive Listener', d: "I'd love readouts but can't commit this cycle" }].map(p => (
                                                <label key={p.v} className={`part-card ${form.participation === p.v ? 'selected' : ''}`}>
                                                    <input type="radio" name="part" value={p.v} checked={form.participation === p.v} onChange={() => set('participation', p.v)} />
                                                    <span className="part-icon">{p.icon}</span>
                                                    <strong>{p.t}</strong>
                                                    <small>{p.d}</small>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group form-full">
                                        <label className="form-label">Pod ideas?</label>
                                        <textarea value={form.podIdeas} onChange={e => set('podIdeas', e.target.value)} rows="3" placeholder="Describe a problem that pods could tackle..." />
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
                                    <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>Next →</button>
                                </div>
                            </motion.div>
                        )}
                        {step === 4 && (
                            <motion.div key="s4" className="intake-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <h3>Almost Done!</h3>
                                <div className="form-grid">
                                    <div className="form-group form-full">
                                        <label className="form-label">Any questions for the Botany team?</label>
                                        <textarea value={form.questions} onChange={e => set('questions', e.target.value)} rows="4" placeholder="Anything you want us to know..." />
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>← Back</button>
                                    <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? '🌱 Sending...' : '🌱 Submit Application'}</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </section>
    );
}
