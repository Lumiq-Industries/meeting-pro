import { DATA_SOURCE } from './supabaseConfig';

/** Khaya Property Services seed tenant — synthetic demo, not live Meta traffic. */
export const KHAYA_DEMO_BUSINESS_ID = 'dbdbdbdb-0000-4000-8000-000000000001';

export type AppDataEnvironment = 'mock' | 'demonstration' | 'supabase_live';

export function resolveAppDataEnvironment(isDemoData: boolean): AppDataEnvironment {
  if (DATA_SOURCE === 'mock') return 'mock';
  return isDemoData ? 'demonstration' : 'supabase_live';
}

export function environmentBannerCopy(env: AppDataEnvironment): {
  title: string;
  detail: string;
  tone: 'amber' | 'sky' | 'neutral';
} {
  switch (env) {
    case 'mock':
      return {
        title: 'Local test mode',
        detail: 'In-memory test calls only. No database or WhatsApp integration.',
        tone: 'amber',
      };
    case 'demonstration':
      return {
        title: 'Test workspace',
        detail:
          'Khaya Property Services. This is the test call we can run while the WhatsApp account is restricted. Investment unlocks production numbers so any country code can call in.',
        tone: 'sky',
      };
    default:
      return {
        title: 'Live workspace',
        detail: 'Conversations from your connected WhatsApp Business integration.',
        tone: 'neutral',
      };
  }
}
