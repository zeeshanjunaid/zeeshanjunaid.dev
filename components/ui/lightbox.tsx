"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  projectName: string;
}

export function Lightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  projectName,
}: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:bg-white/20 rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:bg-white/20 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Image Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
        <Image
          src={images[currentIndex]}
          alt={`${projectName} screenshot ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-4 right-4 text-white/70 text-xs">
        Use ← → keys to navigate
      </div>
    </div>
  );
}