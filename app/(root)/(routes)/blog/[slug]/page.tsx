import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Share2,
} from "lucide-react";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SchemaMarkup } from "@/components/schema-markup";
import { generateBlogPostSchema } from "@/lib/schema";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { meta } = await getPostBySlug(params.slug);
    return {
      title: `${meta.title} - Blog`,
      description: meta.excerpt,
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        url: `https://zeeshanjunaid.dev/blog/${params.slug}`,
        type: "article",
        publishedTime: meta.date,
        authors: [meta.author || "Zeeshan Junaid"],
        tags: meta.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const { meta, content } = await getPostBySlug(slug);

    return (
      <>
        {/* Blog Post Schema Markup */}
        <SchemaMarkup schema={generateBlogPostSchema(meta)} />

        {/* Simplified Hero Section */}
        <section className="py-12 md:py-16">
          <Container className="px-4 md:px-7 lg:px-0 max-w-4xl">
            {/* Navigation */}
            <div className="mb-8">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2 hover:bg-purple/5 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {meta.featured && (
                <span className="text-purple font-switzer font-medium text-[12px] uppercase tracking-wider bg-purple/10 px-3 py-1 rounded-lg">
                  Featured
                </span>
              )}
              <span className="text-dark/60 dark:text-light/60 font-switzer text-[14px]">
                {new Date(meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-dark/60 dark:text-light/60 font-switzer text-[14px]">
                {meta.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
              {meta.title}
            </h1>

            {/* Excerpt */}
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-8">
              {meta.excerpt}
            </p>

            {/* Cover Image */}
            {meta.cover && (
              <div className="mb-12">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
                  <Image
                    src={meta.cover}
                    alt={meta.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* Article Content */}
        <section>
          <Container className="px-4 md:px-7 lg:px-0 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-ao prose-headings:text-dark dark:prose-headings:text-light
                  prose-h2:text-[24px] prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-[20px] prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-dark/90 dark:prose-p:text-light/90 prose-p:font-switzer prose-p:leading-relaxed prose-p:text-[16px] prose-p:mb-4
                  prose-a:text-purple prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
                  prose-strong:text-dark dark:prose-strong:text-light prose-strong:font-medium
                  prose-code:text-purple prose-code:bg-purple/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-[14px]
                  prose-pre:bg-dark prose-pre:border prose-pre:border-lightBorderColor dark:prose-pre:border-darkBorderColor prose-pre:rounded-2xl prose-pre:p-4
                  prose-blockquote:border-l-4 prose-blockquote:border-purple prose-blockquote:bg-purple/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-ul:mb-4 prose-ol:mb-4 prose-li:text-dark/90 dark:prose-li:text-light/90
                  prose-img:rounded-2xl prose-img:my-8"
                >
                  {content}
                </article>
              </div>

              {/* Simplified Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Tags */}
                  {meta.tags && meta.tags.length > 0 && (
                    <div className="relative bg-light dark:bg-dark rounded-3xl p-6 border border-lightBorderColor dark:border-darkBorderColor">
                      <BlurBG className="rounded-3xl" />
                      <div className="relative z-20">
                        <h3 className="font-ao font-bold text-[16px] text-dark dark:text-light mb-4">
                          Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {meta.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-[12px] px-3 py-1 rounded-lg bg-purple/10 text-purple uppercase font-medium tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author Card */}
                  <div className="relative bg-light dark:bg-dark rounded-3xl p-6 border border-lightBorderColor dark:border-darkBorderColor">
                    <BlurBG className="rounded-3xl" />
                    <div className="relative z-20 text-center">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6 text-purple" />
                      </div>
                      <h4 className="font-ao font-bold text-[16px] text-dark dark:text-light mb-2">
                        {meta.author || "Zeeshan Junaid"}
                      </h4>
                      <p className="text-dark/60 dark:text-light/60 font-switzer text-[14px] mb-4">
                        Frontend Developer with 8+ years of experience
                      </p>
                      <Link href="/contact">
                        <Button
                          variant="purple"
                          size="sm"
                          className="w-full rounded-xl font-switzer text-[12px] uppercase font-medium"
                        >
                          Get in Touch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Simple CTA Section */}
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0 max-w-4xl">
            <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-12 text-center border border-lightBorderColor dark:border-darkBorderColor">
              <BlurBG className="rounded-3xl" />
              
              <div className="relative z-20">
                <h2 className="text-[24px] md:text-[32px] font-bold font-ao text-dark dark:text-light mb-4">
                  Questions about this post?
                </h2>
                
                <p className="text-dark/70 dark:text-light/70 font-switzer text-[16px] leading-relaxed mb-8 max-w-2xl mx-auto">
                  I&apos;d love to help you implement these concepts in your own projects.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      variant="purple"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 justify-center hover:scale-105 transition-all duration-300"
                    >
                      Get in Touch
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300"
                    >
                      Read More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  } catch (e) {
    notFound();
  }
}
