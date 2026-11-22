import React, { ReactNode, useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionTokens } from '../../constants/motionTokens';
import { webOnlyStyle } from '../../utils/webStyles';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  delayMs?: number;
};

/**
 * Section motion. Content stays visible (nested ScrollView breaks IO hide).
 * After mount, a short fade-up runs unless reduced motion is set.
 */
export function LandingReveal({ children, style, delayMs = 0 }: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const duration = reduce ? motionTokens.duration.fast : motionTokens.duration.slow;
  const y = !mounted || reduce ? 0 : motionTokens.distance.sm;

  return (
    <View
      style={[
        style,
        webOnlyStyle({
          opacity: 1,
          transform: mounted && !reduce ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
          transition: reduce
            ? `opacity ${duration}s linear`
            : `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        }),
      ]}
    >
      {children}
    </View>
  );
}
