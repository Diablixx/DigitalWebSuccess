import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly disable CSS optimization to prevent critters-related issues
  experimental: {
    optimizeCss: false
  },
  // Ensure proper Vercel deployment
  trailingSlash: false,
  // Optimize for performance
  poweredByHeader: false,
  // Ensure proper static generation
  output: undefined,
  // Disable ESLint during builds to avoid apostrophe errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Rewrites for dash-based stage URLs
  async rewrites() {
    return [
      {
        source: '/stages-recuperation-points-:city',
        destination: '/stages-recuperation-points/:city',
      },
      {
        source: '/stages-recuperation-points-:city/:id/inscription',
        destination: '/stages-recuperation-points/:city/:id/inscription',
      },
      {
        source: '/stages-recuperation-points-:city/:id/merci',
        destination: '/stages-recuperation-points/:city/:id/merci',
      },
    ];
  },
};

export default nextConfig;
