import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { initializeDatabaseTables } from '@/lib/db-init';

export const metadata: Metadata = {
  title: "DevMarkBlog - A Developer-Friendly Markdown Blog",
  description: "A minimal, performant, developer-friendly blog site using Next.js, TypeScript, and Markdown files",
  authors: [{ name: "Scott" }],
  metadataBase: new URL(process.env.SITE_URL || "https://example.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initializeDatabaseTables();

  return (
    <html lang="en" className="dark:bg-gray-900 dark:text-gray-100">
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/api/rss" />
      </head>
      <body className="antialiased">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="font-bold text-xl">
                  DevMarkBlog
                </Link>
              </div>
              <nav className="flex items-center space-x-6">
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/blog" className="hover:text-blue-600 transition">
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
