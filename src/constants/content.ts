import { Ionicons } from '@expo/vector-icons';

// Static product copy. Not data: nothing here comes from, or belongs in, the
// database. It lived in mockData.ts, which mixed fake numbers with real
// marketing text and made the fake numbers look like data.
export interface FeatureHighlight {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    icon: 'mic',
    title: 'Voice Note → Text',
    description: 'Every WhatsApp voice note captured and transcribed instantly.',
  },
  {
    icon: 'call',
    title: 'Live Call Transcription',
    description: 'Real-time transcription during WhatsApp calls.',
  },
  {
    icon: 'search',
    title: 'Searchable Archive',
    description: 'Keyword tagging and full-text search across all sessions.',
  },
  {
    // Built and deployed, but switched off until an Anthropic API key is set on
    // the Supabase project. Said plainly rather than promised.
    icon: 'bulb',
    title: 'AI Summaries',
    description: 'Coming soon — built, but not switched on yet.',
  },
];

// Shown where a value has no source in the database yet. Never a made-up number.
export const NO_VALUE = '—';
