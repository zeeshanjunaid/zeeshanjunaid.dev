"use client";

import React, { useState } from "react";
import { WorkTag, WorkYear } from "@/components/work-item";

import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/container";
import Image from "next/image";
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
  return (
    <>
      <div className="border-b border-b-borderDarkColor w-full mt-8 lg:mt-12" />
      <Container className="mt-8 lg:mt-12 px-5 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-12">
          {projects.map(
            ({ name, link, imgUrl, tags, year }) =>
              imgUrl && (
                <a
                  href={link}
                  target="_blank"
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
                </a>
              ),
          )}
        </div>
      </Container>
    </>
  );
};
