"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AvailabilityBadge = ({ className }: { className?: string }) => {
  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.9, 1, 0.9],
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
