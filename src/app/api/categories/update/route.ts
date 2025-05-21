import { NextRequest, NextResponse } from 'next/server';
import { getCategoryById, updateCategory } from '@/lib/categories';
import { requireAuth } from '@/lib/auth';
import { ensureErrorWithMessage } from '@/lib/error-types';

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
    }
    
    // Check if category exists
    const existingCategory = await getCategoryById(id);
    if (!existingCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    
    const categoryData = await request.json();
    
    // Validation
    if (!categoryData.name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }
    
    if (!categoryData.slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    
    // Update the category
    const category = await updateCategory(id, categoryData);
    
    if (!category) {
      return NextResponse.json({ message: 'Failed to update category' }, { status: 500 });
    }
    
    return NextResponse.json({ category, message: 'Category updated successfully' });
  } catch (error: unknown) {
    const err = ensureErrorWithMessage(error);
    console.error('Error updating category:', err);
    return NextResponse.json({ message: err.message || 'An error occurred' }, { status: 500 });
  }
}