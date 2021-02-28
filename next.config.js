module.exports = {
  i18n: {
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US',
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    imageSizes: [],
    domains: ['takah.dev', 'luis-takahashi.dev'],
    path: '/_next/image',
    loader: 'default',
  },
  webpack: (config, { webpack: { IgnorePlugin } }) => {
    config.plugins.push(new IgnorePlugin(/\/__tests__\//));
    return config;
  },
};
