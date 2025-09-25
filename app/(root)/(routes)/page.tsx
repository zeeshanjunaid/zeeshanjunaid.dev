import { Hero } from "./components/hero";
import { SchemaMarkup } from "@/components/schema-markup";
import HomeCTA from "@/components/home-cta";
import ProjectsList from "@/data/work";
import ReviewsList from "@/data/reviews";
import MyApproach from "./components/my-approach";
import FeaturedCaseStudies from "./components/featured-case-studies";
import TestimonialsSlider from "./components/testimonials-slider";

export default async function Home() {
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const featuredReviews = ReviewsList.filter((review) => review.featured);
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zeeshan Junaid - UI/UX Designer and Frontend Developer",
    description: "Experienced freelance UI/UX designer and frontend developer with over 8 years of expertise in creating engaging digital experiences.",
    url: "https://zeeshanjunaid.dev",
    mainEntity: {
      "@type": "Person",
      name: "Zeeshan Junaid",
      jobTitle: "UI/UX Designer and Frontend Developer",
      description: "I build high-performance web applications that turn visitors into customers.",
      yearsOfExperience: "8",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      offers: [
        {
          "@type": "Service",
          name: "UI/UX Design",
          description: "User-centered design solutions",
        },
        {
          "@type": "Service",
          name: "Frontend Development",
          description: "React and Next.js development",
        },
        {
          "@type": "Service",
          name: "WordPress Development",
          description: "Custom WordPress solutions",
        },
      ],
    },
  };

  return (
    <>
      <SchemaMarkup schema={homepageSchema} />
      <Hero />
      <MyApproach />
      <FeaturedCaseStudies projects={selectedProjects} />
      <TestimonialsSlider reviews={featuredReviews} />
      <HomeCTA />
    </>
  );
}
