import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SiteChrome } from '../../components/site/SiteChrome';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT, RADIUS, SPACING, BRAND } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { openSitePath } from '../../lib/sitePath';
import {
  TEST_CALL_SEGMENTS,
  TEST_CALL_TRANSCRIPT,
  testCallSpeakerName,
} from '../../data/testCall';

const palette = COLORS.dark;

const EXAMPLE_TURNS = TEST_CALL_SEGMENTS.slice(0, 5);

const PROBLEM = [
  {
    title: 'The call ends. The record does not.',
    body: 'Deposits, dates, and “I’ll email it” live in someone’s memory until they don’t. Clients chase. Banks wait. Staff argue over what was said.',
  },
  {
    title: 'WhatsApp is already the office.',
    body: 'Your clients will not install another app. They call the Business number. If the minutes are not on that line, they are not in the business.',
  },
  {
    title: 'Notes after the fact are fiction.',
    body: 'Typed recaps miss the CoC booking, the meter reading, the extra R1 500. The transcript is the source. Minutes should follow from it.',
  },
];

const BENEFITS = [
  {
    icon: 'document-text-outline' as const,
    title: 'Minutes the same afternoon',
    body: 'Decisions, action items, and a one-page recap — not a blank notepad.',
  },
  {
    icon: 'logo-whatsapp' as const,
    title: 'Stay on WhatsApp',
    body: 'Clients keep calling the number they already have. You answer in the browser.',
  },
  {
    icon: 'mail-outline' as const,
    title: 'One pack to forward',
    body: 'Transcript plus follow-ups in a thread the bank, landlord, or client can use.',
  },
  {
    icon: 'shield-checkmark-outline' as const,
    title: 'A record you can stand on',
    body: 'When someone asks “did we agree Friday at eleven?”, you open the call.',
  },
];

const STEPS = [
  { n: '1', title: 'They call', body: 'Client dials your WhatsApp Business number.' },
  { n: '2', title: 'You answer', body: 'Pick up in the Meeting Pro browser workspace.' },
  { n: '3', title: 'Meta transcribes', body: 'After hang-up, the conversation is written down.' },
  { n: '4', title: 'You send minutes', body: 'Decisions, actions, and email — same day.' },
];

const FOR_WHOM = [
  'Property and rental desks that hand over units on WhatsApp',
  'Agencies and studios that take briefings by voice, not email',
  'Owner-operators who cannot sit in every call but must own the outcome',
];

function Cta({ signedIn, label }: { signedIn: boolean; label?: string }) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel="Sign in to the test workspace"
      onPress={() => openSitePath('/app')}
      style={styles.primary}
    >
      <Text style={styles.primaryText}>
        {label ?? (signedIn ? 'Open test workspace' : 'Sign in · TEST MODE')}
      </Text>
    </Pressable>
  );
}

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 900;
  const { isSignedIn } = useAuth();

  useDocumentTitle(
    `${PRODUCT.name} — WhatsApp Business call minutes | ${COMPANY.name}`,
    'Meeting Pro turns WhatsApp Business calls into transcripts, minutes, decisions and follow-ups.'
  );

  return (
    <SiteChrome active="home">
      <View style={[styles.hero, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>
            {COMPANY.name} · {PRODUCT.name} · TEST MODE
          </Text>
          <Text style={[styles.h1, !split && styles.h1Compact]}>
            Every WhatsApp Business call, written down.
          </Text>
          <Text style={styles.lede}>
            {PRODUCT.name} sits on your WhatsApp Business number. When the call ends, you get the
            transcript, the decisions, and the action list — so the work actually leaves the phone.
          </Text>
          <View style={styles.ctaRow}>
            <Cta signedIn={isSignedIn} />
            <Text style={styles.fine}>
              R{LEGAL.priceZar}/month after {LEGAL.freeCalls} free transcribed calls. This site is
              TEST MODE until the WhatsApp account is live.
            </Text>
          </View>
        </View>
        <View style={styles.heroProof} accessibilityLabel="Product preview: minutes of a test call">
          <Text style={styles.proofKicker}>After hang-up</Text>
          <Text style={styles.proofTitle}>{TEST_CALL_TRANSCRIPT.executiveSummary}</Text>
          {(TEST_CALL_TRANSCRIPT.decisions ?? []).slice(0, 3).map((d) => (
            <Text key={d.id} style={styles.proofItem}>
              · {d.text}
            </Text>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.eyebrow}>The problem</Text>
        <Text style={styles.h2}>Voice is how South African businesses close. Paper is how they lose it.</Text>
        <View style={[styles.grid3, split && styles.grid3Wide]}>
          {PROBLEM.map((p) => (
            <View key={p.title} style={styles.tile}>
              <Text style={styles.tileTitle}>{p.title}</Text>
              <Text style={styles.body}>{p.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.eyebrow}>The product</Text>
        <Text style={styles.h2}>A workspace on the number they already call.</Text>
        <Text style={styles.bodyWide}>
          {PRODUCT.name} is not another meeting bot. It is minutes for WhatsApp Business calling:
          answer in the browser, keep the conversation, and send a pack the client can forward. Built
          by {COMPANY.name} for operators who live on that green icon.
        </Text>
      </View>

      <View>
        <Text style={styles.eyebrow}>How it works</Text>
        <View style={[styles.grid4, split && styles.grid4Wide]}>
          {STEPS.map((s) => (
            <View key={s.n} style={styles.step}>
              <Text style={styles.stepN}>{s.n}</Text>
              <Text style={styles.tileTitle}>{s.title}</Text>
              <Text style={styles.body}>{s.body}</Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.eyebrow}>Why it helps</Text>
        <View style={[styles.grid2, split && styles.grid2Wide]}>
          {BENEFITS.map((b) => (
            <View key={b.title} style={styles.benefit}>
              <Ionicons name={b.icon} size={22} color={BRAND.qualityBlueLight} />
              <View style={styles.benefitText}>
                <Text style={styles.tileTitle}>{b.title}</Text>
                <Text style={styles.body}>{b.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.eyebrow}>Who it is for</Text>
        <Text style={styles.h2}>Teams whose real CRM is a WhatsApp chat list.</Text>
        {FOR_WHOM.map((line) => (
          <Text key={line} style={styles.whoLine}>
            · {line}
          </Text>
        ))}
      </View>

      <View>
        <Text style={styles.eyebrow}>Example · TEST MODE</Text>
        <Text style={styles.h2}>One test call. The rest of the transcript is in the workspace.</Text>
        <View style={styles.example} accessibilityLabel="Snippet of the Sandton handover test call">
          <View style={styles.exampleHead}>
            <View style={styles.waAvatar}>
              <Ionicons name="call" size={16} color="#052e16" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.callKicker}>WhatsApp voice · Khaya Property Services</Text>
              <Text style={styles.callTitle}>{TEST_CALL_TRANSCRIPT.title}</Text>
              <Text style={styles.callMeta}>
                Thandi · Lesedi Mokoena · {TEST_CALL_TRANSCRIPT.duration} · TEST MODE
              </Text>
            </View>
          </View>
          {EXAMPLE_TURNS.map((turn, i) => (
            <Text key={`${turn.timestamp}-${i}`} style={styles.snip}>
              <Text style={styles.snipWho}>{testCallSpeakerName(turn.speakerId)}</Text>
              {'  '}
              {turn.text}
            </Text>
          ))}
          <Text style={styles.snipMore}>
            + {TEST_CALL_SEGMENTS.length - EXAMPLE_TURNS.length} more turns · CoC, deposit, meters,
            keys Friday 11:00
          </Text>
          <Cta signedIn={isSignedIn} label="Open the full call in the test workspace" />
        </View>
      </View>

      <View style={[styles.priceRow, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Price</Text>
          <Text style={styles.h2}>R{LEGAL.priceZar} / month</Text>
          <Text style={styles.body}>
            {LEGAL.freeCalls} transcribed calls free, then R{LEGAL.priceZar} for up to{' '}
            {LEGAL.paidCallCap} calls or {LEGAL.paidMinuteCap} minutes. Paystack, ZAR.
          </Text>
        </View>
        <View style={styles.ctaEnd}>
          <Cta signedIn={isSignedIn} />
          <Text style={styles.fine}>Everything on this site is TEST MODE.</Text>
        </View>
      </View>
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  hero: { gap: SPACING.xl },
  heroSplit: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.xl },
  heroCopy: { flex: 1.15, gap: SPACING.md, minWidth: 260 },
  eyebrow: {
    color: BRAND.qualityBlueLight,
    fontSize: FONT.xs,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 48,
  },
  h1Compact: { fontSize: 32, lineHeight: 38 },
  h2: {
    color: palette.text,
    fontSize: FONT.xxl,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 32,
    marginTop: 8,
    marginBottom: SPACING.md,
    maxWidth: 720,
  },
  lede: { color: palette.textSecondary, fontSize: FONT.lg, lineHeight: 26, maxWidth: 560 },
  body: { color: palette.textSecondary, fontSize: FONT.base, lineHeight: 24 },
  bodyWide: { color: palette.textSecondary, fontSize: FONT.lg, lineHeight: 26, maxWidth: 720 },
  ctaRow: { gap: SPACING.sm, marginTop: SPACING.sm },
  ctaEnd: { flex: 0.7, gap: SPACING.sm, minWidth: 220, justifyContent: 'center' },
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
  fine: { color: palette.textMuted, fontSize: FONT.xs, lineHeight: 18, maxWidth: 420 },
  heroProof: {
    flex: 0.85,
    minWidth: 260,
    gap: 8,
    padding: SPACING.lg,
    backgroundColor: 'rgba(10,10,10,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.lg,
  },
  proofKicker: {
    color: BRAND.trustGreen,
    fontSize: FONT.xs,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  proofTitle: { color: palette.text, fontSize: FONT.base, lineHeight: 22, fontWeight: '600' },
  proofItem: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 21 },
  grid3: { gap: SPACING.lg },
  grid3Wide: { flexDirection: 'row' },
  grid2: { gap: SPACING.lg },
  grid2Wide: { flexDirection: 'row', flexWrap: 'wrap' },
  grid4: { gap: SPACING.lg },
  grid4Wide: { flexDirection: 'row' },
  tile: { flex: 1, gap: 8, minWidth: 200 },
  tileTitle: { color: palette.text, fontSize: FONT.lg, fontWeight: '700', lineHeight: 24 },
  step: { flex: 1, gap: 6, minWidth: 140 },
  stepN: { color: BRAND.qualityBlueLight, fontSize: FONT.xl, fontWeight: '800' },
  benefit: { flexDirection: 'row', gap: 12, flex: 1, minWidth: 280, maxWidth: 520 },
  benefitText: { flex: 1, gap: 4 },
  whoLine: { color: palette.textSecondary, fontSize: FONT.base, lineHeight: 26 },
  example: {
    gap: 10,
    padding: SPACING.lg,
    backgroundColor: 'rgba(10,10,10,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.lg,
  },
  exampleHead: { flexDirection: 'row', gap: 12, marginBottom: 6 },
  waAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  callKicker: {
    color: palette.textMuted,
    fontSize: FONT.xs,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  callTitle: { color: palette.text, fontSize: FONT.lg, fontWeight: '800', marginTop: 2 },
  callMeta: { color: palette.textSecondary, fontSize: FONT.sm, marginTop: 2 },
  snip: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 22 },
  snipWho: { color: palette.text, fontWeight: '700' },
  snipMore: { color: palette.textMuted, fontSize: FONT.xs, marginVertical: 4 },
  priceRow: { gap: SPACING.lg, paddingBottom: SPACING.lg },
});
