"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/container";
import { FilterBar } from "./filter-bar";
import ProjectsList from "@/data/work";
import { ViewToggle } from "./view-toggle";
import { WorkGrid } from "./work-grid";
import { WorkList } from "./work-list";
import { BlurBG } from "@/components/blur-bg";
import { Briefcase, Calendar, Code, Palette, Search, Filter } from "lucide-react";

const WorkWrapper = () => {
  const [isMounted, setIsMounted] = useState(false);
  const projectsNum = ProjectsList.length;
  const [gridView, setGridView] = useState(
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("zsGridView") || "true")
      : false,
  );
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
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("zsGridView", JSON.stringify(gridView));
    }
  }, [gridView]);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

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

        <div className="border-b-[1px] border-b-lightBorderColor dark:border-b-darkBorderColor pb-16 md:pb-20">
          <Container className="px-4 md:px-7 lg:px-0">
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

                <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
                  Featured Projects &{" "}
                  <span className="text-gradient">Case Studies</span>
                </h1>

                <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-dark/80 dark:text-light/80 max-w-3xl">
                  Explore my collection of web applications, digital experiences, and creative solutions. 
                  Each project represents a unique challenge solved through innovative design and development.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-purple/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-purple" />
                      </div>
                      <div className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-1">
                        {stat.number}
                      </div>
                      <div className="text-[10px] md:text-[12px] font-switzer font-light text-dark/70 dark:text-light/70 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Filter Controls */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
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

                <div className="flex items-center gap-4">
                  <span className="text-dark/60 dark:text-light/60 font-switzer font-medium text-[14px] uppercase tracking-wider">
                    View:
                  </span>
                  <ViewToggle gridView={gridView} setGridView={setGridView} />
                </div>
              </motion.div>

              {/* Results Counter */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple" />
                  <span className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px]">
                    {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} Found
                    {skillValue && (
                      <span className="text-dark/60 dark:text-light/60 font-light">
                        {' '}for "{skillValue}"
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

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-8 md:py-12"
      >
        {gridView ? (
          <WorkGrid selectedSkill={skillValue} projects={projects} />
        ) : (
          <>
            {/* List Header */}
            <div className="border-b-[1px] border-b-lightBorderColor dark:border-b-darkBorderColor pb-6 mb-8">
              <Container className="px-4 md:px-7 lg:px-0">
                <div className="relative bg-light dark:bg-dark rounded-2xl p-6 md:p-8 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <div className="flex items-center gap-x-8 justify-between">
                      <span className="text-dark/60 dark:text-light/60 uppercase text-[12px] font-light font-switzer tracking-wider">
                        Year
                      </span>
                      <div className="flex md:justify-between items-center gap-y-3 flex-1">
                        <span className="text-dark/60 dark:text-light/60 uppercase text-[12px] font-light font-switzer tracking-wider">
                          Project Name
                        </span>
                        <div className="flex items-center flex-wrap gap-2 md:gap-2.5 md:w-[290px]">
                          <span className="ml-2 text-dark/60 dark:text-light/60 uppercase text-[16px] font-light font-switzer md:hidden">
                            +
                          </span>
                          <span className="text-dark/60 dark:text-light/60 uppercase text-[12px] font-light font-switzer tracking-wider">
                            Technologies
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <WorkList selectedSkill={skillValue} projects={projects} />
          </>
        )}
      </motion.section>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-20"
        >
          <Container className="px-4 md:px-7 lg:px-0 text-center">
            <div className="relative bg-light dark:bg-dark rounded-3xl p-12 md:p-16 overflow-hidden max-w-2xl mx-auto">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple/10 rounded-2xl flex items-center justify-center">
                  <Search className="w-8 h-8 text-purple" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-4">
                  No Projects Found
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                  No projects match your current filter criteria. Try adjusting your search or browse all projects.
                </p>
                <button
                  onClick={() => setSkillValue("")}
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple hover:bg-purple/80 text-white rounded-xl uppercase font-medium font-switzer text-[14px] transition-colors duration-300"
                >
                  View All Projects
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