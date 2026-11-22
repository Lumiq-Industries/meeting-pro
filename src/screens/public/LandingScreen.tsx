import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SiteChrome } from '../../components/site/SiteChrome';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT, RADIUS, SPACING, BRAND } from '../../constants/theme';
import { PRODUCT, STUDIO } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { openSitePath } from '../../lib/sitePath';
import {
  TEST_CALL_SEGMENTS,
  TEST_CALL_SPEAKERS,
  TEST_CALL_TRANSCRIPT,
  testCallSpeakerName,
} from '../../data/testCall';

const palette = COLORS.dark;

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 960;
  const { isSignedIn } = useAuth();

  useDocumentTitle(
    `${PRODUCT.name} — test call | ${STUDIO.name}`,
    'Full WhatsApp Business test call: Sandton unit 12B handover. Minutes, decisions, action items.'
  );

  return (
    <SiteChrome active="home">
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>{STUDIO.name} · TEST MODE</Text>
        <Text style={styles.h1}>This is the call. The minutes are already written.</Text>
        <Text style={styles.lede}>
          {PRODUCT.name} sits on a WhatsApp Business number. After hang-up, Meta sends the
          transcript. You get the conversation, the decisions, and an email pack — the same
          afternoon.
        </Text>
        <View style={styles.ctaRow}>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Sign in to the test workspace"
            onPress={() => openSitePath('/app')}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>
              {isSignedIn ? 'Open test workspace' : 'Sign in to the test workspace'}
            </Text>
          </Pressable>
          <Text style={styles.fine}>
            R{LEGAL.priceZar}/month after {LEGAL.freeCalls} free transcribed calls. Everything on
            this site is test until the WhatsApp account is unrestricted.
          </Text>
        </View>
      </View>

      <View style={styles.callStage} accessibilityLabel="Full test call transcript">
        <View style={styles.callHead}>
          <View style={styles.callHeadLeft}>
            <View style={styles.waAvatar}>
              <Ionicons name="call" size={18} color="#052e16" />
            </View>
            <View>
              <Text style={styles.callKicker}>WhatsApp voice call · incoming · TEST MODE</Text>
              <Text style={styles.callTitle}>{TEST_CALL_TRANSCRIPT.title}</Text>
              <Text style={styles.callMeta}>
                Khaya Property Services · Fri 20 Nov 2026 · 09:14–09:26 SAST ·{' '}
                {TEST_CALL_TRANSCRIPT.duration} · {TEST_CALL_SEGMENTS.length} turns
              </Text>
            </View>
          </View>
          <View style={styles.speakers}>
            {TEST_CALL_SPEAKERS.map((s) => (
              <Text key={s.id} style={[styles.speakerChip, { color: s.color }]}>
                {s.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={[styles.callBody, split && styles.callBodySplit]}>
          <View style={styles.transcriptCol}>
            {TEST_CALL_SEGMENTS.map((turn, i) => {
              const business = turn.speakerId === 's-thandi';
              return (
                <View
                  key={`${turn.timestamp}-${i}`}
                  style={[styles.turn, business ? styles.turnBiz : styles.turnCust]}
                >
                  <Text style={[styles.turnMeta, !business && styles.turnMetaCust]}>
                    {testCallSpeakerName(turn.speakerId)} · {turn.timestamp}
                  </Text>
                  <Text style={styles.turnText}>{turn.text}</Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.minutesCol, split && styles.minutesColWide]}>
            <Text style={styles.minutesKicker}>Minutes of the call</Text>
            <Text style={styles.minutesBody}>{TEST_CALL_TRANSCRIPT.summary}</Text>
            <Text style={styles.minutesKicker}>Decisions</Text>
            {(TEST_CALL_TRANSCRIPT.decisions ?? []).map((d) => (
              <Text key={d.id} style={styles.minutesItem}>
                · {d.text}
              </Text>
            ))}
            <Text style={styles.minutesKicker}>Action items</Text>
            {(TEST_CALL_TRANSCRIPT.actionItems ?? []).map((item) => (
              <View key={item.id} style={styles.actionRow}>
                <Ionicons name="square-outline" size={14} color={BRAND.qualityBlueLight} />
                <Text style={styles.minutesItem}>
                  {item.text}
                  {item.assignee ? ` — ${item.assignee}` : ''}
                </Text>
              </View>
            ))}
            <Pressable
              accessibilityRole="link"
              onPress={() => openSitePath('/app')}
              style={styles.minutesCta}
            >
              <Text style={styles.minutesCtaText}>Open this call in the test workspace</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={[styles.lower, split && styles.callBodySplit]}>
        <View style={styles.lowerCol}>
          <Text style={styles.eyebrow}>How it works</Text>
          <Text style={styles.h2}>They stay on WhatsApp. You get the record.</Text>
          <Text style={styles.stepBody}>
            1. Client calls the Business number.{'\n'}
            2. You answer in the browser.{'\n'}
            3. Meta transcribes after hang-up.{'\n'}
            4. Minutes and the transcript land here, then email.
          </Text>
        </View>
        <View style={styles.lowerCol}>
          <Text style={styles.eyebrow}>Price</Text>
          <Text style={styles.h2}>R{LEGAL.priceZar} / month</Text>
          <Text style={styles.stepBody}>
            {LEGAL.freeCalls} transcribed calls free, then R{LEGAL.priceZar} for up to{' '}
            {LEGAL.paidCallCap} calls or {LEGAL.paidMinuteCap} minutes. Paystack, ZAR.
          </Text>
        </View>
      </View>
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  hero: { gap: SPACING.md, maxWidth: 720 },
  eyebrow: {
    color: BRAND.qualityBlueLight,
    fontSize: FONT.xs,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.9,
    lineHeight: 46,
  },
  h2: {
    color: palette.text,
    fontSize: FONT.xxl,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  lede: { color: palette.textSecondary, fontSize: FONT.lg, lineHeight: 26 },
  ctaRow: { gap: SPACING.sm, marginTop: SPACING.sm },
  primary: {
    alignSelf: 'flex-start',
    backgroundColor: BRAND.qualityBlue,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  primaryText: { color: '#FFF', fontWeight: '800', fontSize: FONT.base },
  fine: { color: palette.textMuted, fontSize: FONT.xs, lineHeight: 18, maxWidth: 520 },
  callStage: {
    backgroundColor: 'rgba(10,10,10,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  callHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  callHeadLeft: { flexDirection: 'row', gap: SPACING.md, flex: 1, minWidth: 240 },
  waAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BRAND.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  callKicker: {
    color: palette.textMuted,
    fontSize: FONT.xs,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  callTitle: { color: palette.text, fontSize: FONT.xl, fontWeight: '800', marginTop: 4 },
  callMeta: { color: palette.textSecondary, fontSize: FONT.sm, marginTop: 4, lineHeight: 20 },
  speakers: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' },
  speakerChip: { fontSize: FONT.sm, fontWeight: '700' },
  callBody: { gap: 0 },
  callBodySplit: { flexDirection: 'row', alignItems: 'flex-start' },
  transcriptCol: {
    flex: 1.35,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderRightWidth: 0,
  },
  minutesCol: {
    flex: 0.9,
    minWidth: 260,
    padding: SPACING.lg,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  minutesColWide: {
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.08)',
  },
  turn: {
    gap: 4,
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  turnBiz: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderBottomLeftRadius: 4,
  },
  turnCust: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(37, 211, 102, 0.16)',
    borderBottomRightRadius: 4,
  },
  turnMeta: {
    color: palette.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  turnMetaCust: { color: 'rgba(187, 247, 208, 0.85)', textAlign: 'right' },
  turnText: { color: palette.text, fontSize: FONT.base, lineHeight: 23 },
  minutesKicker: {
    color: BRAND.qualityBlueLight,
    fontSize: FONT.xs,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  minutesBody: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 22 },
  minutesItem: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 21, flex: 1 },
  actionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  minutesCta: {
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 44,
    justifyContent: 'center',
  },
  minutesCtaText: { color: palette.text, fontWeight: '700', fontSize: FONT.sm },
  lower: { gap: SPACING.xl, paddingBottom: SPACING.lg },
  lowerCol: { flex: 1, gap: SPACING.sm, minWidth: 240 },
  stepBody: { color: palette.textSecondary, fontSize: FONT.base, lineHeight: 24 },
});
