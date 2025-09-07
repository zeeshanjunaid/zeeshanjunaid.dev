"use client";

import { useCallback, useEffect, useState } from "react";

import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { CommentWithReplies } from "@/types/database";
import { MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch comments with user like status
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select(
          `
          *,
          comment_likes!inner(user_id)
        `
        )
        .eq("post_slug", postSlug)
        .eq("is_deleted", false)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (commentsError) throw commentsError;

      // Process comments to create nested structure
      const processedComments = processCommentsIntoTree(
        commentsData || [],
        user?.id
      );
      setComments(processedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [postSlug, user?.id, supabase]);

  useEffect(() => {
    fetchComments();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_slug=eq.${postSlug}`,
        },
        () => {
          fetchComments();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comment_likes",
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postSlug, user?.id, supabase, fetchComments]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-purple" />
          <h2 className="text-[28px] md:text-[32px] font-bold font-ao text-dark dark:text-light">
            Comments
          </h2>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="space-y-3 p-6 rounded-xl border border-lightBorderColor dark:border-darkBorderColor bg-light/50 dark:bg-dark/50"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full bg-dimLight/20 dark:bg-dimDark/20" />
                <Skeleton className="w-32 h-4 bg-dimLight/20 dark:bg-dimDark/20" />
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
            <p className="text-red-600 dark:text-red-400 font-switzer text-[16px]">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const topLevelComments = comments.filter((comment) => !comment.parent_id);

  return (
    <div className="space-y-8">
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
            <p className="text-dimLight dark:text-dimDark font-switzer text-[16px] md:text-[18px]">
              No comments yet. Be the first to share your thoughts!
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
