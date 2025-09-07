import { AnchorLink, EnhancedHeading } from '@/components/mdx/enhanced-headings';
import { AuthorBio, CTABox, NewsletterSignup, RelatedPosts } from '@/components/mdx/engagement-components';
import { Blockquote, Callout } from '@/components/mdx/blockquote';
import { CodeBlock, InlineCode } from '@/components/mdx/code-block';
import { ComparisonTable, ImageGallery, ProcessSteps, VideoEmbed } from '@/components/mdx/visual-components';
import { EnhancedTable, SimpleTable } from '@/components/mdx/enhanced-table';
import { ReadingProgress, TableOfContents } from '@/components/mdx/reading-progress';

import React from 'react';
import { SocialShare } from '@/components/mdx/social-share';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const root = process.cwd();
const postsDirectory = path.join(root, 'content', 'blog');

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  slug: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  cover?: string;
  coverImage?: string;
  draft?: boolean;
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const { data, content } = matter(fileContent);

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
      components: {
        // Custom code blocks
        pre: ({ children, ...props }: any) => {
          const child = children?.props;
          if (child?.className?.includes('language-')) {
            // eslint-disable-next-line react/no-children-prop
            return React.createElement(CodeBlock, { 
              className: child.className,
              filename: child.filename,
              children: child.children
            });
          }
          return React.createElement('pre', props, children);
        },
        code: ({ children, className, ...props }: any) => {
          // Inline code (not in pre blocks)
          if (!className) {
            // eslint-disable-next-line react/no-children-prop
            return React.createElement(InlineCode, { children });
          }
          // Block code (handled by pre component)
          return React.createElement('code', { className, ...props }, children);
        },
        // Enhanced headings with anchor links
        h1: (props: any) => React.createElement(EnhancedHeading, { level: 1, ...props }),
        h2: (props: any) => React.createElement(EnhancedHeading, { level: 2, ...props }),
        h3: (props: any) => React.createElement(EnhancedHeading, { level: 3, ...props }),
        h4: (props: any) => React.createElement(EnhancedHeading, { level: 4, ...props }),
        h5: (props: any) => React.createElement(EnhancedHeading, { level: 5, ...props }),
        h6: (props: any) => React.createElement(EnhancedHeading, { level: 6, ...props }),
        // Enhanced links
        a: (props: any) => React.createElement(AnchorLink, { external: props.href?.startsWith('http'), ...props }),
        // Table components
        table: (props: any) => React.createElement(SimpleTable, props),
        // Custom components
        Blockquote,
        Callout,
        EnhancedTable,
        SimpleTable,
        ReadingProgress,
        TableOfContents,
        SocialShare,
        ImageGallery,
        VideoEmbed,
        ProcessSteps,
        ComparisonTable,
        NewsletterSignup,
        CTABox,
        AuthorBio,
        RelatedPosts,
      },
    });

    return { 
      meta: { 
        ...data, 
        slug: realSlug,
        // Normalize cover image field - prefer coverImage over cover
        cover: data.coverImage || data.cover,
        coverImage: undefined  // Remove duplicate field
      } as PostMeta, 
      content: mdxContent 
    };
  } catch (error) {
    throw new Error(`Post not found: ${slug}`);
  }
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  let posts: PostMeta[] = [];
  const seenSlugs = new Set<string>();
  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    try {
      const { meta } = await getPostBySlug(slug);
      if (!seenSlugs.has(meta.slug)) {
        // Filter out drafts in production
        if (process.env.NODE_ENV === 'production' && meta.draft) {
          continue;
        }
        posts.push(meta);
        seenSlugs.add(meta.slug);
      }
    } catch (error) {
      console.warn(`Failed to load post: ${file}`);
    }
  }
  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMeta();
  return allPosts.filter(post => post.featured).slice(0, 3);
}

export async function getLatestPosts(limit: number = 3): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMeta();
  return allPosts.slice(0, limit);
}