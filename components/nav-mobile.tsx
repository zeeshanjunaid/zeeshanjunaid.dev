"use client";

import { ResumeButton, SocialLinks } from "./social-connect";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { Button } from "./ui/button";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavMobileProps {
  data: {
    label: string;
    link: string;
  }[];
}
const NavMobile = ({ data }: NavMobileProps) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="highlight"
          className="lg:hidden inline-flex items-center h-[38px]"
        >
          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl -z-10 scale-y-110 scale-x-105
    bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 from-yellow-500 via-green-500 to-blue-500 from-cyan-500 via-teal-500 to-blue-500 from-blue-500 via-indigo-500 to-blue-500 backdrop-blur-xs group-hover:scale-0 transition-all duration-500 delay-0 ease-in-out group-hover:duration-1000"
          />
          <HiMenuAlt4 className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-light dark:bg-dark flex flex-col justify-between">
        <div className="flex flex-col space-y-4 mt-12">
          <Link
            href="/"
            className={cn(
              "w-full border-b-[1px] last:border-0 pt-0 pb-4 font-switzer font-dark dark:font-light text-base uppercase font-medium transition hover:text-purple",
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
                "w-full border-b-[1px] last:border-0 pt-0 pb-4 font-switzer font-dark dark:font-light text-base uppercase font-medium transition hover:text-purple",
                pathname === link && "text-purple",
              )}
            >
              {label}
            </Link>
          ))}
          <ResumeButton />
        </div>
        <div className="flex flex-col items-start border-t-[1px] pt-6 min-w-max flex-wrap justify-between">
          <h4 className="font-ao text-xs">Reach out via:</h4>
          <div className="flex items-center space-x-3 pt-3 min-w-max flex-wrap justify-between">
            <SocialLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
