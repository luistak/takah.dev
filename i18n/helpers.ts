import { localesMessages, Locale, Translate, LocaleKey } from './locales';

export function getTranslate(locale: Locale): Translate {
  return function translate(key: LocaleKey) {
    return localesMessages[locale]?.[key] || '';
  };
}
