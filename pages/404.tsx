import { NextPage } from 'next';
import Link from 'next/link';
import { Translate } from 'i18n';
import { PageTemplate } from 'components/template';

type NotFoundProps = {
  t: Translate;
};
const NotFound: NextPage<NotFoundProps> = ({ t }) => (
  <PageTemplate t={t} title={t(404)}>
    <h1>🤔 404</h1>
    <p>{t(404)}</p>
    <Link href="/">{t('backtohome')}</Link>
  </PageTemplate>
);

export default NotFound;
