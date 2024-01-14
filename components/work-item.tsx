"use client";

import { ArrowRight } from "lucide-react";
import { BlurBG } from "./blur-bg";
import { MdArrowOutward } from "react-icons/md";
import React from "react";
import { cn } from "@/lib/utils";
interface WorkItemProps {
  name: string;
  year: number;
  tags: string[];
  link: string;
  selectedSkill?: string;
}
export const WorkItem = ({
  name,
  year,
  tags,
  link,
  selectedSkill,
}: WorkItemProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className="group cursor-pointer bg-transparent group w-full rounded-3xl bg-purple hover:bg-gradient-to-r from-[#ce55b0] via-[#f34dac] to-[#f48e66] from-[#f0b832] via-[#b2ce37] to-[#63d7af] from-[#1cc2df] via-[#0580e6] p-[2px] transition-background duration-200 overflow-hidden z-20"
    >
      <div className="relative px-6 md:px-8 py-6 bg-light dark:bg-dark rounded-3xl">
        <BlurBG className="rounded-3xl" />
        <div className="flex items-start gap-x-8 justify-between md:items-center relative z-20">
          <WorkYear year={year} />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-3 flex-1 flex-wrap">
            <WorkName name={name} />
            <div className="flex items-center flex-wrap gap-2 md:gap-2.5">
              {tags.map((tag, index) => (
                <WorkTag key={index} tag={tag} selectedSkill={selectedSkill} />
              ))}
            </div>
          </div>
          <span className="text-[24px] text-dark dark:text-light md:hidden">
            <ArrowRight className="group-hover:-rotate-45 transition duration-200" />
          </span>
        </div>
      </div>
    </a>
  );
};

const WorkYear = ({ year }: { year: number }) => (
  <span className="font-ao text-dark dark:text-light uppercase text-[10px] md:text-[12px] lg:text-[14px] pt-[3px] md:pt-0">
    {year}
  </span>
);
const WorkName = ({ name }: { name: string }) => (
  <h1 className="font-ao text-dark font-bold text-[18px] md:text-[20px] lg:text-[22px] dark:text-light uppercase">
    {name}
  </h1>
);
const WorkTag = ({
  tag,
  selectedSkill,
}: {
  tag: string;
  selectedSkill: string | undefined;
}) => (
  <div
    className={cn(
      "inline-flex uppercase px-4 py-2 text-[10px] md:text-[12px] text-dark dark:text-light border border-solid border-dark dark:border-light rounded-xl leading-[125%]",
      selectedSkill === tag &&
        "bg-purple/40 border-transparent dark:border-transparent",
    )}
  >
    {tag}
  </div>
);
