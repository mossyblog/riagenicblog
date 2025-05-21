import { NextRequest, NextResponse } from 'next/server';
import { getCategoryById, deleteCategory } from '@/lib/categories';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  try {
    await requireAuth();
  } catch (error) {
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
    
    // Delete the category
    const success = await deleteCategory(id);
    
    if (!success) {
      return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
    }
    
    // Redirect to categories list
    return NextResponse.redirect(new URL('/admin/categories', request.url));
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: error.message || 'An error occurred' }, { status: 500 });
  }
}