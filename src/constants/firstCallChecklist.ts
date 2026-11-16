/** Single list of what a live test call still needs. The product code for this path is already shipped. */
export const WEBHOOK_CALLBACK_URL =
  'https://mjxfpovawoztumfcblhm.supabase.co/functions/v1/whatsapp-webhook';

export const APP_URL = 'https://meeting-pro-rho.vercel.app/app';

export type ChecklistOwner = 'already' | 'meta' | 'secrets' | 'app' | 'test';

export type ChecklistItem = {
  id: string;
  owner: ChecklistOwner;
  title: string;
  detail: string;
};

export const FIRST_CALL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'code',
    owner: 'already',
    title: 'Product is already built',
    detail:
      'Webhook, answer-call, browser softphone, and “Connect number” are live. No more coding for a first call.',
  },
  {
    id: 'meta-app',
    owner: 'meta',
    title: 'Meta app + WhatsApp product',
    detail:
      'Create the developer app, add WhatsApp, add a Cloud API number (test number is fine). App ID is for Meta’s dashboard only — do not paste it into Meeting Pro.',
  },
  {
    id: 'calling',
    owner: 'meta',
    title: 'Turn Calling on for that number',
    detail:
      'WhatsApp → API Setup → Calling. Add the personal WhatsApp that will place the test call as a tester on the app, or the ring never arrives.',
  },
  {
    id: 'webhook',
    owner: 'meta',
    title: 'Webhook field “calls”',
    detail: `Callback URL: ${WEBHOOK_CALLBACK_URL}. Verify token must match the META_VERIFY_TOKEN secret. Subscribe to calls (connect, terminate, transcription).`,
  },
  {
    id: 'secrets',
    owner: 'secrets',
    title: 'Three Supabase secrets (not in the app form)',
    detail:
      'META_APP_SECRET, META_VERIFY_TOKEN, META_ACCESS_TOKEN. Put them in Supabase Edge secrets only. Never paste them in chat or GitHub.',
  },
  {
    id: 'link',
    owner: 'app',
    title: 'Link the number in Meeting Pro',
    detail:
      'Sign in at the app URL → Connect WhatsApp. Paste Phone number ID, WABA ID, and the display number (e.g. 27…). That is the only IDs the product stores.',
  },
  {
    id: 'ring',
    owner: 'test',
    title: 'Test: laptop answers, phone calls',
    detail:
      'Keep Chrome/Edge open and signed in (the answer banner is web-only). From a tester’s personal WhatsApp, call the business number. Answer in Meeting Pro. Minutes appear after Meta sends the transcript.',
  },
];
