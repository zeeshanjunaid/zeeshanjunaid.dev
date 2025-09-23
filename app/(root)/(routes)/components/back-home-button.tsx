"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackHomeButton = () => {
  return (
    <Link href="/">
      <Button
        className="mt-8 space-x-1 w-max rounded-xl text-gray-900 dark:text-white uppercase text-[12px] md:text-[14px]]"
        variant="purple"
      >
        <ChevronsLeft className="h-4 w-4" />
        Go Back Home
      </Button>
    </Link>
  );
};

export default BackHomeButton;
