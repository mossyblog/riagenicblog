import type { NextConfig } from "next";

// Next.js configuration
const nextConfig: NextConfig = {
  // Skip TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure image domains if needed
  images: {
    unoptimized: true, // For static export
  },
  // For GitHub Pages deployment, uncomment these:
  // output: 'export',
  // trailingSlash: true,
  // basePath: '/riagenicblog',
};

export default nextConfig;
