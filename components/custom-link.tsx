"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

const CustomLink = ({
  className,
  internal,
  link,
  text,
  rel,
  target,
}: {
  link: string;
  text: string;
  className?: string;
  internal?: boolean;
  rel?: string;
  target?: string;
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
            "absolute bottom-0 left-0 right-0 bg-purple w-full z-10 transition-all duration-150",
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
      target={target}
      className={cn("relative w-max", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-purple w-full z-10 transition-all duration-150",
          isHovered ? "h-full" : "h-0.5",
        )}
      />
      <span className="z-20 relative">{text}</span>
    </a>
  );
};

export default CustomLink;
