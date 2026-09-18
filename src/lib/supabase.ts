// The app's single Supabase client.
//
// The URL and anon key come from Expo public env vars (EXPO_PUBLIC_*), which are
// inlined into the bundle at build time. They are not secrets in the dangerous
// sense — the anon key is designed to ship inside the app, and what it can reach
// is decided by the database's grants and RLS policies, not by keeping it
// hidden. They still live in .env rather than git so each environment (local,
// dev, production) can point at its own project.
//
// Note what the anon key can do on its own: nothing. As of migration
// 20260918090000 the `anon` role holds no privileges on any table in public, so
// every query fails until a user signs in and the client switches to the
// `authenticated` role.
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import type { Database } from './database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly at startup rather than with a confusing network error later.
  throw new Error(
    'Supabase is not configured: set EXPO_PUBLIC_SUPABASE_URL and ' +
      'EXPO_PUBLIC_SUPABASE_ANON_KEY in .env (see .env.example), then restart Expo.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Sessions persist across app restarts. On web AsyncStorage is backed by
    // localStorage.
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    // Email and password only for now — no magic links or OAuth redirects, so
    // there is never a session to pick out of a URL.
    detectSessionInUrl: false,
  },
});

// Only refresh tokens while the app is in the foreground. Refresh timers do not
// run reliably in the background on native, and a session that silently expired
// while backgrounded would otherwise surface as failed queries on resume.
// Supabase's recommended pattern for React Native.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
