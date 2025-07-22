import { Hero } from "./components/hero";
import { getLatestPosts } from "@/lib/posts";
import HomeCTA from "@/components/home-cta";
import LatestBlogPosts from "./components/latest-blog-posts";
import ProjectsList from "@/data/work";
import ReviewsList from "@/data/reviews";
import MyApproach from "./components/my-approach";
import FeaturedCaseStudies from "./components/featured-case-studies";
import TestimonialsSlider from "./components/testimonials-slider";

export default async function Home() {
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const featuredReviews = ReviewsList.filter((review) => review.featured);
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <Hero />
      <MyApproach />
      <FeaturedCaseStudies projects={selectedProjects} />
      <LatestBlogPosts posts={latestPosts} />
      <TestimonialsSlider reviews={featuredReviews} />
      <HomeCTA />
    </>
  );
}
