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
  meta?: Record<string, string>;
};

const metaTags = {
  author: 'Luís Takahashi',
  url:
    'https://res.cloudinary.com/daiqkausy/image/upload/c_scale,w_200/v1604365911/me.jpg',
  image_url:
    'https://res.cloudinary.com/daiqkausy/image/upload/c_scale,w_200/v1604365911/me.jpg',
};

export function PageTemplate({ t, title, meta, children }: PageTemplateProps) {
  return (
    <ThemeProvider theme={tokens}>
      <Page>
        <GlobalStyles />
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.png" />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />

          <meta property="og:type" content="blog" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={metaTags.url} />
          <meta property="og:image" content={metaTags.image_url} />
          <meta property="og:site_name" content={metaTags.author} />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:image" content={metaTags.image_url} />
          <meta name="twitter:site" content={metaTags.author} />
          <meta name="twitter:creator" content={metaTags.author} />
          {meta?.description ? (
            <>
              <meta name="twitter:description" content={meta?.description} />
              <meta property="og:description" content={meta?.description} />
            </>
          ) : null}

          {meta
            ? Object.entries(meta).map(([name, content]) => (
                <meta key={name} name={name} content={content} />
              ))
            : null}
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
