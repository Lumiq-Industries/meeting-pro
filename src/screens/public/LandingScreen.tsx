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
import { TEST_CALL_TRANSCRIPT } from '../../data/testCall';

const palette = COLORS.dark;

const PROBLEMS = [
  {
    title: 'The call ends. The work doesn’t.',
    body: 'Owners re-type WhatsApp conversations into quotes, emails and jobs. That is where money leaks.',
  },
  {
    title: 'Voice notes are not a record.',
    body: 'A ten-minute handover has deposit, keys, CoC and a bank pack in it. None of that lives in the chat list.',
  },
  {
    title: 'The number is the product.',
    body: 'Clients already call WhatsApp Business. Meeting Pro sits on that number. They do not install anything.',
  },
] as const;

const STEPS = [
  {
    n: '01',
    title: 'They call your WhatsApp Business number',
    body: 'You answer in the browser. The caller stays on WhatsApp.',
  },
  {
    n: '02',
    title: 'Meta writes the call down',
    body: 'Transcription runs on WhatsApp Cloud API after hang-up. We do not record your phone.',
  },
  {
    n: '03',
    title: 'Minutes land in the workspace — and email',
    body: 'Decisions, follow-ups, action items. Searchable. Forwardable to a bank or a client.',
  },
] as const;

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 860;
  const { isSignedIn } = useAuth();

  useDocumentTitle(
    `${PRODUCT.name} — WhatsApp Business call minutes | ${STUDIO.name}`,
    `Turn WhatsApp Business calls into minutes. ${LEGAL.freeCalls} free transcribed calls, then R${LEGAL.priceZar}/month.`
  );

  return (
    <SiteChrome active="home">
      <View style={[styles.hero, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>{STUDIO.name}</Text>
          <Text style={styles.h1}>WhatsApp already took the call. The minutes should already exist.</Text>
          <Text style={styles.lede}>
            {PRODUCT.name} turns a WhatsApp Business call into searchable minutes, decisions and
            an email pack — for any country code, once the live number is unlocked.
          </Text>
          <View style={styles.ctaRow}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={isSignedIn ? 'Open workspace' : 'Sign in to the test workspace'}
              onPress={() => openSitePath('/app')}
              style={styles.primary}
            >
              <Text style={styles.primaryText}>
                {isSignedIn ? 'Open workspace' : 'Sign in · see the test call'}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Privacy policy"
              onPress={() => openSitePath('/privacy')}
              style={styles.ghost}
            >
              <Text style={styles.ghostText}>Privacy</Text>
            </Pressable>
          </View>
          <Text style={styles.fine}>
            {LEGAL.freeCalls} transcribed calls free, then R{LEGAL.priceZar}/month. Live numbers
            need a production WhatsApp account — that is what investment unlocks.
          </Text>
        </View>

        <View style={styles.sheet} accessibilityLabel="Test call minutes">
          <View style={styles.sheetHead}>
            <Text style={styles.sheetKicker}>Test call · 10 min · account restricted</Text>
            <Text style={styles.sheetTitle}>{TEST_CALL_TRANSCRIPT.title}</Text>
          </View>
          <Text style={styles.sheetLine}>{TEST_CALL_TRANSCRIPT.executiveSummary}</Text>
          {(TEST_CALL_TRANSCRIPT.actionItems ?? []).slice(0, 3).map((item) => (
            <View key={item.id} style={styles.sheetRow}>
              <Ionicons name="checkmark-circle-outline" size={16} color={BRAND.trustGreen} />
              <Text style={styles.sheetLine}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.problems}>
        {PROBLEMS.map((p) => (
          <View key={p.title} style={styles.problem}>
            <Text style={styles.problemTitle}>{p.title}</Text>
            <Text style={styles.stepBody}>{p.body}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.price, split && styles.heroSplit]}>
        <View style={{ flex: 1, gap: SPACING.sm }}>
          <Text style={styles.eyebrow}>Why it converts</Text>
          <Text style={styles.h2}>A missed follow-up is a missed invoice</Text>
          <Text style={styles.lede}>
            Illustration of the job the product does — not live traffic. The test call in the
            workspace is the real walkthrough.
          </Text>
        </View>
        <View style={styles.chartCard}>
          <View style={styles.barBlock}>
            <Text style={styles.barLabel}>Without minutes</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: '38%', backgroundColor: BRAND.gray700 }]} />
            </View>
            <Text style={styles.barHint}>Follow-ups live in someone’s head</Text>
          </View>
          <View style={styles.barBlock}>
            <Text style={styles.barLabel}>With Meeting Pro</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: '92%', backgroundColor: BRAND.trustGreen }]} />
            </View>
            <Text style={styles.barHint}>Written decisions, emailed the same afternoon</Text>
          </View>
        </View>
      </View>

      <View style={styles.steps}>
        {STEPS.map((step) => (
          <View key={step.n} style={styles.step}>
            <Text style={styles.stepN}>{step.n}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepBody}>{step.body}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.price, split && styles.heroSplit]}>
        <View style={{ flex: 1, gap: SPACING.sm }}>
          <Text style={styles.eyebrow}>Pricing</Text>
          <Text style={styles.h2}>R{LEGAL.priceZar} per business, per month</Text>
          <Text style={styles.lede}>
            One workspace. One WhatsApp Business number. Any country code on the number — once
            Meta calling is live on that line.
          </Text>
        </View>
        <View style={styles.priceCard}>
          <Text style={styles.priceAmt}>R{LEGAL.priceZar}</Text>
          <Text style={styles.pricePer}>/ month after {LEGAL.freeCalls} free calls</Text>
          {[
            `${LEGAL.freeCalls} transcribed calls free`,
            `Then ${LEGAL.paidCallCap} calls or ${LEGAL.paidMinuteCap} minutes`,
            'Minutes emailed after Meta sends the transcript',
            'Pay with Paystack (ZAR)',
          ].map((item) => (
            <View key={item} style={styles.priceItem}>
              <Ionicons name="checkmark" size={16} color={BRAND.trustGreen} />
              <Text style={styles.priceItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.notList}>
        <Text style={styles.h2}>What this is not</Text>
        <Text style={styles.lede}>
          We do not record the call on your device. We do not listen live. Transcription is
          Meta’s. The test call you will see after sign-in is the one call we can show while the
          WhatsApp developer account is restricted. Scaling to any number in the country — or the
          world — is the production account investment unlocks.
        </Text>
      </View>
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  hero: { gap: SPACING.xl },
  heroSplit: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.xl },
  heroCopy: { flex: 1, gap: SPACING.md, minWidth: 260 },
  eyebrow: {
    color: BRAND.qualityBlueLight,
    fontSize: FONT.xs,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 42,
  },
  h2: {
    color: palette.text,
    fontSize: FONT.xxl,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  lede: { color: palette.textSecondary, fontSize: FONT.lg, lineHeight: 26, maxWidth: 520 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  primary: {
    backgroundColor: BRAND.qualityBlue,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  primaryText: { color: '#FFF', fontWeight: '800', fontSize: FONT.base },
  ghost: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  ghostText: { color: palette.text, fontWeight: '700', fontSize: FONT.base },
  fine: { color: palette.textMuted, fontSize: FONT.xs, lineHeight: 18, maxWidth: 460 },
  sheet: {
    flex: 1,
    minWidth: 260,
    maxWidth: 440,
    backgroundColor: 'rgba(20,20,20,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  sheetHead: { gap: 4, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', paddingBottom: SPACING.sm },
  sheetKicker: { color: palette.textMuted, fontSize: FONT.xs, letterSpacing: 1, textTransform: 'uppercase' },
  sheetTitle: { color: palette.text, fontSize: FONT.lg, fontWeight: '700' },
  sheetRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  sheetLine: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 22, flex: 1 },
  problems: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.lg },
  problem: { flexGrow: 1, flexBasis: 240, gap: 8 },
  problemTitle: { color: palette.text, fontSize: FONT.lg, fontWeight: '700', lineHeight: 24 },
  chartCard: {
    minWidth: 260,
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  barBlock: { gap: 6 },
  barLabel: { color: palette.text, fontSize: FONT.sm, fontWeight: '700' },
  barTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  barFill: { height: 10, borderRadius: 999 },
  barHint: { color: palette.textMuted, fontSize: FONT.xs },
  steps: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.lg },
  step: { flexGrow: 1, flexBasis: 240, gap: SPACING.sm },
  stepN: { color: palette.textMuted, fontSize: FONT.xs, fontWeight: '700', letterSpacing: 1.4 },
  stepTitle: { color: palette.text, fontSize: FONT.lg, fontWeight: '700', lineHeight: 24 },
  stepBody: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 22 },
  price: { gap: SPACING.lg, alignItems: 'flex-start' },
  priceCard: {
    minWidth: 260,
    backgroundColor: 'rgba(20,20,20,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  priceAmt: { color: palette.text, fontSize: 40, fontWeight: '800', letterSpacing: -1 },
  pricePer: { color: palette.textMuted, fontSize: FONT.sm, marginBottom: SPACING.sm },
  priceItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  priceItemText: { color: palette.textSecondary, fontSize: FONT.sm, flex: 1 },
  notList: { gap: SPACING.sm, paddingBottom: SPACING.lg },
});
