import type { CallRecord } from './callHistory';

/** Local wall-clock timestamp `daysAgo` days before today — keeps the 7-day chart current. */
function testStartedAt(daysAgo: number, hour: number, minute: number): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

/** TEST MODE call log (mock DATA_SOURCE and Khaya demonstration fallback). */
export const demoCallRecords: CallRecord[] = [
  {
    id: 'c-test-sandton',
    counterparty: 'Lesedi Mokoena',
    direction: 'user_initiated',
    startedAt: testStartedAt(1, 9, 14),
    durationSeconds: 712,
    status: 'COMPLETED',
    transcriptId: 't-test-sandton-handover',
    transcriptTitle: 'Sandton unit 12B — occupation handover',
    transcriptState: 'ready',
  },
  {
    id: 'c1',
    counterparty: '+27 82 441 2201',
    direction: 'user_initiated',
    startedAt: testStartedAt(0, 8, 15),
    durationSeconds: 2520,
    status: 'COMPLETED',
    transcriptId: 't1',
    transcriptTitle: 'VILATECH Q3 Strategy Call',
    transcriptState: 'ready',
  },
  {
    id: 'c2',
    counterparty: '+27 83 902 1188',
    direction: 'business_initiated',
    startedAt: testStartedAt(1, 14, 2),
    durationSeconds: 1080,
    status: 'COMPLETED',
    transcriptId: 't4',
    transcriptTitle: 'WhatsApp Call — Vendor Onboarding',
    transcriptState: 'waiting',
  },
  {
    id: 'c3',
    counterparty: '+27 71 555 0142',
    direction: 'user_initiated',
    startedAt: testStartedAt(2, 9, 40),
    durationSeconds: null,
    status: 'NO_ANSWER',
    transcriptId: null,
    transcriptTitle: null,
    transcriptState: 'waiting',
  },
  {
    id: 'c4',
    counterparty: '+27 82 441 2201',
    direction: 'business_initiated',
    startedAt: testStartedAt(2, 16, 20),
    durationSeconds: 540,
    status: 'COMPLETED',
    transcriptId: 't2',
    transcriptTitle: 'Voice Note — Client Brief',
    transcriptState: 'ready',
  },
  {
    id: 'c5',
    counterparty: '+27 84 120 8890',
    direction: 'user_initiated',
    startedAt: testStartedAt(3, 11, 5),
    durationSeconds: 1860,
    status: 'COMPLETED',
    transcriptId: 't5',
    transcriptTitle: 'Board Meeting Recording',
    transcriptState: 'ready',
  },
  {
    id: 'c6',
    counterparty: '+27 83 902 1188',
    direction: 'business_initiated',
    startedAt: testStartedAt(4, 8, 30),
    durationSeconds: null,
    status: 'BUSY',
    transcriptId: null,
    transcriptTitle: null,
    transcriptState: 'waiting',
  },
  {
    id: 'c7',
    counterparty: '+27 82 441 2201',
    direction: 'user_initiated',
    startedAt: testStartedAt(5, 13, 10),
    durationSeconds: 720,
    status: 'COMPLETED',
    transcriptId: null,
    transcriptTitle: null,
    transcriptState: 'failed',
  },
  {
    id: 'c8',
    counterparty: '+27 84 120 8890',
    direction: 'business_initiated',
    startedAt: testStartedAt(6, 10, 0),
    durationSeconds: 1320,
    status: 'COMPLETED',
    transcriptId: null,
    transcriptTitle: null,
    transcriptState: 'ready',
  },
];

export type DemoBusinessOutcome = 'positive' | 'neutral' | 'negative';

/** Outcome labels for TEST MODE transcripts / calls (mock and Khaya demonstration). */
export const demoCallOutcomes: Record<string, DemoBusinessOutcome> = {
  'c-test-sandton': 'positive',
  c1: 'positive',
  c2: 'neutral',
  c4: 'positive',
  c5: 'positive',
  c8: 'positive',
};
