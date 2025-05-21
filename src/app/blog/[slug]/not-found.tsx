import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Post Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The blog post you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/blog"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Blog
      </Link>
    </div>
  );
}