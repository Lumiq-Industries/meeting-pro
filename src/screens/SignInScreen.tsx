import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { GlassInput } from '../components/GlassInput';
import { ContentColumn } from '../components/ContentColumn';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT, RADIUS, BRAND, SPACING } from '../constants/theme';
import { LAYOUT } from '../constants/layout';
import { webOnlyStyle } from '../utils/webStyles';

export function SignInScreen() {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { height: windowHeight } = useWindowDimensions();
  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    }
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scroll,
              { minHeight: Math.max(windowHeight - 48, 520) },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ContentColumn variant="form" style={styles.column}>
              <View style={styles.hero}>
                <View style={[styles.logoWrap, { backgroundColor: `${BRAND.whatsapp}22` }]}>
                  <Ionicons name="logo-whatsapp" size={36} color={BRAND.whatsapp} />
                </View>
                <Text style={[styles.brand, { color: palette.textMuted }]}>
                  Lumiq Industries
                </Text>
                <Text style={[styles.headline, { color: palette.text }]}>Welcome back</Text>
                <Text style={[styles.subtitle, { color: palette.textSecondary }]}>
                  Sign in to view WhatsApp call transcripts for your business
                </Text>
              </View>

              <GlassCard style={styles.formCard}>
                <GlassInput
                  testID="signin-email"
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="you@company.com"
                  editable={!submitting}
                />

                <GlassInput
                  testID="signin-password"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  showPasswordToggle
                  autoComplete="password"
                  textContentType="password"
                  placeholder="Enter your password"
                  editable={!submitting}
                  onSubmitEditing={handleSubmit}
                />

                {error ? (
                  <Text testID="signin-error" style={[styles.error, { color: palette.error }]}>
                    {error}
                  </Text>
                ) : null}
              </GlassCard>

              <Pressable
                testID="signin-submit"
                style={[
                  styles.ctaWrap,
                  webOnlyStyle({ boxShadow: '0 12px 28px rgba(99,102,241,0.35)' }),
                  { opacity: canSubmit ? 1 : 0.5 },
                ]}
                onPress={handleSubmit}
                disabled={!canSubmit}
              >
                <LinearGradient
                  colors={[BRAND.accentLight, BRAND.accent, '#4F46E5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cta}
                >
                  {submitting ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <>
                      <Text style={styles.ctaText}>Sign in</Text>
                      <Ionicons name="arrow-forward" size={20} color="#FFF" />
                    </>
                  )}
                </LinearGradient>
              </Pressable>

              <Text style={[styles.footer, { color: palette.textMuted }]}>
                Accounts are provisioned by your administrator. Contact Lumiq if you need access.
              </Text>
            </ContentColumn>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: LAYOUT.screenPaddingH,
    paddingVertical: SPACING.xl,
  },
  column: {
    gap: SPACING.lg,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  brand: {
    fontSize: FONT.sm,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: FONT.xxl,
    fontWeight: '700',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT.base,
    lineHeight: 22,
    marginTop: SPACING.sm,
    textAlign: 'center',
    maxWidth: 340,
  },
  formCard: {
    gap: 0,
  },
  error: {
    fontSize: FONT.sm,
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
  ctaWrap: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    minHeight: 52,
  },
  ctaText: { color: '#FFF', fontSize: FONT.lg, fontWeight: '700' },
  footer: {
    fontSize: FONT.xs,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.md,
  },
});
