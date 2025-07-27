import AboutHero from "../components/about-hero";
import Experience from "../components/experience";
import { SchemaMarkup } from "@/components/schema-markup";
import React from "react";
import Skills from "../components/skills";

export const metadata = {
  title: "About Me",
};

const AboutPage = () => {
  // About page schema
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Zeeshan Junaid - UI/UX Designer and Frontend Developer",
    description: "Learn about Zeeshan Junaid's 8+ years of experience in UI/UX design and frontend development, helping businesses succeed online.",
    url: "https://zeeshanjunaid.dev/about",
    mainEntity: {
      "@type": "Person",
      name: "Zeeshan Junaid",
      jobTitle: "UI/UX Designer and Frontend Developer",
      description: "Experienced freelance developer with 8+ years helping businesses build high-performance web applications.",
      yearsOfExperience: "8",
      skills: [
        "React Development",
        "Next.js",
        "TypeScript",
        "UI/UX Design",
        "Frontend Architecture",
        "Performance Optimization",
        "WordPress Development",
        "Shopify Development",
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
