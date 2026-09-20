import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, BRAND } from '../constants/theme';
import { LAYOUT } from '../constants/layout';

// TODO(live): rebuild this as a CALL STATUS view, not a recorder.
//
// What was here before: a record button that started a timer and printed three
// hardcoded lines of invented conversation every 2.8 seconds. It recorded
// nothing and transcribed nothing. It has been removed because it showed
// fabricated transcript text that was indistinguishable from real output.
//
// Why a recorder can never work here: a phone cannot capture WhatsApp call
// audio on either iOS or Android — the operating system blocks it. Meta
// transcribes the call on its own servers and sends the result to our webhook
// after the call ends. The app is a read-only client.
//
// What this screen should become: a live view of calls in progress, driven by
// the call lifecycle webhooks Meta already sends (`call_created`, `connect`,
// `terminate`, which land in webhook_events and update the calls table):
//   - show calls currently connected, with who is on them and for how long;
//   - after a call ends, show that the transcript is on its way — Meta usually
//     delivers it within a minute of the call ending;
//   - link through to the transcript once it lands, or show the failure with
//     the retry that the transcript screen already has.
//
// Realtime updates would come from a Supabase subscription on the calls table.
// None of that is built yet, so this screen states its position honestly
// instead of pretending.

export function LiveScreen() {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ScreenHeader
            title="Live"
            subtitle="Calls in progress on your WhatsApp Business number"
          />

          <GlassCard style={styles.card}>
            <Ionicons name="pulse-outline" size={28} color={BRAND.accent} />
            <Text style={[styles.title, { color: palette.text }]}>Not available yet</Text>
            <Text style={[styles.body, { color: palette.textSecondary }]}>
              This will show calls happening right now on your WhatsApp Business number, and
              whether their transcripts have arrived.
            </Text>
            <Text style={[styles.body, { color: palette.textMuted }]}>
              Meeting Pro does not record anything on this device. WhatsApp transcribes each
              call on its own servers and sends the transcript through once the call ends —
              usually within a minute. Finished transcripts appear in the Archive.
            </Text>
          </GlassCard>

          <View style={{ height: LAYOUT.tabBarClearance }} />
        </ScrollView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: LAYOUT.screenPaddingH,
    paddingTop: LAYOUT.screenPaddingTop,
  },
  card: { alignItems: 'center', gap: 12, paddingVertical: 28 },
  title: { fontSize: FONT.lg, fontWeight: '700' },
  body: { fontSize: FONT.sm, textAlign: 'center', lineHeight: 20 },
});
