const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iammarvin.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  i18n: {
    locales: ['fr','en'], 
    defaultLocale: 'fr',  // Remettre fr comme langue par défaut
  }
}

module.exports = nextConfig;
