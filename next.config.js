/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure image domains if needed
  images: {
  },
  // For GitHub Pages deployment, uncomment these:
  // output: 'export',
  // trailingSlash: true,
  // basePath: '/riagenicblog',
  
  // Fix for lightningcss module resolution issues
  serverExternalPackages: ['@uiw/react-md-editor', '@uiw/react-markdown-preview'],
  
  // Add webpack configuration to handle CSS from @uiw/react-md-editor
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;