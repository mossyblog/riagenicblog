import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

/**
 * Create a Supabase server client with cookies
 */
export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get(name: string) {
          return (cookies() as unknown as { get: (name: string) => { value: string } | undefined })
            .get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          (cookies() as unknown as { set: (cookie: Record<string, unknown>) => void })
            .set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          (cookies() as unknown as { delete: (cookie: Record<string, unknown>) => void })
            .delete({ name, ...options });
        },
      },
    }
  );
}

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

/**
 * Middleware to protect routes that require authentication
 */
export async function requireAuth() {
  const isAuthed = await isAuthenticated();
  
  if (!isAuthed) {
    redirect('/admin/login');
  }
}