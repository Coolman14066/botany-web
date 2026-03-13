import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pfpgnuuaueqpitfyfhko.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZsBx51D5b5dkAefLJzVBxg_POucLIQM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
    },
});
