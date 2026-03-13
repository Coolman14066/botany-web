import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginOverlay from './components/auth/LoginOverlay';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import TeamsPage from './pages/TeamsPage';
import { AnimatePresence } from 'framer-motion';

function ProtectedRoute({ children, adminOnly = false }) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    if (loading) return null;
    if (!isAuthenticated) return null; // LoginOverlay handles this
    if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
    return children;
}

function AppContent() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100vh', color: 'var(--accent-green)', fontSize: '1.2rem',
                fontFamily: 'var(--font-primary)',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '0.5rem' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent-green)'}}><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18l4-2 4 2 1.3 4 1.88-.66C16.1 16.17 14 10 17 8z" /><path d="M12 2a5.5 5.5 0 0 0 0 8" /><path d="M12 2a5.5 5.5 0 0 1 0 8" /></svg></div>
                    <div>Growing...</div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginOverlay />;
    }

    return (
        <>
            <Header />
            <main>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
                        <Route path="/teams" element={<ProtectedRoute><TeamsPage /></ProtectedRoute>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
