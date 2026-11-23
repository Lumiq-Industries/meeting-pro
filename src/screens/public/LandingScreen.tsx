import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import {
  SceneCallToMinutes,
  SceneEmailPack,
  SceneHeroDesk,
  SceneWorkspace,
} from '../../components/site/LandingScenes';
import { FittedScene } from '../../components/site/FittedScene';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONT } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { GLASS } from '../../constants/glass';
import { webClass, webOnlyStyle } from '../../utils/webStyles';
import { useSiteViewport } from '../../hooks/useSiteViewport';

/**
 * Design direction
 * Purpose: sell TEST MODE workspace — operators who close on WhatsApp Business voice.
 * Audience: SA desks + one investor.
 * Tone: cinematic editorial, dark. Photos dropped: they stretched on mobile.
 * Signature: original SVG scenes in locked aspect boxes.
 * Viewports: 390×844, 768×1024, 1440×900.
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
  const { phone, tablet, desktop } = useSiteViewport();
  const { isSignedIn } = useAuth();
  const cta = isSignedIn ? 'Open test workspace' : 'Sign in · TEST MODE';

  useDocumentTitle(
    `${PRODUCT.name} — WhatsApp Business call minutes | ${COMPANY.name}`,
    'Meeting Pro by VILATECH turns WhatsApp Business calls into transcripts, minutes, decisions and follow-ups.'
  );

  const stageCard = (
    <View
      {...webClass('vt-stage-desk')}
      style={[styles.stage, !desktop && styles.stageFlow, LIQUID]}
      accessibilityLabel="Minutes after hang-up"
    >
      <View style={styles.stageTop}>
        <Text style={styles.stageLive}>After hang-up</Text>
        <Text style={styles.stageMeta}>Voice · TEST MODE</Text>
      </View>
      <Text style={[styles.stageTitle, phone && styles.stageTitlePhone, DISPLAY]}>
        Occupation Friday 11:00. CoC Thursday 09:00.
      </Text>
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
  );

  return (
    <SiteChrome active="home">
      <View {...webClass('vt-split')} style={[styles.hero, desktop && styles.split, phone && styles.heroPhone]}>
        <View style={styles.heroCopy}>
          <SectionLabel>{`${COMPANY.name}  ·  ${PRODUCT.name}  ·  TEST MODE`}</SectionLabel>
          <Text
            accessibilityRole="header"
            {...({ accessibilityLevel: 1 } as object)}
            style={[styles.h1, tablet && styles.h1Tablet, phone && styles.h1Phone, DISPLAY]}
            {...webClass('vt-h1')}
          >
            Every WhatsApp Business call, written down.
          </Text>
          <Text style={[styles.lede, phone && styles.ledePhone]} {...webClass('vt-lede')}>
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
          <FittedScene
            ratio={5 / 4}
            render={(w, h) => (
              <SceneHeroDesk
                width={w}
                height={h}
                label="Illustration of a night desk after a voice call: phone, minutes sheet, lamp. Original SVG, not a photograph."
              />
            )}
          />
          {desktop ? stageCard : null}
        </View>
      </View>
      {!desktop ? stageCard : null}

      <LandingReveal>
        <View style={[styles.statementBlock, phone && styles.statementBlockPhone]}>
          <Text
            style={[
              styles.statement,
              tablet && styles.statementTablet,
              phone && styles.statementPhone,
              DISPLAY,
            ]}
            {...webClass('vt-statement')}
          >
            Voice is how South African businesses close. Paper is how they lose it.
          </Text>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View {...webClass('vt-section')} style={[styles.section, phone && styles.sectionPhone]}>
          <SectionLabel>How it works</SectionLabel>
          <Text
            accessibilityRole="header"
            {...({ accessibilityLevel: 2 } as object)}
            style={[styles.h2, phone && styles.h2Phone, DISPLAY]}
            {...webClass('vt-h2')}
          >
            Four beats. Same afternoon.
          </Text>
          <View {...webClass('vt-split')} style={[styles.howWrap, desktop && styles.split]}>
            <View style={styles.sceneHold}>
              <FittedScene
                ratio={16 / 9}
                render={(w, h) => (
                  <SceneCallToMinutes
                    width={w}
                    height={h}
                    label="Original illustration: handset and conversation bubble becoming a minutes sheet. Not a WhatsApp trademark logo."
                  />
                )}
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
        <View {...webClass('vt-section')} style={[styles.section, phone && styles.sectionPhone]}>
          <SectionLabel>The product</SectionLabel>
          <Text
            accessibilityRole="header"
            {...({ accessibilityLevel: 2 } as object)}
            style={[styles.h2, phone && styles.h2Phone, DISPLAY]}
            {...webClass('vt-h2')}
          >
            A workspace on the number they already save.
          </Text>
          <View {...webClass('vt-split')} style={[styles.productSplit, desktop && styles.split]}>
            <View style={styles.sceneHold}>
              <FittedScene
                ratio={3 / 2}
                render={(w, h) => (
                  <SceneWorkspace
                    width={w}
                    height={h}
                    label="Original illustration of the Meeting Pro workspace: transcript, minutes, and a draft email."
                  />
                )}
              />
            </View>
            <View style={styles.productCopy}>
              <Text style={styles.bodyWide}>
                {PRODUCT.name} is minutes for WhatsApp Business calling — not another meeting bot.
                Answer in the browser, keep the conversation, send a pack the client can forward. Built
                by {COMPANY.name}.
              </Text>
              <View style={styles.productGrid}>
                {PRODUCTS.map((p) => (
                  <View
                    key={p.title}
                    style={[styles.productTile, phone && styles.productTilePhone, LIQUID]}
                    {...webClass('vt-tile')}
                  >
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
        <View {...webClass('vt-section')} style={[styles.section, phone && styles.sectionPhone]}>
          <SectionLabel>Who it is for</SectionLabel>
          <Text
            accessibilityRole="header"
            {...({ accessibilityLevel: 2 } as object)}
            style={[styles.h2, phone && styles.h2Phone, DISPLAY]}
            {...webClass('vt-h2')}
          >
            Teams whose real CRM is a chat list.
          </Text>
          <View {...webClass('vt-who-cards')} style={[styles.whoCards, tablet && styles.whoCardsTablet]}>
            <View style={[styles.whoCard, LIQUID]}>
              <Text style={[styles.forTitle, phone && styles.forTitlePhone, DISPLAY]}>Property desks</Text>
              <Text style={styles.body}>Handovers, deposits, occupation dates that cannot live in someone’s head.</Text>
            </View>
            <View style={[styles.whoCard, LIQUID]}>
              <Text style={[styles.forTitle, phone && styles.forTitlePhone, DISPLAY]}>Agencies</Text>
              <Text style={styles.body}>Voice briefings that still need a pack the client can forward.</Text>
            </View>
            <View style={[styles.whoCard, LIQUID]}>
              <Text style={[styles.forTitle, phone && styles.forTitlePhone, DISPLAY]}>Owner-operators</Text>
              <Text style={styles.body}>You cannot sit in every call. You still have to own what was agreed.</Text>
            </View>
          </View>
        </View>
      </LandingReveal>

      <LandingReveal>
        <View
          {...webClass('vt-split vt-section')}
          style={[styles.section, desktop && styles.split, phone && styles.sectionPhone]}
        >
          <View style={styles.heroCopy}>
            <SectionLabel>What leaves the desk</SectionLabel>
            <Text
              accessibilityRole="header"
              {...({ accessibilityLevel: 2 } as object)}
              style={[styles.h2, phone && styles.h2Phone, DISPLAY]}
            {...webClass('vt-h2')}
            >
              The pack, not the chat dump.
            </Text>
            <Text style={styles.bodyWide}>
              Transcript, minutes, actions, email — one afternoon. The call can stay on WhatsApp
              Business. The record should not.
            </Text>
          </View>
          <View style={styles.sceneHold}>
            <FittedScene
              ratio={12 / 7}
              render={(w, h) => (
                <SceneEmailPack
                  width={w}
                  height={h}
                  label="Original illustration of a minutes sheet becoming an email pack"
                />
              )}
            />
          </View>
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
        <View {...webClass('vt-split')} style={[styles.price, desktop && styles.split, phone && styles.pricePhone]}>
          <View style={styles.heroCopy}>
            <SectionLabel>Price</SectionLabel>
            <View style={styles.priceFigureRow}>
              <Text
                accessibilityRole="header"
                {...({ accessibilityLevel: 2 } as object)}
                style={[styles.priceFigure, phone && styles.priceFigurePhone, DISPLAY]}
                {...webClass('vt-price-figure')}
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
    gap: 28,
    paddingTop: 8,
    paddingBottom: 32,
  },
  heroPhone: {
    gap: 20,
    paddingBottom: 16,
  },
  split: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },
  heroCopy: { flex: 1.05, gap: 14, minWidth: 0 },
  heroVisual: {
    flex: 1.05,
    minWidth: 0,
    position: 'relative',
  },
  kicker: {
    color: 'rgba(245,245,245,0.55)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  h1: {
    color: palette.text,
    fontSize: 52,
    fontWeight: '500',
    letterSpacing: -1.5,
    lineHeight: 58,
  },
  h1Tablet: { fontSize: 40, lineHeight: 46, letterSpacing: -1 },
  h1Phone: { fontSize: 30, lineHeight: 36, letterSpacing: -0.8 },
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
  h2Phone: { fontSize: 24, lineHeight: 30, letterSpacing: -0.4 },
  lede: {
    color: 'rgba(245,245,245,0.72)',
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 520,
    fontWeight: '400',
  },
  ledePhone: { fontSize: 16, lineHeight: 24 },
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
  iconStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
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
  stageFlow: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 12,
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
  stageTitlePhone: { fontSize: 17, lineHeight: 23 },
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
  statementBlockPhone: { paddingVertical: 32 },
  statement: {
    color: palette.text,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.7,
    fontWeight: '500',
    maxWidth: 880,
  },
  statementTablet: { fontSize: 28, lineHeight: 36 },
  statementPhone: { fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  section: {
    paddingTop: 72,
    paddingBottom: 8,
    gap: 8,
  },
  sectionPhone: { paddingTop: 40 },
  howWrap: { gap: 24, marginTop: 12 },
  sceneHold: { flex: 1.1, minWidth: 0 },
  beatCol: { flex: 1, gap: 16, minWidth: 0 },
  beatRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  beatCopy: { flex: 1, gap: 4, minWidth: 0 },
  beatN: {
    color: 'rgba(245,245,245,0.4)',
    fontSize: 11,
    letterSpacing: 1.8,
    fontWeight: '700',
  },
  whyTitle: { color: palette.text, fontSize: 18, fontWeight: '600', lineHeight: 24, letterSpacing: -0.2 },
  productSplit: { gap: 24, marginTop: 8 },
  productCopy: { flex: 1, gap: 12, minWidth: 0 },
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
  productTilePhone: {
    width: '100%',
    minWidth: 0,
  },
  helpTitle: { color: palette.text, fontSize: 16, fontWeight: '600' },
  whoCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  whoCardsTablet: { flexDirection: 'column' },
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
  forTitlePhone: { fontSize: 20, lineHeight: 24 },
  exampleSection: { paddingTop: 56, maxWidth: 520, width: '100%' },
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
  pricePhone: { paddingTop: 40, gap: 16 },
  priceFigureRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' },
  priceFigure: {
    color: palette.text,
    fontSize: 72,
    fontWeight: '500',
    letterSpacing: -2,
    lineHeight: 76,
  },
  priceFigurePhone: { fontSize: 48, lineHeight: 52, letterSpacing: -1.2 },
  priceUnit: {
    fontSize: 22,
    color: palette.textSecondary,
    fontWeight: '400',
    letterSpacing: 0.4,
    paddingBottom: 10,
  },
  priceCta: { flex: 0.7, gap: 12, minWidth: 0, justifyContent: 'center' },
});
