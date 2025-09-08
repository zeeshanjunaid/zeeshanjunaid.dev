"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

interface CommentReportProps {
  commentId: string;
  commentAuthor: string;
}

const reportReasons = [
  {
    value: "spam",
    label: "Spam or promotional content",
    description: "Contains spam, advertisements, or promotional material"
  },
  {
    value: "harassment",
    label: "Harassment or bullying",
    description: "Contains threatening, abusive, or harassing content"
  },
  {
    value: "hate_speech",
    label: "Hate speech or discrimination",
    description: "Contains discriminatory language or hate speech"
  },
  {
    value: "inappropriate",
    label: "Inappropriate content",
    description: "Contains offensive, vulgar, or inappropriate material"
  },
  {
    value: "misinformation",
    label: "Misinformation",
    description: "Contains false or misleading information"
  },
  {
    value: "off_topic",
    label: "Off-topic",
    description: "Not relevant to the discussion or post"
  },
  {
    value: "other",
    label: "Other",
    description: "Other reason not listed above"
  }
];

export function CommentReport({ commentId, commentAuthor }: CommentReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to report comments.",
        variant: "destructive",
      });
      return;
    }

    if (!reason) {
      toast({
        title: "Reason required",
        description: "Please select a reason for reporting this comment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_id: commentId,
          reason,
          description: description.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Already reported",
            description: "You have already reported this comment.",
            variant: "destructive",
          });
        } else if (response.status === 429) {
          toast({
            title: "Rate limit exceeded",
            description: `Please wait ${data.retryAfter} seconds before reporting again.`,
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || 'Failed to report comment');
        }
      } else {
        toast({
          title: "Comment reported",
          description: "Thank you for your report. We'll review it shortly.",
        });
        setIsOpen(false);
        setReason("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error reporting comment:", error);
      toast({
        title: "Failed to report comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedReason = reportReasons.find(r => r.value === reason);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 h-8 px-3 text-dimLight dark:text-dimDark hover:text-red-600 dark:hover:text-red-400 font-switzer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <Flag className="w-4 h-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-ao text-dark dark:text-light">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Report Comment
          </DialogTitle>
          <DialogDescription className="font-switzer text-dimLight dark:text-dimDark">
            Report a comment by {commentAuthor} for review by our moderation team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="font-switzer text-dark dark:text-light">
              Reason for reporting *
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark">
                {reportReasons.map((reasonOption) => (
                  <SelectItem
                    key={reasonOption.value}
                    value={reasonOption.value}
                    className="font-switzer"
                  >
                    <div className="flex flex-col">
                      <span>{reasonOption.label}</span>
                      <span className="text-xs text-dimLight dark:text-dimDark">
                        {reasonOption.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReason && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-switzer text-blue-800 dark:text-blue-200">
                {selectedReason.description}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description" className="font-switzer text-dark dark:text-light">
              Additional details (optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide any additional context that might help our moderation team..."
              className="min-h-[100px] resize-none border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50 font-switzer focus:ring-red-500 focus:border-red-500"
              maxLength={500}
            />
            <p className="text-xs text-dimLight dark:text-dimDark font-switzer">
              {description.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
            className="font-switzer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reason}
            className="gap-2 font-switzer bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Flag className="w-4 h-4" />
            )}
            Report Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
