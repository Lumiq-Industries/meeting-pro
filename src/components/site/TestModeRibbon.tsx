import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT, SPACING } from '../../constants/theme';

/** Always-on investor framing. The live WhatsApp account is still restricted. */
export function TestModeRibbon() {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.badge}>TEST MODE</Text>
      <Text style={styles.copy}>
        This site and workspace are TEST MODE. Sign in to review Meeting Pro with sample data.
        Production WhatsApp numbers unlock when the account is live.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  badge: {
    color: '#FAFAFA',
    fontSize: FONT.xs,
    fontWeight: '700',
    letterSpacing: 2.2,
  },
  copy: {
    color: 'rgba(245,245,245,0.72)',
    fontSize: FONT.sm,
    lineHeight: 20,
    flexShrink: 1,
    flex: 1,
    minWidth: 0,
  },
});
