"use client";

import React, { useState } from "react";
import { WorkTag, WorkYear } from "@/components/work-item";

import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/work";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface WorkGridProps {
  projects: Project[];
  selectedSkill?: string;
}
export const WorkGrid = ({ projects, selectedSkill }: WorkGridProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const projectsWithImages = projects.filter(
    (project) => project.imgUrl !== undefined && project.imgUrl !== "",
  );

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

  return (
    <>
      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map(
            ({ name, slug, link, imgUrl, tags, year }) =>
              imgUrl && (
                <motion.div
                  key={name}
                  variants={itemVariants}
                  className="group"
                >
                  <Link
                    href={`/work/${slug}`}
                    className="block"
                  >
                    <div className="relative bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 group-hover:scale-[1.02]">
                      <BlurBG className="rounded-3xl" />
                      
                      {/* Project Image */}
                      <div className="relative z-20 p-4">
                        <div className="relative w-full mb-4">
                          <AspectRatio ratio={16 / 9}>
                            {!isLoaded && <Skeleton className="w-full h-full rounded-2xl" />}
                            <Image
                              className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt={name}
                              src={imgUrl}
                              onLoad={() => setIsLoaded(false)}
                            />
                          </AspectRatio>
                          
                          {/* Year Badge */}
                          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] md:text-[12px] font-switzer font-medium uppercase tracking-wider">
                            {year}
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold font-ao text-dark dark:text-light text-[18px] md:text-[20px] capitalize group-hover:text-purple transition-colors duration-300">
                              {name}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-dark/40 dark:text-light/40 group-hover:text-purple group-hover:-rotate-45 transition-all duration-300" />
                          </div>
                          
                          <div className="flex items-center flex-wrap gap-2">
                            {tags.slice(0, 3).map((tag, index) => (
                              <WorkTag
                                key={index}
                                tag={tag}
                                selectedSkill={selectedSkill}
                              />
                            ))}
                            {tags.length > 3 && (
                              <span className="text-[10px] md:text-[12px] text-dark/50 dark:text-light/50 font-switzer font-light">
                                +{tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                    </div>
                  </Link>
                </motion.div>
              ),
          )}
        </motion.div>
      </Container>
    </>
  );
};
                  href={`/work/${slug}`}
                  key={name}
                  className={cn(
                    "flex flex-col gap-y-1.5 lg:gap-y-2.5 group",
                    projectsWithImages.length % 2 !== 0 && "md:last:col-span-2",
                  )}
                >
                  <WorkYear year={year} />
                  <div className="relative w-full">
                    <AspectRatio ratio={16 / 9}>
                      {!isLoaded && <Skeleton className="w-full h-full" />}
                      <Image
                        className="z-20 object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={name}
                        src={imgUrl}
                        onLoad={() => setIsLoaded(false)}
                      />
                    </AspectRatio>
                  </div>

                  <div className="flex flex-col gap-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-bold font-ao text-dark dark:text-light text-[16px] md:text-[18px] lg:text-[20px] capitalize">
                        {name}
                      </h3>
                      <span className="text-[24px] text-dark dark:text-light">
                        <ArrowRight className="group-hover:-rotate-45 transition duration-200" />
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-2 md:gap-2.5">
                      {tags.map((tag, index) => (
                        <WorkTag
                          key={index}
                          tag={tag}
                          selectedSkill={selectedSkill}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
      </Container>
    </>
  );
};
