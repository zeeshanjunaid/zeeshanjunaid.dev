import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    // Check if user is admin
    const isAdmin = user.user_metadata?.role === 'admin' || 
                   user.email === 'zeeshanjunaid2222@gmail.com';
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { report_id, action, note } = body

    if (!report_id || !action) {
      return NextResponse.json(
        { error: 'Report ID and action are required' },
        { status: 400 }
      )
    }

    // Validate action
    const validActions = ['approve', 'reject', 'delete', 'hide'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Get the report
    const { data: report, error: reportError } = await supabase
      .from('comment_reports')
      .select(`
        *,
        comment:comments(*)
      `)
      .eq('id', report_id)
      .single()

    if (reportError || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // Update comment based on action
    let commentUpdate: any = {};
    let reportStatus: string = '';

    switch (action) {
      case 'approve':
        commentUpdate = { is_approved: true };
        reportStatus = 'resolved';
        break;
      case 'reject':
        commentUpdate = { is_approved: true }; // Keep comment approved
        reportStatus = 'dismissed';
        break;
      case 'delete':
        commentUpdate = { is_deleted: true };
        reportStatus = 'resolved';
        break;
      case 'hide':
        commentUpdate = { is_approved: false };
        reportStatus = 'resolved';
        break;
    }

    // Update comment
    const { error: commentError } = await supabase
      .from('comments')
      .update(commentUpdate)
      .eq('id', report.comment_id);

    if (commentError) {
      console.error('Error updating comment:', commentError);
      return NextResponse.json(
        { error: 'Failed to update comment' },
        { status: 500 }
      )
    }

    // Update report status
    const { error: updateReportError } = await supabase
      .from('comment_reports')
      .update({
        status: reportStatus,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', report_id);

    if (updateReportError) {
      console.error('Error updating report:', updateReportError);
      return NextResponse.json(
        { error: 'Failed to update report' },
        { status: 500 }
      )
    }

    // Log moderation action (optional)
    if (note) {
      // You could create a moderation_logs table to track all actions
      console.log(`Moderation action: ${action} on comment ${report.comment_id} by ${user.id}. Note: ${note}`);
    }

    return NextResponse.json({ 
      success: true, 
      action,
      reportStatus 
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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

    // Check if user is admin
    const isAdmin = user.user_metadata?.role === 'admin' || 
                   user.email === 'zeeshanjunaid2222@gmail.com';
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const postSlug = searchParams.get('post_slug')
    const status = searchParams.get('status') || 'pending'

    // Build query
    let query = supabase
      .from('comment_reports')
      .select(`
        *,
        comment:comments(*),
        reporter:reporter_id(id, email)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (postSlug) {
      query = query.eq('comment.post_slug', postSlug);
    }

    const { data: reports, error } = await query;

    if (error) {
      console.error('Error fetching reports:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reports' },
        { status: 500 }
      )
    }

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
