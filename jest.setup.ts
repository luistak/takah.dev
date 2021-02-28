import '@testing-library/jest-dom';

import * as NextJsConfig from './next.config';

process.env = {
  ...process.env,
  __NEXT_I18N_SUPPORT: 'true',
  __NEXT_IMAGE_OPTS: (NextJsConfig.images as unknown) as string,
};
