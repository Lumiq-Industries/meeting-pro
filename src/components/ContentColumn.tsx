import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { LAYOUT } from '../constants/layout';

interface ContentColumnProps {
  children: ReactNode;
  /** Narrower column for auth and settings-style forms */
  variant?: 'page' | 'form';
  style?: StyleProp<ViewStyle>;
}

/** Centers content and caps width on web / large phones — VILATECH convention. */
export function ContentColumn({ children, variant = 'page', style }: ContentColumnProps) {
  const maxWidth = variant === 'form' ? LAYOUT.maxFormWidth : LAYOUT.maxContentWidth;

  return (
    <View style={[{ width: '100%', maxWidth, alignSelf: 'center' }, style]}>
      {children}
    </View>
  );
}
