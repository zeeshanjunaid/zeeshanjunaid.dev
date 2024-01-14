"use client";

import { Container } from "@/components/container";
import React from "react";
import { WorkItem } from "@/components/work-item";
interface WorkListProps {
  title?: string;
  projects: {
    name: string;
    year: number;
    tags: string[];
    link: string;
  }[];
}
export const WorkList = ({ title, projects }: WorkListProps) => {
  return (
    <Container
      className="mt-[3.125rem] flex flex-col gap-y-3 px-4
md:px-7 lg:px-0
    "
    >
      {title && (
        <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px]">
          <div className="flex flex-col space-y-[6px]">
            <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
            <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
          </div>
          {title}
        </h2>
      )}

      <ul className="flex flex-col gap-y-3">
        {projects.map(({ name, year, tags, link }, index) => (
          <WorkItem
            key={name + index}
            name={name}
            year={year}
            tags={tags}
            link={link}
          />
        ))}
      </ul>
    </Container>
  );
};
