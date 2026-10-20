import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
  PressableProps,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, RADIUS, BRAND } from '../constants/theme';

interface SurfaceProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: PressableProps['onPress'];
  noPadding?: boolean;
  /** Slightly elevated panel for grouped sections */
  elevated?: boolean;
}

/**
 * Corporate content panel — flat, bordered, no blur.
 * Use for lists, metrics, forms. Reserve liquid glass for navigation chrome.
 */
export function Surface({
  children,
  style,
  onPress,
  noPadding = false,
  elevated = false,
}: SurfaceProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const palette = COLORS[effectiveTheme];

  const content = (
    <View
      style={[
        styles.base,
        {
          backgroundColor: isDark
            ? elevated
              ? BRAND.gray900
              : BRAND.gray950
            : palette.background,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        },
        style,
      ]}
    >
      <View style={[!noPadding && styles.padding]}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  padding: {
    padding: 16,
  },
});
