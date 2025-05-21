import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Define cookie options interface
interface CookieOptions {
  name: string;
  value?: string;
  [key: string]: unknown;
}

export async function POST() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
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

  // Sign out the user
  await supabase.auth.signOut();
  
  // Redirect to the homepage
  return NextResponse.redirect(new URL('/', process.env.SITE_URL || 'http://localhost:3000'));
}