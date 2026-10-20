// Supabase data client — authenticated via Clerk JWT (third-party auth), not Supabase Auth.
//
// EXPO_PUBLIC_* URL and anon key are inlined at build time. RLS enforces access;
// the anon key alone cannot read protected tables.
import 'react-native-url-polyfill/auto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase is not configured: set EXPO_PUBLIC_SUPABASE_URL and ' +
      'EXPO_PUBLIC_SUPABASE_ANON_KEY in .env (see .env.example), then restart Expo.'
  );
}

export type AccessTokenFn = () => Promise<string | null>;

export function createSupabaseClient(
  accessToken: AccessTokenFn
): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    accessToken,
  });
}

/** Mock / tests only — no Clerk token. Queries fail RLS unless DATA_SOURCE=mock. */
export const supabaseAnonOnly = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
