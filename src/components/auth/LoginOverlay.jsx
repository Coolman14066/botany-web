import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './LoginOverlay.css';

export default function LoginOverlay() {
    const { signInWithMagicLink } = useAuth();
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (!email.toLowerCase().endsWith('@accenture.com')) {
            setError('Please use an @accenture.com email address');
            return;
        }
        setSending(true);
        const { error: authError } = await signInWithMagicLink(email);
        setSending(false);
        if (authError) {
            setError(authError.message);
        } else {
            setSent(true);
        }
    }

    return (
        <div className="login-overlay">
            {/* Background particles */}
            <div className="login-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -200 - 100],
                            opacity: [0, 0.3, 0],
                            scale: [0.5, 1, 0.3],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>

            {/* Plant SVG Growing Animation */}
            <div className="login-plant-scene">
                <svg viewBox="0 0 200 300" className="login-plant-svg" xmlns="http://www.w3.org/2000/svg">
                    {/* Ground */}
                    <motion.line
                        x1="40" y1="280" x2="160" y2="280"
                        stroke="#4ade80" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    />
                    {/* Stem */}
                    <motion.path
                        d="M100 280 Q100 240 100 200"
                        stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                    />
                    {/* Left leaf */}
                    <motion.path
                        d="M100 220 Q80 200 70 180 Q90 190 100 220"
                        fill="#4ade80" opacity="0.9"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.9 }}
                        transition={{ duration: 0.8, delay: 1.8, type: 'spring', stiffness: 100 }}
                        style={{ transformOrigin: '100px 220px' }}
                    />
                    {/* Right leaf */}
                    <motion.path
                        d="M100 210 Q120 190 130 170 Q110 185 100 210"
                        fill="#22c55e" opacity="0.9"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.9 }}
                        transition={{ duration: 0.8, delay: 2.1, type: 'spring', stiffness: 100 }}
                        style={{ transformOrigin: '100px 210px' }}
                    />
                    {/* Bud */}
                    <motion.circle
                        cx="100" cy="200" r="4" fill="#86efac"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: 2.5 }}
                    />
                </svg>
            </div>

            {/* Login Card */}
            <motion.div
                className="login-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
                <div className="login-brand">
                    <span className="login-logo-symbol">&gt;</span>
                    <span className="login-logo-text">BOTANY</span>
                </div>
                <h2 className="login-title">Welcome Innovator</h2>
                <p className="login-subtitle">Sign in with your Accenture email to watch your seedling grow.</p>

                <AnimatePresence mode="wait">
                    {!sent ? (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="login-form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="login-field">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="jane.smith@accenture.com"
                                    required
                                    className="login-input"
                                />
                            </div>
                            {error && (
                                <motion.p
                                    className="login-error"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    {error}
                                </motion.p>
                            )}
                            <motion.button
                                type="submit"
                                className="btn btn-primary login-btn"
                                disabled={sending}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {sending ? 'Sending...' : 'Send Magic Link'}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            className="login-success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <div className="login-success-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3>Check your email</h3>
                            <p>We've sent a magic link to your Accenture email. Click it to grow your tree and enter the portal.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
