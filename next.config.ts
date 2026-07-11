import type { NextConfig } from "next";

import "./packages/env";

import { withContentCollections } from '@content-collections/next'
import bundleAnalyzer from '@next/bundle-analyzer';
import { NextConfigHeaders } from '@/packages/shared'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})


const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['shiki', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-popover', 'motion', 'cobe']
  },

  productionBrowserSourceMaps: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },

  async headers() {
    return NextConfigHeaders
  }
};

export default withContentCollections(withBundleAnalyzer(config))


