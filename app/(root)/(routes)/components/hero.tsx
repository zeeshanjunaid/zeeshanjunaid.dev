"use client";

import AvailabilityBadge from "@/components/availability-badge";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SocialLinks } from "@/components/social-connect";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Code, Palette, Zap, Star, Users } from "lucide-react";

const heroImg = "/images/zeeshan.png";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handIcon = <span className="animate-waver">👋🏻</span>;
  const heroTitle = (
    <>
      Hello {handIcon}, I'm Zeeshan Junaid, Frontend Engineer with 8+ years of
      experience
    </>
  );

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const stats = [
    { icon: Code, number: "100+", label: "Projects" },
    { icon: Users, number: "50+", label: "Clients" },
    { icon: Star, number: "5.0", label: "Rating" },
    { icon: Zap, number: "8+", label: "Years" },
  ];

  return (
    <section className="overflow-x-hidden w-full md:pt-5 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <Container
        className="
        mt-8 lg:mt-6
        px-4 lg:px-0     
        flex
        flex-col lg:flex-row
        space-y-4 lg:space-y-0
        relative
    "
        ref={ref}
      >
        {/* Mobile Hero */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="lg:hidden px-2 w-full sm:w-[80%] md:w-[90%] mx-auto mt-6 flex flex-col justify-center items-center"
        >
          <motion.div variants={itemVariants}>
            <AvailabilityBadge className="mb-2.5" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-center text-[22px] leading-tight sm:text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light"
          >
            {heroTitle}
          </motion.h1>
        </motion.div>

        {/* Desktop Hero Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="hidden lg:flex flex-col w-2/3 rounded-3xl px-16 py-12 justify-between flex-1 mr-5 relative overflow-hidden group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Enhanced Background with Mouse Interaction */}
          <motion.div
            className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl"
            animate={{
              background: isHovered
                ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(163, 116, 255, 0.15) 0%, rgba(163, 116, 255, 0.05) 50%, transparent 100%)`
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating Decorative Elements */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-8 right-8 w-4 h-4 bg-purple/30 rounded-full z-20"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute bottom-12 left-12 w-2 h-2 bg-purple/40 rounded-full z-20"
            transition={{ delay: 1 }}
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-1/2 right-20 w-3 h-3 bg-purple/20 rounded-full z-20"
            transition={{ delay: 2 }}
          />

          {/* Content */}
          <div className="z-20 relative">
            <motion.div variants={itemVariants}>
              <AvailabilityBadge className="mb-2.5" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-left text-[32px] 2xl:text-[36px] font-bold font-ao text-dark dark:text-light leading-tight mb-8"
            >
              {heroTitle}
            </motion.h1>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-5 h-5 text-purple" />
                  </div>
                  <div className="text-[18px] font-bold font-ao text-dark dark:text-light group-hover:text-purple transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-[10px] font-switzer font-light text-dark/70 dark:text-light/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 min-w-max justify-start z-20 relative"
          >
            <Link href="/hire-me">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="h-12 rounded-xl uppercase group relative overflow-hidden"
                  size="lg"
                  variant="purple"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple to-purple/80"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <SocialLinks />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Image Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={imageVariants}
          className="w-full max-w-[360px] lg:max-w-full h-[265px] sm:h-[355px] rounded-3xl relative mx-auto lg:w-1/3 -order-1 lg:order-1 group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <BlurBG className="rounded-3xl" />
          
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(45deg, transparent, rgba(163, 116, 255, 0.3), transparent)",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="absolute inset-[2px] bg-light dark:bg-dark rounded-3xl" />

          {/* Floating Elements around Image */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-purple/20 rounded-full blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple/30 rounded-full blur-sm"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Image Container */}
          <div className="absolute bottom-0 left-2/3 lg:left-auto lg:right-0 -translate-x-3/4 lg:translate-x-0 w-full h-full z-20">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              fill
              alt="profile"
              src={heroImg}
              priority={true}
              className="scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom transition-all duration-1000 user-select-none pointer-events-none group-hover:scale-[130%] lg:group-hover:scale-[140%]"
            />
          </div>

          {/* Skill Tags Floating Around */}
          <motion.div
            className="absolute top-4 left-4 bg-white/90 dark:bg-dark/90 backdrop-blur-sm px-3 py-1 rounded-xl text-purple font-switzer font-medium text-[10px] uppercase tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            whileHover={{ scale: 1.05 }}
          >
            React Expert
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-4 bg-white/90 dark:bg-dark/90 backdrop-blur-sm px-3 py-1 rounded-xl text-purple font-switzer font-medium text-[10px] uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            whileHover={{ scale: 1.05 }}
          >
            UI/UX Designer
          </motion.div>
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="flex flex-col sm:flex-row lg:hidden items-center gap-2 min-w-max justify-center"
        >
          <Link href="/hire-me">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="rounded-xl uppercase" size="lg" variant="purple">
                Start a Project
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};