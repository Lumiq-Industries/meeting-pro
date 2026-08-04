import React, { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Platform,
  Pressable,
  PressableProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, RADIUS } from '../constants/theme';
import {
  getGlassVariant,
  getBlurIntensity,
  getGlassOpacity,
  getGlassBorderOpacity,
} from '../utils/platform';

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  onPress?: PressableProps['onPress'];
  noPadding?: boolean;
}

export function GlassCard({
  children,
  style,
  intensity,
  onPress,
  noPadding = false,
}: GlassCardProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const palette = COLORS[effectiveTheme];
  const variant = getGlassVariant();
  const blur = intensity ?? getBlurIntensity(variant, isDark);
  const fillOpacity = getGlassOpacity(variant, isDark);
  const borderOpacity = getGlassBorderOpacity(variant);

  const content = (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: `rgba(255,255,255,${borderOpacity})`,
          borderRadius: variant === 'liquid' ? RADIUS.lg : RADIUS.md,
        },
        style,
      ]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={blur}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark ? palette.glassFill : palette.glassFill,
              opacity: fillOpacity,
            },
          ]}
        />
      )}

      {variant === 'liquid' && (
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.35)',
            'rgba(255,255,255,0.05)',
            'rgba(255,255,255,0)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.liquidSheen]}
        />
      )}

      <View style={[styles.content, !noPadding && styles.padding]}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: { elevation: 6 },
    }),
  },
  liquidSheen: {
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  padding: {
    padding: 16,
  },
});
