import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

/* SVG icons for pillars — no emojis */
const PillarIcons = {
    handson: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    collaborate: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    impact: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
};

const pillars = [
    {
        icon: PillarIcons.handson,
        title: 'Hands-On Learning',
        desc: 'Experiment with AI tools, tackle real consulting challenges, and build organic tech skills through applied practice.',
    },
    {
        icon: PillarIcons.collaborate,
        title: 'Nerd-to-Nerd',
        desc: 'Learn from peers across strategy, consulting, technology, and operations in a high-support, low-judgment environment.',
    },
    {
        icon: PillarIcons.impact,
        title: 'Real Impact',
        desc: 'Stronger AI literacy, practical capability, and meaningful improvements to how S&C work gets done at Accenture.',
    },
];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="about-section light-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="about-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <span className="section-label" style={{ color: 'var(--accent-emerald)' }}>
                        BUILDING ORGANIC TECH & AI NERD ENRICHMENT
                    </span>
                    <h2 className="about-headline display-heading-sm">
                        What is <span className="accent-green-on-light">Botany</span>?
                    </h2>
                    <p className="about-lead">
                        A peer-driven AI upskilling community of ~90 practitioners pushing the boundaries of what's possible with artificial intelligence.
                    </p>
                </motion.div>

                <div className="about-pillars">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            className="pillar-card cream-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 * i }}
                            whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
                        >
                            <div className="pillar-icon-wrap">{p.icon}</div>
                            <h3 className="pillar-title">{p.title}</h3>
                            <p className="pillar-desc">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="about-cta"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <p className="about-cta-text">Share what works… and what doesn't. No one-off training — sustained time to push boundaries.</p>
                    <a href="#join" className="btn btn-dark">
                        Get Involved
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
