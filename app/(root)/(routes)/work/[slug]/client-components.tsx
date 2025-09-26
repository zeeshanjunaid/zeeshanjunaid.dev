"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/work";

interface NextProjectButtonProps {
  nextProject: Project;
}

export function NextProjectButton({ nextProject }: NextProjectButtonProps) {
  const router = useRouter();

  const navigateToNextProject = () => {
    router.push(`/work/${nextProject.slug}`);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={navigateToNextProject}
        variant="purple"
        size="lg"
        className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 mx-auto"
      >
        View Next Project
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

interface ParallaxImageProps {
  imgUrl: string;
  name: string;
  children: React.ReactNode;
}

export function ParallaxImage({ imgUrl, name, children }: ParallaxImageProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src={imgUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>
      {children}
    </section>
  );
}

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProjectImage({ src, alt, className, sizes, priority }: ProjectImageProps) {
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const container = img.parentElement;
    if (container) {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      // Adjust container height based on aspect ratio
      if (aspectRatio > 2) {
        // Wide images (like desktop screens)
        container.style.height = "50vh";
      } else if (aspectRatio < 0.8) {
        // Tall images (like mobile screens)
        container.style.height = "70vh";
      } else {
        // Square-ish images
        container.style.height = "60vh";
      }
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onLoad={handleLoad}
    />
  );
}
