"use client";

import React, { useEffect, useState } from "react";
import { TbBrandFiverr, TbBrandUpwork } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BsGithub } from "react-icons/bs";
import { Button } from "./ui/button";
import { DownloadCloud } from "lucide-react";
import { RiLinkedinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export function SocialLinks() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const styles =
    "dark:text-dark text-light w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6";
  const socialLinks = [
    // {
    //   name: "upwork",
    //   link: "https://www.upwork.com/freelancers/zeshanjunaid",
    //   icon: <TbBrandUpwork className={styles} />,
    // },
    // {
    //   name: "fiverr",
    //   link: "https://www.fiverr.com/users/nitx_solutionx/seller_dashboard",
    //   icon: <TbBrandFiverr className={styles} />,
    // },
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
    <>
      {socialLinks.map(({ name, link, icon }) => (
        <TooltipProvider key={name}>
          <Tooltip>
            <TooltipTrigger>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Button
                  aria-label={name}
                  role="link"
                  size="icon"
                  className="rounded-xl"
                >
                  {icon}
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}

export function ResumeButton({ className }: { className?: string }) {
  return (
    <Button
      disabled
      variant="purple"
      className={cn("space-x-1 w-max rounded-xl", className)}
    >
      <DownloadCloud className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-5" />
      <span className="text-dark dark:text-light uppercase text-[12px] md:text-[14px]">
        Download CV
      </span>
    </Button>
  );
}
