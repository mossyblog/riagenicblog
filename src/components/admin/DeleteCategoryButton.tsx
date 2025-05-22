'use client';

import React from 'react';

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string; // For the confirmation message
}

export default function DeleteCategoryButton({ categoryId, categoryName }: DeleteCategoryButtonProps) {
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
      event.preventDefault();
    }
  };

  return (
    <form action={`/api/categories/delete?id=${categoryId}`} method="POST" style={{ display: 'inline' }}>
      <button
        type="submit"
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
        onClick={handleSubmit}
      >
        Delete
      </button>
    </form>
  );
} 