import { Hero } from "./hero";
import { Metadata } from "next";
import ProjectsList from "@/data/work";
import ReviewsList from "@/data/reviews";
import Services from "./services";
import { SliceZone } from "@prismicio/react";
import TestimonialsSlider from "../components/testimonials-slider";
import { WorkList } from "../components/work-list";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const archivedProjects = ProjectsList.filter((project) => project.archived);
  const featuredReviews = ReviewsList.filter((review) => review.featured);
  return (
    <>
      {/* <SliceZone slices={page.data.slices} components={components} /> */}
      <Hero />
      <Services />
      <WorkList title="selected work" projects={selectedProjects} />
      <WorkList title="archived" projects={archivedProjects} />
      <TestimonialsSlider reviews={featuredReviews} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
