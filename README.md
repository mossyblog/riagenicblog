# DevMarkBlog

A minimal, performant, developer-friendly blog site where each post is authored as a raw `.md` file. Built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- **Markdown Post Ingestion**: Parse and display Markdown files from the `/content/posts/` directory
- **Blog Index Page**: Auto-generated listing of all blog posts, ordered by date
- **Post Page Rendering**: Clean URL routes with MDX support and custom styling
- **SEO & RSS Feed**: Proper meta tags and RSS feed generation
- **Admin Portal**: Secure admin interface for managing blog content
- **Supabase Integration**: Database-backed content management with authentication

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mossyblog/riagenicblog.git
cd riagenicblog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```
# Create a .env.local file with the following variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SITE_URL=http://localhost:3000 # Adjust for production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating New Posts

1. Create a new Markdown file in the `content/posts` directory
2. Add frontmatter at the top of the file:
```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A brief description of your post"
tags: ["tag1", "tag2"]
---
```
3. Write your content in Markdown format below the frontmatter

## Building for Production

```bash
npm run build
```

This will create a production build optimized for server-side rendering.

> **Note**: This application requires a live Supabase backend for all environments. The app is fully dynamic/SSR and does not use static generation.

### Deploying to Vercel

The simplest way to deploy this application is with Vercel:

1. Connect your repository to Vercel
2. Set up the required environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SITE_URL=your_production_url
   ```
3. Deploy!

> **Important**: This application requires server-side rendering and cannot be deployed as a static site. It requires a hosting platform that supports Next.js SSR functionality and a live Supabase backend.

## Code Quality & Error Checking

Before pushing changes or creating a PR, ensure your code passes all quality checks:

```bash
# Run linting checks
npm run lint

# Install pre-commit hooks to automatically check before committing
npm run prepare-hooks
```

The GitHub Actions workflow will also run linting checks before deployment to catch any issues early.

## Project Structure

```
/content
  /posts/          # Markdown posts go here (legacy)

/public            # Static assets
  /rss.xml         # Generated RSS feed

/src
  /app             # Next.js App Router pages
    /admin         # Admin portal pages
    /api           # API routes for admin functionality
    /blog          # Blog-related pages
      /[slug]      # Individual post pages
  /components      # React components
    /admin         # Admin-specific components
  /lib             # Utility functions
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service for database and auth
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [MDX](https://mdxjs.com/) - Markdown with JSX
