"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LogoIcon = () => (
  <svg
    className="w-12 h-12 md:w-16 md:h-16"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
  >
    <circle cx="10" cy="10" r="9.5" fill="none" stroke="#A374FF"></circle>
    <path
      className="rotate-slow origin-center"
      fill="#A374FF"
      d="M18.66 5A10 10 0 0110 20V10l8.66-5z"
    ></path>
  </svg>
);

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    // Hide preloader after longer duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("hasVisited", "true");
    }, 4500); // Increased from 3000 to 4500ms

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-light dark:bg-dark flex flex-col items-center justify-center"
      >
        {/* Background blur effect matching your design */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple via-blue-500 to-purple rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Main content container with blur background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center space-y-8 px-8 py-12 rounded-3xl overflow-hidden"
        >
          {/* BlurBG component equivalent */}
          <div className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl" />
          
          <div className="relative z-20 flex flex-col items-center space-y-8">
            {/* Logo with your exact navbar styling */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="header-logo"
            >
              <LogoIcon />
            </motion.div>

            {/* Name with your font styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-ao text-2xl md:text-3xl lg:text-4xl font-bold text-dark dark:text-light mb-2">
                Zeeshan Junaid
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-dark/70 dark:text-light/70 text-sm md:text-base font-light font-switzer"
              >
                Frontend Developer & UI/UX Designer
              </motion.p>
            </motion.div>

            {/* Progress bar with your design system */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="relative w-64 h-2 rounded-xl overflow-hidden"
            >
              {/* Background with blur effect */}
              <div className="absolute inset-0 backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-40 rounded-xl" />
              
              {/* Progress fill */}
              <motion.div
                className="relative z-10 h-full bg-purple rounded-xl"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Loading text with your typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-center"
            >
              <motion.p
                className="text-dark/60 dark:text-light/60 text-xs md:text-sm font-light font-switzer uppercase tracking-wider"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Crafting digital experiences...
              </motion.p>
            </motion.div>

            {/* Availability badge similar to your hero */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="bg-[#15a81d]/15 px-4 py-2 rounded-lg tracking-wider text-[#15a81d] text-xs font-normal uppercase flex items-center gap-x-2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-[#15a81d] rounded-full"
              />
              Available for work
            </motion.div>
          </div>
        </motion.div>

        {/* Subtle floating elements matching your design */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple/30 rounded-full"
            style={{
              left: `${25 + i * 20}%`,
              top: `${35 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;