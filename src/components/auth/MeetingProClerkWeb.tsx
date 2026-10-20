import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SignIn, SignUp } from '@clerk/clerk-expo/web';
import { useAuth } from '@clerk/clerk-expo';
import { lumiqClerkAppearance } from '../../lib/clerkAppearance';
import { clerkAuthRedirectUrls } from '../../lib/clerkRedirectUrls';
import { webOnlyStyle } from '../../utils/webStyles';
import { FONT, SPACING } from '../../constants/theme';

function useClerkAuthRoute(): 'sign-in' | 'sign-up' {
  const [route, setRoute] = useState<'sign-in' | 'sign-up'>(() => {
    if (typeof window === 'undefined') return 'sign-in';
    return window.location.hash.includes('sign-up') ? 'sign-up' : 'sign-in';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => {
      setRoute(window.location.hash.includes('sign-up') ? 'sign-up' : 'sign-in');
    };
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return route;
}

/**
 * Full Clerk SignIn / SignUp (hash routing). Handles password, email codes, MFA, OAuth.
 */
export function MeetingProClerkWeb() {
  const { isLoaded } = useAuth();
  const route = useClerkAuthRoute();
  const redirects = clerkAuthRedirectUrls();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'meeting-pro-clerk-host-styles';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      .cl-rootBox, .cl-cardBox, .cl-card { width: 100% !important; max-width: 420px !important; }
      .cl-rootBox { position: relative !important; top: auto !important; margin-top: 4px !important; }
      .cl-cardBox { overflow: visible !important; }
      .cl-footerPages, .cl-identityPreviewText, .cl-internal-b3fm6y { display: none !important; }
      .cl-badge[data-localization-key="badge__devMode"],
      .cl-badge[data-localization-key="badge__developmentMode"] { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading Meeting Pro sign-in…</Text>
      </View>
    );
  }

  return (
    <View style={styles.host} testID="clerk-auth-root">
      {route === 'sign-in' ? (
        <SignIn
          appearance={lumiqClerkAppearance}
          routing="hash"
          signUpUrl="/sign-up"
          {...redirects}
        />
      ) : (
        <SignUp
          appearance={lumiqClerkAppearance}
          routing="hash"
          signInUrl="/sign-in"
          {...redirects}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    width: '100%',
    minHeight: 360,
    alignItems: 'center',
    ...webOnlyStyle({
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
    }),
  },
  loading: {
    width: '100%',
    minHeight: 280,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: FONT.sm,
  },
});
