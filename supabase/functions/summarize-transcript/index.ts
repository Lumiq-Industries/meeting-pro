// Meeting Pro — summarise a transcript with Claude.
//
// Meta returns transcripts, never summaries. This sends the text to Claude
// Haiku 4.5 and stores a title, a summary and any action items.
//
// Called two ways, both through this one endpoint:
//   - automatically, by the whatsapp-webhook function, right after a transcript
//     is stored (it authenticates with the service role key);
//   - manually, by a signed-in user re-running it from the app or by hand.
//
// Deploy with JWT verification on (the default):
//   supabase functions deploy summarize-transcript
//
// Secret required: ANTHROPIC_API_KEY. SUPABASE_URL, SUPABASE_ANON_KEY and
// SUPABASE_SERVICE_ROLE_KEY are injected by the platform.
import Anthropic from "npm:@anthropic-ai/sdk@0.68.0";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { summarizeTranscript } from "../whatsapp-webhook/src/summary.ts";
import type { ModelRequest, ModelResponse } from "../whatsapp-webhook/src/summary.ts";
import { SupabaseDb } from "../whatsapp-webhook/src/supabase-db.ts";
import { logError } from "../whatsapp-webhook/src/log.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY") ?? "";

// Haiku 4.5: the cheapest current model, and summarising a call transcript is
// exactly the kind of short, well-specified task it handles well.
const MODEL = "claude-haiku-4-5";
// A title, a few sentences and a short list. Deliberately small — this is a
// bounded output, and output tokens are the expensive half.
const MAX_TOKENS = 4096;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const anthropic = new Anthropic({ apiKey: anthropicKey });
const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

/** The model port from summary.ts, backed by the real API. */
const callModel = async (req: ModelRequest): Promise<ModelResponse> => {
  if (!anthropicKey) throw new Error("ANTHROPIC_API_KEY is not set");

  // No thinking config and no `effort`: Haiku 4.5 takes neither.
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: req.system,
    messages: [{ role: "user", content: req.user }],
  });

  // content is a union; take the text blocks and nothing else.
  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  if (response.stop_reason === "max_tokens") {
    // A truncated reply cannot be valid JSON. Fail loudly rather than storing
    // half a summary.
    throw new Error(`model output hit max_tokens (${MAX_TOKENS}); reply truncated`);
  }
  if (response.stop_reason === "refusal") {
    throw new Error("model declined to summarise this transcript");
  }

  return {
    text,
    model: response.model,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    },
  };
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ error: "Method Not Allowed" }, 405);

  const authorization = req.headers.get("Authorization");
  if (!authorization) return json({ error: "Sign in required" }, 401);

  let body: { transcript_id?: unknown; force?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }
  const transcriptId = body.transcript_id;
  if (typeof transcriptId !== "string" || !UUID.test(transcriptId)) {
    return json({ error: "transcript_id must be a UUID" }, 400);
  }

  // Authorisation uses the caller's own credentials, so RLS decides. The
  // webhook calls with the service role key, which sees every transcript; a
  // user's token sees only their own business's.
  const asCaller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });
  const canAccess = async (id: string) => {
    const { data, error } = await asCaller.from("transcripts").select("id").eq("id", id).maybeSingle();
    return !error && Boolean(data);
  };

  try {
    const result = await summarizeTranscript(
      transcriptId,
      canAccess,
      { db: new SupabaseDb(admin), callModel },
      { force: body.force === true },
    );

    if (result.outcome === "ready") {
      const hookSecret = Deno.env.get("MEETING_MINUTES_HOOK_SECRET");
      const emailUrl = `${supabaseUrl}/functions/v1/send-meeting-minutes`;
      fetch(emailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(hookSecret ? { Authorization: `Bearer ${hookSecret}` } : {}),
        },
        body: JSON.stringify({ transcript_id: transcriptId }),
      }).catch((e) => logError("email.minutes.trigger_failed", { error: String(e) }));
    }

    return json(result, result.outcome === "not_found" ? 404 : 200);
  } catch (err) {
    // Typed-error chain, most specific first.
    let detail = err instanceof Error ? err.message : String(err);
    if (err instanceof Anthropic.AuthenticationError) detail = "Anthropic API key rejected";
    else if (err instanceof Anthropic.RateLimitError) detail = "Anthropic rate limit reached";
    else if (err instanceof Anthropic.APIError) detail = `Anthropic API error ${err.status}`;
    logError("summary.crashed", { error: detail });
    return json({ outcome: "failed", message: "Summarisation could not be completed." }, 500);
  }
});
