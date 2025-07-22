import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

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
  
  for (const file of mdxFiles) {
    try {
      const { meta } = await getPostBySlug(file);
      posts.push(meta);
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