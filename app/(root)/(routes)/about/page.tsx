import AboutHero from "./about-hero";
import Experience from "./experience";
import { Metadata } from "next";
import Skills from "./skills";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("about");

  return (
    <>
      {/* <SliceZone slices={page.data.slices} components={components} /> */}
      <AboutHero />
      <Experience />
      <Skills />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("about");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
