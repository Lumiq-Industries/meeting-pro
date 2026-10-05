import React, { ReactNode, useEffect } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BRAND } from '../constants/theme';
import { LAYOUT } from '../constants/layout';
import { webOnlyStyle } from '../utils/webStyles';

interface WebAppFrameProps {
  children: ReactNode;
}

/**
 * On desktop web, the product reads as a centered device-style panel — not a
 * stretched full-bleed page. Native apps pass children through unchanged.
 */
export function WebAppFrame({ children }: WebAppFrameProps) {
  const { width, height } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= LAYOUT.desktopBreakpoint;

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.backgroundColor = '#030712';
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100%';
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
    }
  }, []);

  if (!isDesktopWeb) {
    return <View style={styles.nativeRoot}>{children}</View>;
  }

  const frameHeight = Math.min(height - 40, LAYOUT.maxFrameHeight);
  const frameWidth = Math.min(width - 48, LAYOUT.maxFrameWidth);

  return (
    <View style={styles.desktopCanvas}>
      <LinearGradient
        colors={['#030712', '#0A1628', '#0F172A', '#030712']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.canvasOrbA, { opacity: 0.55 }]} />
      <View style={[styles.canvasOrbB, { opacity: 0.45 }]} />

      <View
        style={[
          styles.frame,
          {
            width: frameWidth,
            height: frameHeight,
            maxHeight: frameHeight,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nativeRoot: {
    flex: 1,
  },
  desktopCanvas: {
    flex: 1,
    minHeight: '100vh' as unknown as number,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  canvasOrbA: {
    position: 'absolute',
    top: '8%',
    left: '12%',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: `${BRAND.accent}33`,
    ...webOnlyStyle({ filter: 'blur(80px)' }),
  },
  canvasOrbB: {
    position: 'absolute',
    bottom: '6%',
    right: '10%',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: `${BRAND.whatsapp}28`,
    ...webOnlyStyle({ filter: 'blur(72px)' }),
  },
  frame: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    ...webOnlyStyle({
      boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset',
    }),
    ...(Platform.OS !== 'web'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 24 },
          shadowOpacity: 0.35,
          shadowRadius: 48,
          elevation: 16,
        }
      : null),
  },
});
