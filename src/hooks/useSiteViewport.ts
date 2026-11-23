import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

/**
 * Public-site breakpoints. RN-web Dimensions can lag or report a desktop
 * width inside a scaled view — prefer window / visualViewport on web.
 */
export function useSiteViewport() {
  const { width: rnWidth } = useWindowDimensions();
  const [inner, setInner] = useState(rnWidth);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const read = () => {
      const vis = window.visualViewport?.width;
      const next = vis && vis > 0 ? vis : window.innerWidth;
      setInner(next);
    };
    read();
    window.addEventListener('resize', read);
    window.visualViewport?.addEventListener('resize', read);
    return () => {
      window.removeEventListener('resize', read);
      window.visualViewport?.removeEventListener('resize', read);
    };
  }, []);

  const width = Platform.OS === 'web' ? inner || rnWidth : rnWidth;
  const phone = width < 600;
  const tablet = width >= 600 && width < 1024;
  const desktop = width >= 1024;
  return { width, phone, tablet, desktop, compact: !desktop };
}
