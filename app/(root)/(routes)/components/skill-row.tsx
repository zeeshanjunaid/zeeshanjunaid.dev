"use client";

import { BlurBG } from "@/components/blur-bg";
import React from "react";
import { SkillProps } from "@/data/about";
interface SkillRowProps {
  skillset: any;
}
const SkillRow = ({ skillset }: SkillRowProps) => {
  return (
    <div>
      <h3 className="font-medium relative inline-block px-4 py-2.5 bg-light dark:bg-dark rounded-xl overflow-hidden text-dark/80 dark:text-light/80 text-[12px]">
        <BlurBG className="rounded-xl" />
        <span className="relative z-20">{skillset.name}</span>
      </h3>
      <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
        {skillset.skills.map(({ link, name, icon: Icon }: SkillProps) => (
          <li key={name} className="">
            {link ? (
              <a
                className="text-dark dark:text-light text-[16px] font-light px-3 py-1.5 hover:bg-purple/20 rounded-xl flex gap-x-1 transition duration-200 items-center"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icon && <Icon size="18" />}
                {name}
              </a>
            ) : (
              <p className="text-dark dark:text-light text-[16px] font-light px-3 py-1.5 hover:bg-purple/20 rounded-xl flex gap-x-1 transition duration-200 items-center">
                {Icon && <Icon size="18" />}
                {name}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillRow;
