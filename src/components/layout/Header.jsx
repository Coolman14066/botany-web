import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getInitials, ICONS } from '../../lib/constants';
import './Header.css';

export default function Header() {
    const { profile, isAdmin, signOut } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    // Scroll detection for header background
    useEffect(() => {
        function onScroll() { setScrolled(window.scrollY > 50); }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const initials = getInitials(profile?.display_name || profile?.email?.split('@')[0] || '?');
    const leftLinks = [
        { to: '/', label: 'Dashboard' },
        { to: '/teams', label: 'Teams' },
    ];
    const rightLinks = [
        ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
        { to: '/profile', label: 'Profile' },
    ];

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container-wide header-content">
                {/* Left nav */}
                <nav className="nav-left nav-desktop">
                    {leftLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.label}
                            {location.pathname === link.to && (
                                <motion.div className="nav-indicator" layoutId="nav-indicator" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Center logo */}
                <Link to="/" className="logo">
                    <span className="logo-leaf">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" />
                            <path d="M12 2a5.5 5.5 0 0 0 0 8" />
                            <path d="M12 2a5.5 5.5 0 0 1 0 8" />
                        </svg>
                    </span>
                    <span className="logo-text">BOTANY</span>
                </Link>

                {/* Right nav + user */}
                <div className="nav-right">
                    <nav className="nav-desktop">
                        {rightLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                            >
                                {link.label}
                                {location.pathname === link.to && (
                                    <motion.div className="nav-indicator" layoutId="nav-indicator-right" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User Menu */}
                    <div className="user-menu" ref={menuRef}>
                        <button
                            className="user-menu-trigger"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div className="avatar avatar-sm" style={{ background: profile?.avatar_color || 'var(--accent-green)', color: '#0a0a12' }}>
                                {initials}
                            </div>
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    className="user-dropdown"
                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="dropdown-header">
                                        <div className="avatar avatar-md" style={{ background: profile?.avatar_color || 'var(--accent-green)', color: '#0a0a12' }}>
                                            {initials}
                                        </div>
                                        <div>
                                            <div className="dropdown-name">{profile?.display_name || 'Botanist'}</div>
                                            <div className="dropdown-email">{profile?.email}</div>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <Link to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                        {ICONS.user} My Profile
                                    </Link>
                                    {isAdmin && (
                                        <Link to="/admin" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                                            {ICONS.shield} Admin Panel
                                        </Link>
                                    )}
                                    <div className="dropdown-divider" />
                                    <button className="dropdown-item dropdown-danger" onClick={() => { signOut(); setMenuOpen(false); }}>
                                        {ICONS.logout} Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                        <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.nav
                        className="nav-mobile"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {[...leftLinks, ...rightLinks].map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`nav-link-mobile ${location.pathname === link.to ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
