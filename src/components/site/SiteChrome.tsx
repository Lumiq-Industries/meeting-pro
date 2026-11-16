import React, { ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeetingProMark } from '../MeetingProMark';
import { SiteLink } from './SiteLink';
import { COLORS, FONT, SPACING, BRAND } from '../../constants/theme';
import { COMPANY, PRODUCT } from '../../constants/brand';
import { LEGAL } from '../../constants/legal';
import { VILATECH_STORY } from '../../constants/glass';
import { webOnlyStyle } from '../../utils/webStyles';
import { useAuth } from '../../contexts/AuthContext';
import { openSitePath } from '../../lib/sitePath';

const palette = COLORS.dark;

type Props = {
  children: ReactNode;
  active: 'home' | 'privacy' | 'terms';
};

export function SiteChrome({ children, active }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 720;
  const { isSignedIn } = useAuth();

  return (
    <View style={styles.root}>
      <View
        pointerEvents="none"
        style={[
          styles.wash,
          webOnlyStyle({ background: VILATECH_STORY.dark.css.replace(/\n/g, ' ') }),
        ]}
      />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={[styles.nav, compact && styles.navCompact]}>
            <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${PRODUCT.name} home`}
            {...(Platform.OS === 'web' ? { href: '/' } : {})}
            onPress={() => openSitePath('/')}
            style={styles.brand}
          >
            <MeetingProMark size={36} framed />
            <View>
              <Text style={styles.brandName}>{PRODUCT.name}</Text>
              <Text style={styles.brandSub}>{COMPANY.name}</Text>
            </View>
          </Pressable>
          <View style={[styles.navLinks, compact && styles.navLinksWrap]}>
            <SiteLink href="/" style={[styles.link, active === 'home' && styles.linkOn]}>
              Product
            </SiteLink>
            <SiteLink
              href="/privacy"
              style={[styles.link, active === 'privacy' && styles.linkOn]}
            >
              Privacy
            </SiteLink>
            <SiteLink href="/terms" style={[styles.link, active === 'terms' && styles.linkOn]}>
              Terms
            </SiteLink>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={isSignedIn ? 'Open workspace' : 'Sign in'}
              {...(Platform.OS === 'web' ? { href: '/app' } : {})}
              onPress={() => openSitePath('/app')}
              style={styles.navCta}
            >
              <Text style={styles.navCtaText}>{isSignedIn ? 'Open workspace' : 'Sign in'}</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator
        >
          <View style={[styles.column, { maxWidth: compact ? 640 : 980 }]}>{children}</View>
          <View style={styles.footer}>
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
  wash: { ...StyleSheet.absoluteFill },
  safe: { flex: 1 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: SPACING.md,
  },
  navCompact: { flexWrap: 'wrap' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  brandName: { color: palette.text, fontSize: FONT.base, fontWeight: '800' },
  brandSub: { color: palette.textMuted, fontSize: FONT.xs, letterSpacing: 1.1 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  navLinksWrap: { flexWrap: 'wrap' },
  link: { color: palette.textSecondary, fontSize: FONT.sm, fontWeight: '600' },
  linkOn: { color: palette.text },
  navCta: {
    backgroundColor: BRAND.qualityBlue,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    minHeight: 36,
    justifyContent: 'center',
  },
  navCtaText: { color: '#FFF', fontSize: FONT.sm, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollInner: { paddingBottom: SPACING.xxl, alignItems: 'center' },
  column: { width: '100%', paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, gap: SPACING.xl },
  footer: {
    width: '100%',
    maxWidth: 980,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    gap: SPACING.sm,
  },
  footRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  footText: { color: palette.textMuted, fontSize: FONT.xs },
  footLink: { color: palette.textSecondary, fontSize: FONT.xs, fontWeight: '600' },
  footDot: { color: palette.textMuted, fontSize: FONT.xs },
});
