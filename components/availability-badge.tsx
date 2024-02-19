"use client";

import { BlurBG } from "./blur-bg";
import { Container } from "./container";
import Marquee from "react-fast-marquee";
import React from "react";
import { motion } from "framer-motion";

const AvailabilityBadge = () => {
  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: [1, 1.25, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="z-30 mt-0 fixed bottom-0 left-0 right-0 w-full">
      <div className="relative bg-dark dark:bg-light py-3  overflow-hidden">
        <BlurBG />
        <div className="flex flex-col md:flex-row items-center w-full gap-y-4">
          <h3 className="hidden md:flex font-ao font-bold text-light dark:text-dark text-[14px] md:pl-8 pb-2 md:pb-0 md:pr-4 border-b-[1px] md:border-b-0 md:border-r-[1px] border-b-darkBorderColor dark:border-b-lightBorderColor min-w-max items-center gap-x-2 relative z-30">
            <motion.span
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="w-3 h-3 bg-[#15a81d] rounded-full"
            />
            Availability Status:
          </h3>
          <div className="tracking-wider inline text-nowrap relative z-20 text-light dark:text-dark text-[12px] font-light uppercase overflow-hidden">
            <Marquee autoFill={true}>
              Accepting new work from March 01, 2024{" "}
              <span className="w-2 h-2 rounded-full bg-purple mx-2 inline-flex" />
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityBadge;
