import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Eye, Play, Code, Palette, Zap, Star } from "lucide-react";
import { Container } from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/work";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";

interface WorkGridProps {
  projects: Project[];
  selectedSkill?: string;
}

export const WorkGrid = ({ projects, selectedSkill }: WorkGridProps) => {
  const [featuredProject, setFeaturedProject] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const handleImageLoad = (projectName: string) => {
    setLoadedImages(prev => new Set([...prev, projectName]));
  };

  // Auto-rotate featured project
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProject(prev => (prev + 1) % Math.min(projects.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const featured = projects[featuredProject];

  return (
    <div ref={containerRef} className="space-y-20">
      {/* Hero Featured Project */}
      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Featured Project
            </motion.h2>
            <motion.p 
              className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Spotlight on exceptional work that defines my approach to digital excellence
            </motion.p>
          </div>

          {featured && (
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredProject}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="relative bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor group"
              >
                <BlurBG className="rounded-3xl" />
                
                {/* Background Image */}
                <div className="absolute inset-0 z-10">
                  {featured.imgUrl && (
                    <Image
                      src={featured.imgUrl}
                      fill
                      className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                      alt={featured.name}
                      sizes="100vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-light/90 via-light/70 to-transparent dark:from-dark/90 dark:via-dark/70" />
                </div>

                <div className="relative z-20 p-8 md:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Project Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple/10 px-4 py-2 rounded-xl">
                          <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                            {featured.year}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {featured.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-light dark:bg-dark px-3 py-1 rounded-lg text-[10px] md:text-[12px] uppercase font-medium border border-lightBorderColor dark:border-darkBorderColor"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold font-ao text-dark dark:text-light capitalize leading-tight">
                        {featured.name}
                      </h3>

                      <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                        {featured.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href={`/work/${featured.slug}`}>
                          <Button
                            variant="purple"
                            size="lg"
                            className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Case Study
                          </Button>
                        </Link>
                        <a href={featured.link} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Project
                          </Button>
                        </a>
                      </div>
                    </div>

                    {/* Project Preview */}
                    <div className="relative">
                      <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.5 }}
                      >
                        {featured.imgUrl && (
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={featured.imgUrl}
                              fill
                              className="object-cover"
                              alt={featured.name}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Floating Elements */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-8 h-8 bg-purple/20 rounded-full"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple/30 rounded-full"
                        animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>

                {/* Project Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="flex gap-2">
                    {projects.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setFeaturedProject(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === featuredProject
                            ? "bg-purple scale-125"
                            : "bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor hover:bg-purple/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </Container>

      {/* Interactive Timeline */}
      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
              Project Timeline
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] max-w-2xl mx-auto">
              Journey through my evolution as a developer and designer
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple via-purple/50 to-transparent rounded-full" />

            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple rounded-full border-4 border-light dark:border-dark z-10" />

                  {/* Project Card */}
                  <div className="w-full lg:w-5/12">
                    <Link href={`/work/${project.slug}`}>
                      <motion.div
                        className="relative bg-light dark:bg-dark rounded-3xl overflow-hidden border border-lightBorderColor dark:border-darkBorderColor group cursor-pointer"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BlurBG className="rounded-3xl" />
                        
                        <div className="relative z-20 p-6 md:p-8">
                          <div className="flex items-start gap-6">
                            {/* Project Image */}
                            {project.imgUrl && (
                              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                <Image
                                  src={project.imgUrl}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  alt={project.name}
                                  sizes="96px"
                                />
                              </div>
                            )}

                            {/* Project Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-purple/10 text-purple px-3 py-1 rounded-lg text-[12px] font-medium uppercase tracking-wider">
                                  {project.year}
                                </span>
                                <ArrowRight className="w-4 h-4 text-dark/40 dark:text-light/40 group-hover:text-purple group-hover:translate-x-1 transition-all duration-300" />
                              </div>

                              <h3 className="text-[18px] md:text-[22px] font-bold font-ao text-dark dark:text-light capitalize mb-2 group-hover:text-purple transition-colors duration-300">
                                {project.name}
                              </h3>

                              <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed mb-3 line-clamp-2">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`text-[10px] md:text-[12px] px-2 py-1 rounded-lg border uppercase font-medium transition-all duration-200 ${
                                      selectedSkill === tag
                                        ? "bg-purple/20 border-purple/30 text-purple"
                                        : "bg-light dark:bg-dark border-lightBorderColor dark:border-darkBorderColor text-dark/70 dark:text-light/70 group-hover:border-purple/30"
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Skills Showcase */}
      <Container className="px-4 md:px-7 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-12"
        >
          <div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
              Technologies Used
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] max-w-2xl mx-auto">
              The tools and technologies that power these exceptional projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(projects.flatMap(p => p.tags))).map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`relative px-6 py-3 rounded-2xl font-switzer font-medium text-[14px] md:text-[16px] uppercase tracking-wider transition-all duration-300 ${
                  selectedSkill === tech
                    ? "bg-purple text-white shadow-lg shadow-purple/25"
                    : "bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor text-dark dark:text-light hover:border-purple/50 hover:text-purple"
                }`}
              >
                <BlurBG className="rounded-2xl" />
                <span className="relative z-20">{tech}</span>
                
                {/* Floating icon based on tech */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};