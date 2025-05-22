import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { CookieOptions } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = createServerClient(
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

  // Sign out the user
  await supabase.auth.signOut();
  
  // Redirect to the homepage
  return NextResponse.redirect(new URL('/', process.env.SITE_URL || 'http://localhost:3000'));
}