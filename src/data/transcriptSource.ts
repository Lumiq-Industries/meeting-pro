// Where the transcript screens get their data.
//
// Two sources behind one interface, selected by EXPO_PUBLIC_DATA_SOURCE:
//   supabase (default) — real rows from the database, as the signed-in user
//   mock               — src/data/mockData.ts, kept for side-by-side comparison
//
// mockData.ts stays until real data is confirmed to render correctly; flipping
// the env var and restarting Expo is the comparison.
//
// The database schema and the UI types in src/types were designed separately and
// do not line up. Neither is reshaped here. The adapter below maps one onto the
// other and every mapping that has to make a choice is marked MISMATCH, so the
// open decisions stay visible rather than disappearing into the code.
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { SPEAKER_COLORS } from '../constants/theme';
import * as mock from './mockData';
import type {
  ActionItem,
  Speaker,
  Transcript,
  TranscriptSegment,
  TranscriptStatus,
} from '../types';

export type DataSource = 'supabase' | 'mock';

export const DATA_SOURCE: DataSource =
  process.env.EXPO_PUBLIC_DATA_SOURCE === 'mock' ? 'mock' : 'supabase';

type DbTranscriptStatus = Database['public']['Enums']['transcript_status'];
type DbActionStatus = Database['public']['Enums']['action_item_status'];

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------
// One round trip each, joined through the foreign keys. RLS scopes every table
// to the signed-in user's business, so no business filter is needed here — and
// adding one would only hide a policy bug rather than reveal it.

const LIST_SELECT = `
  id, status, created_at, duration_seconds, summary,
  calls ( started_at, duration_seconds, counterparty_phone, direction ),
  transcript_tags ( tags ( name ) ),
  action_items ( id, text, owner, status )
` as const;

const DETAIL_SELECT = `
  id, status, created_at, duration_seconds, summary,
  calls ( started_at, duration_seconds, counterparty_phone, direction ),
  transcript_tags ( tags ( name ) ),
  action_items ( id, text, owner, status ),
  transcript_segments ( id, segment_index, speaker, channel, start_seconds, text )
` as const;

interface DbCall {
  started_at: string | null;
  duration_seconds: number | null;
  counterparty_phone: string | null;
  direction: string;
}

interface DbRow {
  id: string;
  status: DbTranscriptStatus;
  created_at: string;
  duration_seconds: number | null;
  summary: string | null;
  calls: DbCall | null;
  transcript_tags: { tags: { name: string } | null }[];
  action_items: { id: string; text: string; owner: string | null; status: DbActionStatus }[];
  transcript_segments?: {
    id: string;
    segment_index: number;
    speaker: string | null;
    channel: number | null;
    start_seconds: number | null;
    text: string | null;
  }[];
}

// ---------------------------------------------------------------------------
// Adapter: database row -> UI Transcript
// ---------------------------------------------------------------------------

// MISMATCH: the database has four pipeline states, the UI has three display
// states, and they mean different things. `failed` has no UI equivalent at all;
// rendering it as "processing" would be a lie, so failed transcripts are left out
// of the lists entirely (see isDisplayable). `live` exists only in the UI.
function mapStatus(status: DbTranscriptStatus): TranscriptStatus {
  return status === 'ready' ? 'completed' : 'processing';
}

function isDisplayable(row: DbRow): boolean {
  return row.status !== 'failed';
}

// MISMATCH: the UI shows duration as a display string ("42 min"); the database
// stores seconds. Formatted to match the mock's style.
function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return '—';
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

// UI segment timestamps are "HH:MM:SS" strings; the database stores seconds.
function formatTimestamp(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return '--:--:--';
  const s = Math.floor(seconds);
  const hh = String(Math.floor(s / 3600)).padStart(2, '0');
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

// MISMATCH: the UI requires a title; the database has no title column. This is a
// placeholder derived from the call, not real data. A title needs either a new
// column (set by a user or the summary pipeline) or an agreed derivation.
function deriveTitle(call: DbCall | null): string {
  return call?.counterparty_phone ? `WhatsApp call · +${call.counterparty_phone}` : 'WhatsApp call';
}

// MISMATCH: UI participants are display names. The database holds only the
// counterparty's phone number and business-scoped user id — no names for either
// side. The phone number is the closest available stand-in.
function deriveParticipants(call: DbCall | null): string[] {
  return call?.counterparty_phone ? [`+${call.counterparty_phone}`] : [];
}

// MISMATCH: UI action items have a boolean `completed`; the database has three
// states. `cancelled` is neither done nor open, so cancelled items are omitted
// rather than shown as either. `owner` maps to `assignee`; `due_date` and
// `is_ai_generated` have no UI field and are dropped.
function mapActionItems(rows: DbRow['action_items']): ActionItem[] {
  return rows
    .filter((a) => a.status !== 'cancelled')
    .map((a) => ({
      id: a.id,
      text: a.text,
      assignee: a.owner ?? undefined,
      completed: a.status === 'done',
    }));
}

// MISMATCH: UI segments point at a global speaker list by `speakerId`, with a
// name and colour per person. The database has no speakers table — Meta
// separates speakers by audio channel only (0 = business, 1 = customer). Each
// channel becomes a synthetic speaker, named from the segment's own `speaker`
// label and coloured by channel.
function channelSpeakerId(channel: number | null): string {
  return channel === null ? 'channel-unknown' : `channel-${channel}`;
}

function mapSegments(rows: NonNullable<DbRow['transcript_segments']>): {
  segments: TranscriptSegment[];
  speakers: Speaker[];
} {
  const ordered = [...rows].sort((a, b) => a.segment_index - b.segment_index);
  const speakers = new Map<string, Speaker>();
  const segments = ordered.map((seg) => {
    const speakerId = channelSpeakerId(seg.channel);
    if (!speakers.has(speakerId)) {
      speakers.set(speakerId, {
        id: speakerId,
        name: seg.speaker ?? 'Unknown speaker',
        color: SPEAKER_COLORS[(seg.channel ?? 0) % SPEAKER_COLORS.length],
      });
    }
    return {
      id: seg.id,
      speakerId,
      text: seg.text ?? '',
      timestamp: formatTimestamp(seg.start_seconds),
    };
  });
  return { segments, speakers: [...speakers.values()] };
}

function toTranscript(row: DbRow): { transcript: Transcript; speakers: Speaker[] } {
  const call = row.calls;
  const mapped = row.transcript_segments ? mapSegments(row.transcript_segments) : null;
  return {
    transcript: {
      id: row.id,
      title: deriveTitle(call),
      // MISMATCH: the UI distinguishes four sources; everything in the database
      // arrives through the calls webhook, so it is always a WhatsApp call. Voice
      // notes, meetings and uploads have no ingest path yet.
      source: 'whatsapp_call',
      status: mapStatus(row.status),
      date: call?.started_at ?? row.created_at,
      duration: formatDuration(row.duration_seconds ?? call?.duration_seconds ?? null),
      participants: deriveParticipants(call),
      tags: row.transcript_tags
        .map((tt) => tt.tags?.name)
        .filter((n): n is string => Boolean(n)),
      summary: row.summary ?? undefined,
      actionItems: mapActionItems(row.action_items),
      segments: mapped?.segments,
      // MISMATCH: keywordMatches is a search-time figure; nothing stores it.
      keywordMatches: undefined,
    },
    speakers: mapped?.speakers ?? [],
  };
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

interface ListState {
  transcripts: Transcript[];
  loading: boolean;
  error: string | null;
  source: DataSource;
  reload: () => void;
}

export function useTranscripts(): ListState {
  const [transcripts, setTranscripts] = useState<Transcript[]>(
    DATA_SOURCE === 'mock' ? mock.transcripts : []
  );
  const [loading, setLoading] = useState(DATA_SOURCE === 'supabase');
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (DATA_SOURCE === 'mock') return;
    let cancelled = false;
    setLoading(true);
    supabase
      .from('transcripts')
      .select(LIST_SELECT)
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setTranscripts([]);
        } else {
          setError(null);
          const rows = (data ?? []) as unknown as DbRow[];
          setTranscripts(rows.filter(isDisplayable).map((r) => toTranscript(r).transcript));
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return { transcripts, loading, error, source: DATA_SOURCE, reload };
}

interface DetailState {
  transcript: Transcript | undefined;
  loading: boolean;
  error: string | null;
  source: DataSource;
  getSpeakerById: (id: string) => Speaker | undefined;
}

export function useTranscript(id: string): DetailState {
  const [transcript, setTranscript] = useState<Transcript | undefined>(
    DATA_SOURCE === 'mock' ? mock.getTranscriptById(id) : undefined
  );
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(DATA_SOURCE === 'supabase');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (DATA_SOURCE === 'mock') return;
    let cancelled = false;
    setLoading(true);
    supabase
      .from('transcripts')
      .select(DETAIL_SELECT)
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setTranscript(undefined);
        } else if (data) {
          const mapped = toTranscript(data as unknown as DbRow);
          setError(null);
          setTranscript(mapped.transcript);
          setSpeakers(mapped.speakers);
        } else {
          // No row: either it does not exist or RLS hid it. Deliberately the same
          // outcome, so the app never confirms a transcript exists to someone who
          // may not see it.
          setError(null);
          setTranscript(undefined);
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const getSpeakerById = useCallback(
    (speakerId: string) =>
      DATA_SOURCE === 'mock'
        ? mock.getSpeakerById(speakerId)
        : speakers.find((s) => s.id === speakerId),
    [speakers]
  );

  return { transcript, loading, error, source: DATA_SOURCE, getSpeakerById };
}
