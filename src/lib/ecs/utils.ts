import { World } from 'react-ecs';
import { PostData, IPost, CategoryData, ICategory, PostDataType } from './components';
import { Post, Category } from '../database.types';

/**
 * Create a new ECS world
 */
export function createEcsWorld(): World {
  return new World();
}

/**
 * Add a post entity to the world
 * @param world The ECS world
 * @param post The post data from Supabase
 * @returns The entity ID
 */
export function addPostEntity(world: World, post: Post) {
  const entity = world.createEntity();
  entity.addComponent(PostData, { value: post as unknown as IPost });
  return entity.id;
}

/**
 * Add a category entity to the world
 * @param world The ECS world
 * @param category The category data from Supabase
 * @returns The entity ID
 */
export function addCategoryEntity(world: World, category: Category) {
  const entity = world.createEntity();
  entity.addComponent(CategoryData, { value: category as unknown as ICategory });
  return entity.id;
}

/**
 * Extract posts from the world
 * @param world The ECS world
 * @returns Array of post data
 */
export function extractPostsFromWorld(world: World): IPost[] {
  const posts: IPost[] = [];
  const query = world.createQuery(PostData);
  
  for (const entity of query.entities) {
    posts.push(entity.get(PostData)!.value);
  }
  
  return posts;
}

/**
 * Extract categories from the world
 * @param world The ECS world
 * @returns Array of category data
 */
export function extractCategoriesFromWorld(world: World): ICategory[] {
  const categories: ICategory[] = [];
  const query = world.createQuery(CategoryData);
  
  for (const entity of query.entities) {
    categories.push(entity.get(CategoryData)!.value);
  }
  
  return categories;
}

/**
 * Convert an IPost to PostDataType for compatibility with existing components
 * @param post The post from the ECS world
 * @returns PostDataType for use with UI components
 */
export function ecsPostToPostData(post: IPost): PostDataType {
  return {
    title: post.title,
    date: post.published_at || post.updated_at || new Date().toISOString(),
    slug: post.slug,
    description: post.excerpt || '',
    content: post.content,
    tags: [], // Tags will be implemented in V2
  };
}