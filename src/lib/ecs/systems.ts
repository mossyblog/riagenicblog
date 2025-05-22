import { System, World } from 'react-ecs';
import { SupabaseClient } from '@supabase/supabase-js';
import { PostData, IPost, CategoryData, ICategory, NeedsSaveToSupabase } from './components';

/**
 * System to process post data
 * This can be extended to add additional functionality like validation, etc.
 */
export class PostProcessingSystem extends System {
  update() {
    const query = this.world.createQuery(PostData);
    
    for (const entity of query.entities) {
      const postData = entity.get(PostData)!;
      
      // Here we can add any processing logic for posts
      // For example, enriching the post data, validating it, etc.
    }
  }
}

/**
 * System to persist entities to Supabase
 */
export class SupabasePersistenceSystem extends System {
  private supabase: SupabaseClient;
  
  constructor(world: World, supabase: SupabaseClient) {
    super(world);
    this.supabase = supabase;
  }
  
  async persistPosts() {
    const query = this.world.createQuery(NeedsSaveToSupabase, PostData);
    
    for (const entity of query.entities) {
      const postData = entity.get(PostData)!.value;
      
      if (!postData.id) {
        // Create new post
        const { data, error } = await this.supabase
          .from('posts')
          .insert([{ ...postData, updated_at: new Date().toISOString() }])
          .select()
          .single();
          
        if (data && !error) {
          entity.get(PostData)!.value = data;
          entity.remove(NeedsSaveToSupabase);
        }
      } else {
        // Update existing post
        const { data, error } = await this.supabase
          .from('posts')
          .update({ ...postData, updated_at: new Date().toISOString() })
          .eq('id', postData.id)
          .select()
          .single();
          
        if (data && !error) {
          entity.get(PostData)!.value = data;
          entity.remove(NeedsSaveToSupabase);
        }
      }
    }
  }
  
  async persistCategories() {
    const query = this.world.createQuery(NeedsSaveToSupabase, CategoryData);
    
    for (const entity of query.entities) {
      const categoryData = entity.get(CategoryData)!.value;
      
      if (!categoryData.id) {
        // Create new category
        const { data, error } = await this.supabase
          .from('categories')
          .insert([categoryData])
          .select()
          .single();
          
        if (data && !error) {
          entity.get(CategoryData)!.value = data;
          entity.remove(NeedsSaveToSupabase);
        }
      } else {
        // Update existing category
        const { data, error } = await this.supabase
          .from('categories')
          .update(categoryData)
          .eq('id', categoryData.id)
          .select()
          .single();
          
        if (data && !error) {
          entity.get(CategoryData)!.value = data;
          entity.remove(NeedsSaveToSupabase);
        }
      }
    }
  }
  
  update() {
    // This method is required by the System class but we'll use the async methods above
    // for actual persistence operations
  }
}