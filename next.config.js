const { withPayload } = require('@payloadcms/next/withPayload');
module.exports = withPayload({
  images: {
    loader: 'custom',
    loaderFile: './src/utils/loaders/cloudflareLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/v8gJdXICPv6MCqZxAubenw/',
      },
    ],
  },
});
