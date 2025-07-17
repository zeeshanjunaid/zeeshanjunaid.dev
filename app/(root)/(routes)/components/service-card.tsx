"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import { ServicesCardProps } from "@/data/services";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ServiceCard = ({
  name,
  tagline,
  description,
  img,
  subServices,
  results,
  subServicesTitle,
  resultsTitle,
  slug,
}: ServicesCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Section */}
        <motion.div 
          className="shrink-0 overflow-hidden rounded-3xl relative w-full h-[280px] md:h-[320px] lg:w-[420px] lg:h-[420px]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
        {!isLoaded && <Skeleton className="w-full h-full rounded-3xl" />}
        <Image
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          src={img}
          fill
          alt="service"
            onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 py-8 px-6 md:p-10 lg:p-12 rounded-3xl relative overflow-hidden">
        <BlurBG className="rounded-3xl" />
          
          <div className="relative z-20 h-full flex flex-col">
            {/* Header */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[2px] bg-purple" />
                <span className="text-purple font-switzer font-medium text-[10px] md:text-[12px] uppercase tracking-wider">
                  Service
                </span>
              </div>
              
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] text-dark dark:text-light font-ao font-bold mb-3">
                {name}
              </h3>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-light text-purple/80">
                {tagline}
              </p>
              
              <p className="text-[14px] md:text-[16px] leading-relaxed font-light text-dark/80 dark:text-light/80 mt-4">
              {description}
            </p>
            </motion.div>

            {/* What I Offer */}
            <motion.div 
              className="mb-8 flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[18px] md:text-[20px] lg:text-[22px] text-dark dark:text-light font-ao font-bold mb-4">
                {subServicesTitle}
              </h4>
              
              <div className="space-y-3">
              {subServices.map((subService, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-purple mt-0.5 flex-shrink-0" />
                    <span className="text-[14px] md:text-[16px] font-light text-dark/80 dark:text-light/80 leading-relaxed">
                      {subService}
                    </span>
                  </motion.div>
              ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[18px] md:text-[20px] lg:text-[22px] text-dark dark:text-light font-ao font-bold mb-4">
                {resultsTitle}
              </h4>
              <p className="text-[14px] md:text-[16px] leading-relaxed font-light text-dark/80 dark:text-light/80">
              {results}
            </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/contact">
                <Button
                  variant="purple"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 group-hover:scale-105 transition-transform duration-300"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;