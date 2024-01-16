"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@/components/container";
import { FilterBar } from "../components/filter-bar";
import ProjectsList from "@/data/work";
import ReachOut from "../components/reach-out";
import { ViewToggle } from "../components/view-toggle";
import { WorkGrid } from "../components/work-grid";
import { WorkList } from "../components/work-list";

const WorkPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const projectsNum = ProjectsList.length;
  const [gridView, setGridView] = useState(
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("zsGridView") || "false")
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
  return (
    <>
      <Container
        className="
        px-4 lg:px-0     
        flex
        flex-col
        space-y-6
        
        "
      >
        <h2 className="text-[28px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light">
          Projects ({projectsNum})
        </h2>
        <div className="flex justify-start items-center gap-x-2 md:gap-x-4">
          <FilterBar
            skillValue={skillValue}
            setSkillValue={setSkillValue}
            skills={skills}
          />
          <ViewToggle gridView={gridView} setGridView={setGridView} />
        </div>
      </Container>
      {gridView ? (
        <WorkGrid projects={projects} />
      ) : (
        <>
          <div className="border-b-[1px] border-b-borderDarkColor mt-12 pb-6">
            <Container className="px-4 lg:px-0">
              <div className="px-6 md:px-8">
                <div className="flex items-center gap-x-8 justify-between relative z-20">
                  <span className="text-dark dark:text-light uppercase text-[12px] font-light font-switzer">
                    year
                  </span>
                  <div className="flex md:justify-between items-center gap-y-3 flex-1">
                    <span className="text-dark dark:text-light uppercase text-[12px] font-light font-switzer">
                      name
                    </span>
                    <div className="flex items-center flex-wrap gap-2 md:gap-2.5 md:w-[290px]">
                      <span className="ml-2 text-dark dark:text-light uppercase text-[16px] font-light font-switzer md:hidden">
                        +
                      </span>
                      <span className="text-dark dark:text-light uppercase text-[12px] font-light font-switzer">
                        service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <WorkList selectedSkill={skillValue} projects={projects} />
        </>
      )}
      <ReachOut />
    </>
  );
};

export default WorkPage;
