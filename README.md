# DevMarkBlog

A minimal, performant, developer-friendly blog site where each post is authored as a raw `.md` file. Built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- **Markdown Post Ingestion**: Parse and display Markdown files from the `/content/posts/` directory
- **Blog Index Page**: Auto-generated listing of all blog posts, ordered by date
- **Post Page Rendering**: Clean URL routes with MDX support and custom styling
- **SEO & RSS Feed**: Proper meta tags and RSS feed generation

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

This will create a static export in the `out` directory, which can be deployed to any static hosting service.

## Project Structure

```
/content
  /posts/          # Markdown posts go here
    hello-world.md
    etc.

/public            # Static assets
  /rss.xml         # Generated RSS feed

/src
  /app             # Next.js App Router pages
    /blog          # Blog-related pages
      /[slug]      # Individual post pages
  /components      # React components
  /lib             # Utility functions
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [MDX](https://mdxjs.com/) - Markdown with JSX
