import React from 'react';
import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { getPostById } from '@/lib/supabase-posts';
import { getAllCategories } from '@/lib/categories';
import { PageProps } from '@/types';

export default async function EditPostPage({ params }: PageProps) {
  const [post, categories] = await Promise.all([
    getPostById(params.id),
    getAllCategories()
  ]);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="p-6 space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Post
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Editing: {post.title}
        </p>
      </header>
      
      <PostForm post={post} categories={categories} />
    </div>
  );
}