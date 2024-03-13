"use client";

import { MdCode, MdDesignServices } from "react-icons/md";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import CustomLink from "@/components/custom-link";
import Link from "next/link";
import React from "react";
import { servicesCategories } from "@/data/services";

const Services = () => {
  return (
    <Container className="flex flex-col gap-y-3 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px]">
        <div className="flex flex-col space-y-[6px]">
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
          <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
        </div>
        services
      </h2>
      <div className="px-5 md:px-6 py-8 w-full bg-light dark:bg-dark rounded-3xl relative overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <ul className="w-full flex flex-wrap gap-2 md:gap-3 items-center z-20 relative">
          {servicesCategories.map(({ name, icon: Icon }, index) => (
            <React.Fragment key={index}>
              <li className="uppercase font-ao text-dark dark:text-light text-[12px] md:text-[14px] flex items-center gap-x-1 md:gap-x-2  px-4 py-2 w-max">
                {Icon && <Icon className="text-purple -mt-[3px]" size="18" />}
                {name}
              </li>
              <li className="text-[20px] font-switzer font-light text-dark/50 dark:text-light/40">
                /
              </li>
            </React.Fragment>
          ))}

          <li>
            <CustomLink
              className="text-[14px] font-ao text-dark dark:text-light uppercase px-2 py-2 flex items-center"
              link="/services"
              text="View All"
              internal
            />
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Services;
