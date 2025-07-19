"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-lg bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor"
          disabled
        >
          <Sun className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "w-9 h-9 rounded-lg transition-all duration-200 relative overflow-hidden",
          "bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor",
          "hover:bg-purple/10 hover:border-purple/30"
        )}
      >
        {/* Background gradient that shifts */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300 rounded-lg",
            isDark
              ? "bg-gradient-to-br from-slate-800 to-slate-900"
              : "bg-gradient-to-br from-amber-50 to-orange-100"
          )}
        />
        
        {/* Icons container */}
        <div className="relative z-10 flex items-center justify-center">
          <Sun
            className={cn(
              "h-4 w-4 transition-all duration-200 absolute",
              isDark
                ? "rotate-90 scale-0 text-amber-500"
                : "rotate-0 scale-100 text-amber-600"
            )}
          />
          <Moon
            className={cn(
              "h-4 w-4 transition-all duration-200 absolute",
              isDark
                ? "rotate-0 scale-100 text-slate-300"
                : "-rotate-90 scale-0 text-slate-600"
            )}
          />
        </div>

        {/* Subtle glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg transition-opacity duration-200",
            isDark
              ? "bg-blue-500/10 opacity-100"
              : "bg-amber-500/10 opacity-100"
          )}
        />
      </Button>
    </div>
  );
}