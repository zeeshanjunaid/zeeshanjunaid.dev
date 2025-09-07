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

    // Hide draft posts in production
    if (process.env.NODE_ENV === "production" && meta.draft) {
      notFound();
    }

    return (
      <>
        {/* Blog Post Schema Markup */}
        <SchemaMarkup schema={generateBlogPostSchema(meta)} />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-light via-light to-light/95 dark:from-dark dark:via-dark dark:to-dark/95">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-10 w-80 h-80 bg-purple/8 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple/4 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple/6 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          <Container className="px-4 md:px-7 lg:px-0 py-12 md:py-16 max-w-6xl">
            {/* Navigation */}
            <div className="mb-8">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2 hover:bg-purple/5 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Cover Image - Top */}
            {meta.cover && (
              <div className="mb-12">
                <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={meta.cover}
                    alt={meta.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple rounded-full opacity-70" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple/50 rounded-full opacity-60" />
                </div>
              </div>
            )}

            {/* Hero Content */}
            <div className="max-w-4xl">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {/* Featured Badge */}
                {meta.featured && (
                  <div className="inline-flex items-center gap-2 bg-purple/10 px-4 py-2 rounded-xl">
                    <BookOpen className="w-4 h-4 text-purple" />
                    <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                      Featured Article
                    </span>
                  </div>
                )}

                {/* Date Badge */}
                <div className="inline-flex items-center gap-2 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor px-4 py-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-dark/60 dark:text-light/60" />
                  <span className="text-dark/80 dark:text-light/80 font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    {new Date(meta.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Reading Time */}
                <div className="inline-flex items-center gap-2 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-dark/60 dark:text-light/60" />
                  <span className="text-dark/80 dark:text-light/80 font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    {meta.readingTime} min read
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
                {meta.title}
              </h1>

              {/* Excerpt */}
              <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[18px] md:text-[20px] leading-relaxed mb-8 max-w-3xl">
                {meta.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <p className="font-switzer font-medium text-dark dark:text-light text-[16px]">
                    {meta.author || "Zeeshan Junaid"}
                  </p>
                  <p className="font-switzer font-light text-dark/60 dark:text-light/60 text-[14px]">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <Container className="px-4 md:px-7 lg:px-0 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <article
                  className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-ao prose-headings:text-dark dark:prose-headings:text-light prose-headings:leading-tight
                  prose-h1:text-[28px] md:prose-h1:text-[32px] prose-h1:mb-6 prose-h1:mt-10
                  prose-h2:text-[22px] md:prose-h2:text-[26px] prose-h2:mb-4 prose-h2:mt-8
                  prose-h3:text-[18px] md:prose-h3:text-[22px] prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-dark/90 dark:prose-p:text-light/90 prose-p:font-switzer prose-p:font-light prose-p:leading-relaxed prose-p:text-[16px] md:prose-p:text-[17px] prose-p:mb-5
                  prose-a:text-purple prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-a:duration-300
                  prose-strong:text-dark dark:prose-strong:text-light prose-strong:font-semibold
                  prose-code:text-purple prose-code:bg-purple/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-[14px] prose-code:font-medium
                  prose-pre:bg-dark prose-pre:border prose-pre:border-lightBorderColor dark:prose-pre:border-darkBorderColor prose-pre:rounded-xl prose-pre:p-4 prose-pre:text-[14px]
                  prose-blockquote:border-l-purple prose-blockquote:bg-purple/5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6
                  prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:text-dark/90 dark:prose-li:text-light/90
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6 prose-img:max-h-[550px] prose-img:w-auto prose-img:mx-auto
                  prose-table:border prose-table:border-lightBorderColor dark:prose-table:border-darkBorderColor prose-table:rounded-xl prose-table:overflow-hidden prose-table:text-[14px]
                  prose-th:bg-light dark:prose-th:bg-dark prose-th:border-lightBorderColor dark:prose-th:border-darkBorderColor prose-th:px-4 prose-th:py-2
                  prose-td:border-lightBorderColor dark:prose-td:border-darkBorderColor prose-td:px-4 prose-td:py-2"
                >
                  {content}
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* Article Overview */}
                  <div className="relative bg-light dark:bg-dark rounded-2xl p-5 border border-lightBorderColor dark:border-darkBorderColor">
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20">
                      <h3 className="font-ao font-bold text-[16px] text-dark dark:text-light mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple" />
                        Article Info
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-dark/60 dark:text-light/60 font-switzer">
                            Reading Time
                          </span>
                          <span className="text-dark dark:text-light font-switzer font-medium">
                            {meta.readingTime} min
                          </span>
                        </div>
                        {meta.author && (
                          <div className="flex items-center justify-between text-[13px]">
                            <span className="text-dark/60 dark:text-light/60 font-switzer">
                              Author
                            </span>
                            <span className="text-dark dark:text-light font-switzer font-medium">
                              {meta.author}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Share Section */}
                  <div className="relative bg-light dark:bg-dark rounded-2xl p-5 border border-lightBorderColor dark:border-darkBorderColor">
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20">
                      <h3 className="font-ao font-bold text-[16px] text-dark dark:text-light mb-3 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-purple" />
                        Share Article
                      </h3>
                      <p className="text-dark/60 dark:text-light/60 font-switzer text-[13px] mb-4 leading-relaxed">
                        Found this helpful? Share it with others who might
                        benefit.
                      </p>
                      <Button
                        variant="purple"
                        size="sm"
                        className="w-full rounded-xl uppercase font-medium font-switzer text-[11px] py-2"
                      >
                        Share Article
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  {meta.tags && meta.tags.length > 0 && (
                    <div className="relative bg-light dark:bg-dark rounded-2xl p-5 border border-lightBorderColor dark:border-darkBorderColor">
                      <BlurBG className="rounded-2xl" />
                      <div className="relative z-20">
                        <h3 className="font-ao font-bold text-[16px] text-dark dark:text-light mb-3">
                          Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {meta.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-[10px] px-2.5 py-1 rounded-md border border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 uppercase font-medium bg-light dark:bg-dark hover:bg-purple/5 hover:border-purple/20 transition-all duration-300 cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact CTA */}
                  <div className="relative bg-gradient-to-br from-purple/10 via-purple/5 to-transparent rounded-2xl p-5 border border-purple/20">
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20 text-center">
                      <div className="w-10 h-10 bg-purple/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-5 h-5 text-purple" />
                      </div>
                      <h3 className="font-ao font-bold text-[14px] text-dark dark:text-light mb-2">
                        Need Help With This?
                      </h3>
                      <p className="text-dark/60 dark:text-light/60 font-switzer text-[12px] mb-3 leading-relaxed">
                        I can help implement these solutions in your project.
                      </p>
                      <Link href="/contact">
                        <Button
                          variant="purple"
                          size="sm"
                          className="w-full rounded-xl uppercase font-medium font-switzer text-[11px] py-2"
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

        {/* Enhanced CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-light via-light to-light/95 dark:from-dark dark:via-dark dark:to-dark/95">
          <Container className="px-4 md:px-7 lg:px-0">
            <div className="relative bg-gradient-to-br from-purple/10 via-purple/5 to-transparent rounded-3xl p-8 md:p-12 lg:p-16 text-center overflow-hidden border border-purple/20">
              <BlurBG className="rounded-3xl" />

              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple/5 rounded-full blur-3xl" />

              <div className="relative z-20 max-w-4xl mx-auto">
                {/* Icon */}
                <div className="w-16 h-16 bg-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-purple" />
                </div>

                {/* Title */}
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6 leading-tight">
                  Ready to Apply These{" "}
                  <span className="text-gradient">Insights</span>?
                </h2>

                {/* Description */}
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-3xl mx-auto mb-10">
                  Let&apos;s discuss how I can help implement these strategies
                  and techniques in your next project. With 8+ years of
                  experience, I&apos;ll ensure your ideas become reality.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center">
                    <div className="text-[32px] md:text-[36px] font-bold font-ao text-purple mb-2">
                      100+
                    </div>
                    <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] uppercase tracking-wider">
                      Projects Delivered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[32px] md:text-[36px] font-bold font-ao text-purple mb-2">
                      8+
                    </div>
                    <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] uppercase tracking-wider">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[32px] md:text-[36px] font-bold font-ao text-purple mb-2">
                      50+
                    </div>
                    <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] uppercase tracking-wider">
                      Happy Clients
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      variant="purple"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 w-full sm:w-auto justify-center min-w-[200px] hover:scale-105 transition-all duration-300"
                    >
                      Start Your Project
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/work">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple w-full sm:w-auto justify-center min-w-[200px] border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300"
                    >
                      View Portfolio
                    </Button>
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-lightBorderColor dark:border-darkBorderColor">
                  <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[14px]">
                    Free consultation • No commitment required • Quick response
                    guaranteed
                  </p>
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
