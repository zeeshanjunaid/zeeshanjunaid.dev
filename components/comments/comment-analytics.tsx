"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Heart, Flag, TrendingUp, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CommentAnalyticsProps {
  postSlug: string;
}

interface AnalyticsData {
  totalComments: number;
  totalLikes: number;
  totalReports: number;
  topCommenters: Array<{
    author_name: string;
    comment_count: number;
  }>;
  recentActivity: Array<{
    type: 'comment' | 'like' | 'report';
    count: number;
    date: string;
  }>;
}

export function CommentAnalytics({ postSlug }: CommentAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch analytics data
      const { data, error } = await supabase
        .rpc('get_comment_analytics', {
          p_post_slug: postSlug
        });

      if (error) {
        console.error('Analytics error:', error);
        return;
      }

      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [postSlug, supabase]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Total Comments</p>
                <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                  {analytics.totalComments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Total Likes</p>
                <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                  {analytics.totalLikes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Flag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Reports</p>
                <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                  {analytics.totalReports}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Active Users</p>
                <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                  {analytics.topCommenters.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Commenters */}
      {analytics.topCommenters.length > 0 && (
        <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-ao text-dark dark:text-light">
              <TrendingUp className="w-5 h-5 text-purple" />
              Top Commenters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topCommenters.slice(0, 5).map((commenter, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple/20 dark:bg-purple/30 flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple dark:text-purple-300">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-switzer text-dark dark:text-light">
                      {commenter.author_name}
                    </span>
                  </div>
                  <span className="text-sm font-switzer text-dimLight dark:text-dimDark">
                    {commenter.comment_count} comments
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
