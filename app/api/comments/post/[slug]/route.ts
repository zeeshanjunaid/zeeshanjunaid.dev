import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { commentRateLimit } from '@/lib/rate-limit'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient()
    const { slug } = params

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        comment_likes(user_id)
      `)
      .eq('post_slug', slug)
      .eq('is_deleted', false)
      .eq('is_approved', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      )
    }

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient()
    const { slug } = params
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Apply rate limiting
    const rateLimitResult = await commentRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
          }
        }
      )
    }

    const body = await request.json()
    const { content, parent_id } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { error: 'Content must be less than 2000 characters' },
        { status: 400 }
      )
    }

    // Additional spam protection
    const spamPatterns = [
      /(http|https|www\.)/gi, // URLs
      /[A-Z]{5,}/g, // Excessive caps
      /(.)\1{4,}/g, // Repeated characters
      /(buy|sell|click|free|win|prize|offer|deal|discount|promo)/gi, // Spam keywords
    ];
    
    if (spamPatterns.some(pattern => pattern.test(content))) {
      return NextResponse.json(
        { error: 'Comment contains potentially spammy content' },
        { status: 400 }
      )
    }

    // Check for duplicate content (basic spam protection)
    const { data: recentComments } = await supabase
      .from('comments')
      .select('content')
      .eq('author_id', user.id)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .limit(10);

    if (recentComments?.some(comment => comment.content === content.trim())) {
      return NextResponse.json(
        { error: 'Duplicate comment detected' },
        { status: 400 }
      )
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_slug: slug,
        content: content.trim(),
        author_id: user.id,
        author_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
        author_email: user.email,
        author_avatar: user.user_metadata?.avatar_url,
        parent_id: parent_id || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
