"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProjectsList from "@/data/work";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WorkTag } from "@/components/work-item";
import { Lightbox } from "@/components/ui/lightbox";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = ProjectsList.find((p) => p.slug === params.slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    notFound();
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const previousImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images!.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      {/* Back Navigation */}
      <Container className="px-4 lg:px-0 mb-8">
        <Link href="/work">
          <Button
            variant="ghost"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Button>
        </Link>
      </Container>

      {/* Project Header */}
      <Container className="px-4 lg:px-0 mb-12">
        <div className="relative rounded-3xl overflow-hidden">
          <BlurBG className="rounded-3xl" />
          <div className="relative z-20 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-dark/60 dark:text-light/60">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.tags.map((tag, index) => (
                      <WorkTag key={index} tag={tag} />
                    ))}
                  </div>
                </div>

                <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light mb-4 capitalize">
                  {project.name}
                </h1>

                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-dark/80 dark:text-light/80 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
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
                </div>
              </div>

              {project.imgUrl && (
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full">
                    <AspectRatio ratio={16 / 10}>
                      <Image
                        src={project.imgUrl}
                        alt={project.name}
                        fill
                        className="object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onClick={() => openLightbox(0)}
                      />
                    </AspectRatio>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Project Details */}
      <Container className="px-4 lg:px-0 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="relative rounded-3xl overflow-hidden">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20 p-8">
                <h2 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-6">
                  Project Overview
                </h2>
                <div className="space-y-4 text-dark/80 dark:text-light/80 leading-relaxed">
                  <p>{project.overview || project.description}</p>
                  {project.challenge && (
                    <>
                      <h3 className="text-[20px] font-ao font-bold text-dark dark:text-light mt-6 mb-3">
                        The Challenge
                      </h3>
                      <p>{project.challenge}</p>
                    </>
                  )}
                  {project.solution && (
                    <>
                      <h3 className="text-[20px] font-ao font-bold text-dark dark:text-light mt-6 mb-3">
                        The Solution
                      </h3>
                      <p>{project.solution}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            {project.technologies && (
              <div className="relative rounded-3xl overflow-hidden">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20 p-8">
                  <h2 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-6">
                    Technologies Used
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="bg-light dark:bg-dark rounded-xl p-4 border border-lightBorderColor dark:border-darkBorderColor"
                      >
                        <span className="text-dark dark:text-light font-medium">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && (
              <div className="relative rounded-3xl overflow-hidden">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20 p-8">
                  <h2 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-6">
                    Results & Impact
                  </h2>
                  <div className="space-y-4 text-dark/80 dark:text-light/80 leading-relaxed">
                    {Array.isArray(project.results) ? (
                      <ul className="space-y-2">
                        {project.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple rounded-full mt-2 flex-shrink-0" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{project.results}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="relative rounded-3xl overflow-hidden">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20 p-6">
                <h3 className="text-[20px] font-ao font-bold text-dark dark:text-light mb-4">
                  Project Info
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider">
                      Year
                    </span>
                    <p className="text-dark dark:text-light font-medium">
                      {project.year}
                    </p>
                  </div>
                  {project.client && (
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider">
                        Client
                      </span>
                      <p className="text-dark dark:text-light font-medium">
                        {project.client}
                      </p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider">
                        Duration
                      </span>
                      <p className="text-dark dark:text-light font-medium">
                        {project.duration}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-dark/60 dark:text-light/60 text-sm uppercase tracking-wider">
                      Services
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <WorkTag key={index} tag={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative rounded-3xl overflow-hidden">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20 p-6 text-center">
                <h3 className="text-[18px] font-ao font-bold text-dark dark:text-light mb-3">
                  Like this project?
                </h3>
                <p className="text-dark/70 dark:text-light/70 text-sm mb-4">
                  Let&apos;s discuss how I can help bring your vision to life.
                </p>
                <Link href="/contact">
                  <Button
                    variant="purple"
                    size="lg"
                    className="w-full rounded-xl uppercase font-medium"
                  >
                    Start a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Additional Images */}
      {project.images && project.images.length > 1 && (
        <Container className="px-4 lg:px-0 mb-12">
          <h2 className="text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light mb-8 text-center">
            Project Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="relative w-full cursor-pointer group">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={image}
                    alt={`${project.name} screenshot ${index + 2}`}
                    fill
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onClick={() => openLightbox(index + 1)}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                    Click to enlarge
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Live Project CTA */}
          <div className="text-center mt-12">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Button
                variant="purple"
                size="lg"
                className="rounded-xl uppercase font-medium flex items-center gap-2 mx-auto"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </Button>
            </a>
          </div>
        </Container>
      )}

      {/* Lightbox */}
      {project.images && (
        <Lightbox
          images={project.images}
          isOpen={lightboxOpen}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
          projectName={project.name}
        />
      )}
    </>
  );
  ("use client");
}
