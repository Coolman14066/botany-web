import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { ICONS } from '../../lib/constants';
import './SubmitForm.css';

export default function SubmitForm() {
    const { profile } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [form, setForm] = useState({
        name: profile?.display_name || '', email: profile?.email || '',
        useCase: '', tools: '', hours: '', value: '', challenges: '',
        comfort: 3, barrier: '', recommend: true, clientWork: false,
    });

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.useCase || !form.tools || !form.hours) return;
        setSending(true);
        try {
            const payload = {
                user_id: profile?.id || null,
                name: form.name, email: form.email, use_case: form.useCase,
                tools: form.tools, hours_saved: parseFloat(form.hours) || 0,
                value_created: form.value, challenges: form.challenges,
                comfort_level: form.comfort, barrier: form.barrier,
                recommends: form.recommend, used_in_client_work: form.clientWork,
            };
            const { error } = await supabase.from('use_case_submissions').insert([payload]);
            if (error) throw error;
            setSubmitted(true);
        } catch (err) {
            console.error('Submit error:', err);
            alert('Error submitting. Please try again.');
        }
        setSending(false);
    }

    if (submitted) {
        return (
            <section id="submit" className="submit-section page-section">
                <div className="container">
                    <motion.div className="submit-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <div style={{ fontSize: '3rem' }}>🌿</div>
                        <h3>Use Case Submitted!</h3>
                        <p>Thank you for contributing to the Botany innovation community.</p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="submit" className="submit-section page-section">
            <div className="container">
                <div className="section-header" style={{ justifyContent: 'center' }}>
                    <div className="section-title">
                        <div className="section-icon">{ICONS.send}</div>
                        <h2>Submit Your Use Case</h2>
                    </div>
                </div>
                <p className="submit-subtitle">Already a Botanist? Share your AI innovation and join the leaderboard.</p>

                <form onSubmit={handleSubmit} className="submit-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Full Name <span className="required">*</span></label>
                            <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. Jane Smith" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email <span className="required">*</span></label>
                            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="jane.smith@accenture.com" />
                        </div>
                        <div className="form-group form-full">
                            <label className="form-label">What was the use case? <span className="required">*</span></label>
                            <textarea value={form.useCase} onChange={e => set('useCase', e.target.value)} required rows="3" placeholder="Describe what you did with AI..." />
                        </div>
                        <div className="form-group">
                            <label className="form-label">AI Tools Used <span className="required">*</span></label>
                            <select value={form.tools} onChange={e => set('tools', e.target.value)} required>
                                <option value="">Select a tool</option>
                                <option value="Enterprise GPT">Enterprise GPT</option>
                                <option value="Copilot">Copilot</option>
                                <option value="Amethyst">Amethyst</option>
                                <option value="Nano Banana Pro">Nano Banana Pro</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Hours saved <span className="required">*</span></label>
                            <input value={form.hours} onChange={e => set('hours', e.target.value)} required placeholder="e.g. 5 or 10-15" />
                        </div>
                        <div className="form-group form-full">
                            <label className="form-label">How did this create value?</label>
                            <textarea value={form.value} onChange={e => set('value', e.target.value)} rows="3" placeholder="Explain the impact..." />
                        </div>
                        <div className="form-group form-full">
                            <label className="form-label">Challenges encountered?</label>
                            <textarea value={form.challenges} onChange={e => set('challenges', e.target.value)} rows="2" placeholder="Any blockers..." />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Comfort level (1-5)</label>
                            <input type="range" min="1" max="5" value={form.comfort} onChange={e => set('comfort', parseInt(e.target.value))} className="comfort-slider" />
                            <span className="slider-value">{form.comfort}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Biggest barrier</label>
                            <select value={form.barrier} onChange={e => set('barrier', e.target.value)}>
                                <option value="">Select a barrier</option>
                                <option value="Technical limitations">Technical limitations</option>
                                <option value="Unclear best practices">Unclear best practices</option>
                                <option value="Lack of time">Lack of time</option>
                                <option value="Security/compliance concerns">Security/compliance</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="submit-actions">
                        <motion.button type="submit" className="btn btn-primary" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            {sending ? '🌿 Submitting...' : '🌿 Submit Use Case'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </section>
    );
}
