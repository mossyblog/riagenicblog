import { Component } from 'react-ecs';

/**
 * Interface for Post data structure (mirroring Supabase table)
 */
export interface IPost {
  id: string; // UUID
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  updated_at: string | null;
  author_id: string | null;
  category_id: string | null;
}

/**
 * Component to store post data
 */
export class PostData extends Component { 
  value!: IPost; 
}

/**
 * Interface for Category data structure
 */
export interface ICategory {
  id: string; // UUID
  name: string;
  slug: string;
}

/**
 * Component to store category data
 */
export class CategoryData extends Component { 
  value!: ICategory; 
}

/**
 * Marker component to indicate an entity needs to be saved to Supabase
 */
export class NeedsSaveToSupabase extends Component {}

/**
 * Marker component to indicate an entity has been modified
 */
export class IsDirty extends Component {}

/**
 * Common PostData type for compatibility with the existing codebase
 * This represents the shape of post data as used in the UI
 */
export type PostDataType = {
  title: string;
  date: string;
  slug: string;
  description: string;
  content: string | null;
  tags: string[];
};