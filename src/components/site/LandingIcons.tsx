import React from 'react';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';

const STROKE = 1.6;

type IconProps = {
  size?: number;
  color?: string;
  label?: string;
};

function IconFrame({
  size = 24,
  label,
  children,
}: IconProps & { children: React.ReactNode }) {
  const decorative = !label;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={label}
      accessible={!decorative}
      importantForAccessibility={decorative ? 'no' : 'yes'}
    >
      {children}
    </Svg>
  );
}

/** Classic receiver only — not a phone-in-bubble, not a messenger trademark. */
export function IconHandset({ size = 24, color = '#FAFAFA', label = 'Voice call' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Path
        d="M8.2 3.6h2.4c.7 0 1.2.6 1.1 1.3l-.4 2.6c-.1.5-.5.9-1 .9H8.6c-.4 1.8-.3 3.6.4 5.3h1.7c.5 0 .9.4 1 .9l.4 2.6c.1.7-.4 1.3-1.1 1.3H8.2c-1.4 0-2.6-1-2.8-2.4C4.9 13.3 5 8.8 5.4 6C5.6 4.6 6.8 3.6 8.2 3.6z"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Path
        d="M13.2 8.2c1.6.6 2.8 1.8 3.4 3.4M13.2 11.2c.8.3 1.4.9 1.7 1.7"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </IconFrame>
  );
}

/**
 * Hero lockup mark: Meeting Pro waveform in a square tile.
 * Original SVG — not the WhatsApp glyph, not a raster stretch.
 */
export function HeroVoiceMark({ size = 48 }: { size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="Meeting Pro"
    >
      <Rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13" fill="#0B0D12" />
      <Rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13" stroke="rgba(255,255,255,0.16)" />
      <Path d="M8 9.5h32" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <Path
        d="M11 24.5c1.4-2.2 2.5-6.8 3.4-6.8s2.2 8.6 3.6 8.6 2.4-11.6 4-11.6 2.6 18.2 4.2 18.2 2.5-14.8 3.9-14.8 2.2 8.2 3.5 8.2 2.1-5.2 3.4-5.2"
        stroke="#7DD3FC"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 24.5c1.4-2.2 2.5-6.8 3.4-6.8s2.2 8.6 3.6 8.6 2.4-11.6 4-11.6 2.6 18.2 4.2 18.2 2.5-14.8 3.9-14.8 2.2 8.2 3.5 8.2 2.1-5.2 3.4-5.2"
        stroke="#38BDF8"
        strokeWidth={1.7}
        strokeLinecap="round"
        opacity={0.55}
      />
      <Path d="M16 24.5h16" stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

export function IconTranscript({ size = 24, color = '#FAFAFA', label = 'Transcript' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Rect x="4" y="3.5" width="16" height="17" rx="2" stroke={color} strokeWidth={STROKE} />
      <Circle cx="7.5" cy="8" r="1.1" stroke={color} strokeWidth={STROKE} />
      <Line x1="10.5" y1="8" x2="17.5" y2="8" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Circle cx="7.5" cy="12.2" r="1.1" stroke={color} strokeWidth={STROKE} />
      <Line x1="10.5" y1="12.2" x2="16.2" y2="12.2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Circle cx="7.5" cy="16.4" r="1.1" stroke={color} strokeWidth={STROKE} />
      <Line x1="10.5" y1="16.4" x2="15" y2="16.4" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </IconFrame>
  );
}

export function IconMinutes({ size = 24, color = '#FAFAFA', label = 'Minutes' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Path
        d="M6 4.2h8.2L18.5 8.5V19.2A1.6 1.6 0 0 1 16.9 20.8H6A1.6 1.6 0 0 1 4.4 19.2V5.8A1.6 1.6 0 0 1 6 4.2z"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <Path d="M14.1 4.4v3.6h3.6" stroke={color} strokeWidth={STROKE} strokeLinejoin="round" />
      <Path d="M8 12.2l1.4 1.4 3.2-3.3" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="8" y1="16.6" x2="15.5" y2="16.6" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </IconFrame>
  );
}

export function IconActions({ size = 24, color = '#FAFAFA', label = 'Actions' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Rect x="4" y="5" width="3.4" height="3.4" rx="0.6" stroke={color} strokeWidth={STROKE} />
      <Path d="M4.7 6.7l1 1 1.6-1.8" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="10" y1="6.7" x2="19.5" y2="6.7" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Rect x="4" y="10.3" width="3.4" height="3.4" rx="0.6" stroke={color} strokeWidth={STROKE} />
      <Line x1="10" y1="12" x2="17.5" y2="12" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <Rect x="4" y="15.6" width="3.4" height="3.4" rx="0.6" stroke={color} strokeWidth={STROKE} />
      <Path d="M10 17.3h6.2M16.2 17.3l2.2-2.2M16.2 17.3l2.2 2.2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </IconFrame>
  );
}

export function IconEmail({ size = 24, color = '#FAFAFA', label = 'Email pack' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Rect x="3.2" y="6" width="17.6" height="12.2" rx="1.8" stroke={color} strokeWidth={STROKE} />
      <Path d="M4 7.2l8 6.1 8-6.1" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.2 14.8h4.8" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </IconFrame>
  );
}

export function IconClock({ size = 24, color = '#FAFAFA', label = 'Same afternoon' }: IconProps) {
  return (
    <IconFrame size={size} color={color} label={label}>
      <Circle cx="12" cy="12" r="8.2" stroke={color} strokeWidth={STROKE} />
      <Path d="M12 7.4v5l3.4 2" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="12" r="1" fill={color} stroke="none" />
    </IconFrame>
  );
}

export const LANDING_ICONS = {
  handset: IconHandset,
  transcript: IconTranscript,
  minutes: IconMinutes,
  actions: IconActions,
  email: IconEmail,
  clock: IconClock,
} as const;
