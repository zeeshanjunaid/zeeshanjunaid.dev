import { CommentModeration } from "@/components/comments/comment-moderation";
import { CommentAnalytics } from "@/components/comments/comment-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, BarChart3, MessageCircle } from "lucide-react";

export default function AdminCommentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-purple" />
            <h1 className="text-3xl md:text-4xl font-bold font-ao text-dark dark:text-light">
              Comment Administration
            </h1>
          </div>
          <p className="text-dimLight dark:text-dimDark font-switzer text-lg max-w-2xl mx-auto">
            Manage comments, review reports, and monitor engagement across your blog posts.
          </p>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="moderation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <TabsTrigger 
              value="moderation" 
              className="gap-2 font-switzer data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="gap-2 font-switzer data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="moderation" className="space-y-6">
            <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-ao text-dark dark:text-light">
                  <MessageCircle className="w-5 h-5 text-purple" />
                  Comment Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommentModeration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-ao text-dark dark:text-light">
                  <BarChart3 className="w-5 h-5 text-purple" />
                  Comment Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommentAnalytics postSlug="" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Total Comments</p>
                  <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                    Loading...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Pending Reports</p>
                  <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                    Loading...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-lightBorderColor dark:border-darkBorderColor bg-white/60 dark:bg-gray-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-switzer text-dimLight dark:text-dimDark">Active Users</p>
                  <p className="text-2xl font-bold font-ao text-dark dark:text-light">
                    Loading...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
