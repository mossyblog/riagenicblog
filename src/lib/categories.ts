import { createClient } from './auth';
import { Category } from './database.types';

/**
 * Get all categories from Supabase
 */
export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error || !data) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data;
}

/**
 * Get a category by ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error(`Error fetching category with ID "${id}":`, error);
    return null;
  }
  
  return data;
}

/**
 * Create a new category
 */
export async function createCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
    
  if (error || !data) {
    console.error('Error creating category:', error);
    return null;
  }
  
  return data;
}

/**
 * Update an existing category
 */
export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();
    
  if (error || !data) {
    console.error(`Error updating category with ID "${id}":`, error);
    return null;
  }
  
  return data;
}

/**
 * Delete a category
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