"use client";

import { Container } from "@/components/container";
import React from "react";
import { motion } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import { Search, Code, Rocket } from "lucide-react";

const MyApproach = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const steps = [
    {
      number: "01",
      title: "Discover & Define",
      icon: Search,
      description: "We start with a deep dive into your business goals and user needs. This ensures that what we build is not just technically sound, but also strategically aligned with your vision for success."
    },
    {
      number: "02", 
      title: "Design & Develop",
      icon: Code,
      description: "Leveraging my expertise in UI/UX and modern frontend technologies, I bring your vision to life with a focus on clean code, seamless user experience, and scalable architecture."
    },
    {
      number: "03",
      title: "Deliver & Debrief", 
      icon: Rocket,
      description: "I deliver a polished, production-ready application and provide a comprehensive handover. We'll review the project together to ensure it meets your expectations and sets you up for future growth."
    }
  ];

  return (
    <Container className="flex flex-col gap-y-8 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6 justify-center">
            <div className="flex flex-col space-y-[6px]">
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
            </div>
            My Approach
          </h2>
          <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
            From Idea to Impact: My 3-Step Process
          </h3>
          <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-3xl mx-auto">
            I don&apos;t just code—I partner with you to create strategic solutions that drive real business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-10 overflow-hidden h-full border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 group-hover:scale-105">
                <BlurBG className="rounded-3xl" />
                
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-[48px] md:text-[56px] font-ao font-bold text-purple/10 group-hover:text-purple/20 transition-colors duration-300">
                  {step.number}
                </div>

                <div className="relative z-20">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple/20 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-purple" />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-4 group-hover:text-purple transition-colors duration-300">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default MyApproach;