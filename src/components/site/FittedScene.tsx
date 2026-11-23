import React, { ReactNode, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  /** Width / height. Scene never stretches; SVG is drawn into this box. */
  ratio: number;
  render: (width: number, height: number) => ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
};

/**
 * Fixed-aspect frame. Measures the container, then draws SVG at that size.
 * Never uses width:100% on a bitmap without a locked height.
 */
export function FittedScene({ ratio, render, style, maxWidth }: Props) {
  const [box, setBox] = useState({ w: 320, h: Math.round(320 / ratio) });

  const onLayout = (e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width);
    if (w < 8) return;
    const h = Math.round(w / ratio);
    if (Math.abs(w - box.w) < 2 && Math.abs(h - box.h) < 2) return;
    setBox({ w, h });
  };

  return (
    <View
      onLayout={onLayout}
      style={[styles.frame, { aspectRatio: ratio }, maxWidth ? { maxWidth } : null, style]}
    >
      {render(box.w, box.h)}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
});
