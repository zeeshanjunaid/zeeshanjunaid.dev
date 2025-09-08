"use client";

import { AuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment must be less than 2000 characters"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postSlug: string;
  parentId?: string | null;
  onCommentAdded: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

// Helper function to format name for storage (keep full name)
function getAuthorName(user: any): string {
  return (
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Anonymous"
  );
}

export function CommentForm({
  postSlug,
  parentId = null,
  onCommentAdded,
  onCancel,
  placeholder = "What are your thoughts?",
}: CommentFormProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const content = watch("content");

  const onSubmit = async (data: CommentFormData) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("comments").insert({
        post_slug: postSlug,
        content: data.content,
        author_id: user.id,
        author_name: getAuthorName(user),
        author_email: user.email,
        author_avatar: user.user_metadata?.avatar_url,
        parent_id: parentId,
      });

      if (error) throw error;

      reset();

      // Call the callback immediately to refresh comments
      onCommentAdded();
      onCancel?.();

      toast({
        title: "Comment posted",
        description: "Your comment has been published successfully.",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Failed to post comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-6 rounded-xl border border-lightBorderColor dark:border-darkBorderColor bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Textarea
              {...register("content")}
              placeholder={placeholder}
              className="min-h-[120px] resize-none border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50 font-switzer text-[16px] focus:ring-purple focus:border-purple placeholder:text-dimLight dark:placeholder:text-dimDark transition-all duration-200"
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-switzer flex items-center gap-2">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xs text-dimLight dark:text-dimDark font-switzer">
                {content?.length || 0}/2000 characters
              </div>
              {content && content.length > 1800 && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-switzer">
                  {2000 - (content?.length || 0)} characters remaining
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="text-dimLight dark:text-dimDark hover:text-dark dark:hover:text-light font-switzer transition-colors"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="purple"
                size="sm"
                disabled={isSubmitting || !content?.trim()}
                className="gap-2 font-switzer text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {parentId ? "Reply" : "Comment"}
              </Button>
            </div>
          </div>

          {!user && (
            <div className="text-sm text-dimLight dark:text-dimDark font-switzer bg-purple/5 dark:bg-purple/10 p-3 rounded-lg border border-purple/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple rounded-full"></span>
                <span>Want to join the discussion?</span>
              </div>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm text-purple hover:text-purple/80 font-switzer underline-purple mt-1"
                onClick={() => setShowAuthModal(true)}
              >
                Sign in to post a comment
              </Button>
            </div>
          )}
        </form>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Sign in to comment"
        description="Join the discussion by signing in with your preferred method."
      />
    </>
  );
}
