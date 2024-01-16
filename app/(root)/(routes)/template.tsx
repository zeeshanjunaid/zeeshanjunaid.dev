"use client";

import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mt-4 lg:mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
