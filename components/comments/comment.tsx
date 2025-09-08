"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit2,
  Heart,
  MoreHorizontal,
  Reply,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { CommentWithReplies } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";
import { useState } from "react";

interface CommentProps {
  comment: CommentWithReplies;
  postSlug: string;
  onCommentAdded: () => void;
  depth?: number;
}

const MAX_DEPTH = 3;

// Helper function to format name as "First L."
function formatDisplayName(fullName: string | null | undefined): string {
  if (!fullName) return "User";

  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

export function Comment({
  comment,
  postSlug,
  onCommentAdded,
  depth = 0,
}: CommentProps) {
  const { user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();

  const isAuthor = user?.id === comment.author_id;
  const canReply = depth < MAX_DEPTH;

  const handleLike = async () => {
    if (!user || isLiking) return;

    setIsLiking(true);

    try {
      if (comment.user_has_liked) {
        // Unlike
        const { error } = await supabase
          .from("comment_likes")
          .delete()
          .eq("comment_id", comment.id)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase.from("comment_likes").insert({
          comment_id: comment.id,
          user_id: user.id,
        });

        if (error) throw error;
      }

      onCommentAdded(); // Refresh comments to update like count
    } catch (error) {
      console.error("Error toggling like:", error);
      toast({
        title: "Failed to update like",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!isAuthor || isDeleting) return;

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("comments")
        .update({ is_deleted: true })
        .eq("id", comment.id);

      if (error) throw error;

      onCommentAdded(); // Refresh comments
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Failed to delete comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  return (
    <div
      className={`${
        depth > 0
          ? "ml-6 md:ml-8 border-l-2 border-purple/20 dark:border-purple/30 pl-4 md:pl-6"
          : ""
      }`}
    >
      <div className="p-6 rounded-xl border border-lightBorderColor dark:border-darkBorderColor bg-white/70 dark:bg-gray-900/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
        {/* Comment Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-11 h-11 ring-2 ring-purple/20 dark:ring-purple/30 hover:ring-purple/40 transition-all duration-200">
              <AvatarImage
                src={comment.author_avatar || ""}
                alt={comment.author_name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple/20 to-purple/10 dark:from-purple/30 dark:to-purple/20 border border-purple/20 dark:border-purple/30 text-purple dark:text-purple-300 font-semibold">
                {comment.author_name ? (
                  comment.author_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                ) : (
                  <User className="w-5 h-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[16px] font-switzer text-dark dark:text-light">
                  {formatDisplayName(comment.author_name)}
                </span>
                <span className="text-xs text-dimLight dark:text-dimDark font-switzer bg-light/50 dark:bg-dark/50 px-2 py-1 rounded-full">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-dimLight dark:text-dimDark hover:text-dark dark:hover:text-light"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark"
              >
                <DropdownMenuItem
                  onClick={() => setIsEditing(true)}
                  className="font-switzer"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 dark:text-red-400 font-switzer"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Comment Content */}
        <div className="text-[16px] leading-relaxed whitespace-pre-wrap font-switzer text-dark dark:text-light bg-light/30 dark:bg-dark/30 p-4 rounded-lg border border-lightBorderColor/50 dark:border-darkBorderColor/50">
          {comment.content}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-lightBorderColor/50 dark:border-darkBorderColor/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={!user || isLiking}
            className={`gap-2 h-8 px-3 font-switzer transition-all duration-200 ${
              comment.user_has_liked
                ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                : "text-dimLight dark:text-dimDark hover:text-dark dark:hover:text-light hover:bg-light/50 dark:hover:bg-dark/50"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                comment.user_has_liked ? "fill-current scale-110" : "hover:scale-110"
              }`}
            />
            {comment.like_count > 0 && (
              <span className="text-sm font-medium">{comment.like_count}</span>
            )}
          </Button>

          {canReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="gap-2 h-8 px-3 text-dimLight dark:text-dimDark hover:text-dark dark:hover:text-light font-switzer hover:bg-light/50 dark:hover:bg-dark/50 transition-all duration-200"
            >
              <Reply className="w-4 h-4" />
              Reply
            </Button>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="text-xs text-dimLight dark:text-dimDark font-switzer">
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </div>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-6">
            <CommentForm
              postSlug={postSlug}
              parentId={comment.id}
              onCommentAdded={handleReplyAdded}
              onCancel={() => setShowReplyForm(false)}
              placeholder={`Reply to ${comment.author_name || "Anonymous"}...`}
            />
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-6">
            <CommentList
              comments={comment.replies}
              postSlug={postSlug}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
