import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { LiveWaveform } from '../components/LiveWaveform';
import { ScreenHeader } from '../components/ScreenHeader';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND, ThemePalette } from '../constants/theme';
import { LAYOUT } from '../constants/layout';

const MOCK_LIVE_LINES = [
  { speaker: 'Sarah M.', text: 'So the Lumiq pilot starts first week of September.' },
  { speaker: 'James K.', text: 'Meeting Pro handles live WhatsApp calls and voice notes natively.' },
  { speaker: 'Partner Team', text: 'We need speaker identification on the enterprise tier.' },
];

export function LiveScreen() {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState<typeof MOCK_LIVE_LINES>([]);

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [recording]);

  useEffect(() => {
    if (!recording) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < MOCK_LIVE_LINES.length) {
        setLines((prev) => [...prev, MOCK_LIVE_LINES[index]]);
        index += 1;
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [recording]);

  const toggleRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (recording) {
      setRecording(false);
    } else {
      setLines([]);
      setElapsed(0);
      setRecording(true);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ScreenHeader
            title="Live"
            subtitle="Record & transcribe in real time — same workflow as Teams or Zoom"
          />

          <GlassCard style={styles.recorderCard}>
            <View style={styles.recorderTop}>
              <View style={[styles.liveBadge, recording && styles.liveBadgeActive]}>
                {recording && <View style={styles.liveDot} />}
                <Text style={[styles.liveText, { color: recording ? '#EF4444' : palette.textMuted }]}>
                  {recording ? 'RECORDING' : 'READY'}
                </Text>
              </View>
              <Text style={[styles.timer, { color: palette.text }]}>
                {formatTime(elapsed)}
              </Text>
            </View>

            <LiveWaveform active={recording} />

            <Pressable
              onPress={toggleRecording}
              style={[
                styles.recordButton,
                { backgroundColor: recording ? '#EF4444' : BRAND.whatsapp },
              ]}
            >
              <Ionicons name={recording ? 'stop' : 'mic'} size={32} color="#FFF" />
            </Pressable>

            <Text style={[styles.recordHint, { color: palette.textMuted }]}>
              {recording
                ? 'Tap to stop · Transcript saves to archive automatically'
                : 'Tap to start live transcription'}
            </Text>
          </GlassCard>

          <View style={styles.modeRow}>
            <ModeChip icon="logo-whatsapp" label="WhatsApp Call" active palette={palette} />
            <ModeChip icon="mic" label="Voice Note" palette={palette} />
            <ModeChip icon="people" label="Meeting" palette={palette} />
          </View>

          {lines.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: palette.text, marginTop: LAYOUT.sectionGap }]}>
                Live transcript
              </Text>
              <View style={styles.linesBlock}>
              {lines.map((line, i) => (
                <GlassCard key={i} style={styles.lineCard}>
                  <Text style={[styles.speaker, { color: BRAND.accent }]}>{line.speaker}</Text>
                  <Text style={[styles.lineText, { color: palette.text }]}>{line.text}</Text>
                </GlassCard>
              ))}
              </View>
            </>
          )}

          <View style={{ height: LAYOUT.tabBarClearance }} />
        </ScrollView>
      </SafeAreaView>
    </GlassBackground>
  );
}

function ModeChip({
  icon,
  label,
  active,
  palette,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  palette: ThemePalette;
}) {
  return (
    <View
      style={[
        styles.modeChip,
        {
          backgroundColor: active ? `${BRAND.whatsapp}22` : `${palette.textMuted}12`,
          borderColor: active ? BRAND.whatsapp : 'transparent',
        },
      ]}
    >
      <Ionicons name={icon} size={16} color={active ? BRAND.whatsapp : palette.textMuted} />
      <Text
        style={[
          styles.modeLabel,
          { color: active ? BRAND.whatsapp : palette.textSecondary },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: LAYOUT.screenPaddingH,
    paddingTop: LAYOUT.screenPaddingTop,
  },
  recorderCard: { alignItems: 'center', marginBottom: LAYOUT.blockGap, paddingVertical: 24 },
  recorderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  liveBadgeActive: { backgroundColor: 'rgba(239,68,68,0.12)' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  liveText: { fontSize: FONT.xs, fontWeight: '700', letterSpacing: 1 },
  timer: { fontSize: FONT.lg, fontWeight: '600', fontVariant: ['tabular-nums'] },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  recordHint: { fontSize: FONT.sm, textAlign: 'center' },
  modeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: LAYOUT.blockGap },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  modeLabel: { fontSize: FONT.sm, fontWeight: '500' },
  sectionTitle: { fontSize: FONT.lg, fontWeight: '700', marginBottom: LAYOUT.itemGap },
  linesBlock: { gap: LAYOUT.cardGap },
  lineCard: {},
  speaker: { fontSize: FONT.sm, fontWeight: '600', marginBottom: 4 },
  lineText: { fontSize: FONT.base, lineHeight: 22 },
});
