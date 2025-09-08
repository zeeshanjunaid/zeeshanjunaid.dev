-- Comment reports table for reporting inappropriate comments
CREATE TABLE comment_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, reporter_id) -- Prevent duplicate reports from same user
);

-- Indexes for performance
CREATE INDEX idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX idx_comment_reports_reporter_id ON comment_reports(reporter_id);
CREATE INDEX idx_comment_reports_status ON comment_reports(status);
CREATE INDEX idx_comment_reports_created_at ON comment_reports(created_at DESC);

-- Function to update updated_at timestamp
CREATE TRIGGER update_comment_reports_updated_at 
    BEFORE UPDATE ON comment_reports 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

-- Comment reports policies
CREATE POLICY "Comment reports are viewable by reporters and admins" ON comment_reports
    FOR SELECT USING (
        auth.uid() = reporter_id OR 
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Users can insert their own reports" ON comment_reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can update report status" ON comment_reports
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE comment_reports;
