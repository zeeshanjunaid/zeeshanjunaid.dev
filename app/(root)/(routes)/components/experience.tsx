"use client";

import { Container } from "@/components/container";
import ExperienceCard from "./experience-card";
import React from "react";
import { WorkExperience } from "@/data/about";
import { motion } from "framer-motion";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple/2 rounded-full blur-3xl" />
      </div>

      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={headerVariants} className="mb-12">
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-gray-900 dark:text-white uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Professional Experience
            </h2>
            <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              My journey through the tech industry, working with innovative companies and building impactful digital solutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {WorkExperience.map((experience, index) => (
              <ExperienceCard 
                experience={experience} 
                key={index} 
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Experience;
