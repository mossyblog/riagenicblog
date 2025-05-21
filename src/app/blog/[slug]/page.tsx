import { getPostBySlug } from '@/lib/posts';
import { getPostBySlugFromSupabase } from '@/lib/supabase-posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLayout from '@/components/PostLayout';
import { components } from '@/components/MDXComponents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Match Next.js generated PageProps type exactly
interface PageProps {
  params?: Promise<{ slug: string }>;
  searchParams?: Promise<unknown>; // Changed from Promise<any>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Use direct await as params is Promise | undefined; if it exists, it's a Promise.
  const resolvedParams = params ? await params : undefined;
  
  if (!resolvedParams?.slug) {
    return {
      title: 'Post Not Found',
    };
  }
  
  // Try to get post from Supabase first, fall back to filesystem
  let post = null;
  
  try {
    post = await getPostBySlugFromSupabase(resolvedParams.slug);
    if (!post) {
      post = getPostBySlug(resolvedParams.slug);
    }
  } catch (error) {
    console.error('Error fetching post from Supabase, falling back to filesystem:', error);
    post = getPostBySlug(resolvedParams.slug);
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
  // Check if params exists and if it's promise-like in a type-safe way
  if (!params || (typeof (params as { then?: (...args: unknown[]) => unknown }).then === 'function')) {
    notFound();
    return null;
  }
  
  const { slug } = params as { slug: string };
  
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