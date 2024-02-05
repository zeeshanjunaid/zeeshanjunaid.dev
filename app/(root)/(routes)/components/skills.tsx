import React, { Fragment } from "react";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import { Skillset } from "@/data/about";

const Skills = () => {
  return (
    <Container className="flex flex-col gap-y-3 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px]">
        <div className="flex flex-col space-y-[6px]">
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
        </div>
        Skills
      </h2>
      <div className="flex flex-col gap-y-8 items-start">
        {Skillset.map((skillset, index) => (
          <div key={index}>
            <h3 className="font-medium relative inline-block px-4 py-2.5 bg-light dark:bg-dark rounded-xl overflow-hidden text-dark/80 dark:text-light/80 text-[12px]">
              <BlurBG className="rounded-xl" />
              <span className="relative z-20">{skillset.name}</span>
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
              {skillset.skills.map(({ link, name, icon: Icon }, index) => (
                <li key={index} className="">
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
        ))}
      </div>
    </Container>
  );
};

export default Skills;
