// Dashboard figures, counted from the database.
//
// Every number here is real or absent. Nothing is estimated, and nothing falls
// back to a placeholder figure — a tile with no source shows NO_VALUE and the
// gap is written down rather than filled in.
//
// What the database CANNOT answer, and why:
//   plan / subscription tier — no table, column or billing integration stores
//     it. Home and Settings show "Not set" until there is a real source.
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DATA_SOURCE } from './transcriptSource';
import { demoTranscripts } from './demoTranscripts';

export interface DashboardCounts {
  /** Calls recorded for this business. */
  sessions: number;
  /** Total transcribed time, in hours, or null when nothing is transcribed yet. */
  hours: number | null;
  /** Action items still open. Zero until the summary pass exists to create any. */
  actionItemsOpen: number;
  /** Calls first seen in the last 7 days. Computed but not currently displayed. */
  callsThisWeek: number;
  /** Whether an active WhatsApp number is registered for this business. */
  whatsappConnected: boolean;
  /** Transcripts whose download failed and are waiting on a retry. */
  transcriptsFailed: number;
}

export interface DashboardState extends DashboardCounts {
  loading: boolean;
  error: string | null;
  /** True when the business has no calls at all — a brand new account. */
  isEmpty: boolean;
  reload: () => void;
}

const EMPTY: DashboardCounts = {
  sessions: 0,
  hours: null,
  actionItemsOpen: 0,
  callsThisWeek: 0,
  whatsappConnected: false,
  transcriptsFailed: 0,
};

/**
 * Counts come back in a response header, so no rows are transferred.
 * Written out per table rather than through one helper: each table has its own
 * columns, and a shared helper would erase that and let a typo through.
 */
const HEAD_COUNT = { count: 'exact' as const, head: true };

function countValue(res: { count: number | null; error: { message: string } | null }): number {
  if (res.error) throw new Error(res.error.message);
  return res.count ?? 0;
}

function demoCounts(): DashboardCounts {
  const open = demoTranscripts.flatMap((t) => t.actionItems ?? []).filter((a) => !a.completed);
  return {
    ...EMPTY,
    sessions: demoTranscripts.length,
    actionItemsOpen: open.length,
    whatsappConnected: true,
    // Demo durations are display strings ("42 min"), not numbers, so there is
    // nothing honest to total here.
    hours: null,
  };
}

export function useDashboardStats(): DashboardState {
  const [counts, setCounts] = useState<DashboardCounts>(
    DATA_SOURCE === 'mock' ? demoCounts() : EMPTY
  );
  const [loading, setLoading] = useState(DATA_SOURCE === 'supabase');
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (DATA_SOURCE === 'mock') return;
    let cancelled = false;
    setLoading(true);

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    (async () => {
      try {
        const [sessions, actionItemsOpen, callsThisWeek, numbers, transcriptsFailed, durations] =
          await Promise.all([
            supabase.from('calls').select('id', HEAD_COUNT).then(countValue),
            supabase.from('action_items').select('id', HEAD_COUNT).eq('status', 'open').then(countValue),
            // created_at, not started_at: a call created from a transcription
            // webhook has no start time until its lifecycle event arrives.
            supabase.from('calls').select('id', HEAD_COUNT).gte('created_at', weekAgo).then(countValue),
            supabase.from('whatsapp_numbers').select('id', HEAD_COUNT).eq('is_active', true).then(countValue),
            supabase.from('transcripts').select('id', HEAD_COUNT).eq('status', 'failed').then(countValue),
            // TODO(scale): summed in the app because PostgREST aggregate
            // functions are disabled on Supabase (PGRST123), so SUM() is not
            // available over the API. Fine for hundreds of rows; past that this
            // wants a database view or an RPC that returns the total directly.
            supabase.from('transcripts').select('duration_seconds').eq('status', 'ready'),
          ]);

        if (cancelled) return;
        if (durations.error) throw new Error(durations.error.message);

        const seconds = (durations.data ?? []).reduce(
          (sum, row) => sum + (row.duration_seconds ?? 0),
          0
        );

        setCounts({
          sessions,
          hours: (durations.data ?? []).length === 0 ? null : seconds / 3600,
          actionItemsOpen,
          callsThisWeek,
          whatsappConnected: numbers > 0,
          transcriptsFailed,
        });
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setCounts(EMPTY);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return {
    ...counts,
    loading,
    error,
    isEmpty: !loading && error === null && counts.sessions === 0,
    reload,
  };
}

/**
 * Hours for display, or null when there is nothing to total.
 *
 * Anything under six minutes shows as "<0.1" rather than rounding up to 0.1,
 * which would overstate it: four minutes of calls is not "0.1 hours".
 */
export function formatHours(hours: number | null): string | null {
  if (hours === null) return null;
  if (hours === 0) return '0';
  if (hours < 0.1) return '<0.1';
  return hours >= 10 ? hours.toFixed(0) : hours.toFixed(1);
}
