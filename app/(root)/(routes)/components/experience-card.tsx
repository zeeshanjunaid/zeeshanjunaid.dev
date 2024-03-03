"use client";

import { ArrowRight } from "lucide-react";
import { BlurBG } from "@/components/blur-bg";
import CustomLink from "@/components/custom-link";
import React from "react";
import { WorkExperienceProps } from "@/data/about";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const ExperienceTag = ({ children }: { children: React.ReactNode }) => (
  <div
    className={cn(
      "inline-flex uppercase px-4 py-2 text-[10px] md:text-[12px] text-dark/70 dark:text-light/70 border border-solid border-dark/15 dark:border-light/15 rounded-xl leading-[125%]",
    )}
  >
    {children}
  </div>
);
interface ExperienceCardProps {
  experience: WorkExperienceProps;
}
const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { duration, role, company, companyLink, description, technologies } =
    experience;
  return (
    <div className="relative rounded-3xl overflow-hidden w-full py-8 px-5 md:p-12  lg:p-16">
      <BlurBG className="rounded-3xl" />
      <div className="relative z-20 flex gap-x-2 justify-between items-start">
        <div className=" flex lg:justify-between lg:items-start lg:gap-4 flex-col lg:flex-row">
          <span className="min-w-max font-light text-[12px] md:text-[14px] leading-loose text-dark/60 dark:text-light/60 lg:pt-[2px] flex-1">
            {duration}
          </span>
          <div className="flex flex-col">
            <h3 className="font-ao font-bold text-[18px] md:text-[20px] lg:text-[22px] mb-4 inline-flex flex-wrap">
              {role} @
              <CustomLink
                text={company}
                link={companyLink}
                rel="noreferrer noopener"
                className="ml-1"
              />
            </h3>
            <div className="text-dark/90 dark:text-light/90 text-[14px] leading-relaxed md:text-[16px] flex flex-col gap-y-2.5">
              <p>{description}</p>
            </div>
            <div className="flex items-center flex-wrap gap-2.5 mt-5">
              {technologies.map((tech, index) => (
                <ExperienceTag key={index}>{tech}</ExperienceTag>
              ))}
            </div>
          </div>
        </div>
        <motion.a
          initial="initial"
          whileHover="whileHover"
          href="https://passage.xyz/"
          variants={{
            initial: {
              opacity: 0.25,
              rotate: "0deg",
              scale: 1,
            },
            whileHover: {
              opacity: 1,
              rotate: "-25deg",
              scale: 1.125,
            },
          }}
          transition={{
            duration: 0.2,
            type: "tween",
            ease: "easeInOut",
          }}
          className="text-dark dark:text-light hidden md:block"
        >
          <ArrowRight size={28} />
        </motion.a>
      </div>
    </div>
  );
};

export default ExperienceCard;
