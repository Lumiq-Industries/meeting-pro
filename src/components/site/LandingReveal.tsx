import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionTokens } from '../../constants/motionTokens';
import { webOnlyStyle } from '../../utils/webStyles';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  delayMs?: number;
};

/**
 * Scroll reveal. First paint matches SSR (opacity 1). After mount, off-screen
 * nodes fade/translate in. Reduced motion: no transforms, opacity-only ≤ 200ms.
 */
export function LandingReveal({ children, style, delayMs = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') return;
    const node = ref.current as Element | null;
    if (!node || typeof (node as Element).getBoundingClientRect !== 'function') {
      setInView(true);
      return;
    }

    setInView(false);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const visible = inView || reduce;
  const duration = reduce ? motionTokens.duration.fast : motionTokens.duration.slow;
  const y = reduce || visible ? 0 : motionTokens.distance.lg;

  return (
    <View
      ref={ref}
      style={[
        style,
        webOnlyStyle({
          opacity: visible ? 1 : 0.01,
          transform: `translate3d(0, ${y}px, 0)`,
          transition: reduce
            ? `opacity ${duration}s linear`
            : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        }),
      ]}
    >
      {children}
    </View>
  );
}
