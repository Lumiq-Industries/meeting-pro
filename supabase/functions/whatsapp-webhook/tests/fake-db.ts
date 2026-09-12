// In-memory Db for offline tests.
//
// This is only a useful test double if it enforces the SAME constraints the real
// schema does, otherwise the tests prove nothing about production. Mirrored here:
//   webhook_events.dedupe_key          unique  -> DuplicateEventError
//   calls.meta_call_id                 unique  -> upsert merges, never duplicates
//   transcripts.call_id                unique  -> upsert merges, never duplicates
//   transcript_segments (transcript_id, segment_index) unique -> replace, not append
import { DuplicateEventError } from "../src/db.ts";
import type {
  CallUpsert,
  Db,
  NumberRoute,
  SegmentInsert,
  TranscriptUpsert,
  WebhookEventRow,
} from "../src/db.ts";

export interface StoredEvent extends WebhookEventRow {
  id: string;
  processed_at: string | null;
  error: string | null;
}

export class FakeDb implements Db {
  readonly events: StoredEvent[] = [];
  readonly calls: (CallUpsert & { id: string })[] = [];
  readonly transcripts: (TranscriptUpsert & { id: string })[] = [];
  readonly segments = new Map<string, SegmentInsert[]>();
  private readonly numbers = new Map<string, NumberRoute>();
  private seq = 0;

  constructor(numbers: Record<string, NumberRoute> = {}) {
    for (const [k, v] of Object.entries(numbers)) this.numbers.set(k, v);
  }

  private id(prefix: string): string {
    this.seq++;
    return `${prefix}-${String(this.seq).padStart(4, "0")}`;
  }

  findNumberByPhoneNumberId(phoneNumberId: string): Promise<NumberRoute | null> {
    return Promise.resolve(this.numbers.get(phoneNumberId) ?? null);
  }

  insertWebhookEvent(row: WebhookEventRow): Promise<{ id: string }> {
    if (this.events.some((e) => e.dedupe_key === row.dedupe_key)) {
      return Promise.reject(new DuplicateEventError(row.dedupe_key));
    }
    const stored: StoredEvent = { ...row, id: this.id("evt"), processed_at: null, error: null };
    this.events.push(stored);
    return Promise.resolve({ id: stored.id });
  }

  markEventProcessed(id: string, error?: string | null): Promise<void> {
    const evt = this.events.find((e) => e.id === id);
    if (evt) {
      evt.processed_at = new Date().toISOString();
      evt.error = error ?? null;
    }
    return Promise.resolve();
  }

  upsertCall(row: CallUpsert): Promise<{ id: string }> {
    const existing = this.calls.find((c) => c.meta_call_id === row.meta_call_id);
    if (existing) {
      // Merge: a null from a later event must not erase an earlier value.
      for (const [k, v] of Object.entries(row)) {
        if (v !== null && v !== undefined) (existing as unknown as Record<string, unknown>)[k] = v;
      }
      return Promise.resolve({ id: existing.id });
    }
    const created = { ...row, id: this.id("call") };
    this.calls.push(created);
    return Promise.resolve({ id: created.id });
  }

  findCallByMetaId(metaCallId: string): Promise<{ id: string; business_id: string } | null> {
    const c = this.calls.find((x) => x.meta_call_id === metaCallId);
    return Promise.resolve(c ? { id: c.id, business_id: c.business_id } : null);
  }

  findTranscriptByCallId(
    callId: string,
  ): Promise<{ id: string; status: string; media_sha256: string | null } | null> {
    const t = this.transcripts.find((x) => x.call_id === callId);
    return Promise.resolve(
      t ? { id: t.id, status: t.status, media_sha256: t.media_sha256 } : null,
    );
  }

  upsertTranscript(row: TranscriptUpsert): Promise<{ id: string }> {
    const existing = this.transcripts.find((t) => t.call_id === row.call_id);
    if (existing) {
      Object.assign(existing, row);
      return Promise.resolve({ id: existing.id });
    }
    const created = { ...row, id: this.id("tr") };
    this.transcripts.push(created);
    return Promise.resolve({ id: created.id });
  }

  replaceSegments(transcriptId: string, segments: SegmentInsert[]): Promise<void> {
    const indexes = new Set(segments.map((s) => s.segment_index));
    if (indexes.size !== segments.length) {
      return Promise.reject(new Error("duplicate segment_index violates unique constraint"));
    }
    this.segments.set(transcriptId, segments);
    return Promise.resolve();
  }

  segmentsFor(transcriptId: string): SegmentInsert[] {
    return this.segments.get(transcriptId) ?? [];
  }
}
