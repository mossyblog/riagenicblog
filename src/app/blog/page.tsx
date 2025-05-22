import React from 'react';
import { getAllPosts } from '@/lib/posts';
import { getAllPostsFromSupabase } from '@/lib/supabase-posts';
import PostList from '@/components/PostList';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | DevMarkBlog',
  description: 'Articles about development, technology, and programming',
};

export default async function BlogPage() {
  // Try to get posts from Supabase first, fall back to filesystem if needed
  let posts = [];
  
  try {
    // Get posts from Supabase
    posts = await getAllPostsFromSupabase();
    
    // If no posts in Supabase yet, fall back to filesystem
    // if (posts.length === 0) { // Fallback logic removed
    //   posts = getAllPosts();
    // }
  } catch (error) {
    console.error('Error fetching posts from Supabase:', error); // Keep error logging
    // posts = getAllPosts(); // Fallback logic removed
    // Ensure posts is an array even if Supabase fetch fails, to prevent render errors
    posts = [];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <div className="mb-2">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Articles about development, technology, and programming
        </p>
      </header>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="py-10 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No posts available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}