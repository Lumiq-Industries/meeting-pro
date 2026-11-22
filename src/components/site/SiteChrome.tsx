import React, { ReactNode, useEffect } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeetingProMark } from '../MeetingProMark';
import { SiteLink } from './SiteLink';
import { SiteCta } from './SiteCta';
import { COLORS, FONT, SPACING, BRAND } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { GLASS } from '../../constants/glass';
import { webOnlyStyle } from '../../utils/webStyles';
import { useAuth } from '../../contexts/AuthContext';
import { openSitePath } from '../../lib/sitePath';
import { TestModeRibbon } from './TestModeRibbon';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { injectPublicSiteCss, PUBLIC_GRAIN, PUBLIC_STORY_CSS } from './injectPublicSiteCss';

const palette = COLORS.dark;

type Props = {
  children: ReactNode;
  active: 'home' | 'privacy' | 'terms';
};

export function SiteChrome({ children, active }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 720;
  const { isSignedIn } = useAuth();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    injectPublicSiteCss();
  }, []);

  const navCta = isSignedIn ? 'Open test workspace' : 'Sign in · TEST MODE';

  return (
    <View style={styles.root}>
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.wash,
          webOnlyStyle({
            background: PUBLIC_STORY_CSS,
            animation: reduceMotion ? 'none' : 'vilatech-story-ambient 36s ease-in-out infinite alternate',
            willChange: reduceMotion ? 'auto' : 'transform',
          }),
        ]}
      />
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.grain,
          webOnlyStyle({
            opacity: 0.028,
            backgroundImage: PUBLIC_GRAIN,
          }),
        ]}
      />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <TestModeRibbon />
        <View
          style={[
            styles.nav,
            compact && styles.navCompact,
            webOnlyStyle({
              background:
                'linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.42) 100%)',
              backdropFilter: `blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web})`,
              WebkitBackdropFilter: `blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web})`,
            }),
          ]}
        >
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${COMPANY.name} ${PRODUCT.name} home`}
            {...(Platform.OS === 'web' ? { href: '/' } : {})}
            onPress={() => openSitePath('/')}
            style={styles.brand}
          >
            <MeetingProMark size={compact ? 32 : 36} framed />
            <View>
              <Text
                style={[
                  styles.brandName,
                  webOnlyStyle({
                    fontFamily:
                      '"Iowan Old Style", Palatino, "Palatino Linotype", Georgia, serif',
                  }),
                ]}
              >
                {COMPANY.name}
              </Text>
              <Text style={styles.brandSub}>{PRODUCT.name}</Text>
            </View>
          </Pressable>
          <View
            accessibilityRole="navigation"
            accessibilityLabel="Site"
            style={[styles.navLinks, compact && styles.navLinksWrap]}
          >
            <SiteLink href="/" style={[styles.link, active === 'home' && styles.linkOn]}>
              Product
            </SiteLink>
            <SiteLink href="/privacy" style={[styles.link, active === 'privacy' && styles.linkOn]}>
              Privacy
            </SiteLink>
            <SiteLink href="/terms" style={[styles.link, active === 'terms' && styles.linkOn]}>
              Terms
            </SiteLink>
            {compact ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={navCta}
                {...(Platform.OS === 'web' ? { href: '/app' } : {})}
                onPress={() => openSitePath('/app')}
                style={styles.navCtaCompact}
              >
                <Text style={styles.navCtaCompactText}>{isSignedIn ? 'Workspace' : 'Sign in'}</Text>
              </Pressable>
            ) : (
              <SiteCta label={navCta} />
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator
        >
          <View
            accessibilityRole="summary"
            nativeID="main-content"
            style={[styles.column, { maxWidth: compact ? 640 : 1120 }]}
          >
            {children}
          </View>
          <View style={[styles.footer, { maxWidth: compact ? 640 : 1120 }]}>
            <Text
              style={[
                styles.footLockup,
                webOnlyStyle({
                  fontFamily:
                    '"Iowan Old Style", Palatino, "Palatino Linotype", Georgia, serif',
                }),
              ]}
            >
              {COMPANY.name}
            </Text>
            <Text style={styles.footText}>
              {LEGAL.entity} · {PRODUCT.name}
            </Text>
            <View style={styles.footRow}>
              <SiteLink href="/privacy" style={styles.footLink}>
                Privacy Policy
              </SiteLink>
              <Text style={styles.footDot}>·</Text>
              <SiteLink href="/terms" style={styles.footLink}>
                Terms of Use
              </SiteLink>
              <Text style={styles.footDot}>·</Text>
              <Text style={styles.footText}>{LEGAL.contactEmail}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BRAND.black, minHeight: '100%' as unknown as number },
  wash: {
    position: 'absolute',
    top: '-12%',
    left: '-12%',
    right: '-12%',
    bottom: '-12%',
  },
  grain: { ...StyleSheet.absoluteFill },
  safe: { flex: 1, zIndex: 1 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: SPACING.md,
  },
  navCompact: { flexWrap: 'wrap' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 44 },
  brandName: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1.4,
  },
  brandSub: {
    color: palette.textMuted,
    fontSize: FONT.xs,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 2,
  },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  navLinksWrap: { flexWrap: 'wrap', gap: 14 },
  link: {
    color: palette.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    minHeight: 44,
    paddingVertical: 12,
  },
  linkOn: { color: palette.text },
  navCtaCompact: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 999,
  },
  navCtaCompactText: { color: '#0A0A0A', fontSize: FONT.sm, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { paddingBottom: 80, alignItems: 'center' },
  column: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    paddingTop: 28,
    gap: 0,
  },
  footer: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    paddingTop: 72,
    paddingBottom: 32,
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
    marginTop: 48,
  },
  footLockup: {
    color: palette.text,
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '500',
  },
  footRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  footText: { color: palette.textMuted, fontSize: FONT.sm, lineHeight: 20 },
  footLink: { color: palette.textSecondary, fontSize: FONT.sm, fontWeight: '600', minHeight: 44, paddingVertical: 12 },
  footDot: { color: palette.textMuted, fontSize: FONT.sm },
});
