import * as React from "react";

import { BlurBG } from "../blur-bg";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative rounded-xl overflow-hidden bg-light dark:bg-dark border-[1px] border-solid border-lightBorderColor dark:border-darkBorderColor">
        <BlurBG className="rouned-xl" />
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-md ring-offset-background placeholder:text-dark/70 dark:placeholder:text-light/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative z-20 bg-transparent",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
