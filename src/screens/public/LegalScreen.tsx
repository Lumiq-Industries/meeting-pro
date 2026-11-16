import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SiteChrome } from '../../components/site/SiteChrome';
import { SiteLink } from '../../components/site/SiteLink';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { LEGAL } from '../../constants/legal';

const palette = COLORS.dark;

type Kind = 'privacy' | 'terms';

type Section = { heading: string; paragraphs: string[] };

const PRIVACY: Section[] = [
  {
    heading: 'Who we are',
    paragraphs: [
      `${LEGAL.entity} (“we”) provides ${LEGAL.product} at ${LEGAL.siteUrl}. Contact: ${LEGAL.contactEmail}.`,
      'This policy explains how we handle personal information when you use the website, sign in, take WhatsApp Business calls through the product, or pay for a subscription. We process information in South Africa and through the processors named below.',
    ],
  },
  {
    heading: 'What we collect',
    paragraphs: [
      'Account: name, email and sign-in identifiers from Clerk when you create a workspace.',
      'Workspace: your business name and the WhatsApp Cloud API identifiers you link (phone number ID, WhatsApp Business account ID, display number).',
      'Calls: call metadata (time, duration, direction, counterparty number or name if WhatsApp sends it), transcripts Meta sends us after a call, and AI minutes we generate from those transcripts (summaries, decisions, action items).',
      'Billing: email used for Paystack, subscription status, and Paystack customer/subscription codes. We do not store full card numbers.',
      'Technical: basic logs needed to run the service (timestamps, error traces). We do not use advertising cookies on the product itself.',
    ],
  },
  {
    heading: 'How we use it',
    paragraphs: [
      'To run your workspace: answer calls you choose to take, show transcripts and minutes, search them, and email minutes when you ask.',
      'To bill you: start and manage the R' +
        `${LEGAL.priceZar}/month subscription after ${LEGAL.freeCalls} free transcribed calls, and enforce the monthly cap (${LEGAL.paidCallCap} calls or ${LEGAL.paidMinuteCap} minutes).`,
      'To keep the service secure and to debug failures.',
      'We do not sell personal information. We do not use call content for advertising. We do not train public AI models on your calls.',
    ],
  },
  {
    heading: 'Who processes it for us',
    paragraphs: [
      'Clerk — sign-in.',
      'Supabase — database, file storage and server functions.',
      'Meta (WhatsApp Cloud API) — calling, and transcription when we request it for a call you answer. Meta’s terms and privacy policy also apply to that processing.',
      'Paystack — card payments in ZAR.',
      'The AI provider configured on our servers (currently Muse Spark / Anthropic) — turning a transcript into minutes after the call.',
      'These processors only receive what they need to do that job.',
    ],
  },
  {
    heading: 'Calls, recording and transcripts',
    paragraphs: [
      `${LEGAL.product} does not record audio on your phone or computer. When transcription is on, WhatsApp produces a transcript (and may keep a short-lived recording on Meta’s side, typically for a few days). We store the transcript Meta sends to our webhook, then generate minutes from it.`,
      'The workspace owner is responsible for telling callers, where the law requires it, that the call may be transcribed. We pass Meta’s required purpose string when we enable transcription.',
    ],
  },
  {
    heading: 'Retention and your rights',
    paragraphs: [
      'We keep workspace data until you ask us to delete the account, or until we must keep a record (for example a paid invoice).',
      'You may request access, correction or deletion of personal information we hold by emailing ' +
        LEGAL.contactEmail +
        '. We will need to confirm you control the workspace.',
      'Under POPIA you may also lodge a complaint with the Information Regulator (South Africa).',
    ],
  },
  {
    heading: 'Children',
    paragraphs: [
      `${LEGAL.product} is for businesses. It is not directed at children under 18.`,
    ],
  },
  {
    heading: 'Changes',
    paragraphs: [
      `We will update this page when the practice changes. The date at the top is the current version. Continued use after a change means you accept the updated policy.`,
    ],
  },
];

const TERMS: Section[] = [
  {
    heading: 'The service',
    paragraphs: [
      `${LEGAL.entity} provides ${LEGAL.product}: a workspace that connects to WhatsApp Business Cloud API calling, stores transcripts Meta sends after a call, and generates meeting minutes from those transcripts.`,
      'You need a WhatsApp Business number with calling enabled, and a Meeting Pro account. Meta’s WhatsApp terms apply to the call itself. If Meta cannot transcribe a language or refuses a call, we cannot invent a transcript.',
    ],
  },
  {
    heading: 'Accounts',
    paragraphs: [
      'You must be able to enter a contract, and you must give accurate account details. You are responsible for who you invite into the workspace and for how you use minutes with your own clients.',
    ],
  },
  {
    heading: 'Price',
    paragraphs: [
      `Each business gets ${LEGAL.freeCalls} transcribed calls at no charge. After that, ${LEGAL.product} is R${LEGAL.priceZar} (ZAR) per month per business, billed through Paystack, for up to ${LEGAL.paidCallCap} transcribed calls or ${LEGAL.paidMinuteCap} minutes in the billing period, whichever comes first.`,
      'If you hit the cap we still let you answer calls; we stop requesting transcription until the next paid period or an upgrade we publish here.',
      'Subscriptions renew monthly until you cancel. Cancelling stops the next renewal; you keep access until the paid period ends. Failed payments may pause transcription.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      'Do not use the product for unlawful surveillance, to transcribe calls you have no right to transcribe, to harass people, or to attack our or Meta’s systems. We may suspend a workspace that breaks this.',
    ],
  },
  {
    heading: 'No professional advice',
    paragraphs: [
      'Minutes are a working aid generated by software. They are not a legal, medical or financial record you should rely on without checking. You remain responsible for what you send to clients.',
    ],
  },
  {
    heading: 'Availability',
    paragraphs: [
      'We aim to keep the service up, but WhatsApp, Clerk, Paystack, our host and the AI provider can fail. We do not promise uninterrupted calling or perfect transcripts.',
    ],
  },
  {
    heading: 'Liability',
    paragraphs: [
      `To the extent South African law allows, ${LEGAL.entity} is not liable for lost profits, lost data, or indirect loss, and our total liability for a claim is limited to the subscription fees you paid us in the 3 months before the claim.`,
      'Nothing here limits liability for fraud, death or personal injury caused by negligence, or any liability that cannot be limited by law.',
    ],
  },
  {
    heading: 'Law',
    paragraphs: [
      'These terms are governed by the law of the Republic of South Africa. If a dispute cannot be resolved in writing, the South African courts have jurisdiction.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [`Questions: ${LEGAL.contactEmail}.`],
  },
];

export function LegalScreen({ kind }: { kind: Kind }) {
  const title = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Use';
  const sections = kind === 'privacy' ? PRIVACY : TERMS;

  useDocumentTitle(
    `${title} — ${LEGAL.product}`,
    `${title} for ${LEGAL.product} by ${LEGAL.entity}. Effective ${LEGAL.effectiveDate}.`
  );

  return (
    <SiteChrome active={kind}>
      <View style={styles.head}>
        <Text accessibilityRole="header" style={styles.h1}>
          {title}
        </Text>
        <Text style={styles.meta}>
          {LEGAL.product} · {LEGAL.entity} · Effective {LEGAL.effectiveDate}
        </Text>
        <Text style={styles.switch}>
          {kind === 'privacy' ? (
            <>
              Also see the{' '}
              <SiteLink href="/terms" style={styles.inline}>
                Terms of Use
              </SiteLink>
              .
            </>
          ) : (
            <>
              Also see the{' '}
              <SiteLink href="/privacy" style={styles.inline}>
                Privacy Policy
              </SiteLink>
              .
            </>
          )}
        </Text>
      </View>
      {sections.map((section) => (
        <View key={section.heading} style={styles.section}>
          <Text accessibilityRole="header" style={styles.h2}>
            {section.heading}
          </Text>
          {section.paragraphs.map((p, i) => (
            <Text key={`${section.heading}-${i}`} style={styles.p}>
              {p}
            </Text>
          ))}
        </View>
      ))}
    </SiteChrome>
  );
}

const styles = StyleSheet.create({
  head: { gap: SPACING.sm, maxWidth: 720 },
  h1: {
    color: palette.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 40,
  },
  meta: { color: palette.textMuted, fontSize: FONT.sm },
  switch: { color: palette.textSecondary, fontSize: FONT.sm, lineHeight: 22 },
  inline: { color: palette.text, fontWeight: '700', fontSize: FONT.sm },
  section: { gap: SPACING.sm, maxWidth: 720 },
  h2: { color: palette.text, fontSize: FONT.xl, fontWeight: '700', marginTop: SPACING.sm },
  p: { color: palette.textSecondary, fontSize: FONT.base, lineHeight: 24 },
});
