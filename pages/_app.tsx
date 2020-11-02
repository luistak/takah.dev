import type { AppProps } from "next/app";

import "../styles/globals.css";
import { getTranslate, Translate } from "../_i18n";

type CustomProps = {
  t: Translate;
};

function MyApp({ Component, pageProps, router }: AppProps<CustomProps>) {
  const { locale } = router;

  return <Component {...pageProps} t={getTranslate(locale)} />;
}

export default MyApp;
