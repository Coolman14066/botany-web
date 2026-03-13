-- ═══════════════════════════════════════════════
-- BOTANY WEB APP — Supabase Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- 1. PROFILES (auto-created on signup)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  bio TEXT DEFAULT '',
  location TEXT DEFAULT '',
  current_role TEXT DEFAULT '',
  avatar_color TEXT DEFAULT '#4ade80',
  tier TEXT DEFAULT 'planted' CHECK (tier IN ('planted', 'seedling', 'pollinator', 'propagator')),
  is_admin BOOLEAN DEFAULT false,
  is_botanist BOOLEAN DEFAULT false,
  total_hours_saved NUMERIC DEFAULT 0,
  total_use_cases INTEGER DEFAULT 0,
  avg_comfort NUMERIC DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    SPLIT_PART(NEW.email, '@', 1)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. TEAMS
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  phase INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Admins can manage teams" ON public.teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 3. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('lead', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, user_id)
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage team members" ON public.team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 4. USE CASE SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.use_case_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  use_case TEXT NOT NULL,
  tools TEXT,
  hours_saved NUMERIC DEFAULT 0,
  value_created TEXT DEFAULT '',
  challenges TEXT DEFAULT '',
  comfort_level INTEGER CHECK (comfort_level BETWEEN 1 AND 5),
  barrier TEXT DEFAULT '',
  recommends BOOLEAN DEFAULT true,
  used_in_client_work BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.use_case_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view approved submissions" ON public.use_case_submissions FOR SELECT USING (status = 'approved' OR user_id = auth.uid());
CREATE POLICY "Authenticated users can insert" ON public.use_case_submissions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage submissions" ON public.use_case_submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 5. INTAKE SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  office_location TEXT,
  current_role TEXT,
  ai_comfort INTEGER,
  ai_relationship TEXT,
  colleagues_introduced INTEGER DEFAULT 0,
  used_in_client_work BOOLEAN DEFAULT false,
  hours_saved_per_week NUMERIC DEFAULT 0,
  participation_preference TEXT,
  interested_in_pod BOOLEAN DEFAULT false,
  interested_in_leading BOOLEAN DEFAULT false,
  leadership_role TEXT DEFAULT '',
  pod_ideas TEXT DEFAULT '',
  questions TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can insert intakes" ON public.intake_submissions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can view and manage intakes" ON public.intake_submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 6. COMPETITIONS
CREATE TABLE IF NOT EXISTS public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view competitions" ON public.competitions FOR SELECT USING (true);
CREATE POLICY "Admins can manage competitions" ON public.competitions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- 7. POD IDEAS
CREATE TABLE IF NOT EXISTS public.pod_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  idea TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.pod_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pod ideas" ON public.pod_ideas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert ideas" ON public.pod_ideas FOR INSERT WITH CHECK (auth.role() = 'authenticated');
