'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/database.types';
import slugify from '@/lib/utils/slugify';
import { ensureErrorWithMessage } from '@/lib/error-types';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostFormProps {
  post?: Post;
  categories: Category[];
}

export default function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  // Set up form state
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [categoryId, setCategoryId] = useState<string | undefined>(post?.category_id || undefined);
  
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Generate slug from title
  useEffect(() => {
    if (title && !isSlugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManuallyEdited]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setMessage(null);

    try {
      const postData = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        status,
        category_id: categoryId || null,
        published_at: status === 'published' ? post?.published_at || new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      const endpoint = isEditing
        ? `/api/posts/update?id=${post.id}`
        : '/api/posts/create';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save post');
      }

      setMessage(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      
      // Redirect to posts list after a brief delay
      setTimeout(() => {
        router.push('/admin/posts');
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      const error = ensureErrorWithMessage(err);
      setError(error.message || 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
          <p className="text-green-800 dark:text-green-200">{message}</p>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => {
            setIsSlugManuallyEdited(true);
            setSlug(e.target.value);
          }}
          placeholder="post-url-slug"
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          URL-friendly version of the title. Will be automatically generated if left blank.
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt || ''}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Brief summary of the post"
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value || undefined)}
          className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <MDEditor 
          value={content} 
          onChange={(val) => setContent(val || '')} 
          height={400}
          preview='edit'
          className="w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              id="draft"
              type="radio"
              value="draft"
              checked={status === 'draft'}
              onChange={() => setStatus('draft')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="draft" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Draft
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="published"
              type="radio"
              value="published"
              checked={status === 'published'}
              onChange={() => setStatus('published')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="published" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Published
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {isSaving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}