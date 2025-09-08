import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { reportRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Apply rate limiting
    const rateLimitResult = await reportRateLimit(request);
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
            'Retry-After': rateLimitResult.retryAfter?.toString() || '3600',
          }
        }
      )
    }

    const body = await request.json()
    const { comment_id, reason, description } = body

    if (!comment_id || !reason) {
      return NextResponse.json(
        { error: 'Comment ID and reason are required' },
        { status: 400 }
      )
    }

    // Validate reason
    const validReasons = ['spam', 'harassment', 'hate_speech', 'inappropriate', 'misinformation', 'off_topic', 'other'];
    if (!validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid reason' },
        { status: 400 }
      )
    }

    // Check if comment exists
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .select('id, author_id')
      .eq('id', comment_id)
      .single()

    if (commentError || !comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Prevent users from reporting their own comments
    if (comment.author_id === user.id) {
      return NextResponse.json(
        { error: 'Cannot report your own comment' },
        { status: 400 }
      )
    }

    // Create report
    const { data: report, error: reportError } = await supabase
      .from('comment_reports')
      .insert({
        comment_id,
        reporter_id: user.id,
        reason,
        description: description?.trim() || null,
      })
      .select()
      .single()

    if (reportError) {
      if (reportError.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'You have already reported this comment' },
          { status: 409 }
        )
      }
      console.error('Error creating report:', reportError)
      return NextResponse.json(
        { error: 'Failed to create report' },
        { status: 500 }
      )
    }

    return NextResponse.json({ report }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
