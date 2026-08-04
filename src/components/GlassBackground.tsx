import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../constants/theme';

interface GlassBackgroundProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function GlassBackground({ children, style }: GlassBackgroundProps) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={[...palette.backgroundGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.dark.background,
  },
  orbTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
  },
  orbBottom: {
    position: 'absolute',
    bottom: 120,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(37, 211, 102, 0.12)',
  },
});
