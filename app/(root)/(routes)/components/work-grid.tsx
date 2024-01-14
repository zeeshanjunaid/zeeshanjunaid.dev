"use client";

import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/container";
import Image from "next/image";
import type { Project } from "@/data/work";
import React from "react";
interface WorkGridProps {
  projects: Project[];
}
export const WorkGrid = ({ projects }: WorkGridProps) => {
  return (
    <Container className="mt-8 lg:mt-12 px-5 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8">
        {projects.map(
          ({ name, link, imgUrl }) =>
            imgUrl && (
              <a
                href={link}
                target="_blank"
                key={name}
                className="flex flex-col gap-y-1.5 lg:gap-y-2.5 group"
              >
                <div className="relative w-full">
                  <AspectRatio ratio={16 / 9}>
                    <Image fill objectFit="cover" alt={name} src={imgUrl} />
                  </AspectRatio>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h3 className="text-2xl font-bold font-ao text-dark dark:text-light text-[20px] capitalize">
                    {name}
                  </h3>
                  <span className="text-[24px] text-dark dark:text-light">
                    <ArrowRight className="group-hover:-rotate-45 transition duration-200" />
                  </span>
                </div>
              </a>
            ),
        )}
      </div>
    </Container>
  );
};
