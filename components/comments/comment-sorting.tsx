"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUpDown, Clock, Heart, MessageCircle } from "lucide-react";

export type CommentSortOption = 'newest' | 'oldest' | 'most_liked' | 'most_replies';

interface CommentSortingProps {
  sortBy: CommentSortOption;
  onSortChange: (sort: CommentSortOption) => void;
  commentCount: number;
}

const sortOptions = [
  {
    value: 'newest' as CommentSortOption,
    label: 'Newest First',
    icon: Clock,
    description: 'Show newest comments first'
  },
  {
    value: 'oldest' as CommentSortOption,
    label: 'Oldest First', 
    icon: Clock,
    description: 'Show oldest comments first'
  },
  {
    value: 'most_liked' as CommentSortOption,
    label: 'Most Liked',
    icon: Heart,
    description: 'Show most liked comments first'
  },
  {
    value: 'most_replies' as CommentSortOption,
    label: 'Most Replies',
    icon: MessageCircle,
    description: 'Show comments with most replies first'
  }
];

export function CommentSorting({ sortBy, onSortChange, commentCount }: CommentSortingProps) {
  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-purple" />
        <span className="text-sm font-switzer text-dimLight dark:text-dimDark">
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 font-switzer text-sm"
          >
            {currentSort && <currentSort.icon className="w-4 h-4" />}
            Sort by {currentSort?.label}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-lightBorderColor dark:border-darkBorderColor bg-light dark:bg-dark"
        >
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`font-switzer ${
                sortBy === option.value 
                  ? 'bg-purple/10 text-purple dark:text-purple-300' 
                  : ''
              }`}
            >
              <option.icon className="w-4 h-4 mr-2" />
              <div className="flex flex-col">
                <span>{option.label}</span>
                <span className="text-xs text-dimLight dark:text-dimDark">
                  {option.description}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
