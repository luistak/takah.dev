import type { AppProps } from 'next/app';
import { getTranslate, Translate } from 'i18n';
import { useEffect } from 'react';
import * as gtag from 'lib/gtag';

type CustomProps = {
  t: Translate;
};
function MyApp({ Component, pageProps, router }: AppProps<CustomProps>) {
  const { locale } = router;
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} t={getTranslate(locale)} />;
}

export default MyApp;
