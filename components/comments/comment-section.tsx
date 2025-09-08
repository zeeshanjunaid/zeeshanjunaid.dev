"use client";

import { useCallback, useEffect, useState, useRef } from "react";

import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { CommentDebug } from "@/components/comments/comment-debug";
import { CommentSorting, CommentSortOption } from "@/components/comments/comment-sorting";
import { CommentSearch } from "@/components/comments/comment-search";
import { CommentWithReplies, Comment } from "@/types/database";
import { MessageCircle, RefreshCw, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";

interface CommentSectionProps {
  postSlug: string;
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<CommentSortOption>('newest');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CommentWithReplies[]>([]);
  const { user } = useAuth();
  const supabase = createClient();
  const channelRef = useRef<any>(null);

  const COMMENTS_PER_PAGE = 20;

  const fetchComments = useCallback(async (pageNum: number = 0, append: boolean = false) => {
    try {
      if (pageNum === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      // Try optimized query first, fallback to original if function doesn't exist
      let commentsData, commentsError;
      
      try {
        const result = await supabase
          .rpc('get_comments_with_likes_paginated', {
            p_post_slug: postSlug,
            p_user_id: user?.id || null,
            p_page_offset: pageNum * COMMENTS_PER_PAGE,
            p_page_limit: COMMENTS_PER_PAGE,
            p_sort_by: sortBy
          });
        
        // Check if RPC function exists and works
        if (result.error && result.error.code === 'PGRST202') {
          console.log('RPC function not found, falling back to original query');
          throw new Error('RPC_FUNCTION_NOT_FOUND');
        }
        
        commentsData = result.data;
        commentsError = result.error;
      } catch (rpcError) {
        console.log('RPC function error, falling back to original query:', rpcError);
        // Fallback to original query method
        const result = await supabase
          .from("comments")
          .select(`
            *,
            comment_likes(user_id)
          `)
          .eq("post_slug", postSlug)
          .eq("is_deleted", false)
          .eq("is_approved", true)
          .order("created_at", { ascending: sortBy === 'oldest' })
          .range(pageNum * COMMENTS_PER_PAGE, (pageNum + 1) * COMMENTS_PER_PAGE - 1);
        commentsData = result.data;
        commentsError = result.error;
      }

      if (commentsError) {
        console.error("Comments query error:", commentsError);
        console.error("Comments data:", commentsData);
        throw commentsError;
      }
      
      console.log("Comments loaded successfully:", commentsData?.length || 0, "comments");

      // Process comments to create nested structure
      const processedComments = processCommentsIntoTree(
        commentsData || [],
        user?.id
      );

      if (append) {
        setComments(prev => [...prev, ...processedComments]);
      } else {
        setComments(processedComments);
      }

      // Check if there are more comments to load
      setHasMore(processedComments.length === COMMENTS_PER_PAGE);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [postSlug, user?.id, supabase, COMMENTS_PER_PAGE, sortBy]);

  const loadMoreComments = useCallback(async () => {
    if (!loadingMore && hasMore) {
      await fetchComments(page + 1, true);
    }
  }, [fetchComments, page, loadingMore, hasMore]);

  const handleSortChange = useCallback((newSort: CommentSortOption) => {
    setSortBy(newSort);
    setPage(0);
    setComments([]);
    setHasMore(true);
    // Fetch comments with new sort order
    fetchComments(0, false);
  }, [fetchComments]);

  const handleSearchResults = useCallback((results: CommentWithReplies[]) => {
    setSearchResults(results);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    fetchComments();

    // Clean up existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // Subscribe to real-time changes for comments with improved setup
    const channel = supabase
      .channel(`comments-${postSlug}`, {
        config: {
          broadcast: { self: false },
          presence: { key: user?.id || 'anonymous' }
        }
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_slug=eq.${postSlug}`,
        },
        (payload) => {
          console.log("Comment change detected:", payload);
          // Handle targeted updates instead of full refetch
          if (payload.eventType === 'INSERT') {
            // Add new comment to tree
            setComments(prev => addCommentToTree(prev, payload.new, user?.id));
          } else if (payload.eventType === 'UPDATE') {
            // Update specific comment
            setComments(prev => updateCommentInTree(prev, payload.new, user?.id));
          } else if (payload.eventType === 'DELETE') {
            // Remove comment from tree
            setComments(prev => removeCommentFromTree(prev, payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comment_likes",
        },
        (payload) => {
          console.log("Comment like change detected:", payload);
          // Update like count in real-time for the specific comment
          if (payload.eventType === 'INSERT') {
            const newLike = payload.new;
            setComments(prev => {
              const updateCommentLikes = (comments: CommentWithReplies[]): CommentWithReplies[] => {
                return comments.map(comment => {
                  if (comment.id === newLike.comment_id) {
                    return { 
                      ...comment, 
                      like_count: (comment.like_count || 0) + 1,
                      user_has_liked: newLike.user_id === user?.id ? true : comment.user_has_liked
                    };
                  }
                  if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: updateCommentLikes(comment.replies) };
                  }
                  return comment;
                });
              };
              return updateCommentLikes(prev);
            });
          } else if (payload.eventType === 'DELETE') {
            const removedLike = payload.old;
            setComments(prev => {
              const updateCommentLikes = (comments: CommentWithReplies[]): CommentWithReplies[] => {
                return comments.map(comment => {
                  if (comment.id === removedLike.comment_id) {
                    return { 
                      ...comment, 
                      like_count: Math.max((comment.like_count || 0) - 1, 0),
                      user_has_liked: removedLike.user_id === user?.id ? false : comment.user_has_liked
                    };
                  }
                  if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: updateCommentLikes(comment.replies) };
                  }
                  return comment;
                });
              };
              return updateCommentLikes(prev);
            });
          }
        }
      )
      .subscribe((status) => {
        console.log("Comment channel subscription status:", status);
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [postSlug, user?.id, supabase, fetchComments]);

  const handleCommentAdded = useCallback(() => {
    // Real-time updates will handle this automatically
    // No need for manual refresh
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-purple" />
            <h2 className="text-[28px] md:text-[32px] font-bold font-ao text-dark dark:text-light">
              Comments
            </h2>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="space-y-3 p-6 rounded-xl border border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full bg-dimLight/20 dark:bg-dimDark/20" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-4 bg-dimLight/20 dark:bg-dimDark/20" />
                  <Skeleton className="w-20 h-3 bg-dimLight/20 dark:bg-dimDark/20" />
                </div>
              </div>
              <Skeleton className="w-full h-20 bg-dimLight/20 dark:bg-dimDark/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-purple" />
          <h2 className="text-[28px] md:text-[32px] font-bold font-ao text-dark dark:text-light">
            Comments
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="p-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-500" />
            <p className="text-red-600 dark:text-red-400 font-switzer text-[16px] mb-3">
              {error}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="gap-2 font-switzer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const topLevelComments = isSearching ? searchResults : comments.filter((comment) => !comment.parent_id);

  return (
    <div className="space-y-8">
      {/* Debug Component - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <CommentDebug postSlug={postSlug} />
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-purple" />
          <h2 className="text-[28px] md:text-[32px] font-bold font-ao text-dark dark:text-light">
            Comments
          </h2>
        </div>
        
        {topLevelComments.length > 0 && (
          <CommentSorting
            sortBy={sortBy}
            onSortChange={handleSortChange}
            commentCount={topLevelComments.length}
          />
        )}
      </div>

      <CommentForm postSlug={postSlug} onCommentAdded={handleCommentAdded} />

      {/* Comment Search */}
      <CommentSearch
        postSlug={postSlug}
        onSearchResults={handleSearchResults}
        onClearSearch={handleClearSearch}
        isSearching={isSearching}
        onSearchingChange={setIsSearching}
      />

      {topLevelComments.length > 0 ? (
        <CommentList
          comments={topLevelComments}
          postSlug={postSlug}
          onCommentAdded={handleCommentAdded}
        />
      ) : (
        <div className="text-center py-12">
          <div className="p-8 rounded-xl border border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20 backdrop-blur-sm">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-dimLight dark:text-dimDark" />
            <p className="text-dimLight dark:text-dimDark font-switzer text-[16px] md:text-[18px] mb-4">
              No comments yet. Be the first to share your thoughts!
            </p>
            <p className="text-sm text-dimLight/70 dark:text-dimDark/70 font-switzer">
              Join the conversation and let others know what you think about this post.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to add a new comment to the tree
function addCommentToTree(
  comments: CommentWithReplies[],
  newComment: any,
  userId?: string
): CommentWithReplies[] {
  const processedComment: CommentWithReplies = {
    ...newComment,
    replies: [],
    user_has_liked: false,
  };

  if (!newComment.parent_id) {
    // Top-level comment
    return [...comments, processedComment].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  } else {
    // Reply to existing comment
    return comments.map(comment => {
      if (comment.id === newComment.parent_id) {
        return {
          ...comment,
          replies: [...(comment.replies || []), processedComment].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addCommentToTree(comment.replies, newComment, userId)
        };
      }
      return comment;
    });
  }
}

// Helper function to update a comment in the tree
function updateCommentInTree(
  comments: CommentWithReplies[],
  updatedComment: any,
  userId?: string
): CommentWithReplies[] {
  return comments.map(comment => {
    if (comment.id === updatedComment.id) {
      return {
        ...comment,
        ...updatedComment,
        user_has_liked: userId
          ? updatedComment.comment_likes?.some((like: any) => like.user_id === userId)
          : comment.user_has_liked,
      };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentInTree(comment.replies, updatedComment, userId)
      };
    }
    return comment;
  });
}

// Helper function to remove a comment from the tree
function removeCommentFromTree(
  comments: CommentWithReplies[],
  commentId: string
): CommentWithReplies[] {
  return comments
    .filter(comment => comment.id !== commentId)
    .map(comment => {
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: removeCommentFromTree(comment.replies, commentId)
        };
      }
      return comment;
    });
}

// Helper function to process flat comments into nested tree structure
function processCommentsIntoTree(
  comments: any[], // Using any[] since the RPC function returns a custom type
  userId?: string
): CommentWithReplies[] {
  const commentMap = new Map<string, CommentWithReplies>();
  const rootComments: CommentWithReplies[] = [];

  // First pass: create all comments with user_has_liked flag
  comments.forEach((comment) => {
    const processedComment: CommentWithReplies = {
      ...comment,
      replies: [],
      user_has_liked: comment.user_has_liked || false,
    };
    commentMap.set(comment.id, processedComment);
  });

  // Second pass: build the tree structure
  comments.forEach((comment) => {
    const processedComment = commentMap.get(comment.id)!;

    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(processedComment);
      }
    } else {
      rootComments.push(processedComment);
    }
  });

  return rootComments;
}
