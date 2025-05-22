import React from 'react';
import Link from 'next/link';
import { getAllPostsForAdmin } from '@/lib/supabase-posts';
import { getAllCategories } from '@/lib/categories';
import { getCurrentUser } from '@/lib/auth';

export default async function AdminDashboard() {
  // Get counts
  const posts = await getAllPostsForAdmin();
  const categories = await getAllCategories();
  const user = await getCurrentUser();

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');

  return (
    <div className="space-y-8 p-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.email}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Published Posts
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {publishedPosts.length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/admin/posts"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all posts
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Draft Posts
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {draftPosts.length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/admin/posts/new"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create new post
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Categories
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {categories.length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/admin/categories"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Manage categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-6 flex flex-col sm:flex-row gap-4">
            <Link
              href="/admin/posts/new"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Post
            </Link>
            <Link
              href="/admin/categories/new"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create New Category
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}