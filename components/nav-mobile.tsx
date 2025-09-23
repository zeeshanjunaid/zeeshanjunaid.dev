"use client";

import React, { useEffect } from "react";
import { SocialLinks } from "./social-connect";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { Button } from "./ui/button";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavMobileProps {
  data: {
    label: string;
    link: string;
  }[];
}
const NavMobile = ({ data }: NavMobileProps) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="hamburger"
          role="button"
          size="icon"
          variant="highlight"
          className="lg:hidden inline-flex items-center h-[38px]"
        >
          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl -z-10 scale-y-110 scale-x-105
    backdrop-blur-xs group-hover:scale-0 transition-all duration-500 delay-0 ease-in-out group-hover:duration-1000 hamburger-gradient"
          />
          <HiMenuAlt4 className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]" />
        </Button>
      </SheetTrigger>
      <SheetContent id="mobile-navigation" className="bg-white dark:bg-gray-900 flex flex-col justify-between">
        <div className="flex flex-col space-y-4 mt-12">
          <Link
            href="/"
            className={cn(
              "w-full border-b-[1px] last:border-0 pt-0 pb-4 font-switzer dark:font-light text-base uppercase font-medium transition hover:text-purple text-gray-900 dark:text-white",
              pathname === "/" && "text-purple",
            )}
          >
            Home
          </Link>
          {data.map(({ link, label }) => (
            <Link
              href={link}
              key={label}
              className={cn(
                "w-full border-b-[1px] last:border-0 pt-0 pb-4 font-switzer dark:font-light text-base uppercase font-medium transition hover:text-purple text-gray-900 dark:text-white",
                pathname === link && "text-purple",
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start border-t-[1px] border-gray-200 dark:border-gray-700 pt-6 min-w-max flex-wrap justify-between">
          <h4 className="font-ao text-xs text-gray-900 dark:text-white">Reach out via:</h4>
          <div className="flex items-center space-x-3 pt-3 min-w-max flex-wrap justify-between">
            <SocialLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
