"use client";

import React, { Fragment } from "react";

import { Container } from "@/components/container";
import SkillRow from "./skill-row";
import { Skillset } from "@/data/about";

const Skills = () => {
  return (
    <Container className="flex flex-col gap-y-3 px-4 md:px-7 lg:px-0 mt-8">
      <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px]">
        <div className="flex flex-col space-y-[6px]">
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
        </div>
        Skills
      </h2>
      <div className="flex flex-col gap-y-8 items-start">
        {Skillset.map((skillset, index) => (
          <SkillRow key={index} skillset={skillset} />
        ))}
      </div>
    </Container>
  );
};

export default Skills;
