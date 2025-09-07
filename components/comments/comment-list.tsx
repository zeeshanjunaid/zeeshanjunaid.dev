"use client";

import { Comment } from "@/components/comments/comment";
import { CommentWithReplies } from "@/types/database";

interface CommentListProps {
  comments: CommentWithReplies[];
  postSlug: string;
  onCommentAdded: () => void;
  depth?: number;
}

export function CommentList({
  comments,
  postSlug,
  onCommentAdded,
  depth = 0,
}: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          postSlug={postSlug}
          onCommentAdded={onCommentAdded}
          depth={depth}
        />
      ))}
    </div>
  );
}
