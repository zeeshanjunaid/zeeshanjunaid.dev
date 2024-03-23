"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Review } from "@/data/reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuotedIconDark, QuotedIconLight } from "@/components/icons";

interface TestimonialCardProps {
  review: Review;
  className?: string;
}

const TestimonialCard = ({ review, className }: TestimonialCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "bg-light relative dark:bg-dark rounded-3xl px-6 py-10 lg:px-[3.75rem] lg:py-[4rem]",
        className,
      )}
    >
      <BlurBG className="rounded-3xl" />
      <div className="z-[20] relative flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-start gap-2.5 md:gap-4">
          <div className="w-[60px] h-[60px] overflow-hidden rounded-full relative">
            {!isLoaded && <Skeleton className="w-full h-full rounded-full" />}
            <Image
              src={review.profile}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt={review.client}
              onLoad={() => setIsLoaded(false)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="text-dark dark:text-light font-switzer font-medium text-[16px] flex items-center gap-x-1.5">
              {review.client}
              {review.country && (
                <span className="-mt-[2px]">
                  <ReactCountryFlag
                    countryCode={review.country.code}
                    style={{
                      fontSize: "1.25rem",
                    }}
                    aria-label={review.country.name}
                  />
                </span>
              )}
            </h3>
            <div className="flex gap-x-1 items-center justify-start">
              <Star color="#FFC107" fill="#FFC107" />
              <Star color="#FFC107" fill="#FFC107" />
              <Star color="#FFC107" fill="#FFC107" />
              <Star color="#FFC107" fill="#FFC107" />
              <Star color="#FFC107" fill="#FFC107" />
            </div>
          </div>
        </div>
        <div className="relative">
          {theme === "dark" ? <QuotedIconLight /> : <QuotedIconDark />}
          <p className="text-dark dark:text-light font-switzer font-light italic text-[16px] md:text-[18px] tracking-wider leading-relaxed">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
