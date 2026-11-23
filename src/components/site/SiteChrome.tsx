import React, { ReactNode, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MeetingProMark } from '../MeetingProMark';
import { SiteLink } from './SiteLink';
import { SiteCta } from './SiteCta';
import { COLORS, FONT, SPACING, BRAND } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { GLASS } from '../../constants/glass';
import { webClass, webOnlyStyle } from '../../utils/webStyles';
import { useSiteViewport } from '../../hooks/useSiteViewport';
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
  const { phone, tablet, compact } = useSiteViewport();
  const { isSignedIn } = useAuth();
  const reduceMotion = useReducedMotion();
  const padH = phone ? 16 : tablet ? 28 : 32;
  const colMax = phone ? 640 : tablet ? 720 : 1120;

  useEffect(() => {
    injectPublicSiteCss();
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    document.documentElement.classList.add('vt-public-scroll');
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    document.body.style.margin = '0';
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';

    const root = document.getElementById('root');
    if (root) {
      root.style.height = 'auto';
      root.style.minHeight = '100%';
      root.style.overflow = 'visible';
      root.style.display = 'block';
    }

    return () => {
      document.documentElement.classList.remove('vt-public-scroll');
    };
  }, []);

  const navCta = isSignedIn ? 'Open test workspace' : 'Sign in · TEST MODE';

  return (
    <View {...webClass('vt-site-root')} style={[styles.root, webOnlyStyle({ height: 'auto' })]}>
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...webClass('vt-story-wash')}
        style={[
          styles.wash,
          webOnlyStyle({
            position: 'fixed',
            inset: '0',
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
        {...webClass('vt-story-grain')}
        style={[
          styles.grain,
          webOnlyStyle({
            position: 'fixed',
            inset: '0',
            opacity: 0.028,
            backgroundImage: PUBLIC_GRAIN,
          }),
        ]}
      />
      <View
        {...webClass('vt-site-body')}
        style={[
          styles.safe,
          webOnlyStyle({
            height: 'auto',
            flex: 'none',
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }),
        ]}
      >
        <View
          style={[
            styles.stickyChrome,
            webOnlyStyle({ position: 'sticky', top: 0, zIndex: 30 }),
          ]}
        >
        <TestModeRibbon />
        <View
          {...webClass('vt-nav')}
          style={[
            styles.nav,
            { paddingHorizontal: padH },
            phone && styles.navPhone,
            tablet && styles.navTablet,
            webOnlyStyle({
              background:
                'linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.42) 100%)',
              backdropFilter: `blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web})`,
              WebkitBackdropFilter: `blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web})`,
            }),
          ]}
        >
          <View style={[styles.navTop, phone && styles.navTopPhone]}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={`${COMPANY.name} ${PRODUCT.name} home`}
              {...(Platform.OS === 'web' ? { href: '/' } : {})}
              onPress={() => openSitePath('/')}
              style={styles.brand}
            >
              <MeetingProMark size={phone ? 30 : 36} framed />
              <View>
                <Text
                  style={[
                    styles.brandName,
                    phone && styles.brandNamePhone,
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
            {phone ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={navCta}
                {...(Platform.OS === 'web' ? { href: '/app' } : {})}
                onPress={() => openSitePath('/app')}
                style={styles.navCtaCompact}
              >
                <Text style={styles.navCtaCompactText}>{isSignedIn ? 'Workspace' : 'Sign in'}</Text>
              </Pressable>
            ) : null}
          </View>
          <View
            accessibilityRole="navigation"
            accessibilityLabel="Site"
            {...webClass('vt-nav-links')}
            style={[styles.navLinks, phone && styles.navLinksPhone]}
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
            {!phone && compact ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={navCta}
                {...(Platform.OS === 'web' ? { href: '/app' } : {})}
                onPress={() => openSitePath('/app')}
                style={styles.navCtaCompact}
              >
                <Text style={styles.navCtaCompactText}>{isSignedIn ? 'Workspace' : 'Sign in'}</Text>
              </Pressable>
            ) : null}
            {!compact ? <SiteCta label={navCta} /> : null}
          </View>
        </View>
        </View>

        <View style={[styles.page, styles.scrollInner]}>
          <View
            accessibilityRole="summary"
            nativeID="main-content"
            style={[styles.column, { maxWidth: colMax, paddingHorizontal: padH }]}
          >
            {children}
          </View>
          <View style={[styles.footer, { maxWidth: colMax, paddingHorizontal: padH }]}>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: BRAND.black,
    minHeight: '100vh' as unknown as number,
    position: 'relative',
    overflow: 'hidden',
  },
  wash: {
    ...StyleSheet.absoluteFill,
  },
  grain: { ...StyleSheet.absoluteFill },
  safe: { zIndex: 1, flexGrow: 0, flexShrink: 0 },
  stickyChrome: { backgroundColor: BRAND.black },
  page: { width: '100%', overflow: 'visible', flexGrow: 0 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: SPACING.md,
  },
  navPhone: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 4,
  },
  navTablet: { flexWrap: 'wrap' },
  navTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  navTopPhone: { justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 44, flexShrink: 1 },
  brandName: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1.4,
  },
  brandNamePhone: { fontSize: 16, letterSpacing: 1 },
  brandSub: {
    color: palette.textMuted,
    fontSize: FONT.xs,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 2,
  },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 22, flexShrink: 1 },
  navLinksPhone: { justifyContent: 'space-between', gap: 8, width: '100%' },
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
  scrollInner: { paddingBottom: 80, alignItems: 'center' },
  column: {
    width: '100%',
    paddingTop: 20,
    gap: 0,
  },
  footer: {
    width: '100%',
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
