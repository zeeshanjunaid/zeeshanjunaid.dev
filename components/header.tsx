"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { Button } from "./ui/button";
import { Container } from "./container";
import Link from "next/link";
import NavMobile from "./nav-mobile";
import { ModeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import navLinks from "@/data/nav";
import { usePathname } from "next/navigation";

const LogoIcon = () => (
  <svg
    className=""
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
  >
    <circle cx="10" cy="10" r="9.5" fill="none" stroke="#A374FF"></circle>
    <path
      className="rotate-slow origin-center"
      fill="#A374FF"
      d="M18.66 5A10 10 0 0110 20V10l8.66-5z"
    ></path>
  </svg>
);

export const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  });

  const scrolledClasses = scrolled
    ? "bg-light dark:bg-dark border-b-lightBorderColor dark:border-b-darkBorderColor"
    : "bg-transparent";
  return (
    <header
      className={cn(
        "fixed z-40 top-0 left-0 right-0 w-full px-4 md:px-8 lg:px-0 pt-4 pb-4 border-b-[1px] border-b-transparent transition-all duration-200 bg-transparent",
        scrolledClasses,
      )}
    >
      <Container className="flex items-center justify-between">
        <Link
          className="font-ao text-lg lg:text-xl text-dark dark:text-light font-bold tracking-tight flex items-center gap-x-2 header-logo"
          href="/"
        >
          <LogoIcon />
          Zeeshan Junaid
        </Link>

        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="hidden lg:flex items-center gap-x-1">
            {navLinks.map(({ link, label }) => (
              <Button
                variant="ghost"
                key={label}
                className={cn(
                  "font-switzer font-dark dark:font-light text-sm uppercase font-medium transition-color duration-200 hover:text-purple hover:bg-transparent rounded-lg px-4 py-2 h-9",
                  pathname === link &&
                    "bg-purple text-dark dark:text-light hover:text-dark dark:hover:text-light hover:bg-purple",
                )}
                asChild
              >
                <Link href={link} className="text-inherit">
                  {label}
                </Link>
              </Button>
            ))}
          </div>
          <NavMobile data={navLinks} />
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};