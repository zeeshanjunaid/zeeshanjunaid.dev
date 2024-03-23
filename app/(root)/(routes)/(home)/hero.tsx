"use client";

import AvailabilityBadge from "@/components/availability-badge";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SocialLinks } from "@/components/social-connect";

const heroImg = "/images/zeeshan.png";
export const Hero = () => {
  const handIcon = <span className="animate-waver">👋🏻</span>;
  const heroTitle = (
    <>
      Hello {handIcon}, I’m Zeeshan Junaid, Frontend Engineer with 8+ years of
      experience
    </>
  );
  return (
    <section className="overflow-x-hidden w-full md:pt-5">
      <Container
        className="
        mt-8 lg:mt-6
        px-4 lg:px-0     
        flex
        flex-col lg:flex-row
        space-y-4 lg:space-y-0
    "
      >
        <div className="lg:hidden px-2 w-full sm:w-[80%] md:w-[90%] mx-auto mt-6 flex flex-col justify-center items-center">
          <AvailabilityBadge className="mb-2.5" />
          <h1 className="text-center text-[22px] leading-tight sm:text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light">
            {heroTitle}
          </h1>
        </div>
        <div className="hidden lg:flex flex-col w-2/3  rounded-3xl px-16 py-12 justify-between flex-1 mr-5 relative overflow-hidden">
          <BlurBG className="rounded-3xl" />
          <div className="z-20 relative">
            <AvailabilityBadge className="mb-2.5" />
            <h1 className=" text-left text-[32px] 2xl:text-[36px] font-bold font-ao text-dark dark:text-light leading-tight">
              {heroTitle}
            </h1>
          </div>
          <div className="flex items-center space-x-3 min-w-max justify-start z-20 relative">
            <Link href="/contact">
              <Button
                className="h-12 rounded-xl uppercase"
                size="lg"
                variant="purple"
              >
                Start a Project
              </Button>
            </Link>
            <SocialLinks />
          </div>
        </div>
        <div className="w-full max-w-[360px] lg:max-w-full h-[265px] sm:h-[355px] rounded-3xl relative mx-auto lg:w-1/3 -order-1 lg:order-1">
          <BlurBG className="rounded-3xl" />
          <div className="absolute bottom-0 left-2/3 lg:left-auto lg:right-0 -translate-x-3/4 lg:translate-x-0 w-full h-full z-20">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              fill
              alt="profile"
              src={heroImg}
              priority={true}
              className="scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom transition-opacity delay-750 duration-1000 user-select-none pointer-events-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:hidden items-center gap-2 min-w-max justify-center">
          <Link href="/contact">
            <Button className="rounded-xl uppercase" size="lg" variant="purple">
              Start a Project
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
