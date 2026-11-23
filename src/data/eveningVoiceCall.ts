import type { Transcript } from '../types';
import { SPEAKER_COLORS } from '../constants/theme';

/** Evening WhatsApp voice call (~6 min) at 19:57 local. TEST MODE, not labelled demo. */
export const EVENING_VOICE_CALL_ID = 'c-test-evening-voice';
export const EVENING_VOICE_TRANSCRIPT_ID = 't-test-evening-voice';
export const EVENING_VOICE_DURATION_SECONDS = 372;
export const EVENING_VOICE_HOUR = 19;
export const EVENING_VOICE_MINUTE = 57;

export const EVENING_VOICE_SPEAKERS = [
  { id: 's-thandi-eve', name: 'Thandi · Khaya', color: SPEAKER_COLORS[0] },
  { id: 's-bongani', name: 'Bongani Dlamini', color: SPEAKER_COLORS[1] },
] as const;

export const EVENING_VOICE_SEGMENTS: { speakerId: string; timestamp: string; text: string }[] = [
  { speakerId: 's-thandi-eve', timestamp: '00:00:06', text: 'Khaya Property Services after-hours line, Thandi speaking.' },
  { speakerId: 's-bongani', timestamp: '00:00:14', text: 'Thandi, it’s Bongani Dlamini at unit 4C in Melville. There is water coming through the kitchen ceiling. I only noticed it now.' },
  { speakerId: 's-thandi-eve', timestamp: '00:00:28', text: 'I’m with you. Is it a drip or a stream, and is anyone in danger downstairs?' },
  { speakerId: 's-bongani', timestamp: '00:00:38', text: 'It’s a steady leak onto the counter. The lights are still on. I switched the geyser off at the wall.' },
  { speakerId: 's-thandi-eve', timestamp: '00:00:50', text: 'Good. Leave the geyser off. Put a bucket under it and keep people out of that corner. I’m logging this as after-hours emergency.' },
  { speakerId: 's-bongani', timestamp: '00:01:06', text: 'The unit above is 5C. I banged on the door, nobody answered. I think they’re away.' },
  { speakerId: 's-thandi-eve', timestamp: '00:01:18', text: 'I have 5C as the Mokoenas, travelling this week. I’ll WhatsApp them and send Sipho with a stopcock key. Can you see a wet patch spreading toward the stove?' },
  { speakerId: 's-bongani', timestamp: '00:01:36', text: 'Yes, toward the stove. I unplugged the kettle and the toaster. The floor is wet near the fridge as well.' },
  { speakerId: 's-thandi-eve', timestamp: '00:01:50', text: 'Unplug the fridge if you can do it without standing in the water. If not, leave it. I’m dispatching Sipho now — he can be there in about twenty-five minutes from Westdene.' },
  { speakerId: 's-bongani', timestamp: '00:02:08', text: 'Twenty-five is fine. Should I open the ceiling trap? I can see a stain around the hatch.' },
  { speakerId: 's-thandi-eve', timestamp: '00:02:20', text: 'Do not open the hatch. If a pipe has burst you will get a dump of water. Sipho will isolate at the stopcock for 5C first.' },
  { speakerId: 's-bongani', timestamp: '00:02:36', text: 'Okay. Photos — do you want them on this WhatsApp before he arrives?' },
  { speakerId: 's-thandi-eve', timestamp: '00:02:46', text: 'Yes. Ceiling, counter, floor by the fridge, and the geyser switch so we can show the insurer you isolated it. I’ll attach them to the job card.' },
  { speakerId: 's-bongani', timestamp: '00:03:04', text: 'I’ll send four photos after we hang up. Is this going through insurance or is it a Khaya call-out fee tonight?' },
  { speakerId: 's-thandi-eve', timestamp: '00:03:16', text: 'Tonight is emergency isolation, no fee to you. If 5C’s pipe failed, their contents cover and the building policy split the repair. I’ll write that in the minutes so nobody bills you by mistake.' },
  { speakerId: 's-bongani', timestamp: '00:03:36', text: 'Thank you. The laminate is bubbling. I don’t want to argue about that next week.' },
  { speakerId: 's-thandi-eve', timestamp: '00:03:48', text: 'Noted: visible laminate swell at the fridge kick. Sipho will photograph it dry-side as well. We log damage tonight, we don’t wait for a weekday complaint.' },
  { speakerId: 's-bongani', timestamp: '00:04:06', text: 'Access — I’m in until ten. After that my sister can wait if he’s delayed.' },
  { speakerId: 's-thandi-eve', timestamp: '00:04:18', text: 'I’ll tell him you are in until ten. If he is later he must call this number, not just arrive. Gate code still 4419?' },
  { speakerId: 's-bongani', timestamp: '00:04:32', text: '4419, then unit 4C, second floor. Lift is working.' },
  { speakerId: 's-thandi-eve', timestamp: '00:04:42', text: 'Copied. I’ll also message the night guard so Sipho isn’t stuck at the boom. Once the water is stopped, he’ll mop the worst and leave a dehumidifier if we have one on the van.' },
  { speakerId: 's-bongani', timestamp: '00:05:02', text: 'We have towels. Should I start mopping now?' },
  { speakerId: 's-thandi-eve', timestamp: '00:05:12', text: 'Towels on the floor, yes. Don’t climb on the counter. Keep the kitchen door closed so it doesn’t track into the passage.' },
  { speakerId: 's-bongani', timestamp: '00:05:26', text: 'Done. One more thing — the smoke alarm chirped when the water hit near it. It stopped.' },
  { speakerId: 's-thandi-eve', timestamp: '00:05:38', text: 'Leave the alarm. If it goes off continuously, open a window and step into the passage. I’ll add a battery check to Sipho’s card.' },
  { speakerId: 's-bongani', timestamp: '00:05:54', text: 'Alright. I’ll send the photos and wait. Please WhatsApp me when he’s five minutes away.' },
  { speakerId: 's-thandi-eve', timestamp: '00:06:06', text: 'I will. Job KH-2197, Melville 4C ceiling leak, isolation tonight, damage logged. Stay dry. Khaya after-hours, Thandi.' },
];

export const EVENING_VOICE_TRANSCRIPT: Transcript = {
  id: EVENING_VOICE_TRANSCRIPT_ID,
  title: 'Melville 4C — after-hours ceiling leak',
  source: 'whatsapp_call',
  status: 'completed',
  date: new Date(new Date().setHours(EVENING_VOICE_HOUR, EVENING_VOICE_MINUTE, 0, 0)).toISOString(),
  duration: '6 min 12 sec',
  participants: ['Thandi · Khaya', 'Bongani Dlamini'],
  tags: ['test-call', 'urgent', 'maintenance'],
  summary:
    'Bongani Dlamini called the Khaya after-hours line at 19:57 about a steady leak through the kitchen ceiling at Melville unit 4C. He had already switched the geyser off. Thandi dispatched Sipho for isolation at the 5C stopcock (tenants away), logged laminate swell at the fridge, and confirmed tonight is emergency isolation with no call-out fee to 4C. Photos to follow on WhatsApp. Job KH-2197.',
  executiveSummary:
    'After-hours isolation for Melville 4C ceiling leak. Sipho en route (~25 min). No fee to the caller tonight; damage logged for insurance.',
  topics: ['after-hours', 'leak', 'isolation', 'insurance', 'Melville'],
  decisions: [
    { id: 'eve-d1', text: 'Tonight is emergency isolation only — no call-out fee to unit 4C.', kind: 'decision' },
    { id: 'eve-d2', text: 'Do not open the ceiling hatch before the stopcock is closed.', kind: 'agreement' },
    { id: 'eve-d3', text: 'Visible laminate damage is logged tonight, not deferred to a weekday complaint.', kind: 'commitment' },
  ],
  followUps: [
    {
      id: 'eve-f1',
      text: 'WhatsApp Bongani when Sipho is five minutes away; attach photos to job KH-2197.',
      assignee: 'Thandi',
      dueHint: 'Tonight',
    },
  ],
  sentimentNote: 'Calm, practical, relieved once isolation and cost were confirmed.',
  summaryStatus: 'ready',
  actionItems: [
    {
      id: 'eve-a1',
      text: 'Dispatch Sipho to Melville 4C with stopcock key; ETA ~25 minutes from Westdene',
      assignee: 'Thandi',
      completed: false,
    },
    {
      id: 'eve-a2',
      text: 'WhatsApp 5C (Mokoenas) and the night guard about access',
      assignee: 'Thandi',
      completed: false,
    },
    {
      id: 'eve-a3',
      text: 'Photograph isolation, laminate swell, and geyser switch for the insurer',
      assignee: 'Sipho',
      completed: false,
    },
  ],
  segments: EVENING_VOICE_SEGMENTS.map((s, i) => ({
    id: `eve-seg-${i + 1}`,
    speakerId: s.speakerId,
    text: s.text,
    timestamp: s.timestamp,
  })),
  keywordMatches: 7,
};
