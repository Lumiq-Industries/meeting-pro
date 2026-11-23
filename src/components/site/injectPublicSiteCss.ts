import { Platform } from 'react-native';
import { GLASS, VILATECH_STORY } from '../../constants/glass';
import { currentSitePath, isPublicSitePath } from '../../lib/sitePath';

const STYLE_ID = 'vilatech-public-site';

/**
 * VILATECH public-site craft: story wash grain, liquid glass, display type,
 * focus rings, reduced-motion and reduced-transparency fallbacks.
 */
const PUBLIC_CSS = `
    @keyframes vilatech-story-ambient {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(3%, 2.5%, 0) scale(1.05); }
      100% { transform: translate3d(-2.5%, 4%, 0) scale(1.02); }
    }

    @keyframes vt-fade-up {
      from { opacity: 0.35; transform: translate3d(0, 16px, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }

    :root {
      --vt-display: "Iowan Old Style", Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif;
      --vt-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    }

    html, body, #root {
      background: #000;
      min-height: 100vh;
      max-width: 100%;
    }

    /*
      One window scrollbar on public pages.
      Never set overflow-x:hidden on #root without overflow-y:hidden —
      CSS then computes overflow-y to auto (second bar next to RN ScrollView).
    */
    html.vt-public-scroll {
      height: auto !important;
      min-height: 100vh !important;
      max-height: none !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
    }
    html.vt-public-scroll body,
    html.vt-public-scroll #root {
      display: block !important;
      height: auto !important;
      min-height: 100vh !important;
      max-height: none !important;
      overflow-x: hidden !important;
      overflow-y: hidden !important;
      flex: none !important;
    }
    html.vt-public-scroll #root > div,
    html.vt-public-scroll #root > div > div,
    html.vt-public-scroll .vt-app-root,
    html.vt-public-scroll .vt-site-root,
    html.vt-public-scroll .vt-site-body {
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      flex: none !important;
      overflow-x: hidden !important;
      overflow-y: hidden !important;
    }
    html.vt-public-scroll .vt-site-root {
      overflow-x: clip !important;
      overflow-y: clip !important;
      min-height: 100vh !important;
    }
    /* RN-web ScrollView always emits overflow-y:auto (.r-1rnoaur). Kill it here. */
    html.vt-public-scroll .r-1rnoaur,
    html.vt-public-scroll .r-150rngu {
      overflow: hidden !important;
      overflow-x: hidden !important;
      overflow-y: hidden !important;
      height: auto !important;
      max-height: none !important;
      flex: none !important;
    }
    html.vt-public-scroll .vt-story-wash,
    html.vt-public-scroll .vt-story-grain {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: auto !important;
      height: auto !important;
      pointer-events: none;
    }

    /*
      html is the only scroller. overflow:hidden on #root/body would make
      position:sticky stick to a non-scrolling ancestor — so the bar is fixed
      and a spacer holds the hero clear of it.
    */
    #vt-site-chrome {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 40 !important;
      padding-top: env(safe-area-inset-top, 0px) !important;
      background: linear-gradient(180deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.46) 100%) !important;
      backdrop-filter: blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web}) !important;
      -webkit-backdrop-filter: blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web}) !important;
    }
    #vt-site-chrome-spacer {
      display: block !important;
      height: var(--vt-chrome-h, 118px) !important;
      min-height: var(--vt-chrome-h, 118px) !important;
      flex: none !important;
      pointer-events: none !important;
    }

    /* RN-web Image uses opacity 0 + z-index -1 until a load handler; both can stick.
       Never stretch bitmaps: cover crop inside the box, keep aspect. */
    img {
      opacity: 1 !important;
      z-index: 1 !important;
      object-fit: cover !important;
      object-position: center center !important;
      max-width: 100%;
    }

    svg {
      display: block;
    }

    ::selection {
      background: #fafafa;
      color: #050505;
    }

    .vt-display {
      font-family: var(--vt-display) !important;
      font-synthesis: none;
    }

    .vt-sans {
      font-family: var(--vt-sans) !important;
    }

    .vt-liquid {
      background: ${GLASS.fill.cardDark};
      backdrop-filter: blur(${GLASS.blur.webPx.elevated}px) saturate(${GLASS.saturate.web});
      -webkit-backdrop-filter: blur(${GLASS.blur.webPx.elevated}px) saturate(${GLASS.saturate.web});
      border: 1px solid ${GLASS.border.rim};
      box-shadow: ${GLASS.shadow.card.web};
    }

    .vt-nav-glass {
      background: linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.42) 100%);
      backdrop-filter: blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web});
      -webkit-backdrop-filter: blur(${GLASS.blur.webPx.tabBar}px) saturate(${GLASS.saturate.web});
    }

    .vt-cta:focus-visible,
    a:focus-visible,
    [role="link"]:focus-visible,
    button:focus-visible {
      outline: 2px solid #fafafa;
      outline-offset: 3px;
    }

    .vt-cta {
      cursor: pointer;
    }

    /* CSS breakpoints so phone/tablet never keep a laptop flex row. */
    @media (max-width: 1023px) {
      .vt-split {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .vt-stage-desk {
        position: relative !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
        margin-top: 12px !important;
      }
      .vt-h1 {
        font-size: 40px !important;
        line-height: 46px !important;
        letter-spacing: -1px !important;
      }
      .vt-h2 {
        font-size: 28px !important;
        line-height: 34px !important;
      }
      .vt-statement {
        font-size: 28px !important;
        line-height: 36px !important;
      }
      .vt-who-cards {
        flex-direction: column !important;
      }
    }

    @media (max-width: 599px) {
      .vt-nav {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .vt-nav-links {
        width: 100% !important;
        justify-content: space-between !important;
      }
      .vt-h1 {
        font-size: 30px !important;
        line-height: 36px !important;
        letter-spacing: -0.8px !important;
      }
      .vt-h2 {
        font-size: 24px !important;
        line-height: 30px !important;
      }
      .vt-statement {
        font-size: 22px !important;
        line-height: 28px !important;
      }
      .vt-lede {
        font-size: 16px !important;
        line-height: 24px !important;
      }
      .vt-tile {
        width: 100% !important;
        min-width: 0 !important;
        flex-basis: 100% !important;
      }
      .vt-price-figure {
        font-size: 48px !important;
        line-height: 52px !important;
      }
      .vt-section {
        padding-top: 40px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .vt-story-wash {
        animation: none !important;
        transform: none !important;
      }
      .motion-reduce-transform {
        transform: none !important;
      }
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
      }
    }

    @media (prefers-reduced-transparency: reduce) {
      .vt-liquid,
      .vt-nav-glass,
      #vt-site-chrome {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: #0a0a0a !important;
      }
    }
`;

function setBoxOverflow(
  el: HTMLElement,
  overflowX: string,
  overflowY: string,
  height: string,
): void {
  el.style.setProperty('overflow-x', overflowX, 'important');
  el.style.setProperty('overflow-y', overflowY, 'important');
  el.style.setProperty('height', height, 'important');
}

/** Document is the only scroller on marketing pages. Call before first paint. */
export function lockPublicDocumentScroll(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (!isPublicSitePath(currentSitePath())) return;
  const html = document.documentElement;
  html.classList.add('vt-public-scroll');
  setBoxOverflow(html, 'hidden', 'auto', 'auto');
  html.style.setProperty('min-height', '100vh', 'important');
  if (document.body) {
    document.body.style.margin = '0';
    setBoxOverflow(document.body, 'hidden', 'hidden', 'auto');
    document.body.style.setProperty('min-height', '100vh', 'important');
  }
  const root = document.getElementById('root');
  if (root) {
    root.style.setProperty('display', 'block', 'important');
    root.style.setProperty('flex', 'none', 'important');
    setBoxOverflow(root, 'hidden', 'hidden', 'auto');
    root.style.setProperty('min-height', '100vh', 'important');
  }
}

export function unlockPublicDocumentScroll(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const html = document.documentElement;
  html.classList.remove('vt-public-scroll');
  ['overflow', 'overflow-x', 'overflow-y', 'height', 'min-height', 'display', 'flex'].forEach(
    (prop) => {
      html.style.removeProperty(prop);
      document.body?.style.removeProperty(prop);
      document.getElementById('root')?.style.removeProperty(prop);
    },
  );
}

export function injectPublicSiteCss(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = PUBLIC_CSS;
  lockPublicDocumentScroll();
}

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  injectPublicSiteCss();
}

export const PUBLIC_GRAIN =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

export const PUBLIC_STORY_CSS = VILATECH_STORY.dark.css.replace(/\n/g, ' ');
