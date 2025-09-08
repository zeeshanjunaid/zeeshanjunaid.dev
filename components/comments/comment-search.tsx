"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CommentWithReplies } from "@/types/database";
import { toast } from "@/components/ui/use-toast";

interface CommentSearchProps {
  postSlug: string;
  onSearchResults: (results: CommentWithReplies[]) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  onSearchingChange: (searching: boolean) => void;
}

export function CommentSearch({ 
  postSlug, 
  onSearchResults, 
  onClearSearch, 
  isSearching, 
  onSearchingChange 
}: CommentSearchProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const searchComments = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onClearSearch();
      return;
    }

    setIsLoading(true);
    onSearchingChange(true);

    try {
      let comments, error;
      
      try {
        const result = await supabase
          .rpc('search_comments', {
            p_post_slug: postSlug,
            p_search_query: searchQuery.trim(),
            p_user_id: null // We'll get user like status separately if needed
          });
        comments = result.data;
        error = result.error;
      } catch (rpcError) {
        console.log('Search RPC function not found, falling back to basic search');
        // Fallback to basic search
        const result = await supabase
          .from('comments')
          .select(`
            *,
            comment_likes(user_id)
          `)
          .eq('post_slug', postSlug)
          .eq('is_deleted', false)
          .eq('is_approved', true)
          .ilike('content', `%${searchQuery.trim()}%`)
          .order('created_at', { ascending: false });
        comments = result.data;
        error = result.error;
      }

      if (error) {
        console.error("Search error:", error);
        throw error;
      }

      // Process search results into tree structure
      const processedComments = processSearchResultsIntoTree(comments || []);
      onSearchResults(processedComments);
    } catch (error) {
      console.error("Error searching comments:", error);
      toast({
        title: "Search failed",
        description: "Failed to search comments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [postSlug, supabase, onSearchResults, onClearSearch, onSearchingChange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchComments(query);
  };

  const handleClear = () => {
    setQuery("");
    onClearSearch();
    onSearchingChange(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchComments(query);
      } else if (isSearching) {
        onClearSearch();
        onSearchingChange(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchComments, isSearching, onClearSearch, onSearchingChange]);

  return (
    <div className="space-y-3">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dimLight dark:text-dimDark" />
          <Input
            type="text"
            placeholder="Search comments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 border-lightBorderColor dark:border-darkBorderColor bg-white dark:bg-gray-800/50 font-switzer focus:ring-purple focus:border-purple"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-dimLight dark:text-dimDark hover:text-dark dark:hover:text-light"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={isLoading || !query.trim()}
          className="gap-2 font-switzer"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          Search
        </Button>
      </form>

      {isSearching && (
        <div className="flex items-center gap-2 text-sm text-purple dark:text-purple-300 font-switzer">
          <MessageCircle className="w-4 h-4" />
          <span>Showing search results for &ldquo;{query}&rdquo;</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-6 px-2 text-xs"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

// Helper function to process search results into tree structure
function processSearchResultsIntoTree(comments: any[]): CommentWithReplies[] {
  const commentMap = new Map<string, CommentWithReplies>();
  const rootComments: CommentWithReplies[] = [];

  // First pass: create all comments
  comments.forEach((comment) => {
    const processedComment: CommentWithReplies = {
      ...comment,
      replies: [],
      user_has_liked: comment.user_has_liked || false,
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
