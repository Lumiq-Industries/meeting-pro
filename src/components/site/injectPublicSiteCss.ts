import { Platform } from 'react-native';
import { GLASS, VILATECH_STORY } from '../../constants/glass';

const STYLE_ID = 'vilatech-public-site';

/**
 * VILATECH public-site craft: story wash grain, liquid glass, display type,
 * focus rings, reduced-motion and reduced-transparency fallbacks.
 */
export function injectPublicSiteCss(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;

  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = `
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
      min-height: 100%;
      overflow-x: hidden;
      max-width: 100%;
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
      max-width: 100%;
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
      .vt-nav-glass {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: #0a0a0a !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

export const PUBLIC_GRAIN =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

export const PUBLIC_STORY_CSS = VILATECH_STORY.dark.css.replace(/\n/g, ' ');
