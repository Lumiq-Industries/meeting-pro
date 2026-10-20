import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { setActiveSupabaseClient } from '../lib/supabaseRef';
import { useSession } from '@clerk/clerk-expo';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../lib/supabase';
import type { Database } from '../lib/database.types';

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null);

/** Supabase client that sends the Clerk session token (Supabase JWT template). */
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSession();

  const client = useMemo(
    () =>
      createSupabaseClient(async () => {
        try {
          return (await session?.getToken({ template: 'supabase' })) ?? null;
        } catch {
          return null;
        }
      }),
    [session]
  );

  useEffect(() => {
    setActiveSupabaseClient(client);
    return () => setActiveSupabaseClient(null);
  }, [client]);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export function useSupabase(): SupabaseClient<Database> {
  const client = useContext(SupabaseContext);
  if (!client) {
    throw new Error('useSupabase must be used inside SupabaseProvider (after Clerk sign-in)');
  }
  return client;
}

/** Safe before sign-in: returns null when outside SupabaseProvider or unsigned. */
export function useSupabaseOptional(): SupabaseClient<Database> | null {
  return useContext(SupabaseContext);
}
