"use client";

import { MdArrowOutward } from "react-icons/md";
import React from "react";
import { BlurBG } from "./blur-bg";
interface WorkItemProps {
  name: string;
  year: number;
  tags: string[];
}
export const WorkItem = ({ name, year, tags }: WorkItemProps) => {
  return (
    <div className="cursor-pointer group w-full rounded-2xl hover:bg-gradient-to-r from-[#ce55b0] via-[#f34dac] to-[#f48e66] from-[#f0b832] via-[#b2ce37] to-[#63d7af] from-[#1cc2df] via-[#0580e6] p-[2px] transition duration-1000 overflow-hidden z-20">
      <div className="relative px-6 md:px-8 py-6 bg-light dark:bg-dark rounded-2xl">
        <BlurBG className="rounded-2xl" />
        <div className="flex items-start gap-x-8 justify-between md:items-center relative z-20">
          <WorkYear year={year} />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-3 flex-1 flex-wrap">
            <WorkName name={name} />
            <div className="flex items-center flex-wrap gap-2 md:gap-2.5">
              {tags.map((tag, index) => (
                <WorkTag key={index} tag={tag} />
              ))}
            </div>
          </div>
          <span className="text-[24px] text-dark dark:text-light md:hidden">
            <MdArrowOutward />
          </span>
        </div>
      </div>
    </div>
  );
};

const WorkYear = ({ year }: { year: number }) => (
  <span className="font-ao text-dark dark:text-light uppercase text-[12px] md:text-[16px] lg:text-[14px] pt-[3px] md:pt-0">
    {year}
  </span>
);
const WorkName = ({ name }: { name: string }) => (
  <h1 className="font-ao text-dark font-bold text-[18px] md:text-[20px] lg:text-[22px] dark:text-light uppercase">
    {name}
  </h1>
);
const WorkTag = ({ tag }: { tag: string }) => (
  <div className="inline-flex uppercase px-2.5 md:px-[12px] py-1.5 md:py-2 text-[10px] md:text-[12px] text-dark dark:text-light border border-solid border-dark dark:border-light rounded-full leading-[125%]">
    {tag}
  </div>
);
