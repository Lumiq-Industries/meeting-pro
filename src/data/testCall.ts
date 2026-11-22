import type { Transcript } from '../types';
import { SPEAKER_COLORS } from '../constants/theme';

/** Flagship 10-minute test call for investor review. Not labelled “demo”. */
export const TEST_CALL_ID = 't-test-sandton-handover';
export const TEST_CALL_DURATION_SECONDS = 712;

export const TEST_CALL_SPEAKERS = [
  { id: 's-thandi', name: 'Thandi · Khaya', color: SPEAKER_COLORS[0] },
  { id: 's-lesedi', name: 'Lesedi Mokoena', color: SPEAKER_COLORS[1] },
] as const;

export function testCallSpeakerName(id: string): string {
  return TEST_CALL_SPEAKERS.find((s) => s.id === id)?.name ?? id;
}

export const TEST_CALL_SEGMENTS: { speakerId: string; timestamp: string; text: string }[] = [
  { speakerId: 's-thandi', timestamp: '00:00:08', text: 'Khaya Property Services, Thandi speaking.' },
  { speakerId: 's-lesedi', timestamp: '00:00:16', text: 'Hi Thandi, it’s Lesedi Mokoena. I’m calling about unit 12B in Sandton, the handover this week.' },
  { speakerId: 's-thandi', timestamp: '00:00:32', text: 'Yes, I have you on the file. Occupation is scheduled for Friday. How can I help?' },
  { speakerId: 's-lesedi', timestamp: '00:00:48', text: 'Sorry, the line is a bit noisy, I’m in the basement parking. Can you hear me?' },
  { speakerId: 's-thandi', timestamp: '00:00:58', text: 'I can hear you. Take your time.' },
  { speakerId: 's-lesedi', timestamp: '00:01:12', text: 'The electrician still hasn’t signed off the distribution board. I don’t want to collect keys with that open.' },
  { speakerId: 's-thandi', timestamp: '00:01:32', text: 'That’s fair. Sipho was on site yesterday. The board was replaced. CoC is booked for Thursday morning, nine o’clock, with Mahlangu Electrical.' },
  { speakerId: 's-lesedi', timestamp: '00:01:54', text: 'Mahlangu — can you spell that for the bank pack?' },
  { speakerId: 's-thandi', timestamp: '00:02:04', text: 'M-A-H-L-A-N-G-U. I’ll put the booking reference ME-4419 in the email.' },
  { speakerId: 's-lesedi', timestamp: '00:02:22', text: 'Can you send me the electrician’s name and the booking confirmation? I need it for the bank today if possible.' },
  { speakerId: 's-thandi', timestamp: '00:02:38', text: 'I’ll email it this afternoon, on the same thread as the occupation pack. Anything else on the punch list?' },
  { speakerId: 's-lesedi', timestamp: '00:02:56', text: 'The kitchen tap still drips. They said they’d swap the cartridge. And the balcony door doesn’t latch in the wind.' },
  { speakerId: 's-thandi', timestamp: '00:03:18', text: 'Cartridge is on the van for Thursday with the CoC. The latch is a strike-plate adjustment — Sipho will do that the same visit, no extra charge.' },
  { speakerId: 's-lesedi', timestamp: '00:03:42', text: 'Is that in writing? Last time a “no extra charge” turned into a variation.' },
  { speakerId: 's-thandi', timestamp: '00:03:56', text: 'I’ll put it in the minutes: tap cartridge and balcony latch, included, no variation unless we find rot in the frame. If we find rot I stop and phone you.' },
  { speakerId: 's-lesedi', timestamp: '00:04:18', text: 'Good. Deposit — the landlord wanted two months. We agreed one and a half if I pay the first month in advance. Is that written down?' },
  { speakerId: 's-thandi', timestamp: '00:04:40', text: 'Yes. Lease addendum signed last week: R22 500 deposit, first month on occupation, not two months. I’ll attach that PDF with the CoC.' },
  { speakerId: 's-lesedi', timestamp: '00:05:02', text: 'And parking bay 18 is mine, not 17? The basement paint is confusing. I’m looking at 17 right now.' },
  { speakerId: 's-thandi', timestamp: '00:05:18', text: 'Bay 18. Seventeen is the visitor bay. I’ll have Sipho stencil 12B on the column so the paint doesn’t throw anyone.' },
  { speakerId: 's-lesedi', timestamp: '00:05:36', text: 'Boom gate remote — do I get one on Friday or do I buy it from the body corporate?' },
  { speakerId: 's-thandi', timestamp: '00:05:50', text: 'Two remotes are in the key pack. If one is missing I’ll issue a temporary card from the office the same day. Don’t buy from the body corporate yet.' },
  { speakerId: 's-lesedi', timestamp: '00:06:12', text: 'Fibre — Openserve said the ONT is in the cupboard but I don’t have the login. Who do I call?' },
  { speakerId: 's-thandi', timestamp: '00:06:30', text: 'The building is on Openserve. Account is under Khaya until Friday, then it flips to you. I’ll send the account number and the body corporate fibre contact, Mrs Dlamini, 011 number. Activation is usually same day once you have ID.' },
  { speakerId: 's-lesedi', timestamp: '00:06:58', text: 'Hold on, I’m writing that. Mrs Dlamini. Okay.' },
  { speakerId: 's-thandi', timestamp: '00:07:08', text: 'Take your time.' },
  { speakerId: 's-lesedi', timestamp: '00:07:22', text: 'Keys. How many sets, and do I collect at your office or on site?' },
  { speakerId: 's-thandi', timestamp: '00:07:36', text: 'Two full sets plus the mailbox. Collect on site Friday at ten, after CoC is in the file. I’ll be there with Sipho.' },
  { speakerId: 's-lesedi', timestamp: '00:07:56', text: 'Can we move that to eleven? I have a bank appointment in Sandton at nine thirty. I don’t want to rush the inspection.' },
  { speakerId: 's-thandi', timestamp: '00:08:14', text: 'Eleven works. I’ll update the occupation diary and WhatsApp you the lobby pin when we’re downstairs.' },
  { speakerId: 's-lesedi', timestamp: '00:08:32', text: 'Water and lights — City of Joburg. Do you transfer, or do I open a new account?' },
  { speakerId: 's-thandi', timestamp: '00:08:48', text: 'You open in your name from Friday. I’ll send the meter photos from yesterday so you don’t inherit an estimate. Readings were four four nine one on water, eight one two two on electricity.' },
  { speakerId: 's-lesedi', timestamp: '00:09:12', text: 'Sorry — water 4491, electricity 8122?' },
  { speakerId: 's-thandi', timestamp: '00:09:20', text: 'That’s right. I’ll put the photos in the same email so the bank can see them.' },
  { speakerId: 's-lesedi', timestamp: '00:09:34', text: 'If the CoC fails on Thursday, do we still handover Friday?' },
  { speakerId: 's-thandi', timestamp: '00:09:46', text: 'No. If it fails I will phone you Thursday before noon and we shift occupation. We don’t hand over a unit that isn’t signed off.' },
  { speakerId: 's-lesedi', timestamp: '00:10:04', text: 'That’s what I needed. Last thing — pets. Small cat. The lease said no pets without consent.' },
  { speakerId: 's-thandi', timestamp: '00:10:18', text: 'Landlord approved in writing, extra R1 500 on the deposit. I’ll add that to the same PDF pack this afternoon.' },
  { speakerId: 's-lesedi', timestamp: '00:10:36', text: 'Please put the electrician, the meters, the addendum, the pet consent, and Friday eleven in one email so I can forward it to the bank.' },
  { speakerId: 's-thandi', timestamp: '00:10:54', text: 'One email, this afternoon, copy you and the bank contact on the file. I’ll also put a one-page minutes of this call in there so nothing gets lost.' },
  { speakerId: 's-lesedi', timestamp: '00:11:14', text: 'Perfect. If Sipho finds anything else on Thursday, WhatsApp me before you start extra work. Don’t just carry on.' },
  { speakerId: 's-thandi', timestamp: '00:11:30', text: 'Agreed. No extra work without your say-so. I’ll send the pack by four o’clock.' },
  { speakerId: 's-lesedi', timestamp: '00:11:44', text: 'Thanks Thandi. See you Friday at eleven.' },
  { speakerId: 's-thandi', timestamp: '00:11:52', text: 'See you then. Khaya Property Services, have a good afternoon.' },
];

export const TEST_CALL_TRANSCRIPT: Transcript = {
  id: TEST_CALL_ID,
  title: 'Sandton unit 12B — occupation handover',
  source: 'whatsapp_call',
  status: 'completed',
  date: '2026-11-20T09:14:00',
  duration: '11 min 52 sec',
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
