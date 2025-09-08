-- Optimized function to get comments with like counts and user like status
-- This eliminates the N+1 query problem by using a single query with joins
CREATE OR REPLACE FUNCTION get_comments_with_likes(
  p_post_slug TEXT,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  post_slug TEXT,
  content TEXT,
  author_id UUID,
  author_name TEXT,
  author_email TEXT,
  author_avatar TEXT,
  parent_id UUID,
  is_approved BOOLEAN,
  is_deleted BOOLEAN,
  like_count INTEGER,
  user_has_liked BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.post_slug,
    c.content,
    c.author_id,
    c.author_name,
    c.author_email,
    c.author_avatar,
    c.parent_id,
    c.is_approved,
    c.is_deleted,
    COALESCE(l.like_count, 0)::INTEGER as like_count,
    CASE 
      WHEN p_user_id IS NOT NULL AND ul.user_id IS NOT NULL THEN true 
      ELSE false 
    END as user_has_liked,
    c.created_at,
    c.updated_at
  FROM comments c
  LEFT JOIN (
    SELECT 
      comment_id, 
      COUNT(*)::INTEGER as like_count 
    FROM comment_likes 
    GROUP BY comment_id
  ) l ON c.id = l.comment_id
  LEFT JOIN comment_likes ul ON c.id = ul.comment_id AND ul.user_id = p_user_id
  WHERE c.post_slug = p_post_slug 
    AND c.is_deleted = false 
    AND c.is_approved = true
  ORDER BY c.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Paginated version of the optimized function with sorting
CREATE OR REPLACE FUNCTION get_comments_with_likes_paginated(
  p_post_slug TEXT,
  p_user_id UUID DEFAULT NULL,
  p_page_offset INTEGER DEFAULT 0,
  p_page_limit INTEGER DEFAULT 20,
  p_sort_by TEXT DEFAULT 'newest'
)
RETURNS TABLE (
  id UUID,
  post_slug TEXT,
  content TEXT,
  author_id UUID,
  author_name TEXT,
  author_email TEXT,
  author_avatar TEXT,
  parent_id UUID,
  is_approved BOOLEAN,
  is_deleted BOOLEAN,
  like_count INTEGER,
  user_has_liked BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.post_slug,
    c.content,
    c.author_id,
    c.author_name,
    c.author_email,
    c.author_avatar,
    c.parent_id,
    c.is_approved,
    c.is_deleted,
    COALESCE(l.like_count, 0)::INTEGER as like_count,
    CASE 
      WHEN p_user_id IS NOT NULL AND ul.user_id IS NOT NULL THEN true 
      ELSE false 
    END as user_has_liked,
    c.created_at,
    c.updated_at
  FROM comments c
  LEFT JOIN (
    SELECT 
      comment_id, 
      COUNT(*)::INTEGER as like_count 
    FROM comment_likes 
    GROUP BY comment_id
  ) l ON c.id = l.comment_id
  LEFT JOIN comment_likes ul ON c.id = ul.comment_id AND ul.user_id = p_user_id
  WHERE c.post_slug = p_post_slug 
    AND c.is_deleted = false 
    AND c.is_approved = true
    AND c.parent_id IS NULL -- Only get top-level comments for pagination
  ORDER BY 
    CASE 
      WHEN p_sort_by = 'newest' THEN c.created_at 
    END DESC,
    CASE 
      WHEN p_sort_by = 'oldest' THEN c.created_at 
    END ASC,
    CASE 
      WHEN p_sort_by = 'most_liked' THEN COALESCE(l.like_count, 0) 
    END DESC,
    CASE 
      WHEN p_sort_by = 'most_replies' THEN (
        SELECT COUNT(*)::INTEGER FROM comments r 
        WHERE r.parent_id = c.id AND r.is_deleted = false
      )
    END DESC
  LIMIT p_page_limit
  OFFSET p_page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Search function for comments
CREATE OR REPLACE FUNCTION search_comments(
  p_post_slug TEXT,
  p_search_query TEXT,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  post_slug TEXT,
  content TEXT,
  author_id UUID,
  author_name TEXT,
  author_email TEXT,
  author_avatar TEXT,
  parent_id UUID,
  is_approved BOOLEAN,
  is_deleted BOOLEAN,
  like_count INTEGER,
  user_has_liked BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  search_rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.post_slug,
    c.content,
    c.author_id,
    c.author_name,
    c.author_email,
    c.author_avatar,
    c.parent_id,
    c.is_approved,
    c.is_deleted,
    COALESCE(l.like_count, 0)::INTEGER as like_count,
    CASE 
      WHEN p_user_id IS NOT NULL AND ul.user_id IS NOT NULL THEN true 
      ELSE false 
    END as user_has_liked,
    c.created_at,
    c.updated_at,
    ts_rank(
      to_tsvector('english', c.content || ' ' || COALESCE(c.author_name, '')),
      plainto_tsquery('english', p_search_query)
    ) as search_rank
  FROM comments c
  LEFT JOIN (
    SELECT 
      comment_id, 
      COUNT(*)::INTEGER as like_count 
    FROM comment_likes 
    GROUP BY comment_id
  ) l ON c.id = l.comment_id
  LEFT JOIN comment_likes ul ON c.id = ul.comment_id AND ul.user_id = p_user_id
  WHERE c.post_slug = p_post_slug 
    AND c.is_deleted = false 
    AND c.is_approved = true
    AND (
      to_tsvector('english', c.content || ' ' || COALESCE(c.author_name, '')) 
      @@ plainto_tsquery('english', p_search_query)
    )
  ORDER BY search_rank DESC, c.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Analytics function for comments
CREATE OR REPLACE FUNCTION get_comment_analytics(
  p_post_slug TEXT
)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'totalComments', (
      SELECT COUNT(*)::INTEGER 
      FROM comments 
      WHERE comments.post_slug = p_post_slug 
        AND is_deleted = false 
        AND is_approved = true
    ),
    'totalLikes', (
      SELECT COALESCE(SUM(like_count), 0)
      FROM comments 
      WHERE comments.post_slug = p_post_slug 
        AND is_deleted = false 
        AND is_approved = true
    ),
    'totalReports', (
      SELECT COUNT(*)::INTEGER
      FROM comment_reports cr
      JOIN comments c ON cr.comment_id = c.id
      WHERE c.post_slug = p_post_slug
    ),
    'topCommenters', (
      SELECT json_agg(
        json_build_object(
          'author_name', author_name,
          'comment_count', comment_count
        )
      )
      FROM (
        SELECT 
          author_name,
          COUNT(*)::INTEGER as comment_count
        FROM comments 
        WHERE post_slug = p_post_slug 
          AND is_deleted = false 
          AND is_approved = true
          AND author_name IS NOT NULL
        GROUP BY author_name
        ORDER BY comment_count DESC
        LIMIT 10
      ) top_commenters
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_comments_with_likes(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_comments_with_likes_paginated(TEXT, UUID, INTEGER, INTEGER, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION search_comments(TEXT, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_comment_analytics(TEXT) TO authenticated;
