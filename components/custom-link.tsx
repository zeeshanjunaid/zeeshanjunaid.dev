"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";

const CustomLink = ({
  className,
  internal,
  link,
  text,
  rel,
}: {
  link: string;
  text: string;
  className?: string;
  internal?: boolean;
  rel?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setIsHovered(false);
  }, []);
  if (internal) {
    return (
      <Link
        href={link}
        className={cn("relative w-max", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-purple w-full z-10 transition-all duration-200",
            isHovered ? "h-full" : "h-0.5",
          )}
        />
        <span className="z-20 relative">{text}</span>
      </Link>
    );
  }

  return (
    <a
      rel={rel}
      href={link}
      target="_blank"
      className={cn("relative w-max", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-purple w-full z-10 transition-all duration-200",
          isHovered ? "h-full" : "h-0.5",
        )}
      />
      <span className="z-20 relative">{text}</span>
    </a>
  );
};

export default CustomLink;
