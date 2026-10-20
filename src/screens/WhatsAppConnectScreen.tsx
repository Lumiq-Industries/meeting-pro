import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlassCard } from '../components/GlassCard';
import { MeetingProMark } from '../components/MeetingProMark';
import { StackScreenLayout } from '../components/StackScreenLayout';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';
import { RootStackParamList } from '../types';
import { useBusinessProfile, formatPhoneNumber } from '../data/businessProfile';

type Props = NativeStackScreenProps<RootStackParamList, 'WhatsAppConnect'>;

export function WhatsAppConnectScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const profile = useBusinessProfile();

  const steps = profile.connected
    ? [
        'Calls on this number are transcribed by WhatsApp after they end',
        'Transcripts arrive here within about a minute, with speakers separated',
        'Summaries and action items are coming — not switched on yet',
      ]
    : [
        'A WhatsApp Business number must be registered on the Meta Cloud API with Calling enabled',
        'Meta transcribes each call on its own servers — nothing is recorded on this phone',
        'Finished transcripts then appear in your Archive',
      ];

  return (
    <StackScreenLayout
      fullBleedHeader={
        <Pressable onPress={() => navigation.goBack()} style={styles.back} accessibilityRole="button">
          <Ionicons name="arrow-back" size={24} color={palette.text} />
        </Pressable>
      }
    >
      <View style={styles.iconWrap}>
        <MeetingProMark size={72} framed />
      </View>

      <Text style={[styles.title, { color: palette.text }]}>WhatsApp Business</Text>
      <Text style={[styles.desc, { color: palette.textSecondary }]}>
        Calls on your WhatsApp Business number are transcribed by WhatsApp and delivered here
        automatically.
      </Text>

      <GlassCard style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Ionicons
            name={
              profile.loading
                ? 'ellipsis-horizontal-circle'
                : profile.connected
                  ? 'checkmark-circle'
                  : 'alert-circle'
            }
            size={24}
            color={
              profile.loading
                ? palette.textMuted
                : profile.connected
                  ? palette.success
                  : palette.textMuted
            }
          />
          <View style={styles.statusTextBlock}>
            <Text style={[styles.statusTitle, { color: palette.text }]}>
              {profile.loading
                ? 'Checking…'
                : profile.error
                  ? 'Status unavailable'
                  : profile.connected
                    ? 'Connected'
                    : 'Not connected'}
            </Text>
            <Text style={[styles.statusSub, { color: palette.textMuted }]}>
              {profile.loading
                ? ''
                : profile.error
                  ? profile.error
                  : profile.connected
                    ? `${profile.businessName ?? 'This business'} · ${formatPhoneNumber(
                        profile.number!.displayPhoneNumber
                      )}`
                    : 'No WhatsApp Business number is registered for this account.'}
            </Text>
          </View>
        </View>
      </GlassCard>

      <View style={styles.steps}>
        {steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={[styles.stepNum, { backgroundColor: `${BRAND.accent}22` }]}>
              <Text style={[styles.stepNumText, { color: BRAND.accent }]}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: palette.textSecondary }]}>{step}</Text>
          </View>
        ))}
      </View>

      <Pressable
        disabled
        style={[styles.button, { backgroundColor: palette.textMuted, opacity: 0.5 }]}
      >
        <Text style={styles.buttonText}>
          {profile.connected ? 'Manage connection — coming soon' : 'Connect a number — coming soon'}
        </Text>
      </Pressable>
      <Text style={[styles.buttonNote, { color: palette.textMuted }]}>
        {profile.connected
          ? 'Changing the connected number is done in the Meta Business account for now.'
          : 'Follow docs/WHATSAPP_BUSINESS_SETUP.md in the repo — Meta Cloud API + Supabase webhook + whatsapp_numbers row.'}
      </Text>
    </StackScreenLayout>
  );
}

const styles = StyleSheet.create({
  back: { padding: 20, paddingBottom: 8 },
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
  statusTextBlock: { flex: 1 },
  buttonNote: { fontSize: FONT.sm, textAlign: 'center', marginTop: 12, lineHeight: 18 },
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
