import fs from 'fs';
import path from 'path';
import { parseMarkdownFile, PostData } from './markdown';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

/**
 * Get all posts from the posts directory
 */
export function getAllPosts(): PostData[] {
  // Check if the directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  // Get all markdown files from the directory
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

  // Parse each markdown file
  const posts = markdownFiles.map(fileName => {
    const filePath = path.join(POSTS_DIRECTORY, fileName);
    return parseMarkdownFile(filePath);
  });

  // Validate that all slugs are unique
  const slugs = new Set<string>();
  posts.forEach(post => {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate slug found: ${post.slug}`);
    }
    slugs.add(post.slug);
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a post by its slug
 */
export function getPostBySlug(slug: string): PostData | null {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}