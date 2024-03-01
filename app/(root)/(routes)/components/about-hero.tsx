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
            Hello! I&apos;m a passionate and innovative Frontend Developer with
            a rich background in building sophisticated web applications and
            digital solutions. My journey through the tech industry has led me
            to work with forward-thinking companies like Passage Protocol,
            Ledgy, Mindable Media, and The Bureau Dubai, where I&apos;ve left a
            mark through my commitment to excellence and creative
            problem-solving.
          </p>
          <p className={paragraphStyles}>
            Specializing in React, TypeScript, and Node.js, my expertise spans
            the full spectrum of web development, from conceptualizing and
            designing user-centric interfaces to developing robust, scalable
            applications. My approach to development is holistic; I believe in
            the power of seamless collaboration between design and technology to
            create digital experiences that not only meet but exceed user
            expectations.
          </p>
          <p className={paragraphStyles}>
            Driven by a passion for continuous learning and innovation,
            I&apos;ve embraced the challenges of modern web development,
            including the integration of Web 3.0 technologies and the
            application of Agile methodologies to ensure efficient and effective
            project management. My work is characterized by a meticulous
            attention to detail, a relentless pursuit of quality, and a constant
            exploration of new technologies and practices to stay at the
            forefront of the industry.
          </p>
          <p className={paragraphStyles}>
            This is one of my favourite quotes (by Matt Mullenweg):
          </p>
          <h3 className="font-ao text-[18px] md:text-[20px] text-dark/90 dark:text-light/90 leading-relaxed">
            “Technology is best when it brings people together.”
          </h3>
          <p className={paragraphStyles}>
            Outside of work, I&apos;m an avid learner, always seeking out new
            knowledge and skills in both technology and design. I believe in
            giving back to the community and often participate in tech meetups
            and conferences, sharing insights and learning from peers. My career
            is more than just a job; it&apos;s a journey of passion, innovation,
            and continuous growth.
          </p>
        </div>
      </div>
      <div className="w-full max-w-[360px] lg:max-w-full h-[265px] sm:h-[355px] rounded-3xl relative mx-auto lg:w-1/3 -order-1 md:order-1 md:sticky md:top-[140px]">
        <BlurBG className="rounded-3xl" />
        <div className="absolute bottom-0 left-2/3 lg:left-auto lg:right-0 -translate-x-3/4 lg:translate-x-0 w-full h-full z-20">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="profile"
            src={heroImg}
            className="scale-125 lg:scale-[135%] 2xl:scale-[120%] origin-bottom object-contain object-bottom transition-opacity delay-750 duration-1000 user-select-none pointer-events-none"
          />
        </div>
      </div>
    </Container>
  );
};

export default AboutHero;
