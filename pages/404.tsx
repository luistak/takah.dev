import { NextPage } from 'next';
import Link from 'next/link';
import { useI18n } from 'i18n';
import { PageTemplate } from 'components/template';

const NotFound: NextPage = () => {
  const { t } = useI18n();

  return (
    <PageTemplate t={t} title={t(404)} meta={{ description: t(404) }}>
      <h1>🤔 404</h1>
      <p>{t(404)}</p>
      <Link href="/">{t('backtohome')}</Link>
    </PageTemplate>
  );
};

export default NotFound;
