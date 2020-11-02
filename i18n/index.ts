const common = {
  author: 'Luís Takahashi',
};

const portuguese = {
  ...common,
  welcome: 'Olá 👋, eu sou Luis Takahashi',
  bio:
    'Um entusiasta apaixonado por Typecript e engenheiro de software frontend do Brasil',
  footer: 'Todos os direitos reservados',
  backtohome: 'Ir a página inicial 🏡',
  404: 'Ops esta página não foi encontrada.',
};

const english = {
  ...common,
  welcome: "Hi 👋, I'm Luis Takahashi",
  bio:
    'A passionate Typescript enthusiast and frontend software engineer from Brazil',
  footer: 'All rights reserved',
  backtohome: 'Go to home page 🏡',
  404: 'Ops this page could not be found.',
};

const locales = {
  'pt-BR': portuguese,
  'en-US': english,
};

type Locales = typeof locales;
export type Locale = keyof Locales;
type LocaleKey = keyof typeof portuguese | keyof typeof english;
export type Translate = (key: LocaleKey) => string;

export function getTranslate(locale: Locale): Translate {
  return function translate(key: LocaleKey) {
    return locales[locale]?.[key] || '';
  };
}
