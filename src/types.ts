// Define the PageProps interface as expected by Next.js
export interface PageProps {
  params: any;
  searchParams?: Record<string, string | string[] | undefined>;
}