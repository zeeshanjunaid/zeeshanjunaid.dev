"use client";

import { notFound, useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProjectsList from "@/data/work";
import { WorkTag } from "@/components/work-item";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter();
  const project = ProjectsList.find((p) => p.slug === params.slug);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Moved hook to top level

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = ProjectsList.findIndex((p) => p.slug === params.slug);
  const nextProject = ProjectsList[(currentIndex + 1) % ProjectsList.length];

  const navigateToNextProject = () => {
    router.push(`/work/${nextProject.slug}`);
  };

  // Dynamic image descriptions based on project context
  const getImageDescription = (index: number, totalImages: number) => {
    if (totalImages === 1) {
      return "Complete project overview showcasing the design and functionality";
    }

    const descriptions = [
      "Homepage design showcasing the main user interface and navigation",
      "Detailed view of core functionality and user interactions",
      "Mobile responsive design and cross-device compatibility",
      "Additional interface elements and user experience details",
      "Advanced features and interactive components",
      "Final implementation and polished user experience",
    ];

    return (
      descriptions[index] ||
      `Interface design and user experience details (${
        index + 1
      }/${totalImages})`
    );
  };
  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {project.imgUrl && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y }} // Use the variable here
          >
            <Image
              src={project.imgUrl}
              alt={project.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        )}

        <Container className="relative z-10 px-4 lg:px-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4" />
                <span className="text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-xl text-white text-[10px] md:text-[12px] uppercase font-switzer font-light"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold font-ao text-white mb-6 capitalize leading-tight">
              {project.name}
            </h1>

            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/90 font-switzer font-light leading-relaxed max-w-3xl mx-auto mb-8">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="purple"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 w-full sm:w-auto justify-center min-w-[200px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </Button>
              </a>
              <Link href="/work">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-xl uppercase font-medium font-switzer text-white border-white/30 hover:bg-white/10 w-full sm:w-auto justify-center min-w-[200px]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Story Section */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 md:py-20">
        <Container className="px-4 md:px-7 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold font-ao text-dark dark:text-light mb-6">
                  The Story
                </h2>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-dark/80 dark:text-light/80">
                  {project.overview || project.description}
                </p>
              </div>

              {project.challenge && (
                <div>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-dark dark:text-light mb-4">
                    The Challenge
                  </h3>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-dark/80 dark:text-light/80">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-dark dark:text-light mb-4">
                    The Solution
                  </h3>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-dark/80 dark:text-light/80">
                    {project.solution}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Project Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden bg-light dark:bg-dark p-8">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20">
                  <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-dark dark:text-light mb-6">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                        Year
                      </span>
                      <p className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px]">
                        {project.year}
                      </p>
                    </div>
                    {project.client && (
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                          Client
                        </span>
                        <p className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px]">
                          {project.client}
                        </p>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                          Duration
                        </span>
                        <p className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px]">
                          {project.duration}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-2">
                        Services
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <WorkTag key={index} tag={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {project.technologies && (
                <div className="relative rounded-3xl overflow-hidden bg-light dark:bg-dark p-8">
                  <BlurBG className="rounded-3xl" />
                  <div className="relative z-20">
                    <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-ao font-bold text-dark dark:text-light mb-4">
                      Technologies
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="bg-light dark:bg-dark rounded-xl p-3 border border-lightBorderColor dark:border-darkBorderColor text-center relative overflow-hidden"
                        >
                          <BlurBG className="rounded-xl" />
                          <span className="text-dark dark:text-light text-[12px] md:text-[14px] font-switzer font-medium relative z-20">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>
      )}

      {/* Full-Screen Image Showcase */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0 mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-8"
            >
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Visual Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl"
            >
              Explore the complete visual story of this project through detailed
              screens and interactions.
            </motion.p>
          </Container>

          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative w-full"
              >
                {/* Adaptive image container */}
                <div className="relative w-full group overflow-hidden rounded-3xl mx-4 md:mx-7 lg:mx-0">
                  {/* Dynamic height container based on image aspect ratio */}
                  <div className="relative w-full min-h-[40vh] max-h-[90vh]">
                    <Image
                      src={image}
                      alt={`${project.name} screen ${index + 1}`}
                      fill
                      className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-700"
                      sizes="100vw"
                      priority={index < 2}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        const container = img.parentElement;
                        if (container) {
                          const aspectRatio =
                            img.naturalWidth / img.naturalHeight;
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
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl pointer-events-none" />
                </div>

                {/* Image caption/description */}
                <Container className="px-4 md:px-7 lg:px-0 mt-6">
                  <div className="text-center">
                    <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-ao font-bold text-dark dark:text-light mb-2">
                      {project.images && project.images.length > 1
                        ? `Screen ${index + 1}`
                        : "Project Overview"}
                    </h3>
                    <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] max-w-2xl mx-auto">
                      {getImageDescription(index, project.images?.length || 0)}
                    </p>
                  </div>
                </Container>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Results Section */}
      {project.results && (
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-8">
                <div className="flex flex-col space-y-[6px]">
                  <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                  <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                </div>
                Results & Impact
              </h2>
              <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
                The measurable outcomes and positive impact this project
                delivered.
              </p>
            </motion.div>

            <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto bg-light dark:bg-dark p-8 md:p-12">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                {Array.isArray(project.results) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-3 h-3 bg-purple rounded-full mt-2 flex-shrink-0" />
                        <span className="text-dark dark:text-light font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
                          {result}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-dark dark:text-light font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-center">
                    {project.results}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Next Project Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          {nextProject.imgUrl && (
            <Image
              src={nextProject.imgUrl}
              alt={nextProject.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10 px-4 md:px-7 lg:px-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold font-ao text-white mb-4">
              Next Project
            </h2>
            <h3 className="text-[18px] md:text-[24px] lg:text-[28px] font-ao text-white/90 mb-6 capitalize">
              {nextProject.name}
            </h3>
            <p className="text-white/80 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed max-w-2xl mx-auto mb-8">
              {nextProject.description}
            </p>

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
          </motion.div>
        </Container>
      </section>
    </>
  );
}
