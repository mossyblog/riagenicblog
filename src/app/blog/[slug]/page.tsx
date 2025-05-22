import { getPostBySlug } from '@/lib/posts';
import { getPostBySlugFromSupabase } from '@/lib/supabase-posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLayout from '@/components/PostLayout';
import { components } from '@/components/MDXComponents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageProps } from '@/types';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  if (!slug) {
    return {
      title: 'Post Not Found',
    };
  }
  
  // Try to get post from Supabase first, fall back to filesystem
  let post = null;
  
  try {
    post = await getPostBySlugFromSupabase(slug);
    if (!post) {
      post = getPostBySlug(slug);
    }
  } catch (error) {
    console.error('Error fetching post from Supabase, falling back to filesystem:', error);
    post = getPostBySlug(slug);
  }
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | DevMarkBlog`,
    description: post.description || `Read ${post.title} on DevMarkBlog`,
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} on DevMarkBlog`,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  
  // Try to get post from Supabase first, fall back to filesystem
  let post = null;
  
  try {
    post = await getPostBySlugFromSupabase(slug);
    if (!post) {
      post = getPostBySlug(slug);
    }
  } catch (error) {
    console.error('Error fetching post from Supabase, falling back to filesystem:', error);
    post = getPostBySlug(slug);
  }
  
  if (!post) {
    notFound();
    return null;
  }
  
  return (
    <PostLayout post={post}>
      <MDXRemote source={post.content} components={components} />
    </PostLayout>
  );
}