import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassBackground } from '../GlassBackground';
import { ContentColumn } from '../ContentColumn';
import { MeetingProMark } from '../MeetingProMark';
import { useTheme } from '../../contexts/ThemeContext';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { LAYOUT } from '../../constants/layout';
import { useStackScreenBottomInset } from '../../hooks/useScrollInsets';

interface AuthScreenShellProps {
  children: ReactNode;
  footer?: string;
}

export function AuthScreenShell({
  children,
  footer = 'Meeting Pro · Lumiq Industries · Business call minutes',
}: AuthScreenShellProps) {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const bottomInset = useStackScreenBottomInset();
  const insets = useSafeAreaInsets();

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top, SPACING.md) + SPACING.sm,
                paddingBottom: bottomInset,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            <ContentColumn variant="form" style={styles.column}>
              <View style={styles.hero}>
                <MeetingProMark size={76} framed />
                <Text style={[styles.brand, { color: palette.textMuted }]}>Lumiq Industries</Text>
                <Text style={[styles.headline, { color: palette.text }]}>Meeting Pro</Text>
                <Text style={[styles.subtitle, { color: palette.textSecondary }]}>
                  Sign in or create your Lumiq workspace account
                </Text>
              </View>

              <View style={styles.authPanel}>{children}</View>

              <Text style={[styles.footer, { color: palette.textMuted }]}>{footer}</Text>
            </ContentColumn>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, minHeight: 0 },
  flex: { flex: 1, minHeight: 0 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingH,
    flexGrow: 1,
  },
  column: { gap: SPACING.lg },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
    zIndex: 2,
  },
  brand: {
    fontSize: FONT.xs,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: SPACING.md,
  },
  headline: {
    fontSize: FONT.xxl,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT.sm,
    lineHeight: 22,
    marginTop: SPACING.sm,
    textAlign: 'center',
    maxWidth: 340,
  },
  authPanel: {
    width: '100%',
    zIndex: 1,
  },
  footer: {
    fontSize: FONT.xs,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
});
