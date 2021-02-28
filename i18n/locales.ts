const common = {
  author: 'Luís Takahashi',
} as const;

const portuguese = {
  ...common,
  welcome: 'Olá 👋, eu sou Luís Takahashi',
  authorImageAlt: 'Ilustração do Luís Takahashi em desenho',
  bio:
    'Um entusiasta apaixonado por Typecript e engenheiro de software frontend do Brasil',
  footer: 'Todos os direitos reservados',
  backtohome: 'Ir a página inicial 🏡',
  404: 'Ops esta página não foi encontrada.',
} as const;

const english = {
  ...common,
  welcome: "Hi 👋, I'm Luís Takahashi",
  authorImageAlt: 'Luís Takahashi illustration in drawing',
  bio:
    'A passionate Typescript enthusiast and frontend software engineer from Brazil',
  footer: 'All rights reserved',
  backtohome: 'Go to home page 🏡',
  404: 'Ops this page could not be found.',
} as const;

export enum Locale {
  ptBR = 'pt-BR',
  enUS = 'en-US',
}

export const localesMessages = {
  [Locale.ptBR]: portuguese,
  [Locale.enUS]: english,
} as const;

export const locales: Locale[] = Object.values(Locale);

export type LocalesMessages = typeof localesMessages;

export type LocaleKey = keyof typeof portuguese | keyof typeof english;

export type Translate = (key: LocaleKey) => string;
