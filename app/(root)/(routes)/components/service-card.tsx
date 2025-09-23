"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import { ServicesCardProps } from "@/data/services";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, CheckCircle, Star, Zap } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <BlurBG className="rounded-3xl" />
        
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-20 p-8 md:p-10 lg:p-12">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
            {/* Image Section */}
            <motion.div 
              className="shrink-0 overflow-hidden rounded-2xl relative w-full h-[240px] lg:w-[320px] lg:h-[240px]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {!isLoaded && <Skeleton className="w-full h-full rounded-2xl" />}
              <Image
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                src={img}
                fill
                alt="service"
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
              
              {/* Service Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 dark:bg-dark/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <span className="text-purple font-switzer font-medium text-[10px] md:text-[12px] uppercase tracking-wider">
                    Service
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <motion.h3 
                  className="text-[24px] md:text-[28px] lg:text-[32px] text-gray-900 dark:text-white font-ao font-bold mb-3 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {name}
                </motion.h3>
                
                <motion.p 
                  className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-light text-purple/90 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  {tagline}
                </motion.p>
                
                <motion.p 
                  className="text-[14px] md:text-[16px] leading-relaxed font-light text-gray-900/80 dark:text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {description}
                </motion.p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple" />
                  <span className="text-[12px] md:text-[14px] font-switzer font-medium text-gray-900/70 dark:text-white/70 uppercase tracking-wider">
                    Premium Quality
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple" />
                  <span className="text-[12px] md:text-[14px] font-switzer font-medium text-gray-900/70 dark:text-white/70 uppercase tracking-wider">
                    Fast Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* What I Offer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[18px] md:text-[20px] lg:text-[22px] text-gray-900 dark:text-white font-ao font-bold mb-6 flex items-center gap-3">
                <div className="w-6 h-[2px] bg-purple" />
                {subServicesTitle}
              </h4>
              
              <div className="space-y-4">
                {subServices.map((subService, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    viewport={{ once: true }}
                    className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full sm:w-auto justify-start min-w-[200px]"
                  >
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-purple group-hover/item:scale-105 transition-transform duration-150" />
                    </div>
                    <span className="text-[14px] md:text-[16px] font-light text-gray-900/80 dark:text-white/80 leading-relaxed group-hover/item:text-dark dark:group-hover/item:text-light transition-colors duration-150">
                      {subService}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[18px] md:text-[20px] lg:text-[22px] text-gray-900 dark:text-white font-ao font-bold mb-6 flex items-center gap-3">
                <div className="w-6 h-[2px] bg-purple" />
                {resultsTitle}
              </h4>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20">
                  <p className="text-[14px] md:text-[16px] leading-relaxed font-light text-gray-900/80 dark:text-white/80">
                    {results}
                  </p>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-purple/10 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <p className="text-[12px] md:text-[14px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider mb-1">
                Ready to get started?
              </p>
              <p className="text-[14px] md:text-[16px] font-switzer font-light text-gray-900/80 dark:text-white/80">
                Let&apos;s discuss your project and bring your vision to life
              </p>
            </div>
            
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="purple"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-purple/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;