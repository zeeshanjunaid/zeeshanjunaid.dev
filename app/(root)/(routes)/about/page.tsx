import AboutHero from "../components/about-hero";
import Experience from "../components/experience";
import { SchemaMarkup } from "@/components/schema-markup";
import React from "react";
import Skills from "../components/skills";

export const metadata = {
  title: "About Me",
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  // About page schema
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Zeeshan Junaid - Fullstack Developer",
    description:
      "Learn about Zeeshan Junaid's 8+ years of experience in fullstack development, helping businesses succeed online with scalable web applications.",
    url: "https://zeeshanjunaid.dev/about",
    mainEntity: {
      "@type": "Person",
      name: "Zeeshan Junaid",
      jobTitle: "Fullstack Developer",
      description:
        "Experienced fullstack developer with 8+ years helping businesses build high-performance web applications and digital solutions.",
      yearsOfExperience: "8",
      skills: [
        "React Development",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Fullstack Architecture",
        "Performance Optimization",
        "REST APIs",
      ],
    },
  };

  return (
    <>
      <SchemaMarkup schema={aboutSchema} />
      <AboutHero />
      <Experience />
      <Skills />
    </>
  );
};

export default AboutPage;
