# Meeting Pro — WhatsApp Transcriber

**React Native · Expo SDK 54 · Lumiq Industries**

Turn every WhatsApp voice note and meeting into searchable, actionable transcripts — matching the [Meeting Pro tier on vilatech.co](https://vilatech.co).

> **Lumiq Industries** is the combined entity of **Infinity Colon** and **VILATECH**.

## Features (prototype)

- **Glass morphism UI** with `expo-blur` — adaptive **Liquid Glass** styling on iOS 26+
- **Home dashboard** — sessions, hours transcribed, plan info, quick actions
- **Live transcription** — animated waveform, mock real-time speaker lines
- **Searchable archive** — filters, keyword search, tags
- **Transcript detail** — AI summary, action items, speaker identification, CRM export
- **WhatsApp Business connect** — integration flow (mock connected state)
- **Settings** — Lumiq Industries profile, theme, device/OS display

## Quick start

```bash
cd WhatsAppTranscriber

# Copy app icons from BookSmartFinal (or add your own to assets/)
# PowerShell:
Copy-Item ..\BookSmartFinal\assets\* .\assets\

npm install
npx expo start
```

Scan the QR code with **Expo Go** on your device, or press `i` / `a` for simulator.

## Project structure

Same pattern as `BookSmartFinal`:

```
WhatsAppTranscriber/
├── App.tsx                 # Expo entry
├── app.json
├── src/
│   ├── App.tsx
│   ├── components/         # GlassCard, GlassTabBar, etc.
│   ├── constants/theme.ts
│   ├── contexts/ThemeContext.tsx
│   ├── data/mockData.ts
│   ├── navigation/RootNavigator.tsx
│   ├── screens/
│   ├── types/
│   └── utils/platform.ts   # iOS 26 Liquid Glass detection
```

## iOS 26 Liquid Glass

`src/utils/platform.ts` detects `Platform.OS === 'ios'` and `Platform.Version >= 26`, then applies:

- Higher blur intensity
- Specular gradient sheen on glass cards
- Rounded Liquid Glass corner radii
- Device label shown in Home & Settings

On Android and older iOS, standard glass morphism is used.

## Vilatech.co product alignment

| Website feature | Prototype screen |
|-----------------|------------------|
| Voice note → text | Live · Home quick action |
| Live WhatsApp call transcription | Live screen |
| Searchable archive | Archive |
| Keyword tagging & search | Archive filters + tags |
| AI summaries & action items | Transcript detail |
| Speaker identification | Transcript detail segments |
| WhatsApp delivery | WhatsApp connect + share |
| CRM export | Transcript detail export card |
| Meeting Pro plan | Home plan card + Settings |

## Next steps (post-prototype)

1. WhatsApp Business API / Twilio integration
2. OpenAI Whisper or similar for real transcription
3. Supabase backend for transcript storage
4. Web dashboard at `meetingpro.vilatech.co`
5. EAS build for TestFlight handoff

## Company

**Lumiq Industries** — Infinity Colon & VILATECH
