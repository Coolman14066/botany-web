import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ICONS } from '../../lib/constants';
import './AnalyticsPanel.css';

function BarChart({ data, label }) {
    const maxValue = Math.max(...Object.values(data), 1);
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return (
        <div className="bar-chart">
            {sorted.map(([name, count]) => (
                <div key={name} className="bar-item">
                    <span className="bar-label">{name.length > 30 ? name.substring(0, 30) + '...' : name}</span>
                    <div className="bar-track">
                        <motion.div
                            className="bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(count / maxValue) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        >
                            {count}
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AnalyticsPanel({ toolStats = {}, barrierStats = {}, recommendRate = 0, avgComfort = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section id="analytics" className="analytics-section page-section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <div className="section-title">
                        <div className="section-icon">{ICONS.chart}</div>
                        <h2>Adoption Insights</h2>
                    </div>
                </div>

                <div className="analytics-grid">
                    <motion.div className="analytics-card glass-card" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }}>
                        <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'6px'}}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>Tool Adoption</h3>
                        <p className="analytics-desc">Number of use cases per AI tool</p>
                        <BarChart data={toolStats} label="Tool" />
                    </motion.div>

                    <motion.div className="analytics-card glass-card" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
                        <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'6px'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Common Barriers</h3>
                        <p className="analytics-desc">Top challenges reported by innovators</p>
                        <BarChart data={barrierStats} label="Barrier" />
                    </motion.div>

                    <motion.div className="analytics-card glass-card" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
                        <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'6px'}}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>Recommendation Rate</h3>
                        <p className="analytics-desc">Percentage who would recommend their use case</p>
                        <div className="metric-display">
                            <span className="metric-value">{recommendRate}%</span>
                            <span className="metric-label">Would Recommend</span>
                        </div>
                    </motion.div>

                    <motion.div className="analytics-card glass-card" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
                        <h3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'6px'}}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>Average Comfort</h3>
                        <p className="analytics-desc">Self-reported AI tool confidence (1-5)</p>
                        <div className="metric-display">
                            <span className="metric-value">{avgComfort}</span>
                            <span className="metric-label">Out of 5</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
