import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

// Dev bypass — skip magic link on localhost
const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const DEV_USER_ID = '9dc3fe65-57fe-44df-8042-b9fcb445d270';
const DEV_EMAIL = 'pedro.da.silveira@accenture.com';

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [devBypassed, setDevBypassed] = useState(false);

    useEffect(() => {
        const init = async () => {
            // Handle PKCE code exchange from magic link redirect
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            if (code) {
                try {
                    const { error } = await supabase.auth.exchangeCodeForSession(code);
                    if (error) console.error('Code exchange error:', error);
                } catch (err) {
                    console.error('Code exchange failed:', err);
                }
                window.history.replaceState({}, '', window.location.pathname);
            }

            // Try to get a real session first
            const { data: { session: existingSession } } = await supabase.auth.getSession();

            if (existingSession?.user) {
                setSession(existingSession);
                await fetchProfile(existingSession.user.id);
                return;
            }

            // Dev bypass — auto-authenticate on localhost
            if (IS_DEV && !existingSession) {
                console.log('%c[DEV] Auto-authenticating as ' + DEV_EMAIL, 'color: #4ade80; font-weight: bold;');
                setSession({ user: { id: DEV_USER_ID, email: DEV_EMAIL } });
                setDevBypassed(true);
                await fetchProfile(DEV_USER_ID);
                return;
            }

            setLoading(false);
        };

        init();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    setSession(session);
                    setDevBypassed(false);
                    await fetchProfile(session.user.id);
                } else if (!devBypassed) {
                    setSession(null);
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    async function fetchProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
            }
            setProfile(data || null);
        } catch (err) {
            console.error('Profile fetch failed:', err);
        } finally {
            setLoading(false);
        }
    }

    async function signInWithMagicLink(email) {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            },
        });
        return { error };
    }

    async function signOut() {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
        setDevBypassed(false);
    }

    async function updateProfile(updates) {
        const userId = session?.user?.id;
        if (!userId) return { error: 'Not authenticated' };
        const { data, error } = await supabase
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', userId)
            .select()
            .single();
        if (data) setProfile(data);
        return { data, error };
    }

    const isAdmin = profile?.is_admin === true;
    const isBotanist = profile?.is_botanist === true;
    const isAuthenticated = IS_DEV
        ? (devBypassed || !!session?.user?.email?.toLowerCase().endsWith('@accenture.com'))
        : !!session?.user?.email?.toLowerCase().endsWith('@accenture.com');

    return (
        <AuthContext.Provider
            value={{
                session,
                profile,
                loading,
                isAuthenticated,
                isAdmin,
                isBotanist,
                signInWithMagicLink,
                signOut,
                updateProfile,
                fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
