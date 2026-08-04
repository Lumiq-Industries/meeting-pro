import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'WhatsAppConnect'>;

export function WhatsAppConnectScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={palette.text} />
        </Pressable>

        <View style={styles.content}>
          <View style={[styles.iconWrap, { backgroundColor: `${BRAND.whatsapp}22` }]}>
            <Ionicons name="logo-whatsapp" size={48} color={BRAND.whatsapp} />
          </View>

          <Text style={[styles.title, { color: palette.text }]}>WhatsApp Business</Text>
          <Text style={[styles.desc, { color: palette.textSecondary }]}>
            Connect your WhatsApp Business account to capture voice notes, calls, and deliver
            transcripts directly in chat.
          </Text>

          <GlassCard style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Ionicons name="checkmark-circle" size={24} color={palette.success} />
              <View>
                <Text style={[styles.statusTitle, { color: palette.text }]}>Connected</Text>
                <Text style={[styles.statusSub, { color: palette.textMuted }]}>
                  Lumiq Industries · +27 ••• ••• 4521
                </Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.steps}>
            {[
              'Voice notes auto-transcribed on receipt',
              'Live call transcription during WhatsApp calls',
              'Summaries & action items sent back to chat',
            ].map((step, i) => (
              <View key={i} style={styles.step}>
                <View style={[styles.stepNum, { backgroundColor: `${BRAND.accent}22` }]}>
                  <Text style={[styles.stepNumText, { color: BRAND.accent }]}>{i + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: palette.textSecondary }]}>{step}</Text>
              </View>
            ))}
          </View>

          <Pressable
            style={[styles.button, { backgroundColor: BRAND.whatsapp }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Manage Connection</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  back: { padding: 20 },
  content: { flex: 1, padding: 24, paddingTop: 0 },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: { fontSize: FONT.xxl, fontWeight: '700', textAlign: 'center' },
  desc: { fontSize: FONT.base, lineHeight: 24, textAlign: 'center', marginTop: 12, marginBottom: 24 },
  statusCard: { marginBottom: 24 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  statusTitle: { fontSize: FONT.lg, fontWeight: '600' },
  statusSub: { fontSize: FONT.sm, marginTop: 2 },
  steps: { gap: 16, marginBottom: 32 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { fontSize: FONT.sm, fontWeight: '700' },
  stepText: { flex: 1, fontSize: FONT.base, lineHeight: 22 },
  button: {
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: FONT.lg, fontWeight: '700' },
});
