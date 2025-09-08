-- Comment System Database Setup
-- Run this in your Supabase SQL Editor

-- 1. First, run the comment reports schema
\i database/comment-reports-schema.sql

-- 2. Then run the optimized functions
\i database/optimized-comments-function.sql

-- 3. Verify functions were created
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN (
  'get_comments_with_likes',
  'get_comments_with_likes_paginated', 
  'search_comments',
  'get_comment_analytics'
);

-- 4. Test the main function
SELECT * FROM get_comments_with_likes('test-post', null) LIMIT 1;
