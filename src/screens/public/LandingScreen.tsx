import React, { ReactNode } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SiteChrome } from '../../components/site/SiteChrome';
import { SiteCta } from '../../components/site/SiteCta';
import { LandingReveal } from '../../components/site/LandingReveal';
import {
  IconActions,
  IconClock,
  IconEmail,
  IconHandset,
  IconMinutes,
  IconTranscript,
} from '../../components/site/LandingIcons';
import { SceneCallToMinutes, SceneEmailPack } from '../../components/site/LandingScenes';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { GLASS } from '../../constants/glass';
import { webOnlyStyle } from '../../utils/webStyles';

const heroDesk = require('../../../assets/landing/hero-voice-desk.jpg');
const minutesDesk = require('../../../assets/landing/minutes-workspace.jpg');
const operatorDesk = require('../../../assets/landing/operator-answer.jpg');

/**
 * Design direction
 * Purpose: sell TEST MODE workspace — operators who close on WhatsApp Business voice.
 * Audience: SA desks + one investor. Sandton call is a small proof, not the page.
 * Tone: cinematic editorial, dark, photographic, not a SaaS outline.
 * Signature: the hung-up phone becoming a minutes sheet (photo + original SVG).
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

const BEATS = [
  {
    n: '01',
    title: 'They call',
    body: 'The client dials the WhatsApp Business number they already save.',
    Icon: IconHandset,
    tint: '#25D366',
  },
  {
    n: '02',
    title: 'You answer',
    body: 'Pick up in the Meeting Pro browser workspace. No extra app for them.',
    Icon: IconClock,
    tint: '#FAFAFA',
  },
  {
    n: '03',
    title: 'The line is written',
    body: 'After hang-up, WhatsApp transcribes. Meeting Pro keeps the record.',
    Icon: IconTranscript,
    tint: '#FAFAFA',
  },
  {
    n: '04',
    title: 'You send the pack',
    body: 'Decisions, actions, and the email — same afternoon, same thread.',
    Icon: IconEmail,
    tint: '#60A5FA',
  },
];

const PRODUCTS = [
  {
    title: 'Transcript',
    body: 'Every turn, timed. If it was said, it is here.',
    Icon: IconTranscript,
  },
  {
    title: 'Minutes',
    body: 'Decisions on one page — not a blank notepad.',
    Icon: IconMinutes,
  },
  {
    title: 'Actions',
    body: 'Owners and due times you can actually chase.',
    Icon: IconActions,
  },
  {
    title: 'Email pack',
    body: 'Forward to the bank, landlord, or client.',
    Icon: IconEmail,
  },
];

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.kicker}>{children}</Text>;
}

function IconWell({ children, tint }: { children: ReactNode; tint?: string }) {
  return (
    <View
      style={[
        styles.iconWell,
        tint === '#25D366' && styles.iconWellGreen,
        webOnlyStyle({
          background:
            tint === '#25D366'
              ? 'rgba(37, 211, 102, 0.12)'
              : 'rgba(255,255,255,0.06)',
        }),
      ]}
    >
      {children}
    </View>
  );
}

export function LandingScreen() {
  const { width } = useWindowDimensions();
  const split = width >= 960;
  const wide = width >= 720;
  const { isSignedIn } = useAuth();
  const cta = isSignedIn ? 'Open test workspace' : 'Sign in · TEST MODE';
  const sceneW = Math.min(width - 48, split ? 520 : 640);
  const sceneH = Math.round(sceneW * 0.56);

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
            {...({ accessibilityLevel: 1 } as object)}
            style={[styles.h1, !split && styles.h1Compact, DISPLAY]}
          >
            Every WhatsApp Business call, written down.
          </Text>
          <Text style={styles.lede}>
            {PRODUCT.name} sits on the number they already call. When the line goes dead you still
            have the transcript, the decisions, and the action list — so the work leaves the phone.
          </Text>
          <View style={styles.iconStrip} accessibilityLabel="Product pieces">
            <IconWell tint="#25D366">
              <IconHandset size={22} color="#25D366" label="Handset and conversation bubble" />
            </IconWell>
            <IconWell>
              <IconTranscript size={22} label="Transcript" />
            </IconWell>
            <IconWell>
              <IconMinutes size={22} label="Minutes" />
            </IconWell>
            <IconWell>
              <IconActions size={22} label="Actions" />
            </IconWell>
            <IconWell>
              <IconEmail size={22} label="Email" />
            </IconWell>
            <IconWell>
              <IconClock size={22} label="Clock" />
            </IconWell>
          </View>
          <View style={styles.ctaRow}>
            <SiteCta label={cta} />
          </View>
          <Text style={styles.fine}>
            R{LEGAL.priceZar}/month after {LEGAL.freeCalls} free transcribed calls. This site is TEST
            MODE until the WhatsApp account is live.
          </Text>
        </View>

        <View style={styles.heroVisual}>
          <Image
            source={heroDesk}
            style={[styles.heroPhoto, !split && styles.heroPhotoCompact]}
            resizeMode="cover"
            accessibilityLabel="Desk after a business voice call: phone down, minutes printed beside it"
          />
          <View style={[styles.stage, LIQUID]} accessibilityLabel="Minutes after hang-up">
            <View style={styles.stageTop}>
              <Text style={styles.stageLive}>After hang-up</Text>
              <Text style={styles.stageMeta}>Voice · TEST MODE</Text>
            </View>
            <Text style={[styles.stageTitle, DISPLAY]}>Occupation Friday 11:00. CoC Thursday 09:00.</Text>
            <View style={styles.stageRule} />
            <View style={styles.stageRow}>
              <IconMinutes size={16} color="rgba(245,245,245,0.7)" label="" />
              <Text style={styles.stageItem}>Keys only after the meter photo</Text>
            </View>
            <View style={styles.stageRow}>
              <IconActions size={16} color="rgba(245,245,245,0.7)" label="" />
              <Text style={styles.stageItem}>Pack to Lesedi and the bank by 16:00</Text>
            </View>
            <View style={styles.stageRow}>
              <IconEmail size={16} color="rgba(245,245,245,0.7)" label="" />
              <Text style={styles.stageItem}>One email. Not a chat dump.</Text>
            </View>
          </View>
        </View>
      </View>

      <LandingReveal>
        <View style={styles.statementBlock}>
          <Text style={[styles.statement, !wide && styles.statementCompact, DISPLAY]}>
            Voice is how South African businesses close. Paper is how they lose it.
          </Text>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View style={styles.section}>
          <SectionLabel>How it works</SectionLabel>
          <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
            Four beats. Same afternoon.
          </Text>
          <View style={[styles.howWrap, split && styles.howWrapSplit]}>
            <View style={styles.sceneHold}>
              <SceneCallToMinutes
                width={sceneW}
                height={sceneH}
                label="Original illustration: handset and conversation bubble becoming a minutes sheet. Not a WhatsApp trademark logo."
              />
            </View>
            <View style={styles.beatCol}>
              {BEATS.map((b) => (
                <View key={b.n} style={styles.beatRow}>
                  <IconWell tint={b.tint}>
                    <b.Icon size={22} color={b.tint} label={b.title} />
                  </IconWell>
                  <View style={styles.beatCopy}>
                    <Text style={styles.beatN}>{b.n}</Text>
                    <Text style={styles.whyTitle}>{b.title}</Text>
                    <Text style={styles.body}>{b.body}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View style={styles.section}>
          <SectionLabel>The product</SectionLabel>
          <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
            A workspace on the number they already save.
          </Text>
          <View style={[styles.productSplit, split && styles.heroSplit]}>
            <Image
            source={minutesDesk}
            style={[styles.productPhoto, !split && styles.productPhotoCompact]}
            resizeMode="cover"
              accessibilityLabel="Laptop showing a dark minutes workspace with transcript, decisions, and a draft email"
            />
            <View style={styles.productCopy}>
              <Text style={styles.bodyWide}>
                {PRODUCT.name} is minutes for WhatsApp Business calling — not another meeting bot.
                Answer in the browser, keep the conversation, send a pack the client can forward. Built
                by {COMPANY.name}.
              </Text>
              <View style={styles.productGrid}>
                {PRODUCTS.map((p) => (
                  <View key={p.title} style={[styles.productTile, LIQUID]}>
                    <IconWell>
                      <p.Icon size={20} label={p.title} />
                    </IconWell>
                    <Text style={styles.helpTitle}>{p.title}</Text>
                    <Text style={styles.body}>{p.body}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View style={styles.section}>
          <SectionLabel>Who it is for</SectionLabel>
          <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
            Teams whose real CRM is a chat list.
          </Text>
          <View style={styles.whoFrame}>
            <Image
            source={operatorDesk}
            style={[styles.whoPhoto, !wide && styles.whoPhotoCompact]}
            resizeMode="cover"
              accessibilityLabel="Operator answering a business voice call at a night desk, dark workspace on screen"
            />
            <View style={styles.whoCards}>
              <View style={[styles.whoCard, LIQUID]}>
                <Text style={[styles.forTitle, DISPLAY]}>Property desks</Text>
                <Text style={styles.body}>Handovers, deposits, occupation dates that cannot live in someone’s head.</Text>
              </View>
              <View style={[styles.whoCard, LIQUID]}>
                <Text style={[styles.forTitle, DISPLAY]}>Agencies</Text>
                <Text style={styles.body}>Voice briefings that still need a pack the client can forward.</Text>
              </View>
              <View style={[styles.whoCard, LIQUID]}>
                <Text style={[styles.forTitle, DISPLAY]}>Owner-operators</Text>
                <Text style={styles.body}>You cannot sit in every call. You still have to own what was agreed.</Text>
              </View>
            </View>
          </View>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View style={[styles.section, split && styles.heroSplit]}>
          <View style={styles.heroCopy}>
            <SectionLabel>What leaves the desk</SectionLabel>
            <Text accessibilityRole="header" {...({ accessibilityLevel: 2 } as object)} style={[styles.h2, DISPLAY]}>
              The pack, not the chat dump.
            </Text>
            <Text style={styles.bodyWide}>
              Transcript, minutes, actions, email — one afternoon. The call can stay on WhatsApp
              Business. The record should not.
            </Text>
          </View>
          <SceneEmailPack
            width={Math.min(sceneW, 480)}
            height={Math.round(Math.min(sceneW, 480) * 0.58)}
            label="Original illustration of a minutes sheet becoming an email pack"
          />
        </View>
      </LandingReveal>

      <LandingReveal>
        <View style={styles.exampleSection}>
          <SectionLabel>Example · TEST MODE</SectionLabel>
          <View style={[styles.example, LIQUID]} accessibilityLabel="Small Sandton test-call snippet">
            <View style={styles.exampleHead}>
              <IconHandset size={20} color="#25D366" label="Test call" />
              <View style={{ flex: 1 }}>
                <Text style={styles.exampleKicker}>Khaya · unit 12B Sandton · one sample</Text>
                <Text style={styles.exampleTitle}>Handover call, 12 minutes</Text>
              </View>
            </View>
            <Text style={styles.snip}>
              <Text style={styles.snipWho}>Lesedi</Text>
              {'  '}Friday at eleven. I’ll WhatsApp you from downstairs.
            </Text>
            <Text style={styles.snipMore}>CoC Thursday 09:00 · keys Friday 11:00</Text>
            <SiteCta label="Open the full call in the test workspace" invert />
          </View>
        </View>
      </LandingReveal>

      <LandingReveal>
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
      </LandingReveal>
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 36,
    paddingTop: 12,
    paddingBottom: 48,
  },
  heroSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  heroCopy: { flex: 1.05, gap: 16, minWidth: 240 },
  heroVisual: {
    flex: 1.15,
    minWidth: 260,
    position: 'relative',
  },
  heroPhoto: {
    width: '100%',
    height: 420,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroPhotoCompact: { height: 280 },
  kicker: {
    color: 'rgba(245,245,245,0.55)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 56,
    fontWeight: '500',
    letterSpacing: -1.6,
    lineHeight: 62,
  },
  h1Compact: { fontSize: 36, lineHeight: 40, letterSpacing: -1 },
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
    fontSize: 17,
    lineHeight: 27,
    maxWidth: 560,
    marginBottom: 12,
  },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4 },
  fine: { color: palette.textMuted, fontSize: FONT.sm, lineHeight: 20, maxWidth: 420 },
  iconStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  iconWell: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  iconWellGreen: {
    borderColor: 'rgba(37, 211, 102, 0.45)',
  },
  stage: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    gap: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
    borderRadius: 20,
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
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  stageRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.14)',
    marginVertical: 4,
  },
  stageRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stageItem: { color: palette.textSecondary, fontSize: 14, lineHeight: 20, flex: 1 },
  statementBlock: {
    paddingVertical: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statement: {
    color: palette.text,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.7,
    fontWeight: '500',
    maxWidth: 880,
  },
  statementCompact: { fontSize: 26, lineHeight: 32, letterSpacing: -0.4 },
  section: {
    paddingTop: 72,
    paddingBottom: 8,
    gap: 8,
  },
  howWrap: { gap: 28, marginTop: 12 },
  howWrapSplit: { flexDirection: 'row', alignItems: 'center', gap: 36 },
  sceneHold: { flex: 1.1, minWidth: 240 },
  beatCol: { flex: 1, gap: 18, minWidth: 240 },
  beatRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  beatCopy: { flex: 1, gap: 4 },
  beatN: {
    color: 'rgba(245,245,245,0.4)',
    fontSize: 11,
    letterSpacing: 1.8,
    fontWeight: '700',
  },
  whyTitle: { color: palette.text, fontSize: 18, fontWeight: '600', lineHeight: 24, letterSpacing: -0.2 },
  productSplit: { gap: 28, marginTop: 8 },
  productPhoto: {
    flex: 1,
    minWidth: 240,
    height: 380,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  productPhotoCompact: { height: 240 },
  productCopy: { flex: 1, gap: 12, minWidth: 240 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productTile: {
    width: '47%',
    minWidth: 140,
    flexGrow: 1,
    gap: 8,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
  },
  helpTitle: { color: palette.text, fontSize: 16, fontWeight: '600' },
  whoFrame: { marginTop: 8, gap: 16 },
  whoPhoto: {
    width: '100%',
    height: 340,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  whoPhotoCompact: { height: 220 },
  whoCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  whoCard: {
    flexGrow: 1,
    minWidth: 200,
    flexBasis: 240,
    gap: 8,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
  },
  forTitle: { color: palette.text, fontSize: 24, fontWeight: '500', letterSpacing: -0.5, lineHeight: 28 },
  exampleSection: { paddingTop: 56, maxWidth: 520 },
  example: {
    gap: 10,
    padding: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: GLASS.border.rim,
    borderRadius: 22,
  },
  exampleHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  exampleKicker: {
    color: palette.textMuted,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  exampleTitle: { color: palette.text, fontSize: 18, fontWeight: '600', letterSpacing: -0.3 },
  snip: { color: palette.textSecondary, fontSize: 15, lineHeight: 24 },
  snipWho: { color: palette.text, fontWeight: '700' },
  snipMore: { color: palette.textMuted, fontSize: FONT.sm, marginVertical: 4 },
  price: {
    gap: 28,
    paddingTop: 72,
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
