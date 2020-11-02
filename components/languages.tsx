import { Locale } from 'i18n';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';

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
  const { locales, push } = useRouter();

  const handleLocaleClick = (locale: Locale) => () => {
    push('/', '/', { locale });
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
