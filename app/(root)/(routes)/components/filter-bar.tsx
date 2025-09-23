"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  skills: string[];
  skillValue: string;
  setSkillValue: (value: string) => void;
}
export function FilterBar({
  skills,
  skillValue,
  setSkillValue,
}: FilterBarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={skills.length === 0}
        asChild
        className="relative"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-white dark:bg-gray-900 rounded-xl overflow-hidden relative w-[200px] md:w-[240px] uppercase font-switzer font-medium text-gray-900 dark:text-white text-xs md:text-sm border-gray-200 dark:border-gray-700 hover:border-purple/30 hover:bg-purple/5 transition-all duration-300"
        >
          <BlurBG />
          <div className="z-20 relative flex justify-between w-full">
            {skillValue
              ? skills.find((skill) => skill === skillValue)
              : "All Projects"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] md:min-w-[240px] py-0 rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <Command className="rounded-xl bg-white dark:bg-gray-900 ">
          <CommandInput placeholder="Search technology..." className="border-0" />
          <CommandEmpty>No Skill found.</CommandEmpty>
          <CommandGroup>
            {skills.map((skill, index) => (
              <CommandItem
                key={index}
                value={skill}
                className="uppercase font-switzer font-medium text-gray-900 dark:text-white hover:bg-purple/10 aria-selected:bg-purple/20 rounded-lg mx-1 my-0.5"
                onSelect={(currentValue) => {
                  setSkillValue(
                    currentValue === skillValue ? "" : currentValue,
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-purple",
                    skillValue === skill ? "opacity-100" : "opacity-0",
                  )}
                />
                {skill}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
