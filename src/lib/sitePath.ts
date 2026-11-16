import { Platform } from 'react-native';

export type PublicPath = '/' | '/privacy' | '/terms';
export type SitePath = PublicPath | '/app';

export function parseSitePath(pathname: string): SitePath {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/privacy' || p === '/terms') return p;
  if (p === '/app' || p === '/sign-in' || p === '/sign-up') return '/app';
  return '/';
}

export function currentSitePath(): SitePath {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return '/app';
  return parseSitePath(window.location.pathname);
}

export function isPublicSitePath(path: SitePath): path is PublicPath {
  return path !== '/app';
}

export function openSitePath(path: SitePath) {
  if (typeof window === 'undefined') return;
  window.location.assign(path);
}
