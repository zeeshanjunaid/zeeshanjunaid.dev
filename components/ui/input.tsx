import * as React from "react";

import { BlurBG } from "../blur-bg";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative h-[48px] md:h-[54px] rounded-xl overflow-hidden bg-white dark:bg-gray-900 border-[1px] border-solid border-gray-200 dark:border-gray-700">
        <BlurBG className="rouned-xl" />
        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-900/70 dark:placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-full relative z-20 bg-transparent",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
