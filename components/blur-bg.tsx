'use client';

import React from "react";
import { cn } from "@/lib/utils";

export const BlurBG = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10",
        className,
      )}
    />
  );
};