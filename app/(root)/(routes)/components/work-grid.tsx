"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Eye,
  Play,
  Code,
  Palette,
  Zap,
  Star,
} from "lucide-react";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/work";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";

interface WorkGridProps {
  projects: Project[];
  selectedSkill?: string;
}

export const WorkGrid = ({ projects, selectedSkill }: WorkGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (projectName: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(projectName);
      return newSet;
    });
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={containerRef} className="space-y-20">
      {/* Projects Grid */}
      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              className="group relative"
            >
              <Link href={`/work/${project.slug}`}>
                <motion.div
                  className="relative bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor group cursor-pointer h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlurBG className="rounded-3xl" />

                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {project.imgUrl && (
                      <>
                        {!loadedImages.has(project.name) && (
                          <Skeleton className="w-full h-full" />
                        )}
                        <Image
                          src={project.imgUrl}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          alt={project.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onLoad={() => handleImageLoad(project.name)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </>
                    )}

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 dark:bg-dark/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                        <span className="text-purple font-switzer font-medium text-[12px] uppercase tracking-wider">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-purple/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Eye className="w-6 h-6 text-purple" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="relative z-20 p-6">
                    <div className="mb-4">
                      <h3 className="text-[20px] md:text-[22px] font-bold font-ao text-dark dark:text-light capitalize mb-2 group-hover:text-purple transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-[10px] px-2 py-1 rounded-lg border uppercase font-medium transition-all duration-200 ${
                            selectedSkill === tag
                              ? "bg-purple/20 border-purple/30 text-purple"
                              : "bg-light dark:bg-dark border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 group-hover:border-purple/30"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] px-2 py-1 rounded-lg border border-lightBorderColor dark:border-darkBorderColor text-dark/50 dark:text-light/50 uppercase font-medium">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-dark/40 dark:text-light/40" />
                        <span className="text-dark/60 dark:text-light/60 font-switzer font-light text-[12px]">
                          {project.year}
                        </span>
                      </div>

                      <ArrowRight className="w-5 h-5 text-dark/40 dark:text-light/40 group-hover:text-purple group-hover:translate-x-1 group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};
