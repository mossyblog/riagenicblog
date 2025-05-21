import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect all admin routes
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                DevMarkBlog Admin
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/posts"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Posts
              </Link>
              <Link
                href="/admin/categories"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Categories
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Blog
              </Link>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                >
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 min-h-screen shadow">
        {children}
      </main>
    </div>
  );
}