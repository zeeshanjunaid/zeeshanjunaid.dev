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
        className="relative hover:bg-purple/40"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-transparent rounded-xl overflow-hidden relative w-[260px] md:w-[300px] uppercase font-switzer font-light text-dark dark:text-light text-xs md:text-sm"
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
      <PopoverContent className="w-full min-w-[200px] md:min-w-[300px] py-0 rounded-xl bg-light dark:bg-dark">
        <Command className="rounded-xl bg-light dark:bg-dark ">
          <CommandInput placeholder="Search skill..." />
          <CommandEmpty>No Skill found.</CommandEmpty>
          <CommandGroup>
            {skills.map((skill, index) => (
              <CommandItem
                key={index}
                value={skill}
                className="uppercase font-switzer font-light text-dark dark:text-light hover:bg-purple/40 aria-selected:bg-purple/40"
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
