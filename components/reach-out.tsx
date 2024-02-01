"use client";

import { ResumeButton, SocialLinks } from "@/components/social-connect";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import React from "react";
import { motion } from "framer-motion";

const ReachOut = () => {
  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative">
      <motion.div
        initial="intial"
        whileHover="whileHover"
        className="py-8 px-5 md:p-12  lg:p-16 rounded-3xl relative flex flex-col justify-between items-start gap-y-[120px] md:gap-y-[140px] lg:gap-y-[160px] overflow-hidden"
      >
        <motion.div
          variants={{
            initial: {
              scale: 1,
            },
            whileHover: {
              scale: 1.5,
            },
          }}
          className="react-out-gradient w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] blur-[25px] rounded-full absolute -bottom-[50px] -right-[100px] lg:-bottom[50px] lg:-right-[60px] z-[5] opacity-80 dark:opacity-60 origin-center"
          animate={{
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            x: [0, -25, -50, -25, 0, 25, 50, 25, 0],
            y: [0, 10, 25, 10, 0, -10, -25, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            type: "tween",
            duration: 16,
          }}
        />
        <BlurBG className="rounded-3xl" />
        <div className="relative z-[30]">
          <h2 className="mb-6 font-ao text-[24px] md:text-[36px] lg:text-[42px] font-bold text-gradient">
            Want to work together?
          </h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <a
              className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light underline underline-purple underline-offset-4 hover:text-dark/90 dark:hover:text-light/90 transition-color duration-200"
              href="mailto:hello@zeeshanjunaid.dev"
            >
              hello[at]zeeshanjunaid[dot]dev
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-max xs:w-full  items-start gap-3 justify-start z-[30] relative">
          <ResumeButton className="w-full xs:w-auto" />
          <div className="flex flex-wrap sm:flex-nowrap justify-start space-x-3">
            <SocialLinks />
          </div>
        </div>
      </motion.div>
      <div className="reactout-gradient absolute w-[350px] h-[350px] bottom-0 right-0 z-20 rounded-full opacity-70" />
    </Container>
  );
};

export default ReachOut;
