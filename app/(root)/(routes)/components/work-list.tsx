"use client";

import { Container } from "@/components/container";
import type { Project } from "@/data/work";
import React from "react";
import { WorkItem } from "@/components/work-item";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface WorkListProps {
  title?: string;
  selectedSkill?: string;
  projects: Project[];
}
export const WorkList = ({ title, projects, selectedSkill }: WorkListProps) => {
  const pathanme = usePathname();
  return (
    <Container
      className={cn(
        "flex flex-col gap-y-3 px-4 md:px-7 lg:px-0",
        pathanme === "/work" ? "mt-[1rem]" : "mt-[3.125rem]",
      )}
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
            selectedSkill={selectedSkill}
          />
        ))}
      </ul>
    </Container>
  );
};
