import React from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-10">
      {posts.map((post) => {
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return (
          <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-10">
            <div className="space-y-2 mb-4">
              <h2 className="text-2xl font-bold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <time dateTime={post.date} className="text-gray-600 dark:text-gray-400 text-sm">
                {formattedDate}
              </time>
            </div>
            
            {post.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.description}
              </p>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
            
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}