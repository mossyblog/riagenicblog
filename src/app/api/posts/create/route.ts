import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/supabase-posts';
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
    
    // Create the post
    const post = await createPost(postData);
    
    if (!post) {
      return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
    }
    
    return NextResponse.json({ post, message: 'Post created successfully' }, { status: 201 });
  } catch (error: unknown) {
    const err = ensureErrorWithMessage(error);
    console.error('Error creating post:', err);
    return NextResponse.json({ message: err.message || 'An error occurred' }, { status: 500 });
  }
}