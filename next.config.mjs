import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default withPayload(nextConfig);
