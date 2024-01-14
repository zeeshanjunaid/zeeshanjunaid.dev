"use client";

import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import ProjectsList from "@/data/work";
import ReachOut from "../components/reach-out";
import { WorkList } from "../components/work-list";

const WorkPage = () => {
  const projectsNum = ProjectsList.length;
  const [gridView, setGridView] = useState(false);
  return (
    <>
      <Container
        className="
        px-4 lg:px-0     
        flex
        flex-col
        space-y-6"
      >
        <h2 className="text-[28px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light">
          Projects ({projectsNum})
        </h2>
        <div className="flex justify-start items-center">
          <ToggleGroup type="single" className="relative rounded-xl p-1">
            <BlurBG className="rounded-xl" />
            <ToggleGroupItem
              onClick={() => setGridView(false)}
              value="list"
              aria-label="Toggle list"
              className="rounded-xl z-20 data-[state=on]:bg-purple hover:bg-purple/10"
              data-state={!gridView ? "on" : "off"}
            >
              <LuLayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              onClick={() => setGridView(true)}
              value="grid"
              aria-label="Toggle grid"
              className="rounded-xl z-20 data-[state=on]:bg-purple hover:bg-purple/10"
              data-state={gridView ? "on" : "off"}
            >
              <LuLayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Container>
      {!gridView && (
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
      )}

      {gridView ? "" : <WorkList projects={ProjectsList} />}
      <ReachOut />
    </>
  );
};

export default WorkPage;
