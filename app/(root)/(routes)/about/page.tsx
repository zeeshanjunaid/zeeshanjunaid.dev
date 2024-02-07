import AboutHero from "../components/about-hero";
import Experience from "../components/experience";
import React from "react";
import Skills from "../components/skills";
export const metadata = {
  title: "About Me",
};

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <Experience />
      <Skills />
    </>
  );
};

export default AboutPage;
