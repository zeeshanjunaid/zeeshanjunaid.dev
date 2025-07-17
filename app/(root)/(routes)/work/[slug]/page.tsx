"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, ArrowRight, ChevronDown } from "lucide-react";
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

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = ProjectsList.findIndex((p) => p.slug === params.slug);
  const nextProject = ProjectsList[(currentIndex + 1) % ProjectsList.length];

  const navigateToNextProject = () => {
    router.push(`/work/${nextProject.slug}`);
  };

  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {project.imgUrl && (
          <motion.div 
            className="absolute inset-0 z-0"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -100])
            }}
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
                <span className="text-sm">{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <div key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs uppercase">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold font-ao text-white mb-6 capitalize leading-tight">
              {project.name}
            </h1>

            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="purple"
                  size="lg"
                  className="rounded-xl uppercase font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </Button>
              </a>
              <Link href="/work">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-xl uppercase font-medium text-white border-white/30 hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Work
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
      <section className="py-20 bg-light dark:bg-dark">
        <Container className="px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-[32px] md:text-[40px] font-bold font-ao text-dark dark:text-light mb-6">
                  The Story
                </h2>
                <p className="text-[16px] md:text-[18px] leading-relaxed text-dark/80 dark:text-light/80">
                  {project.overview || project.description}
                </p>
              </div>

              {project.challenge && (
                <div>
                  <h3 className="text-[24px] font-ao font-bold text-dark dark:text-light mb-4">
                    The Challenge
                  </h3>
                  <p className="text-[16px] md:text-[18px] leading-relaxed text-dark/80 dark:text-light/80">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-[24px] font-ao font-bold text-dark dark:text-light mb-4">
                    The Solution
                  </h3>
                  <p className="text-[16px] md:text-[18px] leading-relaxed text-dark/80 dark:text-light/80">
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
              <div className="relative rounded-3xl overflow-hidden">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20 p-8">
                  <h3 className="text-[24px] font-ao font-bold text-dark dark:text-light mb-6">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider block mb-1">
                        Year
                      </span>
                      <p className="text-dark dark:text-light font-medium text-lg">
                        {project.year}
                      </p>
                    </div>
                    {project.client && (
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider block mb-1">
                          Client
                        </span>
                        <p className="text-dark dark:text-light font-medium text-lg">
                          {project.client}
                        </p>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider block mb-1">
                          Duration
                        </span>
                        <p className="text-dark dark:text-light font-medium text-lg">
                          {project.duration}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider block mb-2">
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
                <div className="relative rounded-3xl overflow-hidden">
                  <BlurBG className="rounded-3xl" />
                  <div className="relative z-20 p-8">
                    <h3 className="text-[20px] font-ao font-bold text-dark dark:text-light mb-4">
                      Technologies
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="bg-light dark:bg-dark rounded-lg p-3 border border-lightBorderColor dark:border-darkBorderColor text-center"
                        >
                          <span className="text-dark dark:text-light text-sm font-medium">
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

      {/* Full-Screen Image Showcase */}
      {project.images && project.images.length > 0 && (
        <section className="py-20">
          <Container className="px-4 lg:px-0 mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[32px] md:text-[40px] font-bold font-ao text-dark dark:text-light text-center mb-4"
            >
              Visual Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center text-dark/70 dark:text-light/70 max-w-2xl mx-auto"
            >
              Explore the complete visual story of this project through detailed screens and interactions.
            </motion.p>
          </Container>

          <div className="space-y-20">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Full-width image container */}
                <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] group overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.name} screen ${index + 1}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Image caption/description */}
                <Container className="px-4 lg:px-0 mt-8">
                  <div className="text-center">
                    <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-2">
                      Screen {index + 1}
                    </h3>
                    <p className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto">
                      {index === 0 && "Homepage design showcasing the main user interface and navigation"}
                      {index === 1 && "Detailed view of core functionality and user interactions"}
                      {index === 2 && "Mobile responsive design and cross-device compatibility"}
                      {index > 2 && `Additional interface elements and user experience details`}
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
        <section className="py-20 bg-light dark:bg-dark">
          <Container className="px-4 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-[32px] md:text-[40px] font-bold font-ao text-dark dark:text-light mb-6">
                Results & Impact
              </h2>
              <p className="text-dark/70 dark:text-light/70 max-w-2xl mx-auto">
                The measurable outcomes and positive impact this project delivered.
              </p>
            </motion.div>

            <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20 p-8 md:p-12">
                {Array.isArray(project.results) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <span className="text-dark dark:text-light text-[16px] md:text-[18px] leading-relaxed">
                          {result}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-dark dark:text-light text-[16px] md:text-[18px] leading-relaxed text-center">
                    {project.results}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Next Project Section */}
      <section className="py-20 relative overflow-hidden">
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

        <Container className="relative z-10 px-4 lg:px-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[32px] md:text-[40px] font-bold font-ao text-white mb-4">
              Next Project
            </h2>
            <h3 className="text-[24px] md:text-[32px] font-ao text-white/90 mb-6 capitalize">
              {nextProject.name}
            </h3>
            <p className="text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-8">
              {nextProject.description}
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={navigateToNextProject}
                variant="purple"
                size="lg"
                className="rounded-xl uppercase font-medium flex items-center gap-2 mx-auto"
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