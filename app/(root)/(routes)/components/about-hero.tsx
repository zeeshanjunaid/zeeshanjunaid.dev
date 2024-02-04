import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import Image from "next/image";
import React from "react";
const heroImg = "/images/zeeshan.png";
const paragraphStyles =
  "text-[16px] lg:text-[18px] text-dark/80 dark:text-light/80 leading-normal font-light";
const AboutHero = () => {
  return (
    <Container
      className="
    mt-8 lg:mt-6
    px-4 lg:px-0     
    flex
    flex-col md:flex-row
    gap-x-0 md:gap-x-6 lg:gap-x-12 
"
    >
      <div className="lg:flex flex-col w-full lg:w-2/3 px-6 md:px-0 lg:pr-8 py-12 md:py-8 justify-start flex-1  relative ">
        <h1 className="z-20 relative text-left text-[22px] md:text-[32px] lg:text-[40px] font-bold font-ao text-dark dark:text-light leading-tight">
          I&apos;m Zeeshan. A designer, developer and problem solver.
        </h1>
        <div className="mt-6 md:mt-8 flex flex-col gap-y-4">
          <p className={paragraphStyles}>
            The cusp of art and technology has always fascinated me and
            I&apos;ve never been afraid to just jump in and give it a go,
            whether it&apos;s Paint, Photoshop, Sketch or CSS. I&apos;ve been
            designing with computers since the day I first opened Microsoft
            Paint.
          </p>
          <p className={paragraphStyles}>
            Fast forward to 2023 and I&apos;ve tried it all, from Digital
            Campaign Design and Flash Actionscript to Web Design, Animation,
            HTML/CSS, No-Code Web Development, Product Design and Product
            Management. Everything I have done, small or big, has been a vital
            stepping stone for where I am today.
          </p>
          <p className={paragraphStyles}>
            What excites me most about being a Product Designer is being able to
            design and create things that have purpose and solve real problems.
            It goes beyond designing buttons and websites and involves having a
            passion for designing experiences and solutions that help people,
            whether it&apos;s helping them make better videos, market themselves
            online, or buy something online. Leaning into customer insight and
            understanding their needs, finding the right problems to solve,
            delivering solutions as quickly as possible, learning from those and
            then iterating and improving that value over time is the key to
            great product design.
          </p>
          <p className={paragraphStyles}>
            This is one of my favourite quotes (by Peter Drucker):
          </p>
          <h3 className="font-ao text-[18px] md:text-[20px] text-dark/90 dark:text-light/90 leading-relaxed">
            “There is nothing so useless as doing efficiently that which should
            not be done at all.”
          </h3>
          <p className={paragraphStyles}>
            This resonates so deeply with me because I have no desire to make
            pretty things just for the sake of it. Some people love that! But
            it&apos;s not for me. I only want to make, design or build ideas and
            products that are real, that matter and have an impact in the world.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[360px] lg:max-w-full h-[265px] sm:h-[355px] rounded-3xl relative mx-auto lg:w-1/3 -order-1 md:order-1 md:sticky md:top-[140px]">
        <BlurBG className="rounded-3xl" />
        <div className="absolute bottom-0 left-2/3 lg:left-auto lg:right-0 -translate-x-3/4 lg:translate-x-0 w-full h-full z-20">
          <Image
            loading="eager"
            fill
            alt="profile"
            src={heroImg}
            priority={true}
            className="scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom transition-opacity delay-750 duration-1000 user-select-none pointer-events-none"
          />
        </div>
      </div>
    </Container>
  );
};

export default AboutHero;
