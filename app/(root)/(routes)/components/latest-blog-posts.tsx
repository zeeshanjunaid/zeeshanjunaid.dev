"use client";

import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

interface LatestBlogPostsProps {
  posts: PostMeta[];
}

const LatestBlogPosts = ({ posts }: LatestBlogPostsProps) => {
  if (posts.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Container className="flex flex-col gap-y-8 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
            <div className="flex flex-col space-y-[6px]">
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
            </div>
            From the Blog
          </h2>
          <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
            Latest Insights & Expertise
          </h3>
          <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-3xl">
            Practical advice and real-world insights from building high-performance web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="relative bg-light dark:bg-dark rounded-3xl p-8 overflow-hidden h-full border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 group-hover:scale-105">
                  <BlurBG className="rounded-3xl" />
                  
                  <div className="relative z-20 flex flex-col h-full">
                    {/* Featured Badge */}
                    {post.featured && (
                      <div className="inline-flex items-center gap-2 bg-purple/10 px-3 py-1.5 rounded-xl mb-4 w-fit">
                        <BookOpen className="w-4 h-4 text-purple" />
                        <span className="text-purple font-switzer font-medium text-[10px] md:text-[12px] uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                    )}

                    <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-4 group-hover:text-purple transition-colors duration-300 leading-tight flex-1">
                      {post.title}
                    </h3>
                    
                    <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-dark/60 dark:text-light/60 pt-4 border-t border-lightBorderColor dark:border-darkBorderColor">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-switzer font-light text-[12px]">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-switzer font-light text-[12px]">
                            {post.readingTime}m
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-dark/40 dark:text-light/40 group-hover:text-purple group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Blog CTA */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link href="/blog">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2 mx-auto"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default LatestBlogPosts;