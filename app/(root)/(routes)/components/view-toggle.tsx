'use client';

import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { BlurBG } from "@/components/blur-bg";
import React from "react";

interface ViewToggleProps {
  gridView: boolean;
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ViewToggle = ({ gridView, setGridView }: ViewToggleProps) => {
  return (
    <ToggleGroup type="single" className="relative rounded-xl p-1 bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor">
      <BlurBG className="rounded-xl" />
      <ToggleGroupItem
        onClick={() => setGridView(false)}
        value="list"
        aria-label="Toggle list"
        className="rounded-lg z-20 data-[state=on]:bg-purple data-[state=on]:text-white hover:bg-purple/10 text-dark dark:text-light transition-all duration-200"
        data-state={!gridView ? "on" : "off"}
      >
        <LuLayoutList className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => setGridView(true)}
        value="grid"
        aria-label="Toggle grid"
        className="rounded-lg z-20 data-[state=on]:bg-purple data-[state=on]:text-white hover:bg-purple/10 text-dark dark:text-light transition-all duration-200"
        data-state={gridView ? "on" : "off"}
      >
        <LuLayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
