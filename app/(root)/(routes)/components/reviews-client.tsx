"use client";

import ReviewsList, { VideoReviewsList } from "@/data/reviews";
import { Container } from "@/components/container";
import MasonryLayout from "../components/masonry-layout";
import React from "react";
import TestimonialCard from "../components/testimonial-card";
import VideoModal from "../components/video-modal";
import { motion } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import { Star, Users, MessageCircle, Award, Play } from "lucide-react";

const ReviewsPageClient = () => {
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { icon: Star, number: "5.0", label: "Average Rating" },
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: MessageCircle, number: "100+", label: "Reviews" },
    { icon: Award, number: "99%", label: "Satisfaction" },
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="border-b-[1px] border-b-lightBorderColor dark:border-b-darkBorderColor pb-16 md:pb-20">
          <Container className="px-4 md:px-7 lg:px-0 flex flex-col justify-between items-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-y-6 max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-[2px] bg-purple" />
                <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                  Client Testimonials
                </span>
              </div>

              <h1 className="leading-tight text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light">
                What Clients Say About{" "}
                <span className="text-gradient">Working With Me</span>
              </h1>

              <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-dark/80 dark:text-light/80 max-w-3xl">
                Real feedback from clients who have experienced the quality,
                professionalism, and results that define my work. These
                testimonials reflect the deep connections and success stories
                built through collaborative excellence.
              </p>
            </motion.div>
          </Container>
        </div>
      </motion.section>

      {/* Video Reviews Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-3xl" />
        </div>

        <Container className="px-4 md:px-7 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Video Testimonials
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Hear directly from clients about their experience working with me
              and the results we achieved together.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex justify-start items-start gap-8 overflow-x-auto pb-8 scrollbar-hide px-2"
          >
            {VideoReviewsList.map(
              ({ client, video, profile, country }, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-shrink-0 group"
                >
                  <VideoModal
                    client={client}
                    profile={profile}
                    video={video}
                    country={country}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </Container>
      </section>

      {/* Written Reviews Section */}
      <section className="py-16 md:py-20">
        <Container className="px-4 md:px-7 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Client Reviews
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Detailed feedback and testimonials from clients across various
              industries and project types.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <MasonryLayout>
              {ReviewsList.map((review, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="masonry-item"
                >
                  <TestimonialCard review={review} className="" />
                </motion.div>
              ))}
            </MasonryLayout>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-20"
      >
        <Container className="px-4 md:px-7 lg:px-0">
          <div className="relative bg-light dark:bg-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <BlurBG className="rounded-3xl" />

            <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-purple/5 rounded-3xl" />

            <div className="relative z-20">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
                Ready to Join These Success Stories?
              </h2>
              <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-2xl mx-auto mb-8">
                Let&apos;s create your next success story together. Experience the
                same level of quality, professionalism, and results that these
                clients have enjoyed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple hover:bg-purple/80 text-white rounded-xl uppercase font-medium font-switzer text-[14px] transition-colors duration-300"
                >
                  Start Your Project
                </motion.a>
                <motion.a
                  href="/work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-lightBorderColor dark:border-darkBorderColor hover:border-purple text-dark dark:text-light hover:text-purple rounded-xl uppercase font-medium font-switzer text-[14px] transition-all duration-300"
                >
                  View My Work
                </motion.a>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  );
};

export default ReviewsPageClient;