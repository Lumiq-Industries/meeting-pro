# Meeting Pro — launch checklist (App Store + web)

## Already built (Banky backend + app)

- Supabase schema, RLS, webhook receiver (`whatsapp-webhook`), retry and summarize functions
- App: sign-in, Home, Archive, Calls, transcript detail, WhatsApp status from database
- **Calls are not recorded on the phone.** Meta WhatsApp Cloud API transcribes on their servers after each call; webhooks store rows in Supabase; the app reads them.

## 1. App environment (every developer)

```bash
cp .env.example .env
```

Fill from Supabase **meeting-pro-dev** (project ref `duurebydckodwznnmwoc`) or production:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_DATA_SOURCE=supabase`

Restart: `npx expo start --clear`

## 2. WhatsApp Cloud API (Meta)

1. Meta Developer app with **WhatsApp Business** + **Calling** enabled on the business phone number.
2. Enable **call transcription** on outbound/inbound calls (Meta docs — transcription object on the call).
3. Webhook URL (dev example):

   `https://duurebydckodwznnmwoc.supabase.co/functions/v1/whatsapp-webhook`

4. Subscribe to **calls** (and related) webhook fields.
5. Set Supabase secrets (`supabase/.env.example` → `supabase/.env.local`):

   ```bash
   supabase secrets set --env-file supabase/.env.local
   supabase functions deploy whatsapp-webhook --no-verify-jwt
   supabase functions deploy retry-transcript
   supabase functions deploy summarize-transcript
   ```

6. Register the phone number in `whatsapp_numbers` for the business (admin / SQL — no in-app flow yet).

See [META_WHATSAPP_CLOUD.md](./META_WHATSAPP_CLOUD.md).

## 3. Web (browser)

```bash
npx expo start --web
# static export for hosting:
npx expo export --platform web
```

Deploy the `dist/` folder to Vercel/Netlify. Set the same `EXPO_PUBLIC_*` vars in the host environment.

## 4. App Store / Play Store

1. Create EAS project: `eas init` (replace `extra.eas.projectId` in `app.json`).
2. Configure Apple/Google credentials in Expo dashboard.
3. Production build:

   ```bash
   eas build --profile production --platform ios
   eas build --profile production --platform android
   eas submit --platform ios
   ```

4. App Review notes: app **does not record** WhatsApp audio; it displays transcripts delivered by WhatsApp Business Cloud API for registered business numbers.

## 5. Apply new migration (realtime)

If not yet on dev/prod:

```bash
supabase db push
```

Adds `calls` and `transcripts` to Realtime so the Calls tab updates when webhooks land.
