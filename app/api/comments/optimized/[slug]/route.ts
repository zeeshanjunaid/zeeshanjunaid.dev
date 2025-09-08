import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient()
    const { slug } = params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') // Optional user ID for like status

    // Optimized query using a single SQL query with proper joins
    // This eliminates the N+1 problem by fetching everything in one query
    const { data: comments, error } = await supabase
      .rpc('get_comments_with_likes', {
        post_slug: slug,
        user_id: userId || null
      })

    if (error) {
      console.error('Error fetching optimized comments:', error)
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
