import fs from 'fs';
import path from 'path';
import { getAllPosts } from './posts';

export async function generateRSSFeed() {
  const posts = getAllPosts();
  const siteURL = process.env.SITE_URL || 'https://example.com';
  const date = new Date();
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>DevMarkBlog</title>
  <link>${siteURL}</link>
  <description>A minimal, performant, developer-friendly blog site using Next.js and Markdown</description>
  <language>en</language>
  <lastBuildDate>${date.toUTCString()}</lastBuildDate>
  <atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
  ${posts
    .map((post) => {
      return `
  <item>
    <title>${post.title}</title>
    <link>${siteURL}/blog/${post.slug}</link>
    <guid isPermaLink="true">${siteURL}/blog/${post.slug}</guid>
    <description>${post.description || ''}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>`;
    })
    .join('')}
</channel>
</rss>`;

  // Create the /public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write the RSS feed to a file
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
}