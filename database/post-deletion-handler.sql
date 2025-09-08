-- Handle post deletion by cleaning up related comments
-- This should be run in your Supabase SQL editor

-- Function to handle post deletion
CREATE OR REPLACE FUNCTION handle_post_deletion()
RETURNS TRIGGER AS $$
BEGIN
    -- When a post is deleted, mark all its comments as deleted
    -- instead of actually deleting them (for audit purposes)
    UPDATE comments 
    SET is_deleted = true,
        content = '[Comment removed due to post deletion]',
        author_name = 'Deleted User',
        author_email = null,
        author_avatar = null
    WHERE post_slug = OLD.slug;
    
    -- Also clean up comment likes for deleted comments
    DELETE FROM comment_likes 
    WHERE comment_id IN (
        SELECT id FROM comments 
        WHERE post_slug = OLD.slug
    );
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for post deletion
-- Note: This assumes you have a 'posts' table with a 'slug' column
-- Adjust the table and column names as needed for your setup
CREATE TRIGGER on_post_delete
    BEFORE DELETE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION handle_post_deletion();

-- Alternative: If you want to actually delete comments when post is deleted
-- (not recommended for audit purposes)
/*
CREATE OR REPLACE FUNCTION handle_post_deletion_cascade()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete comment likes first (due to foreign key constraints)
    DELETE FROM comment_likes 
    WHERE comment_id IN (
        SELECT id FROM comments 
        WHERE post_slug = OLD.slug
    );
    
    -- Then delete comments
    DELETE FROM comments 
    WHERE post_slug = OLD.slug;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_post_delete_cascade
    BEFORE DELETE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION handle_post_deletion_cascade();
*/
