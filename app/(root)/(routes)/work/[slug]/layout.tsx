import ProjectsList from "@/data/work";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ProjectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = ProjectsList.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - Project Case Study`,
    description:
      project.description ||
      `Detailed case study of ${project.name} project by Zeeshan Junaid`,
    alternates: {
      canonical: `/work/${project.slug}`,
    },

    openGraph: {
      title: `${project.name} - Project Case Study`,
      description: project.description,
      url: `https://zeeshanjunaid.dev/work/${project.slug}`,
      images: [
        {
          url: project.imgUrl, // Make sure your data has this field
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return <>{children}</>;
}
