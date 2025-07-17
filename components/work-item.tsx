"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { ArrowRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { BlurBG } from "./blur-bg";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WorkItemProps {
  name: string;
  year: number;
  tags: string[];
  link: string;
  imgUrl?: string;
  selectedSkill?: string;
}
export const WorkItem = ({
  name,
  year,
  tags,
  link,
  imgUrl,
  selectedSkill,
}: WorkItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  const xSpring = useSpring(xValue);
  const ySpring = useSpring(yValue);

  const top = useTransform(ySpring, [0.5, -0.5], ["20%", "40%"]);
  const left = useTransform(xSpring, [0.5, -0.5], ["30%", "40%"]);

  const handleMouseMove = (e: any) => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = x / rect.width - 0.5;
      const yPct = y / rect.height - 0.5;

      xValue.set(xPct);
      yValue.set(yPct);
    }
  };

  // Create slug from name for internal linking
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <motion.li
      onMouseMove={handleMouseMove}
      ref={itemRef}
      initial="initial"
      whileHover="whileHover"
      className={cn(
        "group relative w-full rounded-3xl p-[2px] transition duration-200",
      )}
    >
      <Link href={`/work/${slug}`}>
        <div className="relative px-6 md:px-8 py-6  rounded-3xl">
          <motion.div
            variants={{
              initial: {
                opacity: 0,
              },
              whileHover: {
                opacity: 1,
              },
            }}
            transition={{
              type: "spring",
              duration: 0.2,
            }}
            className="rounded-3xl z-[5] absolute top-0 left-0 right-0 bottom-0 work-item-gradient w-full h-full"
          />

          <BlurBG className="rounded-3xl" />
          <div className="flex items-start gap-x-8 justify-between md:items-center relative z-20">
            <WorkYear year={year} />
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-3 flex-1 flex-wrap">
              <WorkName name={name} />

              <div className="flex items-center flex-wrap gap-2 md:gap-2.5">
                {tags.map((tag, index) => (
                  <WorkTag
                    key={index}
                    tag={tag}
                    selectedSkill={selectedSkill}
                  />
                ))}
              </div>
            </div>

            <motion.span
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
              className="text-[24px] text-dark dark:text-light md:hidden"
            >
              <ArrowRight />
            </motion.span>
          </div>
        </div>
        <WorkImg top={top} left={left} imgUrl={imgUrl} />
      </Link>
    </motion.li>
  );
};
export const WorkImg = ({
  imgUrl,
  top,
  left,
}: {
  imgUrl?: string;
  top: any;
  left: any;
}) => {
  const [isLoaded, setIsLoaded] = useState(true);
  if (!imgUrl) {
    return null;
  }
  return (
    <motion.div
      variants={{
        initial: {
          rotate: "-6.5deg",
          scale: 0,
          zIndex: "11",
        },
        whileHover: {
          rotate: "6.5deg",
          scale: 1,
          zIndex: 40,
        },
      }}
      transition={{
        type: "spring",
        duration: 0.2,
      }}
      style={{ top, left, transform: "translate(-50%, -50%)" }}
      className="absolute w-[350px] transition origin-center shadow-3xl -mt-[60px] hidden md:block"
    >
      <div className="relative w-full">
        <AspectRatio ratio={16 / 9}>
          {!isLoaded && <Skeleton className="w-full h-full" />}
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            alt="work image"
            src={imgUrl}
            onLoad={() => setIsLoaded(false)}
          />
        </AspectRatio>
      </div>
    </motion.div>
  );
};
export const WorkYear = ({ year }: { year: number }) => (
  <span className="font-ao text-dark/50 dark:text-light/50 uppercase text-[10px] md:text-[12px] pt-1 md:pt-0">
    {year}
  </span>
);
const WorkName = ({ name }: { name: string }) => (
  <h2 className="font-ao text-dark font-bold text-[18px] md:text-[20px] lg:text-[22px] dark:text-light uppercase">
    {name}
  </h2>
);
export const WorkTag = ({
  tag,
  selectedSkill,
}: {
  tag: string;
  selectedSkill: string | undefined;
}) => (
  <div
    className={cn(
      "inline-flex uppercase px-4 py-2 text-[10px] md:text-[12px] text-dark/70 dark:text-light/70 border border-solid border-dark/15 dark:border-light/15 rounded-xl leading-[125%]",
      selectedSkill === tag &&
        "bg-purple/40 border-transparent dark:border-transparent",
    )}
  >
    {tag}
  </div>
);
