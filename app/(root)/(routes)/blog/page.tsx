import { getAllPostsMeta } from "@/lib/posts";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Blog & Articles",
  description: "Expert insights on web development, UI/UX design, and digital strategy. Learn from real-world projects and industry best practices.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="border-b-[1px] border-b-lightBorderColor dark:border-b-darkBorderColor pb-16 md:pb-20">
          <Container className="px-4 pt-4 md:pt-7 md:px-7 lg:px-0">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-purple" />
                <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                  Knowledge Hub
                </span>
              </div>

              <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
                Expert Insights on{" "}
                <span className="text-gradient">Modern Web Development</span>
              </h1>

              <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-dark/80 dark:text-light/80 max-w-3xl mb-8">
                Practical advice, case studies, and technical insights from 8+ years of building 
                high-performance web applications. Learn the strategies and techniques that drive real business results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-purple" />
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light">
                    {posts.length}
                  </div>
                  <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px]">
                    Articles
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple" />
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light">
                    100+
                  </div>
                  <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px]">
                    Projects
                  </div>
                </div>

                <div className="text-center col-span-2 md:col-span-1">
                  <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-purple" />
                  </div>
                  <div className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light">
                    8+
                  </div>
                  <div className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px]">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 md:py-20">
        <Container className="px-4 md:px-7 lg:px-0 flex flex-col">
          {posts.length > 0 ? (
            <div className="flex flex-col space-y-6 md:space-y-8">
              {posts.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                  <article className="group relative bg-light dark:bg-dark rounded-3xl p-8 md:p-10 overflow-hidden border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 hover:scale-[1.01]">
                    <BlurBG className="rounded-3xl" />
                    
                    <div className="relative z-20">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          {/* Featured Badge */}
                          {post.featured && (
                            <div className="inline-flex items-center gap-2 bg-purple/10 px-3 py-1.5 rounded-xl mb-4">
                              <TrendingUp className="w-4 h-4 text-purple" />
                              <span className="text-purple font-switzer font-medium text-[12px] uppercase tracking-wider">
                                Featured
                              </span>
                            </div>
                          )}

                          <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold font-ao text-dark dark:text-light mb-4 group-hover:text-purple transition-colors duration-300 leading-tight">
                            {post.title}
                          </h2>
                          
                          <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                            {post.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center gap-6 text-dark/60 dark:text-light/60">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-switzer font-light text-[14px]">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-switzer font-light text-[14px]">
                                {post.readingTime} min read
                              </span>
                            </div>
                          </div>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-[10px] md:text-[12px] px-3 py-1.5 rounded-lg border border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 uppercase font-medium bg-light dark:bg-dark"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Read More Arrow */}
                        <div className="flex items-center justify-center w-12 h-12 bg-light dark:bg-dark rounded-2xl border border-lightBorderColor dark:border-darkBorderColor group-hover:border-purple/30 group-hover:bg-purple/5 transition-all duration-300 flex-shrink-0">
                          <ArrowRight className="w-5 h-5 text-dark dark:text-light group-hover:text-purple group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="relative bg-light dark:bg-dark rounded-3xl p-12 md:p-16 overflow-hidden max-w-2xl mx-auto">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20">
                  <div className="w-16 h-16 mx-auto mb-6 bg-purple/10 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-purple" />
                  </div>
                  <h3 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-4">
                    Coming Soon
                  </h3>
                  <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                    I&apos;m working on creating valuable content that will help you build better web applications. 
                    Check back soon for expert insights and practical tutorials.
                  </p>
                  <Link href="/contact">
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-xl uppercase font-medium font-switzer text-[14px] transition-colors duration-300">
                      Get Notified When I Publish
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}