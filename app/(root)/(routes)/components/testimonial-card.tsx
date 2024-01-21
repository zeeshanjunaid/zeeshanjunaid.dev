"use client";

import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Review } from "@/data/reviews";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface TestimonialCardProps {
  review: Review;
  className?: string;
}
export const QuotedIcon = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#FAFAF6" : "#3F3F3F";
  return (
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
};
const TestimonialCard = ({ review, className }: TestimonialCardProps) => {
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
            <Image
              src={review.profile}
              fill
              className="object-cover"
              alt={review.client}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="text-dark dark:text-light font-switzer font-medium text-[16px] flex items-center gap-x-1.5">
              {review.client}
              {review.country && (
                <span>
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
          <QuotedIcon />
          <p className="text-dark dark:text-light font-switzer font-light italic text-[16px] md:text-[18px] tracking-wider leading-relaxed">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
