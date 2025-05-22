export const dynamic = "force-dynamic";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { CookieOptions } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
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
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/admin', request.url));
}