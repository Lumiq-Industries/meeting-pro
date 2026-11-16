# First live call — what is still left

The Meeting Pro **code** for a live WhatsApp call is already shipped. Creating a Meta app and pasting an App ID is **not** enough on its own.

You do **not** type the App ID into Meeting Pro. The app only stores **Phone number ID**, **WABA ID**, and the **display number**.

Ayanda’s Facebook login is blocked on a new device. A teammate with a developer account on a **familiar phone or laptop** does the Meta column. Do not use a VPN or a second Facebook account.

---

## Already done (skip)

- Webhook receiver, call-control, browser softphone, Connect-number form
- Live site: https://meeting-pro-rho.vercel.app/app
- Webhook URL (paste this into Meta):  
  `https://mjxfpovawoztumfcblhm.supabase.co/functions/v1/whatsapp-webhook`

## Meta dashboard (teammate)

1. [developers.facebook.com/apps](https://developers.facebook.com/apps/) → **Create App** named `Meeting Pro`, contact `vilatech17@gmail.com`.
2. Add the **WhatsApp** use case. Link or create a Business Portfolio.
3. WhatsApp → API Setup: add a **Cloud API number** (Meta’s test number is fine).
4. Turn **Calling** on for that number.
5. App roles: add testers (the personal WhatsApp that will place the call) and add Ayanda as **Admin**.
6. WhatsApp → Configuration → Webhook:
   - Callback URL = the webhook URL above
   - Verify token = the same string you (or Ayanda) put in `META_VERIFY_TOKEN`
   - Subscribe to **calls**
7. Write down, safe to send in chat:
   - App ID (for the dashboard / Cursor MCP only)
   - WABA ID
   - Phone number ID
   - Display phone (E.164, e.g. `2782…`)

## Supabase secrets (once, privately — not in the app)

If these are empty, the webhook cannot verify Meta and we cannot accept a call.

| Secret | Where it comes from |
|--------|---------------------|
| `META_APP_SECRET` | App settings → Basic → App secret → Show |
| `META_VERIFY_TOKEN` | You invent this; same value in the webhook screen |
| `META_ACCESS_TOKEN` | API Setup → Generate token (or a system-user token) |

Put them in **Supabase → Project → Edge Functions → Secrets**. Never GitHub, never this chat.

## Meeting Pro (anyone with a login)

1. Open https://meeting-pro-rho.vercel.app/app and sign in.
2. **Connect WhatsApp** — paste Phone number ID, WABA ID, display phone. Press Connect.
3. Stay on that laptop in Chrome or Edge. The green answer banner only exists on **web**, not in the WhatsApp app and not on the native Meeting Pro build yet.

## The test

1. From a **tester** personal WhatsApp, place a voice call to the **business Cloud API number**.
2. Meeting Pro should ring in the browser. Answer there (allow the microphone).
3. Talk, hang up. Transcript + minutes should land a short while later.

If it does not ring: Calling is off, webhook is not on `calls`, the three IDs do not match that number, or the caller is not a tester on a development-mode app.

## Not needed for the first five calls

Paystack, ads, privacy-page review, or a production WhatsApp display name. Those are later.

App Review / a paid WhatsApp number is only needed when people who are **not** testers must call you.
