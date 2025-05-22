import { createClient, SupabaseClient } from '@supabase/supabase-js';

// This flag ensures we only attempt initialization once per server process lifetime.
let dbInitializationAttempted = false;

const getServiceRoleClient = (): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    if (!dbInitializationAttempted) {
      console.warn(
        'DB Init: Supabase URL or Service Role Key is not configured. Skipping automatic schema initialization.'
      );
    }
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

const createCategoriesTableSQL = `
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON public.categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.categories FOR DELETE TO authenticated USING (true);
`;

const createPostsTableSQL = `
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false NOT NULL
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Enable read access for authenticated users to their own unpublished posts" ON public.posts FOR SELECT TO authenticated USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE public.profiles.id = public.posts.id)); -- Assuming a profiles table links auth.uid to a user_id in posts or similar logic
CREATE POLICY "Enable all operations for authenticated users" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on posts table update
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
`;

// Add other table SQL statements here (e.g., profiles, comments if needed)

async function tableExists(client: SupabaseClient, tableName: string): Promise<boolean> {
  // Ensure the schema is explicitly public if that's where pg_tables is expected
  // However, pg_catalog.pg_tables is standard.
  const { data, error } = await client
    .from('pg_tables') // Supabase from() might implicitly handle pg_catalog for system tables or might require it explicitly.
                         // Let's try without pg_catalog first, then with if it fails.
    .select('tablename')
    .eq('tablename', tableName)
    .eq('schemaname', 'public'); // Assuming your tables are in 'public' schema

  if (error) {
    console.error(`DB Init: Error checking if table ${tableName} exists:`, error);
    // Attempt with explicit pg_catalog schema if the first attempt fails
    console.log(`DB Init: Retrying table check for ${tableName} with explicit pg_catalog.pg_tables`);
    const { data: catalogData, error: catalogError } = await client
      .schema('pg_catalog')
      .from('pg_tables')
      .select('tablename')
      .eq('tablename', tableName)
      .eq('schemaname', 'public');
    
    if (catalogError) {
      console.error(`DB Init: Error checking table ${tableName} in pg_catalog.pg_tables:`, catalogError);
      return false; // If both attempts fail, assume table doesn't exist or cannot be verified.
    }
    return catalogData && catalogData.length > 0;
  }
  return data && data.length > 0;
}

export async function initializeDatabaseTables() {
  if (dbInitializationAttempted) {
    return;
  }
  dbInitializationAttempted = true;

  console.log('DB Init: Attempting to ensure project schema exists via RPC call...');

  const supabase = getServiceRoleClient();

  if (!supabase) {
    console.log('DB Init: Supabase client could not be initialized with service role. Skipping schema initialization.');
    return;
  }

  try {
    const { data, error } = await supabase.rpc('ensure_project_schema');

    if (error) {
      throw new Error(`RPC call to ensure_project_schema failed: ${error.message}`);
    }

    console.log(`DB Init: RPC call to ensure_project_schema completed. Result: ${data}`);
  } catch (error) {
    console.error('DB Init: Error during database schema initialization:', error);
  }
}
