import { createClient } from './auth';
import { Post as SupabasePost } from './database.types';
import { 
  PostDataType, 
  createEcsWorld, 
  addPostEntity, 
  extractPostsFromWorld, 
  ecsPostToPostData,
  PostData,
  IPost,
  NeedsSaveToSupabase,
  SupabasePersistenceSystem
} from './ecs';

/**
 * Get all published posts from Supabase using ECS
 */
export async function getAllPostsFromSupabase(): Promise<PostDataType[]> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
    
  if (error || !data) {
    console.error('Error fetching posts from Supabase:', error);
    return [];
  }
  
  // Add each post to the ECS world
  for (const post of data) {
    addPostEntity(world, post);
  }
  
  // Extract posts from the world
  const posts = extractPostsFromWorld(world);
  
  // Convert to PostDataType for client components
  return posts.map(ecsPostToPostData);
}

/**
 * Get a post by its slug from Supabase using ECS
 */
export async function getPostBySlugFromSupabase(slug: string): Promise<PostDataType | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
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
  
  // Add post to the ECS world
  addPostEntity(world, data);
  
  // Extract post from the world
  const posts = extractPostsFromWorld(world);
  
  if (posts.length === 0) {
    return null;
  }
  
  // Convert to PostDataType for client components
  return ecsPostToPostData(posts[0]);
}

/**
 * Admin: Get all posts (including drafts) from Supabase using ECS
 */
export async function getAllPostsForAdmin(): Promise<SupabasePost[]> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('updated_at', { ascending: false });
    
  if (error || !data) {
    console.error('Error fetching posts for admin:', error);
    return [];
  }
  
  // Add all posts to the ECS world
  for (const post of data) {
    addPostEntity(world, post);
  }
  
  // Extract posts from the world
  return extractPostsFromWorld(world) as unknown as SupabasePost[];
}

/**
 * Admin: Get a post by ID for editing using ECS
 */
export async function getPostById(id: string): Promise<SupabasePost | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error(`Error fetching post with ID "${id}":`, error);
    return null;
  }
  
  // Add post to the ECS world
  addPostEntity(world, data);
  
  // Extract post from the world
  const posts = extractPostsFromWorld(world);
  
  if (posts.length === 0) {
    return null;
  }
  
  return posts[0] as unknown as SupabasePost;
}

/**
 * Admin: Create a new post using ECS
 */
export async function createPost(post: Omit<SupabasePost, 'id'>): Promise<SupabasePost | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  // Create entity in the ECS world
  const entity = world.createEntity();
  const postWithTimestamp = { ...post, updated_at: new Date().toISOString() };
  entity.addComponent(PostData, { value: postWithTimestamp as unknown as IPost });
  entity.addComponent(NeedsSaveToSupabase);
  
  // Use our persistence system
  const persistenceSystem = new SupabasePersistenceSystem(world, supabase);
  await persistenceSystem.persistPosts();
  
  // Extract the created post
  const posts = extractPostsFromWorld(world);
  
  if (posts.length === 0) {
    return null;
  }
  
  return posts[0] as unknown as SupabasePost;
}

/**
 * Admin: Update an existing post using ECS
 */
export async function updatePost(id: string, post: Partial<SupabasePost>): Promise<SupabasePost | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  // First get the existing post
  const { data: existingPost, error: fetchError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (fetchError || !existingPost) {
    console.error(`Error fetching post with ID "${id}" for update:`, fetchError);
    return null;
  }
  
  // Create entity with updated post data
  const entity = world.createEntity();
  const updatedPost = { 
    ...existingPost, 
    ...post, 
    updated_at: new Date().toISOString() 
  };
  entity.addComponent(PostData, { value: updatedPost as unknown as IPost });
  entity.addComponent(NeedsSaveToSupabase);
  
  // Use our persistence system
  const persistenceSystem = new SupabasePersistenceSystem(world, supabase);
  await persistenceSystem.persistPosts();
  
  // Extract the updated post
  const posts = extractPostsFromWorld(world);
  
  if (posts.length === 0) {
    return null;
  }
  
  return posts[0] as unknown as SupabasePost;
}

/**
 * Admin: Delete a post using ECS (minimal ECS usage as deletion is straightforward)
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