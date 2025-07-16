'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BlurBG = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0.25 }}
      whileHover={{ 
        opacity: 0.4,
        scale: 1.02,
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className={cn(
        "backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 transition-all duration-300",
        className,
      )}
    />
  );
};
