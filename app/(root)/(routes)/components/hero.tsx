"use client";

import AvailabilityBadge from "@/components/availability-badge";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SocialLinks } from "@/components/social-connect";
import { motion } from "framer-motion";

const heroImg = "/images/zeeshan.png";

export const Hero = () => {
  const heroTitle = "I build high-performance web applications that turn visitors into customers.";
  const heroSubtitle = "I'm Zeeshan Junaid, a freelance frontend developer with 8+ years of experience helping businesses like yours succeed online. I specialize in React, Next.js, and modern web technologies.";

  return (
    <section className="overflow-x-hidden w-full md:pt-5 relative">
      <Container
        className="
        mt-8 lg:mt-6
        px-4 lg:px-0     
        flex
        flex-col lg:flex-row
        space-y-4 lg:space-y-0
        relative
    "
      >
        {/* Mobile Hero */}
        <div className="lg:hidden px-2 w-full sm:w-[80%] md:w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
          <div>
            <AvailabilityBadge className="mb-2.5" />
          </div>
          <h1
            className="text-center text-[22px] leading-tight sm:text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light"
          >
            {heroTitle}
          </h1>
          <p className="text-center text-[14px] sm:text-[16px] md:text-[18px] font-light text-dark/80 dark:text-light/80 mt-4 leading-relaxed max-w-2xl">
            {heroSubtitle}
          </p>
        </div>

        {/* Desktop Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex flex-col w-2/3 rounded-3xl px-16 py-12 justify-between flex-1 mr-5 relative overflow-hidden group"
        >
          {/* Animated Background */}
          <motion.div
            initial={{ opacity: 0.25 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.2 }}
            className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl"
          />
          
          {/* Subtle gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.05 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-purple/10 rounded-3xl z-10"
          />

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="z-20 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <AvailabilityBadge className="mb-2.5" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-left text-[32px] 2xl:text-[36px] font-bold font-ao text-dark dark:text-light leading-tight mb-8"
            >
              {heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-left text-[16px] lg:text-[18px] font-light text-dark/80 dark:text-light/80 mb-8 leading-relaxed max-w-2xl"
            >
              {heroSubtitle}
            </motion.p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center space-x-6 min-w-max justify-start z-20 relative"
          >
            <Link href="/hire-me">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className="h-12 rounded-xl uppercase transition-all duration-200 hover:shadow-md hover:shadow-purple/20"
                  size="lg"
                  variant="purple"
                >
                  Start Your Project
                </Button>
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <SocialLinks />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[360px] lg:max-w-full h-[400px] sm:h-[500px] lg:h-full rounded-3xl relative mx-auto lg:w-1/3 -order-1 lg:order-1 group"
        >
          <BlurBG className="rounded-3xl" />

          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 lg:translate-x-0 w-full h-full z-20"
          >
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              fill
              alt="profile"
              src={heroImg}
              priority={true}
              className="scale-110 sm:scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom user-select-none pointer-events-none"
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[360px] lg:max-w-full h-[400px] sm:h-[500px] lg:h-full rounded-3xl relative mx-auto lg:w-1/3 -order-1 lg:order-1 group"
        >
          <BlurBG className="rounded-3xl" />

          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 lg:translate-x-0 w-full h-full z-20"
          >
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              fill
              alt="profile"
              src={heroImg}
              priority={true}
              className="scale-110 sm:scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom user-select-none pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row lg:hidden items-center gap-2 min-w-max justify-center"
        >
          <Link href="/hire-me">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="rounded-xl uppercase transition-all duration-200 hover:shadow-md hover:shadow-purple/20" size="lg" variant="purple">
                Start Your Project
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};