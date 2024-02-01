"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Image from "next/image";
import { QuotedIcon } from "./testimonial-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface TestimonialsSliderProps {
  reviews: {
    client: string;
    logo?: string;
    company?: string;
    profile: string;
    review: string;
  }[];
}
const TestimonialsSlider = ({ reviews }: TestimonialsSliderProps) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalReviews = reviews.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews,
    );
  };
  const { client, logo, company, profile, review } = reviews[currentIndex];

  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative flex lg:gap-x-5">
      <div className="shrink-0 overflow-hidden rounded-3xl relative hidden lg:block w-[360px] h-[360px]">
        {!isLoaded && <Skeleton className="w-full h-full rounded-3xl" />}
        <Image
          className="aspect-square object-cover"
          src={profile}
          fill
          alt={client}
          onLoad={() => setIsLoaded(false)}
        />
      </div>
      <div className="py-8 px-5 md:p-12 w-full   lg:px-16 rounded-3xl relative flex overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <div className="relative z-20">
          <h2 className="text-[#3F3F3F]/70 dark:text-[#FAFAF6]/70 font-medium font-switzer text-[16px] md:text-[20px] lg:text-[16px] leading-relaxed  mb-8">
            Here&apos;s why {client} {company && <>from {company}</>} hired me.
          </h2>
          <div className="flex flex-col justify-between space-y-12 lg:space-y-5">
            <div className="relative">
              <QuotedIcon />
              <p className="italic text-[16px] md:text-[20px] lg:text-[16px] text-dark dark:text-light leading-relaxed md:mr-[72px] lg:mr-0 lg:min-h-[130px]">
                {review}
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex justify-start items-center gap-x-2.5 md:gap-x-4">
                <div className="lg:hidden w-[42px] md:w-[60px] h-[42px] md:h-[60px] relative rounded-full overflow-hidden">
                  {profile && (
                    <Image
                      className="object-cover"
                      src={profile}
                      fill
                      alt={client}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="italic font-bold text-[14px] md:text-[18px] lg:text-[22px] text-dark dark:text-light leading-relaxed">
                    {client}
                  </p>
                  {logo && (
                    <div className="h-[20px] relative mix-blend-multiply">
                      <Image
                        fill
                        src={logo}
                        alt={company ? company : "logo"}
                        className="object-contain object-left"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-x-2">
                <Button
                  aria-label="Previous"
                  size="icon"
                  onClick={handlePrevious}
                  className="bg-transparent text-dark dark:text-light border-[1px] border-solid border-dark dark:border-light hover:bg-purple hover:border-purple dark:hover:border-purple transition duration-200 rounded-xl"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  aria-label="Next"
                  onClick={handleNext}
                  size="icon"
                  className="bg-transparent text-dark dark:text-light border-[1px] border-solid border-dark dark:border-light hover:bg-purple hover:border-purple dark:hover:border-purple transition duration-200 rounded-xl"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TestimonialsSlider;
