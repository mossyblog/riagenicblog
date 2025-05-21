import { NextRequest, NextResponse } from 'next/server';
import { getPostById, deletePost } from '@/lib/supabase-posts';
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
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }
    
    // Check if post exists
    const existingPost = await getPostById(id);
    if (!existingPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    
    // Delete the post
    const success = await deletePost(id);
    
    if (!success) {
      return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
    }
    
    // Redirect to posts list
    return NextResponse.redirect(new URL('/admin/posts', request.url));
  } catch (error: unknown) {
    const err = ensureErrorWithMessage(error);
    console.error('Error deleting post:', err);
    return NextResponse.json({ message: err.message || 'An error occurred' }, { status: 500 });
  }
}