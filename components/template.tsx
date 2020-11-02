import Head from 'next/head';
import { Translate } from 'i18n';
import { ReactNode } from 'react';
import { GlobalStyles } from 'styles/globals';
import styled, { ThemeProvider } from 'styled-components';
import { tokens } from 'styles/theme';
import { FlexColumnCentered } from 'styles/extends';
import { Languages } from './languages';

const Page = styled.section`
  padding: 2rem;
  min-height: 100vh;
  ${FlexColumnCentered}
`;

const Main = styled.main`
  text-align: center;
  ${FlexColumnCentered}
`;

const Footer = styled.footer`
  margin: 2rem auto;
  font-size: 0.75rem;
`;

type PageTemplateProps = {
  t: Translate;
  title: string;
  children: ReactNode;
};

export function PageTemplate({ t, title, children }: PageTemplateProps) {
  return (
    <ThemeProvider theme={tokens}>
      <Page>
        <GlobalStyles />
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Languages />
        <Main>{children}</Main>
        <Footer>
          <a href="/"> {t('author')} ©.</a> {t('footer')}
        </Footer>
      </Page>
    </ThemeProvider>
  );
}
