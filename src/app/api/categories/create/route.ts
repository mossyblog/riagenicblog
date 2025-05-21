import { NextRequest, NextResponse } from 'next/server';
import { createCategory } from '@/lib/categories';
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
    const categoryData = await request.json();
    
    // Validation
    if (!categoryData.name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }
    
    if (!categoryData.slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    
    // Create the category
    const category = await createCategory(categoryData);
    
    if (!category) {
      return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
    }
    
    return NextResponse.json({ category, message: 'Category created successfully' }, { status: 201 });
  } catch (error: unknown) {
    const err = ensureErrorWithMessage(error);
    console.error('Error creating category:', err);
    return NextResponse.json({ message: err.message || 'An error occurred' }, { status: 500 });
  }
}