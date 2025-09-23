"use client";

import { ArrowRight, ExternalLink, Calendar, MapPin } from "lucide-react";
import { BlurBG } from "@/components/blur-bg";
import CustomLink from "@/components/custom-link";
import React from "react";
import { WorkExperienceProps } from "@/data/about";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ExperienceTag = ({ children }: { children: React.ReactNode }) => (
  <div
    className={cn(
      "inline-flex uppercase px-3 py-1.5 text-[10px] md:text-[12px] text-gray-900/70 dark:text-white/70 border border-solid border-gray-900/15 dark:border-white/15 rounded-xl leading-[125%] hover:border-purple/30 hover:text-purple/80 transition-all duration-200",
    )}
  >
    {children}
  </div>
);

interface ExperienceCardProps {
  experience: WorkExperienceProps;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const { duration, role, company, companyLink, description, technologies } =
    experience;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="relative rounded-3xl overflow-hidden w-full group"
    >
      <div className="relative py-8 px-6 md:p-10 lg:p-12 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <BlurBG className="rounded-3xl" />
        
        {/* Hover Background Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 w-2 h-2 bg-purple/30 rounded-full group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple/20 rounded-full group-hover:scale-200 transition-transform duration-700" />

        <div className="relative z-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              {/* Duration Badge */}
              <div className="inline-flex items-center gap-2 bg-purple/10 px-4 py-2 rounded-xl mb-4">
                <Calendar className="w-4 h-4 text-purple" />
                <span className="text-[12px] md:text-[14px] font-switzer font-medium text-purple uppercase tracking-wider">
                  {duration}
                </span>
              </div>

              {/* Role & Company */}
              <h3 className="font-ao font-bold text-[20px] md:text-[24px] lg:text-[28px] text-gray-900 dark:text-white mb-3 leading-tight">
                {role}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-dark/60 dark:text-light/60 font-switzer font-light text-[14px] md:text-[16px]">
                  at
                </span>
                <CustomLink
                  text={company}
                  link={companyLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-switzer font-medium text-[14px] md:text-[16px] text-gray-900 dark:text-white hover:text-purple"
                />
                <ExternalLink className="w-4 h-4 text-dark/40 dark:text-light/40" />
              </div>
            </div>

            {/* External Link Button */}
            <motion.a
              href={companyLink}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden lg:flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple/30 hover:bg-purple/5 transition-all duration-300 group/link"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRight className="w-5 h-5 text-gray-900 dark:text-white group-hover/link:text-purple group-hover/link:-rotate-45 transition-all duration-300" />
            </motion.a>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-dark/90 dark:text-light/90 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-[12px] md:text-[14px] font-switzer font-medium text-dark/60 dark:text-light/60 uppercase tracking-wider mb-4">
              Technologies Used
            </h4>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center flex-wrap gap-2.5"
            >
              {technologies.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  variants={tagVariants}
                  custom={techIndex}
                >
                  <ExperienceTag>{tech}</ExperienceTag>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile External Link */}
        <div className="lg:hidden mt-6 relative z-20">
          <a
            href={companyLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-[14px] font-switzer font-medium text-purple hover:text-purple/80 transition-colors duration-200"
          >
            Visit {company}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;