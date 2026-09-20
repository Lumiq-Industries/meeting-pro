// Call history for the Calls screen, read from the calls table.
//
// A call and its transcript are separate things: the call always exists, the
// transcript may be on its way, may have failed, or may never come. This screen
// is the only place that shows the call itself, so it has to be honest about
// which of those is true.
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DATA_SOURCE } from './transcriptSource';

export type CallTranscriptState = 'ready' | 'failed' | 'waiting';

export interface CallRecord {
  id: string;
  /** The other party's number, already formatted for display. */
  counterparty: string | null;
  direction: 'business_initiated' | 'user_initiated' | 'unknown';
  startedAt: string | null;
  durationSeconds: number | null;
  /** Meta's own outcome for the call, e.g. COMPLETED. */
  status: string | null;
  transcriptId: string | null;
  transcriptTitle: string | null;
  transcriptState: CallTranscriptState;
}

export interface CallHistoryState {
  calls: CallRecord[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

interface DbTranscript {
  id: string;
  title: string | null;
  status: string;
}

interface DbCallRow {
  id: string;
  direction: string;
  counterparty_phone: string | null;
  started_at: string | null;
  duration_seconds: number | null;
  status: string | null;
  // PostgREST returns an object for a to-one embed and an array otherwise.
  transcripts: DbTranscript | DbTranscript[] | null;
}

function firstTranscript(value: DbCallRow['transcripts']): DbTranscript | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

export function formatCallDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return secs === 0 ? `${mins} min` : `${mins} min ${secs}s`;
}

export function formatCallNumber(raw: string | null): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 7) return raw;
  const cc = digits.slice(0, 2);
  const rest = digits.slice(2);
  return `+${cc} ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
}

export function useCallHistory(): CallHistoryState {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(DATA_SOURCE === 'supabase');
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    // Demo mode has no call records — only transcripts — so the screen says so
    // rather than inventing call rows to match.
    if (DATA_SOURCE === 'mock') {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    supabase
      .from('calls')
      .select(
        'id, direction, counterparty_phone, started_at, duration_seconds, status, transcripts(id, title, status)'
      )
      .order('started_at', { ascending: false, nullsFirst: false })
      .limit(50)
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setCalls([]);
        } else {
          setError(null);
          setCalls(
            ((data ?? []) as unknown as DbCallRow[]).map((row) => {
              const transcript = firstTranscript(row.transcripts);
              return {
                id: row.id,
                counterparty: formatCallNumber(row.counterparty_phone),
                direction: (row.direction as CallRecord['direction']) ?? 'unknown',
                startedAt: row.started_at,
                durationSeconds: row.duration_seconds,
                status: row.status,
                transcriptId: transcript?.id ?? null,
                transcriptTitle: transcript?.title ?? null,
                transcriptState:
                  transcript === null
                    ? 'waiting'
                    : transcript.status === 'ready'
                      ? 'ready'
                      : transcript.status === 'failed'
                        ? 'failed'
                        : 'waiting',
              };
            })
          );
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return { calls, loading, error, reload };
}
