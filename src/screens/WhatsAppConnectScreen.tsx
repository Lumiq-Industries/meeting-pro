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
import { useBusinessProfile, formatPhoneNumber } from '../data/businessProfile';

type Props = NativeStackScreenProps<RootStackParamList, 'WhatsAppConnect'>;

export function WhatsAppConnectScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const profile = useBusinessProfile();

  // What each step says depends on whether a number is actually registered.
  // These describe what the system really does: WhatsApp transcribes the call
  // on its own servers and sends the transcript here afterwards. Voice notes
  // and delivery back into chat do not exist, so they are not claimed.
  const steps = profile.connected
    ? [
        'Calls on this number are transcribed by WhatsApp after they end',
        'Transcripts arrive here within about a minute, with speakers separated',
        'Each one gets a summary and action items automatically',
      ]
    : [
        'A WhatsApp Business number must be registered on the Meta Cloud API with Calling enabled',
        'Meta transcribes each call on its own servers — nothing is recorded on this phone',
        'Finished transcripts then appear in your Archive',
      ];

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
            Calls on your WhatsApp Business number are transcribed by WhatsApp and delivered
            here automatically.
          </Text>

          {/* Real status, from whatsapp_numbers. This card used to say
              "Connected" with an invented number to every user. */}
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

          {/* TODO(connect): connecting a number is a Meta-side process
              (Cloud API registration with Calling enabled) and there is no
              in-app flow for it yet. The button is disabled rather than
              pretending to do something. */}
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
              : 'Ask your administrator to register a WhatsApp Business number on the Meta Cloud API.'}
          </Text>
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
