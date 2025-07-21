import { Hero } from "./components/hero";
import ProjectsList from "@/data/work";
import ReviewsList from "@/data/reviews";
import MyApproach from "./components/my-approach";
import FeaturedCaseStudies from "./components/featured-case-studies";
import TestimonialsSlider from "./components/testimonials-slider";
export default function Home() {
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const featuredReviews = ReviewsList.filter((review) => review.featured);
  return (
    <>
      <Hero />
      <MyApproach />
      <FeaturedCaseStudies projects={selectedProjects} />
      <TestimonialsSlider reviews={featuredReviews} />
    </>
  );
}
