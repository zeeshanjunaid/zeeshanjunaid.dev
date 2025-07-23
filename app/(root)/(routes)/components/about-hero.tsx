"use client";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Calendar, Coffee } from "lucide-react";

const heroImg = "/images/zeeshan.png";

const paragraphStyles =
  "text-[16px] lg:text-[18px] text-dark/80 dark:text-light/80 leading-relaxed font-light";

const AboutHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { number: "8+", label: "Years Experience" },
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5.0", label: "Average Rating" },
  ];

  return (
    <section className="overflow-x-hidden w-full relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/3 rounded-full blur-3xl" />
      </div>

      <Container className="mt-8 lg:mt-6 px-4 lg:px-0 flex flex-col md:flex-row gap-x-0 md:gap-x-6 lg:gap-x-12">
        {/* Content Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:flex flex-col w-full lg:w-2/3 px-6 md:px-0 lg:pr-8 py-12 md:py-8 justify-start flex-1 relative"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-purple" />
              <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                About Me
              </span>
            </div>
            
            <h1 className="text-left text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
              More Than a Developer—I&apos;m Your{" "}
              <span className="text-gradient">Partner in Building</span>{" "}
              Digital Excellence.
            </h1>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="relative bg-light dark:bg-dark rounded-2xl p-4 overflow-hidden">
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple" />
                  <div>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-[14px] font-switzer font-medium text-dark dark:text-light">
                      Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-light dark:bg-dark rounded-2xl p-4 overflow-hidden">
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple" />
                  <div>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      Experience
                    </p>
                    <p className="text-[14px] font-switzer font-medium text-dark dark:text-light">
                      8+ Years
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-light dark:bg-dark rounded-2xl p-4 overflow-hidden">
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20 flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-purple" />
                  <div>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      Status
                    </p>
                    <p className="text-[14px] font-switzer font-medium text-dark dark:text-light">
                      Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div variants={containerVariants} className="space-y-6 mb-8">
            <motion.p variants={itemVariants} className={paragraphStyles}>
              Hello! I&apos;m Zeeshan. I believe that the best websites and applications are born from a deep understanding of the business goals they serve. My passion isn&apos;t just about writing clean code; it&apos;s about building digital solutions that drive growth, engage users, and deliver measurable results.
            </motion.p>

            <motion.p variants={itemVariants} className={paragraphStyles}>
              My approach is collaborative and transparent. I work closely with you to understand your vision, challenge assumptions, and transform your ideas into a robust, scalable, and beautiful final product. I particularly enjoy partnering with innovative US-based startups and brands to bring their ambitious ideas to life on a global scale.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="relative bg-light dark:bg-dark rounded-2xl p-6 my-8 overflow-hidden"
            >
              <BlurBG className="rounded-2xl" />
              <div className="relative z-20">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple text-[18px]">&quot;</span>
                  </div>
                  <div>
                    <p className="font-ao text-[18px] md:text-[20px] text-dark dark:text-light leading-relaxed italic mb-2">
                      &quot;The best digital solutions are born from understanding business goals, not just technical requirements.&quot;
                    </p>
                    <p className="text-[14px] font-switzer font-light text-dark/60 dark:text-light/60">
                      — My Philosophy
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <div className="text-[24px] md:text-[28px] lg:text-[32px] font-bold font-ao text-dark dark:text-light mb-1 group-hover:text-purple transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-[10px] md:text-[12px] font-switzer font-light text-dark/70 dark:text-light/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start"
          >
            <Link href="/contact">
              <Button
                variant="purple"
                size="lg"
                className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 w-full sm:w-auto justify-center min-w-[200px]"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/work">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple w-full sm:w-auto justify-center min-w-[200px]"
              >
                View My Work
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          className="w-full max-w-[360px] lg:max-w-full h-[265px] sm:h-[355px] rounded-3xl relative mx-auto lg:w-1/3 -order-1 md:order-1 md:sticky md:top-[140px] group mt-4 sm:mt-6 md:mt-0"
        >
          <BlurBG className="rounded-3xl" />
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple/20 rounded-full blur-sm group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple/30 rounded-full blur-sm group-hover:scale-110 transition-transform duration-700" />
          
          <div className="absolute bottom-0 left-2/3 lg:left-auto lg:right-0 -translate-x-3/4 lg:translate-x-0 w-full h-full z-20">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Zeeshan Junaid - Frontend Developer"
              src={heroImg}
              className="scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom transition-all duration-1000 user-select-none pointer-events-none md:group-hover:scale-[140%]"
              priority
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutHero;