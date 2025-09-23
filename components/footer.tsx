"use client";

import { Container } from "./container";
import React from "react";
import { motion } from "framer-motion";
export const Footer = () => {
  return (
    <motion.footer
      className="pt-8 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
    >
      <Container className="px-5 text-center flex justify-center">
        <div className="overflow-hidden rounded-xl px-3 sm:px-5 py-2 relative">
          <div className="backdrop-blur-md bg-gray-200 dark:bg-gray-700 opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10" />
          <p className="text-center text-3 font-switzer font-light text-gray-900 dark:text-white z-20 inline">
            &copy; {new Date().getFullYear()} Zeeshan Junaid. Crafted with care in Pakistan. All rights reserved.
          </p>
        </div>
      </Container>
    </motion.footer>
  );
};
