"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/container";
import { FilterBar } from "./filter-bar";
import ProjectsList from "@/data/work";
import { WorkGrid } from "./work-grid";
import { BlurBG } from "@/components/blur-bg";
import { Briefcase, Calendar, Code, Palette, Search, Filter } from "lucide-react";

const WorkWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);
  const projectsNum = ProjectsList.length;
  const [skillValue, setSkillValue] = useState("");
  const [projects, setProjects] = useState(ProjectsList);

  const skills = Array.from(
    new Set(ProjectsList.flatMap((project) => project.tags)),
  ).sort();

  useEffect(() => {
    const filteredProjects =
      skillValue.length > 0
        ? ProjectsList.filter((project) =>
            project.tags.some((skill) => skill.includes(skillValue)),
          )
        : ProjectsList;

    setProjects(filteredProjects);
  }, [skillValue]);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const stats = [
    { icon: Briefcase, number: projectsNum.toString(), label: "Total Projects" },
    { icon: Calendar, number: "8+", label: "Years Experience" },
    { icon: Code, number: "15+", label: "Technologies" },
    { icon: Palette, number: "50+", label: "Happy Clients" },
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="border-b-[1px] border-b-gray-200 dark:border-b-gray-700 pb-16 md:pb-20">
          <Container className="px-4 pt-4 md:pt-7 md:px-7 lg:px-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-y-8"
            >
              {/* Header Content */}
              <motion.div variants={itemVariants} className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-purple" />
                  <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    My Portfolio
                  </span>
                </div>

                <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-gray-900 dark:text-white leading-tight mb-6">
                  From Vision to Value: A{" "}
                  <span className="text-gradient">Portfolio of Results</span>
                </h1>

                <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-gray-900/80 dark:text-white/80 max-w-3xl">
                  I partner with businesses to build digital solutions that not only look great but also deliver measurable success. 
                  Below are a few examples of how I&apos;ve helped clients overcome challenges and achieve their goals.
                </p>
              </motion.div>

              {/* Filter Controls */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-dark/60 dark:text-light/60" />
                    <span className="text-dark/60 dark:text-light/60 font-switzer font-medium text-[14px] uppercase tracking-wider">
                      Filter by:
                    </span>
                  </div>
                  <FilterBar
                    skillValue={skillValue}
                    setSkillValue={setSkillValue}
                    skills={skills}
                  />
                </div>
              </motion.div>

              {/* Results Counter */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple" />
                  <span className="text-gray-900 dark:text-white font-switzer font-medium text-[16px] md:text-[18px]">
                    {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} Found
                    {skillValue && (
                      <span className="text-dark/60 dark:text-light/60 font-light">
                        {' '}for &quot;{skillValue}&quot;
                      </span>
                    )}
                  </span>
                </div>

                {skillValue && (
                  <button
                    onClick={() => setSkillValue("")}
                    className="text-purple hover:text-purple/80 font-switzer font-medium text-[14px] uppercase tracking-wider transition-colors duration-200"
                  >
                    Clear Filter
                  </button>
                )}
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </motion.section>

      {/* Projects Showcase */}
      <section className="py-16 md:py-20">
        <WorkGrid selectedSkill={skillValue} projects={projects} />
      </section>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-20"
        >
          <Container className="px-4 md:px-7 lg:px-0 text-center">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-12 md:p-16 overflow-hidden max-w-2xl mx-auto">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple/10 rounded-2xl flex items-center justify-center">
                  <Search className="w-8 h-8 text-purple" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold font-ao text-gray-900 dark:text-white mb-4">
                  No Projects Found
                </h3>
                <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                  No projects match your current filter criteria. Try adjusting your search or browse all projects.
                </p>
                <button
                  onClick={() => setSkillValue("")}
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-xl uppercase font-medium font-switzer text-[14px] transition-colors duration-300"
                >
                  Clear Filter & View All Projects
                </button>
              </div>
            </div>
          </Container>
        </motion.section>
      )}
    </>
  );
};

export default WorkWrapper;