"use client";

import React, { useEffect, useState } from "react";

import { BsGithub } from "react-icons/bs";
import { Button } from "./ui/button";
import { RiLinkedinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export function SocialLinks() {

  const styles =
    "dark:text-dark text-light w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6";
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
        <a 
          key={name} 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button
            aria-label={name}
            role="link"
            size="icon"
            className="rounded-xl h-12 w-12"
          >
            {icon}
          </Button>
        </a>
      ))}
    </div>
  );
}
