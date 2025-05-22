// Next.js configuration
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
    unoptimized: true, // For static export
  },
  // For GitHub Pages deployment, uncomment these:
  // output: 'export',
  // trailingSlash: true,
  // basePath: '/riagenicblog',
  
  // Add specific configuration for webpack to handle CSS from @uiw/react-md-editor
  webpack: (config) => {
    // Filter out specific CSS files from the default CSS processing
    const oneOfRule = config.module.rules.find(
      (rule) => typeof rule.oneOf === 'object'
    );

    if (oneOfRule) {
      const cssModuleRules = oneOfRule.oneOf.filter(
        (rule) => rule.test && rule.test.toString().includes('.module.css')
      );

      if (cssModuleRules.length > 0) {
        for (const rule of cssModuleRules) {
          rule.exclude = [
            /node_modules\/@uiw\/react-md-editor/,
            /node_modules\/@uiw\/react-markdown-preview/,
            ...(rule.exclude || [])
          ];
        }
      }
    }
    
    return config;
  },
};

export default nextConfig;