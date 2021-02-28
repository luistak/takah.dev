import { useRouter } from 'next/router';

import { Locale, Translate } from './locales';
import { getTranslate } from './helpers';

type I18n = {
  t: Translate;
  locale: Locale;
};

export function useI18n(): I18n {
  const router = useRouter();

  const locale = router.locale as Locale;

  return {
    locale,
    t: getTranslate(locale),
  };
}
