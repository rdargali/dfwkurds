import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
// @ts-expect-error - next-pwa types may not be fully compatible with Next.js 16
import withPWA from 'next-pwa'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Image optimization configuration for Sanity
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  // Strict mode for better development experience
  reactStrictMode: true,
  // Static export mode for GitHub Pages
  output: 'export',
}

// Configure PWA
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'sanity-images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
      },
    },
  ],
})

export default withNextIntl(pwaConfig(nextConfig))
