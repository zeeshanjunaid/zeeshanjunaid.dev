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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn(
        "bg-light relative dark:bg-dark rounded-3xl px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 group hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      <BlurBG className="rounded-3xl" />
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="z-[20] relative flex flex-col gap-y-6 md:gap-y-8">
        <div className="flex flex-row items-center justify-start gap-3 md:gap-4">
          <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] overflow-hidden rounded-full relative group-hover:scale-105 transition-transform duration-300">
            {!isLoaded && <Skeleton className="w-full h-full rounded-full" />}
            <Image
              src={review.profile}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              alt={review.client}
              onLoad={() => setIsLoaded(false)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="text-dark dark:text-light font-switzer font-medium text-[14px] md:text-[16px] flex items-center gap-x-1.5">
              {review.client}
              {review.country && (
                <span className="-mt-[2px]">
                  <ReactCountryFlag
                    countryCode={review.country.code}
                    style={{
                      fontSize: "1rem",
                    }}
                    aria-label={review.country.name}
                  />
                </span>
              )}
            </h3>
            
            {/* Company info if available */}
            {review.company && (
              <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[12px] md:text-[14px]">
                {review.company}
              </p>
            )}
            
            <div className="flex gap-x-0.5 items-center justify-start">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-300" 
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          {theme === "dark" ? <QuotedIconLight /> : <QuotedIconDark />}
          <p className="text-dark dark:text-light font-switzer font-light italic text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
            {review.review}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
