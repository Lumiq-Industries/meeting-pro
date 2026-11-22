import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SiteChrome } from '../../components/site/SiteChrome';
import { SiteCta } from '../../components/site/SiteCta';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { GLASS } from '../../constants/glass';
import { webOnlyStyle } from '../../utils/webStyles';
import { TEST_CALL_SEGMENTS, TEST_CALL_TRANSCRIPT, testCallSpeakerName } from '../../data/testCall';

/**
 * Design direction (frontend-design-direction)
 * Purpose: convert operators + Yalma into the TEST MODE workspace.
 * Audience: SA teams who close on WhatsApp voice; investor who already knows VILATECH.
 * Tone: cinematic editorial, dark, tight type — not a SaaS outline of gray tiles.
 * Signature: the call becoming a document (minutes stage), glass only on nav + that stage.
 * Viewports: 390×844, 1440×900.
 */

const palette = COLORS.dark;

const DISPLAY = webOnlyStyle({
  fontFamily: '"Iowan Old Style", Palatino, "Palatino Linotype", Georgia, serif',
});

const LIQUID = webOnlyStyle({
  background: GLASS.fill.cardDark,
  backdropFilter: `blur(${GLASS.blur.webPx.card}px) saturate(${GLASS.saturate.web})`,
  WebkitBackdropFilter: `blur(${GLASS.blur.webPx.card}px) saturate(${GLASS.saturate.web})`,
  boxShadow: GLASS.shadow.card.web,
});

const SNIPPET = TEST_CALL_SEGMENTS.filter((_, i) => i === 1 || i === 6 || i === 13).slice(0, 3);

const WHY = [
  {
    k: '01',
    title: 'The deal lives in the call.',
    body: 'Deposits, dates, and “I’ll email it” vanish the moment someone hangs up. Clients chase. Banks wait.',
  },
  {
    k: '02',
    title: 'WhatsApp is already the office.',
    body: 'Nobody will install another app. They call the Business number. Minutes have to live on that line.',
  },
  {
    k: '03',
    title: 'Typed recaps are fiction.',
    body: 'The CoC booking, the meter reading, the extra R1 500 — if it is not in the transcript, it did not happen.',
  },
];

const HELPS = [
  { title: 'Minutes the same afternoon', body: 'Decisions, actions, and a one-page recap — not a blank notepad.' },
  { title: 'Stay on the number they have', body: 'Clients keep calling WhatsApp Business. You answer in the browser.' },
  { title: 'One pack to forward', body: 'Transcript plus follow-ups in a thread the bank, landlord, or client can use.' },
  { title: 'A record you can stand on', body: 'When someone asks “did we agree Friday at eleven?”, you open the call.' },
];

const STEPS = [
  { n: '01', title: 'They call', body: 'The client dials your WhatsApp Business number — the one they already save.' },
  { n: '02', title: 'You answer', body: 'Pick up in the Meeting Pro browser workspace. No extra app for them.' },
  { n: '03', title: 'Meta writes it down', body: 'After hang-up, WhatsApp transcribes. Meeting Pro keeps the record.' },
  { n: '04', title: 'You send minutes', body: 'Decisions, actions, and the email pack — same day, same thread.' },
];

const FOR = [
  { title: 'Property desks', body: 'Handovers, deposits, and occupation dates that cannot live in someone’s head.' },
  { title: 'Agencies & studios', body: 'Briefings that happen by voice, then need a pack the client can forward.' },
  { title: 'Owner-operators', body: 'You cannot sit in every call. You still have to own what was agreed.' },
];

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.kicker}>{children}</Text>;
}

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 960;
  const wide = width >= 720;
  const { isSignedIn } = useAuth();
  const cta = isSignedIn ? 'Open test workspace' : 'Sign in · TEST MODE';

  useDocumentTitle(
    `${PRODUCT.name} — WhatsApp Business call minutes | ${COMPANY.name}`,
    'Meeting Pro by VILATECH turns WhatsApp Business calls into transcripts, minutes, decisions and follow-ups.'
  );

  return (
    <SiteChrome active="home">
      <View style={[styles.hero, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <SectionLabel>{`${COMPANY.name}  ·  ${PRODUCT.name}  ·  TEST MODE`}</SectionLabel>
          <Text
            accessibilityRole="header"
            {...( { accessibilityLevel: 1 } as object)}
            style={[styles.h1, !split && styles.h1Compact, DISPLAY]}
          >
            Every WhatsApp Business call, written down.
          </Text>
          <Text style={styles.lede}>
            {PRODUCT.name} sits on the number they already call. When the line goes dead you still
            have the transcript, the decisions, and the action list — so the work leaves the phone.
          </Text>
          <View style={styles.ctaRow}>
            <SiteCta label={cta} />
          </View>
          <Text style={styles.fine}>
            R{LEGAL.priceZar}/month after {LEGAL.freeCalls} free transcribed calls. This site is TEST
            MODE until the WhatsApp account is live.
          </Text>
        </View>

        <View
          accessibilityLabel="Product preview: minutes after a WhatsApp call"
          style={[styles.stage, LIQUID]}
        >
          <View style={styles.stageTop}>
            <Text style={styles.stageLive}>After hang-up</Text>
            <Text style={styles.stageMeta}>WhatsApp voice · TEST MODE</Text>
          </View>
          <Text style={[styles.stageTitle, DISPLAY]}>{TEST_CALL_TRANSCRIPT.executiveSummary}</Text>
          <View style={styles.stageRule} />
          {(TEST_CALL_TRANSCRIPT.decisions ?? []).slice(0, 3).map((d) => (
            <Text key={d.id} style={styles.stageItem}>
              {d.text}
            </Text>
          ))}
          <Text style={styles.stageFollow}>
            Thandi · pack to Lesedi and the bank by 16:00
          </Text>
        </View>
      </View>

      <View style={styles.statementBlock}>
        <Text style={[styles.statement, !wide && styles.statementCompact, DISPLAY]}>
          Voice is how South African businesses close. Paper is how they lose it.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionLabel>Why it exists</SectionLabel>
        <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
          The call ends. The record should not.
        </Text>
        <View style={[styles.whyCol, wide && styles.whyRow]}>
          {WHY.map((item) => (
            <View key={item.k} style={styles.whyItem}>
              <Text style={styles.whyIndex}>{item.k}</Text>
              <Text style={styles.whyTitle}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>The product</SectionLabel>
        <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
          A workspace on the number they already save.
        </Text>
        <Text style={styles.bodyWide}>
          {PRODUCT.name} is minutes for WhatsApp Business calling — not another meeting bot. Answer
          in the browser, keep the conversation, send a pack the client can forward. Built by{' '}
          {COMPANY.name} for operators who live on that line.
        </Text>
        <View style={[styles.helpGrid, split && styles.helpGridWide]}>
          {HELPS.map((h) => (
            <View key={h.title} style={[styles.helpItem, split && styles.helpItemWide]}>
              <Text style={styles.helpTitle}>{h.title}</Text>
              <Text style={styles.body}>{h.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>How it works</SectionLabel>
        <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
          Four beats. Same afternoon.
        </Text>
        <View style={styles.spine}>
          {STEPS.map((s, i) => (
            <View key={s.n} style={[styles.spineRow, wide && styles.spineRowWide]}>
              <Text style={[styles.spineN, DISPLAY]}>{s.n}</Text>
              {wide ? <View style={[styles.spineDotWrap, i === STEPS.length - 1 && styles.spineDotLast]} /> : null}
              <View style={styles.spineCopy}>
                <Text style={styles.whyTitle}>{s.title}</Text>
                <Text style={styles.body}>{s.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>Who it is for</SectionLabel>
        <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
          Teams whose real CRM is a WhatsApp chat list.
        </Text>
        <View style={[styles.forCol, split && styles.forRow]}>
          {FOR.map((item) => (
            <View key={item.title} style={styles.forItem}>
              <Text style={[styles.forTitle, DISPLAY]}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>Example · TEST MODE</SectionLabel>
        <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
          One handover. The rest is in the workspace.
        </Text>
        <View
          accessibilityLabel="Snippet of the Sandton unit 12B test call"
          style={[styles.example, LIQUID]}
        >
          <Text style={styles.exampleKicker}>Khaya Property Services · unit 12B Sandton</Text>
          <Text style={styles.exampleTitle}>{TEST_CALL_TRANSCRIPT.title}</Text>
          <Text style={styles.exampleMeta}>
            Thandi · Lesedi Mokoena · {TEST_CALL_TRANSCRIPT.duration}
          </Text>
          <View style={styles.stageRule} />
          {SNIPPET.map((turn, i) => (
            <Text key={`${turn.timestamp}-${i}`} style={styles.snip}>
              <Text style={styles.snipWho}>{testCallSpeakerName(turn.speakerId)}</Text>
              {'  '}
              {turn.text}
            </Text>
          ))}
          <Text style={styles.snipMore}>CoC Thursday 09:00 · keys Friday 11:00 · one email pack</Text>
          <SiteCta label="Open the full call in the test workspace" />
        </View>
      </View>

      <View style={[styles.price, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <SectionLabel>Price</SectionLabel>
          <View style={styles.priceFigureRow}>
            <Text
              accessibilityRole="header"
              {...({ accessibilityLevel: 2 } as object)}
              style={[styles.priceFigure, DISPLAY]}
            >
              R{LEGAL.priceZar}
            </Text>
            <Text style={styles.priceUnit}>/ month</Text>
          </View>
          <Text style={styles.bodyWide}>
            {LEGAL.freeCalls} transcribed calls free, then R{LEGAL.priceZar} for up to{' '}
            {LEGAL.paidCallCap} calls or {LEGAL.paidMinuteCap} minutes. Paystack, ZAR.
          </Text>
        </View>
        <View style={styles.priceCta}>
          <SiteCta label={cta} />
          <Text style={styles.fine}>Everything on this site is TEST MODE.</Text>
        </View>
      </View>
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 40,
    paddingTop: 28,
    paddingBottom: 56,
  },
  heroSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 56,
  },
  heroCopy: { flex: 1.1, gap: 18, minWidth: 260 },
  kicker: {
    color: 'rgba(245,245,245,0.55)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 64,
    fontWeight: '500',
    letterSpacing: -1.8,
    lineHeight: 70,
  },
  h1Compact: { fontSize: 40, lineHeight: 44, letterSpacing: -1.1 },
  h2: {
    color: palette.text,
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: -0.7,
    lineHeight: 38,
    maxWidth: 720,
    marginTop: 10,
    marginBottom: 8,
  },
  lede: {
    color: 'rgba(245,245,245,0.72)',
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 520,
    fontWeight: '400',
  },
  body: { color: palette.textSecondary, fontSize: 16, lineHeight: 26 },
  bodyWide: {
    color: palette.textSecondary,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 640,
    marginBottom: 28,
  },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  fine: { color: palette.textMuted, fontSize: FONT.sm, lineHeight: 20, maxWidth: 420 },
  stage: {
    flex: 0.9,
    minWidth: 260,
    maxWidth: 480,
    gap: 12,
    padding: 28,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
    borderRadius: 28,
  },
  stageTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  stageLive: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  stageMeta: { color: palette.textMuted, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase' },
  stageTitle: {
    color: palette.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '500',
    letterSpacing: -0.4,
  },
  stageRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.14)',
    marginVertical: 6,
  },
  stageItem: { color: palette.textSecondary, fontSize: 15, lineHeight: 24, paddingLeft: 2 },
  stageFollow: { color: 'rgba(245,245,245,0.55)', fontSize: FONT.sm, marginTop: 8 },
  statementBlock: {
    paddingVertical: 72,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statement: {
    color: palette.text,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
    fontWeight: '500',
    maxWidth: 880,
  },
  statementCompact: { fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  section: {
    paddingTop: 80,
    paddingBottom: 8,
  },
  whyCol: { gap: 36, marginTop: 28 },
  whyRow: { flexDirection: 'row', gap: 40 },
  whyItem: { flex: 1, gap: 10, minWidth: 180, maxWidth: 360 },
  whyIndex: {
    color: 'rgba(245,245,245,0.35)',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  whyTitle: { color: palette.text, fontSize: 20, fontWeight: '600', lineHeight: 26, letterSpacing: -0.3 },
  helpGrid: { gap: 32 },
  helpGridWide: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 48, rowGap: 36 },
  helpItem: {
    gap: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.14)',
    paddingLeft: 18,
  },
  helpItemWide: { width: '44%', maxWidth: 480 },
  helpTitle: { color: palette.text, fontSize: 17, fontWeight: '600' },
  spine: { marginTop: 20, gap: 0 },
  spineRow: { gap: 8, paddingVertical: 18, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.1)' },
  spineRowWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 28 },
  spineN: { color: palette.text, fontSize: 28, fontWeight: '500', width: 56, letterSpacing: -0.6 },
  spineDotWrap: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.12)',
    minHeight: 48,
  },
  spineDotLast: { opacity: 0 },
  spineCopy: { flex: 1, gap: 6, paddingBottom: 8 },
  forCol: { gap: 36, marginTop: 20 },
  forRow: { flexDirection: 'row', gap: 40 },
  forItem: { flex: 1, gap: 10, minWidth: 180 },
  forTitle: { color: palette.text, fontSize: 32, fontWeight: '500', letterSpacing: -0.6, lineHeight: 36 },
  example: {
    gap: 10,
    padding: 28,
    marginTop: 12,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
    borderRadius: 28,
  },
  exampleKicker: {
    color: palette.textMuted,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  exampleTitle: { color: palette.text, fontSize: 22, fontWeight: '600', letterSpacing: -0.4 },
  exampleMeta: { color: palette.textSecondary, fontSize: FONT.sm },
  snip: { color: palette.textSecondary, fontSize: 15, lineHeight: 24 },
  snipWho: { color: palette.text, fontWeight: '700' },
  snipMore: { color: palette.textMuted, fontSize: FONT.sm, marginVertical: 8 },
  price: {
    gap: 28,
    paddingTop: 80,
    paddingBottom: 24,
  },
  priceFigureRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' },
  priceFigure: {
    color: palette.text,
    fontSize: 72,
    fontWeight: '500',
    letterSpacing: -2,
    lineHeight: 76,
  },
  priceUnit: {
    fontSize: 22,
    color: palette.textSecondary,
    fontWeight: '400',
    letterSpacing: 0.4,
    paddingBottom: 10,
  },
  priceCta: { flex: 0.7, gap: 12, minWidth: 220, justifyContent: 'center' },
});
