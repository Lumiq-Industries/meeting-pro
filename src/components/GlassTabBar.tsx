import React from 'react';
import { View, Pressable, StyleSheet, Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, RADIUS, FONT, BRAND } from '../constants/theme';
import { getGlassVariant, getBlurIntensity } from '../utils/platform';

const TAB_CONFIG: Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; label: string }
> = {
  Home: { icon: 'home', label: 'Home' },
  Live: { icon: 'radio', label: 'Live' },
  Archive: { icon: 'archive', label: 'Archive' },
  Settings: { icon: 'settings', label: 'Settings' },
};

export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const palette = COLORS[effectiveTheme];
  const variant = getGlassVariant();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View
        style={[
          styles.barOuter,
          {
            borderRadius: variant === 'liquid' ? RADIUS.xl : RADIUS.lg,
            borderColor: palette.glassBorder,
          },
        ]}
      >
        {Platform.OS === 'ios' && (
          <BlurView
            intensity={getBlurIntensity(variant, isDark)}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark ? palette.glassFill : palette.glassFill,
              opacity: Platform.OS === 'android' ? 0.92 : 1,
            },
          ]}
        />

        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const config = TAB_CONFIG[route.name] ?? TAB_CONFIG.Home;

            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={styles.tab}
              >
                <View
                  style={[
                    styles.iconWrap,
                    focused && {
                      backgroundColor: `${BRAND.accent}22`,
                    },
                  ]}
                >
                  <Ionicons
                    name={focused ? config.icon : (`${config.icon}-outline` as keyof typeof Ionicons.glyphMap)}
                    size={22}
                    color={focused ? BRAND.accent : palette.textMuted}
                  />
                  {route.name === 'Live' && (
                    <View style={styles.liveIndicator} />
                  )}
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: focused ? BRAND.accent : palette.textMuted },
                  ]}
                >
                  {config.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  barOuter: {
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 12 },
    }),
  },
  tabsRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveIndicator: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  label: {
    fontSize: FONT.xs,
    fontWeight: '600',
  },
});
