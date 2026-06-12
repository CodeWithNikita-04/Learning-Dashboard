import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// This creates a Supabase client that runs on the server side.
// We use cookies() from next/headers so it works in Server Components.
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll is called from Server Components sometimes — safe to ignore
          }
        },
      },
    }
  )
}
