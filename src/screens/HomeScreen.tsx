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
import { COLORS, FONT, RADIUS, BRAND, ThemePalette } from '../constants/theme';
import { LAYOUT } from '../constants/layout';
import { FEATURE_HIGHLIGHTS, NO_VALUE } from '../constants/content';
import { useTranscripts } from '../data/transcriptSource';
import { useDashboardStats, formatHours } from '../data/dashboardStats';
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
  const { transcripts, loading: transcriptsLoading } = useTranscripts();
  const stats = useDashboardStats();
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
            subtitle="Searchable transcripts of your WhatsApp Business calls"
            rightAction={{
              icon: 'logo-whatsapp',
              onPress: () => navigation.navigate('WhatsAppConnect'),
              color: BRAND.whatsapp,
            }}
          />

          {/* Not a call-to-action: there is nothing to start. Transcription
              happens on Meta's servers after a call ends. This explains that
              rather than offering a button that cannot do anything. */}
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
                    <Text style={styles.heroTitle}>Transcription is automatic</Text>
                    <Text style={styles.heroSub}>
                      Calls are transcribed after they end — nothing to start
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
            <StatCard
              label="Sessions"
              value={stats.loading || stats.sessions === null ? NO_VALUE : String(stats.sessions)}
              icon="document-text"
              palette={palette}
            />
            <StatCard
              label="Hours"
              value={stats.loading ? NO_VALUE : formatHours(stats.hours) ?? NO_VALUE}
              icon="time"
              palette={palette}
            />
            <StatCard
              label="Actions"
              value={
                stats.loading || stats.actionItemsOpen === null
                  ? NO_VALUE
                  : String(stats.actionItemsOpen)
              }
              icon="checkbox"
              palette={palette}
            />
          </View>


          <SectionHeader title="Quick actions" />
          <View style={styles.actionsRow}>
            {/* Every one of these goes somewhere that exists. "Voice note" and
                "Live call" used to sit here as if you could start either. */}
            <QuickAction icon="call" label="Calls" color={BRAND.accent} palette={palette} onPress={() => navigation.navigate('Live')} />
            <QuickAction icon="search" label="Archive" color={BRAND.gold} palette={palette} onPress={() => navigation.navigate('Archive')} />
            <QuickAction icon="logo-whatsapp" label="WhatsApp" color={BRAND.whatsapp} palette={palette} onPress={() => navigation.navigate('WhatsAppConnect')} />
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
            {recent.length === 0 && (
              <GlassCard style={styles.emptyCard}>
                <Ionicons
                  name={transcriptsLoading ? 'time-outline' : 'chatbubbles-outline'}
                  size={24}
                  color={palette.textMuted}
                />
                <Text style={[styles.emptyTitle, { color: palette.text }]}>
                  {transcriptsLoading ? 'Loading…' : 'No calls yet'}
                </Text>
                {!transcriptsLoading && (
                  <Text style={[styles.emptyBody, { color: palette.textSecondary }]}>
                    {stats.whatsappConnected === false
                      ? 'No WhatsApp Business number is connected yet, so there is nothing to transcribe.'
                      : 'Transcripts appear here after a call on your WhatsApp Business number. WhatsApp transcribes the call and sends it through once the call ends.'}
                  </Text>
                )}
              </GlassCard>
            )}
          </View>

          <SectionHeader title="What's included" />
          <View style={styles.listBlock}>
            {FEATURE_HIGHLIGHTS.map((f) => (
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
  emptyCard: { alignItems: 'center', gap: 8, paddingVertical: 24 },
  emptyTitle: { fontSize: FONT.base, fontWeight: '700' },
  emptyBody: { fontSize: FONT.sm, textAlign: 'center', lineHeight: 20 },
  statCard: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 18 },
  statValue: { fontSize: FONT.xl, fontWeight: '800' },
  statLabel: { fontSize: FONT.xs, fontWeight: '500' },
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
  featureCard: {},
  featureRow: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  featureIcon: { width: 48, height: 48, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1 },
  featureTitle: { fontSize: FONT.base, fontWeight: '700' },
  featureDesc: { fontSize: FONT.sm, marginTop: 4, lineHeight: 20 },
});
