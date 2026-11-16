# Teammate: create the Meeting Pro Meta app

Ayanda’s Facebook login is on a **new device**. Meta is blocking developer registration from that machine (“you don’t usually use this device”). Do **not** use a VPN or a fresh Facebook account to get around it.

Someone who already has a **Meta developer account on a familiar phone or laptop** should create the app, then add Ayanda as an admin.

## Create the app

1. On **your usual device**, open [developers.facebook.com/apps](https://developers.facebook.com/apps/) and sign in.
2. **Create App**.
3. Name: `Meeting Pro` (30 characters max, no “Facebook/Instagram/WhatsApp” in the name).
4. Contact email: `vilatech17@gmail.com`.
5. Use case: **WhatsApp** / “Connect with customers through WhatsApp” (or Other → Business, then add WhatsApp).
6. Link a **Business Portfolio**. Create one for VILATECH if none exists. Ayanda’s Business Suite id, if you already have it, is `1143947790925807`.
7. After the app exists, add the **WhatsApp Business Messaging** use case if the wizard did not.
8. In the app, add Ayanda’s Facebook user as **Admin** (App roles).

## Calling (needed for live Meeting Pro)

1. WhatsApp → API Setup: note **App ID**, **WhatsApp Business Account ID**, **Phone number ID**, display number.
2. Enable **Calling** on that number. A test / sandbox number is fine at first.
3. Subscribe the webhook to the **calls** field.  
   Callback URL: `https://mjxfpovawoztumfcblhm.supabase.co/functions/v1/whatsapp-webhook`  
   Verify token: the `META_VERIFY_TOKEN` already in Supabase secrets (ask Ayanda in a private channel, not in GitHub).
4. App secret: Settings → Basic → Show. Put it only in Supabase secrets (`META_APP_SECRET`, `META_ACCESS_TOKEN`). **Never paste secrets in chat, email, or GitHub.**

## Send Ayanda (safe to put in chat)

- App ID
- WABA ID
- Phone number ID
- Display phone number
- Confirmation that Ayanda is an App Admin

Then reconnect **Meta Social Technologies** in Cursor so the agent can see the new app.
