"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AvailabilityBadge = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: [1, 1.25, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div
      className={cn(
        "bg-[#15a81d]/15 px-4 py-1 w-max rounded-lg tracking-wider text-[#15a81d]  text-[12px] font-normal uppercase flex items-center gap-x-1",
        className,
      )}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={pulseVariants}
        className="w-2 h-2 bg-[#15a81d] rounded-full"
      />
      Available for work
    </div>
  );
};

export default AvailabilityBadge;
