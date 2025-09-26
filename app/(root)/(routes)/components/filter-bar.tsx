"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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
  const [searchValue, setSearchValue] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const filteredSkills = React.useMemo(() => {
    if (!searchValue.trim()) {
      return skills;
    }
    const filtered = skills.filter((skill) =>
      skill.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('Search value:', searchValue, 'Filtered skills:', filtered);
    return filtered;
  }, [skills, searchValue]);

  const handleSelect = (skill: string) => {
    setSkillValue(skill === skillValue ? "" : skill);
    setOpen(false);
    setSearchValue("");
  };

  const handleClear = () => {
    setSkillValue("");
    setSearchValue("");
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchValue("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        disabled={skills.length === 0}
        className="justify-between bg-white dark:bg-gray-900 rounded-xl overflow-hidden relative w-[200px] md:w-[240px] uppercase font-switzer font-medium text-gray-900 dark:text-white text-xs md:text-sm border-gray-200 dark:border-gray-700 hover:border-purple/30 hover:bg-purple/5 transition-all duration-300"
      >
        <BlurBG />
        <div className="z-20 relative flex justify-between w-full">
          <span className="truncate">
            {skillValue
              ? skills.find((skill) => skill === skillValue)
              : "All Projects"}
          </span>
          <div className="flex items-center gap-1">
            {skillValue && (
              <X
                className="h-3 w-3 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </div>
      </Button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-[9999] mt-1 w-full min-w-[200px] md:min-w-[240px] rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
          {/* Search Input */}
          <div className="flex items-center border-b px-3 py-2">
            <input
              type="text"
              placeholder="Search technology..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setOpen(false);
                  setSearchValue("");
                }
              }}
            />
          </div>
          
          {/* Skills List */}
          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
            {searchValue && (
              <div className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 border-b">
                {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} found
              </div>
            )}
            {filteredSkills.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {searchValue ? `No skills found for "${searchValue}"` : "No skills available"}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredSkills.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(skill)}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none hover:bg-purple/10 focus:bg-purple/10 transition-colors",
                      "uppercase font-switzer font-medium text-gray-900 dark:text-white",
                      skillValue === skill && "bg-purple/10"
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-purple",
                        skillValue === skill ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="truncate">{skill}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
