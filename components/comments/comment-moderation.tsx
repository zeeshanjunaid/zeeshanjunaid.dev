"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MessageCircle,
  User,
  Calendar,
  Flag
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

interface CommentReport {
  id: string;
  comment_id: string;
  reporter_id: string;
  reason: string;
  description: string | null;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  comment: {
    id: string;
    content: string;
    author_name: string;
    author_email: string;
    post_slug: string;
    is_approved: boolean;
    is_deleted: boolean;
    created_at: string;
  };
  reporter: {
    id: string;
    email: string;
  };
}

interface CommentModerationProps {
  postSlug?: string; // Optional: filter by specific post
}

export function CommentModeration({ postSlug }: CommentModerationProps) {
  const [reports, setReports] = useState<CommentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<CommentReport | null>(null);
  const [isModerating, setIsModerating] = useState(false);
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'delete' | 'hide'>('approve');
  const [moderationNote, setModerationNote] = useState('');
  const supabase = createClient();

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('comment_reports')
        .select(`
          *,
          comment:comments(*),
          reporter:reporter_id(id, email)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (postSlug) {
        query = query.eq('comment.post_slug', postSlug);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }

      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Failed to load reports",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [postSlug, supabase]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleModeration = async () => {
    if (!selectedReport || !moderationAction) return;

    setIsModerating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update comment based on action
      let commentUpdate: any = {};
      let reportStatus: string = '';

      switch (moderationAction) {
        case 'approve':
          commentUpdate = { is_approved: true };
          reportStatus = 'resolved';
          break;
        case 'reject':
          commentUpdate = { is_approved: false };
          reportStatus = 'dismissed';
          break;
        case 'delete':
          commentUpdate = { is_deleted: true };
          reportStatus = 'resolved';
          break;
        case 'hide':
          commentUpdate = { is_approved: false };
          reportStatus = 'resolved';
          break;
      }

      // Update comment
      const { error: commentError } = await supabase
        .from('comments')
        .update(commentUpdate)
        .eq('id', selectedReport.comment_id);

      if (commentError) throw commentError;

      // Update report status
      const { error: reportError } = await supabase
        .from('comment_reports')
        .update({
          status: reportStatus,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', selectedReport.id);

      if (reportError) throw reportError;

      toast({
        title: "Moderation action completed",
        description: `Comment has been ${moderationAction}d successfully.`,
      });

      // Refresh reports
      await fetchReports();
      setSelectedReport(null);
      setModerationNote('');
    } catch (error) {
      console.error('Error moderating comment:', error);
      toast({
        title: "Failed to moderate comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsModerating(false);
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'spam': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'harassment': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'hate_speech': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'inappropriate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'misinformation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'off_topic': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-purple" />
          <h2 className="text-2xl font-bold font-ao text-dark dark:text-light">
            Comment Moderation
          </h2>
        </div>
        <Badge variant="outline" className="font-switzer">
          {reports.length} pending reports
        </Badge>
      </div>

      {reports.length === 0 ? (
        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold font-ao text-dark dark:text-light mb-2">
              All caught up!
            </h3>
            <p className="text-dimLight dark:text-dimDark font-switzer">
              No pending reports to review.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Report Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Flag className="w-5 h-5 text-red-500" />
                      <span className="font-semibold font-switzer text-dark dark:text-light">
                        Report #{report.id.slice(0, 8)}
                      </span>
                      <Badge className={`font-switzer ${getReasonColor(report.reason)}`}>
                        {report.reason.replace('_', ' ')}
                      </Badge>
                    </div>
                    <span className="text-sm text-dimLight dark:text-dimDark font-switzer">
                      {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Comment Content */}
                  <div className="p-4 rounded-lg border border-lightBorderColor/50 dark:border-darkBorderColor/50 bg-light/30 dark:bg-dark/30">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-dimLight dark:text-dimDark" />
                      <span className="font-semibold font-switzer text-dark dark:text-light">
                        {report.comment.author_name}
                      </span>
                      <span className="text-sm text-dimLight dark:text-dimDark font-switzer">
                        {formatDistanceToNow(new Date(report.comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="font-switzer text-dark dark:text-light whitespace-pre-wrap">
                      {report.comment.content}
                    </p>
                  </div>

                  {/* Report Details */}
                  {report.description && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className="text-sm font-switzer text-red-800 dark:text-red-200">
                        <strong>Reporter&apos;s note:</strong> {report.description}
                      </p>
                    </div>
                  )}

                  {/* Moderation Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-lightBorderColor/50 dark:border-darkBorderColor/50">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReport(report)}
                      className="gap-2 font-switzer"
                    >
                      <Eye className="w-4 h-4" />
                      Review
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedReport(report);
                        setModerationAction('approve');
                        handleModeration();
                      }}
                      className="gap-2 font-switzer text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedReport(report);
                        setModerationAction('delete');
                        handleModeration();
                      }}
                      className="gap-2 font-switzer text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Moderation Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-ao text-dark dark:text-light">
              <Shield className="w-5 h-5 text-purple" />
              Moderate Comment
            </DialogTitle>
            <DialogDescription className="font-switzer text-dimLight dark:text-dimDark">
              Review and take action on the reported comment.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              {/* Comment Preview */}
              <div className="p-4 rounded-lg border border-lightBorderColor/50 dark:border-darkBorderColor/50 bg-light/30 dark:bg-dark/30">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-dimLight dark:text-dimDark" />
                  <span className="font-semibold font-switzer text-dark dark:text-light">
                    {selectedReport.comment.author_name}
                  </span>
                </div>
                <p className="font-switzer text-dark dark:text-light whitespace-pre-wrap">
                  {selectedReport.comment.content}
                </p>
              </div>

              {/* Moderation Action */}
              <div className="space-y-2">
                <Label htmlFor="action" className="font-switzer text-dark dark:text-light">
                  Moderation Action
                </Label>
                <Select value={moderationAction} onValueChange={(value: any) => setModerationAction(value)}>
                  <SelectTrigger className="border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark">
                    <SelectItem value="approve" className="font-switzer">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Approve Comment
                      </div>
                    </SelectItem>
                    <SelectItem value="reject" className="font-switzer">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Reject Report
                      </div>
                    </SelectItem>
                    <SelectItem value="delete" className="font-switzer">
                      <div className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4 text-red-500" />
                        Delete Comment
                      </div>
                    </SelectItem>
                    <SelectItem value="hide" className="font-switzer">
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-orange-500" />
                        Hide Comment
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Moderation Note */}
              <div className="space-y-2">
                <Label htmlFor="note" className="font-switzer text-dark dark:text-light">
                  Moderation Note (Optional)
                </Label>
                <Textarea
                  id="note"
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  placeholder="Add a note about this moderation action..."
                  className="min-h-[100px] resize-none border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50 font-switzer"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setSelectedReport(null)}
              disabled={isModerating}
              className="font-switzer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleModeration}
              disabled={isModerating || !moderationAction}
              className="gap-2 font-switzer"
            >
              {isModerating ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Apply Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
