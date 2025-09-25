"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { Button } from "./ui/button";
import { RiLinkedinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export function SocialLinks() {
  const styles =
    "text-gray-900 dark:text-white w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6";
  const socialLinks = [
    {
      name: "github",
      link: "https://github.com/zeeshanjunaid",
      icon: <BsGithub className={styles} />,
    },
    {
      name: "linkedin",
      link: "https://www.linkedin.com/in/zeeshan-junaid/",
      icon: <RiLinkedinLine className={styles} />,
    },
  ];

  return (
    <div className="flex items-center space-x-3">
      {socialLinks.map(({ name, link, icon }, index) => (
        <motion.a
          key={name}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            aria-label={name}
            role="link"
            size="icon"
            variant="outline"
            className="rounded-xl h-12 w-12 transition-all duration-200 hover:shadow-md border-gray-200 dark:border-gray-700 hover:border-purple/50 dark:hover:border-purple/50 bg-white/50 dark:bg-gray-800/50 hover:bg-purple/5 dark:hover:bg-purple/5"
          >
            {icon}
          </Button>
        </motion.a>
      ))}
    </div>
  );
}
