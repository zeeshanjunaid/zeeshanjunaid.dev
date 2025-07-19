"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });
  return (
    <motion.div
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      initial={{
        y: "150%",
      }}
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "150%",
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: "easeInOut", duration: 0.2, delay: 0.2 }}
      whileHover={{ 
        scale: 1.1,
        y: -4,
        boxShadow: "0 10px 25px rgba(163, 116, 255, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:right-8 bg-gradient-to-r from-purple to-purple/80 z-40 h-14 w-14 flex items-center justify-center text-white cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/10 group"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -2, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex items-center justify-center"
      >
        <ChevronUp 
          size={24} 
          className="group-hover:scale-110 transition-transform duration-200" 
        />
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default BackToTop;
