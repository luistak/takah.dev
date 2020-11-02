import { Locale } from 'i18n';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';

import * as gtag from 'lib/gtag';

const Container = styled.div`
  top: 0;
  right: 1rem;
  display: flex;
  position: fixed;

  p {
    font-size: 0.75rem;
    text-transform: uppercase;
    padding: 0.5rem;
    border-radius: 0.25rem;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
  }

  * + * {
    margin-left: 0.5rem;
  }
`;

export function Languages() {
  const { locales, push, pathname } = useRouter();

  const handleLocaleClick = (locale: Locale) => () => {
    gtag.event({
      action: 'i18n_click',
      category: 'Locale',
      label: locale,
    });
    push(pathname, pathname, { locale });
  };

  return (
    <Container>
      {locales.map((locale: Locale) => (
        <p key={locale} onClick={handleLocaleClick(locale)}>
          {locale.split('-')[0]}
        </p>
      ))}
    </Container>
  );
}
