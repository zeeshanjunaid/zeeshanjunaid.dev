"use client";

import { useCallback, useEffect, useState, useRef } from "react";

import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { CommentDebug } from "@/components/comments/comment-debug";
import { CommentWithReplies } from "@/types/database";
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
  const { user } = useAuth();
  const supabase = createClient();
  const channelRef = useRef<any>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch comments with user like status - Fixed query to use LEFT JOIN
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select(
          `
          *,
          comment_likes(user_id)
        `
        )
        .eq("post_slug", postSlug)
        .eq("is_deleted", false)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error("Comments query error:", commentsError);
        throw commentsError;
      }

      // Process comments to create nested structure
      const processedComments = processCommentsIntoTree(
        commentsData || [],
        user?.id
      );
      setComments(processedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [postSlug, user?.id, supabase]);

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
          // For comment changes, we need to refetch to maintain proper tree structure
          // This is because nested comments are complex to update in real-time
          setTimeout(() => {
            fetchComments();
          }, 100);
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

  const topLevelComments = comments.filter((comment) => !comment.parent_id);

  return (
    <div className="space-y-8">
      {/* Debug Component - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <CommentDebug postSlug={postSlug} />
      )}

      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-purple" />
        <h2 className="text-[28px] md:text-[32px] font-bold font-ao text-dark dark:text-light">
          Comments ({topLevelComments.length})
        </h2>
      </div>

      <CommentForm postSlug={postSlug} onCommentAdded={handleCommentAdded} />

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

// Helper function to process flat comments into nested tree structure
function processCommentsIntoTree(
  comments: any[],
  userId?: string
): CommentWithReplies[] {
  const commentMap = new Map<string, CommentWithReplies>();
  const rootComments: CommentWithReplies[] = [];

  // First pass: create all comments with user_has_liked flag
  comments.forEach((comment) => {
    const processedComment: CommentWithReplies = {
      ...comment,
      replies: [],
      user_has_liked: userId
        ? comment.comment_likes?.some((like: any) => like.user_id === userId)
        : false,
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
