import { getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLayout from '@/components/PostLayout';
import { components } from '@/components/MDXComponents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'error';
export const dynamicParams = false;

// Match Next.js generated PageProps type exactly
interface PageProps {
  params?: Promise<{ slug: string }>;
  searchParams?: Promise<unknown>; // Changed from Promise<any>
}

export function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'getting-started-with-markdown' },
    { slug: 'building-a-blog-with-nextjs-and-markdown' }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Use direct await as params is Promise | undefined; if it exists, it's a Promise.
  const resolvedParams = params ? await params : undefined;
  const post = getPostBySlug(resolvedParams?.slug);
  
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

export default function BlogPostPage({ params }: PageProps) {
  // Check if params exists and if it's promise-like in a type-safe way
  if (!params || (typeof (params as { then?: (...args: unknown[]) => unknown }).then === 'function')) {
    notFound();
    return null;
  }
  // If params exists and is not a promise, cast it to use its properties
  const post = getPostBySlug((params as unknown as { slug: string }).slug);
  
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