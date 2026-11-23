import React from 'react';
import { View, Text, StyleSheet, Pressable, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DemoEnvironmentBanner } from '../components/DemoEnvironmentBanner';
import { GlassCard } from '../components/GlassCard';
import { MeetingProMark } from '../components/MeetingProMark';
import { TabScreenLayout } from '../components/TabScreenLayout';
import { ScreenHeader, SectionHeader } from '../components/ScreenHeader';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { ContactAnswerBars } from '../components/charts/ContactAnswerBars';
import { RingGauge } from '../components/charts/RingGauge';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, RADIUS, BRAND, CHART, SPACING, ThemePalette } from '../constants/theme';
import { TYPO } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { NO_VALUE } from '../constants/content';
import { useCallAnalytics } from '../data/callAnalytics';
import { useDashboardStats } from '../data/dashboardStats';
import { formatCallDuration } from '../data/callHistory';
import { MainTabParamList, RootStackParamList } from '../types';
import { DATA_SOURCE } from '../data/transcriptSource';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { resolveAppDataEnvironment } from '../lib/demoEnvironment';

type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = { navigation: HomeNav };

export function HomeScreen({ navigation }: Props) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const analytics = useCallAnalytics();
  const dashboard = useDashboardStats();
  const workspace = useWorkspace();
  const testMode = resolveAppDataEnvironment(workspace.isDemoData) !== 'supabase_live';

  const onRefresh = () => {
    dashboard.reload();
  };

  const answerPct =
    analytics.answerRate != null ? `${Math.round(analytics.answerRate * 100)}%` : NO_VALUE;
  const outcomePct =
    analytics.outcomeRate != null ? `${Math.round(analytics.outcomeRate * 100)}%` : NO_VALUE;

  return (
    <TabScreenLayout
      refreshControl={
        <RefreshControl
          refreshing={analytics.loading}
          onRefresh={onRefresh}
          tintColor={palette.textMuted}
        />
      }
    >
            <ScreenHeader
              title="Dashboard"
              subtitle="Minutes after every WhatsApp Business call"
              textAction={{
                label: 'Connect number',
                onPress: () => navigation.navigate('WhatsAppConnect'),
              }}
            />

            <DemoEnvironmentBanner />

            <WhatsAppStatusCard
              palette={palette}
              connected={dashboard.whatsappConnected}
              onPress={() => navigation.navigate('WhatsAppConnect')}
            />

            <GlassCard style={styles.board}>
              <View style={styles.gaugeRow}>
                <RingGauge
                  value={analytics.answerRate}
                  label="Answered"
                  sublabel={answerPct}
                  color={CHART.answered}
                  size={88}
                />
                <RingGauge
                  value={analytics.outcomeRate}
                  label="Outcomes"
                  sublabel={outcomePct}
                  color={CHART.accent}
                  size={88}
                />
              </View>
              <View style={[styles.metricGrid, { borderTopColor: palette.separator }]}>
                <MetricTile
                  label="Calls"
                  value={analytics.loading ? NO_VALUE : String(analytics.totalCalls)}
                  hint="Logged"
                  icon="call"
                  palette={palette}
                />
                <MetricTile
                  label="Answered"
                  value={analytics.loading ? NO_VALUE : String(analytics.answered)}
                  hint={answerPct}
                  icon="checkmark-circle"
                  palette={palette}
                  accent={BRAND.trustGreen}
                />
                <MetricTile
                  label="Missed"
                  value={analytics.loading ? NO_VALUE : String(analytics.missed)}
                  hint="No transcript"
                  icon="close-circle"
                  palette={palette}
                  accent={BRAND.gray500}
                />
                <MetricTile
                  label="Average"
                  value={analytics.loading ? NO_VALUE : analytics.avgDurationLabel}
                  hint="Talk time"
                  icon="time"
                  palette={palette}
                />
                <MetricTile
                  label="Minutes sent"
                  value={
                    analytics.minutesEmailed != null ? String(analytics.minutesEmailed) : NO_VALUE
                  }
                  hint="Emailed"
                  icon="mail"
                  palette={palette}
                />
                <MetricTile
                  label="Outcomes"
                  value={
                    analytics.positiveOutcomes != null
                      ? String(analytics.positiveOutcomes)
                      : DATA_SOURCE === 'supabase'
                        ? '—'
                        : NO_VALUE
                  }
                  hint={DATA_SOURCE === 'mock' ? outcomePct : 'After summary'}
                  icon="trending-up"
                  palette={palette}
                />
              </View>
            </GlassCard>

            {analytics.medianTimeToTranscriptMinutes != null ? (
              <GlassCard style={styles.speedCard}>
                <Ionicons name="flash" size={20} color={BRAND.qualityBlueLight} />
                <View style={styles.speedBody}>
                  <Text style={[styles.speedTitle, { color: palette.text }]}>
                    ~{analytics.medianTimeToTranscriptMinutes.toFixed(1)} min to transcript
                  </Text>
                  <Text style={[styles.speedSub, { color: palette.textSecondary }]}>
                    Typical time from call end to minutes in your inbox
                  </Text>
                </View>
              </GlassCard>
            ) : null}

            <SectionHeader title={testMode ? 'Call volume (7 days) · TEST MODE' : 'Call volume (7 days)'} />
            <GlassCard style={styles.chartCard}>
              <StackedBarChart data={analytics.volumeByDay} />
            </GlassCard>

            <SectionHeader
              title="Contacts & answer rate"
              actionLabel="All contacts"
              onAction={() => navigation.navigate('Contacts')}
            />
            <GlassCard style={styles.chartCard}>
              <ContactAnswerBars contacts={analytics.contactStats} />
            </GlassCard>

            <SectionHeader
              title="Recent calls"
              actionLabel="View all"
              onAction={() => navigation.navigate('Live')}
            />
            <View style={styles.listBlock}>
              {analytics.recentCalls.length === 0 && !analytics.loading ? (
                <GlassCard style={styles.emptyCard}>
                  <Text style={[styles.emptyTitle, { color: palette.text }]}>
                    No calls logged yet
                  </Text>
                  <Text style={[styles.emptyBody, { color: palette.textSecondary }]}>
                    When someone calls your linked WhatsApp Business line, the call appears here.
                    After the call ends, Meeting Pro transcribes it and emails you minutes.
                  </Text>
                </GlassCard>
              ) : (
                analytics.recentCalls.map((call) => (
                  <Pressable
                    key={call.id}
                    onPress={() =>
                      call.transcriptId
                        ? navigation.navigate('TranscriptDetail', { transcriptId: call.transcriptId })
                        : navigation.navigate('Live')
                    }
                  >
                    <GlassCard style={styles.callRow}>
                      <View style={styles.callIcon}>
                        <Ionicons
                          name={call.durationSeconds ? 'call' : 'call-outline'}
                          size={18}
                          color={call.durationSeconds ? BRAND.whatsapp : palette.textMuted}
                        />
                      </View>
                      <View style={styles.callBody}>
                        <Text style={[styles.callTitle, { color: palette.text }]} numberOfLines={1}>
                          {call.transcriptTitle ?? call.counterparty ?? 'Unknown caller'}
                        </Text>
                        <Text style={[styles.callMeta, { color: palette.textMuted }]}>
                          {formatCallDuration(call.durationSeconds)} ·{' '}
                          {call.transcriptState === 'ready'
                            ? 'Minutes ready'
                            : call.transcriptState === 'failed'
                              ? 'Transcript failed'
                              : 'Processing'}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
                    </GlassCard>
                  </Pressable>
                ))
              )}
            </View>

            <GlassCard style={styles.workflowCard}>
              <Text style={[styles.workflowTitle, { color: palette.text }]}>How it works</Text>
              <WorkflowStep
                n={1}
                text="Add business contacts you call on WhatsApp"
                palette={palette}
              />
              <WorkflowStep
                n={2}
                text="Calls on your Business line auto-transcribe when they end"
                palette={palette}
              />
              <WorkflowStep
                n={3}
                text="AI meeting minutes email to your account — share with clients"
                palette={palette}
              />
            </GlassCard>
    </TabScreenLayout>
  );
}

function WhatsAppStatusCard({
  palette,
  connected,
  onPress,
}: {
  palette: ThemePalette;
  connected: boolean | null;
  onPress: () => void;
}) {
  const label =
    connected === true
      ? 'WhatsApp Business connected'
      : connected === false
        ? 'Connect WhatsApp Business'
        : 'Checking WhatsApp…';
  const sub =
    connected === true
      ? 'Calls transcribe automatically after each conversation ends'
      : 'Link your Business number to start call minutes';

  return (
    <GlassCard onPress={onPress} style={styles.statusCard}>
      <View style={styles.statusRow}>
        <View style={[styles.statusIcon, { backgroundColor: `${BRAND.accent}18` }]}>
          <MeetingProMark size={36} />
        </View>
        <View style={styles.statusBody}>
          <Text style={[styles.statusTitle, { color: palette.text }]}>{label}</Text>
          <Text style={[styles.statusSub, { color: palette.textSecondary }]}>{sub}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={palette.textMuted} />
      </View>
    </GlassCard>
  );
}

function MetricTile({
  label,
  value,
  hint,
  icon,
  palette,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  icon: keyof typeof Ionicons.glyphMap;
  palette: ThemePalette;
  accent?: string;
}) {
  return (
    <View style={styles.metricTile}>
      <Ionicons name={icon} size={14} color={accent ?? BRAND.accent} />
      <Text style={[styles.metricValue, { color: palette.text }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[styles.metricLabel, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.metricHint, { color: palette.textMuted }]} numberOfLines={1}>
        {hint}
      </Text>
    </View>
  );
}

function WorkflowStep({
  n,
  text,
  palette,
}: {
  n: number;
  text: string;
  palette: ThemePalette;
}) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepNum}>{n}</Text>
      </View>
      <Text style={[styles.stepText, { color: palette.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: { marginBottom: LAYOUT.blockGap },
  board: { marginBottom: LAYOUT.blockGap, paddingVertical: 12, gap: 8 },
  gaugeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: SPACING.md,
    paddingBottom: 8,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBody: { flex: 1 },
  statusTitle: { ...TYPO.headline },
  statusSub: { ...TYPO.callout, marginTop: 4 },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
  metricTile: {
    width: '33.33%',
    minWidth: 96,
    flexGrow: 1,
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 4,
  },
  metricLabel: { ...TYPO.footnote, fontWeight: '600' },
  metricHint: { ...TYPO.footnote },
  speedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: LAYOUT.blockGap,
  },
  speedBody: { flex: 1 },
  speedTitle: { ...TYPO.headline },
  speedSub: { ...TYPO.callout, marginTop: 4 },
  chartCard: { marginBottom: LAYOUT.blockGap, alignItems: 'center', paddingVertical: 16 },
  listBlock: { gap: LAYOUT.cardGap, marginBottom: LAYOUT.blockGap },
  callRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  callIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBody: { flex: 1, minWidth: 0 },
  callTitle: { ...TYPO.headline, fontSize: FONT.sm },
  callMeta: { ...TYPO.footnote, marginTop: 4 },
  emptyCard: { gap: 8, paddingVertical: 20 },
  emptyTitle: { fontSize: FONT.base, fontWeight: '700', textAlign: 'center' },
  emptyBody: { fontSize: FONT.sm, textAlign: 'center', lineHeight: 20 },
  workflowCard: { gap: SPACING.md, marginBottom: LAYOUT.blockGap },
  workflowTitle: { ...TYPO.title3 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(59, 130, 246, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { color: '#E0E7FF', fontSize: FONT.sm, fontWeight: '800' },
  stepText: { flex: 1, fontSize: FONT.sm, lineHeight: 20 },
});
