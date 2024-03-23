"use client";

import { Content, asLink } from "@prismicio/client";
import React, { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { LogoIcon } from "./logo";
import { ModeToggle } from "../theme-toggle";
import { PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavbarProps = {
  settings: Content.SettingsDocument;
};
export const Navbar = ({ settings }: NavbarProps) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const logoText = settings.data.logo || "Zeeshan Junaid";
  const navigation = settings.data.navigation;

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
        "fixed left-0 right-0 top-0 z-40 w-full border-b-[1px] border-b-transparent bg-transparent px-4 pb-4 pt-6 transition-all duration-200 md:px-8 lg:px-0",
        scrolledClasses,
      )}
    >
      <Container className="flex items-center justify-between">
        <Link
          className="header-logo flex items-center gap-x-2 font-ao text-lg font-bold tracking-tighter text-dark dark:text-light lg:text-xl"
          href="/"
        >
          <LogoIcon />
          {logoText}
        </Link>

        <div className="flex items-center space-x-5 ">
          <div className="hidden items-center gap-x-3 lg:flex">
            {navigation.map(({ label, link }) => (
              <Button
                variant="ghost"
                key={label}
                className={cn(
                  "font-dark transition-color rounded-xl font-switzer text-sm font-medium uppercase duration-200 hover:bg-transparent hover:text-purple dark:font-light",
                )}
              >
                <PrismicNextLink
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                  field={link}
                  className="text-inherit"
                >
                  {label}
                </PrismicNextLink>
              </Button>
            ))}
          </div>
          {/* <NavMobile data={navLinks} /> */}
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};
