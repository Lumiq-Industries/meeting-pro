import type { Transcript } from '../types';
import { SPEAKER_COLORS } from '../constants/theme';

/** Flagship 10-minute test call for investor review. Not labelled “demo”. */
export const TEST_CALL_ID = 't-test-sandton-handover';
export const TEST_CALL_DURATION_SECONDS = 612;

export const TEST_CALL_SPEAKERS = [
  { id: 's-thandi', name: 'Thandi · Khaya', color: SPEAKER_COLORS[0] },
  { id: 's-lesedi', name: 'Lesedi Mokoena', color: SPEAKER_COLORS[1] },
] as const;

export const TEST_CALL_SEGMENTS: { speakerId: string; timestamp: string; text: string }[] = [
  {
    speakerId: 's-thandi',
    timestamp: '00:00:08',
    text: 'Khaya Property Services, Thandi speaking.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:00:16',
    text: 'Hi Thandi, it’s Lesedi Mokoena. I’m calling about unit 12B in Sandton, the handover this week.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:00:32',
    text: 'Yes, I have you on the file. Occupation is scheduled for Friday. How can I help?',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:00:44',
    text: 'The electrician still hasn’t signed off the distribution board. I don’t want to collect keys with that open.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:01:02',
    text: 'That’s fair. Sipho was on site yesterday. The board was replaced, CoC is booked for Thursday morning, nine o’clock.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:01:22',
    text: 'Can you send me the electrician’s name and the booking confirmation? I need it for the bank.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:01:36',
    text: 'I’ll email it this afternoon, on the same thread as the occupation pack. Anything else on the punch list?',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:01:52',
    text: 'The kitchen tap still drips. They said they’d swap the cartridge. And the balcony door doesn’t latch in the wind.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:02:12',
    text: 'Cartridge is on the van for Thursday with the CoC. The latch is a strike-plate adjustment — Sipho will do that the same visit, no extra charge.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:02:34',
    text: 'Good. Deposit — the landlord wanted two months. We agreed one and a half if I pay the first month in advance. Is that written down?',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:02:54',
    text: 'Yes. Lease addendum signed last week: R22 500 deposit, first month on occupation, not two months. I’ll attach that PDF with the CoC.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:03:16',
    text: 'And parking bay 18 is mine, not 17? The basement paint is confusing.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:03:28',
    text: 'Bay 18. I’ll have Sipho stencil your unit number on the column so the paint doesn’t throw anyone.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:03:46',
    text: 'Fibre — Openserve said the ONT is in the cupboard but I don’t have the login. Who do I call?',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:04:02',
    text: 'The building is on Openserve. I’ll send the account number and the body corporate fibre contact. Activation is usually same day once you have ID.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:04:24',
    text: 'Keys. How many sets, and do I collect at your office or on site?',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:04:36',
    text: 'Two full sets plus the mailbox. Collect on site Friday at ten, after CoC is in the file. I’ll be there with Sipho.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:04:56',
    text: 'Can we move that to eleven? I have a bank appointment in Sandton at nine thirty.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:05:10',
    text: 'Eleven works. I’ll update the occupation diary and WhatsApp you the pin when we’re in the lobby.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:05:26',
    text: 'Water and lights — City of Joburg. Do you transfer, or do I open a new account?',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:05:40',
    text: 'You open in your name from Friday. I’ll send the meter photos from yesterday so you don’t inherit an estimate. Readings were 4491 on water, 8122 on electricity.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:06:04',
    text: 'Noted. If the CoC fails on Thursday, do we still handover Friday?',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:06:16',
    text: 'No. If it fails I will phone you Thursday before noon and we shift occupation, we don’t hand over a unit that isn’t signed off.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:06:34',
    text: 'That’s what I needed. Last thing — pets. Small cat. The lease said no pets without consent.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:06:50',
    text: 'Landlord approved in writing, extra R1 500 on the deposit. I’ll add that to the same PDF pack this afternoon.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:07:10',
    text: 'Please put the electrician, the meters, the addendum, the pet consent, and Friday eleven in one email so I can forward it to the bank.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:07:28',
    text: 'One email, this afternoon, copy you and the bank contact on the file. I’ll also put a one-page minutes of this call in there so nothing gets lost.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:07:48',
    text: 'Perfect. If Sipho finds anything else on Thursday, WhatsApp me before you start extra work.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:08:02',
    text: 'Agreed. No extra work without your say-so. I’ll send the pack by four o’clock.',
  },
  {
    speakerId: 's-lesedi',
    timestamp: '00:08:16',
    text: 'Thanks Thandi. See you Friday at eleven.',
  },
  {
    speakerId: 's-thandi',
    timestamp: '00:08:24',
    text: 'See you then. Khaya Property Services, have a good afternoon.',
  },
];

export const TEST_CALL_TRANSCRIPT: Transcript = {
  id: TEST_CALL_ID,
  title: 'Test call — Sandton unit 12B handover',
  source: 'whatsapp_call',
  status: 'completed',
  date: '2026-11-20T09:14:00',
  duration: '10 min',
  participants: ['Thandi · Khaya', 'Lesedi Mokoena'],
  tags: ['test-call', 'handover', 'rental'],
  summary:
    'Lesedi Mokoena called about occupation of unit 12B Sandton. CoC is booked Thursday 09:00; keys move to Friday 11:00 on site. Deposit is R22 500 plus R1 500 pet consent, first month on occupation. Thandi will email one pack this afternoon: electrician booking, meter readings (water 4491, electricity 8122), lease addendum, pet consent, and minutes of this call. No extra site work without Lesedi’s approval. If CoC fails, handover does not proceed.',
  executiveSummary:
    'Friday 11:00 on-site handover for Sandton 12B, subject to Thursday CoC. One email pack to Lesedi and the bank this afternoon.',
  topics: ['handover', 'electrical CoC', 'deposit', 'meters', 'pets'],
  decisions: [
    {
      id: 'd1',
      text: 'Occupation moves from Friday 10:00 to Friday 11:00 on site.',
      kind: 'decision',
    },
    {
      id: 'd2',
      text: 'No handover if the CoC fails on Thursday.',
      kind: 'agreement',
    },
    {
      id: 'd3',
      text: 'No extra work on Thursday without Lesedi’s approval.',
      kind: 'commitment',
    },
  ],
  followUps: [
    {
      id: 'f1',
      text: 'Email the occupation pack (CoC booking, meters, addendum, pet consent, minutes) by 16:00.',
      assignee: 'Thandi',
      dueHint: 'Today 16:00',
    },
  ],
  sentimentNote: 'Constructive, slightly cautious on electrical sign-off — resolved on the call.',
  summaryStatus: 'ready',
  actionItems: [
    {
      id: 'ta1',
      text: 'Email occupation pack to Lesedi and the bank contact this afternoon',
      assignee: 'Thandi',
      completed: false,
    },
    {
      id: 'ta2',
      text: 'Confirm CoC Thursday 09:00 and WhatsApp Lesedi if it fails before noon',
      assignee: 'Thandi',
      completed: false,
    },
    {
      id: 'ta3',
      text: 'Stencil unit number on parking bay 18',
      assignee: 'Sipho',
      completed: false,
    },
    {
      id: 'ta4',
      text: 'Meet on site Friday 11:00 with two key sets and mailbox key',
      assignee: 'Thandi',
      completed: false,
    },
  ],
  segments: TEST_CALL_SEGMENTS.map((s, i) => ({
    id: `test-seg-${i + 1}`,
    speakerId: s.speakerId,
    text: s.text,
    timestamp: s.timestamp,
  })),
  keywordMatches: 8,
};
