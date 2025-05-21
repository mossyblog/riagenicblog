import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Function to generate the RSS feed during build
function generateRSSFeed() {
  try {
    // Import required modules
    // Note: This is a simplified version without depending on other files
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const publicDirectory = path.join(process.cwd(), 'public');
    
    // Create public directory if it doesn't exist
    if (!fs.existsSync(publicDirectory)) {
      fs.mkdirSync(publicDirectory);
    }
    
    // Simple function to extract metadata from markdown files
    const getAllPosts = () => {
      if (!fs.existsSync(postsDirectory)) return [];
      
      const fileNames = fs.readdirSync(postsDirectory);
      const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
      
      const posts = markdownFiles.map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Extract frontmatter (simplified)
        const frontmatterRegex = /---\n([\s\S]*?)\n---/;
        const match = fileContents.match(frontmatterRegex);
        const frontmatter = match ? match[1] : '';
        
        // Define interface for post metadata
        interface PostMetadata {
          title?: string;
          date?: string;
          slug?: string;
          description?: string;
          [key: string]: string | undefined;
        }
        
        // Parse frontmatter
        const frontmatterLines = frontmatter.split('\n');
        const metadata: PostMetadata = {};
        
        frontmatterLines.forEach(line => {
          const parts = line.split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            // Join the rest in case there are colons in the value
            const value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
            metadata[key] = value;
          }
        });
        
        // Use filename as slug if not specified
        const slug = metadata.slug || fileName.replace(/\.md$/, '');
        
        return {
          title: metadata.title || slug,
          date: metadata.date || new Date().toISOString(),
          slug,
          description: metadata.description || '',
        };
      });
      
      // Sort by date (newest first)
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    
    const posts = getAllPosts();
    const siteURL = process.env.SITE_URL || 'https://example.com';
    const basePath = '/riagenicblog'; // Add base path for GitHub Pages
    const date = new Date();
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>DevMarkBlog</title>
  <link>${siteURL}${basePath}</link>
  <description>A minimal, performant, developer-friendly blog site using Next.js and Markdown</description>
  <language>en</language>
  <lastBuildDate>${date.toUTCString()}</lastBuildDate>
  <atom:link href="${siteURL}${basePath}/rss.xml" rel="self" type="application/rss+xml"/>
  ${posts
    .map((post) => {
      return `
  <item>
    <title>${post.title}</title>
    <link>${siteURL}${basePath}/blog/${post.slug}</link>
    <guid isPermaLink="true">${siteURL}${basePath}/blog/${post.slug}</guid>
    <description>${post.description || ''}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>`;
    })
    .join('')}
</channel>
</rss>`;
    
    // Write the RSS feed to a file
    fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), rss);
    console.log('RSS feed generated successfully');
    
  } catch (error) {
    console.error('Failed to generate RSS feed:', error);
  }
}

// Try to generate the RSS feed at build time
try {
  generateRSSFeed();
} catch (error) {
  console.error('Error generating RSS feed:', error);
}

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
