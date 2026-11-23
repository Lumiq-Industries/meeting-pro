import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, Line, G } from 'react-native-svg';

type SceneProps = {
  width?: number;
  height?: number;
  label: string;
};

function sceneSvgProps(width: number, height: number, viewW: number, viewH: number, label: string) {
  return {
    width,
    height,
    viewBox: `0 0 ${viewW} ${viewH}`,
    preserveAspectRatio: 'xMidYMid meet' as const,
    accessibilityRole: 'image' as const,
    accessibilityLabel: label,
  };
}

/** Original editorial scene: voice line becoming a minutes sheet. */
export function SceneCallToMinutes({ width = 640, height = 360, label }: SceneProps) {
  return (
    <Svg {...sceneSvgProps(width, height, 640, 360, label)}>
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
    <Svg {...sceneSvgProps(width, height, 480, 280, label)}>
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

/** Night desk after hang-up — lamp, phone, minutes. Intrinsic 5:4, never stretched. */
export function SceneHeroDesk({ width = 500, height = 400, label }: SceneProps) {
  return (
    <Svg {...sceneSvgProps(width, height, 500, 400, label)}>
      <Rect width="500" height="400" rx="24" fill="#080808" />
      <Rect x="1" y="1" width="498" height="398" rx="23" stroke="rgba(255,255,255,0.12)" fill="none" />
      <Rect x="268" y="28" width="200" height="148" rx="8" fill="#101018" />
      <Circle cx="318" cy="78" r="3" fill="#C9A46A" opacity={0.45} />
      <Circle cx="348" cy="64" r="2.4" fill="#E8D5A3" opacity={0.35} />
      <Circle cx="386" cy="92" r="3.2" fill="#C9A46A" opacity={0.3} />
      <Circle cx="422" cy="70" r="2.2" fill="#FAFAFA" opacity={0.22} />
      <Circle cx="444" cy="108" r="2.8" fill="#C9A46A" opacity={0.28} />
      <Rect x="20" y="176" width="460" height="204" rx="4" fill="#121212" />
      <Rect x="20" y="176" width="460" height="8" fill="#1A1A1A" />
      <G>
        <Rect x="48" y="86" width="18" height="92" rx="4" fill="#3A3228" />
        <Circle cx="57" cy="78" r="28" fill="#2A241C" />
        <Circle cx="57" cy="78" r="22" fill="#C9A46A" opacity={0.18} />
        <Circle cx="57" cy="86" r="10" fill="#F3E6C4" opacity={0.55} />
      </G>
      <Rect x="118" y="248" width="72" height="128" rx="10" fill="#0C0C0C" stroke="rgba(37,211,102,0.45)" strokeWidth={1.4} />
      <Circle cx="154" cy="262" r="3" fill="#25D366" />
      <Rect x="128" y="276" width="52" height="86" rx="4" fill="#161616" />
      <G>
        <Rect x="214" y="214" width="168" height="132" rx="4" fill="#F4F1EA" />
        <Rect x="230" y="232" width="88" height="6" rx="2" fill="#2A2A2A" opacity={0.7} />
        <Rect x="230" y="248" width="132" height="3.5" rx="1.5" fill="#2A2A2A" opacity={0.28} />
        <Rect x="230" y="258" width="124" height="3.5" rx="1.5" fill="#2A2A2A" opacity={0.2} />
        <Rect x="230" y="268" width="118" height="3.5" rx="1.5" fill="#2A2A2A" opacity={0.18} />
        <Rect x="230" y="286" width="10" height="10" rx="2" stroke="#16A34A" strokeWidth={1.4} fill="none" />
        <Rect x="246" y="289" width="90" height="4" rx="2" fill="#16A34A" opacity={0.55} />
        <Rect x="230" y="306" width="10" height="10" rx="2" stroke="#2563EB" strokeWidth={1.4} fill="none" />
        <Rect x="246" y="309" width="72" height="4" rx="2" fill="#2563EB" opacity={0.45} />
      </G>
      <G>
        <Ellipse cx="428" cy="292" rx="28" ry="10" fill="#1A1A1A" />
        <Path d="M404 286c2-16 14-28 24-28s22 12 24 28" stroke="#8A8A8A" strokeWidth={2} fill="none" />
        <Ellipse cx="428" cy="258" rx="16" ry="5" fill="#2A2A2A" />
      </G>
    </Svg>
  );
}

/** Browser workspace — transcript, minutes, draft email. Intrinsic 3:2. */
export function SceneWorkspace({ width = 720, height = 480, label }: SceneProps) {
  return (
    <Svg {...sceneSvgProps(width, height, 720, 480, label)}>
      <Rect width="720" height="480" rx="24" fill="#080808" />
      <Rect x="1" y="1" width="718" height="478" rx="23" stroke="rgba(255,255,255,0.12)" fill="none" />
      <Rect x="36" y="40" width="648" height="400" rx="16" fill="#111111" stroke="rgba(255,255,255,0.12)" />
      <Rect x="36" y="40" width="648" height="36" rx="16" fill="#181818" />
      <Circle cx="58" cy="58" r="5" fill="#404040" />
      <Circle cx="76" cy="58" r="5" fill="#404040" />
      <Circle cx="94" cy="58" r="5" fill="#404040" />
      <Rect x="120" y="50" width="220" height="16" rx="8" fill="#0A0A0A" />
      <G>
        <Rect x="56" y="92" width="250" height="324" rx="10" fill="#0C0C0C" />
        <Rect x="72" y="110" width="96" height="8" rx="4" fill="rgba(255,255,255,0.45)" />
        <Rect x="72" y="132" width="210" height="5" rx="2.5" fill="rgba(255,255,255,0.16)" />
        <Rect x="72" y="146" width="188" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
        <Rect x="72" y="160" width="198" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
        <Rect x="72" y="184" width="210" height="5" rx="2.5" fill="rgba(255,255,255,0.16)" />
        <Rect x="72" y="198" width="170" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
        <Rect x="72" y="232" width="72" height="6" rx="3" fill="#25D366" opacity={0.7} />
      </G>
      <G>
        <Rect x="322" y="92" width="170" height="200" rx="10" fill="#141414" />
        <Rect x="338" y="110" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />
        <Path d="M338 140l8 8 14-16" stroke="#22C55E" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <Rect x="368" y="144" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
        <Path d="M338 170l8 8 14-16" stroke="#22C55E" strokeWidth={1.8} fill="none" strokeLinecap="round" />
        <Rect x="368" y="174" width="88" height="5" rx="2.5" fill="rgba(255,255,255,0.22)" />
        <Rect x="338" y="208" width="12" height="12" rx="3" stroke="#60A5FA" strokeWidth={1.4} fill="none" />
        <Rect x="358" y="212" width="96" height="5" rx="2.5" fill="rgba(96,165,250,0.5)" />
      </G>
      <G>
        <Rect x="508" y="92" width="156" height="200" rx="10" fill="#F4F1EA" />
        <Rect x="524" y="112" width="80" height="6" rx="3" fill="#1A1A1A" opacity={0.7} />
        <Rect x="524" y="130" width="124" height="4" rx="2" fill="#1A1A1A" opacity={0.22} />
        <Rect x="524" y="142" width="110" height="4" rx="2" fill="#1A1A1A" opacity={0.16} />
        <Rect x="524" y="168" width="72" height="5" rx="2.5" fill="#2563EB" opacity={0.5} />
      </G>
    </Svg>
  );
}
