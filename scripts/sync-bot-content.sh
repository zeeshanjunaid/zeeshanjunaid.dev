#!/bin/bash

# Script to sync content from portfolio-content-bot to main portfolio
# This ensures all AI-generated blog posts and assets are properly integrated

set -e

# Configuration
BOT_DIR="/Users/apple/Downloads/projects/portfolio-content-bot"
PORTFOLIO_DIR="/Users/apple/Downloads/projects/zeeshanjunaid.dev"

echo "🔄 Syncing content from portfolio-content-bot to main portfolio..."

# Check if bot directory exists
if [ ! -d "$BOT_DIR" ]; then
    echo "❌ Bot directory not found: $BOT_DIR"
    exit 1
fi

# Sync blog posts
echo "📝 Syncing blog posts..."
if [ -d "$BOT_DIR/content/blog" ]; then
    cp -r "$BOT_DIR/content/blog"/* "$PORTFOLIO_DIR/content/blog/" 2>/dev/null || true
    echo "✅ Blog posts synced"
else
    echo "⚠️  No blog content found in bot directory"
fi

# Sync OG images
echo "🖼️  Syncing OG images..."
if [ -d "$BOT_DIR/public/images/og" ]; then
    cp -r "$BOT_DIR/public/images/og"/* "$PORTFOLIO_DIR/public/images/og/" 2>/dev/null || true
    echo "✅ OG images synced"
else
    echo "⚠️  No OG images found in bot directory"
fi

# Sync diagrams
echo "📊 Syncing diagrams..."
if [ -d "$BOT_DIR/public/diagrams" ]; then
    cp -r "$BOT_DIR/public/diagrams"/* "$PORTFOLIO_DIR/public/diagrams/" 2>/dev/null || true
    echo "✅ Diagrams synced"
else
    echo "⚠️  No diagrams found in bot directory"
fi

# Check for new content
echo "🔍 Checking for new content..."
NEW_POSTS=$(find "$BOT_DIR/content/blog" -name "*.mdx" -newer "$PORTFOLIO_DIR/content/blog" 2>/dev/null | wc -l)
if [ "$NEW_POSTS" -gt 0 ]; then
    echo "📰 Found $NEW_POSTS new blog post(s)"
else
    echo "✅ No new content to sync"
fi

echo "🎉 Content sync completed!"
echo ""
echo "Next steps:"
echo "1. Review the synced content"
echo "2. Test the blog posts on the website"
echo "3. Commit changes to git if everything looks good"
