import { NextResponse } from 'next/server';
import { getAllPostsFromSupabase } from '@/lib/supabase-posts';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  try {
    // Try to get posts from Supabase first, fall back to filesystem
    let posts = [];
    
    try {
      // Get posts from Supabase
      posts = await getAllPostsFromSupabase();
      
      // If no posts in Supabase yet, fall back to filesystem
      if (posts.length === 0) {
        posts = getAllPosts();
      }
    } catch (error) {
      console.error('Error fetching posts from Supabase for RSS, falling back to filesystem:', error);
      posts = getAllPosts();
    }
    
    const siteURL = process.env.SITE_URL || 'https://example.com';
    const basePath = '';
    const date = new Date();
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>DevMarkBlog</title>
  <link>${siteURL}${basePath}</link>
  <description>A minimal, performant, developer-friendly blog site using Next.js and Markdown</description>
  <language>en</language>
  <lastBuildDate>${date.toUTCString()}</lastBuildDate>
  <atom:link href="${siteURL}${basePath}/api/rss" rel="self" type="application/rss+xml"/>
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
    
    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    
  } catch (error) {
    console.error('Failed to generate RSS feed:', error);
    return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 });
  }
}