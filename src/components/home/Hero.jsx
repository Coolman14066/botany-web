import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Hero.css';

function AnimatedCounter({ target, suffix = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView || !ref.current) return;
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            ref.current.textContent = Math.round(current) + suffix;
        }, 33);
        return () => clearInterval(timer);
    }, [inView, target, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};
const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.2, delay: 0.5 } },
};

export default function Hero({ stats = { hours: 0, useCases: 0, innovators: 0, tools: 0 } }) {
    return (
        <section className="hero">
            {/* Background layers */}
            <div className="hero-bg-gradient" />
            <div className="hero-bg-image">
                <img src="/images/hero-botanical.png" alt="" />
            </div>
            <div className="hero-bg-overlay" />

            <div className="container hero-container">
                <motion.div className="hero-content" variants={stagger} initial="initial" animate="animate">

                    {/* Side taglines (BusyBee-style) */}
                    <motion.span className="hero-side-tag hero-side-left" variants={fadeIn}>
                        PEER-DRIVEN AI UPSKILLING
                    </motion.span>
                    <motion.span className="hero-side-tag hero-side-right" variants={fadeIn}>
                        ACCENTURE S&C
                    </motion.span>

                    {/* Main display heading */}
                    <motion.div className="hero-heading-group" variants={fadeUp}>
                        <span className="hero-label">BOTANY AI INNOVATORS</span>
                        <h1 className="hero-title display-heading">
                            GROW YOUR<br />AI FLUENCY
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p className="hero-subtitle" variants={fadeUp}>
                        Cultivating the future with artificial intelligence.
                        From seeds of curiosity to forests of innovation.
                    </motion.p>

                    {/* CTA */}
                    <motion.div className="hero-cta" variants={fadeUp}>
                        <a href="#about" className="btn btn-primary btn-hero">
                            Discover Botany
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                        <a href="#join" className="btn btn-secondary btn-hero">
                            Join the Community
                        </a>
                    </motion.div>

                    {/* Stats bar */}
                    <motion.div className="hero-stats" variants={fadeUp}>
                        {[
                            { label: 'Hours Saved', value: stats.hours, suffix: '+' },
                            { label: 'Use Cases', value: stats.useCases, suffix: '+' },
                            { label: 'Innovators', value: stats.innovators, suffix: '' },
                            { label: 'Tools Mastered', value: stats.tools, suffix: '' },
                        ].map(stat => (
                            <div key={stat.label} className="hero-stat">
                                <span className="hero-stat-number">
                                    <AnimatedCounter target={stat.value} suffix={stat.value > 20 ? '+' : ''} />
                                </span>
                                <span className="hero-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="scroll-line" />
                <span>SCROLL</span>
            </motion.div>
        </section>
    );
}
