export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          published_at: string | null
          updated_at: string | null
          status: 'draft' | 'published'
          author_id: string | null
          category_id: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          published_at?: string | null
          updated_at?: string | null
          status?: 'draft' | 'published'
          author_id?: string | null
          category_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          published_at?: string | null
          updated_at?: string | null
          status?: 'draft' | 'published'
          author_id?: string | null
          category_id?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}

// Helper Types for accessing database tables
export type Post = Database['public']['Tables']['posts']['Row']
export type Category = Database['public']['Tables']['categories']['Row']