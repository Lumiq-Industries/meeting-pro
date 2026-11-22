import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT, SPACING } from '../../constants/theme';

/** Always-on investor framing. The live WhatsApp account is still restricted. */
export function TestModeRibbon() {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.badge}>TEST MODE</Text>
      <Text style={styles.copy}>
        Everything here is TEST MODE — a full WhatsApp Business call and workspace for review.
        Production numbers unlock when the account is live.
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.28)',
  },
  badge: {
    color: '#93C5FD',
    fontSize: FONT.xs,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  copy: {
    color: '#E5E7EB',
    fontSize: FONT.sm,
    lineHeight: 20,
    flexShrink: 1,
    flex: 1,
    minWidth: 220,
  },
});
