import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostFrontmatter {
  title: string;
  date: string;
  slug?: string;
  description?: string;
  tags?: string[];
}

export interface PostData extends PostFrontmatter {
  slug: string;
  content: string;
}

/**
 * Parse a markdown file and return its frontmatter and content
 */
export function parseMarkdownFile(filePath: string): PostData {
  // Read the file
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse the frontmatter
  const { data, content } = matter(fileContents);
  
  // Extract the filename without extension
  const filename = path.basename(filePath, path.extname(filePath));
  
  // Create the post data
  const postData: PostData = {
    title: data.title || filename,
    date: data.date || new Date().toISOString(),
    slug: data.slug || filename,
    description: data.description || '',
    tags: data.tags || [],
    content,
  };
  
  return postData;
}