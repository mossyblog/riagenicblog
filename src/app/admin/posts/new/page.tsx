export const dynamic = "force-dynamic";
import React from 'react';
import PostForm from '@/components/admin/PostForm';
import { getAllCategories } from '@/lib/categories';

export default async function CreatePostPage() {
  // Get categories for the form
  const categories = await getAllCategories();
  
  return (
    <div className="p-6 space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Post
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new blog post with markdown content
        </p>
      </header>
      
      <PostForm categories={categories} />
    </div>
  );
}