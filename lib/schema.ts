import { Review } from "@/data/reviews";

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zeeshan Junaid - UI/UX Designer and Frontend Developer",
  description:
    "Experienced freelance UI/UX designer and frontend developer with over 8 years of expertise in creating engaging digital experiences.",
  url: "https://zeeshanjunaid.dev",
  author: {
    "@type": "Person",
    name: "Zeeshan Junaid",
    url: "https://zeeshanjunaid.dev/about",
    sameAs: [
      "https://github.com/zeeshanjunaid",
      "https://www.linkedin.com/in/zeeshan-junaid/",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zeeshanjunaid.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zeeshan Junaid",
  jobTitle: "UI/UX Designer and Frontend Developer",
  description:
    "Experienced freelance UI/UX designer and frontend developer with over 8 years of expertise in creating engaging digital experiences, innovative design solutions and seamless user interfaces.",
  url: "https://zeeshanjunaid.dev",
  email: "hello@zeeshanjunaid.dev",
  telephone: "+92 340 8563525",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Pakistan",
  },
  sameAs: [
    "https://github.com/zeeshanjunaid",
    "https://www.linkedin.com/in/zeeshan-junaid/",
  ],
  knowsAbout: [
    "UI/UX Design",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "User Experience",
    "User Interface Design",
    "Responsive Design",
    "Performance Optimization",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Frontend Developer",
    description:
      "Designs and develops user-facing web applications using modern technologies like React and Next.js.",
    mainEntityOfPage: "https://zeeshanjunaid.dev/about",
    occupationLocation: {
      "@type": "Country",
      name: "Pakistan",
    },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "Estimated Annual Salary",
      currency: "USD",
      duration: "P1Y",
      median: "80000",
    },
    skills: [
      "React Development",
      "Next.js",
      "TypeScript",
      "UI/UX Design",
      "Frontend Architecture",
      "Performance Optimization",
    ],
  },
});

export const generateServiceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: {
    "@type": "Person",
    name: "Zeeshan Junaid",
    url: "https://zeeshanjunaid.dev/about",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  serviceType: service.name,
  category: "Web Development and Design Services",
});

export const generateProjectSchema = (project: any) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.name,
  description: project.description,
  creator: {
    "@type": "Person",
    name: "Zeeshan Junaid",
    url: "https://zeeshanjunaid.dev/about",
  },
  dateCreated: `${project.year}-01-01`,
  url: project.link,
  keywords: project.tags?.join(", ") || "",
  genre: "Web Development Project",
  about:
    project.tags?.map((tag: string) => ({
      "@type": "Thing",
      name: tag,
    })) || [],
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zeeshan Junaid - Freelance Developer",
  description: "Professional UI/UX design and frontend development services",
  url: "https://zeeshanjunaid.dev",
  logo: "https://zeeshanjunaid.dev/images/opengraph-image.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92 340 8563525",
    email: "hello@zeeshanjunaid.dev",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "Pakistan",
  },
  founder: {
    "@type": "Person",
    name: "Zeeshan Junaid",
  },
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  priceRange: "$$",
});

export const generateReviewsPageSchema = (reviews: Review[]) => {
  if (!reviews || reviews.length === 0) {
    return {}; // Return empty object if no reviews
  }

  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  ).toFixed(1);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Zeeshan Junaid - Freelance Developer",
    image: "https://zeeshanjunaid.dev/images/opengraph-image.jpg",
    url: "https://zeeshanjunaid.dev/reviews",
    telephone: "+92 340 8563525",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Pakistan",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      bestRating: "5",
      ratingCount: totalReviews,
    },

    review: reviews.map((reviewItem) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: reviewItem.client,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: reviewItem.rating.toString(),
        bestRating: "5",
      },
      reviewBody: reviewItem.review,
      headline: reviewItem.headline || "A review for Zeeshan Junaid's services",
    })),
  };
};
