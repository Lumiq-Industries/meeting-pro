import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';
import { FEATURE_HIGHLIGHTS } from '../constants/content';
import { RootStackParamList } from '../types';
import { getDeviceLabel } from '../utils/platform';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={[styles.logoWrap, { backgroundColor: `${BRAND.whatsapp}22` }]}>
              <Ionicons name="logo-whatsapp" size={40} color={BRAND.whatsapp} />
            </View>
            <Text style={[styles.brand, { color: palette.textMuted }]}>Lumiq Industries · Meeting Pro</Text>
            <Text style={[styles.headline, { color: palette.text }]}>
              Turn every voice note and meeting into searchable, actionable transcripts
            </Text>
            <Text style={[styles.sub, { color: palette.textSecondary }]}>
              Infinity Colon & VILATECH — delivered inside WhatsApp where your team already works
            </Text>
          </View>

          <View style={styles.features}>
            {FEATURE_HIGHLIGHTS.map((f) => (
              <GlassCard key={f.title} style={styles.featureCard}>
                <Ionicons name={f.icon} size={22} color={BRAND.accent} />
                <View style={styles.featureText}>
                  <Text style={[styles.featureTitle, { color: palette.text }]}>{f.title}</Text>
                  <Text style={[styles.featureDesc, { color: palette.textSecondary }]}>
                    {f.description}
                  </Text>
                </View>
              </GlassCard>
            ))}
          </View>

          <Text style={[styles.deviceNote, { color: palette.textMuted }]}>
            {getDeviceLabel()} · Glass UI adapts to your OS
          </Text>

          <Pressable
            style={[styles.cta, { backgroundColor: BRAND.accent }]}
            onPress={() => navigation.replace('Main')}
          >
            <Text style={styles.ctaText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </Pressable>
        </View>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'space-between' },
  hero: { alignItems: 'center', paddingTop: 24 },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brand: { fontSize: FONT.sm, fontWeight: '600', letterSpacing: 1 },
  headline: {
    fontSize: FONT.xxl,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 12,
  },
  sub: {
    fontSize: FONT.base,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  features: { gap: 10 },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureText: { flex: 1 },
  featureTitle: { fontSize: FONT.base, fontWeight: '600' },
  featureDesc: { fontSize: FONT.sm, marginTop: 2 },
  deviceNote: { fontSize: FONT.sm, textAlign: 'center', marginBottom: 12 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
  },
  ctaText: { color: '#FFF', fontSize: FONT.lg, fontWeight: '700' },
});
