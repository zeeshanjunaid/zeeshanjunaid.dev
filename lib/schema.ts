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
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        value: 80000,
        unitText: "YEAR",
      },
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

export const generateBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: `https://zeeshanjunaid.dev/images/opengraph-image.jpg`,
  author: {
    "@type": "Person",
    name: post.author || "Zeeshan Junaid",
    url: "https://zeeshanjunaid.dev/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Zeeshan Junaid",
    logo: {
      "@type": "ImageObject",
      url: "https://zeeshanjunaid.dev/images/opengraph-image.jpg",
    },
  },
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://zeeshanjunaid.dev/blog/${post.slug}`,
  },
  keywords: post.tags?.join(", ") || "",
  wordCount: post.readingTime ? post.readingTime * 200 : 1000,
  timeRequired: post.readingTime ? `PT${post.readingTime}M` : "PT5M",
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
