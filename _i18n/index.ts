const portuguese = {
  welcome: "Bem vindo ao meu blog",
};

const english = {
  welcome: "Welcome to my blog",
};

const locales = {
  "pt-BR": portuguese,
  "en-US": english,
};

type Locales = typeof locales;
type Locale = keyof Locales | string;
type LocaleKey = keyof typeof portuguese | keyof typeof english;
export type Translate = (key: LocaleKey) => string;

export function getTranslate(locale: Locale): Translate {
  return function translate(key: LocaleKey) {
    return locales[locale]?.[key] || "";
  };
}
