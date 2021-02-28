import { ReactElement } from 'react';
import { createRouter, Router } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import PageLoader from 'next/dist/client/page-loader';

import { locales, Locale, getTranslate, Translate } from 'i18n';

import {
  render,
  RenderOptions,
  RenderResult,
  Queries,
} from '@testing-library/react';

import App from 'pages/_app';

type CreateRouterWrapperOptions = {
  as?: string;
  query?: Record<string, any>;
  locale?: Locale;
};

export function createRouterWrapper(
  pathname: string,
  { locale = Locale.ptBR }: CreateRouterWrapperOptions = {}
) {
  const router = createRouter(pathname, {}, '', {
    Component: jest.fn(),
    subscription: jest.fn(),
    initialProps: {},
    pageLoader: new PageLoader('test-build-id', 'assetPrefix', pathname),
    initialStyleSheets: [{ href: pathname, text: '' }],
    App: App,
    wrapApp: jest.fn(() => App),
    isFallback: false,
    locale,
    locales: locales,
    defaultLocale: locale,
  });

  const RouterWrapper = ({ children }) => (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );

  RouterWrapper.router = router;

  return RouterWrapper;
}

type RouteOptions = {
  locale?: Locale;
  pathname?: string;
};

type WithRouteProps<Q extends Queries> = (
  | Omit<RenderOptions, 'queries'>
  | RenderOptions<Q>
) & {
  routeOptions?: RouteOptions;
};

type WithRouteResult<Q extends Queries> = (RenderResult | RenderResult<Q>) & {
  t: Translate;
  router: Router;
};

export function renderWithRoute<Q extends Queries>(
  ui: ReactElement,
  options?: WithRouteProps<Q>
): WithRouteResult<Q> {
  const { routeOptions = {}, ...renderOptions } = options || {};
  const { pathname = '/', locale = Locale.ptBR } = routeOptions;

  const RouterWrapper = createRouterWrapper(pathname, { locale });

  const wrapUi = (wrappedUi: ReactElement): ReactElement => (
    <RouterWrapper>{wrappedUi}</RouterWrapper>
  );

  const renderResult = render(wrapUi(ui), renderOptions);

  return {
    ...renderResult,
    t: getTranslate(locale),
    router: RouterWrapper.router,
    rerender: (rerenderedUi): void =>
      renderResult.rerender(wrapUi(rerenderedUi)),
  };
}
