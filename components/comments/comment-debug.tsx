"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Database, Users, MessageCircle } from "lucide-react";

interface CommentDebugProps {
  postSlug: string;
}

export function CommentDebug({ postSlug }: CommentDebugProps) {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchDebugInfo = async () => {
    setLoading(true);
    try {
      // Test basic connection
      const { data: connectionTest, error: connectionError } = await supabase
        .from("comments")
        .select("count")
        .limit(1);

      // Get comments for this post
      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug);

      // Get comment likes
      const { data: likes, error: likesError } = await supabase
        .from("comment_likes")
        .select("*");

      // Get user info
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      setDebugInfo({
        connection: { success: !connectionError, error: connectionError },
        comments: { data: comments, error: commentsError, count: comments?.length || 0 },
        likes: { data: likes, error: likesError, count: likes?.length || 0 },
        user: { data: user, error: userError },
        postSlug,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setDebugInfo({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
  }, [postSlug]);

  if (!debugInfo) {
    return (
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Database className="w-5 h-5" />
            Comment System Debug
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 dark:text-amber-300">Loading debug information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <Database className="w-5 h-5" />
            Comment System Debug
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDebugInfo}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Comments:</span>
            <Badge variant={debugInfo.comments?.error ? "destructive" : "secondary"}>
              {debugInfo.comments?.count || 0}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Likes:</span>
            <Badge variant={debugInfo.likes?.error ? "destructive" : "secondary"}>
              {debugInfo.likes?.count || 0}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Connection:</span>
            <Badge variant={debugInfo.connection?.success ? "default" : "destructive"}>
              {debugInfo.connection?.success ? "OK" : "Error"}
            </Badge>
          </div>
        </div>

        <div className="text-xs text-amber-700 dark:text-amber-300">
          <p><strong>Post Slug:</strong> {debugInfo.postSlug}</p>
          <p><strong>User:</strong> {debugInfo.user?.data ? "Authenticated" : "Not authenticated"}</p>
          <p><strong>Last Updated:</strong> {new Date(debugInfo.timestamp).toLocaleString()}</p>
        </div>

        {debugInfo.error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Error:</strong> {debugInfo.error}
            </p>
          </div>
        )}

        {debugInfo.comments?.error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Comments Error:</strong> {debugInfo.comments.error.message}
            </p>
          </div>
        )}

        {debugInfo.comments?.data && debugInfo.comments.data.length > 0 && (
          <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Sample Comment:</strong> {debugInfo.comments.data[0].content.substring(0, 100)}...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
