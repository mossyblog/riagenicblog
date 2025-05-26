import { createClient } from './auth';
import { Post as SupabasePost } from './database.types';
import { 
  PostDataType,
  IPost,
  PostData
} from './ecs';

/**
 * Convert a Supabase post to a PostData object for compatibility with existing components
 * This is a temporary function until we fully implement the ECS pattern
 */
export function supabasePostToPostData(post: SupabasePost): PostDataType {
  return {
    title: post.title,
    date: post.published_at || post.updated_at || new Date().toISOString(),
    slug: post.slug,
    description: post.excerpt || '',
    content: post.content,
    tags: [], // Tags will be implemented in V2
  };
}

/**
 * Get all published posts from Supabase
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function getAllPostsFromSupabase(): Promise<PostDataType[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
    
  if (error || !data) {
    console.error('Error fetching posts from Supabase:', error);
    return [];
  }
  
  return data.map(supabasePostToPostData);
}

/**
 * Get a post by its slug from Supabase
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function getPostBySlugFromSupabase(slug: string): Promise<PostDataType | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
    
  if (error || !data) {
    console.error(`Error fetching post with slug "${slug}" from Supabase:`, error);
    return null;
  }
  
  return supabasePostToPostData(data);
}

/**
 * Admin: Get all posts (including drafts) from Supabase
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function getAllPostsForAdmin(): Promise<SupabasePost[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('updated_at', { ascending: false });
    
  if (error || !data) {
    console.error('Error fetching posts for admin:', error);
    return [];
  }
  
  return data;
}

/**
 * Admin: Get a post by ID for editing
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function getPostById(id: string): Promise<SupabasePost | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error(`Error fetching post with ID "${id}":`, error);
    return null;
  }
  
  return data;
}

/**
 * Admin: Create a new post
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function createPost(post: Omit<SupabasePost, 'id'>): Promise<SupabasePost | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...post, updated_at: new Date().toISOString() }])
    .select()
    .single();
    
  if (error || !data) {
    console.error('Error creating post:', error);
    return null;
  }
  
  return data;
}

/**
 * Admin: Update an existing post
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function updatePost(id: string, post: Partial<SupabasePost>): Promise<SupabasePost | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  if (error || !data) {
    console.error(`Error updating post with ID "${id}":`, error);
    return null;
  }
  
  return data;
}

/**
 * Admin: Delete a post
 * TODO: Fully implement ECS pattern once server-side compatibility issues are resolved
 */
export async function deletePost(id: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting post with ID "${id}":`, error);
    return false;
  }
  
  return true;
}