import ProjectsList from "@/data/work";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ProjectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = ProjectsList.find((p) => p.slug === slug);

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
      canonical: `/work/${slug}`,
    },

    openGraph: {
      title: `${project.name} - Project Case Study`,
      description: project.description,
      url: `https://zeeshanjunaid.dev/work/${slug}`,
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
