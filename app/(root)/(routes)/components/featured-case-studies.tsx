"use client";

import { Container } from "@/components/container";
import React from "react";
import { motion } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import { ArrowRight, ExternalLink, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/work";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface FeaturedCaseStudiesProps {
  projects: Project[];
}

const FeaturedCaseStudies = ({ projects }: FeaturedCaseStudiesProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Get the key result from the results array or string
  const getKeyResult = (project: Project) => {
    if (Array.isArray(project.results)) {
      return project.results[0] || "Delivered exceptional results";
    }
    return project.results || "Delivered exceptional results";
  };

  return (
    <Container className="flex flex-col gap-y-8 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
            <div className="flex flex-col space-y-[6px]">
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
            </div>
            Featured Case Studies
          </h2>
          <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
            Real Projects, Real Results
          </h3>
          <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-3xl">
            See how I've helped businesses like yours achieve their goals through strategic design and development.
          </p>
        </motion.div>

        <div className="space-y-8 lg:space-y-12">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300">
                <BlurBG className="rounded-3xl" />
                
                <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-10 lg:p-12">
                  {/* Content Side */}
                  <div className="flex flex-col justify-center order-2 lg:order-1">
                    {/* Year Badge */}
                    <div className="inline-flex items-center gap-2 bg-purple/10 px-4 py-2 rounded-xl mb-4 w-fit">
                      <Calendar className="w-4 h-4 text-purple" />
                      <span className="text-[12px] md:text-[14px] font-switzer font-medium text-purple uppercase tracking-wider">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h4 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-dark dark:text-light mb-3 capitalize leading-tight">
                      {project.name}
                    </h4>

                    {/* One-liner Description */}
                    <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Key Result */}
                    <div className="relative bg-light dark:bg-dark rounded-2xl p-6 mb-6 border border-lightBorderColor dark:border-darkBorderColor overflow-hidden">
                      <BlurBG className="rounded-2xl" />
                      <div className="relative z-20 flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-[12px] font-switzer font-medium text-green-500 uppercase tracking-wider mb-1">
                            Key Result
                          </p>
                          <p className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px] leading-tight">
                            {getKeyResult(project)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-[10px] md:text-[12px] px-3 py-1.5 rounded-lg border border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 uppercase font-medium bg-light dark:bg-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/work/${project.slug}`}>
                        <Button
                          variant="purple"
                          size="lg"
                          className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 w-full sm:w-auto"
                        >
                          View Case Study
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          size="lg"
                          className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2 w-full sm:w-auto"
                        >
                          View Live Site
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="order-1 lg:order-2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      {project.imgUrl && (
                        <>
                          {!loadedImages.has(project.name) && (
                            <Skeleton className="w-full h-full" />
                          )}
                          <Image
                            src={project.imgUrl}
                            fill
                            className="object-cover"
                            alt={project.name}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onLoad={() => handleImageLoad(project.name)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Work CTA */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link href="/work">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2 mx-auto"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default FeaturedCaseStudies;