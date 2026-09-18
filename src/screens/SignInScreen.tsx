import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, FONT, RADIUS, BRAND } from '../constants/theme';

// Email and password sign-in. Deliberately minimal: no sign-up, no password
// reset, no magic link. Accounts are created by an admin for now. Built from the
// app's existing components and theme tokens so it sits in the same visual
// language without introducing any new styling.
export function SignInScreen() {
  const { effectiveTheme } = useTheme();
  const palette = COLORS[effectiveTheme];
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    // On success AuthContext swaps this screen out; nothing else to do here.
    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    }
  };

  const inputStyle = [
    styles.input,
    { color: palette.text, borderColor: palette.glassBorder, backgroundColor: palette.glassFill },
  ];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.hero}>
            <View style={[styles.logoWrap, { backgroundColor: `${BRAND.whatsapp}22` }]}>
              <Ionicons name="logo-whatsapp" size={40} color={BRAND.whatsapp} />
            </View>
            <Text style={[styles.brand, { color: palette.textMuted }]}>
              Lumiq Industries · Meeting Pro
            </Text>
            <Text style={[styles.headline, { color: palette.text }]}>Sign in</Text>
          </View>

          <GlassCard style={styles.form}>
            <Text style={[styles.label, { color: palette.textSecondary }]}>Email</Text>
            <TextInput
              testID="signin-email"
              style={inputStyle}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="you@company.com"
              placeholderTextColor={palette.textMuted}
            />

            <Text style={[styles.label, { color: palette.textSecondary }]}>Password</Text>
            <TextInput
              testID="signin-password"
              style={inputStyle}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              placeholder="••••••••"
              placeholderTextColor={palette.textMuted}
              onSubmitEditing={handleSubmit}
            />

            {error && (
              <Text testID="signin-error" style={[styles.error, { color: palette.error }]}>
                {error}
              </Text>
            )}
          </GlassCard>

          <Pressable
            testID="signin-submit"
            style={[styles.cta, { backgroundColor: BRAND.accent, opacity: canSubmit ? 1 : 0.5 }]}
            onPress={handleSubmit}
            disabled={!canSubmit}
          >
            {submitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.ctaText}>Sign in</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </>
            )}
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center', gap: 20 },
  hero: { alignItems: 'center' },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brand: { fontSize: FONT.sm, fontWeight: '600', letterSpacing: 1 },
  headline: { fontSize: FONT.xxl, fontWeight: '700', marginTop: 12 },
  form: { gap: 8 },
  label: { fontSize: FONT.sm, fontWeight: '600', marginTop: 4 },
  input: {
    fontSize: FONT.base,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  error: { fontSize: FONT.sm, marginTop: 6 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
  },
  ctaText: { color: '#FFF', fontSize: FONT.lg, fontWeight: '700' },
});
