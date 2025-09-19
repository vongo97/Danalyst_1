/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    domains: ['randomuser.me'],
    formats: ['image/webp', 'image/avif']
  },
  compress: true,
  poweredByHeader: false
};

module.exports = nextConfig;