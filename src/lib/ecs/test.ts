/**
 * This file is a simple test module for the ECS implementation.
 * It can be run manually to verify that the ECS world works correctly.
 */
import { World } from 'react-ecs';
import { PostData, IPost, CategoryData, NeedsSaveToSupabase } from './components';

/**
 * Simple test function to create a world, add entities, and query them
 */
export function testEcsWorld() {
  console.log('Testing ECS World');
  
  // Create a new world
  const world = new World();
  
  // Create a post entity
  const postEntity = world.createEntity();
  const postData: IPost = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    content: 'This is a test post',
    excerpt: 'Test excerpt',
    status: 'published',
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: null,
    category_id: null
  };
  postEntity.addComponent(PostData, { value: postData });
  postEntity.addComponent(NeedsSaveToSupabase);
  
  // Create a category entity
  const categoryEntity = world.createEntity();
  categoryEntity.addComponent(CategoryData, {
    value: {
      id: '1',
      name: 'Test Category',
      slug: 'test-category'
    }
  });
  
  // Query for entities with PostData
  const postQuery = world.createQuery(PostData);
  console.log('Number of posts:', postQuery.entities.length);
  for (const entity of postQuery.entities) {
    const post = entity.get(PostData)!.value;
    console.log('Found post:', post.title);
  }
  
  // Query for entities with CategoryData
  const categoryQuery = world.createQuery(CategoryData);
  console.log('Number of categories:', categoryQuery.entities.length);
  for (const entity of categoryQuery.entities) {
    const category = entity.get(CategoryData)!.value;
    console.log('Found category:', category.name);
  }
  
  // Query for entities that need to be saved to Supabase
  const saveQuery = world.createQuery(NeedsSaveToSupabase);
  console.log('Number of entities to save:', saveQuery.entities.length);
  
  console.log('ECS World testing completed');
}

// To run the test: 
// testEcsWorld();