"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Review } from "@/data/reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote, ExternalLink, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  review: Review;
  className?: string;
}

const TestimonialCard = ({ review, className }: TestimonialCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-3xl overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Main Card Container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 transition-all duration-500 group-hover:border-purple/30">
        <BlurBG className="rounded-3xl" />

        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple/30 rounded-full group-hover:scale-200 transition-transform duration-700" />

        <div className="relative z-20 flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {!isLoaded && <Skeleton className="w-full h-full rounded-2xl" />}
              <Image
                src={review.profile}
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                alt={review.client}
                onLoad={() => setIsLoaded(true)}
              />

              {/* Profile Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Client Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-switzer font-semibold text-[16px] md:text-[18px] flex items-center gap-2 mb-1">
                    {review.client}
                    {review.country && (
                      <motion.span
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ReactCountryFlag
                          countryCode={review.country.code}
                          style={{ fontSize: "1.1rem" }}
                          aria-label={review.country.name}
                        />
                      </motion.span>
                    )}
                  </h3>

                  {/* Company Info */}
                  {review.company && (
                    <div className="flex items-center gap-2 mb-2">
                      {review.logo ? (
                        <div className="relative w-6 h-6 rounded overflow-hidden">
                          <Image
                            src={review.logo}
                            fill
                            sizes="24px"
                            className="object-contain"
                            alt={review.company}
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-purple/10 rounded flex items-center justify-center">
                          <Award className="w-3 h-3 text-purple" />
                        </div>
                      )}
                      <span className="text-gray-900/70 dark:text-white/70 font-switzer font-medium text-[14px] md:text-[15px]">
                        {review.company}
                      </span>
                    </div>
                  )}

                  {/* Country Name */}
                  {review.country && (
                    <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[12px] md:text-[13px] uppercase tracking-wider">
                      {review.country.name}
                    </p>
                  )}
                </div>

                {/* Quote Icon */}
                <motion.div
                  className="w-8 h-8 bg-purple/10 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <Quote className="w-4 h-4 text-purple" />
                </motion.div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Star
                      className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:scale-105 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  </motion.div>
                ))}
                <span className="ml-2 text-dark/60 dark:text-light/60 font-switzer font-medium text-[12px] md:text-[13px]">
                  5.0
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="relative">
            {/* Headline */}
            {review.headline && (
              <motion.h4
                className="text-gray-900 dark:text-white font-switzer font-semibold text-[16px] md:text-[18px] lg:text-[19px] leading-tight mb-4"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0.9 }}
                transition={{ duration: 0.3 }}
              >
                &quot;{review.headline}&quot;
              </motion.h4>
            )}
            
            <motion.p
              className="text-dark/90 dark:text-light/90 font-switzer font-light italic text-[14px] md:text-[16px] lg:text-[17px] leading-relaxed"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {review.review}
            </motion.p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-dark/60 dark:text-light/60 font-switzer font-medium text-[11px] md:text-[12px] uppercase tracking-wider">
                Verified Review
              </span>
            </div>

            {/* Featured Badge */}
            {review.featured && (
              <motion.div
                className="flex items-center gap-1.5 bg-purple/10 px-3 py-1 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <Award className="w-3 h-3 text-purple" />
                <span className="text-purple font-switzer font-medium text-[10px] md:text-[11px] uppercase tracking-wider">
                  Featured
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-purple/40"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;