import type { AppProps } from 'next/app';
import { getTranslate, Translate } from 'i18n';

type CustomProps = {
  t: Translate;
};

function MyApp({ Component, pageProps, router }: AppProps<CustomProps>) {
  const { locale } = router;

  return <Component {...pageProps} t={getTranslate(locale)} />;
}

export default MyApp;
