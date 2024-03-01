"use client";

import React, { useState } from "react";

import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import Link from "next/link";
import { ServicesCardProps } from "@/data/services";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceCard = ({
  name,
  tagline,
  description,
  ctaLink,
  ctaText,
  ctaInfo,
  img,
  subServices,
  results,
  subServicesTitle,
  resultsTitle,
}: ServicesCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="shrink-0 overflow-hidden rounded-3xl relative w-full h-[400px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
        {!isLoaded && <Skeleton className="w-full h-full rounded-3xl" />}
        <Image
          className="aspect-square object-cover"
          src={img}
          fill
          alt="service"
          onLoad={() => setIsLoaded(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="py-8 px-5 md:p-12 w-full   lg:px-16 rounded-3xl relative flex overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <div className="relative z-20 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] md:text-[24px] lg:text-[28px] text-dark dark:text-light font-ao ">
                {name}
              </h3>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-light">
                {tagline}
              </p>
            </div>
            <p className="text-[14px] md:text-[16px] leading-relaxed font-light text-dark/70 dark:text-light/70">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] md:text-[22px] lg:text-[24px] text-dark dark:text-light font-ao ">
                {subServicesTitle}
              </h3>
            </div>
            <ul className="leading-relaxed font-light text-dark/70 dark:text-light/70 flex flex-col gap-y-1.5 list-disc marker:text-purple list-inside text-[14px] md:text-[16px]">
              {subServices.map((subService, index) => (
                <li key={index}>{subService}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] md:text-[22px] lg:text-[24px] text-dark dark:text-light font-ao ">
                {resultsTitle}
              </h3>
            </div>
            <p className="text-[14px] md:text-[16px] leading-relaxed font-light text-dark/70 dark:text-light/70">
              {results}
            </p>
          </div>

          <p className="text-[16px] md:text-[18px] font-light leading-relaxed text-dark/70 dark:text-light/70">
            <span className="font-normal text-dark dark:text-light">
              {">>>"}
            </span>
            <Link
              className="font-normal px-1 underline underline-offset-4 underline-purple text-dark dark:text-light"
              href={`/services/${ctaLink}`}
            >
              {ctaText}
            </Link>
            {ctaInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
