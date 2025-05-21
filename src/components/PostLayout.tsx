import React from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';

interface PostLayoutProps {
  post: PostData;
  children: React.ReactNode;
}

export default function PostLayout({ post, children }: PostLayoutProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="mb-2">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>{formattedDate}</time>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            {post.description}
          </p>
        )}
      </header>
      
      <div className="prose dark:prose-invert prose-lg max-w-none">
        {children}
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </footer>
    </article>
  );
}