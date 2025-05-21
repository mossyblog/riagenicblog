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
  searchParams?: Promise<any>;
}

export function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'getting-started-with-markdown' },
    { slug: 'building-a-blog-with-nextjs-and-markdown' }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await params if it's a Promise
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
  // If params is missing or a Promise, show notFound
  if (!params || typeof (params as any).then === 'function') {
    notFound();
    return null;
  }
  // TypeScript: force cast via unknown to avoid type error
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