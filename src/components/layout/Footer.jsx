import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-vine" aria-hidden="true">
                <svg viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 40 Q200 10 400 40 T800 40 T1200 40" stroke="rgba(74,222,128,0.1)" strokeWidth="1" fill="none" />
                    <path d="M0 50 Q300 20 600 50 T1200 50" stroke="rgba(74,222,128,0.06)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="container footer-content">
                <div className="footer-brand-section">
                    <div className="footer-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" />
                            <path d="M12 2a5.5 5.5 0 0 0 0 8" />
                            <path d="M12 2a5.5 5.5 0 0 1 0 8" />
                        </svg>
                        <span className="footer-logo-text">BOTANY</span>
                    </div>
                    <p className="footer-tagline">Building Organic Tech & AI Nerd Enrichment</p>
                </div>

                <nav className="footer-nav">
                    <Link to="/" className="footer-link">Dashboard</Link>
                    <Link to="/teams" className="footer-link">Teams</Link>
                    <Link to="/profile" className="footer-link">My Profile</Link>
                    <a href="#submit" className="footer-link">Submit Use Case</a>
                </nav>

                <div className="footer-bottom">
                    <span className="footer-copyright">Botany Group | Accenture &copy; 2025</span>
                    <span className="footer-divider" />
                    <span className="footer-made">Made with curiosity and AI</span>
                </div>
            </div>
        </footer>
    );
}
