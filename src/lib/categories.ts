import { createClient } from './auth';
import { Category } from './database.types';
import { 
  createEcsWorld, 
  addCategoryEntity, 
  extractCategoriesFromWorld,
  CategoryData,
  ICategory,
  NeedsSaveToSupabase,
  SupabasePersistenceSystem
} from './ecs';

/**
 * Get all categories from Supabase using ECS
 */
export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error || !data) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  // Add all categories to the ECS world
  for (const category of data) {
    addCategoryEntity(world, category);
  }
  
  // Extract categories from the world
  return extractCategoriesFromWorld(world) as unknown as Category[];
}

/**
 * Get a category by ID using ECS
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error(`Error fetching category with ID "${id}":`, error);
    return null;
  }
  
  // Add category to the ECS world
  addCategoryEntity(world, data);
  
  // Extract category from the world
  const categories = extractCategoriesFromWorld(world);
  
  if (categories.length === 0) {
    return null;
  }
  
  return categories[0] as unknown as Category;
}

/**
 * Create a new category using ECS
 */
export async function createCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  // Create entity in the ECS world
  const entity = world.createEntity();
  entity.addComponent(CategoryData, { value: category as unknown as ICategory });
  entity.addComponent(NeedsSaveToSupabase);
  
  // Use our persistence system
  const persistenceSystem = new SupabasePersistenceSystem(world, supabase);
  await persistenceSystem.persistCategories();
  
  // Extract the created category
  const categories = extractCategoriesFromWorld(world);
  
  if (categories.length === 0) {
    return null;
  }
  
  return categories[0] as unknown as Category;
}

/**
 * Update an existing category using ECS
 */
export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  const supabase = createClient();
  const world = createEcsWorld();
  
  // First get the existing category
  const { data: existingCategory, error: fetchError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
    
  if (fetchError || !existingCategory) {
    console.error(`Error fetching category with ID "${id}" for update:`, fetchError);
    return null;
  }
  
  // Create entity with updated category data
  const entity = world.createEntity();
  const updatedCategory = { ...existingCategory, ...category };
  entity.addComponent(CategoryData, { value: updatedCategory as unknown as ICategory });
  entity.addComponent(NeedsSaveToSupabase);
  
  // Use our persistence system
  const persistenceSystem = new SupabasePersistenceSystem(world, supabase);
  await persistenceSystem.persistCategories();
  
  // Extract the updated category
  const categories = extractCategoriesFromWorld(world);
  
  if (categories.length === 0) {
    return null;
  }
  
  return categories[0] as unknown as Category;
}

/**
 * Delete a category using ECS (minimal ECS usage as deletion is straightforward)
 */
export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting category with ID "${id}":`, error);
    return false;
  }
  
  return true;
}