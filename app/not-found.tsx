"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { BlurBG } from "@/components/blur-bg";
import Link from "next/link";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";

const FloatingElement = ({
  children,
  delay = 0,
  duration = 3,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const GlitchText = ({ text }: { text: string }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`inline-block ${glitching ? "animate-pulse" : ""}`}
      animate={
        glitching
          ? {
              x: [0, -2, 2, -1, 1, 0],
              textShadow: [
                "0 0 0 transparent",
                "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                "0 0 0 transparent",
              ],
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  );
};

export default function NotFound() {
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Compass },
    { label: "Work", href: "/work", icon: Search },
    { label: "Contact", href: "/contact", icon: ArrowLeft },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <FloatingElement delay={0} duration={4}>
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-purple/30 rounded-full" />
        </FloatingElement>

        <FloatingElement delay={1} duration={5}>
          <div className="absolute top-40 right-20 w-12 h-12 bg-purple/20 rounded-lg rotate-45" />
        </FloatingElement>

        <FloatingElement delay={2} duration={3.5}>
          <div className="absolute bottom-32 left-1/4 w-8 h-8 border-2 border-purple/40 rotate-45" />
        </FloatingElement>

        <FloatingElement delay={1.5} duration={4.5}>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-purple/20 rounded-full" />
        </FloatingElement>

        {/* Mouse follower gradient */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(163, 116, 255, 0.1) 0%, transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <Container className="px-4 lg:px-0 relative z-10">
        <div className="text-center">
          {/* Main 404 Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold font-ao text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple/80 to-purple/60 leading-none">
                <GlitchText text="404" />
              </h1>

              {/* Decorative elements around 404 */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-purple rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple/60 rounded-lg"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light mb-4">
              Page Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-dark/70 dark:text-light/70 font-light max-w-2xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off
              into the digital void. Don&apos;t worry, even the best explorers
              sometimes take a wrong turn.
            </p>
          </motion.div>

          {/* Interactive Card with Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="bg-light dark:bg-dark rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <BlurBG className="rounded-3xl" />

              <div className="relative z-20">
                <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-6">
                  Let&apos;s get you back on track
                </h3>

                {/* Quick Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {quickLinks.map(({ label, href, icon: Icon }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={href}>
                        <div className="group p-4 rounded-xl border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/50 transition-all duration-200 hover:bg-purple/5">
                          <Icon className="w-6 h-6 text-purple mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm font-medium text-dark dark:text-light group-hover:text-purple transition-colors duration-200">
                            {label}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Main CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/">
                      <Button
                        variant="purple"
                        size="lg"
                        className="rounded-xl uppercase font-medium flex items-center gap-2"
                      >
                        <Home className="w-4 h-4" />
                        Back to Home
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      className="rounded-xl uppercase font-medium text-dark dark:text-light hover:text-purple hover:bg-purple/10 flex items-center gap-2"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Go Back
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fun Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <p className="text-sm text-dark/50 dark:text-light/50 font-light">
              {"Not all who wander are lost, but this page definitely is."}
              <span className="text-purple"> - J.R.R. Tolkien (probably)</span>
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
