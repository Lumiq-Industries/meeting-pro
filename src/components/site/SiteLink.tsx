import React, { ReactNode } from 'react';
import { Platform, Pressable, StyleProp, Text, TextStyle } from 'react-native';
import type { SitePath } from '../../lib/sitePath';

type Props = {
  href: SitePath;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

/** Real <a href> on web so crawlers, ads, and Meta App Review can follow the URL. */
export function SiteLink({ href, children, style }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      {...(Platform.OS === 'web' ? { href } : {})}
    >
      <Text style={style}>{children}</Text>
    </Pressable>
  );
}
