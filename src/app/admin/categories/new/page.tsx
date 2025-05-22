import React from 'react';
import CategoryForm from '@/components/admin/CategoryForm';

export const dynamic = 'force-dynamic';

export default function CreateCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new category for your blog posts
        </p>
      </header>
      
      <CategoryForm />
    </div>
  );
}