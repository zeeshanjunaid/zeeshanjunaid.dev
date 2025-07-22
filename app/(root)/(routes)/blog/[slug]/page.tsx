import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { meta } = await getPostBySlug(params.slug);
    return {
      title: `${meta.title} - Blog`,
      description: meta.excerpt,
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        url: `https://zeeshanjunaid.dev/blog/${params.slug}`,
        type: 'article',
        publishedTime: meta.date,
        authors: [meta.author || 'Zeeshan Junaid'],
        tags: meta.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.excerpt,
      }
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "This post could not be found."
    };
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { meta } = await getPostBySlug(params.slug);
    return {
      title: `${meta.title} - Blog`,
      description: meta.excerpt,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  try {
    const { meta, content } = await getPostBySlug(slug);

    return (
      <>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
          </div>

          <Container className="px-4 md:px-7 lg:px-0 py-16 md:py-20">
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Article Header */}
            <div className="max-w-4xl">
              {/* Featured Badge */}
              {meta.featured && (
                <div className="inline-flex items-center gap-2 bg-purple/10 px-4 py-2 rounded-xl mb-6">
                  <BookOpen className="w-4 h-4 text-purple" />
                  <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    Featured Article
                  </span>
                </div>
              )}

              <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
                {meta.title}
              </h1>

              <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[18px] md:text-[20px] leading-relaxed mb-8">
                {meta.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-dark/60 dark:text-light/60 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-switzer font-light text-[16px]">
                    {new Date(meta.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-switzer font-light text-[16px]">
                    {meta.readingTime} min read
                  </span>
                </div>
                {meta.author && (
                  <div className="flex items-center gap-2">
                    <span className="font-switzer font-light text-[16px]">
                      By {meta.author}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {meta.tags && meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {meta.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[12px] md:text-[14px] px-4 py-2 rounded-xl border border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 uppercase font-medium bg-light dark:bg-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0">
            <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
              <BlurBG className="rounded-3xl" />
              
              <article className="relative z-20 prose prose-lg dark:prose-invert max-w-none prose-headings:font-ao prose-headings:text-dark dark:prose-headings:text-light prose-p:text-dark/90 dark:prose-p:text-light/90 prose-p:font-switzer prose-p:font-light prose-p:leading-relaxed prose-a:text-purple prose-a:no-underline hover:prose-a:underline prose-strong:text-dark dark:prose-strong:text-light prose-code:text-purple prose-code:bg-purple/10 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                {content}
              </article>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0">
            <div className="relative bg-light dark:bg-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <BlurBG className="rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-purple/5 rounded-3xl" />
              
              <div className="relative z-20">
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
                  Ready to Apply These Insights?
                </h2>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-2xl mx-auto mb-8">
                  Let&apos;s discuss how I can help implement these strategies and techniques in your next project.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      variant="purple"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2"
                    >
                      Start Your Project
                    </Button>
                  </Link>
                  <Link href="/work">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple"
                    >
                      View My Work
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