import AboutHero from "../components/about-hero";
import React from "react";
import Skills from "../components/skills";
export const metadata = {
  title: "About Me",
};

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <Skills />
    </>
  );
};

export default AboutPage;
