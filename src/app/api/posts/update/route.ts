import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost } from '@/lib/supabase-posts';
import { requireAuth } from '@/lib/auth';
import { ErrorWithMessage, ensureErrorWithMessage } from '@/lib/error-types';

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
    
    const postData = await request.json();
    
    // Validation
    if (!postData.title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
    
    if (!postData.slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    
    if (!postData.content) {
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }
    
    // Update the post
    const post = await updatePost(id, postData);
    
    if (!post) {
      return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
    }
    
    return NextResponse.json({ post, message: 'Post updated successfully' });
  } catch (error: unknown) {
    const err = ensureErrorWithMessage(error);
    console.error('Error updating post:', err);
    return NextResponse.json({ message: err.message || 'An error occurred' }, { status: 500 });
  }
}