import { Platform, ViewStyle } from 'react-native';

/** RN Web-only CSS properties (not in ViewStyle typings). */
export function webOnlyStyle(style: Record<string, string | number>): ViewStyle | undefined {
  if (Platform.OS !== 'web') return undefined;
  return style as ViewStyle;
}

/** RN-web className for CSS media-query layout (overrides inline flex when needed). */
export function webClass(className: string): { className: string } | undefined {
  if (Platform.OS !== 'web') return undefined;
  return { className };
}
