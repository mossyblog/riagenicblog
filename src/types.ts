// Define the PageProps interface as expected by Next.js
export interface PageProps {
  params: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}