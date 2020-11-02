import type { AppProps } from 'next/app';
import { getTranslate, Translate } from 'i18n';

import '../styles/globals.css';

type CustomProps = {
  t: Translate;
};

function MyApp({ Component, pageProps, router }: AppProps<CustomProps>) {
  const { locale } = router;

  return <Component {...pageProps} t={getTranslate(locale)} />;
}

export default MyApp;
