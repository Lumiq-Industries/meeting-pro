import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SiteChrome } from '../../components/site/SiteChrome';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT, RADIUS, SPACING, BRAND } from '../../constants/theme';
import { PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { openSitePath } from '../../lib/sitePath';

const palette = COLORS.dark;

const STEPS = [
  {
    n: '01',
    title: 'A client calls your WhatsApp Business number',
    body: 'You answer from Meeting Pro in the browser. The caller stays on WhatsApp. No extra app for them.',
  },
  {
    n: '02',
    title: 'WhatsApp writes the call down',
    body: 'Meta transcribes the call on its side after it ends. We never put a recorder on your phone.',
  },
  {
    n: '03',
    title: 'You get minutes, not a voicenote pile',
    body: 'Decisions, follow-ups and action items land in your workspace. Search them. Send them on.',
  },
] as const;

const SAMPLE = [
  { who: 'Client', line: 'Can we move the handover to Thursday, same price?' },
  { who: 'You', line: 'Thursday works. I’ll send the updated offer this afternoon.' },
  { who: 'Minutes', line: 'Handover moved to Thursday. Price unchanged. Offer to be sent today.' },
] as const;

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 860;
  const { isSignedIn } = useAuth();

  useDocumentTitle(
    `${PRODUCT.name} — WhatsApp Business call minutes | VILATECH`,
    `Turn WhatsApp Business calls into minutes. ${LEGAL.freeCalls} free transcribed calls, then R${LEGAL.priceZar}/month.`
  );

  return (
    <SiteChrome active="home">
      <View style={[styles.hero, split && styles.heroSplit]}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>For businesses that live on WhatsApp</Text>
          <Text style={styles.h1}>The call happened. The minutes should already exist.</Text>
          <Text style={styles.lede}>
            {PRODUCT.name} turns WhatsApp Business calls into searchable minutes, decisions and
            follow-ups — R{LEGAL.priceZar} a month after {LEGAL.freeCalls} free transcribed calls.
          </Text>
          <View style={styles.ctaRow}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={isSignedIn ? 'Open workspace' : 'Start free'}
              onPress={() => openSitePath('/app')}
              style={styles.primary}
            >
              <Text style={styles.primaryText}>
                {isSignedIn ? 'Open workspace' : `Start — ${LEGAL.freeCalls} free calls`}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Read the terms"
              onPress={() => openSitePath('/terms')}
              style={styles.ghost}
            >
              <Text style={styles.ghostText}>See the terms</Text>
            </Pressable>
          </View>
          <Text style={styles.fine}>
            Then R{LEGAL.priceZar}/month. Cap of {LEGAL.paidCallCap} transcribed calls or{' '}
            {LEGAL.paidMinuteCap} minutes. Cancel anytime.
          </Text>
        </View>

        <View style={styles.sheet} accessibilityLabel="Example call minutes">
          <View style={styles.sheetHead}>
            <Text style={styles.sheetKicker}>Example · not a real client</Text>
            <Text style={styles.sheetTitle}>Handover call · 4 min</Text>
          </View>
          {SAMPLE.map((row) => (
            <View key={row.line} style={styles.sheetRow}>
              <Text style={styles.sheetWho}>{row.who}</Text>
              <Text style={styles.sheetLine}>{row.line}</Text>
            </View>
          ))}
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
            One workspace. One WhatsApp Business number. Enough for a small team that actually
            answers the phone.
          </Text>
        </View>
        <View style={styles.priceCard}>
          <Text style={styles.priceAmt}>R{LEGAL.priceZar}</Text>
          <Text style={styles.pricePer}>/ month after {LEGAL.freeCalls} free calls</Text>
          {[
            `${LEGAL.freeCalls} transcribed calls free`,
            `Then ${LEGAL.paidCallCap} calls or ${LEGAL.paidMinuteCap} minutes`,
            'Minutes, decisions, action items',
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
          We do not record the call on your device. We do not listen live. We do not sell your
          clients’ conversations. Transcription is Meta’s WhatsApp Cloud API; we store what they
          send us so you can work from it.
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
  fine: { color: palette.textMuted, fontSize: FONT.xs, lineHeight: 18 },
  sheet: {
    flex: 1,
    minWidth: 260,
    maxWidth: 420,
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
  sheetRow: { gap: 4 },
  sheetWho: { color: BRAND.qualityBlueLight, fontSize: FONT.xs, fontWeight: '700' },
  sheetLine: { color: palette.textSecondary, fontSize: FONT.base, lineHeight: 22 },
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
