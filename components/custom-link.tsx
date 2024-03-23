"use client";

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const CustomLink = ({ className, ...restProps }: PrismicNextLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setIsHovered(false);
  }, []);

  return (
    <PrismicNextLink
      className={cn(
        "relative w-max overflow-hidden transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:-z-10 after:w-full after:bg-purple after:transition-all after:duration-200 after:content-['']",
        className,
        isHovered ? "after:h-full" : "after:h-0.5",
      )}
      {...restProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default CustomLink;
