"use client";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

interface TestimonialsSliderProps {
  reviews: {
    client: string;
    logo: string;
    profile: string;
    review: string;
    featured?: boolean;
  }[];
}
const QuotedIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="39"
    fill="none"
    className="absolute -top-1.5 -left-2.5 -z-10"
  >
    <path
      fill={color}
      d="M2.1 38.267c6.3 0 14.7-2.126 14.7-17.008V4.252c0-2.657-1.588-4.288-4.2-4.251H4.2C1.575 0 0 1.595 0 4.193v12.815c0 2.657 1.575 4.252 4.2 4.252 2.1 0 2.1 0 2.1 2.125v2.126c0 2.126-2.1 4.252-4.2 4.252S0 29.78 0 31.955v4.186c0 2.126 0 2.126 2.1 2.126zm25.2 0c6.3 0 14.7-2.126 14.7-17.008V4.252c0-2.657-1.59-4.288-4.2-4.251h-8.4c-2.625 0-4.2 1.594-4.2 4.192v12.815c0 2.657 1.575 4.252 4.2 4.252h1.575c0 4.783.525 8.503-5.775 8.503v6.378c0 2.126 0 2.126 2.1 2.126z"
      opacity="0.1"
    ></path>
  </svg>
);
const TestimonialsSlider = ({ reviews }: TestimonialsSliderProps) => {
  const { theme } = useTheme();

  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative flex lg:gap-x-5">
      <div className="shrink-0 overflow-hidden rounded-3xl relative hidden lg:block w-[360px] h-[360px]">
        <BlurBG className="rounded-3xl" />
        <Image
          objectFit="cover"
          className="aspect-square"
          src="/images/testimonials/josh-pic.jpg"
          fill
          alt="Josh Peters"
        />
      </div>
      <div className="py-8 px-5 md:p-12 w-full   lg:px-16 rounded-3xl relative flex overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <div className="relative z-20">
          <h2 className="text-[#3F3F3F]/70 dark:text-[#FAFAF6]/70 font-medium font-switzer text-[16px] md:text-[20px] lg:text-[16px] leading-relaxed  mb-8">
            Here&apos;s why Josh Peters from Passage Protocols hired me.
          </h2>
          <div className="flex flex-col justify-between space-y-12 lg:space-y-5">
            <div className="relative">
              <QuotedIcon color={theme === "dark" ? "#FAFAF6" : "#3F3F3F"} />
              <p className="italic text-[16px] md:text-[20px] lg:text-[16px] text-dark dark:text-light leading-relaxed md:mr-[72px] lg:mr-0 lg:min-h-[130px]">
                Worked with Zeeshan for a project in React, Next.js 13, and
                Tailwind to build a frontend. His attention to detail, timely
                communication, and professionalism were outstanding. I recommend
                his services to anyone seeking top-notch frontend development.
              </p>
            </div>

            <div className="">
              <div className="flex justify-start items-center gap-x-2.5 md:gap-x-4">
                <div className="lg:hidden w-[42px] md:w-[60px] h-[42px] md:h-[60px] relative rounded-full overflow-hidden">
                  <Image
                    src="/images/testimonials/josh-pic.jpg"
                    fill
                    alt="Josh Peters"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="italic font-bold text-[14px] md:text-[18px] lg:text-[22px] text-dark dark:text-light leading-relaxed">
                    Josh Peters
                  </p>
                  <Image
                    src="/images/testimonials/pp.png"
                    width={70}
                    height={20}
                    alt="passage protocol logo"
                    className="hidden dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TestimonialsSlider;
