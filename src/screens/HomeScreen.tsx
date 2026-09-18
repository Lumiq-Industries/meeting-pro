import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { TranscriptCard } from '../components/TranscriptCard';
import { ScreenHeader, SectionHeader } from '../components/ScreenHeader';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND, PLAN_LABELS, ThemePalette } from '../constants/theme';
import { LAYOUT } from '../constants/layout';
// dashboardStats and featureHighlights have no database equivalent yet.
import { dashboardStats, featureHighlights } from '../data/mockData';
import { useTranscripts } from '../data/transcriptSource';
import { MainTabParamList, RootStackParamList } from '../types';
import { getDeviceLabel, getGlassVariant, supportsLiquidGlass } from '../utils/platform';

type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = { navigation: HomeNav };

export function HomeScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const { transcripts } = useTranscripts();
  const recent = transcripts.slice(0, 3);
  const variant = getGlassVariant();

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            badge="Lumiq Industries"
            title="Meeting Pro"
            subtitle="Transcribe WhatsApp calls & meetings — like Teams, Zoom & Meet"
            rightAction={{
              icon: 'logo-whatsapp',
              onPress: () => navigation.navigate('WhatsAppConnect'),
              color: BRAND.whatsapp,
            }}
          />

          {/* Hero CTA — Zoom/Teams-style primary action */}
          <Pressable onPress={() => navigation.navigate('Live')}>
            <View style={styles.heroOuter}>
              <LinearGradient
                colors={['#128C7E', '#075E54', '#0A1628']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroGradient}
              >
                <View style={styles.heroInner}>
                  <View style={styles.heroIconWrap}>
                    <Ionicons name="videocam" size={28} color="#FFF" />
                  </View>
                  <View style={styles.heroText}>
                    <Text style={styles.heroTitle}>Start transcription</Text>
                    <Text style={styles.heroSub}>
                      Live WhatsApp calls · Voice notes · Team meetings
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward-circle" size={32} color="#FFF" />
                </View>
              </LinearGradient>
            </View>
          </Pressable>

          <GlassCard style={styles.deviceBanner}>
            <View style={styles.deviceRow}>
              <Ionicons
                name={supportsLiquidGlass() ? 'color-wand' : 'phone-portrait-outline'}
                size={18}
                color={BRAND.accent}
              />
              <Text style={[styles.deviceText, { color: palette.textSecondary }]}>
                {getDeviceLabel()}
                {variant === 'liquid' ? ' · Liquid Glass UI' : ''}
              </Text>
            </View>
          </GlassCard>

          <View style={styles.statsGrid}>
            <StatCard label="Sessions" value={String(dashboardStats.totalSessions)} icon="document-text" palette={palette} />
            <StatCard label="Hours" value={String(dashboardStats.hoursTranscribed)} icon="time" palette={palette} />
            <StatCard label="Actions" value={String(dashboardStats.actionItemsGenerated)} icon="checkbox" palette={palette} />
          </View>

          <GlassCard style={styles.planCard}>
            <View style={styles.planHeader}>
              <View style={styles.planTextBlock}>
                <Text style={[styles.planLabel, { color: palette.textMuted }]}>Current plan</Text>
                <Text style={[styles.planName, { color: palette.text }]}>
                  {PLAN_LABELS[dashboardStats.plan]}
                </Text>
              </View>
              <View style={[styles.planBadge, { backgroundColor: `${BRAND.gold}33` }]}>
                <Text style={[styles.planBadgeText, { color: BRAND.gold }]}>Popular</Text>
              </View>
            </View>
            <Text style={[styles.planDesc, { color: palette.textSecondary }]}>
              Live & recorded transcription · AI summaries · Speaker ID · WhatsApp delivery · CRM export
            </Text>
          </GlassCard>

          <SectionHeader title="Quick actions" />
          <View style={styles.actionsRow}>
            <QuickAction icon="mic" label="Voice note" color={BRAND.whatsapp} palette={palette} onPress={() => navigation.navigate('Live')} />
            <QuickAction icon="call" label="Live call" color={BRAND.accent} palette={palette} onPress={() => navigation.navigate('Live')} />
            <QuickAction icon="search" label="Archive" color={BRAND.gold} palette={palette} onPress={() => navigation.navigate('Archive')} />
          </View>

          <SectionHeader
            title="Recent transcripts"
            actionLabel="See all"
            onAction={() => navigation.navigate('Archive')}
          />
          <View style={styles.listBlock}>
            {recent.map((t) => (
              <TranscriptCard
                key={t.id}
                transcript={t}
                onPress={() => navigation.navigate('TranscriptDetail', { transcriptId: t.id })}
              />
            ))}
          </View>

          <SectionHeader title="Platform parity" />
          <View style={styles.platformRow}>
            {(['Teams', 'Zoom', 'Meet'] as const).map((p) => (
              <GlassCard key={p} style={styles.platformChip}>
                <Ionicons name="checkmark-circle" size={16} color={BRAND.whatsapp} />
                <Text style={[styles.platformText, { color: palette.textSecondary }]}>{p}-style</Text>
              </GlassCard>
            ))}
          </View>

          <SectionHeader title="What's included" />
          <View style={styles.listBlock}>
            {featureHighlights.map((f) => (
              <GlassCard key={f.title} style={styles.featureCard}>
                <View style={styles.featureRow}>
                  <View style={[styles.featureIcon, { backgroundColor: `${BRAND.accent}18` }]}>
                    <Ionicons name={f.icon} size={20} color={BRAND.accent} />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={[styles.featureTitle, { color: palette.text }]}>{f.title}</Text>
                    <Text style={[styles.featureDesc, { color: palette.textSecondary }]}>{f.description}</Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>

          <View style={{ height: LAYOUT.tabBarClearance }} />
        </ScrollView>
      </SafeAreaView>
    </GlassBackground>
  );
}

function StatCard({ label, value, icon, palette }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap; palette: ThemePalette }) {
  return (
    <GlassCard style={styles.statCard}>
      <Ionicons name={icon} size={18} color={BRAND.accent} />
      <Text style={[styles.statValue, { color: palette.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: palette.textMuted }]}>{label}</Text>
    </GlassCard>
  );
}

function QuickAction({ icon, label, color, palette, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; color: string; palette: ThemePalette; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.actionItem}>
      <GlassCard noPadding style={styles.actionCard}>
        <View style={[styles.actionInner, { backgroundColor: `${color}18` }]}>
          <Ionicons name={icon} size={26} color={color} />
        </View>
      </GlassCard>
      <Text style={[styles.actionLabel, { color: palette.textSecondary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: LAYOUT.screenPaddingH,
    paddingTop: LAYOUT.screenPaddingTop,
  },
  heroOuter: {
    marginBottom: LAYOUT.blockGap,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 20,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  heroInner: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1 },
  heroTitle: { fontSize: FONT.lg, fontWeight: '700', color: '#FFF' },
  heroSub: { fontSize: FONT.sm, color: 'rgba(255,255,255,0.65)', marginTop: 4, lineHeight: 18 },
  deviceBanner: { marginBottom: LAYOUT.blockGap },
  deviceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  deviceText: { fontSize: FONT.sm, flex: 1, lineHeight: 18 },
  statsGrid: { flexDirection: 'row', gap: LAYOUT.itemGap, marginBottom: LAYOUT.blockGap },
  statCard: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 18 },
  statValue: { fontSize: FONT.xl, fontWeight: '800' },
  statLabel: { fontSize: FONT.xs, fontWeight: '500' },
  planCard: { marginBottom: LAYOUT.blockGap },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  planTextBlock: { flex: 1 },
  planLabel: { fontSize: FONT.sm, fontWeight: '500' },
  planName: { fontSize: FONT.xl, fontWeight: '800', marginTop: 4 },
  planBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: RADIUS.full },
  planBadgeText: { fontSize: FONT.xs, fontWeight: '700' },
  planDesc: { fontSize: FONT.sm, lineHeight: 22, marginTop: 14 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: LAYOUT.blockGap },
  actionItem: { alignItems: 'center', gap: 8, flex: 1 },
  actionCard: { borderRadius: RADIUS.lg },
  actionInner: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { fontSize: FONT.sm, fontWeight: '600', textAlign: 'center' },
  listBlock: { gap: LAYOUT.cardGap },
  platformRow: { flexDirection: 'row', gap: 10, marginBottom: LAYOUT.blockGap },
  platformChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12 },
  platformText: { fontSize: FONT.xs, fontWeight: '600' },
  featureCard: {},
  featureRow: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  featureIcon: { width: 48, height: 48, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1 },
  featureTitle: { fontSize: FONT.base, fontWeight: '700' },
  featureDesc: { fontSize: FONT.sm, marginTop: 4, lineHeight: 20 },
});
