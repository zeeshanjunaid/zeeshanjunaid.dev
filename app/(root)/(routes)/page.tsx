import { Hero } from "./components/hero";
import ProjectsList from "@/data/work";
import ReviewsList from "@/data/reviews";
import Services from "./components/services";
import TestimonialsSlider from "./components/testimonials-slider";
import { WorkList } from "./components/work-list";
export default function Home() {
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const archivedProjects = ProjectsList.filter((project) => project.archived);
  const featuredReviews = ReviewsList.filter((review) => review.featured);
  return (
    <>
      <Hero />
      <Services />
      <WorkList title="selected work" projects={selectedProjects} />
      <WorkList title="archived" projects={archivedProjects} />
      <TestimonialsSlider reviews={featuredReviews} />
    </>
  );
}
