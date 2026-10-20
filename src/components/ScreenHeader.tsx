import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, FONT, BRAND } from '../constants/theme';
import { LAYOUT } from '../constants/layout';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  badge?: string;
}

export function ScreenHeader({ title, subtitle, rightAction, badge }: ScreenHeaderProps) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <View style={styles.wrapper}>
      <View style={styles.textBlock}>
        {badge && (
          <View style={[styles.badge, { backgroundColor: `${palette.textMuted}15` }]}>
            <Text style={[styles.badgeText, { color: palette.textSecondary }]}>{badge}</Text>
          </View>
        )}
        <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: palette.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {rightAction && (
        <Pressable
          onPress={rightAction.onPress}
          style={[styles.actionBtn, { backgroundColor: `${rightAction.color ?? palette.textMuted}18` }]}
        >
          <Ionicons
            name={rightAction.icon}
            size={22}
            color={rightAction.color ?? palette.text}
          />
        </Pressable>
      )}
    </View>
  );
}

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export function SectionHeader({ title, actionLabel, onAction, style }: SectionHeaderProps) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];

  return (
    <View style={[styles.sectionRow, style]}>
      <Text style={[styles.sectionTitle, { color: palette.text }]}>{title}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.headerBottom,
    gap: 16,
  },
  textBlock: { flex: 1 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: FONT.xs,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: FONT.xxl,
    fontWeight: '700',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: FONT.sm,
    lineHeight: 20,
    marginTop: 4,
    maxWidth: '95%',
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.itemGap,
    marginTop: LAYOUT.sectionGap,
  },
  sectionTitle: {
    fontSize: FONT.sm,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sectionAction: {
    fontSize: FONT.sm,
    fontWeight: '600',
    color: BRAND.qualityBlue,
  },
});
