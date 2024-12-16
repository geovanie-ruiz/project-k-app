module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudflareLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/v8gJdXICPv6MCqZxAubenw/',
      },
    ],
  },
};
