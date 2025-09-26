import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProjectsList from "@/data/work";
import { WorkTag } from "@/components/work-item";
import { SchemaMarkup } from "@/components/schema-markup";
import { generateProjectSchema } from "@/lib/schema";
import { NextProjectButton, ParallaxImage, ProjectImage } from "./client-components";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = ProjectsList.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = ProjectsList.findIndex((p) => p.slug === slug);
  const nextProject = ProjectsList[(currentIndex + 1) % ProjectsList.length];

  // This will be handled by a client component

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
      {/* Project Schema Markup */}
      <SchemaMarkup schema={generateProjectSchema(project)} />

      {/* Hero Section with Parallax */}
      {project.imgUrl ? (
        <ParallaxImage imgUrl={project.imgUrl} name={project.name}>
          <Container className="relative z-10 px-4 lg:px-0 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.tags.slice(0, 3).map((tag: string, index: number) => (
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
          </Container>
        </ParallaxImage>
      ) : (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Container className="relative z-10 px-4 lg:px-0 text-center">
            <div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {project.tags.slice(0, 3).map((tag: string, index: number) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 text-[10px] md:text-[12px] uppercase font-switzer font-light"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold font-ao text-gray-900 dark:text-white mb-6 capitalize leading-tight">
                {project.name}
              </h1>

              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 dark:text-gray-300 font-switzer font-light leading-relaxed max-w-3xl mx-auto mb-8">
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
                    className="rounded-xl uppercase font-medium font-switzer text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full sm:w-auto justify-center min-w-[200px]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Story Section */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Story Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold font-ao text-gray-900 dark:text-white mb-6">
                    The Story
                  </h2>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-gray-900/80 dark:text-white/80">
                    {project.overview || project.description}
                  </p>
                </div>

                {project.challenge && (
                  <div>
                    <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-gray-900 dark:text-white mb-4">
                      The Challenge
                    </h3>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-gray-900/80 dark:text-white/80">
                      {project.challenge}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-gray-900 dark:text-white mb-4">
                      The Solution
                    </h3>
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] font-switzer font-light leading-relaxed text-gray-900/80 dark:text-white/80">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Project Info Sidebar */}
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 p-8">
                  <BlurBG className="rounded-3xl" />
                  <div className="relative z-20">
                    <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-gray-900 dark:text-white mb-6">
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                          Year
                        </span>
                        <p className="text-gray-900 dark:text-white font-switzer font-medium text-[16px] md:text-[18px]">
                          {project.year}
                        </p>
                      </div>
                      {project.client && (
                        <div>
                          <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                            Client
                          </span>
                          <p className="text-gray-900 dark:text-white font-switzer font-medium text-[16px] md:text-[18px]">
                            {project.client}
                          </p>
                        </div>
                      )}
                      {project.duration && (
                        <div>
                          <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-1">
                            Duration
                          </span>
                          <p className="text-gray-900 dark:text-white font-switzer font-medium text-[16px] md:text-[18px]">
                            {project.duration}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-dark/60 dark:text-light/60 text-[12px] md:text-[14px] font-switzer font-light uppercase tracking-wider block mb-2">
                          Services
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string, index: number) => (
                            <WorkTag key={index} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {project.technologies && (
                  <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 p-8">
                    <BlurBG className="rounded-3xl" />
                    <div className="relative z-20">
                      <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-4">
                        Technologies
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {project.technologies.map((tech: string, index: number) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden"
                          >
                            <BlurBG className="rounded-xl" />
                            <span className="text-gray-900 dark:text-white text-[12px] md:text-[14px] font-switzer font-medium relative z-20">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Full-Screen Image Showcase */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0 mb-12">
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-gray-900 dark:text-white uppercase text-[14px] tracking-[.42px] mb-8">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Visual Journey
            </h2>
            <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Explore the complete visual story of this project through detailed
              screens and interactions.
            </p>
          </Container>

          <div className="space-y-12 md:space-y-16 lg:space-y-20">
                      {project.images.map((image: string, index: number) => (
              <div
                key={index}
                className="relative w-full"
              >
                {/* Adaptive image container */}
                <div className="relative w-full group overflow-hidden rounded-3xl mx-4 md:mx-7 lg:mx-0">
                  {/* Dynamic height container based on image aspect ratio */}
                  <div className="relative w-full min-h-[40vh] max-h-[90vh]">
                    <ProjectImage
                      src={image}
                      alt={`${project.name} screen ${index + 1}`}
                      className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-700"
                      sizes="100vw"
                      priority={index < 2}
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent rounded-3xl pointer-events-none" />
                </div>

                {/* Image caption/description */}
                <Container className="px-4 md:px-7 lg:px-0 mt-6">
                  <div className="text-center">
                    <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-2">
                      {project.images && project.images.length > 1
                        ? `Screen ${index + 1}`
                        : "Project Overview"}
                    </h3>
                    <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] md:text-[16px] max-w-2xl mx-auto">
                      {getImageDescription(index, project.images?.length || 0)}
                    </p>
                  </div>
                </Container>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results Section */}
      {project.results && (
        <section className="py-16 md:py-20">
          <Container className="px-4 md:px-7 lg:px-0">
            <div className="mb-12">
              <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-gray-900 dark:text-white uppercase text-[14px] tracking-[.42px] mb-8">
                <div className="flex flex-col space-y-[6px]">
                  <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                  <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                </div>
                Results & Impact
              </h2>
              <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
                The measurable outcomes and positive impact this project
                delivered.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                {Array.isArray(project.results) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {project.results.map((result: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <div className="w-3 h-3 bg-purple rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-center">
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
          <div>
            <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold font-ao text-white mb-4">
              Next Project
            </h2>
            <h3 className="text-[18px] md:text-[24px] lg:text-[28px] font-ao text-white/90 mb-6 capitalize">
              {nextProject.name}
            </h3>
            <p className="text-white/80 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed max-w-2xl mx-auto mb-8">
              {nextProject.description}
            </p>

            <NextProjectButton nextProject={nextProject} />
          </div>
        </Container>
      </section>
    </>
  );
}
