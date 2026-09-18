// Meeting Pro — WhatsApp calls webhook receiver.
//
// Production entry point. This is the ONLY file that touches the Deno runtime or
// the network; everything it wires together lives under src/ and is exercised by
// the offline test suite in tests/.
//
// Deploy:  supabase functions deploy whatsapp-webhook --no-verify-jwt
//   --no-verify-jwt is required. Meta authenticates with X-Hub-Signature-256,
//   not a Supabase JWT, and will never send an Authorization header.
//
// Required secrets (supabase secrets set ...):
//   META_APP_SECRET    — app secret, used for the X-Hub-Signature-256 HMAC
//   META_VERIFY_TOKEN  — the token entered in the Meta app webhook config
//   META_ACCESS_TOKEN  — see the note on token resolution below
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY — injected by the platform

import { createClient } from "jsr:@supabase/supabase-js@2";
import { handleRequest } from "./src/handler.ts";
import { SupabaseDb } from "./src/supabase-db.ts";
import { logError } from "./src/log.ts";
import { resolveAccessToken } from "../_shared/meta-token.ts";

const appSecret = Deno.env.get("META_APP_SECRET") ?? "";
const verifyToken = Deno.env.get("META_VERIFY_TOKEN") ?? "";
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

if (!appSecret || !verifyToken) {
  // Log the absence, never the value. Without these the function still starts and
  // still logs inbound events, but every one will be marked unverified.
  logError("config.missing", {
    app_secret_set: Boolean(appSecret),
    verify_token_set: Boolean(verifyToken),
  });
}

const client = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
const db = new SupabaseDb(client);

Deno.serve(async (req: Request) => {
  const { response, processing } = await handleRequest(
    req,
    { appSecret, verifyToken },
    { db, resolveAccessToken },
  );

  // Keep the worker alive for the background work without holding the response
  // open. Meta gets its 200 in milliseconds; the download and writes continue.
  const runtime = (globalThis as { EdgeRuntime?: { waitUntil(p: Promise<unknown>): void } })
    .EdgeRuntime;
  if (runtime?.waitUntil) {
    runtime.waitUntil(processing);
  } else {
    processing.catch(() => {});
  }

  return response;
});
