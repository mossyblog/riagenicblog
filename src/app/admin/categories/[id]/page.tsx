import React from 'react';
import { notFound } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';
import { getCategoryById } from '@/lib/categories';

type EditCategoryPageOwnProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function EditCategoryPage({ params }: EditCategoryPageOwnProps) {
  const category = await getCategoryById(params.id);
  
  if (!category) {
    notFound();
  }
  
  return (
    <div className="p-6 space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Editing: {category.name}
        </p>
      </header>
      
      <CategoryForm category={category} />
    </div>
  );
}