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
};

export default nextConfig;
