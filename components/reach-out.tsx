"use client";

import { ResumeButton, SocialLinks } from "@/components/social-connect";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import CustomLink from "./custom-link";
import React from "react";
import { motion } from "framer-motion";


const ReachOut = () => {
  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative">
      <motion.div
        initial="initial"
        whileHover="whileHover"
        className="py-8 px-5 md:p-12 lg:p-16 rounded-3xl relative flex flex-col justify-between items-start gap-y-[120px] md:gap-y-[140px] lg:gap-y-[160px] overflow-hidden group cursor-pointer"
      >
        <motion.div
          variants={{
            initial: {
              scale: 1,
              rotate: 0,
            },
            whileHover: {
              scale: 1.2,
              rotate: 45,
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
            duration: 20,
          }}
        />
        <BlurBG className="rounded-3xl" />
        
        {/* Floating particles */}
        <motion.div
          className="absolute inset-0 z-[15]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="relative z-[30]"
          variants={{
            initial: { y: 0 },
            whileHover: { y: -5 },
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2 
            className="mb-6 font-ao text-[24px] md:text-[36px] lg:text-[42px] font-bold text-gradient"
            variants={{
              initial: { scale: 1 },
              whileHover: { scale: 1.05 },
            }}
            transition={{ duration: 0.3 }}
          >
            Want to work together?
          </motion.h2>
          <div className="flex flex-col gap-y-2">
            <motion.p 
              className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light"
              variants={{
                initial: { opacity: 0.8 },
                whileHover: { opacity: 1 },
              }}
            >
              Feel free to reach out for collaborations or just a friendly hello
            </motion.p>
            <motion.div
              variants={{
                initial: { scale: 1 },
                whileHover: { scale: 1.02 },
              }}
            >
              <CustomLink
                text="hello[at]zeeshanjunaid[dot]dev"
                link="mailto:hello@zeeshanjunaid.dev"
                className="text-[14px] md:text-[18px] lg:text-[20px] font-switzer text-dark dark:text-light"
              />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row w-max xs:w-full items-start gap-3 justify-start z-[30] relative"
          variants={{
            initial: { y: 0 },
            whileHover: { y: -3 },
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-wrap sm:flex-nowrap justify-start space-x-3"
            variants={{
              initial: { scale: 1 },
              whileHover: { scale: 1.05 },
            }}
          >
            <SocialLinks />
          </motion.div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default ReachOut;
