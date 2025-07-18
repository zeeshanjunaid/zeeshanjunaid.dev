"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Eye } from "lucide-react";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/work";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurBG } from "@/components/blur-bg";

interface WorkGridProps {
  projects: Project[];
  selectedSkill?: string;
}

export const WorkGrid = ({ projects, selectedSkill }: WorkGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (projectName: string) => {
    setLoadedImages(prev => new Set([...prev, projectName]));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Create different card sizes for visual interest
  const getCardSize = (index: number) => {
    const patterns = [
      "col-span-1 row-span-1", // Small
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-2", // Tall
      "col-span-2 row-span-2", // Large
    ];
    
    // Create a pattern that ensures variety
    if (index === 0) return "col-span-2 row-span-2"; // First item is large
    if (index % 5 === 0) return "col-span-2 row-span-1"; // Every 5th is wide
    if (index % 7 === 0) return "col-span-1 row-span-2"; // Every 7th is tall
    if (index % 11 === 0) return "col-span-2 row-span-2"; // Every 11th is large
    return "col-span-1 row-span-1"; // Default small
  };

  const getImageHeight = (size: string) => {
    if (size.includes("row-span-2")) return "h-[400px] md:h-[500px]";
    return "h-[250px] md:h-[300px]";
  };

  return (
    <Container className="px-4 md:px-7 lg:px-0">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max"
        style={{ gridAutoRows: "minmax(250px, auto)" }}
      >
        {projects.map((project, index) => {
          if (!project.imgUrl) return null;
          
          const cardSize = getCardSize(index);
          const imageHeight = getImageHeight(cardSize);
          const isLoaded = loadedImages.has(project.name);
          const isLarge = cardSize.includes("col-span-2") && cardSize.includes("row-span-2");
          const isWide = cardSize.includes("col-span-2") && !cardSize.includes("row-span-2");
          const isTall = cardSize.includes("row-span-2") && !cardSize.includes("col-span-2");

          return (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className={`group relative ${cardSize}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/work/${project.slug}`} className="block h-full">
                <div className="relative h-full bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor group-hover:border-purple/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple/10">
                  <BlurBG className="rounded-3xl" />
                  
                  {/* Project Image */}
                  <div className={`relative w-full ${imageHeight} overflow-hidden`}>
                    {!isLoaded && <Skeleton className="w-full h-full" />}
                    <Image
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      fill
                      sizes={
                        isLarge ? "(max-width: 768px) 100vw, 50vw" :
                        isWide ? "(max-width: 768px) 100vw, 40vw" :
                        "(max-width: 768px) 100vw, 25vw"
                      }
                      alt={project.name}
                      src={project.imgUrl}
                      onLoad={() => handleImageLoad(project.name)}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-dark px-3 py-1.5 rounded-xl text-[10px] md:text-[12px] font-switzer font-bold uppercase tracking-wider">
                      {project.year}
                    </div>
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Eye className="w-6 h-6 text-purple" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="relative z-20 p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold font-ao text-dark dark:text-light capitalize group-hover:text-purple transition-colors duration-300 leading-tight ${
                          isLarge ? 'text-[20px] md:text-[24px] lg:text-[28px]' :
                          isWide ? 'text-[18px] md:text-[22px]' :
                          'text-[16px] md:text-[18px]'
                        }`}>
                          {project.name}
                        </h3>
                        
                        {/* Description for larger cards */}
                        {(isLarge || isWide) && project.description && (
                          <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[12px] md:text-[14px] leading-relaxed mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                      
                      <motion.div
                        className="ml-3 flex-shrink-0"
                        whileHover={{ rotate: -45, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5 text-dark/40 dark:text-light/40 group-hover:text-purple transition-colors duration-300" />
                      </motion.div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex items-center flex-wrap gap-1.5 md:gap-2">
                      {project.tags.slice(0, isLarge ? 5 : isWide ? 4 : 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`inline-flex uppercase px-2 py-1 text-[9px] md:text-[10px] text-dark/70 dark:text-light/70 border border-solid border-dark/15 dark:border-light/15 rounded-lg leading-tight transition-all duration-200 ${
                            selectedSkill === tag
                              ? "bg-purple/20 border-purple/30 text-purple"
                              : "hover:border-purple/30 hover:text-purple/80"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > (isLarge ? 5 : isWide ? 4 : 3) && (
                        <span className="text-[9px] md:text-[10px] text-dark/50 dark:text-light/50 font-switzer font-light">
                          +{project.tags.length - (isLarge ? 5 : isWide ? 4 : 3)}
                        </span>
                      )}
                    </div>

                    {/* External Link for larger cards */}
                    {(isLarge || isWide) && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-lightBorderColor dark:border-darkBorderColor">
                        <ExternalLink className="w-3 h-3 text-dark/40 dark:text-light/40" />
                        <span className="text-[10px] md:text-[12px] text-dark/60 dark:text-light/60 font-switzer font-medium uppercase tracking-wider">
                          View Case Study
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-200 transition-all duration-700" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
};