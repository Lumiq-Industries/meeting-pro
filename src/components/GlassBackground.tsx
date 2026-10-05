import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, BRAND } from '../constants/theme';
import { webOnlyStyle } from '../utils/webStyles';

interface GlassBackgroundProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function GlowOrb({
  colors,
  style,
}: {
  colors: readonly [string, string, ...string[]];
  style: ViewStyle;
}) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 0.9, y: 0.9 }}
      style={[styles.orb, style]}
    />
  );
}

export function GlassBackground({ children, style }: GlassBackgroundProps) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const isDark = effectiveTheme === 'dark';

  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={[...palette.backgroundGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GlowOrb
        colors={
          isDark
            ? (['rgba(99,102,241,0.55)', 'rgba(99,102,241,0.08)', 'rgba(99,102,241,0)'] as const)
            : (['rgba(129,140,248,0.45)', 'rgba(129,140,248,0.12)', 'rgba(255,255,255,0)'] as const)
        }
        style={styles.orbPrimary}
      />
      <GlowOrb
        colors={
          isDark
            ? (['rgba(37,211,102,0.35)', 'rgba(37,211,102,0.06)', 'rgba(37,211,102,0)'] as const)
            : (['rgba(37,211,102,0.28)', 'rgba(37,211,102,0.08)', 'rgba(255,255,255,0)'] as const)
        }
        style={styles.orbSecondary}
      />
      <GlowOrb
        colors={
          isDark
            ? (['rgba(212,175,55,0.12)', 'rgba(212,175,55,0)', 'rgba(212,175,55,0)'] as const)
            : (['rgba(212,175,55,0.15)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'] as const)
        }
        style={styles.orbAccent}
      />

      <LinearGradient
        colors={
          isDark
            ? ['rgba(10,22,40,0)', 'rgba(10,22,40,0.35)', 'rgba(5,10,20,0.65)']
            : ['rgba(255,255,255,0)', 'rgba(238,242,255,0.2)', 'rgba(224,231,255,0.45)']
        }
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <LinearGradient
        colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.4 }}
        style={styles.topSheen}
        pointerEvents="none"
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BRAND.navy,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orbPrimary: {
    top: -120,
    right: -100,
    width: 340,
    height: 340,
    ...webOnlyStyle({ filter: 'blur(48px)' }),
  },
  orbSecondary: {
    bottom: 80,
    left: -120,
    width: 300,
    height: 300,
    ...webOnlyStyle({ filter: 'blur(40px)' }),
  },
  orbAccent: {
    top: '38%',
    right: -40,
    width: 180,
    height: 180,
    ...webOnlyStyle({ filter: 'blur(32px)' }),
  },
  topSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
});
