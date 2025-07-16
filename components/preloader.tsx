"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LogoIcon = () => (
  <svg
    className="w-16 h-16 md:w-20 md:h-20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <circle cx="10" cy="10" r="9.5" fill="none" stroke="#A374FF" strokeWidth="1"></circle>
    <motion.path
      className="origin-center"
      fill="#A374FF"
      d="M18.66 5A10 10 0 0110 20V10l8.66-5z"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
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
        return prev + Math.random() * 15;
      });
    }, 150);

    // Hide preloader after progress completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("hasVisited", "true");
    }, 3000);

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
        {/* Background animated gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
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

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Logo with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="relative"
          >
            <LogoIcon />
            
            {/* Pulsing ring around logo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Name animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="font-ao text-2xl md:text-3xl lg:text-4xl font-bold text-dark dark:text-light mb-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #A374FF, #1cc2df, #A374FF)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Zeeshan Junaid
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-dark/70 dark:text-light/70 text-sm md:text-base font-light"
            >
              Frontend Developer & UI/UX Designer
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="relative h-1 bg-dark/10 dark:bg-light/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple to-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center"
          >
            <motion.p
              className="text-dark/60 dark:text-light/60 text-xs md:text-sm font-light"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Crafting digital experiences...
            </motion.p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Bottom wave animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              animate={{
                d: [
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                  "M0,80 C300,40 900,100 1200,80 L1200,120 L0,120 Z",
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A374FF" />
                <stop offset="50%" stopColor="#1cc2df" />
                <stop offset="100%" stopColor="#A374FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;