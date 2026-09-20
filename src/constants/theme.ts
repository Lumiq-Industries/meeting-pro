export const BRAND = {
  whatsapp: '#25D366',
  whatsappDark: '#128C7E',
  accent: '#6366F1',
  accentLight: '#818CF8',
  gold: '#D4AF37',
  navy: '#0A1628',
  navyMid: '#132238',
  navyLight: '#1E3A5F',
};

export const COLORS = {
  light: {
    background: '#EEF2FF',
    backgroundGradient: ['#EEF2FF', '#F0FDF4', '#ECFEFF'] as const,
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    glassFill: 'rgba(255, 255, 255, 0.55)',
    glassFillLiquid: 'rgba(255, 255, 255, 0.42)',
    glassBorder: 'rgba(255, 255, 255, 0.65)',
    glassHighlight: 'rgba(255, 255, 255, 0.85)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    live: '#EF4444',
  },
  dark: {
    background: '#0A1628',
    backgroundGradient: ['#0A1628', '#0F1F35', '#132238'] as const,
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',
    glassFill: 'rgba(255, 255, 255, 0.08)',
    glassFillLiquid: 'rgba(255, 255, 255, 0.12)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassHighlight: 'rgba(255, 255, 255, 0.25)',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    live: '#F87171',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
  full: 9999,
};

export const FONT = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  hero: 34,
};

export const SPEAKER_COLORS = [
  '#6366F1',
  '#25D366',
  '#F59E0B',
  '#EC4899',
  '#14B8A6',
  '#8B5CF6',
];

// Unused for now: nothing in the database stores a subscription tier, so no
// screen can pick a label honestly. Kept for when billing exists.
export const PLAN_LABELS = {
  voice_call: 'Voice & Call',
  meeting_pro: 'Meeting Pro',
  enterprise: 'Enterprise Agent',
} as const;

export type ThemePalette = typeof COLORS.light | typeof COLORS.dark;
export type ThemeMode = keyof typeof COLORS;
