import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';

/**
 * Interface for cookie options
 */
interface CookieOptions {
  name: string;
  value?: string;
  [key: string]: unknown;
}

/**
 * Create a Supabase server client with cookies
 */
export function createClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
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