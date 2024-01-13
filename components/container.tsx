import React from "react";
import { cn } from "@/lib/utils";
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "w-full lg:max-w-[964px] 2xl:max-w-[1080px] mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};
