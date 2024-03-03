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
        y: "120%",
      }}
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "120%",
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: "easeInOut", duration: 0.2, delay: 0.2 }}
      className="fixed bottom-0 right-4 md:right-7  bg-purple/90 z-40 h-[44px] w-[52px] flex items-center justify-center text-dark dark:text-light cursor-pointer rounded-t-xl hover:bg-purple transition duration-200"
    >
      <ChevronUp size={24} />
    </motion.div>
  );
};

export default BackToTop;
