import React from 'react';
import Svg, { Circle, Path, Rect, Line, G } from 'react-native-svg';

type SceneProps = {
  width?: number;
  height?: number;
  label: string;
};

/** Original editorial scene: voice line becoming a minutes sheet. */
export function SceneCallToMinutes({ width = 640, height = 360, label }: SceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 640 360"
      accessibilityRole="image"
      accessibilityLabel={label}
    >
      <Rect width="640" height="360" rx="28" fill="#0A0A0A" />
      <Rect x="1" y="1" width="638" height="358" rx="27" stroke="rgba(255,255,255,0.14)" fill="none" />
      <G opacity={0.9}>
        <Circle cx="150" cy="180" r="88" stroke="#25D366" strokeWidth={1.5} fill="none" opacity={0.35} />
        <Circle cx="150" cy="180" r="58" stroke="#25D366" strokeWidth={1.6} fill="none" opacity={0.55} />
        <Path
          d="M118 148c8-12 28-14 38-2l14 22c4 8 2 16-6 20l-16 8c8 22 28 40 50 48l8-16c4-8 14-10 22-6l22 12c12 6 16 20 8 30l-10 14c-8 12-22 16-36 12-52-12-96-56-108-108-4-14 2-28 14-36z"
          stroke="#25D366"
          strokeWidth={2}
          fill="none"
          strokeLinejoin="round"
        />
        <Path
          d="M196 112h54c10 0 18 8 18 18v32c0 10-8 18-18 18h-16l-20 16v-16h-18c-10 0-18-8-18-18v-32c0-10 8-18 18-18z"
          stroke="#25D366"
          strokeWidth={1.8}
          fill="none"
          strokeLinejoin="round"
        />
      </G>
      <Line x1="250" y1="180" x2="330" y2="180" stroke="rgba(255,255,255,0.28)" strokeWidth={1.4} />
      <Path d="M318 170l14 10-14 10" stroke="rgba(255,255,255,0.28)" strokeWidth={1.4} fill="none" />
      <G>
        <Rect x="348" y="64" width="220" height="232" rx="14" fill="#141414" stroke="rgba(255,255,255,0.16)" />
        <Rect x="368" y="88" width="120" height="8" rx="4" fill="rgba(255,255,255,0.55)" />
        <Rect x="368" y="108" width="176" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
        <Rect x="368" y="122" width="160" height="5" rx="2.5" fill="rgba(255,255,255,0.14)" />
        <Path d="M368 154l10 10 18-20" stroke="#22C55E" strokeWidth={2} fill="none" strokeLinecap="round" />
        <Rect x="404" y="158" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
        <Path d="M368 186l10 10 18-20" stroke="#22C55E" strokeWidth={2} fill="none" strokeLinecap="round" />
        <Rect x="404" y="190" width="132" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
        <Rect x="368" y="224" width="14" height="14" rx="3" stroke="rgba(96,165,250,0.9)" strokeWidth={1.5} fill="none" />
        <Rect x="392" y="228" width="108" height="5" rx="2.5" fill="rgba(96,165,250,0.55)" />
        <Rect x="368" y="250" width="14" height="14" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} fill="none" />
        <Rect x="392" y="254" width="88" height="5" rx="2.5" fill="rgba(255,255,255,0.16)" />
      </G>
    </Svg>
  );
}

/** Original scene: email pack leaving the desk. */
export function SceneEmailPack({ width = 480, height = 280, label }: SceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 480 280"
      accessibilityRole="image"
      accessibilityLabel={label}
    >
      <Rect width="480" height="280" rx="24" fill="#0A0A0A" />
      <Rect x="1" y="1" width="478" height="278" rx="23" stroke="rgba(255,255,255,0.14)" fill="none" />
      <Rect x="58" y="70" width="200" height="140" rx="10" fill="#161616" stroke="rgba(255,255,255,0.14)" />
      <Rect x="78" y="94" width="120" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
      <Rect x="78" y="114" width="160" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
      <Rect x="78" y="128" width="148" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <Rect x="78" y="154" width="88" height="4" rx="2" fill="rgba(59,130,246,0.55)" />
      <G transform="translate(250,86)">
        <Rect x="0" y="28" width="160" height="100" rx="12" stroke="#FAFAFA" strokeWidth={1.7} fill="#111" />
        <Path d="M8 36l72 52 72-52" stroke="#FAFAFA" strokeWidth={1.7} fill="none" strokeLinejoin="round" />
        <Path d="M132 8l28 18-18 8" stroke="#60A5FA" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      </G>
    </Svg>
  );
}
