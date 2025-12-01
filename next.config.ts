import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  transpilePackages: ['@heroui/react'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  cacheComponents: true
};

export default nextConfig;
