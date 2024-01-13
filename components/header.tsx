"use client";

import React, { useEffect, useState } from "react";

import { Container } from "./container";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import NavMobile from "./nav-mobile";
import { cn } from "@/lib/utils";
import navLinks from "@/data/nav";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed z-40 top-0 left-0 right-0 w-full px-4 lg:px-0 pt-6 pb-4 border-b-[1px] border-b-borderDarkColor transition-all duration-200 bg-light/0 dark:bg-dark/0",
        scrolled && "bg-light/100 dark:bg-dark/100",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link
          className="font-ao text-lg lg:text-xl text-dark dark:text-light font-bold tracking-tighter flex items-center gap-x-2 header-logo"
          href="/"
        >
          <LogoIcon />
          Zeeshan Junaid
        </Link>

        <div className="flex items-center space-x-3 md:space-x-3.5 lg:space-x-8">
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ link, label }) => (
              <Link
                href={link}
                key={label}
                className="font-switzer font-dark dark:font-light text-sm uppercase font-medium transition-color duration-200 hover:text-purple"
              >
                {label}
              </Link>
            ))}
          </div>
          <NavMobile data={navLinks} />
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};
