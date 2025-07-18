"use client";

import React from "react";
import { Container } from "@/components/container";
import SkillRow from "./skill-row";
import { Skillset } from "@/data/about";
import { motion } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import { Code, Palette, Database, Cloud, Wrench, Shield } from "lucide-react";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skillCategoryIcons: { [key: string]: React.ReactNode } = {
    "Programming Languages": <Code className="w-5 h-5 text-purple" />,
    "Frontend Frameworks": <Palette className="w-5 h-5 text-purple" />,
    "CSS Tools/Libs/Frameworks": <Palette className="w-5 h-5 text-purple" />,
    "Databases": <Database className="w-5 h-5 text-purple" />,
    "Cloud Platforms": <Cloud className="w-5 h-5 text-purple" />,
    "Build Tools": <Wrench className="w-5 h-5 text-purple" />,
    "Security": <Shield className="w-5 h-5 text-purple" />,
  };

  const getIconForCategory = (categoryName: string) => {
    return skillCategoryIcons[categoryName] || <Code className="w-5 h-5 text-purple" />;
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple/3 rounded-full blur-3xl" />
      </div>

      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Technical Skills & Expertise
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              A comprehensive overview of the technologies, tools, and frameworks I work with to build exceptional digital experiences.
            </p>
          </motion.div>

          {/* Skills Overview Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            <div className="relative bg-light dark:bg-dark rounded-3xl p-6 overflow-hidden group">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-ao font-bold text-[18px] md:text-[20px] text-dark dark:text-light">
                      Frontend
                    </h3>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      Specialization
                    </p>
                  </div>
                </div>
                <p className="text-[14px] font-switzer font-light text-dark/80 dark:text-light/80 leading-relaxed">
                  React, Next.js, TypeScript, and modern frontend technologies for building exceptional user experiences.
                </p>
              </div>
            </div>

            <div className="relative bg-light dark:bg-dark rounded-3xl p-6 overflow-hidden group">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-ao font-bold text-[18px] md:text-[20px] text-dark dark:text-light">
                      Design
                    </h3>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      UI/UX Focus
                    </p>
                  </div>
                </div>
                <p className="text-[14px] font-switzer font-light text-dark/80 dark:text-light/80 leading-relaxed">
                  Figma, Adobe Creative Suite, and design systems for creating beautiful, functional interfaces.
                </p>
              </div>
            </div>

            <div className="relative bg-light dark:bg-dark rounded-3xl p-6 overflow-hidden group md:col-span-2 lg:col-span-1">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-6 h-6 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-ao font-bold text-[18px] md:text-[20px] text-dark dark:text-light">
                      Full-Stack
                    </h3>
                    <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                      End-to-End
                    </p>
                  </div>
                </div>
                <p className="text-[14px] font-switzer font-light text-dark/80 dark:text-light/80 leading-relaxed">
                  Node.js, databases, cloud platforms, and DevOps tools for complete application development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Detailed Skills */}
          <div className="space-y-12">
            {Skillset.map((skillset, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-purple/10 rounded-2xl flex items-center justify-center">
                    {getIconForCategory(skillset.name)}
                  </div>
                  <div>
                    <h3 className="font-ao font-bold text-[18px] md:text-[20px] lg:text-[24px] text-dark dark:text-light">
                      {skillset.name}
                    </h3>
                    <div className="w-12 h-[2px] bg-purple mt-1" />
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-10 overflow-hidden">
                  <BlurBG className="rounded-3xl" />
                  <div className="relative z-20">
                    <SkillRow skillset={skillset} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="relative bg-light dark:bg-dark rounded-3xl p-12 overflow-hidden">
              <BlurBG className="rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl" />
              
              <div className="relative z-20">
                <h3 className="font-ao font-bold text-[24px] md:text-[28px] lg:text-[32px] text-dark dark:text-light mb-4">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-8">
                  Let&apos;s combine these skills and technologies to create exceptional digital experiences for your project.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-purple hover:bg-purple/80 text-white rounded-xl uppercase font-medium font-switzer text-[14px] transition-colors duration-300"
                  >
                    Start a Project
                  </motion.a>
                  <motion.a
                    href="/work"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-lightBorderColor dark:border-darkBorderColor hover:border-purple text-dark dark:text-light hover:text-purple rounded-xl uppercase font-medium font-switzer text-[14px] transition-all duration-300"
                  >
                    View My Work
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Skills;