import { useMemo } from 'react';
import { useCallHistory, CallRecord, formatCallDuration, localDayKey } from './callHistory';
import { useDashboardStats } from './dashboardStats';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { DATA_SOURCE } from './transcriptSource';
import { demoCallOutcomes, demoCallRecords } from './demoCallRecords';

export type BusinessOutcome = 'positive' | 'neutral' | 'negative' | 'unknown';

export interface DayVolume {
  /** Short label e.g. Mon */
  label: string;
  answered: number;
  missed: number;
}

export interface ContactCallStats {
  /** Display phone or name key */
  key: string;
  label: string;
  total: number;
  answered: number;
  missed: number;
  avgDurationSeconds: number | null;
  answerRate: number | null;
  lastOutcome: BusinessOutcome;
}

export interface CallAnalytics {
  loading: boolean;
  error: string | null;
  totalCalls: number;
  answered: number;
  missed: number;
  answerRate: number | null;
  avgDurationSeconds: number | null;
  avgDurationLabel: string;
  minutesEmailed: number | null;
  positiveOutcomes: number | null;
  outcomeRate: number | null;
  medianTimeToTranscriptMinutes: number | null;
  volumeByDay: DayVolume[];
  contactStats: ContactCallStats[];
  recentCalls: CallRecord[];
}

function isAnswered(call: CallRecord): boolean {
  if (call.durationSeconds != null && call.durationSeconds > 0) return true;
  const s = (call.status ?? '').toUpperCase();
  return s === 'COMPLETED' || s === 'ANSWERED';
}

function isMissed(call: CallRecord): boolean {
  if (isAnswered(call)) return false;
  const s = (call.status ?? '').toUpperCase();
  return s === 'NO_ANSWER' || s === 'BUSY' || s === 'FAILED' || s === 'CANCELLED';
}

function normalizePhone(raw: string | null): string {
  if (!raw) return 'unknown';
  return raw.replace(/\D/g, '');
}

function isTestMode(isDemoData: boolean): boolean {
  return DATA_SOURCE === 'mock' || isDemoData;
}

function outcomeForCall(call: CallRecord, testMode: boolean): BusinessOutcome {
  if (testMode) {
    return demoCallOutcomes[call.id] ?? 'unknown';
  }
  if (call.transcriptState === 'ready' && call.transcriptTitle) return 'unknown';
  return 'unknown';
}

function volumeWindowHasData(days: DayVolume[]): boolean {
  return days.some((d) => d.answered + d.missed > 0);
}

function buildVolumeByDay(calls: CallRecord[]): DayVolume[] {
  const days: DayVolume[] = [];
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = localDayKey(d);
    const label = d.toLocaleDateString('en-ZA', { weekday: 'short' });
    const dayCalls = calls.filter((c) => localDayKey(c.startedAt) === key);
    days.push({
      label,
      answered: dayCalls.filter(isAnswered).length,
      missed: dayCalls.filter(isMissed).length,
    });
  }
  return days;
}

function buildContactStats(calls: CallRecord[], testMode: boolean): ContactCallStats[] {
  const map = new Map<
    string,
    {
      label: string;
      total: number;
      answered: number;
      missed: number;
      durationSum: number;
      durationCount: number;
      lastOutcome: BusinessOutcome;
    }
  >();

  for (const call of calls) {
    const key = normalizePhone(call.counterparty);
    const label = call.counterparty ?? 'Unknown number';
    const entry = map.get(key) ?? {
      label,
      total: 0,
      answered: 0,
      missed: 0,
      durationSum: 0,
      durationCount: 0,
      lastOutcome: 'unknown' as BusinessOutcome,
    };
    entry.total += 1;
    if (isAnswered(call)) {
      entry.answered += 1;
      if (call.durationSeconds != null) {
        entry.durationSum += call.durationSeconds;
        entry.durationCount += 1;
      }
    } else if (isMissed(call)) {
      entry.missed += 1;
    }
    entry.lastOutcome = outcomeForCall(call, testMode);
    map.set(key, entry);
  }

  return [...map.values()]
    .map((e) => ({
      key: e.label,
      label: e.label,
      total: e.total,
      answered: e.answered,
      missed: e.missed,
      avgDurationSeconds: e.durationCount > 0 ? e.durationSum / e.durationCount : null,
      answerRate: e.total > 0 ? e.answered / e.total : null,
      lastOutcome: e.lastOutcome,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
}

export function useCallAnalytics(): CallAnalytics {
  const { calls, loading: callsLoading, error: callsError } = useCallHistory();
  const dashboard = useDashboardStats();
  const { isDemoData } = useWorkspace();

  return useMemo(() => {
    const testMode = isTestMode(isDemoData);
    const loading = callsLoading || dashboard.loading;
    const error = callsError ?? dashboard.error;

    let volumeByDay = buildVolumeByDay(calls);
    const series =
      testMode && !volumeWindowHasData(volumeByDay) ? demoCallRecords : calls;
    if (series !== calls) volumeByDay = buildVolumeByDay(series);

    const answered = series.filter(isAnswered).length;
    const missed = series.filter(isMissed).length;
    const totalCalls = series.length;
    const answerRate = totalCalls > 0 ? answered / totalCalls : null;

    const durations = series
      .map((c) => c.durationSeconds)
      .filter((s): s is number => s != null && s > 0);
    const avgDurationSeconds =
      durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : null;

    const outcomes = series.map((c) => outcomeForCall(c, testMode));
    const positiveOutcomes = testMode
      ? outcomes.filter((o) => o === 'positive').length
      : null;
    const knownOutcomes = outcomes.filter((o) => o !== 'unknown').length;
    const outcomeRate =
      knownOutcomes > 0 && positiveOutcomes != null ? positiveOutcomes / knownOutcomes : null;

    const minutesEmailed =
      dashboard.sessions != null || testMode
        ? series.filter((c) => c.transcriptState === 'ready').length
        : null;

    return {
      loading: testMode ? false : loading,
      error,
      totalCalls,
      answered,
      missed,
      answerRate,
      avgDurationSeconds,
      avgDurationLabel: formatCallDuration(
        avgDurationSeconds != null ? Math.round(avgDurationSeconds) : null
      ),
      minutesEmailed,
      positiveOutcomes,
      outcomeRate,
      medianTimeToTranscriptMinutes: testMode ? 4.2 : null,
      volumeByDay,
      contactStats: buildContactStats(series, testMode),
      recentCalls: series.slice(0, 5),
    };
  }, [calls, callsLoading, callsError, dashboard, isDemoData]);
}
