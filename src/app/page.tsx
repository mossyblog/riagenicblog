import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Metadata } from 'next';
import { getAllPostsFromSupabase } from '@/lib/supabase-posts';

export const metadata: Metadata = {
  title: 'DevMarkBlog - A Developer-Friendly Markdown Blog',
  description: 'A minimal, performant, developer-friendly blog site using Next.js, TypeScript, and Markdown files',
};

export default async function Home() {
  // Try to get posts from Supabase first, fall back to filesystem if needed
  let posts = [];
  
  try {
    // Get posts from Supabase
    posts = await getAllPostsFromSupabase();
    
    // If no posts in Supabase yet, fall back to filesystem
    if (posts.length === 0) {
      posts = getAllPosts();
    }
  } catch (error) {
    console.error('Error fetching posts from Supabase, falling back to filesystem:', error);
    posts = getAllPosts();
  }
  
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-6">DevMarkBlog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A minimal, performant, developer-friendly blog site where each post is authored as a raw Markdown file.
        </p>
        <Link
          href="/blog"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Read the Blog
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        
        {recentPosts.length > 0 ? (
          <div className="space-y-8">
            {recentPosts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8">
                  <h3 className="text-2xl font-bold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <time dateTime={post.date} className="text-gray-600 dark:text-gray-400 text-sm">
                    {formattedDate}
                  </time>
                  {post.description && (
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No posts available yet. Check back soon!
          </p>
        )}
        
        {recentPosts.length > 0 && (
          <div className="mt-10">
            <Link
              href="/blog"
              className="text-blue-600 hover:underline"
            >
              View all posts →
            </Link>
          </div>
        )}
      </section>
      
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p>DevMarkBlog - Built with Next.js, TypeScript, and Markdown</p>
      </footer>
    </div>
  );
}
