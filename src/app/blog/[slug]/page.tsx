import { getPostBySlug } from '@/lib/posts';
import { getPostBySlugFromSupabase } from '@/lib/supabase-posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLayout from '@/components/PostLayout';
import { components } from '@/components/MDXComponents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  if (!slug) {
    return {
      title: 'Post Not Found',
    };
  }
  
  let post = null;
  
  try {
    post = await getPostBySlugFromSupabase(slug);
  } catch (error) {
    console.error('Error fetching post from Supabase:', error);
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let post = null;
  
  try {
    post = await getPostBySlugFromSupabase(slug);
  } catch (error) {
    console.error('Error fetching post from Supabase:', error);
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