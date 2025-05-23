import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'smhfxsesicpuwwivadui.supabase.co',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
