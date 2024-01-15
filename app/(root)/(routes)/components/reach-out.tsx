'use client';
import { ResumeButton, SocialLinks } from "@/components/social-connect";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import React from "react";

const ReachOut = () => {
  return (
    <Container className="mt-8 lg:mt-12 px-5 md:px-7 lg:px-0 relative">
      <div className="py-8 px-5 md:p-12  lg:p-16 rounded-3xl relative flex flex-col justify-between items-start gap-y-[120px] md:gap-y-[140px] lg:gap-y-[160px] overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <div className="relative z-[20]">
          <h2 className="mb-6 font-ao text-[24px] md:text-[36px] lg:text-[42px] font-bold text-gradient">
            Want to work together?
          </h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <a
              className="text-[14px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light underline underline-purple underline-offset-4 hover:text-dark/90 dark:hover:text-light/90 transition-color duration-200"
              href="mailto:hello@zeeshanjunaid.dev"
            >
              hello@zeeshanjunaid.dev
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-max xs:w-full  items-start gap-3 justify-start z-[20] relative">
          <ResumeButton className="w-full xs:w-auto" />
          <div className="flex flex-wrap sm:flex-nowrap justify-start space-x-3">
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="reactout-gradient absolute w-[350px] h-[350px] bottom-0 right-0 z-20 rounded-full opacity-70" />
    </Container>
  );
};

export default ReachOut;
