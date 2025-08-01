import { SchemaMarkup } from "@/components/schema-markup";
import ProjectsList from "@/data/work";
import WorkWrapper from "../components/work-wrapper";

export const metadata = {
  title: "Work",
  alternates: {
    canonical: "/work",
  },
};

const WorkPage = () => {
  // Portfolio/Work page schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio - Zeeshan Junaid",
    description:
      "A collection of web development and design projects showcasing expertise in React, Next.js, and modern web technologies.",
    url: "https://zeeshanjunaid.dev/work",
    author: {
      "@type": "Person",
      name: "Zeeshan Junaid",
      url: "https://zeeshanjunaid.dev/about",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ProjectsList.length,
      itemListElement: ProjectsList.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: `https://zeeshanjunaid.dev/work/${project.slug}`,
          creator: {
            "@type": "Person",
            name: "Zeeshan Junaid",
          },
        },
      })),
    },
  };

  return (
    <>
      <SchemaMarkup schema={portfolioSchema} />
      <WorkWrapper />
    </>
  );
};

export default WorkPage;
