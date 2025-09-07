import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { CodeBlock, InlineCode } from '@/components/mdx/code-block';
import { MermaidDiagram } from '@/components/mdx/dynamic-mermaid';
import React from 'react';

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
            return React.createElement(InlineCode, { children });
          }
          // Block code (handled by pre component)
          return React.createElement('code', { className, ...props }, children);
        },
        // Mermaid diagrams
        mermaid: MermaidDiagram,
      },
    });

    return { 
      meta: { ...data, slug: realSlug } as PostMeta, 
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