import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { FONT } from '../../constants/theme';
import { openSitePath } from '../../lib/sitePath';
import { webOnlyStyle } from '../../utils/webStyles';

type Props = {
  label: string;
  href?: '/app';
  invert?: boolean;
};

/** Primary public-site action — solid fill, glass reserved for nav / stage. */
export function SiteCta({ label, href = '/app', invert = false }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      {...(Platform.OS === 'web' ? { href } : {})}
      onPress={() => openSitePath(href)}
      style={({ pressed }) => [
        styles.base,
        invert ? styles.ghost : styles.solid,
        pressed && styles.pressed,
        webOnlyStyle({ cursor: 'pointer' }),
      ]}
    >
      <Text style={[styles.text, invert ? styles.ghostText : styles.solidText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    minHeight: 48,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solid: {
    backgroundColor: '#FAFAFA',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  text: {
    fontSize: FONT.base,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  solidText: { color: '#0A0A0A' },
  ghostText: { color: '#FAFAFA' },
});
