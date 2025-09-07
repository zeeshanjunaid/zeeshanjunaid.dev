export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string
          post_slug: string
          content: string
          author_id: string | null
          author_name: string | null
          author_email: string | null
          author_avatar: string | null
          parent_id: string | null
          is_approved: boolean
          is_deleted: boolean
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_slug: string
          content: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          author_avatar?: string | null
          parent_id?: string | null
          is_approved?: boolean
          is_deleted?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_slug?: string
          content?: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          author_avatar?: string | null
          parent_id?: string | null
          is_approved?: boolean
          is_deleted?: boolean
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      comment_likes: {
        Row: {
          id: string
          comment_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          comment_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          comment_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Comment = Database['public']['Tables']['comments']['Row']
export type CommentInsert = Database['public']['Tables']['comments']['Insert']
export type CommentUpdate = Database['public']['Tables']['comments']['Update']

export type CommentLike = Database['public']['Tables']['comment_likes']['Row']
export type CommentLikeInsert = Database['public']['Tables']['comment_likes']['Insert']

// Extended comment type with nested replies
export interface CommentWithReplies extends Comment {
  replies?: CommentWithReplies[]
  user_has_liked?: boolean
}

// Comment form data
export interface CommentFormData {
  content: string
  parent_id?: string | null
}
