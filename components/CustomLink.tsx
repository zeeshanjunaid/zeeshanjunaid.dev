"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const CustomLink = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setIsHovered(false);
  }, []);
  return (
    <div
      className={cn("relative w-max", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-purple w-full z-10 transition-all duration-200",
          isHovered ? "h-full" : "h-0.5",
        )}
      />
      <div className="z-20 relative">{children}</div>
    </div>
  );
};

export default CustomLink;
