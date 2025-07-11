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
    optimizePackageImports: ['shiki']
  },

  productionBrowserSourceMaps: true,

  eslint: {
    ignoreDuringBuilds: !!process.env.CI
  },

  images: {
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
      }
    ]
  },

  async headers() {
    return NextConfigHeaders
  }
};

export default withContentCollections(withBundleAnalyzer(config))


