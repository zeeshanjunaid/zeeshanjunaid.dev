"use client";

import { SocialLinks } from "@/components/social-connect";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import CustomLink from "./custom-link";
import React from "react";
import { motion } from "framer-motion";


const ReachOut = () => {
  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative">
      <div className="py-8 px-5 md:p-12 lg:p-16 rounded-3xl relative flex flex-col justify-between items-start gap-y-[120px] md:gap-y-[140px] lg:gap-y-[160px] overflow-hidden">
        <div
          className="react-out-gradient w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] blur-[25px] rounded-full absolute -bottom-[50px] -right-[100px] lg:-bottom[50px] lg:-right-[60px] z-[5] opacity-80 dark:opacity-60 origin-center"
        />
        <BlurBG className="rounded-3xl" />
        
        <div className="relative z-[30]">
          <h2 className="mb-6 font-ao text-[24px] md:text-[36px] lg:text-[42px] font-bold text-gradient">
            Want to work together?
          </h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <div>
              <CustomLink
                text="hello[at]zeeshanjunaid[dot]dev"
                link="mailto:hello@zeeshanjunaid.dev"
                className="text-[14px] md:text-[18px] lg:text-[20px] font-switzer text-dark dark:text-light"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row w-max xs:w-full items-start gap-3 justify-start z-[30] relative">
          <div className="flex flex-wrap sm:flex-nowrap justify-start space-x-3">
            <SocialLinks />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReachOut;